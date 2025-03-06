import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../_lib/responseGenerator";
import { createJournal } from "../../../../_controllers/journalController";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();
  let result = await createJournal(body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
