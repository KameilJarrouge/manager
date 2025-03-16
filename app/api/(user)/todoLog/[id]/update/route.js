import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../../_lib/responseGenerator";
import { updateTodoLogEntry } from "@/app/_controllers/todoLogController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  let body = await request.json();
  const paramsSync = await params;

  let result = await updateTodoLogEntry({
    id: Number(paramsSync.id),
    completed: body.completed,
  });
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
