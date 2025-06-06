import { getLastOrder } from "@/app/_controllers/sectionsController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const paramsSync = await params;

  let result = await getLastOrder(Number(paramsSync.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
