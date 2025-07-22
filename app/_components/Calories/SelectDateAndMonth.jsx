import moment from "moment";
import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { MdRestore } from "react-icons/md";

function SelectDateAndMonth({ setDate, restore, selectedDate }) {
  const changeDate = (value, changeMonth = true) => {
    if (
      moment(new Date()).isSame(selectedDate, changeMonth ? "month" : "year") &&
      value > 0
    )
      return;
    setDate((selectedDate) =>
      moment(selectedDate).add(value, changeMonth ? "months" : "years")
    );
  };
  return (
    <div className="w-fit py-0.5 flex items-center gap-2">
      <button
        onClick={() => changeDate(-1, false)}
        className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
      >
        <FiChevronsLeft className="w-[1.2rem] h-fit" />
      </button>
      <span className="w-[4ch]">{moment(selectedDate).format("YYYY")}</span>
      <button
        onClick={() => changeDate(1, false)}
        className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
      >
        <FiChevronsRight className="w-[1.2rem] h-fit" />
      </button>
      <button
        onClick={() => changeDate(-1, true)}
        className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
      >
        <FiChevronLeft className="w-[1.2rem] h-fit" />
      </button>
      <span className="w-[8ch] text-center">
        {moment(selectedDate).format("MMMM")}
      </span>
      <button
        onClick={() => changeDate(1, true)}
        className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
      >
        <FiChevronRight className="w-[1.2rem] h-fit" />
      </button>
      <button
        onClick={restore}
        className=" p-1 hover:bg-blue-600  rounded transition-colors"
      >
        <MdRestore className="w-[1.4rem] h-fit text-foreground" />
      </button>
    </div>
  );
}

export default SelectDateAndMonth;
