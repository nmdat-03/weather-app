import { formatTemp } from "@/lib/format";
import { LocationResult } from "@/services/geocoding";
import { WeatherData } from "@/types/weather";
import Image from "next/image";
import Link from "next/link";

type WeatherCardProps = {
    weatherData: WeatherData | null;
    selectedLocation: LocationResult | null;
};

export default function WeatherCard({
    weatherData,
    selectedLocation,
}: WeatherCardProps) {
    if (!weatherData) return null;

    const today = weatherData.forecast.forecastday[0];

    return (
        <div className="absolute right-6 top-24 z-10 w-86 rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-xl">
            <h2 className="text-2xl font-bold">
                {selectedLocation?.name ?? weatherData.location.name}
            </h2>

            <p className="text-sm text-white/70">
                {selectedLocation?.country ?? weatherData.location.country}
            </p>

            <div className="mt-4">
                <div className="flex items-center gap-2">
                    <Image
                        src={`https:${weatherData.current.condition.icon}`}
                        alt={weatherData.current.condition.text}
                        width={68}
                        height={68}
                    />
                    <p className="text-5xl font-bold">
                        {formatTemp(weatherData.current.temp_c)}
                    </p>
                </div>

                <p className="mt-2">
                    {weatherData.current.condition.text}
                </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                    ⛈ Rain chance: {" "}
                    {today.day.daily_chance_of_rain}%
                </div>
                <div>
                    💧 Humidity: {" "}
                    {weatherData.current.humidity}%
                </div>
                <div>
                    ☀ UV index: {" "}
                    {weatherData.current.uv}
                </div>
                <div>
                    🌫 Wind: {" "}
                    {weatherData.current.wind_kph} km/h
                </div>
            </div>

            <Link
                href={`/weather/${weatherData.location.lat},${weatherData.location.lon}?name=${encodeURIComponent(
                    selectedLocation?.name ?? weatherData.location.name
                )}`}
                className="mt-6 inline-flex rounded-lg bg-linear-to-t from-zinc-300 via-zinc-200 to-zinc-100 px-4 py-2 text-black transition hover:opacity-90"
            >
                View Details
            </Link>
        </div>
    );
}