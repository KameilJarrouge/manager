"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import { toast } from "react-toastify";
import { MdDelete, MdRestore } from "react-icons/md";

function UpdateBookForm({ afterSubmit = (f) => f, afterDelete, book }) {
  const [title, setTitle] = useState(book.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateBook = async () => {
    setIsLoading(true);
    let result = await api.put(`/typing/books/${book.id}/update`, {
      title: title,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Updated Book!");
      setTitle("");
      afterSubmit();
    }
  };

  const restore = () => {
    setTitle(book.title);
  };

  const handleDeleteBook = async () => {
    if (!confirm(`do you wish to delete this book?`)) return;
    setIsLoading(true);
    let result = await api.delete(`/typing/books/${book.id}/delete`);
    setIsLoading(false);
    if (result.data.success) {
      toast("Deleted Book!");
      setTitle("");
      afterSubmit();
    }
  };
  useEffect(() => {
    restore();
  }, [book]);

  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] relative flex items-center justify-center">
        Edit Book
        <button
          onClick={handleDeleteBook}
          className="absolute top-0 bottom-0 right-2 my-auto  h-fit p-1 hover:bg-red-600 rounded transition-colors"
        >
          <MdDelete className="w-[1.2rem] h-fit" />
        </button>
        <button
          onClick={restore}
          className="absolute top-0 bottom-0 left-2 my-auto  h-fit p-1 hover:bg-accent rounded transition-colors"
        >
          <MdRestore className="w-[1.5rem] h-fit" />
        </button>
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
      <SubmitButton title="Update" onSubmit={handleUpdateBook} />
    </div>
  );
}

export default UpdateBookForm;
