import { NextResponse } from 'next/server'
import { verifySession } from './lib/session'

const protectedRoutes = ['/', '/resources']
const publicRoutes = ['/login', '/not-subscribed']

export default async function middleware(request) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const { isAuthorized, userID } = await verifySession(request)
  console.log('middleware session info', isAuthorized, userID)

  // Users without a session trying to access protected pages will be sent to login
  if (isProtectedRoute && !userID) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // Users with a session mistakenly going to a login route will be sent to the dashboard
  if (isPublicRoute && userID) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // Users that don't meet the preceding criteria are accessing the correct route. Let them proceed.
  return NextResponse.next()
}