import React from "react";
import TableHeader from "../TableHeader";

function FoodItemsTableHeader() {
  return (
    <>
      <TableHeader value={"Edit"} className={"col-span-1"} />
      <TableHeader value={"Name"} className={"col-span-5"} />
      <TableHeader value={"Portions"} className={"col-span-4"} />
      <TableHeader value={"Calories"} className={"col-span-2"} />
    </>
  );
}

export default FoodItemsTableHeader;
