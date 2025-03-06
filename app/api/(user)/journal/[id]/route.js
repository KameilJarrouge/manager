import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../_lib/responseGenerator";
import { show } from "../../../../_controllers/journalController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const paramsSync = await params;

  let result = await show(Number(paramsSync.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
