import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase()) {
		return NextResponse.next();
	}

	return NextResponse.redirect(
		new URL(req.nextUrl.origin + req.nextUrl.pathname.toLowerCase()),
	);
}
