"use client";

import { formatTemp } from "@/lib/format";
import { WeatherData } from "@/types/weather";
import {
    CloudRain,
    Droplets,
    Eye,
    ThermometerSun,
    Wind,
} from "lucide-react";
import { motion } from "framer-motion";

type WeatherStatsProps = {
    current: WeatherData["current"];
    rainChance: number;
};

function getTemperatureColor(temp: number) {
    if (temp <= 15) return "text-blue-500";
    if (temp <= 25) return "text-emerald-500";
    if (temp <= 32) return "text-yellow-500";
    if (temp <= 36) return "text-orange-500";
    return "text-red-500";
}

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function WeatherStats({
    current,
    rainChance,
}: WeatherStatsProps) {
    const temperatureColor = getTemperatureColor(current.temp_c);

    const temperatureStat = {
        label: "Temperature",
        value: formatTemp(current.temp_c),
        icon: <ThermometerSun size={22} />,
    };

    const stats = [
        {
            label: "Rain Chance",
            value: `${rainChance}%`,
            icon: <CloudRain size={22} />,
        },
        {
            label: "Humidity",
            value: `${current.humidity}%`,
            icon: <Droplets size={22} />,
        },
        {
            label: "Wind",
            value: `${current.wind_kph} km/h`,
            icon: <Wind size={22} />,
        },
        {
            label: "Visibility",
            value: `${current.vis_km} km`,
            icon: <Eye size={22} />,
        },
    ];

    const glassClass = `
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/20
        bg-white/50
        p-4
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white/60
        [box-shadow:
        inset_0_2px_2px_rgba(255,255,255,0.4),
        inset_0_-2px_2px_rgba(255,255,255,0.1),
        0_10px_30px_rgba(0,0,0,0.15)
        ]
    `;

    return (
        <div className="space-y-4">
            <motion.div
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {/* TEMPERATURE */}
                <motion.div
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
                    className={glassClass}
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

                    <div className="relative h-full min-h-28 md:min-h-40">
                        <div className="relative z-10 flex items-center gap-2">
                            {temperatureStat.icon}
                            <p className="text-sm font-medium">
                                {temperatureStat.label}
                            </p>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <p
                                className={`text-5xl font-bold md:text-7xl ${temperatureColor}`}
                            >
                                {temperatureStat.value}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* OTHER STATS */}
                <div className="grid grid-cols-2 gap-3 md:col-span-2">
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            transition={{ duration: 0.5 }}
                            className={glassClass}
                        >
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

                            <div className="relative">
                                <div className="mb-3 flex items-center gap-2">
                                    {stat.icon}
                                    <p className="text-sm font-medium">
                                        {stat.label}
                                    </p>
                                </div>

                                <p className="text-center text-2xl font-bold">
                                    {stat.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}