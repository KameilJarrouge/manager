import React from "react";
import {
  GoArrowDownLeft,
  GoArrowDownRight,
  GoArrowUpLeft,
  GoArrowUpRight,
} from "react-icons/go";

function LoadingComponent() {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-10 backdrop-blur flex items-center justify-center bg-secondary bg-opacity-30 bg-[radial-gradient(#eeeeee22_1px,transparent_1px)] bg-[size:5px_5px]">
      <div className="grid grid-cols-2  bg-input_prefix_bg rounded-lg p-1">
        <GoArrowUpLeft className="animate-fadeInOut text-foreground" />
        <GoArrowUpRight
          className="animate-fadeInOut text-foreground "
          style={{ animationDelay: "200ms" }}
        />
        <GoArrowDownLeft
          className="animate-fadeInOut text-foreground"
          style={{ animationDelay: "600ms" }}
        />
        <GoArrowDownRight
          className="animate-fadeInOut text-foreground"
          style={{ animationDelay: "400ms" }}
        />
      </div>
    </div>
  );
}

export default LoadingComponent;
