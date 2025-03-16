"use client";
import TextField from "@/app/_components/Input/TextField";
import LoadingComponent from "@/app/_components/LoadingComponent";
import TodoLogModal from "@/app/_components/Modals/TodoLogModal";
import SideMenu from "@/app/_components/SideMenu";
import TodoList from "@/app/_displayLists/TodoList";
import CreateTodoForm from "@/app/_forms/CreateTodoForm";
import UpdateTodoForm from "@/app/_forms/UpdateTodoForm";
import api from "@/app/_lib/api";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { LuLogs } from "react-icons/lu";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";

function Todo() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(undefined);
  const [filterKey, setFilterKey] = useState("");
  const [sectionKey, setSectionKey] = useState("All");
  const [todo, setTodo] = useState({
    Days: [],
    Intervals: [],
    NonRepeatingPassed: [],
    NonRepeatingUpcoming: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTodoLogModalOpen, setIsTodoLogModalOpen] = useState(false);

  const preProcessTodo = (todo) => {
    return todo.reduce(
      (prev, curr) => {
        if (!curr.shouldRepeat) {
          if (
            moment(curr.date)
              .startOf("day")
              .isBefore(moment(new Date()).startOf("day"))
          ) {
            prev.NonRepeatingPassed.push(curr);
            return prev;
          }
          prev.NonRepeatingUpcoming.push(curr);
          return prev;
        }

        if (curr.repeatType === "Days") {
          prev.Days.push(curr);
          return prev;
        }
        prev.Intervals.push(curr);
        return prev;
      },
      {
        Days: [],
        Intervals: [],
        NonRepeatingPassed: [],
        NonRepeatingUpcoming: [],
      }
    );
  };

  const getTodo = async () => {
    setIsLoading(true);
    let result = await api.get("/todo");
    if (result.data.success) {
      setTodo(preProcessTodo(result.data.result));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="w-full h-full relative pr-[4rem]  pl-[2rem]  overflow-x-hidden">
      <TodoLogModal
        isOpen={isTodoLogModalOpen}
        close={() => setIsTodoLogModalOpen(false)}
        id={"todo-page"}
      />
      {/* Main */}
      <div className="w-full  h-full  flex flex-col gap-4">
        {/* Header */}
        <div className="w-full  flex gap-2 pt-0.5 items-center">
          {/* Search */}
          <div className="flex gap-2 items-center h-fit">
            <TextField
              placeholder={"Filter"}
              state={filterKey}
              setState={setFilterKey}
            />
            <button
              onClick={() => {
                setSectionKey("Days");
              }}
              className={`p-1 hover:bg-foreground/10 text-foreground ${
                sectionKey === "Days" && "bg-foreground/10"
              } rounded transition-colors flex gap-1`}
            >
              <TbRepeat className="w-[1.5rem] h-fit" />
              <span className="">D</span>
            </button>
            <button
              onClick={() => {
                setSectionKey("Intervals");
              }}
              className={`p-1 hover:bg-foreground/10 text-foreground ${
                sectionKey === "Intervals" && "bg-foreground/10"
              } rounded transition-colors flex gap-1`}
            >
              <TbRepeat className="w-[1.5rem] h-fit" />
              <span className="">I</span>
            </button>
            <button
              onClick={() => {
                setSectionKey("No Repeat Upcoming");
              }}
              className={`p-1 hover:bg-foreground/10 text-foreground ${
                sectionKey === "No Repeat Upcoming" && "bg-foreground/10"
              } rounded transition-colors flex gap-1`}
            >
              <TbRepeatOff className="w-[1.5rem] h-fit" />
              <span className="">NRU</span>
            </button>
            <button
              onClick={() => {
                setSectionKey("No Repeat Passed");
              }}
              className={`p-1 hover:bg-foreground/10 text-foreground ${
                sectionKey === "No Repeat Passed" && "bg-foreground/10"
              } rounded transition-colors flex gap-1`}
            >
              <TbRepeatOff className="w-[1.5rem] h-fit" />
              <span className="">NRP</span>
            </button>

            <button
              onClick={() => {
                setFilterKey("");
                setSectionKey("All");
              }}
              className="p-1 hover:bg-red-600  rounded transition-colors"
            >
              <GoPlus
                className="w-[1.5rem] h-fit rotate-45"
                strokeWidth={0.7}
              />
            </button>
          </div>
          <div className="w-[1px] h-full bg-input_bg" />
          <button
            onClick={() => {
              setIsTodoLogModalOpen(true);
            }}
            className="p-1 hover:bg-blue-600 text-foreground  rounded transition-colors"
          >
            <LuLogs className="w-[1.5rem] h-fit " />
          </button>
          <button
            onClick={() => {
              setSelectedTodo(undefined);
              setIsSideMenuOpen(true);
            }}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <GoPlus className="w-[1.5rem] h-fit" strokeWidth={1} />
          </button>
        </div>

        {/* Content */}
        <div className=" w-full h-full relative">
          {isLoading && <LoadingComponent />}
          <TodoList
            todo={todo}
            sectionKey={sectionKey}
            filterKey={filterKey}
            selectedTodo={selectedTodo}
            onTodoSelect={(selectedTodo, openMenu) => {
              setSelectedTodo(selectedTodo);
              if (openMenu) setIsSideMenuOpen(true);
            }}
          />
        </div>
      </div>
      <SideMenu
        openState={isSideMenuOpen}
        setOpenState={setIsSideMenuOpen}
        id={"todo"}
      >
        {!selectedTodo ? (
          <CreateTodoForm
            afterSubmit={() => {
              setIsSideMenuOpen(false);
              getTodo();
            }}
          />
        ) : (
          <UpdateTodoForm
            afterSubmit={() => {
              setSelectedTodo(undefined);
              setIsSideMenuOpen(false);
              getTodo();
            }}
            todo={selectedTodo}
          />
        )}
      </SideMenu>
    </div>
  );
}

export default Todo;
