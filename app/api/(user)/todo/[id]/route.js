import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { getTodo } from "@/app/_controllers/todoController";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const paramsSync = await params;

  let result = await getTodo(Number(paramsSync.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
