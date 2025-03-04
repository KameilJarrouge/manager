import { updateNote } from "@/app/_controllers/notesController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  let body = await request.json();
  let result = await updateNote({
    id: Number(params.id),
    ...body,
  });
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
