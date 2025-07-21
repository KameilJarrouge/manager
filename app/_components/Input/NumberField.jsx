"use client";
import { MdChevronRight } from "react-icons/md";

import React, { useState } from "react";

function NumberField({
  state,
  setState,
  placeholder,
  className,
  withHandle = true,
  ...props
}) {
  const [showTitle, setShowTitle] = useState(false);
  return (
    <div className="flex w-fit group relative ">
      {showTitle && (
        <div
          onMouseLeave={() => setShowTitle(false)}
          className="absolute top-0 right-0 bg-input_prefix_bg py-1 px-2 text-foreground/70"
        >
          {placeholder}
        </div>
      )}
      <div className="w-fit flex items-center  bg-input_prefix_bg group-focus-within:bg-accent transition-colors rounded-l">
        <MdChevronRight className="text-foreground" />
      </div>
      <input
        type={"number"}
        className={`outline-none bg-input_bg py-1 px-2 w-[25ch] ${className}  `}
        placeholder={placeholder}
        value={state || ""}
        onChange={(e) => {
          setState(e.target.value);
        }}
        {...props}
      />
      {withHandle && (
        <div
          onClick={() => {
            setShowTitle(true);
          }}
          className={`w-[2.4ch] bg-input_bg flex items-center bg-[radial-gradient(#eeeeee33_1px,transparent_1px)] hover:bg-[radial-gradient(#eeeeee88_1px,transparent_1px)] bg-[size:5px_5px]`}
        ></div>
      )}
    </div>
  );
}

export default NumberField;
