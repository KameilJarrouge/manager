import React from "react";

function CircularProgress({ progress = 0 }) {
  return (
    <div>
      {/* <!-- Circular Progress --> */}
      <div className="flex gap-2 relative items-center size-[2.5rem]">
        <svg
          className="size-full -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <!-- Background Circle --> */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-foreground/10"
            strokeWidth="3"
          ></circle>
          {/* <!-- Progress Circle --> */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-foreground"
            strokeWidth="3"
            strokeDasharray="100"
            strokeDashoffset={100 - progress}
            strokeLinecap="round"
          ></circle>
        </svg>

        {/* <!-- Percentage Text --> */}
        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span className="text-center text-xs font-bold text-foreground/60">
            {`${progress}`}
          </span>
        </div>
      </div>
      {/* <!-- End Circular Progress --> */}
    </div>
  );
}

export default CircularProgress;
