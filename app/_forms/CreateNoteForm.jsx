"use client";
import React, { useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import getEditor from "../_lib/getEditor";
import TipTap from "../_components/Input/TipTap";
import { toast } from "react-toastify";

function CreateNoteForm({ afterSubmit = (f) => f }) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const editor = getEditor(false, true);
  const handleCreateAccount = async () => {
    setIsLoading(true);
    let result = await api.post("/notes/create", {
      title,
      content: JSON.stringify(editor.getJSON()),
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("Created Note!");
      setTitle("");
      editor.commands.setContent("");
      afterSubmit();
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] flex items-center justify-center">
        New Note
      </span>
      <div className="flex gap-4  py-4 h-[80%]">
        <div className="flex flex-col gap-8 items-start">
          <TextField state={title} setState={setTitle} placeholder={"Title"} />
          <div className="w-[50ch] 2xl:w-[60ch]  h-[45vh] 2xl:h-[55vh] overflow-y-auto">
            <TipTap editor={editor} />
          </div>
        </div>
      </div>
      <SubmitButton title="Create" onSubmit={handleCreateAccount} />
    </div>
  );
}

export default CreateNoteForm;
