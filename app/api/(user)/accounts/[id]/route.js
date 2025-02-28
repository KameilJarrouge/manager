import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../_lib/responseGenerator";
import { show } from "../../../../_controllers/accountsController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  let result = await show(Number(params.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
