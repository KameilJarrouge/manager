import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";
import moment from "moment/moment";

export async function createJournal(data) {
  await prisma.journal.create({
    data: {
      content: data.content,
      createdAt: data.createdAt,
    },
  });
  return successReturn();
}

export async function updateJournal(data) {
  await prisma.journal.update({
    where: {
      id: data.id,
    },
    data: {
      content: data.content,
    },
  });
  return successReturn();
}

export async function deleteJournal(id) {
  await prisma.journal.delete({
    where: { id: id },
  });
  return successReturn();
}

export async function browseJournal(startDate, endDate) {
  const result = await prisma.journal.findMany({
    where: {
      createdAt: { gte: new Date(startDate), lte: new Date(endDate) },
    },
    take: 30,
    orderBy: {
      createdAt: "desc",
    },
  });
  return successReturn(result);
}

export async function show(id) {
  const result = await prisma.journal.findUnique({
    where: {
      id: id,
    },
  });
  return successReturn(result);
}

export async function todayStatus() {
  const result = await prisma.journal.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  let status = false;
  if (result) {
    status = moment(result.createdAt).isSame(new Date(), "day");
  }
  return successReturn(status);
}
