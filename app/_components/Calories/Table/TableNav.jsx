import React from "react";

function TableNav({ selectedTable, setSelectedTable }) {
  return (
    <div className="flex gap-2 text-foreground/80">
      <button
        className={`hover:text-foreground ${
          selectedTable === "Food Items" &&
          "text-foreground underline underline-offset-4"
        }`}
        onClick={() => setSelectedTable("Food Items")}
      >
        Food Items
      </button>
      <div className="w-[1px] bg-foreground/50"></div>
      <button
        className={`hover:text-foreground ${
          selectedTable === "Meals" &&
          "text-foreground underline underline-offset-4"
        }`}
        onClick={() => setSelectedTable("Meals")}
      >
        Meals
      </button>
      <div className="w-[1px] bg-foreground/50"></div>
      <button
        className={`hover:text-foreground ${
          selectedTable === "Activities" &&
          "text-foreground underline underline-offset-4"
        }`}
        onClick={() => setSelectedTable("Activities")}
      >
        Activities
      </button>
    </div>
  );
}

export default TableNav;
