import TextField from "@/app/_components/Input/TextField";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";

function FoodItemSelectionField({ addFoodItem, selectedFoodItems }) {
  const [foodItems, setFoodItems] = useState([]);
  const [filterKey, setFilterKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleGetFoodItems = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/food-items/names");
    setIsLoading(false);
    if (result.data.success) {
      setFoodItems(result.data.result);
    }
  };

  useEffect(() => {
    handleGetFoodItems();
  }, []);

  const handleClickOnFoodItem = (id, name) => {
    addFoodItem(id, name);
    setFilterKey("");
  };

  const alreadySelectedFilter = (foodItem) =>
    !selectedFoodItems.some(
      (selectedFoodItem) => foodItem.id === selectedFoodItem.id
    );

  const nameFilter = (foodItem) => foodItem.name.includes(filterKey);

  return (
    <div className="relative w-fit h-fit">
      {isLoading && <LoadingComponent />}

      <TextField
        placeholder={"select Food Item"}
        state={filterKey}
        setState={setFilterKey}
      />

      {filterKey !== "" && (
        <div className="absolute z-50 top-full left-0 w-full max-h-[10rem] overflow-y-auto min-h-[1rem] bg-secondary  shadow shadow-black  flex flex-col ">
          {foodItems
            .filter(alreadySelectedFilter)
            .filter(nameFilter)
            .map((foodItem, index, arr) => (
              <button
                onClick={() =>
                  handleClickOnFoodItem(foodItem.id, foodItem.name)
                }
                key={foodItem.id}
                className={`border-b ${
                  index === arr.length - 1
                    ? "border-b-transparent"
                    : "border-b-foreground/30"
                } text-start p-1 hover:bg-foreground/5`}
              >
                {foodItem.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default FoodItemSelectionField;
