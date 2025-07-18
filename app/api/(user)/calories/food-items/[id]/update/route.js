import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { updateFoodItem } from "@/app/_controllers/foodItemsControllers";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  let body = await request.json();
  const paramsSync = await params;
  let result = await updateFoodItem({
    id: Number(await paramsSync.id),
    ...body,
  });
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
