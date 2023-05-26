import { NextRequest, NextResponse } from "next/server";

const signIn = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value

    if (!token) {
        return NextResponse.redirect(signIn)
    } 

    return NextResponse.next()
}

export const config = {
    matcher: '/memories/:path*'
}