"use client";
import React from "react";
import { IoMdEyeOff } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { MdClear } from "react-icons/md";
import TextField from "./TextField";

function KeyValueInput({ setRow, removeKeyValue, row }) {
  return (
    <div className="flex items-center ">
      <div className="w-full flex flex-col gap-2  ">
        <TextField
          placeholder={"key"}
          setState={(value) => setRow({ ...row, key: value })}
          state={row.key}
        />
        <TextField
          placeholder={"value"}
          setState={(value) => setRow({ ...row, value: value })}
          state={row.value}
        />
      </div>
      <div className="flex flex-col gap-2 justify-center h-full ">
        <button onClick={removeKeyValue}>
          <MdClear
            className={`text-dark_text hover:text-red-400 cursor-pointer`}
          />
        </button>
        <button onClick={() => setRow({ ...row, hidden: !row.hidden })}>
          <IoMdEyeOff
            className={`cursor-pointer ${
              row.hidden
                ? "text-blue-400"
                : " text-dark_text hover:text-light_text"
            }`}
          />
        </button>
        <button onClick={() => setRow({ ...row, canCopy: !row.canCopy })}>
          <LuClipboardCheck
            className={`cursor-pointer ${
              row.canCopy
                ? "text-green-400"
                : "text-dark_text hover:text-light_text"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default KeyValueInput;
