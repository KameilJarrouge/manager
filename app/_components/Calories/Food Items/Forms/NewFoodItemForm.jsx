import NumberField from "@/app/_components/Input/NumberField";
import SubmitButton from "@/app/_components/Input/SubmitButton";
import TextField from "@/app/_components/Input/TextField";
import React, { useState } from "react";
import { toast } from "react-toastify";
import PortionInput from "../Input/PortionInput";
import DisplayPortions from "../DisplayPortions";
import FormContainer from "../../FormContainer";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";
import { DefaultPortions } from "../../Constants/defaultPortions";

function NewFoodItemForm({ closeModal = (f) => f }) {
  const [name, setName] = useState("");
  const [portions, setPortions] = useState({});
  const [calories, setCalories] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isInvalidInput = () => {
    return name === "" || portions.length === 0 || calories === "";
  };

  const handleAddFoodItem = async () => {
    if (isInvalidInput()) {
      toast.error("All fields are required!");
      return;
    }
    setIsLoading(true);
    const result = await api.post("/calories/food-items/create", {
      name,
      portions: JSON.stringify(portions),
      calories,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Added Food Item!");
    }
    closeModal(true);
  };

  const addPortion = (portion) => {
    setPortions((portions) => ({ ...portions, ...portion }));
  };

  const removePortionByKey = (key) => {
    setPortions((portions) => {
      const tempPortions = { ...portions };
      delete tempPortions[key];
      return tempPortions;
    });
  };

  const addDefaultPortions = () => {
    setPortions((portions) => {
      return { ...portions, ...DefaultPortions };
    });
  };

  return (
    <FormContainer>
      {isLoading && <LoadingComponent />}

      <div className="flex gap-2">
        <div className="flex flex-col gap-1">
          <TextField placeholder={"name"} state={name} setState={setName} />
          <NumberField
            placeholder={"calories"}
            state={calories}
            setState={setCalories}
            min={0}
          />
          <div className="w-full h-[1px] bg-foreground/40"></div>
          <PortionInput addPortion={addPortion} />
        </div>
        <div className="flex flex-col gap-1 ">
          <h2 className="text-sm text-foreground/70 w-[35ch] flex justify-between items-center underline underline-offset-4">
            Portions:
            <button
              className=" text-foreground/70 hover:text-foreground/90"
              onClick={addDefaultPortions}
            >
              (add default portions)
            </button>
          </h2>
          <DisplayPortions
            portions={portions}
            deleteByKey={removePortionByKey}
          />
        </div>
      </div>
      <SubmitButton title="Submit" onSubmit={handleAddFoodItem} />
    </FormContainer>
  );
}

export default NewFoodItemForm;
