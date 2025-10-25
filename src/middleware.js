import { NextResponse } from "next/server";
import { auth } from "@/auth"; // your auth() function

export async function middleware(req) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (session && session.user?.email !== "rivridis@gmail.com" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (session && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/dashboard/:path*"],
};
