"use client";
import DaysRepeatInput from "@/app/_components/Input/DaysRepeatInput";
import IntervalRepeatInput from "@/app/_components/Input/IntervalRepeatInput";
import ToggleInput from "@/app/_components/Input/ToggleInput";
import SideMenu from "@/app/_components/SideMenu";
import CreateTodoForm from "@/app/_forms/CreateTodoForm";
import React, { useState } from "react";

function Todo() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(undefined);
  const [searchKey, setSearchKey] = useState("");
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="w-full h-full relative pr-[4rem]  pl-[2rem]  overflow-x-hidden">
      <SideMenu
        openState={isSideMenuOpen}
        setOpenState={setIsSideMenuOpen}
        id={"todo"}
      >
        {true ? (
          <CreateTodoForm
            afterSubmit={() => {
              setIsSideMenuOpen(false);
            }}
          />
        ) : (
          <UpdateNoteForm
            afterSubmit={() => {
              setSelectedNote(undefined);
              setIsSideMenuOpen(false);
            }}
            note={selectedNote}
          />
        )}
      </SideMenu>
    </div>
  );
}

export default Todo;
