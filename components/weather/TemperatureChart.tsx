"use client";

import { formatDate } from "@/lib/format";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type ForecastDay = {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
    };
};

type TemperatureChartProps = {
    forecast: ForecastDay[];
};

export default function TemperatureChart({
    forecast,
}: TemperatureChartProps) {
    const data = forecast.map((day) => ({
        date: formatDate(day.date),
        max: day.day.maxtemp_c,
        min: day.day.mintemp_c,
    }));

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis tickFormatter={(value) => `${value}°C`} />

                    <Tooltip
                        formatter={(value, name) => [`${value}°C`, name]}
                    />

                    <Line
                        type="monotone"
                        dataKey="max"
                        name="Highest"
                        stroke="#f97316"
                        strokeWidth={2}
                    />

                    <Line
                        type="monotone"
                        dataKey="min"
                        name="Lowest"
                        stroke="#3b82f6"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}