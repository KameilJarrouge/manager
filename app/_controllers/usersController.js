import { hashPass, isSamePass } from "../_lib/hashing";
import prisma from "../_lib/prisma";
import { issueToken } from "../_lib/tokenHandler";
import { successReturn, errorReturn } from "../_lib/controllerReturnGenerator";
import { errors } from "../_constants/constants";

export async function login(password) {
  let user = await prisma.user.findFirst({});
  if (user && isSamePass(password, user.password)) {
    return successReturn({
      token: await issueToken(user),
    });
  } else {
    return errorReturn(errors.incorrect_password);
  }
}

export async function createUser(password) {
  if (!(await userExist())) {
    return errorReturn(errors.user_already_exist);
  }
  let user = await prisma.user.create({
    data: {
      password: hashPass(password),
    },
  });

  return successReturn({
    token: await issueToken(user),
  });
}

export async function userExist() {
  let result = (await prisma.user.count()) > 0;
  return successReturn(result);
}

export async function changePassword(oldPassword, newPassword) {
  let user = await prisma.user.findFirst();

  if (!isSamePass(oldPassword, user.password))
    return errorReturn(errors.incorrect_old_password);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashPass(newPassword),
    },
  });

  return successReturn({
    token: await issueToken(user),
  });
}
