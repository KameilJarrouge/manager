"use client";
import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { LuFeather, LuLogs } from "react-icons/lu";
import { MdCheck, MdRestore, MdWaves } from "react-icons/md";
import { GoDotFill, GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import DateField from "../_components/Input/DateField";
import LoadingComponent from "../_components/LoadingComponent";
import SubmitButton from "../_components/Input/SubmitButton";
import TodoLogModal from "../_components/Modals/TodoLogModal";
import TextField from "../_components/Input/TextField";
import api from "../_lib/api";

function TodoHomeSection() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [todoViewingDate, setTodoViewingDate] = useState(moment(new Date()));
  const [isFlexible, setIsFlexible] = useState(false);
  const [isTodoLogModalOpen, setIsTodoLogModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState({ todo: [], completed: [], failed: [] });

  const getTodo = async () => {
    setIsLoading(true);

    const result = await api.get(
      `/todo/today?startOfDay=${todoViewingDate
        .startOf("day")
        .format("YYYY-MM-DD hh:mm:ss a")}&endOfDay=${todoViewingDate
        .endOf("day")
        .format("YYYY-MM-DD hh:mm:ss a")}`
    );
    setIsLoading(false);

    if (result.data.success) {
      setTodo(result.data.result);
    }
  };

  const handleCreateSimpleTodo = async () => {
    if (newTodoTitle === "") {
      toast.warn("Title Missing!");
      return;
    }
    setIsLoading(true);

    const result = await api.post("/todo/create", {
      title: newTodoTitle,
      shouldRepeat: false,
      repeatType: undefined,
      repeat: undefined,
      date: new Date(),
      isPaused: false,
      isFlexible: isFlexible,
    });
    setIsLoading(false);

    if (result.data.success) {
      toast("Created Todo!");
      setNewTodoTitle("");
      setIsFlexible(false);
      getTodo();
    }
  };

  const handleCreateTodoLog = async (
    isCompleted,
    todoId,
    title,
    isFlexible
  ) => {
    const shouldDelete = isFlexible
      ? confirm(`Do you wish to delete this flexible todo?`)
      : false;

    setIsLoading(true);
    const result = await api.post("/todo-log/create", {
      completed: isCompleted,
      todoId: todoId,
      title: title,
    });

    if (shouldDelete) await api.delete(`/todo/${todoId}/delete`);

    if (result.data.success) {
      toast(`${isCompleted ? "Completed " : "Failed"} Task`);
      getTodo();
    }
  };

  const handleRestoreTodo = async (entryId) => {
    setIsLoading(true);
    const result = await api.delete(`/todo-log/${entryId}/delete`);
    setIsLoading(false);
    if (result.data.success) {
      toast("Restored Task");
      getTodo();
    }
  };

  const handleChangeCompleteStatus = async (
    entryId,
    isCompleted,
    isFlexible,
    todoId
  ) => {
    const shouldDelete = isFlexible
      ? confirm(`Do you wish to delete this flexible todo?`)
      : false;
    setIsLoading(true);
    const result = await api.put(`/todo-log/${entryId}/update`, {
      completed: isCompleted,
    });
    if (shouldDelete) await api.delete(`/todo/${todoId}/delete`);

    setIsLoading(false);
    if (result.data.success) {
      getTodo();
    }
  };

  useEffect(() => {
    getTodo();
  }, [todoViewingDate]);

  return (
    <div className="relative w-[65ch] 2xl:w-[80ch] ">
      <TodoLogModal
        isOpen={isTodoLogModalOpen}
        close={() => {
          setIsTodoLogModalOpen(false);
          getTodo();
        }}
        id={"home-page"}
      />
      {isLoading && <LoadingComponent />}
      <div className="flex flex-col gap-4 ">
        {/* New Todo */}
        <div className="flex gap-4 items-center">
          <TextField
            state={newTodoTitle}
            setState={setNewTodoTitle}
            placeholder={"New Todo"}
            className={"w-[47ch] 2xl:w-[50ch]"}
          />
          <button
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Flexible TODO"
            data-tooltip-place="bottom"
            onClick={() => setIsFlexible((isFlexible) => !isFlexible)}
            className={`w-fit p-1 hover:bg-foreground/10 ${
              isFlexible ? "text-accent" : "text-foreground/80"
            }  rounded flex items-center gap-0.5`}
          >
            <MdWaves className="w-[1.5rem] h-fit" />
          </button>
          <SubmitButton title="Create" onSubmit={handleCreateSimpleTodo} />
        </div>
        {/* Log and Day View Control */}
        <div className="flex gap-2 items-center">
          <DateField
            state={todoViewingDate}
            setState={(date) => setTodoViewingDate(moment(date))}
            placeholder="Viewing Day"
            position="bottom"
          />
          <div className="w-[1px] h-full bg-input_bg" />
          <button
            onClick={() => setTodoViewingDate(moment())}
            className="p-1 hover:bg-blue-600 rounded transition-colors"
          >
            <MdRestore className="w-[1.5rem] h-fit" />
          </button>
          <button
            onClick={() => {
              setIsTodoLogModalOpen(true);
            }}
            className="p-1 hover:bg-blue-600 text-foreground  rounded transition-colors"
          >
            <LuLogs className="w-[1.5rem] h-fit " />
          </button>
        </div>
        {/* List of Todos */}
        <div className="flex flex-col gap- h-[60vh] 2xl:h-[73vh] overflow-y-auto">
          <div className="border-b border-b-foreground/50 w-full my-2 flex gap-2 items-center">
            <MdCheck className="w-[1.2rem] h-fit " />
            <span className="font-semibold text-start">Todo</span>
          </div>
          <div className="pl-2">
            {/* TODO Section */}
            {todo.todo.map((todoItem, index, arr) => (
              <div
                key={todoItem.id}
                className={`w-fit flex items-center justify-between gap-2 hover:bg-foreground/10 px-2 border-b border-b-input_bg `}
              >
                {todoItem.isFlexible ? (
                  <LuFeather className="w-[0.6rem] h-fit " />
                ) : (
                  <GoDotFill className="w-[0.6rem] h-fit " />
                )}

                <span className="w-[55ch] 2xl:w-[70ch] text-start">
                  {todoItem.title}
                </span>
                {todoViewingDate.isSame(moment(), "day") && (
                  <>
                    <button
                      className="hover:text-green-400"
                      onClick={() =>
                        handleCreateTodoLog(
                          true,
                          todoItem.id,
                          todoItem.title,
                          todoItem.isFlexible
                        )
                      }
                    >
                      <MdCheck className="w-[1.2rem] h-fit  " />
                    </button>
                    <button
                      className="hover:text-red-400 rotate-45"
                      onClick={() =>
                        handleCreateTodoLog(
                          false,
                          todoItem.id,
                          todoItem.title,
                          todoItem.isFlexible
                        )
                      }
                    >
                      <GoPlus className="w-[1.2rem] h-fit  " />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="border-b border-b-foreground/50 w-full my-2 flex gap-2 items-center">
            <MdCheck className="w-[1.2rem] h-fit text-green-400" />
            <span className="font-semibold text-start">Completed</span>
          </div>
          <div className="pl-2">
            {/* COMPLETED Section */}
            {todo.completed.map((todoItem) => (
              <div
                key={todoItem.id}
                className="w-fit flex items-center justify-between gap-2 hover:bg-foreground/10 px-2 group border-b border-b-input_bg "
              >
                {todoItem.isFlexible ? (
                  <LuFeather className="w-[0.6rem] h-fit text-green-400" />
                ) : (
                  <GoDotFill className="w-[0.6rem] h-fit text-green-400" />
                )}

                <span className="w-[55ch] 2xl:w-[70ch] text-start">
                  {todoItem.title}
                </span>
                {todoViewingDate.isSame(moment(), "day") && (
                  <>
                    <button
                      onClick={() => handleRestoreTodo(todoItem.TodoLog[0].id)}
                    >
                      <MdRestore className="group-hover:visible invisible w-[1.2rem] h-fit  hover:text-blue-400" />
                    </button>
                    <button
                      onClick={() =>
                        handleChangeCompleteStatus(
                          todoItem.TodoLog[0].id,
                          false,
                          todoItem.isFlexible,
                          todoItem.id
                        )
                      }
                    >
                      <GoPlus className="group-hover:visible invisible w-[1.2rem] h-fit  hover:text-red-400 rotate-45" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="border-b border-b-foreground/50 w-full my-2 flex gap-2 items-center">
            <GoPlus className="w-[1.2rem] h-fit text-red-400 rotate-45" />
            <span className="font-semibold text-start">Failed</span>
          </div>
          <div className="pl-2">
            {/* FAILED Section */}

            {todo.failed.map((todoItem) => (
              <div
                key={todoItem.id}
                className="w-fit flex items-center justify-between gap-2 hover:bg-foreground/10 px-2 group border-b border-b-input_bg "
              >
                {todoItem.isFlexible ? (
                  <LuFeather className="w-[0.6rem] h-fit text-red-400" />
                ) : (
                  <GoDotFill className="w-[0.6rem] h-fit text-red-400" />
                )}
                <span className="w-[55ch] 2xl:w-[70ch] text-start">
                  {todoItem.title}
                </span>
                {todoViewingDate.isSame(moment(), "day") && (
                  <>
                    <button
                      onClick={() => handleRestoreTodo(todoItem.TodoLog[0].id)}
                    >
                      <MdRestore className="group-hover:visible invisible w-[1.2rem] h-fit  hover:text-blue-400" />
                    </button>
                    <button
                      onClick={() =>
                        handleChangeCompleteStatus(
                          todoItem.TodoLog[0].id,
                          true,
                          todoItem.isFlexible,
                          todoItem.id
                        )
                      }
                    >
                      <MdCheck className="group-hover:visible invisible w-[1.2rem] h-fit  hover:text-green-400" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoHomeSection;
