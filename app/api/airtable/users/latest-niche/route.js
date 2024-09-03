import { NextResponse } from 'next/server'
import airtableFetch from '../../airtableFetch'
import { revalidateTag } from 'next/cache'

export async function PATCH(request) {
  const tableID = process.env.USERS_TABLE_ID

  // Read props from the request body
  const requestBody = await request.json()
  const userID = requestBody.userID
  const nicheID = requestBody.nicheID

  // Assign values to the fields of the options object
  const options = {
    recordID: userID,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        'Latest Niche': [nicheID],
      },
    }),
  }

  const response = await airtableFetch(tableID, options)

  revalidateTag('getAirtableUser')

  return NextResponse.json(response)
}
