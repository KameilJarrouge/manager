"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import TextField from "../_components/Input/TextField";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import { toast } from "react-toastify";
import NumberInput from "../_components/Input/NumberInput";
import { MdEdit } from "react-icons/md";

function CreateSectionForm({ afterSubmit = (f) => f, chapter }) {
  const [text, setText] = useState("");
  const [order, setOrder] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateChapter = async () => {
    setIsLoading(true);
    let result = await api.post("/typing/sections/create", {
      text,
      order,
      chapterId: chapter.id,
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("Created Section!");
      setText("");
      setOrder(1);
      afterSubmit();
    }
  };

  const getLastOrder = async () => {
    setIsLoading(true);
    const result = await api.get(`/typing/chapters/${chapter.id}/last-order`);
    setIsLoading(false);

    if (result.data.success) {
      setOrder((result.data.result || 0) + 1);
    }
  };

  useEffect(() => {
    getLastOrder();
  }, [chapter]);

  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] flex items-center justify-center">
        New Section
      </span>
      <div className="flex gap-4  py-4 h-[80%] ">
        <div className="flex flex-col gap-8 items-start">
          <div className="h-fit w-fit flex items-center">
            <span>Order:</span>
            <NumberInput value={order} setValue={setOrder} />
          </div>
          <div className="relative">
            <textarea
              className="outline-none bg-input_bg p-2"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              rows={10}
              cols={70}
            />
            <button
              onClick={() =>
                setText((text) =>
                  text
                    .replaceAll("\n", " ")
                    .replaceAll("’", "'")
                    .replaceAll("“", '"')
                    .replaceAll("”", '"')
                )
              }
              className="absolute -top-[1.5rem] right-0 "
            >
              <MdEdit />
            </button>
          </div>
        </div>
      </div>
      <SubmitButton title="Create" onSubmit={handleCreateChapter} />
    </div>
  );
}

export default CreateSectionForm;
