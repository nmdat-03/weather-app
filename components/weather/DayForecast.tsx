"use client"

import Image from "next/image";
import type { WeatherData } from "@/types/weather";
import { formatFullDate, formatTemp } from "@/lib/format";
import { motion } from "framer-motion";

type DayForecastProps = {
    forecast: WeatherData["forecast"]["forecastday"];
};

export default function DayForecast({
    forecast,
}: DayForecastProps) {

    const glassClass = `
        relative
        overflow-hidden
        rounded-3xl
        bg-white/90
        p-4
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white
        [box-shadow:
        inset_0_2px_2px_rgba(255,255,255,0.4),
        inset_0_-2px_2px_rgba(255,255,255,0.1),
        0_10px_30px_rgba(0,0,0,0.15)
        ]
    `;

    return (
        <div className="grid gap-4">
            {forecast.map((day, index) => (
                <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className={`flex items-center gap-4 ${glassClass}`}
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

                    <Image
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        width={64}
                        height={64}
                        className="h-12 w-12 md:h-16 md:w-16"
                    />

                    <div className="flex flex-col items-center">
                        <p className="text-md md:text-2xl font-semibold">{formatTemp(day.day.maxtemp_c)}</p>
                        <p className="text-sm md:text-md">{formatTemp(day.day.mintemp_c)}</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <p className="text-sm md:text-xl font-medium">
                                {formatFullDate(day.date)}
                            </p>

                            {index === 0 && (
                                <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-500 border border-green-500">
                                    Today
                                </span>
                            )}
                        </div>

                        <p className="text-xs md:text-lg">
                            {day.day.condition.text}
                        </p>
                    </div>


                </motion.div>
            ))}
        </div>
    );
}