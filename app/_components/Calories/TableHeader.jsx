import React from "react";

function TableHeader({ children, className, value }) {
  return (
    <h1
      className={`sticky top-0 border border-foreground/20 bg-secondary text-base pl-1 ${className} min-h-[1.5rem]`}
    >
      {value}
    </h1>
  );
}

export default TableHeader;
