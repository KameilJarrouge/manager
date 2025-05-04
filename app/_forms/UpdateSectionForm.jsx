"use client";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../_components/LoadingComponent";
import SubmitButton from "../_components/Input/SubmitButton";
import api from "../_lib/api";
import { toast } from "react-toastify";
import { MdDelete, MdEdit, MdRestore } from "react-icons/md";
import NumberInput from "../_components/Input/NumberInput";

function UpdateSectionForm({ afterSubmit = (f) => f, section }) {
  const [text, setText] = useState("");
  const [order, setOrder] = useState(section?.order || 1);
  const [isLoading, setIsLoading] = useState(false);

  const getSectionText = async () => {
    if (!section) return;
    setIsLoading(true);
    const result = await api.get(`/typing/sections/${section.id}`);
    setIsLoading(false);
    if (result.data.success) {
      setText(result.data.result.text);
    }
  };

  const handleUpdateSection = async () => {
    setIsLoading(true);
    let result = await api.put(`/typing/sections/${section.id}/update`, {
      text,
      order,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Updated Section!");
      setText("");
      setOrder(1);
      afterSubmit();
    }
  };

  const restore = () => {
    getSectionText();
    setOrder(section?.order || 1);
  };

  const handleDeleteSection = async () => {
    if (!confirm(`do you wish to delete this Section?`)) return;
    setIsLoading(true);
    let result = await api.delete(`/typing/sections/${section.id}/delete`);
    setIsLoading(false);
    if (result.data.success) {
      toast("Deleted Section!");
      setText("");
      afterSubmit();
    }
  };
  useEffect(() => {
    restore();
  }, [section]);

  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%] relative flex items-center justify-center">
        Edit Section
        <button
          onClick={handleDeleteSection}
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
      <SubmitButton title="Update" onSubmit={handleUpdateSection} />
    </div>
  );
}

export default UpdateSectionForm;
