import { deleteNote } from "@/app/_controllers/notesController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function DELETE(request, { params }) {
  const paramsSync = await params;

  let result = await deleteNote(Number(paramsSync.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
