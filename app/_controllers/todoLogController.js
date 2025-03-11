import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function createNote(data) {
  await prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
      additional: data.additional,
    },
  });
  return successReturn();
}

export async function updateNote(data) {
  await prisma.note.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      content: data.content,
      additional: data.additional,
    },
  });
  return successReturn();
}

export async function deleteNote(id) {
  await prisma.note.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}

export async function show(id) {
  const result = await prisma.note.findUnique({
    where: {
      id: id,
    },
  });
  return successReturn(result);
}

export async function searchNotes(searchKey) {
  const result = await prisma.note.findMany({
    where: {
      title: { contains: searchKey },
    },
  });

  return successReturn(result);
}

export async function getNotes() {
  const result = await prisma.note.findMany();
  return successReturn(result);
}
