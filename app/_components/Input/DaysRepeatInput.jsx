import React from "react";
import { MdOutlineCheck } from "react-icons/md";
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function DaysRepeatInput({ value = [], setValue = (f) => f }) {
  const handleToggleDay = (day) => {
    if (!value.includes(day)) {
      let tempValue = [day, ...value];
      setValue(tempValue);
    } else {
      setValue(value.filter((value) => value !== day));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-y-1 gap-x-2 w-fit    ">
      {daysOfTheWeek.map((day, index) => (
        <button
          key={index}
          onClick={() => handleToggleDay(day)}
          className={`flex justify-between gap-4 items-center cursor-pointer p-2 hover:bg-foreground/5 rounded `}
        >
          {day}

          <MdOutlineCheck
            className={`text-foreground bg-accent rounded p-0.5 ${
              !value.includes(day) ? "invisible" : "visible"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default DaysRepeatInput;
