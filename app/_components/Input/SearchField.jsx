"use client";
import React from "react";

function SearchField({ state, setState, ...props }) {
  return (
    <div className="w-fit flex items-center border border-transparent focus-within:border-gray-500 rounded">
      <input
        type={"text"}
        className="outline-none bg-input_bg py-1 px-2 w-[40ch] text-center rounded"
        placeholder={"Search"}
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        autoComplete="off"
        onFocus={(e) => {
          e.target.select(0, e.target.value.length);
        }}
        {...props}
      />
    </div>
  );
}

export default SearchField;
