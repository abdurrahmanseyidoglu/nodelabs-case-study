import { auth } from "@/auth";
import { NextResponse } from "next/server";

// TODO: should I create a home page as well? maybe after I finish the requirements first!
const publicRoutes = ["/signin", "/signup"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (
    !isPublicRoute &&
    !isLoggedIn &&
    nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/signin", nextUrl));
  }
  //continue as normal otherwise
  return NextResponse.next();
});

export const config = {
  // Exclude API routes, static files, image optimizations, and .png files for better performance
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
