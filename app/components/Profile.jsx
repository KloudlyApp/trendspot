import { Button } from '@/components/ui/button'

import React from 'react'
import { GiPoliceOfficerHead } from 'react-icons/gi'
import { FaDiscord } from 'react-icons/fa'

function Profile() {
  return (
    <div className='   flex items-center flex-col gap-4  md:px-2  lg:h-screen '>
      <h1 className='text-3xl mt-6  font-black text-[#fff]'>Trendspot</h1>
      <div className='mt-6 bg-[#7F8CFC] p-2 md:p-6 rounded-full md:rounded-lg md:w-1/2 md:h-[150px] md:flex items-center justify-center'>
        <GiPoliceOfficerHead size={60} color='white' />
      </div>

      <p className='font-bold mt-4   text-white'>Kevin Porter</p>

      <div className='flex  gap-4 '>
        <Button
          variant='ghost'
          className='bg-[#7F8CFC] hover:scale-105 transition-all delay-100 hover:!bg-[#7F8CFC] text-white'
        >
          Dashboard
        </Button>
        <Button
          variant='ghost'
          className='bg-[#7F8CFC] hover:scale-105 transition-all delay-100 hover:!bg-[#7F8CFC] text-white'
        >
          Resources
        </Button>
        <Button
          variant='ghost'
          className='bg-[#7F8CFC] hover:scale-105 transition-all delay-100 hover:!bg-[#7F8CFC] text-white'
        >
          <FaDiscord className='mr-2' color={'#7F8CFC '} size={20} />{' '}
          Discord
        </Button>
      </div>
    </div>
  )
}

export default Profile
