import BackButton from "@/components/ui/BackButton";
import AirQualityCard from "@/components/weather/AirQualityCard";
import DayForecast from "@/components/weather/DayForecast";
import HourlyForecast from "@/components/weather/HourlyForecast";
import LocationInfo from "@/components/weather/LocationInfo";
import RainChart from "@/components/weather/RainChart";
import SunMoonInfo from "@/components/weather/SunMoonInfo";
import TemperatureChart from "@/components/weather/TemperatureChart";
import UVCard from "@/components/weather/UVCard";
import WeatherStats from "@/components/weather/WeatherStats";
import { getWeatherGradient } from "@/lib/weather-theme";
import { getWeather } from "@/services/weather";
import { CalendarDays, Clock, CloudRain, SunSnow } from "lucide-react";

export default async function WeatherDetailsPage({
    params,
    searchParams,
}: {
    params: Promise<{ city: string }>;
    searchParams: Promise<{ name?: string }>;
}) {
    const { city } = await params;
    const { name } = await searchParams;

    const weather = await getWeather(
        decodeURIComponent(city)
    );

    const backgroundGradient = getWeatherGradient(
        weather.current.condition.text
    );

    const currentHour = new Date().getHours();

    const currentForecastHour = weather.forecast.forecastday[0].hour[currentHour];

    return (
        <div className={`min-h-screen`}>
            <div className={`fixed inset-0 -z-10 bg-linear-to-b ${backgroundGradient}`} />

            <div className="container-custom w-full space-y-10 overflow-x-hidden">
                <BackButton />

                <LocationInfo
                    city={name ?? weather.location.name}
                    country={weather.location.country}
                    localtime={weather.location.localtime}
                />

                {/* INFO CARD */}
                <WeatherStats
                    current={weather.current}
                    rainChance={currentForecastHour.chance_of_rain}
                />

                <div className="grid gap-4 md:grid-cols-3">
                    <AirQualityCard airQuality={weather.current.air_quality} />
                    <UVCard
                        uv={weather.current.uv}
                        hourly={weather.forecast.forecastday[0].hour}
                    />
                    <SunMoonInfo
                        sunrise={weather.forecast.forecastday[0].astro.sunrise}
                        sunset={weather.forecast.forecastday[0].astro.sunset}
                        moonPhase={weather.forecast.forecastday[0].astro.moon_phase}
                        moonIllumination={weather.forecast.forecastday[0].astro.moon_illumination}
                    />
                </div>

                {/* HOURLY FORECAST */}
                <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-2xl">
                    <h2 className="flex items-center gap-2 text-white text-2xl font-semibold">
                        <Clock size={20} />
                        Hourly Forecast
                    </h2>

                    <div className="mt-4">
                        <HourlyForecast
                            todayHours={weather.forecast.forecastday[0].hour}
                            tomorrowHours={weather.forecast.forecastday[1].hour}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* 7-DAY FORECAST */}
                    <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-2xl">
                        <h2 className="flex items-center gap-2 text-white text-2xl font-semibold">
                            <CalendarDays size={20} />
                            7-Day Forecast
                        </h2>

                        <div className="mt-4">
                            <DayForecast forecast={weather.forecast.forecastday} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-5">
                        {/* TEMPERATURE CHART */}
                        <div className="bg-white/80 p-4 rounded-2xl backdrop-blur-2xl">
                            <h2 className="flex items-center gap-2 text-2xl font-semibold">
                                <SunSnow size={20} />
                                Temperature Trend
                            </h2>
                            <div className="mt-4">
                                <TemperatureChart forecast={weather.forecast.forecastday} />
                            </div>
                        </div>

                        {/* RAIN CHART */}
                        <div className="bg-white/80 p-4 rounded-2xl backdrop-blur-2xl">
                            <h2 className="flex items-center gap-2 text-2xl font-semibold">
                                <CloudRain size={20} />
                                Rain Chance
                            </h2>

                            <div className="mt-4">
                                <RainChart forecast={weather.forecast.forecastday} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}