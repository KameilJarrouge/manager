import React from "react";
import { GoMoon, GoSun } from "react-icons/go";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function HourlyMenu({ children, changeOffset, hourSectionOffset, setOffset }) {
  return (
    <div className="flex flex-col items-center w-full h-full">
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

      <div className="w-full flex gap-4 items-center justify-center text-foreground/50">
        <button onClick={() => setOffset(0)}>
          <GoMoon
            className={`w-[1.2rem] h-fit  transition-colors ${
              hourSectionOffset === 0
                ? "text-yellow-400 "
                : "hover:text-foreground"
            } `}
          />
        </button>
        <div className="relative w-[1.2rem] h-full">
          <button
            onClick={() => {
              if (hourSectionOffset === 6) setOffset(12);
              else setOffset(6);
            }}
            className="absolute left-0 top-0   w-[0.6rem] h-[1.2rem] overflow-x-hidden"
          >
            <GoSun
              className={`w-[1.2rem] h-[1.2rem] transition-colors ${
                hourSectionOffset === 6
                  ? "text-yellow-400 "
                  : "hover:text-foreground"
              }`}
            />
          </button>
          <button
            onClick={() => {
              if (hourSectionOffset === 12) setOffset(6);
              else setOffset(12);
            }}
            className="absolute right-0 top-0 rotate-180   w-[0.6rem] h-[1.2rem] overflow-x-hidden"
          >
            <GoSun
              className={`w-[1.2rem] h-[1.2rem] transition-colors ${
                hourSectionOffset === 12
                  ? "text-yellow-400 "
                  : "hover:text-foreground"
              }`}
            />
          </button>
        </div>
        <button onClick={() => setOffset(18)}>
          <GoMoon
            className={`w-[1.2rem] h-fit transition-colors ${
              hourSectionOffset === 18
                ? "text-yellow-400 "
                : "hover:text-foreground"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default HourlyMenu;
