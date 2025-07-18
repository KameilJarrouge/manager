import React from "react";
import TableCell from "../TableCell";
import { MdEdit } from "react-icons/md";

function FoodItemTableRow({
  foodItem = {
    name: "test",
    portions: { small: 0.25, medium: 0.5, big: 0.75, large: 1 },
    calories: 0,
  },
  index = 0,
  setSelected,
}) {
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
      <TableCell index={index} className={"col-span-5"}>
        {foodItem.name}
      </TableCell>

      <TableCell index={index} className={"col-span-4"}>
        {Object.keys(JSON.parse(foodItem.portions)).reduce(
          (prev, curr, index, arr) => {
            prev +=
              curr +
              ": " +
              JSON.parse(foodItem.portions)[curr] +
              (index === arr.length - 1 ? "" : ", ");
            return prev;
          },
          ""
        )}
      </TableCell>

      <TableCell index={index} className={"col-span-2"}>
        {foodItem.calories}
      </TableCell>
    </>
  );
}

export default FoodItemTableRow;
