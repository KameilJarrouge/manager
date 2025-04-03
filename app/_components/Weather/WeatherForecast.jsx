"use client";
import moment from "moment";
import React, { useState, useEffect } from "react";
import LoadingComponent from "../LoadingComponent";
import { toast } from "react-toastify";
import MainWeatherDisplay from "./MainWeatherDisplay";
import WeatherMenu from "./WeatherMenu";
import DailyDisplay from "./DailyDisplay";
import DailyInfoDisplay from "./DailyInfoDisplay";
import HourlyMenu from "./HourlyMenu";
import HourlyDisplay from "./HourlyDisplay";
import preProcessWeatherData from "../../_lib/preProcessWeatherData";
import { MdRestore, MdWarning } from "react-icons/md";

function WeatherForecast() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [units, setUnits] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  const [isLoading, setIsLoading] = useState(false);
  const [inTransition, setInTransition] = useState(true);
  const [hourSectionOffset, setHourSectionOffset] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(moment());
  const [noWeatherData, setNoWeatherData] = useState(false);
  const [shouldWarn, setShouldWarn] = useState(false);

  const setFromCache = (cachedWeatherData) => {
    setNoWeatherData(false);
    setCurrentWeather(cachedWeatherData.currentWeather);
    setForecast(cachedWeatherData.forecast);
    setUnits(cachedWeatherData.units);
    setUpdatedAt(moment(cachedWeatherData.date));
    setShouldWarn(moment(cachedWeatherData.date).isBefore(moment(), "hour"));
  };

  const fetchWeatherData = async () => {
    // Check if Cached Data is still valid
    const cachedWeatherData = JSON.parse(localStorage.getItem("weather-data"));
    if (
      cachedWeatherData &&
      moment(cachedWeatherData.date).isSame(moment(), "hour")
    ) {
      setFromCache(cachedWeatherData);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=35.04032814426549&longitude=36.335224785230835&current_weather=true&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode,sunrise,sunset&timezone=auto"
      );

      const data = await response.json();

      setUpdatedAt(moment());
      setNoWeatherData(false);
      setIsLoading(false);

      const units = {
        currentWeatherUnits: data.current_weather_units,
        hourlyUnits: data.hourly_units,
        dailyUnits: data.daily_units,
      };
      const processedWeatherData = preProcessWeatherData(data);

      localStorage.setItem(
        "weather-data",
        JSON.stringify({
          date: moment(),
          forecast: processedWeatherData,
          currentWeather: data.current_weather,
          units: units,
        })
      );

      setCurrentWeather(data.current_weather);
      setUnits(units);
      setForecast(processedWeatherData);
    } catch (error) {
      if (cachedWeatherData) setFromCache(cachedWeatherData);
      else {
        toast.error("Couldn't Fetch Weather Info");
        setNoWeatherData(true);
      }
      setIsLoading(false);
      return;
    }
  };

  const changeOffset = (value) => {
    if (
      (hourSectionOffset === 0 && value < 0) ||
      (hourSectionOffset === 18 && value > 0)
    )
      return;
    setHourSectionOffset((hourSectionOffset) => hourSectionOffset + 6 * value);
  };

  const closeMenu = () => {
    setInTransition(true);
    setIsCollapsing(true);
    setTimeout(() => {
      setShowDetails(false);
      setInTransition(false);
    }, 180);
  };

  const openMenu = () => {
    if (showDetails) return;
    setInTransition(true);
    setIsCollapsing(false);
    setShowDetails(true);
    setTimeout(() => {
      setInTransition(false);
    }, 180);
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
    const intervalId = setInterval(() => {
      fetchWeatherData();
    }, 600000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!showDetails) return;

    if (moment(selectedDay).isSame(moment(), "day")) {
      setHourSectionOffset(Math.trunc(moment().get("hour") / 6) * 6);
    } else {
      setHourSectionOffset(0);
    }
  }, [showDetails, selectedDay]);

  return (
    <div className=" relative min-w-[5rem] pt-3">
      {isLoading && <LoadingComponent />}
      {noWeatherData && (
        <div className="flex text-sm gap-2 items-center">
          <span>No Weather Information</span>
          <button className="group " onClick={fetchWeatherData}>
            <MdRestore className="text-sm text-green-500" />
          </button>
        </div>
      )}
      {currentWeather && forecast && (
        <>
          <div className="flex gap-2 ">
            <MainWeatherDisplay
              currentWeather={currentWeather}
              fetchWeatherData={fetchWeatherData}
              openMenu={openMenu}
              units={units}
            />
            <div className="flex gap-1 mt-3 items-start">
              <span className="text-xs ">
                Updated: {updatedAt.format("hh:mm a")}
              </span>
              {shouldWarn && (
                <button className="group " onClick={fetchWeatherData}>
                  <MdWarning className="text-sm text-yellow-500 group-hover:hidden block" />
                  <MdRestore className="text-sm text-green-500 group-hover:block hidden" />
                </button>
              )}
            </div>
          </div>
          <WeatherMenu
            inTransition={inTransition}
            isCollapsing={isCollapsing}
            showDetails={showDetails}
          >
            {/* Daily */}
            <div className="flex w-full  gap-8 items-center">
              {Object.keys(forecast).map((key, index, arr) => (
                <DailyDisplay
                  forecast={forecast}
                  index={key}
                  key={index}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  units={units}
                />
              ))}
            </div>

            {/* H Separator */}
            <div className="w-full h-[1px] bg-foreground/10 mt-1" />

            {/* Selected Day Info */}
            <DailyInfoDisplay
              forecast={forecast}
              selectedDay={selectedDay}
              units={units}
            />

            {/* H Separator */}
            <div className="w-full h-[1px] bg-foreground/10 mb-1" />

            <HourlyMenu
              changeOffset={changeOffset}
              setOffset={setHourSectionOffset}
              hourSectionOffset={hourSectionOffset}
            >
              {/* Hour */}
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <HourlyDisplay
                  forecast={forecast}
                  hourSectionOffset={hourSectionOffset}
                  selectedDay={selectedDay}
                  units={units}
                  value={value}
                  key={value}
                />
              ))}
            </HourlyMenu>
          </WeatherMenu>
        </>
      )}
    </div>
  );
}
export default WeatherForecast;
