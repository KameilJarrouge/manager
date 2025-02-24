"use client";
import { MdChevronRight } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import React, { useState } from "react";

function TextField({ state, setState, placeholder, hidden, ...props }) {
  const [isHidden, setIsHidden] = useState(hidden);

  return (
    <div className="flex w-fit group relative ">
      <div
        data-tooltip-id="my-tooltip"
        data-tooltip-content={placeholder}
        data-tooltip-place="left"
        className="w-fit flex items-center  bg-input_prefix_bg group-focus-within:bg-accent transition-colors rounded-l"
      >
        <MdChevronRight className="text-foreground" />
      </div>
      <input
        type={!isHidden ? "text" : "password"}
        className="outline-none bg-input_bg py-1 px-2 w-[25ch]  "
        placeholder={placeholder}
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        {...props}
      />
      {hidden && (
        <button
          onClick={() => setIsHidden((isHidden) => !isHidden)}
          className="bg-input_bg flex items-center px-1 hover:text-white "
        >
          {isHidden ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      )}
    </div>
  );
}

export default TextField;
