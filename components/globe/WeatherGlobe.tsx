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
    const globeRef = useRef<{
        pointOfView: (
            coords: {
                lat: number;
                lng: number;
                altitude?: number;
            },
            ms?: number
        ) => void;
    } | null>(null);

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);

    const [markers, setMarkers] = useState<Marker[]>([]);

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const flyToLocation = (
        lat: number,
        lng: number
    ) => {
        globeRef.current?.pointOfView(
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
            setErrorMessage("");

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

            const weather = await getWeather(`${location.lat},${location.lon}`);

            setWeatherData(weather);
        } catch (error) {
            console.error(error);

            setErrorMessage("Failed to load weather data.");
        } finally {
            setLoading(false);
        }
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            setErrorMessage("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    setLoading(true);
                    setErrorMessage("");

                    const lat = position.coords.latitude;

                    const lon = position.coords.longitude;

                    flyToLocation(lat, lon);

                    setMarkers([{ lat, lng: lon }]);

                    const weather = await getWeather(`${lat},${lon}`);

                    setWeatherData(weather);

                    setSelectedLocation(null);
                } catch (error) {
                    console.error(error);

                    setErrorMessage(
                        "Failed to load weather data."
                    );
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error(error);

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setErrorMessage("Location access denied. Please search for a city manually.");
                        break;

                    case error.POSITION_UNAVAILABLE:
                        setErrorMessage("Location information is unavailable.");
                        break;

                    case error.TIMEOUT:
                        setErrorMessage("Location request timed out.");
                        break;

                    default:
                        setErrorMessage("Unable to retrieve your location.");
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />

            {/* SearchBar */}
            <motion.div
                className="relative z-20"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <SearchBar
                    onSelectLocation={handleSelectLocation}
                    onCurrentLocation={handleCurrentLocation}
                />
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-1/2 top-24 z-30 -translate-x-1/2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-200 backdrop-blur-md"
                    >
                        {errorMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Weather Card */}
            <AnimatePresence mode="wait">
                {weatherData && (
                    <motion.div
                        key={`${weatherData.location.lat}-${weatherData.location.lon}`}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        transition={{ duration: 0.4 }}
                    >
                        <WeatherCard
                            weatherData={weatherData}
                            selectedLocation={selectedLocation}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loading */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
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