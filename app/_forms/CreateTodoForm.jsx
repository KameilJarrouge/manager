"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../_lib/api";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import { MdPause, MdPlayArrow, MdRepeat, MdRepeatOn } from "react-icons/md";
import ToggleInput from "../_components/Input/ToggleInput";
import DaysRepeatInput from "../_components/Input/DaysRepeatInput";
import IntervalRepeatInput from "../_components/Input/IntervalRepeatInput";
import DateField from "../_components/Input/DateField";
import SubmitButton from "../_components/Input/SubmitButton";
import CalendarPreview from "../_components/CalendarPreview";
import moment from "moment";

function CreateTodoForm({ afterSubmit = (f) => f }) {
  const [title, setTitle] = useState("");
  const [shouldRepeat, setShouldRepeat] = useState(false);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [repeatType, setRepeatType] = useState(undefined);
  const [repeatDays, setRepeatDays] = useState([]);
  const [repeatInterval, setRepeatInterval] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clearForm = () => {
    setTitle("");
    setShouldRepeat(false);
    setCreatedAt(new Date());
    setRepeatType();
    setRepeatDays([]);
    setRepeatInterval(1);
    setIsPaused(true);
  };

  const handleCreateTodo = async () => {
    if (title === "") {
      toast.warn("Title Missing!");
      return;
    }
    if (shouldRepeat && repeatType === "Days" && repeatDays.length === 0) {
      toast.warn("Please select one day at least!");
      return;
    }
    setIsLoading(true);
    const repeat = !!repeatType
      ? repeatType === "Days"
        ? JSON.stringify(repeatDays)
        : String(repeatInterval)
      : undefined;

    let result = await api.post("/todo/create", {
      title,
      shouldRepeat,
      repeatType,
      repeat,
      date: createdAt || new Date(),
      isPaused: isPaused,
    });

    setIsLoading(false);
    if (result.data.success) {
      toast("Created Todo!");
      afterSubmit();
      clearForm();
    }
  };

  const handleAccentDate = (date) => {
    if (moment(date).isBefore(createdAt || new Date(), "day")) return false;
    if (repeatType === "Days") {
      const day = moment(date).format("ddd");
      return repeatDays.includes(day);
    }
    if (repeatType === "Intervals") {
      const difference = moment(date)
        .startOf("day")
        .diff(moment(createdAt || new Date()).startOf("day"), "days", false);
      return difference % Number(repeatInterval) === 0;
    }
  };

  useEffect(() => {
    if (shouldRepeat) setRepeatType("Days");
    else setRepeatType(undefined);
  }, [shouldRepeat]);

  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] flex items-center justify-center">
        New Todo
      </span>
      <div className="w-full h-[80%] py-4 flex gap-2">
        <div className="w-fit h-full flex flex-col gap-4">
          <TextField state={title} setState={setTitle} placeholder={"Title"} />
          <DateField
            state={createdAt}
            setState={setCreatedAt}
            placeholder="Start Date"
            position="bottom"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShouldRepeat((shouldRepeat) => !shouldRepeat)}
              className={`w-fit p-1 hover:bg-foreground/10 ${
                shouldRepeat ? "text-accent" : "text-foreground"
              }  rounded flex items-center gap-2`}
            >
              <MdRepeat className="w-[1.5rem] h-fit" />
              <span className="pr-1 w-[12ch] text-foreground">
                {shouldRepeat ? "Repeating" : "Not Repeating"}
              </span>
            </button>
            <div className="w-[1px] h-full bg-input_bg" />
            <button
              onClick={() => setIsPaused((isPaused) => !isPaused)}
              className={`w-fit p-1 hover:bg-foreground/10 text-foreground  rounded flex items-center gap-2 `}
            >
              {isPaused ? (
                <MdPause className="w-[1.5rem] h-fit" />
              ) : (
                <MdPlayArrow className="w-[1.5rem] h-fit" />
              )}
              <span className="pr-1 w-[7ch]">
                {isPaused ? "Paused" : "Running"}
              </span>
            </button>
          </div>
          {shouldRepeat && (
            <div className={`flex flex-col gap-2 h-fit w-full`}>
              <ToggleInput
                value1="Days"
                value2="Intervals"
                selectedValue={repeatType}
                setSelectedValue={setRepeatType}
                className="w-1/2 mb-2"
              />
              {repeatType === "Days" ? (
                <DaysRepeatInput value={repeatDays} setValue={setRepeatDays} />
              ) : (
                <IntervalRepeatInput
                  value={repeatInterval}
                  setValue={setRepeatInterval}
                />
              )}
            </div>
          )}
        </div>
        <div className="w-[1px] h-full bg-input_bg" />
        <div className="w-fit h-full flex flex-col gap-2 relative">
          {!shouldRepeat && (
            <div className="absolute top-0 left-0 w-full h-[20rem] bg-secondary/90  flex justify-center items-center">
              Repeat TODO to View Calendar
            </div>
          )}
          <CalendarPreview
            accentFunc={handleAccentDate}
            initialDate={createdAt || new Date()}
          />
        </div>
      </div>
      <SubmitButton title="Create" onSubmit={handleCreateTodo} />
    </div>
  );
}

export default CreateTodoForm;
