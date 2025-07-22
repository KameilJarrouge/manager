import Modal from "@/app/_components/Modals/Modal";
import React, { useEffect, useMemo, useState } from "react";
import DisplayDay from "./DisplayDay";
import getBodyStats from "@/app/_lib/caloriesHelper";
import api from "@/app/_lib/api";
import LoadingComponent from "../../LoadingComponent";
import moment from "moment";

function DayModal({ isOpen, close, selectedDay, personalInformation }) {
  const [day, setDay] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [totals, setTotals] = useState({ intake: 0, burn: 0 });

  const [difference, setDifference] = useState(0);
  const [stats, setStats] = useState({ BMI: "?", BMR: "?", bodyFat: "?" });
  const getDay = async () => {
    setIsLoading(true);
    const result = await api.get(
      `/calories/days/by-day?date=${moment(selectedDay).format("YYYY-MM-DD")}`
    );
    setIsLoading(false);

    if (result.data.success) {
      setDay(result.data.result);
      calculateTotals(result.data.result);
    }
  };
  const calculateTotals = (day) => {
    const intake = day.intake.reduce((prev, curr) => {
      prev += Number(curr.factor) * Number(curr.foodItem.calories);
      return prev;
    }, 0);
    const burn = day.burn.reduce((prev, curr) => {
      prev += Number(curr.factor) * Number(curr.activity.caloriesBurnedPerUnit);
      return prev;
    }, 0);
    setTotals({ intake: Math.round(intake), burn: Math.round(burn) });
  };

  const handleGetBodyStats = () => {
    setStats(
      getBodyStats(
        personalInformation.yearOfBirth || 2000,
        personalInformation.height || 170,
        day.weight || 70,
        day.neck || 38.1,
        day.waist || 96,
        day.hip || 97,
        personalInformation.sex || "Male"
      )
    );
  };

  useEffect(() => {
    handleGetBodyStats();
  }, [personalInformation, day]);

  useEffect(() => {
    getDay();
  }, [selectedDay]);

  useMemo(() => {
    setDifference(
      Number(stats.BMR) + Number(totals.burn) - Number(totals.intake)
    );
  }, [totals]);
  return (
    <Modal
      key={"Day_Modal"}
      id={"Day_Modal"}
      isOpen={isOpen}
      close={close}
      title={`Calories Information`}
      className={"gap-4 relative"}
    >
      {isLoading && <LoadingComponent />}
      <DisplayDay
        day={day}
        triggerRefresh={getDay}
        totals={totals}
        difference={difference}
        stats={stats}
      />
    </Modal>
  );
}

export default DayModal;
