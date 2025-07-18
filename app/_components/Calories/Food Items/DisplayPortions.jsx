import React from "react";
import { MdDelete } from "react-icons/md";

function DisplayPortions({ portions, deleteByKey = (f) => f }) {
  return (
    <div className="grid grid-cols-3 gap-2 max-h-[10rem] min-h-[2rem] overflow-y-auto  text-sm  p-0.5 ">
      {Object.keys(portions).map((portionKey, index, arr) => (
        <div
          key={index}
          className={`flex justify-between bg-secondary/60 rounded p-0.5 shadow shadow-black min-w-[10ch] items-center gap-0.5`}
        >
          <span>{`${portionKey}: ${portions[portionKey]}`}</span>
          <button
            onClick={() => deleteByKey(portionKey)}
            className=" p-1 hover:bg-red-600  rounded transition-colors"
          >
            <MdDelete />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DisplayPortions;
