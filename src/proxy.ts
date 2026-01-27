import { Route } from "next"
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // Check for auth cookie (atk = access token)
  const authCookie = request.cookies.get('atk');
  const isAuthenticated = !!authCookie?.value;

  // If user is on login page and already authenticated, redirect to admin
  if (request.nextUrl.pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // If user is not authenticated and trying to access admin pages, redirect to login
  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config: { matcher: Route[] } = {
  matcher: [
    "/admin/:path*",
    "/login"
  ],
}
