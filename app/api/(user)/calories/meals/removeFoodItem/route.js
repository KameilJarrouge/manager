import { deleteMeal, removeFoodItem } from "@/app/_controllers/mealController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function DELETE(request) {
  let body = await request.json();
  let result = await removeFoodItem(body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
