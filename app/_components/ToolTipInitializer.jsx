"use client";
import React from "react";
import { Tooltip } from "react-tooltip";

function ToolTipInitializer() {
  return (
    <Tooltip
      id="my-tooltip"
      className="text-wrap"
      delayShow={500}
      opacity={1}
      render={({ content }) => (
        <div className=" text-wrap max-w-[40ch] z-[52] ">{content}</div>
      )}
    />
  );
}

export default ToolTipInitializer;
