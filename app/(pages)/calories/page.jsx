"use client";
import MainCaloriesLog from "@/app/_components/Calories/MainCaloriesLog";
import MainCaloriesTable from "@/app/_components/Calories/MainCaloriesTable";
import PersonalInfoForm from "@/app/_components/Calories/PersonalInfoForm";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";

function Calories() {
  const [isLogMenuOpen, setIsLogMenuOpen] = useState(false);
  const [personalInformation, setPersonalInformation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleGetPersonalInformation = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/personal-information");
    setIsLoading(false);
    if (result.data.success && result.data.result) {
      setPersonalInformation(result.data.result);
    }
  };

  useEffect(() => {
    handleGetPersonalInformation();
  }, []);

  return (
    <div className="w-full h-full relative px-[2rem]  overflow-x-hidden">
      {isLoading && <LoadingComponent />}
      <div className="flex gap-2 w-full">
        <PersonalInfoForm
          setIsLogMenuOpen={setIsLogMenuOpen}
          isLogMenuOpen={isLogMenuOpen}
          personalInformation={personalInformation}
          triggerRefresh={handleGetPersonalInformation}
        />
        <div className="w-[1px] bg-foreground/50" />
        {isLogMenuOpen ? (
          <MainCaloriesLog personalInformation={personalInformation} />
        ) : (
          <MainCaloriesTable />
        )}
      </div>
    </div>
  );
}

export default Calories;
