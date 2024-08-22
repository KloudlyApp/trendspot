import { Button } from '@/components/ui/button'

import React from 'react'
import { GiPoliceOfficerHead } from 'react-icons/gi'
import { FaDiscord } from 'react-icons/fa'

function Profile() {
  return (
    <div className='flex items-center flex-col gap-4  md:px-2  lg:px-4 mt-2 lg:h-fit '>
      <h1 className='text-3xl mt-6 lg:mt-2  lg:text-4xl font-black text-[#7A8EFF]'>trendspot</h1>
      <div className='mt-6 bg-[#7A8EFF] p-2 md:p- 6 rounded-full md:rounded-lg md:w-1/2 md:h-[150px] lg:mt-2 md:flex items-center justify-center'>
        <GiPoliceOfficerHead size={60} color='white' />
      </div>

      <p className='font-bold mt-4  lg:mt-2  text-white '>Kevin Porter</p>

      <div className='flex  gap-2 '>
        <Button
          variant='ghost'
          className='bg-[#7A8EFF] hover:scale-105 transition-all delay-100 hover:!bg-[#7A8EFF] text-white'
        >
          Dashboard
        </Button>
        <Button
          variant='ghost'
          className='bg-[#7A8EFF] hover:scale-105 transition-all delay-100 hover:!bg-[#7A8EFF] text-white'
        >
          Resources
        </Button>
        <Button
          variant='ghost'
          className='bg-[#7A8EFF] hover:scale-105 transition-all delay-100 hover:!bg-[#7A8EFF] text-white'
        >
          <FaDiscord className='mr-2' size={20} /> Discord
        </Button>
      </div>
    </div>
  )
}

export default Profile
