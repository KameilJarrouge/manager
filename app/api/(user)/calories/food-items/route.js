import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { listFoodItems } from "@/app/_controllers/foodItemsControllers";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await listFoodItems();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
