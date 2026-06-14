import axios from "axios";
import type { WeatherData } from "@/types/weather";

export async function getWeather(query: string): Promise<WeatherData> {
  const { data } = await axios.get(
    "https://api.weatherapi.com/v1/forecast.json",
    {
      params: {
        key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        q: query,
        days: 7,
        aqi: "yes",
      },
    },
  );

  return data;
}
