import { getAirQualityInfo } from "@/lib/airQuality";
import { BadgeInfo } from "lucide-react";
import LevelBar from "../ui/LevelBar";

type AirQualityCardProps = {
    airQuality: {
        pm2_5: number;
        "us-epa-index": number;
    };
};

export default function AirQualityCard({
    airQuality,
}: AirQualityCardProps) {
    const aqi = getAirQualityInfo(airQuality["us-epa-index"]);

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
        <div className={glassClass}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

            <div className="mb-5 flex items-center justify-between">
                <h2 className="flex gap-2 items-center text-xl font-semibold">
                    <BadgeInfo size={20} />
                    Air Quality
                </h2>

                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium text-white ${aqi.color}`}
                >
                    {aqi.label}
                </span>
            </div>

            <div className="mb-5">
                <p className={`flex justify-center text-5xl font-bold ${aqi.textColor}`}>
                    {airQuality["us-epa-index"]}
                </p>
            </div>

            <div className="mb-5">
                <LevelBar
                    total={6}
                    current={airQuality["us-epa-index"]}
                    color={aqi.color}
                />
                <p className="mt-3 text-sm">
                    {aqi.description}
                </p>
            </div>

            <div>
                <p className="text-sm opacity-70">
                    PM2.5
                </p>
                <p className="mt-1 text-lg font-semibold">
                    {airQuality.pm2_5.toFixed(1)}
                    <span className="ml-1 text-sm font-normal">
                        µg/m³
                    </span>
                </p>
            </div>

        </div>
    );
}