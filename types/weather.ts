export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
    lat: number;
    lon: number;
  };

  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    uv: number;
    vis_km: number;

    air_quality: {
      pm2_5: number;
      "us-epa-index": number;
      "gb-defra-index": number;
    };

    condition: {
      text: string;
      icon: string;
    };
  };

  forecast: {
    forecastday: {
      date: string;

      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;

        daily_chance_of_rain: number;

        condition: {
          text: string;
          icon: string;
        };
      };

      astro: {
        sunrise: string;
        sunset: string;
        moon_phase: string;
        moon_illumination: string;
      };

      hour: {
        time: string;
        temp_c: number;
        uv: number;

        chance_of_rain: number;
        will_it_rain: number;

        condition: {
          text: string;
          icon: string;
        };
      }[];
    }[];
  };
}
