import Image from "next/image";
import type { WeatherData } from "@/types/weather";
import { formatFullDate, formatTemp } from "@/lib/format";

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
        border
        border-white/20
        bg-white/30
        p-4
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white/40
        [box-shadow:
        inset_0_2px_2px_rgba(255,255,255,0.4),
        inset_0_-2px_2px_rgba(255,255,255,0.1),
        0_10px_30px_rgba(0,0,0,0.15)
        ]
    `;

    return (
        <div className="grid gap-4">
            {forecast.map((day, index) => (
                <div
                    key={day.date}
                    className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 ${glassClass}`}
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

                    <Image
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        width={64}
                        height={64}
                    />

                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium">
                                {formatFullDate(day.date)}
                            </p>

                            {index === 0 && (
                                <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-500 border border-green-500">
                                    Today
                                </span>
                            )}
                        </div>

                        <p className="text-md">
                            {day.day.condition.text}
                        </p>
                    </div>

                    <div className="text-right">
                        <p>Max: {formatTemp(day.day.maxtemp_c)}</p>
                        <p>Min: {formatTemp(day.day.mintemp_c)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}