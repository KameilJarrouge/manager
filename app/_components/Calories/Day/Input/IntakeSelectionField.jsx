import SubmitButton from "@/app/_components/Input/SubmitButton";
import TextField from "@/app/_components/Input/TextField";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdOutlineFastfood } from "react-icons/md";
import { PiCarrotLight } from "react-icons/pi";

function IntakeSelectionField({ options, onSelect }) {
  const [filterKey, setFilterKey] = useState("");

  const handleClickOnIntakeItem = (option) => {
    if (option.isMeal) {
      onSelect(option.foodItems.map((mealFoodItem) => mealFoodItem.foodItem));
    } else {
      onSelect([option]);
    }
    setFilterKey("");
  };

  const nameFilter = (item) => item.name.includes(filterKey);

  return (
    <div className="relative w-fit h-fit">
      <div className="flex items-center gap-2">
        <TextField
          placeholder={"select Intake"}
          state={filterKey}
          setState={setFilterKey}
        />
        {filterKey !== "" && (
          <button
            onClick={() => setFilterKey("")}
            className=" p-1 hover:bg-red-600  rounded transition-colors"
          >
            <GoPlus className="rotate-45 w-[1.5rem] h-fit" />
          </button>
        )}
      </div>

      {filterKey !== "" && (
        <div className="absolute z-50 top-full left-0 w-full max-h-[10rem] overflow-y-auto min-h-[1rem] bg-secondary  shadow shadow-black  flex flex-col ">
          {options.filter(nameFilter).map((item, index, arr) => (
            <button
              onClick={() => handleClickOnIntakeItem(item)}
              key={item.isMeal ? "meal-" : "foodItem-" + item.id}
              className={`border-b ${
                index === arr.length - 1
                  ? "border-b-transparent"
                  : "border-b-foreground/30"
              } text-start p-1 hover:bg-foreground/5 flex items-center gap-2`}
            >
              {item.isMeal ? (
                <MdOutlineFastfood className="text-green-400" />
              ) : (
                <PiCarrotLight className="text-orange-400" />
              )}
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default IntakeSelectionField;
