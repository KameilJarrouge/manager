import React from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function SelectedDays({ selectedDaysList = [] }) {
  return (
    <div className="flex items-center gap-1">
      {DAYS.map((day, index) => (
        <span
          key={index}
          className={`text-xs rounded py-0.5 w-[3ch] px-1 ${
            selectedDaysList.includes(day) ? "bg-accent/80" : "bg-input_bg/50"
          }`}
        >
          {day[0]}
        </span>
      ))}
    </div>
  );
}

export default SelectedDays;
