import { searchNotes } from "@/app/_controllers/notesController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await searchNotes(request.nextUrl.searchParams.get("searchKey"));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
