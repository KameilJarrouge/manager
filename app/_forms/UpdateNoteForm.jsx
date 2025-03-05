"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import getEditor from "../_lib/getEditor";
import TipTap from "../_components/Input/TipTap";
import { toast } from "react-toastify";
import { MdDelete, MdRestore } from "react-icons/md";

function UpdateNoteForm({ afterSubmit = (f) => f, note }) {
  const [title, setTitle] = useState(note?.title || "");
  const [isLoading, setIsLoading] = useState(false);
  const editor = getEditor(false, true);
  const handleUpdateNote = async () => {
    setIsLoading(true);
    let result = await api.put(`/notes/${note.id}/update`, {
      title,
      content: JSON.stringify(editor.getJSON()),
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Updated Note!");
      setTitle("");
      editor.commands.setContent("");
      afterSubmit();
    }
  };

  const restore = () => {
    setTitle(note.title);
    editor.commands.setContent(JSON.parse(note.content));
  };

  const handleDeleteNote = async () => {
    if (!confirm(`do you wish to delete this note?`)) return;
    setIsLoading(true);
    let result = await api.delete(`/notes/${note.id}/delete`);
    setIsLoading(false);
    if (result.data.success) {
      toast("Deleted Note!");
      setTitle("");
      editor.commands.setContent("");
      afterSubmit();
    }
  };
  useEffect(() => {
    if (!editor || !note) return;

    editor.commands.setContent(JSON.parse(note.content));
    setTitle(note.title);
  }, [note, editor]);

  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] relative flex items-center justify-center">
        Update Note
        <button
          onClick={handleDeleteNote}
          className="absolute top-0 bottom-0 right-2 my-auto  h-fit p-1 hover:bg-red-600 rounded transition-colors"
        >
          <MdDelete className="w-[1.2rem] h-fit" />
        </button>
      </span>
      <div className="flex gap-4  py-4 h-[80%]">
        <div className="flex flex-col gap-8 items-start">
          <div className="flex gap-4">
            <TextField
              state={title}
              setState={setTitle}
              placeholder={"Title"}
            />
            <button
              onClick={restore}
              className="p-1 hover:bg-accent rounded transition-colors"
            >
              <MdRestore className="w-[1.5rem] h-fit" />
            </button>
          </div>
          <div className="w-[50ch] 2xl:w-[60ch]  h-[45vh] 2xl:h-[55vh] overflow-y-auto">
            <TipTap editor={editor} />
          </div>
        </div>
      </div>
      <SubmitButton title="Update" onSubmit={handleUpdateNote} />
    </div>
  );
}

export default UpdateNoteForm;
