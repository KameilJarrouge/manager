"use client";
import SideMenu from "@/app/_components/SideMenu";
import React, { useState } from "react";

function Accounts() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className="w-full h-full relative pr-[3rem] overflow-x-hidden">
      {/* Main */}
      <div className="w-full  h-full "></div>
      <SideMenu
        openState={isSideMenuOpen}
        setOpenState={setIsSideMenuOpen}
        id={"accounts"}
      ></SideMenu>
    </div>
  );
}

export default Accounts;
