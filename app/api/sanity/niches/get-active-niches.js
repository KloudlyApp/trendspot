import { sanityFetch } from '../client'

const getActiveNiches = async () => {
  // Fetches list of active (non-archived) Niches from Sanity
  const niches = await sanityFetch({
    query: `*[_type == "niche"
    && archived == false
    && !(_id in path("drafts.*"))]
    {
      "name": name,
      "id": _id
      }`,
  })

  return niches
}

export default getActiveNiches
