export default async function serverAuthorizeUser(accessToken) {
  const productIDs = process.env.NEXT_PUBLIC_REQUIRED_PRODUCT.split(', ')
  const statuses = ['completed', 'trialing', 'active']
  const statusesQuery = statuses.map((status) => `statuses=${status}`).join('&')

  const response = await fetch(`https://api.whop.com/api/v5/me/memberships`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const allMemberships = await response.json()
  console.log('All user memberships', allMemberships)

  for (let i = 0; i < productIDs.length; i++) {
    const productID = productIDs[i]

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
    if (data?.data?.length) return true
  }
  return false
}
