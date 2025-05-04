"use client";
import React, { useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import { toast } from "react-toastify";

function CreateBookForm({ afterSubmit = (f) => f }) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateBook = async () => {
    setIsLoading(true);
    let result = await api.post("/typing/books/create", {
      title,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("Created Book!");
      setTitle("");
      afterSubmit();
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] flex items-center justify-center">
        New Book
      </span>
      <div className="flex gap-4  py-4 h-[80%]">
        <div className="flex flex-col gap-8 items-start">
          <TextField
            state={title}
            setState={setTitle}
            placeholder={"Title"}
            className={"w-[40ch]"}
          />
        </div>
      </div>
      <SubmitButton title="Create" onSubmit={handleCreateBook} />
    </div>
  );
}

export default CreateBookForm;
