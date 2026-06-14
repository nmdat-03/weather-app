"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import SearchBar from "../weather/SearchBar";
import { LocationResult } from "@/services/geocoding";
import { getWeather } from "@/services/weather";
import WeatherCard from "../weather/WeatherCard";
import { WeatherData } from "@/types/weather";

const Globe = dynamic(() => import("react-globe.gl"), {
    ssr: false,
});

type Marker = {
    lat: number;
    lng: number;
};

export default function WeatherGlobe() {
    const globeRef = useRef<unknown>(undefined);

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const [markers, setMarkers] = useState<Marker[]>([]);

    const flyToLocation = (lat: number, lng: number) => {
        (
            globeRef.current as {
                pointOfView: (
                    coords: {
                        lat: number;
                        lng: number;
                        altitude?: number;
                    },
                    ms?: number
                ) => void;
            }
        )?.pointOfView(
            {
                lat,
                lng,
                altitude: 0.6,
            },
            2000
        );
    };

    const handleSelectLocation = async (
        location: LocationResult
    ) => {
        try {
            flyToLocation(location.lat, location.lon);

            setMarkers([
                {
                    lat: location.lat,
                    lng: location.lon,
                },
            ]);

            const weather = await getWeather(
                `${location.lat},${location.lon}`
            );

            setWeatherData(weather);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative h-screen w-full">
            <SearchBar onSelectLocation={handleSelectLocation} />

            <WeatherCard weatherData={weatherData} />

            <Globe
                ref={globeRef as never}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                animateIn
                htmlElementsData={markers}
                htmlElement={() => {
                    const el = document.createElement("div");
                    el.innerHTML = "📍";
                    el.style.fontSize = "28px";
                    return el;
                }}
            />
        </div>
    );
}