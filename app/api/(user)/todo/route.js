import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { allTodo } from "@/app/_controllers/todoController";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await allTodo();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
