import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";
import { getDayBoundaries } from "../_lib/getDayBoundaries";
import moment from "moment";

export async function createTodo(data) {
  await prisma.todo.create({
    data: {
      title: data.title,
      shouldRepeat: data.shouldRepeat,
      repeatType: data.repeatType,
      repeat: data.repeat,
      isPaused: data.isPaused,
      icon: data.icon,
      date: data.date,
    },
  });

  return successReturn();
}

export async function updateTodo(id, data) {
  await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      title: data.title,
      shouldRepeat: data.shouldRepeat,
      repeatType: data.repeatType,
      repeat: data.repeat,
      isPaused: data.isPaused,
      icon: data.icon,
      date: data.date,
    },
  });
  return successReturn();
}

export async function deleteTodo(id) {
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}

export async function todayTodoList() {
  const [startOfDay, endOfDay] = getDayBoundaries();
  const result = await prisma.todo.findMany({
    where: {
      AND: [
        { isPaused: false },
        {
          OR: [
            { shouldRepeat: true }, // get all repeated todo
            {
              // only today's non repeated todo
              AND: [{ date: { gte: startOfDay, lte: endOfDay } }],
            },
          ],
        },
      ],
    },
    include: {
      todoLog: {
        where: {
          createdAt: { gte: startOfDay, lte: endOfDay },
        },
      },
    },
  });
  return successReturn(preProcessTodo(result));
}

function preProcessTodo(todo) {
  const result = todo.reduce(
    (currentValue, todoItem) => {
      let include = true;
      if (todoItem.shouldRepeat) {
        // Check the repeating todo if they should appear today
        // parse the repeat (days: [Wednesday, Friday, ...] or intervals: 4)
        const repeat = JSON.parse(todoItem.repeat);

        if (todoItem.repeatType === "Days") {
          // check if today is in this repeating days
          const day = moment(new Date()).format("dddd");
          if (!repeat.includes(day)) include = false;
        } else {
          // check if today happens to be an interval of this repeat cycle
          const difference = moment(new Date())
            .startOf("day")
            .diff(moment(todoItem.date).startOf("day"), "days", false);
          if (difference % Number(repeat) !== 0) {
            include = false;
          }
        }
      }

      // sort the todo in [pending, completed and notCompleted]
      if (include) {
        if (todoItem.todoLog.length === 0) {
          currentValue.pending.push(todoItem);
          return currentValue;
        }
        if (todoItem.todoLog[0].completed) {
          currentValue.completed.push(todoItem);
          return currentValue;
        }
        currentValue.notCompleted.push(todoItem);
        return currentValue;
      }
      return currentValue;
    },
    {
      pending: [],
      completed: [],
      notCompleted: [],
    }
  );
  return result;
}

export async function getTodo(id) {
  const result = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });
  return successReturn(result);
}

export async function allTodo() {
  const result = await prisma.todo.findMany();
  return successReturn(result);
}
