"use client";
import React, { useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";

function SideMenu({ openState, setOpenState = (f) => f, id, children }) {
  /**
   * handles hiding the menu when clicked outside
   * @param {Object} e mouse click event
   */
  const handleMouseClick = (e) => {
    const menu = document.getElementById("side-menu" + id);
    if (!menu.contains(e.target)) {
      setOpenState(false);
    }
  };
  useEffect(() => {
    const body = document.getElementById("body");
    if (!body) return;

    body.addEventListener("mousedown", handleMouseClick);

    return () => {
      body.removeEventListener("mousedown", handleMouseClick);
    };
  }, []);
  return (
    <div
      id={"side-menu" + id}
      className={`absolute  ${
        !openState ? "translate-x-[calc(100%-2rem)]" : ""
      } w-fit h-full top-0 right-0 flex items-center   z-10 transition-all duration-200`}
    >
      {/* Bar */}
      <div
        // onMouseEnter={() => setOpenState(true)}
        onClick={() => {
          setOpenState(!openState);
        }}
        className="w-[2rem] h-full bg-secondary bg-[radial-gradient(#eeeeee22_1px,transparent_1px)] bg-[size:5px_5px] rounded-l flex items-center group"
      >
        <div className=" flex justify-center items-center bg-transparent  group-hover:text-secondary  group-hover:bg-foreground/90 rounded-lg transition-colors">
          <MdChevronLeft
            className={`w-[2rem] h-fit ${
              openState && "rotate-180"
            } transition-transform`}
          />
        </div>
      </div>
      {/* Content */}
      <div
        className={`w-fit bg-secondary h-full origin-right overflow-x-hidden overflow-y-auto `}
      >
        {children}
      </div>
      <div className="w-[1rem] h-full bg-secondary bg-[radial-gradient(#eeeeee22_1px,transparent_1px)] bg-[size:5px_5px] rounded-l" />
    </div>
  );
}

export default SideMenu;
