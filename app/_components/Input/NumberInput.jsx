import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

function NumberInput({ value, setValue }) {
  return (
    <div className="flex items-center  px-1 gap-1  w-full h-full min-h-[1rem]">
      <button
        onClick={() => {
          if (value !== 1) setValue(value - 1);
        }}
        className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
      >
        <FiMinus className="cursor-pointer  " />
      </button>
      <input
        type="number"
        className=" w-[3ch] outline-none text-center  h-[1.5rem] bg-input_bg"
        max={999}
        min={1}
        value={value}
        onChange={(e) => {
          if (Number(e.target.value) > 0 && Number(e.target.value) < 1000)
            setValue(Number(e.target.value));
        }}
      />
      <button
        onClick={() => {
          if (value !== 999) setValue(value + 1);
        }}
        className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
      >
        <IoMdAdd className="cursor-pointer " />
      </button>
    </div>
  );
}

export default NumberInput;
