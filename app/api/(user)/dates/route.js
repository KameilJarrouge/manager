import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../_lib/responseGenerator";
import { getDates } from "@/app/_controllers/datesController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await getDates();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
