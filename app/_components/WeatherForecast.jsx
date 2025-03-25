"use client";
import moment from "moment";
import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";
import LoadingComponent from "./LoadingComponent";
import WindDirectionIcon from "./WindDirectionIcon";
import { WiThermometer } from "react-icons/wi";
import { toast } from "react-toastify";

function WeatherForecast() {
  const [currentWeather, setCurrentWeather] = useState(null); // Stores fetched data
  const [units, setUnits] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // Controls visibility of details
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(moment());
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async () => {
    // Cache forecast for an hour
    if (moment().isSame(lastFetchTime, "hour") && currentWeather) return;
    setIsLoading(true);

    setLastFetchTime(moment());
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=35.04032814426549&longitude=36.335224785230835&current_weather=true&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode,sunrise,sunset&timezone=auto"
      );
    } catch (error) {
      toast.error("Couldn't Fetch Weather Info");
      setIsLoading(false);
      return;
    }
    const data = await response.json();
    setUnits({
      currentWeatherUnits: data.current_weather_units,
      hourlyUnits: data.hourly_units,
      dailyUnits: data.daily_units,
    });
    setCurrentWeather(data.current_weather); // Store data in state

    let forecast = data.hourly.time.reduce((prev, curr, index) => {
      if (prev.hasOwnProperty(moment(curr).format("YYYY-MM-DD"))) {
        prev[moment(curr).format("YYYY-MM-DD")] = {
          hours: [
            ...prev[moment(curr).format("YYYY-MM-DD")].hours,
            {
              time: curr,
              temperature: data.hourly.temperature_2m[index],
              precipitation: data.hourly.precipitation[index],
              windSpeed: data.hourly.windspeed_10m[index],
              windDirection: data.hourly.winddirection_10m[index],
              weatherCode: data.hourly.weathercode[index],
            },
          ],
        };
      } else {
        prev[moment(curr).format("YYYY-MM-DD")] = {
          hours: [
            {
              time: curr,
              temperature: data.hourly.temperature_2m[index],
              precipitation: data.hourly.precipitation[index],
              windSpeed: data.hourly.windspeed_10m[index],
              windDirection: data.hourly.winddirection_10m[index],
              weatherCode: data.hourly.weathercode[index],
            },
          ],
        };
      }
      return prev;
    }, {});
    for (let i = 0; i < data.daily.time.length; i++) {
      forecast[data.daily.time[i]]["day"] = {
        minTemperature: data.daily.temperature_2m_min[i],
        maxTemperature: data.daily.temperature_2m_max[i],
        precipitationSum: data.daily.precipitation_sum[i],
        maxWindSpeed: data.daily.windspeed_10m_max[i],
        weatherCode: data.daily.weathercode[i],
        sunrise: data.daily.sunrise[i],
        sunset: data.daily.sunset[i],
      };
    }
    setIsLoading(false);
    setForecast(forecast);
  };

  const closeMenu = () => {
    setIsCollapsing(true);
    setTimeout(() => {
      setShowDetails(false);
    }, 180);
  };

  const openMenu = () => {
    setIsCollapsing(false);
    setShowDetails(true);
  };

  /**
   * handles hiding the menu when clicked outside
   * @param {Object} e mouse click event
   */
  const handleMouseClick = (e) => {
    const menu = document.getElementById("forecast-menu");
    const currentWeatherButton = document.getElementById(
      "current-weather-button"
    );
    if (!menu.contains(e.target) && !currentWeatherButton.contains(e.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    const body = document.getElementById("body");
    if (!body) return;

    body.addEventListener("mousedown", handleMouseClick);

    return () => {
      body.removeEventListener("mousedown", handleMouseClick);
    };
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <button
      id="current-weather-button"
      onClick={() => openMenu()}
      className=" relative min-w-[5rem] pt-3"
    >
      {isLoading && <LoadingComponent />}
      {currentWeather && (
        <div className="flex gap-2 items-end h-full hover:bg-foreground/10 px-2 rounded">
          <div className="flex flex-col gap items-center">
            <WeatherIcon
              code={currentWeather.weathercode}
              isDay={currentWeather.is_day}
            />
            <span className="text-sm">{moment().format("DD MMM")}</span>
          </div>
          <div className="w-[1px] h-full bg-input_bg" />

          <div className="flex flex-col gap-0.5 justify-end   ">
            <div className="flex items-center">
              <WiThermometer className="w-[1.2rem] h-fit" />

              <span className="text-sm">
                {currentWeather.temperature +
                  " " +
                  units.currentWeatherUnits.temperature}
              </span>
            </div>
            <div className="flex items-center">
              <WindDirectionIcon direction={currentWeather.winddirection} />
              <span className="text-sm">
                {currentWeather.windspeed +
                  " " +
                  units.currentWeatherUnits.windspeed}
              </span>
            </div>
          </div>
        </div>
      )}
      <div
        id="forecast-menu"
        className={`  z-20 top-[4.1rem] ${
          showDetails ? "absolute" : "hidden"
        } ${
          isCollapsing ? "animate-collapse" : "animate-expand"
        } bg-secondary h-[25rem] 2xl:h-[40rem] w-[40rem] origin-left rounded py-2 px-4 text-justify  shadow shadow-black`}
      ></div>
    </button>
  );
}
export default WeatherForecast;
