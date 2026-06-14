import axios from "axios";

export type LocationResult = {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
};

export async function searchLocations(query: string) {
    const { data } = await axios.get(
        "https://api.weatherapi.com/v1/search.json",
        {
            params: {
                key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
                q: query,
            },
        }
    );

    return data as LocationResult[];
}