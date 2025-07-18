import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

export async function createPersonalInformation(data) {
  const result = await prisma.personalInformation.findFirst();
  if (result) return;
  await prisma.personalInformation.create({
    data: {
      yearOfBirth: data.yearOfBirth,
      height: data.height,
      weight: data.weight,
      neck: data.neck,
      waist: data.waist,
      sex: data.sex,
      hip: data.hip,
    },
  });
  return successReturn();
}

export async function updatePersonalInformation(data) {
  await prisma.personalInformation.update({
    where: {
      id: data.id,
    },
    data: {
      yearOfBirth: data.yearOfBirth,
      height: data.height,
      weight: data.weight,
      neck: data.neck,
      waist: data.waist,
      sex: data.sex,
      hip: data.hip,
    },
  });

  return successReturn();
}

export async function getPersonalInformation() {
  const result = await prisma.personalInformation.findFirst();
  return successReturn(result);
}
