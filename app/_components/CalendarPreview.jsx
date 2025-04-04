import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdChevronLeft, MdChevronRight, MdRestore } from "react-icons/md";
import getMonthDays from "../_lib/getMonthDays";
import { GoDotFill } from "react-icons/go";

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarPreview({
  initialDate,
  accentFunc = (f) => false,
  onChangeDate = (f) => f,
  singleClickToRestoreToNewDate = false,
}) {
  const [date, setDate] = useState(initialDate);
  const [calendar, setCalendar] = useState([]);

  const handleRestoreOriginalMonth = () => {
    if (!moment(date).isSame(initialDate || new Date(), "month"))
      setDate(initialDate || new Date());
  };

  const handleMonthChange = (value) => {
    setDate(moment(date).add(value, "months").toDate());
  };
  const handleRestoreCurrentMonth = () => {
    setDate(new Date());
  };

  const getStyles = (item) => {
    let style = "";
    const isAccent = accentFunc(moment(item.date));
    const isToday = moment(item.date).isSame(new Date(), "day");

    // handle text color

    style += ` ${
      isToday
        ? "text-white font-semibold "
        : item.current
        ? isAccent
          ? "text-white"
          : "text-foreground"
        : "text-foreground/50"
    }`;

    // handle background color
    style += ` ${
      item.current
        ? isAccent
          ? "bg-accent/60"
          : "bg-transparent"
        : isAccent
        ? "bg-accent/40"
        : "bg-transparent"
    }`;
    if (moment(new Date()).isSame(moment(item.date), "day"))
      style += " underline underline-offset-2";
    return style;
  };

  useEffect(() => {
    setCalendar(getMonthDays(date));
    onChangeDate(moment(date).toDate());
  }, [date]);

  useEffect(() => {
    if (!moment(date).isSame(initialDate || new Date(), "month")) {
      setDate(initialDate);
    }
  }, [initialDate]);

  return (
    <div className="flex flex-col gap-[3px] h-[18rem]">
      <div className="flex justify-between items-center pb-2 h-fit ">
        <div className="w-[80%] flex justify-between items-center h-fit">
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-foreground hover:text-white"
          >
            <MdChevronLeft className="w-[1.5rem] h-fit " />
          </button>
          <span className="font-semibold text-text flex items-center gap-4">
            {moment(date).format("yyyy  MMMM")}
          </span>
          <button
            onClick={() => handleMonthChange(1)}
            className="text-foreground hover:text-white"
          >
            <MdChevronRight className="w-[1.5rem] h-fit " />
          </button>
        </div>
        <button
          onDoubleClick={
            !singleClickToRestoreToNewDate
              ? handleRestoreCurrentMonth
              : handleRestoreOriginalMonth
          }
          onClick={
            singleClickToRestoreToNewDate
              ? handleRestoreCurrentMonth
              : handleRestoreOriginalMonth
          }
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
            {/* Decide to put buttons or divs */}

            {row.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-[3ch] h-fit  text-center p-1 rounded-lg  relative ${getStyles(
                    item
                  )}`}
                >
                  {moment(item.date).get("D")}
                  {moment(item.date).isSame(new Date(), "day") && (
                    <GoDotFill className="absolute top-[2px] right-[2px] w-[0.6rem] h-fit" />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarPreview;
