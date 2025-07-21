import NumberField from "@/app/_components/Input/NumberField";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

function BurnFactorInput({ activity, setFactor }) {
  useEffect(() => {
    setFactor();
  }, [activity]);

  return (
    <div className="flex gap-2 items-center  bg-secondary/60 shadow-sm shadow-black rounded p-1 text-sm">
      <GoDotFill className="text-green-400" />
      <span className="w-[24ch]  truncate">{activity.name}</span>
      <div className="bg-input_bg py-0.5 px-1 rounded min-w-[12ch] truncate gap-0.5 flex items-center ">
        <span>{activity.caloriesBurnedPerUnit.toLocaleString()}</span>
        <span>{"kcal"}</span>
        {activity.factor && (
          <span className="text-xs text-foreground/80">{`(${
            activity.caloriesBurnedPerUnit * activity.factor
          })`}</span>
        )}
      </div>
      <NumberField
        withHandle={false}
        placeholder={activity.unit}
        state={activity.factor}
        setState={setFactor}
        className={"w-[8ch]"}
      />
    </div>
  );
}

export default BurnFactorInput;
