import { NextResponse } from 'next/server'
import serverGetAuthToken from './server-get-auth-token'
// import serverAuthorizeUser from './authorize/server-authorize-user'
import serverGetUser from './user/server-get-user'
import serverGetAirtableUser from '../airtable/users/server-get-airtable-user'
import areObjectsEqual from '@/lib/areObjectsEqual'
import serverPostAirtableUser from '../airtable/users/server-post-airtable-user'
import serverPatchAirtableUser from '../airtable/users/server-patch-airtable-user'
import { createSession } from '@/lib/session'

export async function GET(request) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }
  console.log('authorize user - code', code)

  const tokenData = await serverGetAuthToken(code)
  console.log('authorize user - tokenData', tokenData)
  const accessToken = tokenData.access_token

  //   // Use the token to check if the user account has an active subscription to this product. If not, direct them to the not-subscribed page.
  // const authorized = await serverAuthorizeUser(accessToken)
  // console.log('authorize user - authorized', authorized)
  // if (!authorized) {
  //   return NextResponse.redirect(new URL('/not-subscribed', request.url))
  // }

  // // If the user passed the previous check they are authorized. Create or update the user entry in Airtable if it doesn't match the Whop user data.
  const whopUser = await serverGetUser(accessToken)
  console.log('authorize user - whopUser', whopUser)

  // Create or update the user entry in Airtable if it doesn't match the Whop user data.
  const airtableUser = await serverGetAirtableUser(whopUser)
  console.log('authorize user - airtableUser', airtableUser)

  const updatedAirtableUser = {
    ...airtableUser,
    fields: {
      ...airtableUser.fields,
      ...(whopUser.id && { 'Whop ID': whopUser.id }),
      ...(whopUser.username && { Username: whopUser.username }),
      ...(whopUser.profile_pic_url && {
        'Profile Image URL': whopUser.profile_pic_url,
      }),
      ...(whopUser.email && { Email: whopUser.email }),
      ...(whopUser.name && { Name: whopUser.name }),
    },
  }

  let sessionID = ''
  if (!airtableUser || Object.keys(airtableUser).length === 0) {
    const createdAirtableUser =
      await serverPostAirtableUser(updatedAirtableUser)
    sessionID = createdAirtableUser.id
  } else {
    const usersMatch = areObjectsEqual(airtableUser, updatedAirtableUser)
    if (!usersMatch) {
      serverPatchAirtableUser(updatedAirtableUser)
    }
    sessionID = updatedAirtableUser.id
  }

  console.log('authorize user - sessionID', sessionID)
  // Now that Airtable has an accurate record of this user, create a session using the Airtable User Record ID and redirect to the app dashboard.
  await createSession(sessionID)
  console.log('created session')

  console.log('authorize user - redirecting to request.url:', request.url)
  console.log('authorize user - request.nextUrl is:', request.nextUrl)
  return NextResponse.redirect(new URL('/', request.url))
}
