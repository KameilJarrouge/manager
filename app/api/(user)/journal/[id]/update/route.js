import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../../_lib/responseGenerator";
import { updateJournal } from "../../../../../_controllers/journalController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  let body = await request.json();
  const paramsSync = await params;

  let result = await updateJournal({
    id: Number(paramsSync.id),
    content: body.content,
  });
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
