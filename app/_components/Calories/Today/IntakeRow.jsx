import api from "@/app/_lib/api";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingComponent from "../../LoadingComponent";

function IntakeRow({ intake, triggerRefresh }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    if (!confirm("Do you want to remove this food item from this day?")) {
      return;
    }
    setIsLoading(true);
    const result = await api.delete(
      `/calories/days/remove/${intake.id}/intake`
    );
    setIsLoading(false);
    if (result.data.success) {
      toast("Removed Food Item!");
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
        {intake.foodItem.name}
      </button>
      <span className="bg-input_bg/80 p-0.5 col-span-1 text-center">
        {intake.foodItem.calories + "0"}
      </span>
      <span className="bg-input_bg/50 p-0.5 col-span-3 text-center">
        {intake.factor}
      </span>
      <span className="bg-input_prefix_bg p-0.5 col-span-2 text-center">
        {(intake.factor * intake.foodItem.calories).toLocaleString()}
      </span>
    </div>
  );
}

export default IntakeRow;
