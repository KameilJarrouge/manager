import React from "react";
import FoodItemsTableHeader from "./FoodItemsTableHeader";
import FoodItemTableRow from "./FoodItemTableRow";

function FoodItemsTable({
  filterKey,
  foodItems = [
    { name: "test", portions: '{"large":1, "medium":0.75}', calories: 22 },
    { name: "test2", portions: '{"large":1, "medium":0.75}', calories: 22 },
  ],
  setSelected,
}) {
  return (
    <div className="grid grid-cols-12  w-full border-collapse overflow-y-auto max-h-[70vh]">
      <FoodItemsTableHeader />
      {/*  */}
      {foodItems
        .filter((foodItem) => foodItem.name.includes(filterKey))
        .map((foodItem, index) => (
          <FoodItemTableRow
            key={index}
            index={index}
            foodItem={foodItem}
            setSelected={() => setSelected(foodItem)}
          />
        ))}
    </div>
  );
}

export default FoodItemsTable;
