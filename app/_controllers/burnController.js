import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function getBurnOptions() {
  const activities = await prisma.activity.findMany();

  return successReturn(activities);
}
