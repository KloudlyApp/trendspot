import { revalidateTag } from 'next/cache'
import airtableFetch from '../../airtableFetch'

const updateUserLatestNiche = async (userID, nicheID) => {
  const response = fetch('/api/airtable/users/update-latest-niche', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: userData.id,
      nicheID: filterNiche.id,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch resources')
  }
  return response.json()
}

export default updateUserLatestNiche

import { NextResponse } from 'next/server'
import updateUserLatestNiche from './update-latest-niche'

export async function PATCH(request) {
  const body = await request.json()
  const userID = body.userID
  const nicheID = body.nicheID

  const response = await updateUserLatestNiche(userID, nicheID)

  return NextResponse.json(response)
}
