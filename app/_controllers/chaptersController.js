import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function createChapter(data) {
  await prisma.chapter.create({
    data: {
      title: data.title,
      order: data.order,
      bookId: data.bookId,
    },
  });
  return successReturn();
}

export async function updateChapter(data) {
  await prisma.chapter.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      order: data.order,
    },
  });
  return successReturn();
}

export async function deleteChapter(id) {
  await prisma.chapter.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}

export async function getLastOrder(bookId) {
  const result = await prisma.chapter.aggregate({
    _max: {
      order: true,
    },
    where: {
      bookId: bookId,
    },
  });
  return successReturn(result._max.order);
}
