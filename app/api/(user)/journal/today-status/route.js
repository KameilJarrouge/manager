import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../_lib/responseGenerator";
import { todayStatus } from "../../../../_controllers/journalController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await todayStatus();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
