"use client";
import React, { useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import { toast } from "react-toastify";
import SelectMonthAndDay from "../_components/Input/SelectMonthAndDay";

function CreateDateForm({ afterSubmit = (f) => f }) {
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateDate = async () => {
    setIsLoading(true);
    let result = await api.post("/dates/create", {
      title: title,
      month: month,
      day: day,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("Created Date!");
      setTitle("");
      setMonth();
      setDay();
      afterSubmit();
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] flex items-center justify-center">
        New Date
      </span>
      <div className="flex gap-4  py-4 h-[80%]">
        <div className="flex flex-col gap-8 items-start">
          <TextField state={title} setState={setTitle} placeholder={"Title"} />
          <SelectMonthAndDay
            monthState={month}
            setMonthState={setMonth}
            dayState={day}
            setDayState={setDay}
          />
        </div>
      </div>
      <SubmitButton title="Create" onSubmit={handleCreateDate} />
    </div>
  );
}

export default CreateDateForm;
