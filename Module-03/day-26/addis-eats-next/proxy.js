import { NextResponse } from "next/server";

const COOKIE_NAME = "addis-eats-session";

export function proxy(request) {
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  const pathname = request.nextUrl.pathname;

  if (!sessionCookie?.value) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set(
      "next",
      `${pathname}${request.nextUrl.search}`
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/kitchen/:path*",
  ],
};
