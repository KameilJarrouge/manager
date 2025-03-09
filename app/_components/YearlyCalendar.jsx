import React, { useEffect, useState } from "react";
import moment from "moment";
import getMonthDays from "../_lib/getMonthDays";
import { GoDotFill } from "react-icons/go";

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function YearlyCalendar({ yearToView, accentFunc = (f) => false }) {
  const [listOfMonths, setListOfMonths] = useState([]);

  const handleFillList = () => {
    const listOfMonths = [];
    const firstMonth = moment(yearToView).startOf("year");

    listOfMonths.push(firstMonth.toDate());
    for (let i = 0; i < 11; i++) {
      listOfMonths.push(firstMonth.add(1, "months").toDate());
    }

    setListOfMonths(listOfMonths);
  };

  useEffect(() => {
    handleFillList();
  }, [yearToView]);

  return (
    <div className="w-[70%] 2xl:w-[65%]  pt-5 flex gap-x-3 gap-y-6  flex-wrap h-[65vh] 2xl:h-[78.5vh] overflow-y-auto">
      {listOfMonths.map((month, index) => (
        <Month
          key={index}
          firstDayOfMonth={month}
          accentFunc={(date, isCurrent) =>
            accentFunc(index + 1, date, isCurrent)
          }
        />
      ))}
    </div>
  );
}

function Month({ firstDayOfMonth, accentFunc = (f) => false }) {
  const [calendar, setCalendar] = useState([]);

  const getStyles = (item) => {
    let style = "";
    const isAccent = accentFunc(moment(item.date), item.current);
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
    style += ` ${isAccent ? "bg-accent/80" : "bg-transparent"}`;

    if (moment(new Date()).isSame(moment(item.date), "day"))
      style += " underline underline-offset-2 ";
    return style;
  };

  useEffect(() => {
    setCalendar(getMonthDays(firstDayOfMonth));
  }, [firstDayOfMonth]);

  // useEffect(() => {
  //   if (!moment(date).isSame(initialDate || new Date(), "month")) {
  //     setDate(initialDate);
  //   }
  // }, [initialDate]);

  return (
    <div className="flex flex-col gap-[1px] h-[14.9rem] border border-foreground/20 relative group p-0.5 rounded">
      <span className="absolute left-0 -top-6 text-sm  text-white font-semibold p-0.5  flex items-center gap-2 ">
        {moment(firstDayOfMonth).format("MMMM")}
        {moment(new Date()).isSame(firstDayOfMonth, "month") && (
          <GoDotFill className="text-green-600" />
        )}
      </span>
      <div className="flex gap-2 text-text font-semibold items-center  ">
        {daysOfTheWeek.map((day, index) => (
          <div key={index} className={`w-[3ch] text-center`}>
            {day}
          </div>
        ))}
      </div>
      <div className="w-full h-[1px] ] bg-input_bg" />
      {calendar.map((row, index) => {
        return (
          <div key={index} className="flex gap-2  items-center  text-text ">
            {row.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-[3ch] h-fit  text-center p-1 rounded-lg relative ${getStyles(
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

export default YearlyCalendar;
