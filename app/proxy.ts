import { NextRequest, NextResponse } from "next/server";
import { generateUserId } from "@/lib/utils/src/cookie-utils";
import { COOKIE_MAX_AGE, USER_ID_COOKIE_NAME } from "@lib/constants";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const userId = request.cookies.get(USER_ID_COOKIE_NAME)?.value;
  if (!userId) {
    const newUserId = generateUserId();
    response.cookies.set(USER_ID_COOKIE_NAME, newUserId, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
