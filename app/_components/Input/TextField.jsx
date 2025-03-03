"use client";
import { MdChevronRight } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import React, { useState } from "react";

function TextField({ state, setState, placeholder, hidden, ...props }) {
  const [isHidden, setIsHidden] = useState(hidden);
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
        type={!isHidden ? "text" : "password"}
        className="outline-none bg-input_bg py-1 px-2 w-[25ch]  "
        placeholder={placeholder}
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        {...props}
      />
      <div
        onMouseEnter={() => {
          if (!hidden) setShowTitle(true);
        }}
        className={` bg-input_bg flex items-center bg-[radial-gradient(#eeeeee33_1px,transparent_1px)] bg-[size:5px_5px]`}
      >
        <button
          onClick={() => setIsHidden((isHidden) => !isHidden)}
          className={`${
            !hidden ? "invisible" : "visible"
          }  flex items-center px-1 hover:text-white `}
        >
          {isHidden ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </div>
    </div>
  );
}

export default TextField;
