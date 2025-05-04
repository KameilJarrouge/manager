import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function createSection(data) {
  await prisma.section.create({
    data: {
      order: data.order,
      chapterId: data.chapterId,
      text: data.text,
    },
  });
  return successReturn();
}

export async function updateSection(data) {
  await prisma.section.update({
    where: {
      id: data.id,
    },
    data: {
      order: data.order,
      text: data.text,
    },
  });
  return successReturn();
}

export async function updateSectionStats(data) {
  await prisma.section.update({
    where: {
      id: data.id,
    },
    data: {
      WPM: data.WPM,
      accuracy: data.accuracy,
    },
  });
  return successReturn();
}

export async function deleteSection(id) {
  await prisma.section.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}

export async function getLastOrder(chapterId) {
  const result = await prisma.section.aggregate({
    _max: {
      order: true,
    },
    where: {
      chapterId: chapterId,
    },
  });
  return successReturn(result._max.order);
}

export async function getSection(id) {
  const result = await prisma.section.findUnique({
    where: { id: id },
    select: { text: true },
  });
  return successReturn(result);
}
