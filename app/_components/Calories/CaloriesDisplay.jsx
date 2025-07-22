import React, { useEffect, useMemo, useState } from "react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdOutlineLocalFireDepartment,
} from "react-icons/md";
import TodayModal from "./Day/TodayModal";
import api from "@/app/_lib/api";
import LoadingComponent from "../LoadingComponent";
import getBodyStats from "@/app/_lib/caloriesHelper";
import { TbDelta } from "react-icons/tb";

function CaloriesDisplay() {
  const [today, setToday] = useState({});
  const [isTodayModalOpen, setIsTodayModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totals, setTotals] = useState({ intake: 0, burn: 0 });
  const [personalInformation, setPersonalInformation] = useState({});
  const [difference, setDifference] = useState(0);
  const [stats, setStats] = useState({ BMI: "?", BMR: "?", bodyFat: "?" });

  const getPersonalInformation = async () => {
    setIsLoading(true);
    const result = await api.get(`/calories/personal-information`);
    setIsLoading(false);
    if (result.data.success) {
      setPersonalInformation(result.data.result);
    }
  };
  const getToday = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/days/today");
    setIsLoading(false);

    if (result.data.success) {
      setToday(result.data.result);
      calculateTotals(result.data.result);
    }
  };

  const handleGetBodyStats = () => {
    setStats(
      getBodyStats(
        personalInformation?.yearOfBirth || 2000,
        personalInformation?.height || 170,
        today?.weight || 70,
        today?.neck || 38.1,
        today?.waist || 96,
        today?.hip || 97,
        personalInformation?.sex || "Male"
      )
    );
  };

  useEffect(() => {
    handleGetBodyStats();
  }, [personalInformation, today]);

  useMemo(() => {
    setDifference(
      Number(stats.BMR) + Number(totals.burn) - Number(totals.intake)
    );
  }, [totals]);

  const calculateTotals = (today) => {
    const intake = today.intake.reduce((prev, curr) => {
      prev += Number(curr.factor) * Number(curr.foodItem.calories);
      return prev;
    }, 0);
    const burn = today.burn.reduce((prev, curr) => {
      prev += Number(curr.factor) * Number(curr.activity.caloriesBurnedPerUnit);
      return prev;
    }, 0);
    setTotals({ intake: Math.round(intake), burn: Math.round(burn) });
  };

  useEffect(() => {
    getToday();
    getPersonalInformation();
  }, [isTodayModalOpen]);

  return (
    <div className="relative pt-3">
      {isLoading && <LoadingComponent />}
      <TodayModal
        isOpen={isTodayModalOpen}
        close={() => setIsTodayModalOpen(false)}
        today={today}
        triggerRefresh={getToday}
        totals={totals}
        difference={difference}
        stats={stats}
      />
      <button
        onClick={() => setIsTodayModalOpen(true)}
        className="w-fit text-sm flex items-center justify-center gap-4  hover:bg-foreground/10 p-1 rounded"
      >
        <div className="flex flex-col items-center">
          <MdOutlineLocalFireDepartment className="text-orange-500/80 w-[1.5rem] h-fit" />
          <span className="text-xs text-foreground">kcal</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-2 items-center justify-between">
            <MdArrowUpward className="text-green-400" />
            <span>{totals.intake.toLocaleString()} kcal</span>
          </div>
          <div className="h-[1px] w-full bg-foreground/50"></div>
          <div className="flex gap-2 items-center justify-between">
            <MdArrowDownward className="text-red-400" />
            <span>
              {`(${Number(
                stats.BMR
              ).toLocaleString()} + ${totals.burn.toLocaleString()}) ${(
                Number(stats.BMR) + Number(totals.burn)
              ).toLocaleString()}`}{" "}
              kcal
            </span>{" "}
          </div>
        </div>
        <div className="flex gap-1 items-center">
          (
          <TbDelta
            className={`${difference > 0 ? "text-red-400" : "text-green-400"}`}
          />
          <span className="text-sm text-foreground/80">
            {Math.abs(difference).toLocaleString()}
          </span>
          )
        </div>
      </button>
    </div>
  );
}

export default CaloriesDisplay;
