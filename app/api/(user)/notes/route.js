import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { getNotes } from "@/app/_controllers/notesController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await getNotes();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
