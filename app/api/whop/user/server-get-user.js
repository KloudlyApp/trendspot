export default async function serverGetUser(accessToken) {
  const response = await fetch(`https://api.whop.com/v5/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const userData = await response.json()

  return userData
}
