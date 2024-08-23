import { cookies } from 'next/headers'
import getAuthorizedUserFromToken from '../api/whop/authorize-user'
import Profile_Updates_Card from '../components/Profile_Updates_Card'
import { GlobalStateProvider } from '../context/filterContext'
import getSanityUser from '../api/sanity/user/getSanityUser'

export default async function layout({ children }) {
  const whopUserData = await getAuthorizedUserFromToken(
    cookies().get('accessToken'),
  )
  const userData = await getSanityUser(whopUserData)

  return (
    <GlobalStateProvider initialSelectedNiche={userData.latestNiche}>
      <main className='flex min-h-screen lg:h-full  w-full  background-linear justify-around lg:justify-between overflow-hidden '>
        <div className='flex flex-col lg:max-w-full lg:flex-row gap-2 md:h-screen lg:justify-center lg:items-center md:overflow-scroll  md:px-4 '>
          <Profile_Updates_Card />
          {children}
        </div>
      </main>
    </GlobalStateProvider>
  )
}
