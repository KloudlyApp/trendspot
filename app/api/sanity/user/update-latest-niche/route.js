import { sanityPatch } from '../../client'

export async function POST(request) {
  const { userID, nicheID } = await request.json()
  await sanityPatch({
    id: userID,
    params: { latestNiche: { _ref: nicheID } },
  })

  return Response.json({ message: 'Latest niche updated successfully' })
}
