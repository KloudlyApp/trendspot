const serverGetAuthToken = async (code) => {
  const response_TCL = await fetch('https://api.whop.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      client_id: process.env.WHOP_CLIENT_ID_TCL,
      client_secret: process.env.WHOP_CLIENT_SECRET_TCL,
      redirect_uri: process.env.WHOP_OAUTH_CALLBACK_URL,
    }),
  })
  const data_TCL = await response_TCL.json()
  console.log('serverGetAuthToken - TCL data:', data_TCL)

  if (!data_TCL.access_token) {
    const response_TS = await fetch('https://api.whop.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        client_id: process.env.WHOP_CLIENT_ID_TS,
        client_secret: process.env.WHOP_CLIENT_SECRET_TS,
        redirect_uri: process.env.WHOP_OAUTH_CALLBACK_URL,
      }),
    })
    const data_TS = await response_TS.json()
    console.log('serverGetAuthToken - TS data:', data_TS)

    return data_TS
  }

  return data_TCL
}

export default serverGetAuthToken

// async function betterorder() {
//   const response_TS = await fetch('https://api.whop.com/v5/oauth/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       code,
//       client_id: process.env.WHOP_CLIENT_ID_TS,
//       client_secret: process.env.WHOP_CLIENT_SECRET_TS,
//       redirect_uri: process.env.WHOP_OAUTH_CALLBACK_URL,
//     }),
//   })
//   const data_TS = await response_TS.json()

//   if (!data_TS.access_token) {
//     const response_TCL = await fetch('https://api.whop.com/v5/oauth/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         code,
//         client_id: process.env.WHOP_CLIENT_ID_TCL,
//         client_secret: process.env.WHOP_CLIENT_SECRET_TCL,
//         redirect_uri: process.env.WHOP_OAUTH_CALLBACK_URL,
//       }),
//     })
//     const data_TCL = await response_TCL.json()
//     return data_TCL
//   }
// }
