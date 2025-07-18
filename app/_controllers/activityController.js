import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function createActivity(data) {
  await prisma.activity.create({
    data: {
      name: data.name,
      unit: data.unit,
      caloriesBurnedPerUnit: data.caloriesBurnedPerUnit,
    },
  });
  return successReturn();
}

export async function updateActivity(data) {
  await prisma.activity.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      unit: data.unit,
      caloriesBurnedPerUnit: data.caloriesBurnedPerUnit,
    },
  });
  return successReturn();
}

export async function deleteActivity(id) {
  await prisma.activity.delete({
    where: { id: id },
  });
  return successReturn();
}

export async function listActivities() {
  const result = await prisma.activity.findMany();
  return successReturn(result);
}
