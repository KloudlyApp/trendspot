import FilterCard from '../components/FilterCard'
import getSanityUser from '../api/sanity/user/getSanityUser'
import getAuthorizedUserFromToken from '../api/whop/authorize-user'
import { cookies } from 'next/headers'
import getActiveNiches from '../api/airtable/niches/get-active-niches'
import CardGroup from '../components/CardGroup'
import TikTokCard from '../components/TikTokCard'
import { FilterStateProvider } from '../context/filterContext'
import CardSection from '../components/CardSection'

export default async function Home() {
  // Retrieve Whop access token from cookies and fetch Whop user data from Whop
  const whopUserData = await getAuthorizedUserFromToken(
    cookies().get('accessToken'),
  )
  const userData = await getSanityUser(whopUserData)
  const niches = await getActiveNiches()

  return (
    <div className='mt-6 lg:w-screen lg:h-screen lg:overflow-y-scroll   md:gap-10 lg:gap-2 md:h-[50%] md:flex md:flex-col lg:mt-6 px-4 gap-6 flex flex-col'>
      <FilterStateProvider initialNiche={userData.latestNiche}>
        <FilterCard niches={niches} userData={userData} />
        <CardSection />
      </FilterStateProvider>
    </div>
  )
}
