import api from "@/app/_lib/api";
import React, { useEffect, useMemo, useState } from "react";
import LoadingComponent from "../../LoadingComponent";
import UpdateTodayPersonalInfo from "./Forms/UpdateTodayPersonalInfo";

function DisplayToday() {
  const [today, setToday] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getToday = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/days/today");
    setIsLoading(false);

    if (result.data.success) {
      setToday(result.data.result);
    }
  };

  useEffect(() => {
    getToday();
  }, []);

  return (
    <div className="flex gap-2 p-1 w-[85vw] 2xl:w-[75vw] h-[33rem] 2xl:h-[50rem] relative">
      {isLoading && <LoadingComponent />}
      <div className="w-[20%] h-full bg-secondary rounded p-2 relative">
        <UpdateTodayPersonalInfo today={today} triggerRefresh={getToday} />
      </div>
      <div className="w-[40%] h-full relative"></div>
      <div className="w-[1px] bg-foreground/10" />
      <div className="w-[40%] h-full relative"></div>
    </div>
  );
}

export default DisplayToday;
