"use client";
import LoadingComponent from "@/app/_components/LoadingComponent";
import SideMenu from "@/app/_components/SideMenu";
import DatesList from "@/app/_displayLists/DatesList";
import CreateDateForm from "@/app/_forms/CreateDateForm";
import UpdateDateForm from "@/app/_forms/UpdateDateForm";
import api from "@/app/_lib/api";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdRestore } from "react-icons/md";

function Dates() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDates = async () => {
    setSelectedDate(undefined);

    setIsLoading(true);
    let result = await api.get("/dates");
    if (result.data.success) {
      const groupedByMonth = result.data.result.reduce((prev, curr) => {
        if (prev.hasOwnProperty(curr.month)) {
          prev[curr.month].push(curr);
        } else {
          prev[curr.month] = [curr];
        }
        return prev;
      }, {});
      setDates(groupedByMonth);
    }
    setIsLoading(false);
  };
  const changeYear = (value) => {
    setSelectedYear((searchKey) => moment(searchKey).add(value, "years"));
  };

  const handleRestore = () => {
    setSelectedYear(new Date());
  };
  useEffect(() => {
    getDates();
  }, []);

  return (
    <div className="w-full h-full relative pr-[4rem]  pl-[2rem]  overflow-x-hidden">
      {/* Main */}
      <div className="w-full  h-full  flex flex-col gap-2">
        {/* Header */}
        <div className="w-full  flex gap-2 pt-0.5 items-center">
          {/* Search */}
          <div className="flex gap-2 items-center h-fit">
            <button
              onClick={() => changeYear(-1, false)}
              className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
            >
              <FiChevronsLeft className="w-[1.2rem] h-fit" />
            </button>
            <span className="w-[4ch]">
              {moment(selectedYear).format("YYYY")}
            </span>
            <button
              onClick={() => changeYear(1, false)}
              className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
            >
              <FiChevronsRight className="w-[1.2rem] h-fit" />
            </button>
            <button
              onClick={handleRestore}
              className="p-1 hover:bg-blue-600 rounded transition-colors"
            >
              <MdRestore className="w-[1.5rem] h-fit" />
            </button>
          </div>
          <div className="w-[1px] h-full bg-input_bg" />
          {/* New Button */}
          <button
            onClick={() => {
              setSelectedDate(undefined);
              setIsSideMenuOpen(true);
            }}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <GoPlus className="w-[1.5rem] h-fit" strokeWidth={1} />
          </button>
        </div>

        {/* Content */}
        <div className=" w-full h-full relative">
          {isLoading && <LoadingComponent />}
          <DatesList
            yearToView={selectedYear}
            dates={dates}
            onSelect={(date) => {
              setSelectedDate(date);
              setIsSideMenuOpen(true);
            }}
            selectedDate={selectedDate}
          />
        </div>
      </div>
      <SideMenu
        openState={isSideMenuOpen}
        setOpenState={setIsSideMenuOpen}
        id={"dates"}
      >
        {!selectedDate ? (
          <CreateDateForm
            afterSubmit={() => {
              setIsSideMenuOpen(false);
              getDates();
            }}
          />
        ) : (
          <UpdateDateForm
            afterSubmit={() => {
              setSelectedDate(undefined);
              setIsSideMenuOpen(false);
              getDates();
            }}
            dateObject={selectedDate}
          />
        )}
      </SideMenu>
    </div>
  );
}

export default Dates;
