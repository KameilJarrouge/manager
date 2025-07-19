import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { makeDayAlignedWithCurrentPI } from "@/app/_controllers/dayController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  const paramsSync = await params;
  let result = await makeDayAlignedWithCurrentPI({
    id: Number(await paramsSync.id),
  });
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
