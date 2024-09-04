import { verifySession } from '@/lib/session'
import airtableFetch from '../airtableFetch'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const tableID = process.env.USERS_TABLE_ID
  const { isAuthorized, userID } = await verifySession(request)

  if (!isAuthorized) {
    console.log(
      'GET user - no userID returned by verifySession, redirecting to login',
    )
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  const airtableUserData = await airtableFetch(tableID, {
    recordID: userID,
    next: { revalidate: 7000, tags: ['getAirtableUser'] },
  })

  return NextResponse.json(airtableUserData)
}
