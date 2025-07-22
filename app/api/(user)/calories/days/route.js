import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { daysList } from "@/app/_controllers/dayController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await daysList(
    new Date(request.nextUrl.searchParams.get("date"))
  );
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
