"use client";

import {
    Sunrise,
    Sunset,
    Moon,
    CircleDashed,
    SunMoon,
} from "lucide-react";
import { motion } from "framer-motion";
import { getMoonPhaseIcon } from "@/lib/moon";

type SunInfoProps = {
    sunrise: string;
    sunset: string;
    moonPhase: string;
    moonIllumination: string;
};

function InfoItem({
    icon,
    label,
    valueIcon,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    valueIcon?: React.ReactNode,
    value: string;
}) {
    return (
        <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium">
                {icon}
                {label}
            </p>

            <div className="flex items-center justify-center gap-2">
                {valueIcon}

                <p className="text-xl font-bold">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function SunInfo({
    sunrise,
    sunset,
    moonPhase,
    moonIllumination,
}: SunInfoProps) {
    const moonIcon = getMoonPhaseIcon(moonPhase);

    const glassClass = `
        relative
        overflow-hidden
        rounded-3xl
        bg-black/20
        text-white
        p-4
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-black/30
        [box-shadow:
        inset_0_2px_2px_rgba(255,255,255,0.4),
        inset_0_-2px_2px_rgba(255,255,255,0.1),
        0_10px_30px_rgba(0,0,0,0.15)
        ]
    `;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={glassClass}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

            <div className="mb-5">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <SunMoon size={20} />
                    Sun & Moon Info
                </h2>
            </div>

            <div className="relative grid grid-cols-2 gap-6">
                <InfoItem
                    icon={<Sunrise size={22} />}
                    label="Sunrise"
                    value={sunrise}
                />

                <InfoItem
                    icon={<Sunset size={22} />}
                    label="Sunset"
                    value={sunset}
                />

                <InfoItem
                    icon={<Moon size={22} />}
                    label="Moon Phase"
                    value={moonPhase}
                    valueIcon={
                        <span className="text-2xl">
                            {moonIcon}
                        </span>
                    }
                />

                <InfoItem
                    icon={<CircleDashed size={22} />}
                    label="Illumination"
                    value={`${moonIllumination}%`}
                />
            </div>
        </motion.div>
    );
}