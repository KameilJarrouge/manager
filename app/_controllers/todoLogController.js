import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function createTodoLogEntry(data) {
  await prisma.todoLog.create({
    data: {
      title: data.title,
      completed: data.completed,
      todoId: data.todoId,
    },
  });
  return successReturn();
}

export async function updateTodoLogEntry(data) {
  await prisma.todoLog.update({
    where: {
      id: data.id,
    },
    data: {
      completed: data.completed,
    },
  });
  return successReturn();
}

export async function deleteTodoLogEntry(id) {
  await prisma.todoLog.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}

export async function getTodoLog(startDate, endDate) {
  const result = await prisma.todoLog.findMany({
    where: {
      createdAt: { gte: new Date(startDate), lte: new Date(endDate) },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return successReturn(result);
}
