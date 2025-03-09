import React from "react";
import YearlyCalendar from "../_components/YearlyCalendar";
import moment from "moment";
import { NUMBER_TO_MONTH_FULL } from "../_constants/constants";
import { GoDotFill } from "react-icons/go";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

function DatesList({ yearToView, dates, onSelect, selectedDate }) {
  const accentFunction = (month, date, isCurrent) => {
    if (!dates[month] || !isCurrent) return false;

    return (
      dates[month].filter((dateInMonth) => {
        return moment(date).get("D") === dateInMonth.day;
      }).length > 0
    );
  };

  return (
    <div className="w-full h-full flex gap-2 ">
      <YearlyCalendar yearToView={yearToView} accentFunc={accentFunction} />
      <div className="h-full w-[1px] bg-input_bg"></div>
      <div className="w-[30%] 2xl:w-[35%]  px-2 h-[65vh] 2xl:h-[78.5vh] overflow-y-auto flex flex-col gap-2">
        {Object.keys(dates).map((month) => (
          <div key={month} className="flex flex-col gap-4">
            <div className="w-full border-b border-b-input_bg" key={month}>
              {NUMBER_TO_MONTH_FULL[month]}
            </div>
            <div className="flex flex-col gap-2">
              {dates[month].map((date, index) => (
                <button
                  onClick={() => onSelect(date)}
                  key={index}
                  className={`flex items-center gap-1 w-full hover:bg-foreground/5`}
                >
                  <GoDotFill
                    className={`w-[0.6rem] h-fit ${
                      selectedDate && selectedDate.id === date.id
                        ? "text-green-600"
                        : "text-foreground/50"
                    } `}
                  />
                  <FiChevronLeft />
                  <span>{date.day}</span>
                  <FiChevronRight />
                  <span>{date.title}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatesList;
