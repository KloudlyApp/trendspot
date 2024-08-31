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

  let latestNiche = niches[0]
  if (userData) {
    latestNiche = niches.find(
      (item) => item.id === userData.fields['Latest Niche'][0],
    )
  } else {
    console.log('userData.records.length = 0')
  }

  return (
    <div className='mt-6 lg:mt-0 md:h-[50%] lg:w-[calc(100vw-28rem)] px-2 lg:h-screen flex flex-col gap-6 md:gap-10 lg:gap-2'>
      <FilterStateProvider initialNiche={latestNiche}>
        <FilterCard niches={niches} userData={userData} />
        <CardSection />
      </FilterStateProvider>
    </div>
  )
}
