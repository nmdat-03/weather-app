import { getUvInfo } from "@/lib/uv";
import { Sun } from "lucide-react";
import LevelBar from "../ui/LevelBar";
import { WeatherData } from "@/types/weather";
import { formatHour } from "@/lib/format";

type UVCardProps = {
    uv: number;
    hourly: WeatherData["forecast"]["forecastday"][0]["hour"];
};

export default function UVCard({
    uv,
    hourly,
}: UVCardProps) {
    const info = getUvInfo(uv);

    const highUvHours = hourly.filter((h) => h.uv >= 6);

    const highUvPeriod =
        highUvHours.length > 0
            ? `${formatHour(highUvHours[0].time)} – ${formatHour(
                highUvHours[highUvHours.length - 1].time
            )}`
            : null;

    const uvLevel =
        uv <= 2 ? 1
            : uv <= 5 ? 2
                : uv <= 7 ? 3
                    : uv <= 10 ? 4 : 5;

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
                    <Sun size={20} />
                    UV Index
                </h2>

                <span className={`rounded-full px-3 py-1 text-sm font-medium text-white ${info.color}`}>
                    {info.label}
                </span>
            </div>

            <div className="mb-5">
                <p className={`flex justify-center text-5xl font-bold ${info.textColor}`}>
                    {uv}
                </p>
            </div>

            <div className="mb-5">
                <LevelBar
                    total={5}
                    current={uvLevel}
                    color={info.color}
                />
                <p className="mt-3 text-sm">
                    {info.description}
                </p>
            </div>

            <div>
                <p className="text-sm opacity-70">High UV Period</p>
                <p className="mt-1 text-lg font-semibold">
                    {highUvPeriod ?? "Low UV throughout the day"}
                </p>
            </div>
        </div>
    );
}