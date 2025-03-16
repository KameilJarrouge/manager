"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import moment from "moment";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import TextField from "../Input/TextField";
import api from "@/app/_lib/api";
import LoadingComponent from "../LoadingComponent";
import { MdCheck, MdDelete, MdRestore, MdSearch } from "react-icons/md";

function TodoLogModal({ isOpen, close, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));
  const [filterKey, setFilterKey] = useState("");
  const [todoLog, setTodoLog] = useState([]);

  const getTodoLog = async () => {
    setIsLoading(true);
    const result = await api.get(
      `/todoLog?startDate=${selectedDate.startOf(
        "month"
      )}&endDate=${selectedDate.endOf("month")}`
    );
    if (result.data.success) {
      setTodoLog(result.data.result);
      console.log(result.data.result);
    }
    setIsLoading(false);
  };

  const handleUpdate = async (id, completed) => {
    setIsLoading(true);
    let result = await api.put(`/todoLog/${id}/update`, {
      completed: completed,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Updated Log Entry!");
      getTodoLog();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`do you wish to delete this note?`)) return;
    setIsLoading(true);
    let result = await api.delete(`/todoLog/${note.id}/delete`);
    setIsLoading(false);
    if (result.data.success) {
      toast("Deleted Entry!");
      getTodoLog();
    }
  };

  useEffect(() => {
    if (isOpen)
      setTimeout(() => {
        getTodoLog();
      }, 200);
  }, [isOpen]);

  const changeDate = (value, changeMonth = true) => {
    if (
      moment(new Date()).isSame(selectedDate, changeMonth ? "month" : "year") &&
      value > 0
    )
      return;
    setSelectedDate((selectedDate) =>
      moment(selectedDate).add(value, changeMonth ? "months" : "years")
    );
  };

  return (
    <Modal
      key={"todo-log-modal-" + id}
      id={"todo-log-modal-" + id}
      isOpen={isOpen}
      close={() => {
        close();
      }}
      title={"Todo Log"}
      onEnter={(f) => f}
      className={"gap-4 relative"}
    >
      {isLoading && <LoadingComponent />}
      <div className="flex flex-col gap-4 w-[110ch] 2xl:w-[120ch]  h-[30rem] 2xl:h-[50rem]">
        {/* Year and Month Control */}
        <div className=" py-0.5   flex items-center gap-2 border-b border-b-input_bg w-full pb-1">
          <button
            onClick={() => changeDate(-1, false)}
            className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
          >
            <FiChevronsLeft className="w-[1.2rem] h-fit" />
          </button>
          <span className="w-[4ch]">{selectedDate.format("YYYY")}</span>
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
            {selectedDate.format("MMMM")}
          </span>
          <button
            onClick={() => changeDate(1, true)}
            className="p-1 hover:bg-foreground hover:text-secondary  rounded transition-colors"
          >
            <FiChevronRight className="w-[1.2rem] h-fit" />
          </button>

          <button
            onClick={getTodoLog}
            className="p-1 hover:bg-green-600 rounded transition-colors"
          >
            <MdSearch className="w-[1.5rem] h-fit" />
          </button>
          <button
            onClick={() => {
              setSelectedDate(moment(new Date()));
            }}
            className="p-1 hover:bg-blue-600  rounded transition-colors"
          >
            <MdRestore className="w-[1.5rem] h-fit" />
          </button>

          <div className="h-full w-[1px] bg-foreground/50" />
          <TextField
            placeholder={"Filter"}
            state={filterKey}
            setState={setFilterKey}
          />
        </div>
        {/* Logs */}
        <div className="w-full h-full overflow-y-auto flex flex-col  px-4">
          {/* Row */}
          {todoLog
            .filter((entry) => entry.title.includes(filterKey))
            .map((logEntry, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-b-input_bg text-foreground/80 hover:text-foreground hover:bg-foreground/10"
              >
                <div className="flex gap-2 items-center w-full h-full ">
                  <button
                    onClick={() =>
                      handleUpdate(logEntry.id, !logEntry.completed)
                    }
                    className="w-fit p-1 flex "
                  >
                    <MdCheck className="w-[1.2rem] h-fit text-green-400 " />
                    {/* <GoPlus className="w-[1.2rem] h-fit text-red-400 rotate-45" /> */}
                  </button>
                  <span className="text-sm">
                    {moment(logEntry.createdAt).format("DD ddd")}
                  </span>
                  <span className="text-sm">
                    {moment(logEntry.createdAt).format("hh:mm a")}
                  </span>
                  <div className="w-[1px] h-full bg-input_bg" />

                  <span className="w-[80ch] 2xl:w-[100ch] truncate">
                    {logEntry.title}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleDelete(logEntry.id)}
                    className="h-fit p-0.5 hover:text-red-400 rounded transition-colors"
                  >
                    <MdDelete className="w-[1.2rem] h-fit" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
}

export default TodoLogModal;
