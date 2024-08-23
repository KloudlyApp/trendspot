import { sanityFetch } from '../client'

export default async function getSanityUser(whopUserData) {
  let userData = whopUserData
  if (userData) {
    // Fetch Sanity user data from Sanity using Whop user ID
    const sanityUserData = await sanityFetch({
      query: `*[_type == "user"
    && whopID == "${userData.id}"
    && !(_id in path("drafts.*"))]
    {
      "id": _id,
      "latestNicheName": latestNiche->name,
      "latestNicheID": latestNiche->_id
      }`,
    })
    userData.sanityID = sanityUserData[0].id
    userData.latestNiche = {
      name: sanityUserData[0].latestNicheName,
      id: sanityUserData[0].latestNicheID,
    }
  }
  return userData
}
