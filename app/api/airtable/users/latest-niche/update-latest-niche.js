const updateUserLatestNiche = async (userID, nicheID) => {
  const response = await fetch('/api/airtable/users/latest-niche', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: userID,
      nicheID: nicheID,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to patch user latest niche')
  }
  return response.json()
}

export default updateUserLatestNiche
