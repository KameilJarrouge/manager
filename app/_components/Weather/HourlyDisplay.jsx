import moment from "moment";
import React from "react";
import WeatherIcon from "./WeatherIcon";
import { WiRaindrop, WiThermometer } from "react-icons/wi";
import WindDirectionIcon from "./WindDirectionIcon";

function HourlyDisplay({
  forecast,
  selectedDay,
  value,
  hourSectionOffset,
  units,
}) {
  return (
    <div
      className={`flex flex-col gap-0.5 items-center  p-1 rounded-lg ${
        moment(
          forecast[selectedDay].hours[value + hourSectionOffset].time
        ).isSame(new Date(), "hour") && "bg-foreground/15"
      } ${
        moment(
          forecast[selectedDay].hours[value + hourSectionOffset].time
        ).isBefore(new Date(), "hour") && "text-foreground/60"
      }`}
    >
      <span className="text-xs">
        {moment(
          forecast[selectedDay].hours[value + hourSectionOffset].time
        ).format("h a")}
      </span>
      <WeatherIcon
        code={
          forecast[selectedDay].hours[value + hourSectionOffset].weatherCode
        }
        isDay={true}
      />
      <div className="w-full h-[1px] bg-foreground/10 mb-1"></div>
      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <WiThermometer className="w-[1rem] h-fit" />

          <span className="text-xs w-[8ch]">
            {forecast[selectedDay].hours[value + hourSectionOffset]
              .temperature +
              " " +
              units.hourlyUnits.temperature_2m}
          </span>
        </div>
        <div className="flex items-center">
          <WindDirectionIcon
            direction={
              forecast[selectedDay].hours[value + hourSectionOffset]
                .windDirection
            }
          />
          <span className="text-xs w-[8ch]">
            {forecast[selectedDay].hours[value + hourSectionOffset].windSpeed +
              " " +
              units.hourlyUnits.windspeed_10m}
          </span>
        </div>
        <div className="flex items-center">
          <WiRaindrop className="w-[1rem] h-fit" />

          <span className="text-xs w-[8ch]">
            {forecast[selectedDay].hours[value + hourSectionOffset]
              .precipitation +
              " " +
              units.hourlyUnits.precipitation}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HourlyDisplay;
