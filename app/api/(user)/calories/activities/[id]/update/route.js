import { NextRequest } from "next/server";
import { updateActivity } from "@/app/_controllers/activityController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  let body = await request.json();
  const paramsSync = await params;
  let result = await updateActivity({
    id: Number(await paramsSync.id),
    ...body,
  });
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
