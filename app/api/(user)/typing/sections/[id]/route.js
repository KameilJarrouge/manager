import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { getSection } from "@/app/_controllers/sectionsController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const paramsSync = await params;

  let result = await getSection(Number(paramsSync.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
