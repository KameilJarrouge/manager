import { NextRequest } from "next/server";
import { createActivity } from "@/app/_controllers/activityController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();
  let result = await createActivity(body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
