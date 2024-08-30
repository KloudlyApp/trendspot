const getAuthToken = async (code) => {
  const response = await fetch('https://api.whop.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      client_id: process.env.NEXT_PUBLIC_WHOP_CLIENT_ID,
      client_secret: process.env.WHOP_CLIENT_SECRET,
      redirect_uri: process.env.WHOP_OAUTH_CALLBACK_URL,
    }),
  })

  const data = await response.json()
  return data
}

export default getAuthToken
