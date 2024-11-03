import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const middleware = (request: NextRequest) => {
    const path: string = request.nextUrl.pathname;
    if (path.startsWith("/admin")) {
        // Ensure the user is authenticated in the admin page
        const session: RequestCookie | undefined =
            request.cookies.get("mc-maps-session");
        if (!session || atob(session.value) !== process.env.ADMIN_PASSWORD) {
            const goHome = NextResponse.redirect(new URL("/", request.url));
            goHome.cookies.delete("mc-maps-session");
            return goHome;
        }
    }
    return NextResponse.next();
};

export const config = {
    matcher: "/admin/:path*",
};
