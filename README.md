# 🌤️ Weather App

A modern weather forecast application built with **Next.js 16**, **React 19**, and **TypeScript**. The app provides real-time weather information, 7-day forecasts, location-based weather updates, interactive charts, and smooth animations for an engaging user experience.

## ✨ Features

- 🔍 Search weather by city name
- 📍 Get weather based on current location
- 🌡️ Real-time temperature and weather conditions
- 📅 7-day weather forecast
- 💧 Humidity information
- 🌬️ Wind speed and direction
- 👀 Visibility data
- 🌧️ Rain probability forecast
- 📊 Interactive weather charts
- 🌎 Interactive globe visualization
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

### State Management

- Zustand

### Forms & Validation

- React Hook Form
- Zod

### Data Fetching

- Axios

### UI & Animation

- Framer Motion
- Lucide React Icons
- React CountUp

### Data Visualization

- Recharts
- React Globe GL
- Three.js

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nmdat-03/weather-app.git
```

```bash
cd weather-app
```

### 2. Install dependencies

Using pnpm:

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_WEATHER_API_KEY=
```

Get your API key from:

- https://www.weatherapi.com/

### 4. Run the development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

## 🌍 API

This project uses:

### WeatherAPI

https://www.weatherapi.com/

Endpoints used:

- Current Weather
- Forecast Weather (7 Days)
- Location Search
