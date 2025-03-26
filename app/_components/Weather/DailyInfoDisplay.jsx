import moment from "moment";
import React from "react";
import { WiRaindrop, WiSunrise, WiSunset, WiWindy } from "react-icons/wi";

function DailyInfoDisplay({ forecast, selectedDay, units }) {
  return (
    <div className="w-full flex items-center mt-2">
      <div className="flex gap-2 items-center w-1/4 justify-center">
        <WiSunrise className="w-[2rem] h-fit" />
        <span className="text-sm w-[8ch]">
          {moment(forecast[selectedDay].day.sunrise).format("hh:mm a")}
        </span>
      </div>
      <div className="w-[1px] h-3/4 bg-foreground/40" />
      <div className="flex gap-2 items-center w-1/4 justify-center">
        <WiSunset className="w-[2rem] h-fit" />
        <span className="text-sm w-[8ch]">
          {moment(forecast[selectedDay].day.sunset).format("hh:mm a")}
        </span>
      </div>{" "}
      <div className="w-[1px] h-3/4 bg-foreground/40" />
      <div className="flex gap-2 items-center w-1/4 justify-center">
        <WiRaindrop className="w-[2rem] h-fit" />
        <span className="text-sm w-[8ch]">
          {forecast[selectedDay].day.precipitationSum +
            " " +
            units.dailyUnits.precipitation_sum}
        </span>
      </div>
      <div className="w-[1px] h-3/4 bg-foreground/40" />
      <div className="flex gap-2 items-center w-1/4 justify-center">
        <WiWindy className="w-[2rem] h-fit" />
        <span className="text-sm w-[8ch]">
          {forecast[selectedDay].day.maxWindSpeed +
            " " +
            units.dailyUnits.windspeed_10m_max}
        </span>
      </div>
    </div>
  );
}

export default DailyInfoDisplay;
