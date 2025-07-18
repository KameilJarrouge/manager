import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function createMeal(data) {
  const meal = await prisma.meal.create({
    data: {
      name: data.name,
    },
  });
  const mealFoodItems = data.foodItems.map((foodItem) => ({
    foodItemId: foodItem.id,
    mealId: meal.id,
  }));

  await prisma.mealFoodItem.createMany({ data: mealFoodItems });

  return successReturn();
}

export async function updateMeal(data) {
  await prisma.$transaction([
    prisma.meal.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    }),
    prisma.mealFoodItem.createMany({
      data: data.newFoodItems.map((newFoodItem) => ({
        foodItemId: newFoodItem.id,
        mealId: data.id,
      })),
    }),
    prisma.mealFoodItem.deleteMany({
      where: {
        id: {
          in: data.deletedFoodItems.map(
            (deletedFoodItem) => deletedFoodItem.id
          ),
        },
      },
    }),
  ]);

  return successReturn();
}

export async function addFoodItem(data) {
  await prisma.mealFoodItem.create({
    data: { foodItemId: data.foodItem.id, mealId: id },
  });

  return successReturn();
}
export async function removeFoodItem(data) {
  await prisma.mealFoodItem.delete({ where: { id: data.mealFoodItemId } });

  return successReturn();
}

export async function deleteMeal(id) {
  await prisma.meal.delete({
    where: { id: id },
  });
  return successReturn();
}

export async function listMeals() {
  const result = await prisma.meal.findMany({
    include: {
      foodItems: {
        include: {
          foodItem: true,
        },
      },
    },
  });
  return successReturn(result);
}
