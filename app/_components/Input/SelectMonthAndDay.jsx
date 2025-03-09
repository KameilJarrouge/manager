import React, { useEffect, useState } from "react";
import { DAYS_COUNT, MONTH_TO_NUMBER } from "@/app/_constants/constants";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function SelectMonthAndDay({
  monthState,
  setMonthState = (f) => f,
  dayState,
  setDayState = (f) => f,
}) {
  const [days, setDays] = useState([]);
  const getDays = () => {
    let temp = [];
    for (let number = 1; number <= DAYS_COUNT[monthState]; number++) {
      temp.push(number);
    }
    setDays(temp);
  };
  useEffect(() => {
    getDays();
    if (dayState > DAYS_COUNT[monthState]) setDayState(DAYS_COUNT[monthState]);
  }, [monthState]);

  return (
    <div className="flex flex-col w-full  gap-2">
      <div className="grid grid-cols-4 gap-1">
        {MONTHS.map((month, index) => (
          <button
            key={index}
            className={`text-center p-0.5 rounded ${
              monthState === MONTH_TO_NUMBER[month]
                ? "bg-accent"
                : "hover:bg-foreground/10"
            }`}
            onClick={() => setMonthState(MONTH_TO_NUMBER[month])}
          >
            {month}
          </button>
        ))}
      </div>
      <div className="w-full h-[1px] bg-input_prefix_bg" />
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setDayState(day)}
            className={`text-center p-0.5 rounded ${
              dayState === day ? "bg-accent" : "hover:bg-foreground/10"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectMonthAndDay;
