import React from "react";
import MealsTableHeader from "./MealsTableHeader";
import MealsTableRow from "./MealsTableRow";

function MealsTable({ meals, filterKey, setSelected }) {
  return (
    <div className="grid grid-cols-12  w-full border-collapse overflow-y-auto max-h-[70vh]">
      <MealsTableHeader />
      {/*  */}
      {meals
        .filter((meal) => meal.name.includes(filterKey))
        .map((meal, index) => (
          <MealsTableRow
            key={index}
            index={index}
            setSelected={() => setSelected(meal)}
            meal={meal}
          />
        ))}
    </div>
  );
}

export default MealsTable;
