import { userExist } from "../../../_controllers/usersController";
import {
  errorResponse,
  successResponse,
} from "../../../_lib/responseGenerator";
import { NextRequest } from "next/server";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await userExist();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
