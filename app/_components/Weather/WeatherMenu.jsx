import React from "react";

function WeatherMenu({ children, showDetails, isCollapsing, inTransition }) {
  return (
    <div
      id="forecast-menu"
      className={`  z-20 top-[4.1rem] ${showDetails ? "absolute" : "hidden"} ${
        isCollapsing ? "animate-collapse" : "animate-expand"
      } bg-secondary h-[21rem]  w-[51rem] origin-left rounded pt-4 pb-2 px-4 shadow shadow-black  `}
    >
      <div
        className={`w-full h-full flex flex-col ${
          inTransition && "invisible"
        } `}
      >
        {children}
      </div>
    </div>
  );
}

export default WeatherMenu;
