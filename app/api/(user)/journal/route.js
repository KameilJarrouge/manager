import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../_lib/responseGenerator";
import { browseJournal } from "../../../_controllers/journalController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await browseJournal(
    request.nextUrl.searchParams.get("startDate"),
    request.nextUrl.searchParams.get("endDate")
  );
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
