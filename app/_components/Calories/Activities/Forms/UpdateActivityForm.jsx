import React, { useEffect, useState } from "react";
import { MdDelete, MdRestore } from "react-icons/md";
import FormContainer from "../../FormContainer";
import TextField from "@/app/_components/Input/TextField";
import NumberField from "@/app/_components/Input/NumberField";
import SubmitButton from "@/app/_components/Input/SubmitButton";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";

function UpdateActivityForm({
  activity = {
    name: "activity test",
    unit: "minute",
    caloriesBurnedPerUnit: 24,
  },
  closeModal = (f) => f,
}) {
  const [name, setName] = useState(activity.name);
  const [unit, setUnit] = useState(activity.unit);
  const [caloriesBurnedPerUnit, setCaloriesBurnedPerUnit] = useState(
    activity.caloriesBurnedPerUnit
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleRestore = () => {
    setName(activity.name);
    setUnit(activity.unit);
    setCaloriesBurnedPerUnit(activity.caloriesBurnedPerUnit);
  };

  const isInvalidInput = () => {
    return name === "" || unit === "" || caloriesBurnedPerUnit === "";
  };

  const handleUpdateActivity = async () => {
    if (isInvalidInput()) {
      toast.error("All fields are required!");
      return;
    }
    setIsLoading(true);
    const result = await api.put(`/calories/activities/${activity.id}/update`, {
      name,
      unit,
      caloriesBurnedPerUnit,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Updated Activity!");
    }
    closeModal(true);
  };

  const handleDelete = async () => {
    if (!confirm("Do you wish to delete this activity?")) return;

    setIsLoading(true);
    const result = await api.delete(
      `/calories/activities/${activity.id}/delete`
    );
    setIsLoading(false);

    if (result.data.success) {
      toast("Deleted Activity!");
    }
    closeModal(true);
  };

  useEffect(() => {
    handleRestore();
  }, [activity]);

  return (
    <FormContainer>
      {isLoading && <LoadingComponent />}
      <TextField placeholder={"name"} state={name} setState={setName} />
      <TextField placeholder={"unit"} state={unit} setState={setUnit} />
      <NumberField
        placeholder={"calories burned per unit"}
        state={caloriesBurnedPerUnit}
        setState={setCaloriesBurnedPerUnit}
        min={0}
      />
      <div className="flex justify-between items-center w-full">
        <button
          onClick={handleRestore}
          className=" p-1 hover:bg-blue-600  rounded transition-colors"
        >
          <MdRestore className="w-[1.5rem] h-fit text-foreground" />
        </button>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleDelete}
            className=" p-1 hover:bg-red-600  rounded transition-colors"
          >
            <MdDelete className="w-[1.5rem] h-fit text-foreground" />
          </button>
          <SubmitButton title="Update" onSubmit={handleUpdateActivity} />
        </div>
      </div>
    </FormContainer>
  );
}

export default UpdateActivityForm;
