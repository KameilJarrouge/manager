import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { getTodayCalories } from "@/app/_controllers/dayController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await getTodayCalories();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
