import Top_Video_Product from '../components/_top_video_product/Top_Video_Product'
import DetailCard from '../components/DetailCard'
import Top_LiveStream from '../components/_top_livestream/Top_LiveStream'
import Top_Trending_Product from '../components/_top_viral_video/Top_Trending_Product'
import getSanityUser from '../api/sanity/user/getSanityUser'
import getAuthorizedUserFromToken from '../api/whop/authorize-user'
import { cookies } from 'next/headers'
import getActiveNiches from '../api/airtable/niches/get-active-niches'

export default async function Home() {
  // Retrieve Whop access token from cookies and fetch Whop user data from Whop
  const whopUserData = await getAuthorizedUserFromToken(
    cookies().get('accessToken'),
  )
  const userData = await getSanityUser(whopUserData)
  const niches = await getActiveNiches()

  return (
    <div className='mt-6 lg:w-screen lg:h-screen lg:overflow-y-scroll   md:gap-10 lg:gap-2 md:h-[50%] md:flex md:flex-col lg:mt-6 px-4 gap-6 flex flex-col'>
      <DetailCard niches={niches} userData={userData} />
      <Top_Video_Product />
      <Top_LiveStream />
      <Top_Trending_Product />
    </div>
  )
}
