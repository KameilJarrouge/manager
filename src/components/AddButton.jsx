import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

function AddButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-2 py-1 flex justify-center items-center group   bg-white rounded-lg cursor-pointer`}
    >
      <AiOutlinePlus className={` stroke-[1rem]  group-hover:fill-primary  `} />
    </div>
  );
}

export default AddButton;
