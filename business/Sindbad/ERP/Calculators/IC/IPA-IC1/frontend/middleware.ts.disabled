import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/v11.5/ipa-calculator-ivc-v11-5.html', req.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/'] };
