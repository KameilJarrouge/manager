import React from "react";
import ActivitiesTableHeader from "./ActivitiesTableHeader";
import ActivitiesTableRow from "./ActivitiesTableRow";

function ActivitiesTable({ filterKey, activities, setSelected = (f) => f }) {
  return (
    <div className="grid grid-cols-12  w-full border-collapse overflow-y-auto  max-h-[70vh]">
      <ActivitiesTableHeader />
      {/*  */}
      {activities
        .filter((activity) =>
          activity.name.toLowerCase().includes(filterKey.toLowerCase())
        )
        .map((activity, index) => (
          <ActivitiesTableRow
            key={activity.id}
            index={index}
            activity={activity}
            setSelected={() => setSelected(activity)}
          />
        ))}
    </div>
  );
}

export default ActivitiesTable;
