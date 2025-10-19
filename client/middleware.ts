import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { protectedRoutes } from "./utils/protectedRoutes"

export function middleware(request: NextRequest) {

    const token = request.cookies.get('authToken')?.value
    const currentPath = request.nextUrl.pathname

    if (protectedRoutes.includes(currentPath) && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}