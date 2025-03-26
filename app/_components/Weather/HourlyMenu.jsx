import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function HourlyMenu({ children, changeOffset, hourSectionOffset }) {
  return (
    <div className="w-full  overflow-x-auto flex justify-between items-center h-full px-1">
      <button
        onClick={() => changeOffset(-1)}
        className={`w-fit p-0.5 rounded hover:bg-foreground/10 ${
          hourSectionOffset === 0 && "text-foreground/50"
        }`}
      >
        <MdChevronLeft className="w-[2rem] h-fit " />
      </button>
      {children}
      <button
        onClick={() => changeOffset(1)}
        className={`w-fit p-0.5 rounded hover:bg-foreground/10 ${
          hourSectionOffset === 18 && "text-foreground/50"
        }`}
      >
        <MdChevronRight className="w-[2rem] h-fit" />
      </button>
    </div>
  );
}

export default HourlyMenu;
