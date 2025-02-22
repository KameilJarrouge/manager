import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken } from "./app/_lib/tokenHandler";
import cookieName from "./app/_constants/cookieName";
const DEBUG = true;

export async function middleware(request: NextRequest) {
  // Set the DEBUG variable true to skip this middleware
  if (DEBUG) return NextResponse.next();

  // get the user from token
  let token = request.cookies.get(cookieName)?.value || undefined;
  let result = await verifyToken(token);

  if (request.nextUrl.pathname.startsWith("/api")) {
    // << api middleware >>

    if (request.nextUrl.pathname.startsWith("/api/auth"))
      return NextResponse.next();

    if (result.success) return NextResponse.next();

    return NextResponse.json({ message: "unauthenticated" }, { status: 401 });
  } else {
    // << routing middleware >>

    // excluding /_next paths helps with the css not loading
    // excluding /auth prevent infinitely looping this middleware
    if (
      request.nextUrl.pathname.startsWith("/_next") ||
      request.nextUrl.pathname.startsWith("/auth")
    )
      return NextResponse.next();

    // the request doesn't have a valid token
    if (!result.success) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

    // good to go
    return NextResponse.next();
  }
}
