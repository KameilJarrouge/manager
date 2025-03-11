import React from "react";
import NumberInput from "./NumberInput";
function IntervalRepeatInput({ value, setValue }) {
  return (
    <div className="text-text flex gap-2 items-center  ">
      <span>Repeat every </span>
      <span>
        <NumberInput value={value} setValue={setValue} />
      </span>
      <span>{`day${value > 1 ? "s" : ""}`}</span>
    </div>
  );
}

export default IntervalRepeatInput;
