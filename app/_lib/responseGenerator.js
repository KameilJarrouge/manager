import { serialize } from "cookie";
import cookieName from "../_constants/cookieName";

export function successLoginResponse(tokenObject) {
  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      headers: {
        "Set-Cookie": serialize(cookieName, tokenObject.token, {
          secure: true,
          domain: "localhost",
          path: "/",
          maxAge: 2147483647,
        }),
      },
    }
  );
}

export function successLogoutResponse() {
  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      headers: {
        "Set-Cookie": serialize(cookieName, "", {
          secure: true,
          domain: "localhost",
          path: "/",
          maxAge: -1,
        }),
      },
    }
  );
}

export function successResponse(result) {
  return new Response(
    JSON.stringify(
      {
        success: true,
        result: result,
      },
      (key, value) => (typeof value === "bigint" ? Number(value) : value)
    )
  );
}

export function errorResponse(code, result) {
  return new Response(
    JSON.stringify({
      success: false,
      errorCode: code,
      result: result,
    })
  );
}
