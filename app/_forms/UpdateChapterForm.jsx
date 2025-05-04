"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import { toast } from "react-toastify";
import { MdDelete, MdRestore } from "react-icons/md";
import NumberInput from "../_components/Input/NumberInput";

function UpdateChapterForm({ afterSubmit = (f) => f, chapter }) {
  const [title, setTitle] = useState(chapter?.title || "");
  const [order, setOrder] = useState(chapter?.order || 1);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateChapter = async () => {
    if (!chapter) return;
    setIsLoading(true);
    let result = await api.put(`/typing/chapters/${chapter.id}/update`, {
      title: title,
      order: order,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Updated Chapter!");
      setTitle("");
      setOrder(1);
      afterSubmit();
    }
  };

  const restore = () => {
    setTitle(chapter.title);
    setOrder(chapter.order);
  };

  const handleDeleteChapter = async () => {
    if (!confirm(`do you wish to delete this Chapter?`)) return;
    setIsLoading(true);
    let result = await api.delete(`/typing/chapters/${chapter.id}/delete`);
    setIsLoading(false);
    if (result.data.success) {
      toast("Deleted Section!");
      setTitle("");
      afterSubmit();
    }
  };
  useEffect(() => {
    restore();
  }, [chapter]);

  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] relative flex items-center justify-center">
        Edit Chapter
        <button
          onClick={handleDeleteChapter}
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
          <div className="h-fit w-fit flex items-center">
            <span>Order:</span>
            <NumberInput value={order} setValue={setOrder} />
          </div>
        </div>
      </div>
      <SubmitButton title="Update" onSubmit={handleUpdateChapter} />
    </div>
  );
}

export default UpdateChapterForm;
