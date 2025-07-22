import { calculateBMR } from "@/app/_lib/caloriesHelper";
import moment from "moment";
import React, { useMemo } from "react";
import { GoDotFill } from "react-icons/go";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { TbDelta } from "react-icons/tb";

function DayDisplay({
  day,
  dayOfTheMonth,
  personalInformation,
  selectedDate,
  setSelectedDay,
  handleDeleteDay,
}) {
  const dayStats = useMemo(() => {
    if (!day) return 0;
    return calculateBMR(
      day.weight,
      personalInformation.height,
      day.sex,
      new Date().getFullYear() - personalInformation?.yearOfBirth || 2000
    );
  }, [day, personalInformation]);

  const getDateFromDay = (day) => {
    return new Date(selectedDate).setDate(day);
  };

  return (
    <button
      onContextMenu={(e) => {
        if (!day) return;
        e.preventDefault();
        handleDeleteDay(day.id);
      }}
      onClick={() => {
        const selectedDay = getDateFromDay(dayOfTheMonth);
        if (moment(selectedDay).isAfter(new Date())) return;
        setSelectedDay(selectedDay);
      }}
      key={day}
      className={`w-full ${
        day ? "bg-secondary/70" : "bg-secondary/20"
      } text-sm border border-transparent  ${
        day ? "hover:border-foreground/60" : "hover:border-green-400/60"
      } p-1 shadow-sm shadow-black rounded flex flex-col gap-0.5`}
    >
      <div className="w-full flex justify-between ">
        <span className={`text-start`}>
          {day ? moment(day.date).format("DD") : dayOfTheMonth}
        </span>
        {day && moment(day.date).isSame(new Date(), "day") && (
          <GoDotFill className="text-accent" />
        )}
      </div>

      <div className="flex flex-col text-xs text-foreground/70">
        <div className="flex w-full justify-between bg-input_prefix_bg/10 border-b-[1px] border-b-foreground/10 items-center">
          <MdArrowUpward className="text-green-400" />

          <span>{Number(day?.total_intake || 0).toLocaleString() || "?"}</span>
        </div>
        <div className="flex w-full justify-between bg-input_prefix_bg/10 border-b-[1px] border-b-foreground/10 items-center">
          <MdArrowDownward className="text-red-400" />

          <span>
            {(dayStats + Number(day?.total_burn || 0)).toLocaleString() || "?"}
          </span>
        </div>
        <div className="flex w-full justify-between bg-input_prefix_bg/10 border-b-[1px] border-b-foreground/10 items-center">
          <TbDelta
            className={`${
              dayStats +
                Number(day?.total_burn || 0) -
                Number(day?.total_intake || 0) >
              0
                ? "text-red-400"
                : "text-green-400"
            }`}
          />
          <span>
            {Math.abs(
              dayStats +
                Number(day?.total_burn || 0) -
                Number(day?.total_intake || 0)
            ).toLocaleString() || "?"}
          </span>
        </div>
      </div>
    </button>
  );
}

export default DayDisplay;
