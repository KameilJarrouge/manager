"use client";
import React, { useEffect, useRef, useState } from "react";
import TextField from "./TextField";
import CalendarSelect from "../CalendarSelect";
import moment from "moment";

function DateField({
  state,
  setState,
  placeholder = "Created At",
  position = "top",
}) {
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);

  // handles outside click to close the menu
  const handleMouseClick = (e) => {
    const menu = document.getElementById("data-input-container");
    // const dateInput = document.getElementById("date-input");

    // if (menu && !menu.contains(e.target) && !dateInput.contains(e.target)) {
    if (!menu.contains(e.target)) {
      setIsDateMenuOpen(false);
    }
  };
  useEffect(() => {
    const body = document.getElementById("body");
    if (!body) return;

    body.addEventListener("mousedown", handleMouseClick);

    return () => {
      body.removeEventListener("mousedown", handleMouseClick);
    };
  }, []);
  return (
    <div id="data-input-container" className="w-fit h-fit relative">
      <TextField
        id="date-input"
        onFocus={() => setIsDateMenuOpen(true)}
        placeholder={placeholder}
        state={moment(state).format("YYYY / MM / DD")}
        readOnly
      />
      {isDateMenuOpen && (
        <div
          id="date-menu"
          tabIndex={"1"}
          className={`absolute ${
            position === "top" ? "bottom-[2.1rem]" : "top-[2.1rem]"
          } left-[0rem] w-fit p-0.5 pt-1 h-fit bg-secondary border border-input_bg shadow shadow-black z-10`}
        >
          <CalendarSelect
            initialDate={state}
            onSelect={(date) => {
              setState(date);
              setIsDateMenuOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DateField;
