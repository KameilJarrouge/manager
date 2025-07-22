import React from "react";

function ListHeader() {
  return (
    <div className="grid grid-cols-12  text-sm sticky top-0 bg-primary shadow shadow-black">
      <span className="bg-input_bg p-0.5 col-span-6 ">{"name"}</span>
      <span className="bg-input_bg/80 p-0.5 col-span-1 text-center">
        {"kcal"}
      </span>
      <span className="bg-input_bg/50 p-0.5 col-span-3 text-center">
        {"factor"}
      </span>
      <span className="bg-input_prefix_bg p-0.5 col-span-2 text-center">
        {"total"}
      </span>
    </div>
  );
}

export default ListHeader;
