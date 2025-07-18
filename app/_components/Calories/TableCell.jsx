import React from "react";

function TableCell({ children, index, className }) {
  return (
    <span
      className={`border border-foreground/20 pl-1 ${
        index % 2 === 0 ? "bg-input_bg" : "bg-input_prefix_bg"
      } text-sm truncate ${className} min-h-[1.3rem] `}
    >
      {children}
    </span>
  );
}

export default TableCell;
