const getActiveNiches = async () => {
  const response = await fetch('/api/airtable/niches')
  if (!response.ok) {
    throw new Error('Failed to fetch niches')
  }
  return response.json()
}

export default getActiveNiches
