import React from "react";
import WeatherIcon from "./WeatherIcon";
import { WiThermometer } from "react-icons/wi";
import WindDirectionIcon from "./WindDirectionIcon";
import moment from "moment";

function MainWeatherDisplay({
  openMenu,
  fetchWeatherData,
  currentWeather,
  units,
}) {
  return (
    <button
      id="current-weather-button"
      onClick={() => {
        openMenu();
        fetchWeatherData();
      }}
      className="flex gap-2 items-end h-full hover:bg-foreground/10 px-2 rounded"
    >
      <div className="flex flex-col gap items-center">
        <WeatherIcon
          code={currentWeather.weathercode}
          isDay={currentWeather.is_day}
        />
        <span className="text-sm">{moment().format("DD MMM")}</span>
      </div>
      <div className="w-[1px] h-full bg-input_bg" />

      <div className="flex flex-col gap-0.5 justify-end   ">
        <div className="flex items-center gap-0.5">
          <WiThermometer className="w-[1rem] h-fit" />

          <span className="text-sm">
            {currentWeather.temperature +
              " " +
              units.currentWeatherUnits.temperature}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <WindDirectionIcon direction={currentWeather.winddirection} />
          <span className="text-sm">
            {currentWeather.windspeed +
              " " +
              units.currentWeatherUnits.windspeed}
          </span>
        </div>
      </div>
    </button>
  );
}

export default MainWeatherDisplay;
