import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../../LoadingComponent";
import UpdateTodayPersonalInfo from "./Forms/UpdateTodayPersonalInfo";
import IntakeList from "./IntakeList";
import BurnList from "./BurnList";

function DisplayToday({ today, totals, triggerRefresh, difference, stats }) {
  const [intakeOptions, setIntakeOptions] = useState([]);
  const [burnOptions, setBurnOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIntakeOptions = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/intake/get-options");
    setIsLoading(false);
    if (result.data.success) {
      const { meals, foodItems } = result.data.result;
      setIntakeOptions([
        ...meals.map((meal) => ({ ...meal, isMeal: true })),
        ...foodItems.map((foodItem) => ({ ...foodItem, isMeal: false })),
      ]);
    }
  };

  const getBurnOptions = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/burn/get-options");
    setIsLoading(false);
    if (result.data.success) {
      setBurnOptions(result.data.result);
    }
  };

  useEffect(() => {
    getIntakeOptions();
    getBurnOptions();
  }, []);

  return (
    <div className="flex gap-2 p-1 w-[90vw] 2xl:w-[80vw] h-[33rem] 2xl:h-[50rem] relative">
      {isLoading && <LoadingComponent />}
      <div className="w-[25%] h-full bg-secondary rounded p-2 relative shadow shadow-black">
        <UpdateTodayPersonalInfo
          today={today}
          triggerRefresh={triggerRefresh}
          totals={totals}
          difference={difference}
          stats={stats}
        />
      </div>
      <div className="w-[37.5%] h-full  ">
        <IntakeList
          intakeOptions={intakeOptions}
          total={totals.intake}
          today={today}
          triggerRefresh={triggerRefresh}
        />
      </div>
      <div className="w-[1px] bg-foreground/30" />
      <div className="w-[37.5%] h-full relative ">
        <BurnList
          burnOptions={burnOptions}
          total={totals.burn}
          today={today}
          triggerRefresh={triggerRefresh}
        />
      </div>
    </div>
  );
}

export default DisplayToday;
