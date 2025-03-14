"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  MdChevronRight,
  MdOutlineBook,
  MdOutlineSave,
  MdRestore,
  MdSearch,
} from "react-icons/md";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import api from "@/app/_lib/api";
import LoadingComponent from "@/app/_components/LoadingComponent";
import getEditor from "@/app/_lib/getEditor";
import TipTap from "@/app/_components/Input/TipTap";
import { toast } from "react-toastify";
import { TbRowInsertBottom } from "react-icons/tb";

function Journal() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchKey, setSearchKey] = useState(moment(new Date()));
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [monthContainsNewEntry, setMonthContainsNewEntry] = useState(false);
  const editor = getEditor(true, true);

  const getEntries = async () => {
    setIsLoading(true);
    const result = await api.get(
      `/journal?startDate=${moment(searchKey).startOf(
        "month"
      )}&endDate=${moment(searchKey).endOf("month")}`
    );
    setIsLoading(false);
    if (result.data.success) setEntries(result.data.result);

    if (
      moment(new Date()).isSame(searchKey, "month") &&
      (result.data.result.length === 0 ||
        !moment(result.data.result[0].createdAt).isSame(searchKey, "day"))
    ) {
      setMonthContainsNewEntry(true);
    } else {
      setMonthContainsNewEntry(false);
    }
    setSelectedEntry(null);
  };

  const changeDate = (value, changeMonth = true) => {
    if (
      moment(new Date()).isSame(searchKey, changeMonth ? "month" : "year") &&
      value > 0
    )
      return;
    setSearchKey((searchKey) =>
      moment(searchKey).add(value, changeMonth ? "months" : "years")
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    let result;
    if (monthContainsNewEntry) {
      result = await api.post(`/journal/create`, {
        content: JSON.stringify(editor.getJSON()),
      });
    } else {
      result = await api.put(`/journal/${selectedEntry.id}/update`, {
        content: JSON.stringify(editor.getJSON()),
      });
    }
    if (result.data.success) {
      toast(`${monthContainsNewEntry ? "Created" : "Updated"} Entry!`);
      setSelectedEntry(null);
      getEntries();
    }
  };

  const restore = () => {
    if (!editor) return;
    if (selectedEntry)
      editor.commands.setContent(JSON.parse(selectedEntry.content));
  };

  useEffect(() => {
    getEntries();
  }, []);

  useEffect(() => {
    if (!editor) return;
    if (selectedEntry)
      editor.commands.setContent(JSON.parse(selectedEntry.content));
  }, [selectedEntry, editor]);

  return (
    <div className="flex  w-full h-full justify-between px-[2rem]  relative">
      {isLoading && <LoadingComponent />}

      <div className="w-fit h-full flex flex-col gap-4">
        {/* Header */}
        <div className="w-full  flex gap-2 pt-0.5 items-center">
          {/* Search */}
          <div className="flex gap-2 items-center h-fit ">
            <div className="w-fit py-0.5  font-semibold flex items-center gap-2">
              <button
                onClick={() => changeDate(-1, false)}
                className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
              >
                <FiChevronsLeft className="w-[1.2rem] h-fit" />
              </button>
              <span className="w-[4ch]">
                {moment(searchKey).format("YYYY")}
              </span>
              <button
                onClick={() => changeDate(1, false)}
                className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
              >
                <FiChevronsRight className="w-[1.2rem] h-fit" />
              </button>
              <button
                onClick={() => changeDate(-1, true)}
                className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
              >
                <FiChevronLeft className="w-[1.2rem] h-fit" />
              </button>
              <span className="w-[8ch] text-center">
                {moment(searchKey).format("MMMM")}
              </span>
              <button
                onClick={() => changeDate(1, true)}
                className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
              >
                <FiChevronRight className="w-[1.2rem] h-fit" />
              </button>
            </div>
            <button
              onClick={getEntries}
              className="p-1 hover:bg-green-600 rounded transition-colors"
            >
              <MdSearch className="w-[1.5rem] h-fit" />
            </button>
            <button
              onClick={() => {
                setSearchKey(new Date());
              }}
              className="p-1 hover:bg-blue-600  rounded transition-colors"
            >
              <MdRestore className="w-[1.5rem] h-fit" />
            </button>
          </div>
        </div>
        <div className=" w-fit h-full relative ">
          <div className="w-[40ch] 2xl:w-[50ch] h-[65vh] 2xl:h-[75vh] overflow-y-auto flex flex-col gap-1">
            {monthContainsNewEntry && (
              <div
                className={`flex w-fit  gap-5 items-center p-1 ${
                  selectedEntry &&
                  !selectedEntry.hasOwnProperty("id") &&
                  "bg-input_bg text-white"
                } `}
              >
                <MdOutlineBook className={`w-[1.2rem] h-fit text-blue-400`} />
                <button
                  onClick={() =>
                    setSelectedEntry({
                      createdAt: new Date(),
                      content: JSON.stringify(
                        `<< ${moment(new Date()).format("hh:mm a")} >> <p></p>`
                      ),
                    })
                  }
                  className={`flex items-center gap-3 `}
                >
                  <div>{moment(new Date()).format("YYYY/MM/DD")}</div>
                  <div className="w-[1px] h-[1rem] bg-foreground"></div>
                  <div className="w-[10ch] text-start">
                    {moment(new Date()).format("dddd")}
                  </div>
                  <MdChevronRight className="w-[1.5rem] h-fit" />
                </button>
              </div>
            )}

            {entries.map((entry, index) => (
              <div
                key={index}
                className={`flex w-fit  gap-5 items-center p-1 ${
                  (selectedEntry?.id || -1) === entry.id && "bg-input_bg"
                }`}
              >
                <MdOutlineBook className={`w-[1.2rem] h-fit text-foreground`} />
                <button
                  onClick={() => setSelectedEntry(entry)}
                  className={`flex items-center gap-3 `}
                >
                  <div>{moment(entry.createdAt).format("YYYY/MM/DD")}</div>
                  <div className="w-[1px] h-[1rem] bg-foreground"></div>
                  <div className="w-[10ch] text-start">
                    {moment(entry.createdAt).format("dddd")}
                  </div>
                  <MdChevronRight className="w-[1.5rem] h-fit" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="w-[70ch] 2xl:w-[85ch] h-full  bg-secondary  flex flex-col ">
        {selectedEntry ? (
          <>
            <div className="w-full flex justify-between items-center">
              <span className=" ml-8 mt-4 font-semibold">
                {moment(selectedEntry.createdAt).format("YYYY/MM/DD dddd")}
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() =>
                    editor.commands.insertContent(
                      `${!editor.isEmpty ? "\n" : ""}<< ${moment(
                        new Date()
                      ).format("hh:mm a")} >> <p></p>`
                    )
                  }
                  className="  mt-4 p-1 hover:bg-blue-600  rounded transition-colors"
                >
                  <TbRowInsertBottom className="w-[1.5rem] h-fit text-foreground" />
                </button>
                <button
                  onClick={restore}
                  className="  mt-4 p-1 hover:bg-blue-600  rounded transition-colors"
                >
                  <MdRestore className="w-[1.5rem] h-fit text-foreground" />
                </button>
                <button
                  onClick={handleSave}
                  className=" mr-8 mt-4 p-1 hover:bg-green-600  rounded transition-colors"
                >
                  <MdOutlineSave className="w-[1.5rem] h-fit text-foreground" />
                </button>
              </div>
            </div>
            <div className="h-[65vh] 2xl:h-[75vh] overflow-y-auto py-2 px-8 ">
              <TipTap
                editor={editor}
                // onContextMenu={(e) => {
                //   e.preventDefault();
                //   editor.commands.insertContent(
                //     `${!editor.isEmpty ? "\n" : ""}<< ${moment(
                //       new Date()
                //     ).format("hh:mm a")} >> <p></p>`
                //   );
                // }}
              />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            Select Entry to Open Editor
          </div>
        )}
      </div>
    </div>
  );
}

export default Journal;
