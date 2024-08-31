const getResources = async () => {
  const response = await fetch('/api/airtable/resources')
  if (!response.ok) {
    throw new Error('Failed to fetch resources')
  }
  return response.json()
}

export default getResources
