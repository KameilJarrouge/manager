import React from "react";

function ToggleInput({
  value1 = "value1",
  value2 = "value2",
  selectedValue,
  setSelectedValue,
  className = "",
}) {
  return (
    <div
      className={`w-fit   py-1 px-2 gap-2 rounded bg-input_bg grid grid-cols-2 relative z-0 text-foreground ${className}`}
    >
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-accent rounded  -z-10 ${
          selectedValue === value2 && "translate-x-full"
        } transition-transform  duration-200 ease-in`}
      ></div>
      <button
        className="w-full text-center min-w-[10ch] "
        onClick={() => setSelectedValue(value1)}
      >
        {value1}
      </button>
      <button
        className="w-full text-center min-w-[10ch]  "
        onClick={() => setSelectedValue(value2)}
      >
        {value2}
      </button>
    </div>
  );
}

export default ToggleInput;
