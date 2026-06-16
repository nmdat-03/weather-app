"use client";

import { Clock3, MapPin } from "lucide-react";
import { motion } from "framer-motion";

type LocationInfoProps = {
    city: string;
    country: string;
    localtime: string;
};

export default function LocationInfo({
    city,
    country,
    localtime,
}: LocationInfoProps) {
    const time = localtime.split(" ")[1];

    return (
        <div className="py-6 text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center gap-2 text-2xl text-white/80"
            >
                <MapPin size={16} />
                <span>{country}</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-2 text-4xl font-bold tracking-tight md:text-6xl"
            >
                {city}
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="mt-6 flex items-center justify-center gap-2 text-3xl font-light md:text-4xl"
            >
                <Clock3 size={28} />
                <span>{time}</span>
            </motion.div>
        </div>
    );
}