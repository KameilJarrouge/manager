import { login } from "../../../_controllers/usersController";
import {
  errorResponse,
  successLoginResponse,
} from "../../../_lib/responseGenerator";
import { NextRequest } from "next/server";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();
  let result = await login(body.password);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successLoginResponse(result.returned);
}
