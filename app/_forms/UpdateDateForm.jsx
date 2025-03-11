"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import { toast } from "react-toastify";
import { MdDelete, MdRestore } from "react-icons/md";
import SelectMonthAndDay from "../_components/Input/SelectMonthAndDay";

function UpdateDateForm({ afterSubmit = (f) => f, dateObject }) {
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateDate = async () => {
    setIsLoading(true);
    let result = await api.put(`/dates/${dateObject.id}/update`, {
      title: title,
      month: month,
      day: day,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Updated Date!");
      setMonth();
      setDay();
      afterSubmit();
    }
  };

  const restore = () => {
    setTitle(dateObject.title);
    setMonth(dateObject.month);
    setDay(dateObject.day);
  };

  const handleDeleteDate = async () => {
    if (!confirm(`do you wish to delete this date?`)) return;
    setIsLoading(true);
    let result = await api.delete(`/dates/${dateObject.id}/delete`);
    setIsLoading(false);
    if (result.data.success) {
      toast("Deleted Date!");
      setTitle("");
      setMonth();
      setDay();
      afterSubmit();
    }
  };
  useEffect(() => {
    if (!dateObject) return;

    setTitle(dateObject.title);
    setMonth(dateObject.month);
    setDay(dateObject.day);
  }, [dateObject]);

  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] relative flex items-center justify-center">
        Update Date
        <button
          onClick={handleDeleteDate}
          className="absolute top-0 bottom-0 right-2 my-auto  h-fit p-1 hover:bg-red-600 rounded transition-colors"
        >
          <MdDelete className="w-[1.2rem] h-fit" />
        </button>
      </span>
      <div className="flex gap-4  py-4 h-[80%]">
        <div className="flex flex-col gap-4 items-center">
          <TextField state={title} setState={setTitle} placeholder={"Title"} />
          <SelectMonthAndDay
            monthState={month}
            setMonthState={setMonth}
            dayState={day}
            setDayState={setDay}
          />
          <button
            onClick={restore}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <MdRestore className="w-[1.5rem] h-fit" />
          </button>
        </div>
      </div>
      <SubmitButton title="Update" onSubmit={handleUpdateDate} />
    </div>
  );
}

export default UpdateDateForm;
