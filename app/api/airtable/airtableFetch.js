const airtableFetch = async (url, options = {}) => {
  const BASE_URL = `https://api.airtable.com/v0/${process.env.BASE_ID}/`
  const authorizationHeader = {
    Authorization: `Bearer ${process.env.AIRTABLE_BEARER_TOKEN}`,
  }

  const method = options.method || 'GET'
  const fetchOptions = {
    method,
    headers: { ...authorizationHeader, ...options.headers },
    body: options.body,
  }

  console.log(`${BASE_URL}${url}`, fetchOptions)

  const response = await fetch(`${BASE_URL}${url}`, fetchOptions)

  console.log(response)

  return response.json()
}

export default airtableFetch
