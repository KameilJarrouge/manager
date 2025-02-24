import { changePassword } from "@/app/_controllers/usersController";
import {
  errorResponse,
  successLoginResponse,
} from "@/app/_lib/responseGenerator";

import { NextRequest } from "next/server";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();
  let result = await changePassword(body.oldPassword, body.newPassword);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successLoginResponse(result.returned);
}
