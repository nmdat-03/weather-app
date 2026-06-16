"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SearchBar from "../ui/SearchBar";
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

    const [weatherData, setWeatherData] =
        useState<WeatherData | null>(null);

    const [selectedLocation, setSelectedLocation] =
        useState<LocationResult | null>(null);

    const [markers, setMarkers] = useState<Marker[]>([]);

    const [loading, setLoading] = useState(false);

    const flyToLocation = (
        lat: number,
        lng: number
    ) => {
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
            setLoading(true);

            setSelectedLocation(location);

            flyToLocation(
                location.lat,
                location.lon
            );

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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />

            {/* SearchBar */}
            <motion.div
                className="relative z-20"
                initial={{
                    y: -40,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.6,
                }}
            >
                <SearchBar
                    onSelectLocation={
                        handleSelectLocation
                    }
                />
            </motion.div>

            {/* Weather Card */}
            <AnimatePresence mode="wait">
                {weatherData && (
                    <motion.div
                        key={`${weatherData.location.lat}-${weatherData.location.lon}`}
                        initial={{
                            opacity: 0,
                            x: 60,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: 60,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        <WeatherCard
                            weatherData={weatherData}
                            selectedLocation={
                                selectedLocation
                            }
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loading */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="absolute left-1/2 top-24 z-30 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md"
                    >
                        <span className="text-sm text-white">
                            Loading weather...
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Globe */}
            <motion.div
                className="h-full w-full"
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 1,
                }}
            >
                <Globe
                    ref={globeRef as never}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    animateIn
                    htmlElementsData={markers}
                    htmlElement={() => {
                        const el = document.createElement("div");

                        el.innerHTML = `
                        <div class="marker-wrapper">
                            <div class="marker-pulse"></div>
                            <div class="marker-pulse marker-pulse-delay"></div>
                            <span class="marker-icon">📍</span>
                        </div>
                        `;

                        return el;
                    }}
                />
            </motion.div>
        </div>
    );
}