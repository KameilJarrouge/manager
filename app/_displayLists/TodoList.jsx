import moment from "moment";
import React from "react";
import CalendarPreview from "../_components/CalendarPreview";
import { IoMdEyeOff } from "react-icons/io";
import TodoRow from "../_rows/TodoRow";

function TodoList({
  todo,
  onTodoSelect = (f) => f,
  selectedTodo,
  filterKey,
  sectionKey,
}) {
  const handleAccentDate = (date) => {
    if (moment(date).isBefore(selectedTodo?.date || new Date(), "day"))
      return false;
    if (selectedTodo?.repeatType === "Days") {
      const day = moment(date).format("ddd");
      return JSON.parse(selectedTodo?.repeat).includes(day);
    }
    if (selectedTodo?.repeatType === "Intervals") {
      const difference = moment(date)
        .startOf("day")
        .diff(
          moment(selectedTodo?.date || new Date()).startOf("day"),
          "days",
          false
        );
      return difference % Number(selectedTodo?.repeat) === 0;
    }
  };
  return (
    <div className="w-full h-full flex gap-2 px-2 ">
      <div
        className="w-[calc(100%-22rem)] 2xl:w-[calc(100%-25rem)] h-full flex flex-col justify-between border-collapse pr-2
      "
      >
        <div className="w-full flex flex-col gap-1  overflow-y-auto h-[60vh] 2xl:h-[75vh] ">
          <span className="font-semibold border-b border-b-foreground/50 w-full text-start my-2">
            Days Repeat
          </span>
          {(sectionKey === "All" || sectionKey === "Days") &&
            todo.Days.filter((todoItem) =>
              todoItem.title.includes(filterKey)
            ).map((todoItem) => (
              <TodoRow
                onTodoSelect={onTodoSelect}
                selectedTodo={selectedTodo}
                todoItem={todoItem}
                key={todoItem.id}
              />
            ))}

          <span className="font-semibold border-b border-b-foreground/50 w-full text-start my-2">
            Interval Repeat
          </span>

          {(sectionKey === "All" || sectionKey === "Intervals") &&
            todo.Intervals.filter((todoItem) =>
              todoItem.title.includes(filterKey)
            ).map((todoItem) => (
              <TodoRow
                onTodoSelect={onTodoSelect}
                selectedTodo={selectedTodo}
                todoItem={todoItem}
                key={todoItem.id}
              />
            ))}

          <span className="font-semibold border-b border-b-foreground/50 w-full text-start my-2">
            No Repeat Upcoming
          </span>
          {(sectionKey === "All" || sectionKey === "No Repeat Upcoming") &&
            todo.NonRepeatingUpcoming.filter((todoItem) =>
              todoItem.title.includes(filterKey)
            ).map((todoItem) => (
              <TodoRow
                onTodoSelect={onTodoSelect}
                selectedTodo={selectedTodo}
                todoItem={todoItem}
                key={todoItem.id}
              />
            ))}
          <span className="font-semibold border-b border-b-foreground/50 w-full text-start my-2">
            No Repeat Passed
          </span>
          {(sectionKey === "All" || sectionKey === "No Repeat Passed") &&
            todo.NonRepeatingPassed.filter((todoItem) =>
              todoItem.title.includes(filterKey)
            ).map((todoItem) => (
              <TodoRow
                onTodoSelect={onTodoSelect}
                selectedTodo={selectedTodo}
                todoItem={todoItem}
                key={todoItem.id}
                shouldDim
              />
            ))}
        </div>
      </div>
      <div className="w-[1px] h-full bg-input_bg " />
      <div className="w-[22rem] 2xl:w-[25rem]  flex flex-col items-center h-full">
        <div className="w-full h-fit flex flex-col gap-2 relative px-8 py-2 border border-input_bg rounded">
          {!selectedTodo?.shouldRepeat && (
            <div className="absolute top-0 left-0 w-full h-[20rem] bg-primary/90 z-10 flex justify-center items-center font-semibold">
              <IoMdEyeOff className="w-[3rem] h-fit text-foreground/60" />
            </div>
          )}
          <CalendarPreview
            accentFunc={handleAccentDate}
            initialDate={new Date()}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
