import { NextRequest } from "next/server";
import { getBooks } from "@/app/_controllers/booksController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await getBooks();
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
