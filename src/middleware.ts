import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Define redirect mappings
  const redirects: Record<string, string> = {
    '/market-intelligence': '/invest',
    '/tools': '/invest',
    '/strategy-playbooks': '/invest',
    '/solutions': '/about',
    '/case-studies': '/trends',
    '/developers': '/develop'
  }

  // Check if the path needs to be redirected
  if (redirects[url.pathname]) {
    url.pathname = redirects[url.pathname]
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/market-intelligence',
    '/tools', 
    '/strategy-playbooks',
    '/solutions',
    '/case-studies',
    '/developers'
  ]
}
