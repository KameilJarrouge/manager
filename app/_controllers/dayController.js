import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";
import { getPersonalInformation } from "./personalInformationController";
import { DefaultPersonalInformation } from "../_constants/constants";
import { getDayBoundaries } from "../_lib/getDayBoundaries";
import moment from "moment";

export async function createDay(data) {
  const { returned } = await getPersonalInformation();

  await prisma.day.create({
    data: {
      date: data?.date || new Date(),
      weight: returned?.weight || DefaultPersonalInformation.weight,
      neck: returned?.neck || DefaultPersonalInformation.neck,
      waist: returned?.waist || DefaultPersonalInformation.waist,
      hip: returned?.hip || DefaultPersonalInformation.hip,
      sex: returned?.sex || DefaultPersonalInformation.sex,
    },
  });

  return successReturn();
}

export async function makeDayAlignedWithCurrentPI(data) {
  const { returned } = await getPersonalInformation();
  await prisma.day.update({
    where: {
      id: data.id,
    },
    data: {
      weight: returned?.weight || DefaultPersonalInformation.weight,
      neck: returned?.neck || DefaultPersonalInformation.neck,
      waist: returned?.waist || DefaultPersonalInformation.waist,
      hip: returned?.hip || DefaultPersonalInformation.hip,
      sex: returned?.sex || DefaultPersonalInformation.sex,
    },
  });
  return successReturn();
}

export async function updateDay(data) {
  await prisma.day.update({
    where: {
      id: data.id,
    },
    data: {
      date: data.date,
      weight: data.weight,
      neck: data.neck,
      waist: data.waist,
      hip: data.hip,
      sex: data.sex,
    },
  });
  return successReturn();
}

export async function deleteDay(id) {
  await prisma.day.delete({
    where: { id: id },
  });
  return successReturn();
}

export async function getTodayCalories() {
  const [start, end] = getDayBoundaries();

  async function getToday() {
    return await prisma.day.findFirst({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
      include: {
        burn: {
          include: {
            activity: true,
          },
        },
        intake: {
          include: {
            foodItem: true,
          },
        },
      },
    });
  }
  let result = await getToday();

  if (!result) {
    await createDay();
    result = await getToday();
  }

  return successReturn(result);
}

export async function addIntake(data) {
  await prisma.intake.createMany({
    data: data.intake.map((intakeItem) => ({
      dayId: data.id,
      foodItemId: intakeItem.foodItemId,
      factor: intakeItem.factor,
    })),
  });
  return successReturn();
}

export async function removeIntake(id) {
  await prisma.intake.delete({ where: { id } });
  return successReturn();
}

export async function addBurn(data) {
  await prisma.burn.createMany({
    data: data.burn.map((burnItem) => ({
      dayId: data.id,
      activityId: burnItem.activityId,
      factor: burnItem.factor,
    })),
  });
  return successReturn();
}

export async function removeBurn(id) {
  await prisma.burn.delete({ where: { id } });
  return successReturn();
}
