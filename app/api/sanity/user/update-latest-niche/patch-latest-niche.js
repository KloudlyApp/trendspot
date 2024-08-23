const userPatchLatestNiche = async (userID, nicheID) => {
  await fetch('/api/sanity/user/update-latest-niche', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID,
      nicheID,
    }),
  })
}

export default userPatchLatestNiche
