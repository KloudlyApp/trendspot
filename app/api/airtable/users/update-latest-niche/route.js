import { NextResponse } from 'next/server'
import patchUserLatestNiche from './patch-latest-niche'

export async function PATCH(request) {
  const body = await request.json()
  const userID = body.userID
  const nicheID = body.nicheID

  const response = await patchUserLatestNiche(userID, nicheID)

  return NextResponse.json(response)
}
