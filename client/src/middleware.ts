import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")
  const { pathname } = req.nextUrl

  // Chỉ chặn admin khi chắc chắn không có refreshToken
  if (!refreshToken && pathname.startsWith("/admin") && pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}