import { formatDate, formatTemp, formatTime } from "@/lib/format";
import type { WeatherData } from "@/types/weather";
import Image from "next/image";

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
        hover:bg-white/50
        [box-shadow:
        inset_0_2px_2px_rgba(255,255,255,0.4),
        inset_0_-2px_2px_rgba(255,255,255,0.1),
        0_10px_30px_rgba(0,0,0,0.15)
        ]
    `;

    return (
        <div className="overflow-x-auto">
            <div className="flex gap-4 pb-2">
                {next24Hours.map((hour) => (
                    <div
                        key={hour.time}
                        className={`min-w-32 text-center ${glassClass}`}
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
                            className="mx-auto"
                        />

                        <p className="mt-2 text-lg font-bold">
                            {formatTemp(hour.temp_c)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}