import React from "react";
import TableCell from "../TableCell";
import { MdEdit } from "react-icons/md";

function MealsTableRow({ meal, index = 0, setSelected }) {
  return (
    <>
      <TableCell index={index} className={"col-span-1"}>
        <button
          onClick={setSelected}
          className="w-full flex items-center justify-center"
        >
          <MdEdit />
        </button>
      </TableCell>
      <TableCell index={index} className={"col-span-4"}>
        {meal.name}
      </TableCell>

      <TableCell index={index} className={"col-span-7"}>
        {meal.foodItems.reduce((prev, curr, index, arr) => {
          prev += curr.foodItem.name + (index === arr.length - 1 ? "" : ", ");
          return prev;
        }, "")}
      </TableCell>
    </>
  );
}

export default MealsTableRow;
