import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Define your list of allowed admin emails here
const ADMIN_EMAILS = [
  "rivridis@gmail.com"
];

export async function middleware(req) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // 1. Not logged in -> Redirect to sign-in if accessing a protected route
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // 2. Logged in, but NOT an admin -> Redirect to unauthorized
  if (session && pathname.startsWith("/dashboard")) {
    const userEmail = session.user?.email;
    
    // Check if the user's email exists in the allowed list
    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // 3. Logged in (admin or otherwise) -> Keep them away from the sign-in page
  if (session && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/dashboard/:path*"],
};