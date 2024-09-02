import { NextResponse } from 'next/server'
import serverGetAuthToken from './server-get-auth-token'
import serverAuthorizeUser from './authorize/server-authorize-user'
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
  console.log('whop callback code', code)

  const tokenData = await serverGetAuthToken(code)
  const accessToken = tokenData.access_token
  console.log('whop callback accessToken', accessToken)

  // Use the token to check if the user account has an active subscription to this product. If not, direct them to the not-subscribed page.
  const authorized = await serverAuthorizeUser(accessToken)
  console.log('middleware auth result', authorized)
  if (!authorized) {
    return NextResponse.redirect(new URL('/not-subscribed', request.url))
  }

  // If the user passed the previous check they are authorized. Create or update the user entry in Airtable if it doesn't match the Whop user data.
  const whopUser = await serverGetUser(accessToken)
  console.log('whop user', whopUser)

  const airtableUser = await serverGetAirtableUser(whopUser)
  console.log('airtable user')
  console.dir(airtableUser, { depth: null })

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
  console.log('updated user')
  console.dir(updatedAirtableUser, { depth: null })

  if (!airtableUser || Object.keys(airtableUser).length === 0) {
    console.log("user doesn't exist yet")
    serverPostAirtableUser(updatedAirtableUser)
  } else {
    const usersMatch = areObjectsEqual(airtableUser, updatedAirtableUser)
    console.log('do users match?', usersMatch)
    if (!usersMatch) {
      serverPatchAirtableUser(updatedAirtableUser)
    }
  }

  // Now that Airtable has an accurate record of this user, create a session using the Airtable User Record ID and redirect to the app dashboard.
  await createSession(updatedAirtableUser.id)

  console.log('session created')

  return NextResponse.redirect(new URL('/', request.url))
}
