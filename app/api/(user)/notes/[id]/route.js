import { show } from "@/app/_controllers/notesController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  let result = await show(Number(params.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
