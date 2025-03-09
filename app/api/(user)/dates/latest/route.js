import { getLatestDates } from "@/app/_controllers/datesController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await getLatestDates();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
