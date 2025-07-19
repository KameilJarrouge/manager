import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { createDay } from "@/app/_controllers/dayController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();
  let result = await createDay(body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
