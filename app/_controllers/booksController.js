import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function createBook(data) {
  await prisma.book.create({
    data: {
      title: data.title,
    },
  });
  return successReturn();
}

export async function updateBook(data) {
  await prisma.book.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
    },
  });
  return successReturn();
}

export async function deleteBook(id) {
  await prisma.book.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}

export async function getBooks() {
  const result = await prisma.book.findMany({
    include: {
      Chapters: {
        orderBy: {
          order: "asc",
        },
        include: {
          Sections: {
            select: {
              id: true,
              order: true,
              WPM: true,
              accuracy: true,
            },
            orderBy: {
              order: "asc",
            },
          },
          _count: {
            select: {
              Sections: {
                where: {
                  WPM: { not: null },
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          Chapters: {
            where: {
              Sections: {
                every: {
                  WPM: { not: null },
                },
              },
            },
          },
        },
      },
    },
  });

  return successReturn(result);
}
