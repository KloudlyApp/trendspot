import { verifySession } from '@/lib/session'
import airtableFetch from '../airtableFetch'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const tableID = process.env.USERS_TABLE_ID
  const { userID } = await verifySession(request)

  console.log('get airtable user route info', tableID, userID)

  const airtableUserData = await airtableFetch(tableID, {
    recordID: userID,
    next: { revalidate: 7000, tags: ['airtableUser'] },
  })

  console.log('user get route response')
  console.dir(airtableUserData, { depth: null })

  return NextResponse.json(airtableUserData)
}
