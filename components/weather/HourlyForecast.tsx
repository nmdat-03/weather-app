"use client";

import { formatDate, formatTemp, formatTime } from "@/lib/format";
import type { WeatherData } from "@/types/weather";
import Image from "next/image";
import { motion } from "framer-motion";

type Hour = WeatherData["forecast"]["forecastday"][0]["hour"][0];

type HourlyForecastProps = {
    todayHours: WeatherData["forecast"]["forecastday"][0]["hour"];
    tomorrowHours: WeatherData["forecast"]["forecastday"][0]["hour"];
};

export default function HourlyForecast({
    todayHours,
    tomorrowHours,
}: HourlyForecastProps) {
    const currentHour = new Date().getHours();

    const next24Hours: Hour[] = [
        ...todayHours.slice(currentHour),
        ...tomorrowHours.slice(0, currentHour),
    ];

    const glassClass = `
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/20
        bg-white/40
        p-4
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white/50
        [box-shadow:
        inset_0_2px_2px_rgba(255,255,255,0.4),
        inset_0_-2px_2px_rgba(255,255,255,0.1),
        0_10px_30px_rgba(0,0,0,0.15)
        ]
    `;

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
            }}
            className="overflow-x-auto"
        >
            <div className="flex gap-4 px-3 py-4">
                {next24Hours.map((hour) => {

                    return (
                        <div
                            key={hour.time}
                            className={`
                                group
                                min-w-32
                                text-center
                                ${glassClass}
                            `}
                        >
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

                            <p className="text-sm">
                                {formatDate(hour.time)}
                            </p>

                            <p className="mb-2 text-md font-semibold">
                                {formatTime(hour.time)}
                            </p>

                            <Image
                                src={`https:${hour.condition.icon}`}
                                alt={hour.condition.text}
                                width={48}
                                height={48}
                                className="mx-auto transition-transform duration-300 group-hover:scale-110"
                            />

                            <p className="mt-2 text-lg font-bold">
                                {formatTemp(hour.temp_c)}
                            </p>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}