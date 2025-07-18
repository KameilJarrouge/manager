import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function createFoodItem(data) {
  await prisma.foodItem.create({
    data: {
      name: data.name,
      portions: data.portions,
      calories: data.calories,
    },
  });
  return successReturn();
}

export async function updateFoodItem(data) {
  await prisma.foodItem.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      portions: data.portions,
      calories: data.calories,
    },
  });
  return successReturn();
}

export async function deleteFoodItem(id) {
  await prisma.foodItem.delete({
    where: { id: id },
  });
  return successReturn();
}

export async function listFoodItems() {
  const result = await prisma.foodItem.findMany();
  return successReturn(result);
}

export async function listFoodItemsNames() {
  const result = await prisma.foodItem.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return successReturn(result);
}
