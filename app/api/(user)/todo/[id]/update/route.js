import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { updateTodo } from "@/app/_controllers/todoController";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  let body = await request.json();
  let result = await updateTodo(Number(params.id), body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
