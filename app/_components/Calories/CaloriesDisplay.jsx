import React, { useState } from "react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdOutlineLocalFireDepartment,
} from "react-icons/md";
import TodayModal from "./Today/TodayModal";

function CaloriesDisplay() {
  const [isTodayModalOpen, setIsTodayModalOpen] = useState(false);

  return (
    <>
      <TodayModal
        isOpen={isTodayModalOpen}
        close={() => setIsTodayModalOpen(false)}
      />
      <button
        onClick={() => setIsTodayModalOpen(true)}
        className="w-fit text-sm flex items-center justify-center gap-4  hover:bg-foreground/10 p-1 rounded"
      >
        <div className="flex flex-col items-center">
          <MdOutlineLocalFireDepartment className="text-orange-500/80 w-[1.5rem] h-fit" />
          <span className="text-xs text-foreground">kcal</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-2 items-center">
            <MdArrowUpward className="text-green-400" />
            <span>1,200</span>
          </div>
          <div className="h-[1px] w-[8ch] bg-foreground/50"></div>
          <div className="flex gap-2 items-center">
            <MdArrowDownward className="text-red-400" />
            <span>2,200</span>
          </div>
        </div>
        <span className="text-foreground/60 text-xs">[1,000]</span>
      </button>
    </>
  );
}

export default CaloriesDisplay;
