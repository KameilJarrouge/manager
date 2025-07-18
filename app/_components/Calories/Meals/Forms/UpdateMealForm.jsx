import React, { useEffect, useState } from "react";
import { MdDelete, MdRestore } from "react-icons/md";
import FoodItemSelectionField from "../input/FoodItemSelectionField";
import TextField from "@/app/_components/Input/TextField";
import DisplayFoodItems from "../DisplayFoodItems";
import SubmitButton from "@/app/_components/Input/SubmitButton";
import FormContainer from "../../FormContainer";
import { toast } from "react-toastify";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";

function UpdateMealForm({
  meal = {
    name: "meal test",
    foodItems: '[{id:1, name:"test"},{id:2, name:"test2"}]',
  },
  closeModal = (f) => f,
}) {
  const [name, setName] = useState(meal.name);
  const [foodItems, setFoodItems] = useState(
    meal.foodItems.map((mealFoodItem) => ({
      ...mealFoodItem.foodItem,
      new: false,
    }))
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleRestore = () => {
    setName(meal.name);
    setFoodItems(
      meal.foodItems.map((mealFoodItem) => ({
        ...mealFoodItem.foodItem,
        new: false,
      }))
    );
  };

  const isInValidInput = () => {
    return name === "" || foodItems.length === 0;
  };

  const handleUpdateMeal = async () => {
    if (isInValidInput()) {
      toast.error("All fields are required!");
      return;
    }
    setIsLoading(true);
    const result = await api.put(`/calories/meals/${meal.id}/update`, {
      name,
      newFoodItems: foodItems.filter((foodItem) => foodItem.new),
      deletedFoodItems: getDeletedOldFoodItems(),
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Updated Meal!");
    }
    closeModal(true);
  };

  const handleDelete = async () => {
    if (!confirm("Do you wish to delete this meal?")) return;

    setIsLoading(true);
    const result = await api.delete(`/calories/meals/${meal.id}/delete`);
    setIsLoading(false);

    if (result.data.success) {
      toast("Deleted Meal!");
    }
    closeModal(true);
  };

  useEffect(() => {
    handleRestore();
  }, [meal]);

  const oldFoodItemOrNew = (id, name) => {
    const oldFoodItem = meal.foodItems.filter(
      (mealFoodItem) => id === mealFoodItem.foodItem.id
    );

    if (oldFoodItem.length === 0) {
      return { id, name, new: true };
    }
    return { ...oldFoodItem[0].foodItem, new: false };
  };

  const getDeletedOldFoodItems = () => {
    return meal.foodItems.filter((mealFoodItem) => {
      return !foodItems.some(
        (foodItem) => mealFoodItem.foodItem.id === foodItem.id
      );
    });
  };
  const addToFoodItems = (id, name) => {
    setFoodItems((foodItems) => {
      return [...foodItems, oldFoodItemOrNew(id, name)];
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
        </div>{" "}
      </div>
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
          <SubmitButton title="Submit" onSubmit={handleUpdateMeal} />
        </div>
      </div>
    </FormContainer>
  );
}

export default UpdateMealForm;
