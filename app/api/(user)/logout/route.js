import { successLogoutResponse } from "../../../_lib/responseGenerator";
import { NextRequest } from "next/server";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  return successLogoutResponse();
}
