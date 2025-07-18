import { NextRequest } from "next/server";

import { listActivities } from "@/app/_controllers/activityController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await listActivities();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
