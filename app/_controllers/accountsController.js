import prisma from "../_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

/**
 *
 * @param {{owner:string?, email:string?, username:string?, password:string?, provider:string?, additional:string?, createdAt:Date}} data
 */
export async function createAccount(data) {
  await prisma.account.create({
    data: {
      owner: data.owner,
      email: data.email,
      username: data.username,
      password: data.password,
      provider: data.provider,
      additional: data.additional,
      createdAt: data.createdAt || undefined,
    },
  });
  return successReturn();
}

/**
 *
 * @param {{id:Number, owner:string?, email:string?, username:string?, password:string?, provider:string?, additional:string?, createdAt:Date}} data
 */
export async function updateAccount(data) {
  await prisma.account.update({
    where: {
      id: data.id,
    },
    data: {
      owner: data.owner,
      email: data.email,
      username: data.username,
      password: data.password,
      provider: data.provider,
      additional: data.additional,
      createdAt: data.createdAt,
    },
  });
  return successReturn();
}

/**
 *
 * @param {number} id
 */
export async function deleteAccount(id) {
  await prisma.account.delete({
    where: {
      id,
    },
  });
  return successReturn();
}

/**
 *
 * @param {number} id
 */
export async function show(id) {
  const result = await prisma.account.findUnique({
    where: {
      id,
    },
  });
  return successReturn(result);
}

/**
 *
 * @param {String} searchKey
 */
export async function searchAccounts(searchKey) {
  const result = await prisma.account.findMany({
    where: {
      OR: [
        { owner: { contains: searchKey } },
        { email: { contains: searchKey } },
        { username: { contains: searchKey } },
        { provider: { contains: searchKey } },
        { additional: { contains: searchKey } },
      ],
    },
    // select: {
    //   id: true,
    //   email: true,
    //   provider: true,
    //   username: true,
    //   owner: true,
    // },
  });
  return successReturn(result);
}

/**
 *
 */
export async function getAccounts() {
  const result = await prisma.account.findMany();
  return successReturn(result);
}
