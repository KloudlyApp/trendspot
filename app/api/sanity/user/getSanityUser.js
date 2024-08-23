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
    if (sanityUserData[0]) {
      userData.sanityID = sanityUserData[0]?.id
      userData.latestNiche = {
        name: sanityUserData[0]?.latestNicheName,
        id: sanityUserData[0]?.latestNicheID,
      }
    } else {
      console.log('testing only: no sanity user data found')
      userData = {
        id: 'user_wowowowowow',
        name: 'Testy McTesterson',
        username: 'testytesterson',
        email: 'test@gmail.com',
        profile_pic_url:
          'https://ui-avatars.com/api/?name=test&background=535961&color=fff',
        sanityID: '737d6fd4-09f2-492c-bccd-5b4681cdbcf0',
        latestNiche: {
          name: 'Beauty',
          id: 'ade20a10-78d3-49cb-af13-f28d2d874a6e',
        },
      }
    }
  }
  return userData
}
