"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import api from "../_lib/api";
import { toast } from "react-toastify";
import { MdLogout, MdPassword } from "react-icons/md";
import UpdatePasswordModal from "../_components/Modals/UpdatePasswordModal";
import WeatherForecast from "../_components/Weather/WeatherForecast";
import { LuDatabaseBackup } from "react-icons/lu";

function UserSection() {
  const router = useRouter();
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const handleLogout = async () => {
    let result = await api.post("/logout");
    if (result.data.success) {
      toast("Logged Out");
      router.push("/auth");
    }
  };

  const handleBackup = async () => {
    const response = await fetch("http://localhost:3000/api/backup");
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = response.headers
        .get("Content-Disposition")
        .split("filename=")[1];
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("Failed to download backup");
    }
  };

  return (
    <div className="w-full flex gap-2 justify-between items-center   ">
      <div className="pl-4 flex">
        <WeatherForecast />
      </div>
      <div className="flex gap-2 items-start p-4">
        <UpdatePasswordModal
          isOpen={updateModalIsOpen}
          close={() => setUpdateModalIsOpen(false)}
        />

        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Change Password"
          data-tooltip-place="bottom"
          className="w-fit h-fit rounded-full p-1 group hover:bg-foreground transition-colors"
          onClick={() => setUpdateModalIsOpen(true)}
        >
          <MdPassword className="w-[1.5rem] h-fit text-foreground group-hover:text-secondary transition-colors" />
        </button>
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Logout"
          data-tooltip-place="bottom-start"
          className="w-fit h-fit rounded-full p-1 group hover:bg-foreground transition-colors"
          onClick={handleLogout}
        >
          <MdLogout className="w-[1.5rem] h-fit text-foreground group-hover:text-secondary transition-colors" />
        </button>
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Backup Database"
          data-tooltip-place="bottom"
          className="w-fit h-fit rounded-full p-1 group hover:bg-foreground transition-colors"
          onClick={handleBackup}
        >
          <LuDatabaseBackup className="w-[1.5rem] h-fit text-foreground group-hover:text-secondary transition-colors" />
        </button>
      </div>
    </div>
  );
}

export default UserSection;
