import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { todayTodoList } from "@/app/_controllers/todoController";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await todayTodoList();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
