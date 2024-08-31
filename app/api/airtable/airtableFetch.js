const airtableFetch = async (tableID, options = {}) => {
  // Build the fetch URL
  const baseURL = `https://api.airtable.com/v0/${process.env.BASE_ID}/`
  const recordID = options.recordID ? `/${options.recordID}` : ''
  const query =
    options.params ? '?' + new URLSearchParams(options.params).toString() : ''
  const fetchURL = baseURL + tableID + recordID + query

  // Build the Fetch Options object
  const method = options.method || 'GET'
  const authorizationHeader = {
    Authorization: `Bearer ${process.env.AIRTABLE_BEARER_TOKEN}`,
  }
  const fetchOptions = {
    method,
    headers: { ...authorizationHeader, ...options.headers },
    body: options.body,
    cache: options.cache,
    next: options.next,
  }

  // console.log('airtable fetch', fetchURL, fetchOptions)

  const response = await fetch(fetchURL, fetchOptions)

  return response.json()
}

export default airtableFetch
