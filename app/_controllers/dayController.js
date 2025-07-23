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

export async function getDayCalories(day = new Date()) {
  const [start, end] = getDayBoundaries(day);

  async function getDay() {
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
  let result = await getDay();

  if (!result) {
    await createDay({ date: day });
    result = await getDay();
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

export async function daysList(date) {
  const days = await prisma.day.findMany({
    where: {
      date: {
        gte: moment(date).startOf("month").toDate(),
        lte: moment(date).endOf("month").toDate(),
      },
    },
  });

  const total_intakes = await prisma.$queryRaw`
    SELECT
      d.id,
      CAST(SUM(i.factor * fi.calories) AS INT) AS total_intake
    FROM Day as d
    LEFT JOIN Intake as i ON i.dayId = d.id
    LEFT JOIN FoodItem as fi ON fi.id = i.foodItemId
    WHERE d.date BETWEEN ${moment(date).startOf("month").toDate()} AND ${moment(
    date
  )
    .endOf("month")
    .toDate()}
    GROUP BY d.id, d.date
    ORDER BY d.date ASC;
  `;

  const total_burns = await prisma.$queryRaw`
    SELECT
      d.id,
      CAST(SUM(b.factor * a.caloriesBurnedPerUnit) AS INT) AS total_burn
    FROM Day as d
    LEFT JOIN Burn as b ON b.dayId = d.id
    LEFT JOIN Activity as a ON a.id = b.activityId
    WHERE d.date BETWEEN ${moment(date).startOf("month").toDate()} AND ${moment(
    date
  )
    .endOf("month")
    .toDate()}
    GROUP BY d.id, d.date
    ORDER BY d.date ASC;
  `;

  return successReturn({ days, total_intakes, total_burns });
}
