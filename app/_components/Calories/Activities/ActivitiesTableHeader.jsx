import React from "react";
import TableHeader from "../TableHeader";

function ActivitiesTableHeader() {
  return (
    <>
      <TableHeader value={"Edit"} className={"col-span-1"} />
      <TableHeader value={"Name"} className={"col-span-5"} />
      <TableHeader value={"Unit"} className={"col-span-3"} />
      <TableHeader
        value={"Calories Burned Per Unit"}
        className={"col-span-3"}
      />
    </>
  );
}

export default ActivitiesTableHeader;
