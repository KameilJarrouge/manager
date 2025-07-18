import React from "react";
import TableCell from "../TableCell";
import { MdEdit } from "react-icons/md";

function ActivitiesTableRow({
  activity = {
    name: "activity",
    unit: "unit",
    caloriesBurnedPerUnit: 0,
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
        {activity.name}
      </TableCell>

      <TableCell index={index} className={"col-span-3"}>
        {activity.unit}
      </TableCell>
      <TableCell index={index} className={"col-span-3"}>
        {activity.caloriesBurnedPerUnit}
      </TableCell>
    </>
  );
}

export default ActivitiesTableRow;
