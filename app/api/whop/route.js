import { NextResponse } from 'next/server'
import getAuthToken from '@/app/api/whop/get-auth-token'
import { cookies } from 'next/headers'

export async function GET(req) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  try {
    const tokenData = await getAuthToken(code)
    const accessToken = tokenData.access_token

    // Set the access token as an HTTP-only cookie
    cookies().set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours in seconds
    })

    // Redirect to dashboard or appropriate page
    return NextResponse.redirect(new URL('/', req.url))
  } catch (error) {
    console.error('Error in Whop callback @ api/whop/route')
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    )
  }
}
