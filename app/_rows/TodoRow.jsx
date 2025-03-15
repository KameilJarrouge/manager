import React from "react";
import {
  MdChevronRight,
  MdDateRange,
  MdPause,
  MdPlayArrow,
  MdRepeat,
} from "react-icons/md";
import SelectedDays from "../_components/SelectedDays";
import moment from "moment";
import { GoPlus } from "react-icons/go";

function TodoRow({ todoItem, selectedTodo, onTodoSelect, shouldDim = false }) {
  return (
    <div
      className={`flex w-full pl-2  border-b border-input_bg items-center ${
        (selectedTodo?.id || -1) === todoItem.id && "bg-input_bg"
      }`}
    >
      <button
        onClick={() => onTodoSelect(todoItem, false)}
        className="w-[95%] flex items-center gap-2 "
      >
        {shouldDim ? (
          <GoPlus className="text-red-400 rotate-45" />
        ) : (
          <>
            {todoItem.isPaused ? (
              <MdPause className="text-yellow-400" />
            ) : (
              <MdPlayArrow className="text-green-400" />
            )}
          </>
        )}
        <span className="w-[42ch] 2xl:w-[60ch] truncate text-start ">
          {todoItem.title}
        </span>
        <div className="flex items-center gap-0.5">
          <MdDateRange className="text-foreground/80" />
          <span className="text-sm">
            {moment(todoItem.date).format("YYYY-MM-DD")}
          </span>
        </div>
        <MdRepeat
          className={`${
            todoItem.shouldRepeat ? "text-foreground" : "text-foreground/30"
          }`}
        />
        {todoItem.shouldRepeat && (
          <>
            {todoItem.repeatType === "Days" ? (
              <SelectedDays selectedDaysList={JSON.parse(todoItem.repeat)} />
            ) : (
              <div className="text-sm">
                {`Every ${todoItem.repeat} day${
                  todoItem.repeat > 1 ? "s" : ""
                }`}
              </div>
            )}
          </>
        )}
      </button>

      <div className="w-[5%] flex justify-end items-center ">
        <button
          onClick={() => onTodoSelect(todoItem, true)}
          className="truncate text-wrap hover:text-green-400 flex justify-center "
        >
          <MdChevronRight className="w-[1.5rem] h-fit" />
        </button>
      </div>
    </div>
  );
}

export default TodoRow;
