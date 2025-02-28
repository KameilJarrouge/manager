import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../_lib/responseGenerator";
import { getAccounts } from "../../../_controllers/accountsController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await getAccounts();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
