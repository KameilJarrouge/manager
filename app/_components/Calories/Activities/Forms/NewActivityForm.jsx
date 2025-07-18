import NumberField from "@/app/_components/Input/NumberField";
import SubmitButton from "@/app/_components/Input/SubmitButton";
import TextField from "@/app/_components/Input/TextField";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FormContainer from "../../FormContainer";
import api from "@/app/_lib/api";
import LoadingComponent from "@/app/_components/LoadingComponent";

function NewActivityForm({ closeModal = (f) => f }) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [caloriesBurnedPerUnit, setCaloriesBurnedPerUnit] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isInvalidInput = () => {
    return name === "" || unit === "" || caloriesBurnedPerUnit === "";
  };

  const handleAddNewActivity = async () => {
    if (isInvalidInput()) {
      toast.error("All fields are required!");
      return;
    }
    setIsLoading(true);
    const result = await api.post("/calories/activities/create", {
      name,
      unit,
      caloriesBurnedPerUnit,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Added Activity!");
    }
    closeModal(true);
  };

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
      <SubmitButton title="Submit" onSubmit={handleAddNewActivity} />
    </FormContainer>
  );
}

export default NewActivityForm;
