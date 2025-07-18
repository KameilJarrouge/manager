import React from "react";
import { MdDelete } from "react-icons/md";

function DisplayFoodItems({ foodItems, deleteById }) {
  return (
    <div className="grid grid-cols-3 gap-2 max-h-[10rem] min-h-[2rem] overflow-y-auto  text-sm  p-0.5 ">
      {foodItems.map((foodItem) => (
        <div
          key={foodItem.id}
          className={`flex justify-between bg-secondary/60 rounded p-0.5 shadow shadow-black min-w-[10ch] items-center gap-0.5`}
        >
          {" "}
          <span>{foodItem.name}</span>
          <button
            onClick={() => deleteById(foodItem.id)}
            className=" p-1 hover:bg-red-400  rounded transition-colors"
          >
            <MdDelete />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DisplayFoodItems;
