import React, { useState } from "react";
import SubmitButton from "@/app/_components/Input/SubmitButton";
import { GoPlus } from "react-icons/go";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";
import LoadingComponent from "@/app/_components/LoadingComponent";
import BurnSelectionField from "../Input/BurnSelectionField";
import BurnFactorInput from "../Input/BurnFactorInput";

function NewBurnForm({ options, triggerRefresh = (f) => f, dayId }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const setFactor = (index, factor) => {
    setSelectedOptions((selectedOption) => {
      const mutableSelectedOption = [...selectedOption];

      mutableSelectedOption[index].factor = factor || undefined;
      return mutableSelectedOption;
    });
  };

  const doesAllSelectedHaveFactor = () => {
    return selectedOptions.filter((option) => !!!option.factor).length === 0;
  };

  const addToTotalIntake = async () => {
    if (!doesAllSelectedHaveFactor()) {
      toast.error("All items must have a factor!");
      return;
    }
    setIsLoading(true);
    const result = await api.post(
      `/calories/days/${dayId}/add-burn`,
      selectedOptions.map((option) => ({
        activityId: option.id,
        factor: option.factor,
      }))
    );
    setIsLoading(false);
    if (result.data.success) {
      toast("Added to Total Burn!");
      setSelectedOptions([]);
      triggerRefresh();
    }
  };

  return (
    <div className="flex flex-col gap-2 relative h-fit">
      {isLoading && <LoadingComponent />}
      {selectedOptions.length === 0 ? (
        <BurnSelectionField
          onSelect={(option) => setSelectedOptions([...option])}
          options={options}
        />
      ) : (
        <div className="flex flex-col gap-1 max-h-[20rem] 2xl:max-h-[30rem]  overflow-y-auto overflow-x-hidden">
          {selectedOptions.length !== 0 &&
            selectedOptions.map((item, index, arr) => (
              <React.Fragment key={item.id}>
                {index === 0 && (
                  <div className="w-full flex items-center justify-between">
                    <SubmitButton
                      onSubmit={addToTotalIntake}
                      title="Add to Total Intake"
                    />
                    <button
                      onClick={() => setSelectedOptions([])}
                      className=" p-1 hover:bg-red-600  rounded transition-colors"
                    >
                      <GoPlus className="rotate-45 w-[1.5rem] h-fit" />
                    </button>
                  </div>
                )}
                <BurnFactorInput
                  activity={item}
                  setFactor={(factor) => setFactor(index, factor)}
                />
              </React.Fragment>
            ))}
        </div>
      )}
      <div className="w-[90%] self-center h-[1px] bg-foreground/40" />
    </div>
  );
}

export default NewBurnForm;
