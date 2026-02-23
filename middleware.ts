import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminCookieName, verifyAdminToken } from "@/lib/adminAuth";

const adminRoute = /^\/admin(\/.*)?$/;
const adminApiRoute = /^\/api\/admin(\/.*)?$/;
const protectedRoutes = [/^\/dashboard(\/.*)?$/, /^\/blog(\/.*)?$/, /^\/datasets(\/.*)?$/];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (adminRoute.test(pathname)) {
    if (pathname.startsWith("/login")) {
      return NextResponse.next();
    }

    const token = request.cookies.get(getAdminCookieName())?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (adminApiRoute.test(pathname)) {
    const token = request.cookies.get(getAdminCookieName())?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (protectedRoutes.some((route) => route.test(pathname))) {
    const token = request.cookies.get(getAdminCookieName())?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/:path*", "/dashboard/:path*", "/blog/:path*", "/datasets/:path*"],
};
