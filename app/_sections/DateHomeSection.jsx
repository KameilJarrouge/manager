"use client";
import React, { useEffect, useState } from "react";
import CalendarPreview from "../_components/CalendarPreview";
import api from "../_lib/api";
import moment from "moment";
import LoadingComponent from "../_components/LoadingComponent";
import { GoDotFill } from "react-icons/go";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

function DateHomeSection() {
  const [viewingDate, setViewingDate] = useState(new Date());
  const [latestDates, setLatestDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getLatestDates = async () => {
    setIsLoading(true);
    const result = await api.get(
      `/dates/latest?month=${moment(viewingDate).get("month") + 1}`
    );
    setIsLoading(false);
    if (result.data.success) {
      setLatestDates(result.data.result);
    }
  };

  const handleAccentFunction = (date) => {
    if (moment(date).isBefore(viewingDate, "month")) return false;
    return (
      latestDates.filter((dateItem) => dateItem.day === moment(date).get("D"))
        .length > 0
    );
  };

  useEffect(() => {
    getLatestDates();
  }, [viewingDate]);

  return (
    <div className="flex flex-col gap-1 w-fit items-center relative">
      {isLoading && <LoadingComponent />}

      <div className="w-[40ch] 2xl:w-[50ch]">
        <CalendarPreview
          singleClickToRestoreToNewDate
          initialDate={viewingDate}
          onChangeDate={(date) => setViewingDate(date)}
          accentFunc={handleAccentFunction}
        />
      </div>
      <div className="w-full h-[1px] bg-foreground/50" />
      <div className="w-full h-[11rem] 2xl:h-[30rem] overflow-y-auto">
        {latestDates.map((date) => (
          <div
            key={date.id}
            className="flex items-center gap-2 px-2 border-b border-b-input_bg"
          >
            <GoDotFill className="w-[0.7rem] h-fit" />
            <div className="flex items-center gap-0.5">
              <FiChevronsLeft />
              <span>{date.day}</span>
              <FiChevronsRight />
            </div>
            <span className="w-[30ch] 2xl:w-[40ch]">{date.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateHomeSection;
