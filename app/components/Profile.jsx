import { Button } from '@/components/ui/button'

import React from 'react'
import { FaDiscord } from 'react-icons/fa'
import getAuthorizedUserFromToken from '../api/whop/authorize-user'
import { cookies } from 'next/headers'
import { primaryColor, textColor } from '@/lib/variables'

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
      <h1 className='text-3xl mt-6 lg:mt-2  lg:text-4xl font-black text-[#7A8EFF]'>
        Trendspot
      </h1>
      <div className='mt-6 bg-[#7A8EFF] p-2 md:p- 6 rounded-full md:rounded-lg md:w-1/2 md:h-[150px] lg:mt-2 md:flex items-center justify-center'>
        <img src={profilePicUrl} alt='Profile Pic' />
      </div>

      <p className='font-bold mt-4  lg:mt-2  text-white '>{displayName}</p>

      <div className='flex  gap-2 '>
        <a href='/'>
          <Button
            variant='ghost'
            className='bg-[#7A8EFF] hover:scale-105 transition-all delay-100 hover:!bg-[#7A8EFF] text-white'
          >
            Dashboard
          </Button>
        </a>
        <a href='/resources'>
          <Button
            variant='ghost'
            className='bg-[#7A8EFF] hover:scale-105 transition-all delay-100 hover:!bg-[#7A8EFF] text-white'
          >
            Resources
          </Button>
        </a>
        <a href='https://www.discord.com'>
          <Button
            variant='ghost'
            className='bg-[#7A8EFF] hover:scale-105 transition-all delay-100 hover:!bg-[#7A8EFF] text-white'
          >
            <FaDiscord className='mr-2' size={20} /> Discord
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Profile
