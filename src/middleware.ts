import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("🔍 Middleware running on:", req.nextUrl.pathname);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If there's no token and route is protected, redirect to /login
  if (!token) {
    const protectedRoutes = ["/cart", "/checkout", "/profile"];
    const pathname = req.nextUrl.pathname;

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtected) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match these paths and any subpaths
  matcher: ["/cart/:path*", "/checkout/:path*", "/profile/:path*"],
};
// This middleware will run for all paths under /cart, /checkout, and /profile
// and will check if the user is authenticated. If not, it will redirect them to the /login page.
