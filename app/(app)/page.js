import FilterCard from '../components/FilterCard'
import getAuthorizedUserFromToken from '../api/whop/authorize-user'
import { cookies } from 'next/headers'
import getActiveNiches from '../api/airtable/niches/get-active-niches'
import { FilterStateProvider } from '../context/filterContext'
import CardSection from '../components/CardSection'
import getAirtableUser from '../api/airtable/users/getAirtableUser'
import DashboardReloader from './DashboardReloader'

export default async function Home() {
  // Retrieve Whop access token from cookies and fetch Whop user data from Whop
  const token = cookies().get('accessToken')
  if (!token) {
    return <DashboardReloader />
  }
  const whopUserData = await getAuthorizedUserFromToken(token)
  const niches = await getActiveNiches()
  const userDataArray = await getAirtableUser(whopUserData)
  const userData = userDataArray.records[0]

  const latestNiche = niches[0]
  if (userData) {
    const latestNiche = niches.find(
      (item) => item.id === userData.fields['Latest Niche'][0],
    )
    console.log('latest niche', latestNiche)
  } else {
    console.log('userData.records.length = 0')
  }

  return (
    <div className='mt-6 lg:w-screen lg:h-screen lg:overflow-y-scroll   md:gap-10 lg:gap-2 md:h-[50%] md:flex md:flex-col lg:mt-6 px-4 gap-6 flex flex-col'>
      <FilterStateProvider initialNiche={latestNiche}>
        <FilterCard niches={niches} userData={userData} />
        <CardSection />
      </FilterStateProvider>
    </div>
  )
}
