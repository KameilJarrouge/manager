import moment from "moment";
import React from "react";
import WeatherIcon from "./WeatherIcon";

function DailyDisplay({ setSelectedDay, index, selectedDay, forecast, units }) {
  return (
    <button
      key={index}
      onClick={() => setSelectedDay(index)}
      className={`flex items-center p-2 hover:bg-foreground/15 transition-colors rounded-lg ${
        moment(index).isSame(selectedDay, "day") && "bg-foreground/15"
      }`}
    >
      <div className="flex flex-col gap-0.5 items-start">
        <span className="text-xs">{moment(index).format("D MMM")}</span>
        <WeatherIcon code={forecast[index].day.weatherCode} isDay={true} />
        <div className="flex flex-col">
          <div className="flex items-center gap-0.5">
            <span className="text-xs w-[3.5ch] text-start">
              {forecast[index].day.maxTemperature}
            </span>
            <span className="text-xs">
              {units.currentWeatherUnits.temperature}
            </span>
          </div>
          <div className="flex items-center  gap-0.5">
            <span className="text-xs w-[3.5ch] text-start">
              {forecast[index].day.minTemperature}
            </span>
            <span className="text-xs">
              {units.currentWeatherUnits.temperature}
            </span>
          </div>
        </div>
      </div>
      <span className={`text-base pb-5`}>{moment(index).format("ddd")}</span>
    </button>
  );
}

export default DailyDisplay;
