"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import { toast } from "react-toastify";
import NumberInput from "../_components/Input/NumberInput";

function CreateChapterForm({ afterSubmit = (f) => f, book }) {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateChapter = async () => {
    setIsLoading(true);
    let result = await api.post("/typing/chapters/create", {
      title,
      order,
      bookId: book.id,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("Created Chapter!");
      setTitle("");
      setOrder(1);
      afterSubmit();
    }
  };

  const getLastOrder = async () => {
    setIsLoading(true);
    const result = await api.get(`/typing/books/${book.id}/last-order`);
    setIsLoading(false);

    if (result.data.success) {
      setOrder((result.data.result || 0) + 1);
    }
  };

  useEffect(() => {
    getLastOrder();
  }, [book]);

  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] flex items-center justify-center">
        New Chapter
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
      <SubmitButton title="Create" onSubmit={handleCreateChapter} />
    </div>
  );
}

export default CreateChapterForm;
