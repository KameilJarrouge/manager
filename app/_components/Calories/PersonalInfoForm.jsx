import React, { useEffect, useMemo, useState } from "react";
import NumberField from "../Input/NumberField";
import ToggleInput from "../Input/ToggleInput";
import SubmitButton from "../Input/SubmitButton";
import { MdRestore } from "react-icons/md";
import getBodyStats from "@/app/_lib/caloriesHelper";
import { LuLogs } from "react-icons/lu";
import BodyStats from "./BodyStats";
import LoadingComponent from "../LoadingComponent";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";

function PersonalInfoForm() {
  const [personalInformation, setPersonalInformation] = useState(null);
  const [yearOfBirth, setYearOfBirth] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [neck, setNeck] = useState(null);
  const [hip, setHip] = useState(null);
  const [waist, setWaist] = useState(null);
  const [sex, setSex] = useState("Male");
  const [stats, setStats] = useState({ BMI: "?", BMR: "?", bodyFat: "?" });
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPersonalInformation = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/personal-information");
    setIsLoading(false);
    if (result.data.success && result.data.result) {
      const personalInformation = result.data.result;
      setPersonalInformation(personalInformation);
      setYearOfBirth(personalInformation.yearOfBirth);
      setWeight(personalInformation.weight);
      setHeight(personalInformation.height);
      setNeck(personalInformation.neck);
      setHip(personalInformation.hip);
      setWaist(personalInformation.waist);
      setSex(personalInformation.sex);
    }
  };

  const handleRestore = () => {
    setYearOfBirth(personalInformation.yearOfBirth);
    setWeight(personalInformation.weight);
    setHeight(personalInformation.height);
    setNeck(personalInformation.neck);
    setHip(personalInformation.hip);
    setWaist(personalInformation.waist);
    setSex(personalInformation.sex);
  };

  const handleSavePersonalInformation = async () => {
    if (
      !yearOfBirth ||
      !weight ||
      !height ||
      !neck ||
      (!hip && sex === "Female") ||
      !waist ||
      !sex
    ) {
      toast.error("All Fields are required");
      return;
    }
    setIsLoading(true);
    let result;
    if (personalInformation) {
      result = await api.put(
        `/calories/personal-information/${personalInformation.id}/update`,
        {
          yearOfBirth,
          weight,
          height,
          neck,
          hip,
          waist,
          sex,
        }
      );
    } else {
      result = await api.post(`/calories/personal-information/create`, {
        yearOfBirth,
        weight,
        height,
        neck,
        hip,
        waist,
        sex,
      });
    }
    setIsLoading(false);
    if (result.data.success) {
      toast("Personal Information Saved!");
      handleGetPersonalInformation();
    }
  };

  useEffect(() => {
    handleGetPersonalInformation();
  }, []);

  const handleGetBodyStats = () => {
    setStats(
      getBodyStats(
        yearOfBirth || 2000,
        height || 170,
        weight || 70,
        neck || 38.1,
        waist || 96,
        hip || 97,
        sex || "Male"
      )
    );
  };

  useMemo(() => {
    handleGetBodyStats();
  }, [yearOfBirth, height, weight, neck, waist, hip, sex]);

  return (
    <div className="flex flex-col gap-3 h-fit  relative ">
      {isLoading && <LoadingComponent />}
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
        state={neck}
        setState={setNeck}
        min={0}
        max={300}
      />{" "}
      <NumberField
        placeholder={"waist circumference [cm]"}
        state={waist}
        setState={setWaist}
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
          state={hip}
          setState={setHip}
          min={0}
          max={300}
        />
      )}
      <div className="h-[1px] bg-foreground/20"></div>
      <div className="flex justify-between items-center">
        <SubmitButton
          onSubmit={handleSavePersonalInformation}
          title={`Save Information`}
        />
        {personalInformation && (
          <button
            onClick={handleRestore}
            className=" p-1 hover:bg-blue-600  rounded transition-colors"
          >
            <MdRestore className="w-[1.5rem] h-fit text-foreground" />
          </button>
        )}
      </div>
      <div className="h-[1px] bg-foreground/50"></div>
      <BodyStats stats={stats} />
    </div>
  );
}

export default PersonalInfoForm;
