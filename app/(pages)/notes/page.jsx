"use client";
import TextField from "@/app/_components/Input/TextField";
import LoadingComponent from "@/app/_components/LoadingComponent";
import SideMenu from "@/app/_components/SideMenu";
import NotesList from "@/app/_displayLists/NotesList";
import CreateNoteForm from "@/app/_forms/CreateNoteForm";
import UpdateNoteForm from "@/app/_forms/UpdateNoteForm";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdSearch } from "react-icons/md";

function Notes() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(undefined);
  const [searchKey, setSearchKey] = useState("");
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getNotes = async () => {
    setSelectedNote(undefined);

    setIsLoading(true);
    let result = await api.get("/notes");
    if (result.data.success) {
      setNotes(result.data.result);
    }
    setIsLoading(false);
  };

  const searchNotes = async () => {
    setSelectedNote(undefined);
    if (!searchKey) return;
    setIsLoading(true);
    let result = await api.get(`/notes/search?searchKey=${searchKey}`);
    setIsLoading(false);
    if (result.data.success) setNotes(result.data.result);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="w-full h-full relative pr-[4rem]  pl-[2rem]  overflow-x-hidden">
      {/* Main */}
      <div className="w-full  h-full  flex flex-col gap-4">
        {/* Header */}
        <div className="w-full  flex gap-2 pt-0.5 items-center">
          {/* Search */}
          <div className="flex gap-2 items-center h-fit">
            <TextField
              placeholder={"Search Key"}
              state={searchKey}
              setState={setSearchKey}
            />
            <button
              onClick={searchNotes}
              className="p-1 hover:bg-green-600 rounded transition-colors"
            >
              <MdSearch className="w-[1.5rem] h-fit" />
            </button>
            <button
              onClick={() => {
                setSearchKey("");
                getNotes();
              }}
              className="p-1 hover:bg-red-600  rounded transition-colors"
            >
              <GoPlus
                className="w-[1.5rem] h-fit rotate-45"
                strokeWidth={0.7}
              />
            </button>
          </div>
          <div className="w-[1px] h-full bg-input_bg" />
          {/* New Button */}
          <button
            onClick={() => {
              setSelectedNote(undefined);
              setIsSideMenuOpen(true);
            }}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <GoPlus className="w-[1.5rem] h-fit" strokeWidth={1} />
          </button>
        </div>

        {/* Content */}
        <div className=" w-full h-full relative">
          {isLoading && <LoadingComponent />}
          <NotesList
            notes={notes}
            selectedNote={selectedNote}
            onNoteSelect={(selectedNote, openMenu) => {
              setSelectedNote(selectedNote);
              if (openMenu) setIsSideMenuOpen(true);
            }}
          />
        </div>
      </div>
      <SideMenu
        openState={isSideMenuOpen}
        setOpenState={setIsSideMenuOpen}
        id={"notes"}
      >
        {!selectedNote ? (
          <CreateNoteForm
            afterSubmit={() => {
              setIsSideMenuOpen(false);
              getNotes();
            }}
          />
        ) : (
          <UpdateNoteForm
            afterSubmit={() => {
              setSelectedNote(undefined);
              setIsSideMenuOpen(false);
              getNotes();
            }}
            note={selectedNote}
          />
        )}
      </SideMenu>
    </div>
  );
}

export default Notes;
