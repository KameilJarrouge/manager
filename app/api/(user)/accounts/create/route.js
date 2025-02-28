import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../_lib/responseGenerator";
import { createAccount } from "../../../../_controllers/accountsController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();
  let result = await createAccount(body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
