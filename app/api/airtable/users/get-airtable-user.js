const getAirtableUser = async () => {
  const response = await fetch('/api/airtable/users')
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

export default getAirtableUser
