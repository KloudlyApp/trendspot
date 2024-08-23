import { redirect } from 'next/navigation'

export default async function getAuthorizedUserFromToken(accessToken) {
  let data = {}
  if (accessToken) {
    const authorized = await authorizeUser(accessToken.value)
    if (!authorized) {
      return redirect('/not-subscribed')
    }
    data = await getUserFromToken(accessToken.value)

    return data
  }
  console.log('testing only: no accessToken found')
  data = {
    id: 'user_wowowowowow',
    name: 'Testy McTesterson',
    username: 'testytesterson',
    email: 'test@gmail.com',
    profile_pic_url:
      'https://ui-avatars.com/api/?name=test&background=535961&color=fff',
  }
  return data
}

const authorizeUser = async (accessToken) => {
  try {
    const productID = process.env.NEXT_PUBLIC_REQUIRED_PRODUCT
    const statuses = ['active', 'trialing', 'completed']
    const statusesQuery = statuses
      .map((status) => `statuses=${status}`)
      .join('&')

    const response = await fetch(
      `https://api.whop.com/api/v5/me/memberships?${statusesQuery}&product_id=${productID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    const data = await response.json()

    // Data.data is an array of memberships matching query parameters. The query parameters filter for only active subscriptions to the Required Product, so if there are any memberships returned, the user is authorized.
    if (data.data.length) return true
    else return false
  } catch (error) {
    throw error
  }
}

const getUserFromToken = async (accessToken) => {
  const response = await fetch(`https://api.whop.com/v5/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const userData = await response.json()
  return userData
}
