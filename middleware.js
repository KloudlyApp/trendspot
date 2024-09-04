import { NextResponse } from 'next/server'
import { verifySession } from './lib/session'

const protectedRoutes = ['/', '/resources']
const publicRoutes = ['/login', '/not-subscribed']

export default async function middleware(request) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // Routes besides public and protected can skip middleware logic
  if (isProtectedRoute || isPublicRoute) {
    console.log('middleware - requested path:', path)
    const { isAuthorized, userID } = await verifySession(request)
    console.log('middleware - session info:', isAuthorized, userID)

    // Requests without a session trying to access protected pages will be sent to login
    if (isProtectedRoute && !isAuthorized) {
      console.log(
        'middleware - invalid session requesting a protected route, redirecting to login',
      )
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // Requests with a session mistakenly going to a login route will be sent to the dashboard
    if (isPublicRoute && isAuthorized) {
      console.log(
        'middleware - logged-in session requesting a public route, redirecting to dashboard',
      )
      return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    // Requests that don't meet the preceding criteria are accessing the correct route. Let them proceed.
  }

  return NextResponse.next()
}
