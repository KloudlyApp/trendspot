import { Button } from '@/components/ui/button'
import { FaDiscord } from 'react-icons/fa'
import getAuthorizedUserFromToken from '../api/whop/authorize-user'
import { cookies } from 'next/headers'
import { primaryColor, textColor } from '@/lib/variables'
import NavButton from './NavButton'

async function Profile() {
  // Retrieve Whop access token from cookies and fetch Whop user data from Whop
  const userData = await getAuthorizedUserFromToken(
    cookies().get('accessToken'),
  )

  const displayName =
    userData.name || userData.username || userData.email || 'User'
  const profilePicUrl =
    userData.profile_pic_url ||
    `https://ui-avatars.com/api/?name=${displayName}&background=${primaryColor}&color=${textColor}`

  return (
    <div className='flex items-center flex-col gap-4  md:px-2  lg:px-4 mt-2 lg:h-fit '>
      <img
        src='./images/word_logo.svg'
        alt='Trendspot Logo'
        className='object-cover h-10 w-64 mt-10 md:mt-8 lg:mt-8'
      />
      <img
        src={profilePicUrl}
        alt='Profile Picture'
        className='object-cover bg-[#857FFF] rounded-full md:rounded-xl md:w-1/2 md:h-[150px] mt-6 md:flex items-center justify-center'
      />

      <p className='font-bold text-white '>{displayName}</p>

      <div className='flex gap-2 mt-6'>
        <NavButton href='/' label='dashboard' />
        <NavButton href='/resources' label='resources' />
        <a
          href='https://www.discord.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button variant='default'>
            <FaDiscord className='mr-2' size={20} /> Discord
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Profile
