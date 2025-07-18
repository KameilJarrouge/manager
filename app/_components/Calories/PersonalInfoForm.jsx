import React, { useMemo, useState } from "react";
import NumberField from "../Input/NumberField";
import ToggleInput from "../Input/ToggleInput";
import SubmitButton from "../Input/SubmitButton";
import { MdRestore } from "react-icons/md";
import getBodyStats from "@/app/_lib/caloriesHelper";
import { LuLogs } from "react-icons/lu";
import BodyStats from "./BodyStats";

function PersonalInfoForm() {
  const [yearOfBirth, setYearOfBirth] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [neckCircumference, setNeckCircumference] = useState(null);
  const [hipCircumference, setHipCircumference] = useState(null);
  const [waistCircumference, setWaistCircumference] = useState(null);
  const [sex, setSex] = useState("Male");
  const [stats, setStats] = useState({ BMI: "?", BMR: "?", bodyFat: "?" });

  const handleGetBodyStats = () => {
    setStats(
      getBodyStats(
        yearOfBirth || 2000,
        height || 170,
        weight || 70,
        neckCircumference || 38.1,
        waistCircumference || 96,
        hipCircumference || 97,
        sex || "Male"
      )
    );
  };

  useMemo(() => {
    handleGetBodyStats();
  }, [
    yearOfBirth,
    height,
    weight,
    neckCircumference,
    waistCircumference,
    hipCircumference,
    sex,
  ]);

  return (
    <div className="flex flex-col gap-3 h-fit  relative ">
      <div className="flex items-center justify-between">
        <h1 className="underline underline-offset-4">Personal Information</h1>
        <button
          onClick={(f) => f}
          className=" p-1 hover:bg-blue-600  rounded transition-colors"
        >
          <LuLogs className="w-[1.2rem] h-fit" />
        </button>
      </div>
      <NumberField
        placeholder={"year of birth"}
        state={yearOfBirth}
        setState={setYearOfBirth}
        min={1900}
        max={2024}
      />
      <NumberField
        placeholder={"height [cm]"}
        state={height}
        setState={setHeight}
        min={0}
        max={300}
      />
      <NumberField
        placeholder={"weight [kg]"}
        state={weight}
        setState={setWeight}
        min={0}
        max={300}
      />{" "}
      <NumberField
        placeholder={"neck circumference [cm]"}
        state={neckCircumference}
        setState={setNeckCircumference}
        min={0}
        max={300}
      />{" "}
      <NumberField
        placeholder={"waist circumference [cm]"}
        state={waistCircumference}
        setState={setWaistCircumference}
        min={0}
        max={300}
      />{" "}
      <ToggleInput
        selectedValue={sex}
        value1="Male"
        value2="Female"
        setSelectedValue={setSex}
      />
      {sex === "Female" && (
        <NumberField
          placeholder={"hip circumference [cm]"}
          state={hipCircumference}
          setState={setHipCircumference}
          min={0}
          max={300}
        />
      )}
      <div className="h-[1px] bg-foreground/20"></div>
      <div className="flex justify-between items-center">
        <SubmitButton title="Update" />
        <button
          onClick={(f) => f}
          className=" p-1 hover:bg-blue-600  rounded transition-colors"
        >
          <MdRestore className="w-[1.5rem] h-fit text-foreground" />
        </button>{" "}
      </div>
      <div className="h-[1px] bg-foreground/50"></div>
      <BodyStats stats={stats} />
    </div>
  );
}

export default PersonalInfoForm;
