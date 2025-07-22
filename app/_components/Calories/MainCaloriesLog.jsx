import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent";
import moment from "moment";
import DayDisplay from "./DayDisplay";
import SelectDateAndMonth from "./SelectDateAndMonth";
import DayModal from "./Day/DayModal";
import { toast } from "react-toastify";

function MainCaloriesLog({ personalInformation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleGetMonth = async () => {
    setIsLoading(true);
    const result = await api.get(`/calories/days?date=${selectedDate}`);
    setIsLoading(false);
    if (result.data.success) {
      setDays(
        result.data.result.reduce((prev, day) => {
          prev[moment(day.date).format("DD")] = day;
          return prev;
        }, {})
      );
    }
  };
  const daysOfMonthForSelectedDate = () => {
    let result = [];
    for (let i = 1; i <= moment(selectedDate).daysInMonth(); i++) {
      result.push(i);
    }
    return result;
  };

  const handleDeleteDay = async (dayId) => {
    if (!confirm("Do you want to remove this day?")) return;

    setIsLoading(true);
    const result = await api.delete(`/calories/days/${dayId}/delete`);
    setIsLoading(false);

    if (result.data.success) {
      toast("Day is Deleted!");
      handleGetMonth();
    }
  };

  useEffect(() => {
    handleGetMonth();
  }, [selectedDate]);

  return (
    <div className="relative w-full flex flex-col gap-2 ">
      {selectedDay && (
        <DayModal
          close={() => {
            setSelectedDay(null);
            handleGetMonth();
          }}
          selectedDay={selectedDay}
          personalInformation={personalInformation}
          isOpen={true}
        />
      )}
      {isLoading && <LoadingComponent />}
      <div className="w-full flex items-center gap-2 bg-secondary rounded shadow shadow-black h-[2.5rem]">
        <SelectDateAndMonth
          restore={() => setSelectedDate(new Date())}
          selectedDate={selectedDate}
          setDate={setSelectedDate}
        />
      </div>

      <div className="w-full grid grid-cols-7 gap-1">
        {daysOfMonthForSelectedDate().map((day) => (
          <DayDisplay
            key={(days[day]?.id || "e") + "-" + day}
            day={days[day]}
            dayOfTheMonth={day}
            personalInformation={personalInformation}
            selectedDate={selectedDate}
            setSelectedDay={setSelectedDay}
            handleDeleteDay={handleDeleteDay}
          />
        ))}
      </div>
    </div>
  );
}

export default MainCaloriesLog;
