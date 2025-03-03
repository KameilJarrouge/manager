import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdChevronLeft, MdChevronRight, MdRestore } from "react-icons/md";
import getMonthDays from "../_lib/getMonthDays";

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarSelect({ initialDate = new Date(), onSelect = (f) => f }) {
  const [date, setDate] = useState(initialDate);
  const [calendar, setCalendar] = useState([]);

  const handleRestoreOriginalMonth = () => {
    if (!moment(date).isSame(initialDate || new Date(), "month"))
      setDate(initialDate || new Date());
  };

  const handleRestoreCurrentMonth = () => {
    setDate(new Date());
  };
  const handleMonthChange = (value) => {
    setDate(moment(date).add(value, "months").toDate());
  };

  const handleYearChange = (value) => {
    setDate(moment(date).add(value, "years").toDate());
  };

  const getStyles = (item) => {
    let style = "";
    const isToday = moment(item.date).isSame(new Date(), "day");

    // handle text color

    style += ` ${
      isToday
        ? "text-white font-semibold underline underline-offset-2 "
        : item.current
        ? "text-foreground"
        : "text-foreground/50"
    }`;

    if (initialDate && moment(initialDate).isSame(moment(item.date), "day"))
      style += " bg-accent";
    return style;
  };

  useEffect(() => {
    setCalendar(getMonthDays(date));
  }, [date]);

  useEffect(() => {
    if (!moment(date).isSame(initialDate || new Date(), "month")) {
      setDate(initialDate);
    }
  }, [initialDate]);

  return (
    <div className="flex flex-col gap-[3px] h-[18rem]">
      <div className="flex justify-between items-center pb-2 h-fit ">
        <div className="flex gap-4 items-center">
          <div className="w-fit flex items-center h-fit">
            <button
              onClick={() => handleYearChange(-1)}
              className="text-foreground hover:text-white"
            >
              <MdChevronLeft className="w-[1.5rem] h-fit " />
            </button>
            <span className="font-semibold w-[4ch]  ">
              {moment(date).format("yyyy")}
            </span>
            <button
              onClick={() => handleYearChange(1)}
              className="text-foreground hover:text-white"
            >
              <MdChevronRight className="w-[1.5rem] h-fit " />
            </button>
          </div>
          <div className="w-fit flex items-center h-fit">
            <button
              onClick={() => handleMonthChange(-1)}
              className="text-foreground hover:text-white"
            >
              <MdChevronLeft className="w-[1.5rem] h-fit " />
            </button>
            <span className="font-semibold text-text w-[8ch] text-center">
              {moment(date).format("MMMM")}
            </span>
            <button
              onClick={() => handleMonthChange(1)}
              className="text-foreground hover:text-white"
            >
              <MdChevronRight className="w-[1.5rem] h-fit " />
            </button>
          </div>
        </div>

        <button
          onDoubleClick={handleRestoreCurrentMonth}
          onClick={handleRestoreOriginalMonth}
          className="text-foreground hover:text-white"
        >
          <MdRestore className="w-[1.5rem] h-fit " />
        </button>
      </div>
      <div className="w-full h-[1px] bg-input_bg" />

      <div className="flex gap-2 text-text font-semibold items-center justify-between ">
        {daysOfTheWeek.map((day, index) => (
          <div key={index} className={`w-[3ch]`}>
            {day}
          </div>
        ))}
      </div>
      <div className="w-full h-[1px] ] bg-input_bg" />
      {calendar.map((row, index) => {
        return (
          <div
            key={index}
            className="flex gap-3  items-center justify-between text-text "
          >
            {row.map((item, index) => {
              return (
                <button
                  onClick={() => onSelect(moment(item.date).toDate())}
                  key={index}
                  className={`w-[3ch] h-fit  text-center p-1 rounded-lg  ${getStyles(
                    item
                  )} border border-transparent hover:border-input_bg`}
                >
                  {moment(item.date).get("D")}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarSelect;
