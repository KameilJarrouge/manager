import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { addFoodItem } from "@/app/_controllers/mealController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request, { params }) {
  let body = await request.json();
  const paramsSync = await params;
  let result = await addFoodItem({
    id: Number(await paramsSync.id),
    ...body,
  });
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
