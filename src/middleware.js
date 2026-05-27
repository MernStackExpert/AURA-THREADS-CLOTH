import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    if (
      pathname.startsWith("/my-dashboard") ||
      pathname.startsWith("/admin")     ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-dashboard/:path*", "/admin/:path*"],
};
