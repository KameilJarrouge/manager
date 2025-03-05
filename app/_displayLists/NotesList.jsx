import React, { useEffect } from "react";
import { MdChevronRight } from "react-icons/md";
import getEditor from "../_lib/getEditor";
import TipTap from "../_components/Input/TipTap";

function NotesList({ notes, onNoteSelect = (f) => f, selectedNote }) {
  const editor = getEditor(false, false);
  useEffect(() => {
    if (!editor) return;
    if (!selectedNote) {
      editor.commands.setContent("");
      return;
    }
    editor.commands.setContent(JSON.parse(selectedNote.content));
  }, [selectedNote, editor]);

  return (
    <div className="w-full h-full flex gap-0.5 px-2 ">
      <div
        className="w-[calc(100%-60ch)] 2xl:w-[calc(100%-80ch)] h-full flex flex-col gap-2 border-collapse pr-2
      "
      >
        <div className="w-full flex flex-col gap-1  overflow-y-auto h-[60vh] 2xl:h-[75vh] ">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`flex w-full border-b border-input_bg items-center ${
                (selectedNote?.id || -1) === note.id && "bg-input_bg"
              }`}
            >
              <button
                onClick={() => onNoteSelect(note, false)}
                className="truncate text-wrap w-[95%] pl-1 text-start"
              >
                {note.title}
              </button>

              <div className="w-[5%] flex justify-end items-center ">
                <button
                  onClick={() => onNoteSelect(note, true)}
                  className="truncate text-wrap hover:text-green-400 flex justify-center "
                >
                  <MdChevronRight className="w-[1.5rem] h-fit" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[1px] h-full bg-input_bg " />
      <div className="w-[60ch] 2xl:w-[80ch] flex flex-col items-center h-full gap-4 pl-2 ">
        <span className="border-b border-input_bg w-full ">Note</span>
        <div className=" pb-1 w-full overflow-y-auto overflow-x-hidden h-[60vh] 2xl:h-[70vh]  relative flex flex-col gap-2  pr-2">
          <TipTap editor={editor} />
        </div>
      </div>
    </div>
  );
}

export default NotesList;
