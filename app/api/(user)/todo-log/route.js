import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../_lib/responseGenerator";
import { getTodoLog } from "@/app/_controllers/todoLogController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await getTodoLog(
    request.nextUrl.searchParams.get("startDate"),
    request.nextUrl.searchParams.get("endDate")
  );
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
