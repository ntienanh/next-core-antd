import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the path for the incoming request
  const pathname = request.nextUrl.pathname;
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/home', request.url));
  }
}

// export const config = {
//   matcher: '/admin/:path*',
// };
