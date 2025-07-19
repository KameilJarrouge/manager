import LoadingComponent from "@/app/_components/LoadingComponent";
import React, { useEffect, useMemo, useState } from "react";
import { MdRestore } from "react-icons/md";
import moment from "moment";
import getBodyStats from "@/app/_lib/caloriesHelper";
import { toast } from "react-toastify";
import NumberField from "@/app/_components/Input/NumberField";
import SubmitButton from "@/app/_components/Input/SubmitButton";
import BodyStats from "../../BodyStats";
import api from "@/app/_lib/api";

function UpdateTodayPersonalInfo({ today, triggerRefresh = (f) => f }) {
  const [weight, setWeight] = useState(today.weight);
  const [neck, setNeck] = useState(today.neck);
  const [hip, setHip] = useState(today.hip);
  const [waist, setWaist] = useState(today.waist);
  const [stats, setStats] = useState({ BMI: "?", BMR: "?", bodyFat: "?" });
  const [isLoading, setIsLoading] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({});

  const getPersonalInformation = async () => {
    setIsLoading(true);
    const result = await api.get(`/calories/personal-information`);
    setIsLoading(false);
    if (result.data.success) {
      setPersonalInformation(result.data.result);
    }
  };

  const handleRestore = () => {
    setWeight(today.weight);
    setNeck(today.neck);
    setWaist(today.waist);
    setHip(today.hip);
  };

  useEffect(() => {
    getPersonalInformation();
  }, []);

  useEffect(() => {
    handleRestore();
  }, [today]);

  const handleGetBodyStats = () => {
    setStats(
      getBodyStats(
        personalInformation.yearOfBirth || 2000,
        personalInformation.height || 170,
        weight || 70,
        neck || 38.1,
        waist || 96,
        hip || 97,
        personalInformation.sex || "Male"
      )
    );
  };

  const updateDayPersonalInformation = async () => {
    setIsLoading(true);
    const result = await api.put(`/calories/days/${today.id}/update`, {
      weight,
      neck,
      waist,
      hip,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Personal Information for this day is updated!");
      getPersonalInformation();
      triggerRefresh();
    }
  };

  const matchTodayPersonalInformationWithCurrent = async () => {
    setIsLoading(true);
    const result = await api.put(
      `/calories/days/${today.id}/update-to-match-current-pi`
    );
    setIsLoading(false);
    if (result.data.success) {
      toast("Personal Information match current!");
      getPersonalInformation();
      triggerRefresh();
    }
  };

  useMemo(() => {
    handleGetBodyStats();
  }, [weight, neck, waist, hip]);

  return (
    <div className="flex flex-col gap-4">
      {isLoading && <LoadingComponent />}
      <div className="w-full flex justify-between items-center">
        <h1 className="underline underline-offset-4">Personal Information</h1>
        <h1 className=" text-sm">
          ({moment(today.date).format("YYYY-MM-DD")})
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <NumberField
          className={"w-[23ch]"}
          placeholder={"weight [kg]"}
          state={weight}
          setState={setWeight}
          min={0}
          max={300}
        />{" "}
        <NumberField
          className={"w-[23ch]"}
          placeholder={"neck circumference [cm]"}
          state={neck}
          setState={setNeck}
          min={0}
          max={300}
        />{" "}
        <NumberField
          className={"w-[23ch]"}
          placeholder={"waist circumference [cm]"}
          state={waist}
          setState={setWaist}
          min={0}
          max={300}
        />{" "}
      </div>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <SubmitButton
          onSubmit={updateDayPersonalInformation}
          title={`Update Information`}
        />
        <SubmitButton
          onSubmit={matchTodayPersonalInformationWithCurrent}
          title={`Update to Current Information`}
        />
        <button
          onClick={handleRestore}
          className=" p-1 hover:bg-blue-600  rounded transition-colors"
        >
          <MdRestore className="w-[1.5rem] h-fit text-foreground" />
        </button>
      </div>
      <div className="w-full bg-input_prefix_bg">
        <BodyStats stats={stats} />
      </div>
    </div>
  );
}

export default UpdateTodayPersonalInfo;
