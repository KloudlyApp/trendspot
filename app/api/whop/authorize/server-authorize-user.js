export default async function serverAuthorizeUser(accessToken) {
  const productIDs = process.env.NEXT_PUBLIC_REQUIRED_PRODUCT.split(', ')
  const statuses = ['completed', 'trialing', 'active']

  const response = await fetch(`https://api.whop.com/api/v5/me/memberships`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const allMemberships = await response.json()
  console.log('All user memberships', allMemberships)

  for (let j = 0; j < statuses.length; j++) {
    const status = statuses[j]
    for (let i = 0; i < productIDs.length; i++) {
      const productID = productIDs[i]
      console.log(`Status #${j}: ${status}, Product #${i}: ${productID}`)

      const response = await fetch(
        `https://api.whop.com/api/v5/me/memberships?$statuses=${status}&product_id=${productID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      const data = await response.json()

      console.log(`Matching Memberships: ${data?.data}`)

      // Data.data is an array of memberships matching query parameters. The query parameters filter for only active subscriptions to the Required Product, so if there are any memberships returned, the user is authorized.
      if (data?.data?.length) return true
    }
  }
  return false
}
