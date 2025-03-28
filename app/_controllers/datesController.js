import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";
import moment from "moment";

export async function createDate(data) {
  await prisma.date.create({
    data: {
      title: data.title,
      month: data.month,
      day: data.day,
    },
  });
  return successReturn();
}

export async function updateDate(data) {
  await prisma.date.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      month: data.month,
      day: data.day,
    },
  });
  return successReturn();
}

export async function deleteDate(id) {
  await prisma.date.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}

export async function getDates() {
  const result = await prisma.date.findMany({ orderBy: { day: "asc" } });

  return successReturn(result);
}

export async function getLatestDates(month) {
  const result = await prisma.date.findMany({
    where: { month: month },
    orderBy: { day: "asc" },
  });
  return successReturn(result);
}
