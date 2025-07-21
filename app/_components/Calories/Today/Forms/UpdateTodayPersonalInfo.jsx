import LoadingComponent from "@/app/_components/LoadingComponent";
import React, { useEffect, useMemo, useState } from "react";
import { MdRestore } from "react-icons/md";
import moment from "moment";
import { toast } from "react-toastify";
import NumberField from "@/app/_components/Input/NumberField";
import SubmitButton from "@/app/_components/Input/SubmitButton";
import BodyStats from "../../BodyStats";
import api from "@/app/_lib/api";
import { TbDelta } from "react-icons/tb";

function UpdateTodayPersonalInfo({
  today,
  triggerRefresh = (f) => f,
  totals,
  difference,
  stats,
}) {
  const [weight, setWeight] = useState(today.weight);
  const [neck, setNeck] = useState(today.neck);
  const [hip, setHip] = useState(today.hip);
  const [waist, setWaist] = useState(today.waist);
  const [isLoading, setIsLoading] = useState(false);

  const handleRestore = () => {
    setWeight(today.weight);
    setNeck(today.neck);
    setWaist(today.waist);
    setHip(today.hip);
  };

  useEffect(() => {
    handleRestore();
  }, [today]);

  const updateDayPersonalInformation = async () => {
    setIsLoading(true);
    const result = await api.put(`/calories/days/${today.id}/update`, {
      weight,
      neck,
      waist,
      hip,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Personal Information for this day is updated!");
      triggerRefresh();
    }
  };

  const matchTodayPersonalInformationWithCurrent = async () => {
    setIsLoading(true);
    const result = await api.put(
      `/calories/days/${today.id}/update-to-match-current-pi`
    );
    setIsLoading(false);
    if (result.data.success) {
      toast("Personal Information match current!");
      getPersonalInformation();
      triggerRefresh();
    }
  };

  // useMemo(() => {
  //   handleGetBodyStats();
  // }, [weight, neck, waist, hip]);

  return (
    <div className="flex flex-col gap-4">
      {isLoading && <LoadingComponent />}
      <div className="w-full flex justify-between items-center">
        <h1 className="underline underline-offset-4">Personal Information</h1>
        <h1 className=" text-sm">
          ({moment(today.date).format("YYYY-MM-DD")})
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <NumberField
          className={"w-[23ch]"}
          placeholder={"weight [kg]"}
          state={weight}
          setState={setWeight}
          min={0}
          max={300}
        />{" "}
        <NumberField
          className={"w-[23ch]"}
          placeholder={"neck circumference [cm]"}
          state={neck}
          setState={setNeck}
          min={0}
          max={300}
        />{" "}
        <NumberField
          className={"w-[23ch]"}
          placeholder={"waist circumference [cm]"}
          state={waist}
          setState={setWaist}
          min={0}
          max={300}
        />{" "}
      </div>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <SubmitButton
          onSubmit={updateDayPersonalInformation}
          title={`Update Information`}
        />
        <SubmitButton
          onSubmit={matchTodayPersonalInformationWithCurrent}
          title={`Update to Current Information`}
        />
        <button
          onClick={handleRestore}
          className=" p-1 hover:bg-blue-600  rounded transition-colors"
        >
          <MdRestore className="w-[1.5rem] h-fit text-foreground" />
        </button>
      </div>
      <BodyStats stats={stats} />
      <div className="w-full h-[1px]  bg-foreground/50 relative">
        <span className="bg-secondary px-1 w-fit  absolute right-0 left-0 mx-auto -translate-y-[0.75rem]  ">
          Day's Stats
        </span>
      </div>
      <div className="text-sm text-foreground/80  gap-1 flex flex-col">
        <div className="flex justify-between items-center border-b-[1px] border-foreground/30 ">
          <h1 className="font-semibold">Total Intake:</h1>
          <span>{totals.intake.toLocaleString()} kcal</span>
        </div>
        <div className="flex justify-between items-center border-b-[1px] border-foreground/30 ">
          <h1 className="font-semibold">Total Burn:</h1>
          <span>
            {`(${Number(
              stats.BMR
            ).toLocaleString()} + ${totals.burn.toLocaleString()}) ${(
              Number(stats.BMR) + Number(totals.burn)
            ).toLocaleString()}`}{" "}
            kcal
          </span>
        </div>
        <div className="flex justify-between items-center border-b-[1px] border-foreground/30 ">
          <h1 className="font-semibold">Difference:</h1>
          <div className="flex gap-1 items-center">
            <TbDelta
              className={`${
                difference > 0 ? "text-red-400" : "text-green-400"
              }`}
            />
            <span>{difference.toLocaleString()} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTodayPersonalInfo;
