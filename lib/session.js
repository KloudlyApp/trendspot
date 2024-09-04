import 'server-only'

import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(userID) {
  // Expires 7 days from creation
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userID, expiresAt })
  console.log('createSession - session:', session)

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export const verifySession = async (request) => {
  const cookie = cookies().get('session')?.value
  console.log('verifySession - cookie:', cookie)

  const session = await decrypt(cookie)
  console.log('verifySession - session:', session)

  if (!session?.userID) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  const response = { isAuthorized: true, userID: session.userID }
  return response
}
