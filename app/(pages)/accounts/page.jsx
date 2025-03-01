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
      >
        <p className="text-justify w-[60ch]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
          facilis eligendi quisquam cumque explicabo doloremque odit quidem vero
          natus cum dolorem vitae non iste distinctio ducimus quaerat a tenetur,
          nam obcaecati! Magni vel veritatis maiores porro quisquam et quibusdam
          ipsum.
        </p>
      </SideMenu>
    </div>
  );
}

export default Accounts;
