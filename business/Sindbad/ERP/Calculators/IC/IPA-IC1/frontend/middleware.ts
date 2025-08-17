import { NextResponse } from "next/server";
export function middleware() { return NextResponse.next(); }
/** Only touch the root path; bypass everything under /v11.x/ */
export const config = { matcher: ["/"] };
