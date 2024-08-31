'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useFilterContext } from '../context/filterContext'
import { IoClose } from 'react-icons/io5'
import moment from 'moment'

function FilterCard({ niches, userData }) {
  const [date, setDate] = useState(new Date())
  const [toggleCalendar, setToggleCalendar] = useState(false)
  const {
    filterNiche,
    setFilterNiche,
    filterDate,
    setFilterDate,
    filterByTag,
    setFilterByTag,
  } = useFilterContext()

  const handleNicheChange = (id) => {
    const filterNiche = niches.find((niche) => niche.id === id)
    fetch('/api/airtable/users/update-latest-niche', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userData.id,
        nicheID: filterNiche.id,
      }),
    })
    setFilterNiche(filterNiche)
  }

  const dateSelect = (filterDate) => {
    const currentTime = new Date()

    const combinedDate = new Date(
      filterDate.getFullYear(),
      filterDate.getMonth(),
      filterDate.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes(),
      currentTime.getSeconds(),
    )

    setDate(filterDate)
    setFilterDate(combinedDate.toISOString())
    setToggleCalendar(!toggleCalendar)
  }

  const formattedDate =
    filterDate ? moment(filterDate).format('MMM Do, YYYY') : 'Select Date'

  return (
    <div className='flex flex-col text-white md:w-full lg:mt-8 lg:mb-4 lg:w-full px-2 md:px-1 lg:px-0 mb-2 relative'>
      <div className='flex w-full items-center justify-center  py-4 rounded-md shadow-[#857fff] shadow-md bg-black'>
        <div className='flex justify-evenly w-[90%] md:w-[60%]'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='hover:scale-105 hover:text-[#857fff] transition-all cursor-pointer capitalize'>
                {filterNiche.fields.Name}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuRadioGroup
                value={filterNiche.id}
                onValueChange={handleNicheChange}
              >
                {niches.map((niche) => {
                  return (
                    <DropdownMenuRadioItem value={niche.id} key={niche.id}>
                      {niche.fields.Name}
                    </DropdownMenuRadioItem>
                  )
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='relative'>
            <p
              className='cursor-pointer hover:scale-105 hover:text-[#857fff] transition-all'
              onClick={() => {
                setToggleCalendar(!toggleCalendar)
              }}
            >
              {formattedDate}
            </p>
          </div>
          <p
            className='hover:scale-105 hover:text-[#857fff] transition-all cursor-pointer'
            onClick={() => {
              setFilterByTag(!filterByTag)
            }}
          >
            {filterByTag ? 'All' : 'Tagged Only'}
          </p>
        </div>
      </div>

      {toggleCalendar && (
        <div className='bg-black/80 z-50 h-screen w-screen fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center'>
          <div className='flex justify-center items-center flex-col w-fit mx-auto mt-4 top-28 z-30 lg:-top-32 lg:left-48 relative'>
            <div
              className='self-end ml-auto mb-4'
              onClick={() => {
                setToggleCalendar(false)
              }}
            >
              <IoClose size={40} className='justify-self-end align-self-end' />
            </div>
            <Calendar
              mode='single'
              selected={date}
              onSelect={dateSelect}
              className='rounded-md bg-[#5A53A7]'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterCard
