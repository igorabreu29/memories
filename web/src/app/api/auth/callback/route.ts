import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    
    const responseCode = await api.post('/register', {
        code,
    })

    const { token } = responseCode.data
    // console.log(token)
    
    const redirectURL = new URL('/', req.url)

    const cookiesExpiresIn = 60 * 60 * 24 * 30

    return NextResponse.redirect(redirectURL, {
        headers: {
            'Set-cookie': `token=${token}; Path=/; max-age=${cookiesExpiresIn}`
        }
    })
}   