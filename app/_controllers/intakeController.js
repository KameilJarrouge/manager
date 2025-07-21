import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function getIntakeOptions() {
  const foodItems = await prisma.foodItem.findMany();
  const meals = await prisma.meal.findMany({
    include: {
      foodItems: {
        include: {
          foodItem: true,
        },
      },
    },
  });

  return successReturn({ foodItems, meals });
}
