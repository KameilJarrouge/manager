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
import { MdOutlineChangeCircle, MdRestore, MdWarning } from "react-icons/md";
import { WiDaySunnyOvercast } from "react-icons/wi";
import LocationModal from "../Modals/LocationModal";

function WeatherForecast() {
  const [weatherInformation, setWeatherInformation] = useState({});
  const [selectedLocation, setSelectedLocation] = useState();

  const [showDetails, setShowDetails] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  const [isLoading, setIsLoading] = useState(false);
  const [inTransition, setInTransition] = useState(true);
  const [hourSectionOffset, setHourSectionOffset] = useState(0);
  const [shouldWarn, setShouldWarn] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);

  /**
   * This will put store the weatherInformation state in localstorage
   */
  const cacheWeatherData = (value) => {
    localStorage.setItem("weather-info", JSON.stringify(value));
    localStorage.setItem(
      "last-selected-location",
      JSON.stringify(selectedLocation)
    );
  };

  const isCacheExpired = (dateTime) => {
    if (!dateTime) return true;
    return Math.abs(moment().diff(moment(dateTime), "minutes")) >= 15;
  };

  const fetchWeatherData = async () => {
    if (!selectedLocation) return;
    // Check if Cached Data is still valid
    if (
      weatherInformation.hasOwnProperty(selectedLocation) &&
      !isCacheExpired(weatherInformation[selectedLocation].date)
    ) {
      // setFromCache(false);
      setShouldWarn(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${String(
          weatherInformation[selectedLocation].latitude
        ).trim()}&longitude=${String(
          weatherInformation[selectedLocation].longitude
        ).trim()}&current_weather=true&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode,sunrise,sunset&timezone=auto`
      );

      const data = await response.json();
      setIsLoading(false);

      const units = {
        currentWeatherUnits: data.current_weather_units,
        hourlyUnits: data.hourly_units,
        dailyUnits: data.daily_units,
      };
      const processedWeatherData = preProcessWeatherData(data);

      let temp = { ...weatherInformation };
      temp[selectedLocation] = {
        ...weatherInformation[selectedLocation],
        date: moment(),
        forecast: processedWeatherData,
        currentWeather: data.current_weather,
        units: units,
      };
      setWeatherInformation(temp);
      cacheWeatherData(temp);
    } catch (error) {
      if (weatherInformation.hasOwnProperty(selectedLocation))
        setShouldWarn(true);
      else {
        toast.error("Couldn't Fetch Weather Info");
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
    if (!menu && !currentWeatherButton) return;
    if (!menu.contains(e.target) && !currentWeatherButton.contains(e.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    setWeatherInformation(
      JSON.parse(localStorage.getItem("weather-info")) || {}
    );
    setSelectedLocation(
      localStorage.getItem("last-selected-location") !== "undefined"
        ? JSON.parse(localStorage.getItem("last-selected-location"))
        : ""
    );
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
    }, 900000);
    return () => clearInterval(intervalId);
  }, [selectedLocation, weatherInformation]);

  useEffect(() => {
    cacheWeatherData(weatherInformation);
  }, [weatherInformation]);

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
      <LocationModal
        weatherInformation={weatherInformation}
        setWeatherInformation={setWeatherInformation}
        isOpen={isLocationMenuOpen}
        close={() => setIsLocationMenuOpen(false)}
        setSelected={setSelectedLocation}
        selected={selectedLocation}
      />
      {!selectedLocation && (
        <button
          onClick={() => setIsLocationMenuOpen(true)}
          className="text-sm hover:bg-foreground/10 px-2 py-0.5 w-fit rounded text-start flex items-center justify-between gap-2 group relative"
        >
          <WiDaySunnyOvercast className="w-[1.5rem] h-fit group-hover:text-yellow-400" />
          <span>Select Weather Location</span>
          {/* <MdOutlineChangeCircle className="w-[1rem] h-fit text-transparent group-hover:text-green-400 " /> */}
        </button>
      )}
      {!weatherInformation.hasOwnProperty(selectedLocation) &&
        selectedLocation && (
          // I think I should add a way to change location here !!!!
          <div className="flex text-sm gap-2 items-center">
            <span>No Weather Information</span>
            <button className="group " onClick={fetchWeatherData}>
              <MdRestore className="text-sm text-green-500" />
            </button>
          </div>
        )}
      {selectedLocation &&
        Object.keys(weatherInformation[selectedLocation]).length > 2 && (
          <>
            <div className="flex gap-1 ">
              <MainWeatherDisplay
                currentWeather={
                  weatherInformation[selectedLocation].currentWeather
                }
                fetchWeatherData={fetchWeatherData}
                openMenu={openMenu}
                units={weatherInformation[selectedLocation].units}
              />
              <div className="flex flex-col gap-1  items-start justify-end">
                <button
                  onClick={() => setIsLocationMenuOpen(true)}
                  className="text-sm hover:bg-foreground/10 px-2 py-0.5 w-fit rounded text-start flex items-center justify-between gap-2 group"
                >
                  {selectedLocation || "Select Location"}
                  <MdOutlineChangeCircle className="w-[1rem] h-fit text-transparent group-hover:text-green-400 " />
                </button>
                <div className="flex gap-1 items-start pl-2">
                  <span className="text-xs ">
                    Updated:{" "}
                    {moment(weatherInformation[selectedLocation].date).format(
                      "hh:mm a"
                    )}
                  </span>
                  {shouldWarn && (
                    <button className="group " onClick={fetchWeatherData}>
                      <MdWarning className="text-sm text-yellow-500 group-hover:hidden block" />
                      <MdRestore className="text-sm text-green-500 group-hover:block hidden" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <WeatherMenu
              inTransition={inTransition}
              isCollapsing={isCollapsing}
              showDetails={showDetails}
            >
              {/* Daily */}
              <div className="flex w-full  gap-8 items-center">
                {Object.keys(weatherInformation[selectedLocation].forecast).map(
                  (key, index, arr) => (
                    <DailyDisplay
                      forecast={weatherInformation[selectedLocation].forecast}
                      index={key}
                      key={index}
                      selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay}
                      units={weatherInformation[selectedLocation].units}
                    />
                  )
                )}
              </div>

              {/* H Separator */}
              <div className="w-full h-[1px] bg-foreground/10 mt-1" />

              {/* Selected Day Info */}
              <DailyInfoDisplay
                forecast={weatherInformation[selectedLocation].forecast}
                selectedDay={selectedDay}
                units={weatherInformation[selectedLocation].units}
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
                    forecast={weatherInformation[selectedLocation].forecast}
                    hourSectionOffset={hourSectionOffset}
                    selectedDay={selectedDay}
                    units={weatherInformation[selectedLocation].units}
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
