import { deleteTodo } from "@/app/_controllers/todoController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function DELETE(request, { params }) {
  let result = await deleteTodo(Number(params.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
