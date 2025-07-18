import SubmitButton from "@/app/_components/Input/SubmitButton";
import TextField from "@/app/_components/Input/TextField";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FoodItemSelectionField from "../input/FoodItemSelectionField";
import DisplayFoodItems from "../DisplayFoodItems";
import FormContainer from "../../FormContainer";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";

function NewMealForm({ closeModal = (f) => f }) {
  const [name, setName] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isValidInput = () => {
    return name === "" || foodItems.length === 0;
  };

  const handleAddMeal = async () => {
    if (isValidInput()) {
      toast.error("All fields are required!");
      return;
    }
    setIsLoading(true);
    const result = await api.post("/calories/meals/create", {
      name,
      foodItems,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Added Meal!");
    }
    closeModal(true);
  };

  const addToFoodItems = (id, name) => {
    setFoodItems((foodItems) => {
      return [...foodItems, { id, name }];
    });
  };

  const deleteById = (id) => {
    setFoodItems((foodItems) =>
      foodItems.filter((foodItem) => foodItem.id !== id)
    );
  };

  return (
    <FormContainer>
      {" "}
      {isLoading && <LoadingComponent />}
      <div className="flex gap-2">
        <div className="flex flex-col gap-1">
          <TextField placeholder={"name"} state={name} setState={setName} />

          <FoodItemSelectionField
            addFoodItem={addToFoodItems}
            selectedFoodItems={foodItems}
          />
        </div>
        <div className="flex flex-col gap-1 min-h-[10ch]">
          <h2 className="text-sm text-foreground/50 w-[35ch] underline underline-offset-4">
            Food Items:
          </h2>
          <DisplayFoodItems foodItems={foodItems} deleteById={deleteById} />
        </div>
      </div>
      <SubmitButton title="Submit" onSubmit={handleAddMeal} />
    </FormContainer>
  );
}

export default NewMealForm;
