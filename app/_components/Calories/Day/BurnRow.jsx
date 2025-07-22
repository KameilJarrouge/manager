import api from "@/app/_lib/api";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingComponent from "../../LoadingComponent";

function BurnRow({ burn, triggerRefresh }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    if (!confirm("Do you want to remove this activity from this day?")) {
      return;
    }
    setIsLoading(true);
    const result = await api.delete(`/calories/days/remove/${burn.id}/burn`);
    setIsLoading(false);
    if (result.data.success) {
      toast("Removed Activity!");
      triggerRefresh();
    }
  };

  return (
    <div className="grid grid-cols-12  text-sm ">
      {isLoading && <LoadingComponent />}
      <button
        onClick={handleDelete}
        className="bg-input_bg p-0.5 col-span-6 hover:bg-red-500 text-start hover:text-white "
      >
        {burn.activity.name}
      </button>
      <span className="bg-input_bg/80 p-0.5 col-span-1 text-center">
        {burn.activity.caloriesBurnedPerUnit}
      </span>
      <div className="bg-input_bg/50 p-0.5 col-span-3 text-center flex items-center justify-center">
        <span>{burn.factor}</span>
        <span className="text-xs ">{`(${burn.activity.unit})`}</span>
      </div>
      <span className="bg-input_prefix_bg p-0.5 col-span-2 text-center">
        {(burn.factor * burn.activity.caloriesBurnedPerUnit).toLocaleString()}
      </span>
    </div>
  );
}

export default BurnRow;
