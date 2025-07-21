import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { addIntake } from "@/app/_controllers/dayController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request, { params }) {
  const paramsSync = await params;

  let body = await request.json();
  let result = await addIntake({ id: Number(paramsSync.id), intake: body });
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
