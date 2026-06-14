"use client";

import { formatDate } from "@/lib/format";
import type { WeatherData } from "@/types/weather";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LabelList,
    CartesianGrid,
} from "recharts";

type RainChartProps = {
    forecast: WeatherData["forecast"]["forecastday"];
};

export default function RainChart({
    forecast,
}: RainChartProps) {
    const data = forecast.map((day) => ({
        date: formatDate(day.date),
        rain: day.day.daily_chance_of_rain,
    }));

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <defs>
                        <linearGradient
                            id="rainGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis domain={[0, 100]} />

                    <Tooltip formatter={(value) => [`${value}%`, "Rain Chance"]} />

                    <Bar
                        dataKey="rain"
                        fill="url(#rainGradient)"
                        radius={[6, 6, 0, 0]}
                    >
                        <LabelList
                            dataKey="rain"
                            position="top"
                            fill="#000000"
                            formatter={(value) => `${Number(value)}%`}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}