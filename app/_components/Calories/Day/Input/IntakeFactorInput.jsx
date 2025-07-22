import NumberField from "@/app/_components/Input/NumberField";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

function IntakeFactorInput({ foodItem, setFactor }) {
  const [portions, setPortions] = useState({});

  useEffect(() => {
    setPortions(JSON.parse(foodItem.portions));
    setFactor();
  }, [foodItem]);

  return (
    <div className="flex flex-col gap-1 bg-secondary/60 shadow-sm shadow-black rounded p-1 text-sm">
      <div className="flex gap-2 items-center">
        <GoDotFill className="text-green-400" />
        <span className="w-[24ch]  truncate">{foodItem.name}</span>
        <div className="bg-input_bg py-0.5 px-1 rounded min-w-[12ch] truncate gap-0.5 flex items-center ">
          <span>{foodItem.calories.toLocaleString()}</span>
          <span>{"kcal"}</span>
          {foodItem.factor && (
            <span className="text-xs text-foreground/80">{`(${(
              foodItem.calories * foodItem.factor
            ).toLocaleString()})`}</span>
          )}
        </div>
        <NumberField
          withHandle={false}
          placeholder={"factor"}
          state={foodItem.factor}
          setState={setFactor}
          className={"w-[8ch]"}
        />
      </div>

      <div className="w-full h-[1px] bg-foreground/10" />

      <div className="w-full flex flex-wrap gap-1 text-xs">
        {Object.keys(portions).map((portion, index) => (
          <button
            onClick={() => setFactor(portions[portion])}
            key={index}
            className={`flex bg-input_bg/60 rounded py-0.5 px-1  items-center gap-0.5 hover:bg-input_bg`}
          >
            <span>{`${portion}: ${portions[portion]}`}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default IntakeFactorInput;
