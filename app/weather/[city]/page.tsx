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

export default async function WeatherDetailsPage({
    params,
    searchParams,
}: {
    params: Promise<{city: string}>;
    searchParams: Promise<{name?: string}>;
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

            <div className="container-custom w-full space-y-5 overflow-hidden">
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
                <div className="mt-8 bg-white/50 p-4 rounded-2xl backdrop-blur-2xl">
                    <h2 className="text-2xl font-semibold">
                        Hourly Forecast
                    </h2>

                    <div className="mt-4">
                        <HourlyForecast
                            todayHours={weather.forecast.forecastday[0].hour}
                            tomorrowHours={weather.forecast.forecastday[1].hour}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                    {/* 7-DAY FORECAST */}
                    <div className="mt-8 bg-white/50 p-4 rounded-2xl backdrop-blur-2xl">
                        <h2 className="text-2xl font-semibold">
                            7-Day Forecast
                        </h2>

                        <div className="mt-4">
                            <DayForecast forecast={weather.forecast.forecastday} />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col justify-between gap-5">
                        {/* TEMPERATURE CHART */}
                        <div className="bg-white/80 p-4 rounded-2xl backdrop-blur-2xl">
                            <h2 className="text-2xl font-semibold">
                                Temperature Trend
                            </h2>
                            <div className="mt-4">
                                <TemperatureChart forecast={weather.forecast.forecastday} />
                            </div>
                        </div>

                        {/* RAIN CHART */}
                        <div className="bg-white/80 p-4 rounded-2xl backdrop-blur-2xl">
                            <h2 className="text-2xl font-semibold">
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