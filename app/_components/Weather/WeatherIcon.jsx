import React from "react";
// Import icons from react-icons/wi
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiFog,
  WiSnowflakeCold,
  WiSprinkle,
  WiShowers,
  WiRainMix,
  WiRain,
  WiRainWind,
  WiSnow,
  WiThunderstorm,
  WiDaySunnyOvercast,
} from "react-icons/wi";

// Define the mapping of weather codes to day and night icons
const weatherCodeToIcon = {
  day: {
    0: WiDaySunny, // Clear sky
    1: WiDaySunnyOvercast, // Mainly clear
    2: WiDayCloudy, // Partly cloudy
    3: WiCloudy, // Overcast
    45: WiFog, // Fog
    48: WiSnowflakeCold, // Depositing rime fog
    51: WiSprinkle, // Light drizzle
    53: WiShowers, // Moderate drizzle
    55: WiRainMix, // Dense drizzle
    61: WiRain, // Slight rain
    63: WiRain, // Moderate rain
    65: WiRainWind, // Heavy rain
    71: WiSnow, // Slight snow
    73: WiSnow, // Moderate snow
    75: WiSnow, // Heavy snow
    77: WiSnowflakeCold, // Snow grains
    80: WiRain, // Slight rain showers
    81: WiRain, // Moderate rain showers
    82: WiRainWind, // Violent rain showers
    85: WiSnow, // Slight snow showers
    86: WiSnow, // Heavy snow showers
    95: WiThunderstorm, // Thunderstorm
    96: WiThunderstorm, // Thunderstorm with slight hail
    99: WiThunderstorm, // Thunderstorm with heavy hail
  },
  night: {
    0: WiNightClear, // Clear sky
    1: WiNightAltCloudy, // Mainly clear
    2: WiNightAltCloudy, // Partly cloudy
    3: WiCloudy, // Overcast
    45: WiFog, // Fog
    48: WiSnowflakeCold, // Depositing rime fog
    51: WiSprinkle, // Light drizzle
    53: WiShowers, // Moderate drizzle
    55: WiRainMix, // Dense drizzle
    61: WiRain, // Slight rain
    63: WiRain, // Moderate rain
    65: WiRainWind, // Heavy rain
    71: WiSnow, // Slight snow
    73: WiSnow, // Moderate snow
    75: WiSnow, // Heavy snow
    77: WiSnowflakeCold, // Snow grains
    80: WiRain, // Slight rain showers
    81: WiRain, // Moderate rain showers
    82: WiRainWind, // Violent rain showers
    85: WiSnow, // Slight snow showers
    86: WiSnow, // Heavy snow showers
    95: WiThunderstorm, // Thunderstorm
    96: WiThunderstorm, // Thunderstorm with slight hail
    99: WiThunderstorm, // Thunderstorm with heavy hail
  },
};

function WeatherIcon({ code, time, sunrise, sunset, isDay }) {
  // Determine if it's day or night

  const isDaytime = isDay !== null ? isDay : time >= sunrise && time <= sunset;
  const dayOrNight = isDaytime ? "day" : "night";

  // Get the Icon component based on the code and time of day
  const IconComponent = weatherCodeToIcon[dayOrNight][code];

  // Handle unknown codes gracefully
  if (!IconComponent) {
    const FallBack = weatherCodeToIcon[dayOrNight][0];
    return <FallBack className="w-[2rem] h-fit" />;
  }

  // Render the corresponding icon
  return <IconComponent className="w-[2rem] h-fit" />;
}

export default WeatherIcon;
