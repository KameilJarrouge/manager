import React, { useEffect, useState } from "react";
import { MdDelete, MdRestore } from "react-icons/md";
import FormContainer from "../../FormContainer";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";
import TextField from "@/app/_components/Input/TextField";
import NumberField from "@/app/_components/Input/NumberField";
import PortionInput from "../Input/PortionInput";
import DisplayPortions from "../DisplayPortions";
import SubmitButton from "@/app/_components/Input/SubmitButton";
import { toast } from "react-toastify";

function UpdateFoodItemForm({
  foodItem = { name: "test", portions: "{large:1, medium:0.75}", calories: 22 },
  closeModal = (f) => f,
}) {
  const [name, setName] = useState(foodItem.name);
  const [portions, setPortions] = useState(JSON.parse(foodItem.portions));
  const [calories, setCalories] = useState(foodItem.calories);
  const [isLoading, setIsLoading] = useState(false);

  const handleRestore = () => {
    setName(foodItem.name);
    setPortions(JSON.parse(foodItem.portions));
    setCalories(foodItem.calories);
  };

  const isInValidInput = () => {
    return name === "" || portions.length === 0 || calories === "";
  };

  const handleUpdateFoodItem = async () => {
    if (isInValidInput()) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);
    const result = await api.put(`/calories/food-items/${foodItem.id}/update`, {
      name,
      portions: JSON.stringify(portions),
      calories,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Updated Food Item!");
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

  const handleDelete = async () => {
    if (!confirm("Do you wish to delete this food item?")) return;

    setIsLoading(true);
    const result = await api.delete(
      `/calories/food-items/${foodItem.id}/delete`
    );
    setIsLoading(false);

    if (result.data.success) {
      toast("Deleted Food Item!");
    }
    closeModal(true);
  };

  useEffect(() => {
    handleRestore();
  }, [foodItem]);

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
          <h2 className="text-sm text-foreground/50 w-[35ch] underline underline-offset-4">
            Portions:
          </h2>
          <DisplayPortions
            portions={portions}
            deleteByKey={removePortionByKey}
          />
        </div>
      </div>{" "}
      <div className="flex justify-between items-center w-full">
        <button
          onClick={handleRestore}
          className=" p-1 hover:bg-blue-600  rounded transition-colors"
        >
          <MdRestore className="w-[1.5rem] h-fit text-foreground" />
        </button>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleDelete}
            className=" p-1 hover:bg-red-600  rounded transition-colors"
          >
            <MdDelete className="w-[1.5rem] h-fit text-foreground" />
          </button>
          <SubmitButton title="Submit" onSubmit={handleUpdateFoodItem} />
        </div>
      </div>
    </FormContainer>
  );
}

export default UpdateFoodItemForm;
