'use client'

import React, { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGlobalContext } from '../context/filterContext'
import { IoClose } from 'react-icons/io5'

function DetailCard() {
  const [date, setDate] = useState(new Date())
  const [toggleCalendar, setToggleCalendar] = useState(false)
  const {
    selectedCategory,
    setSelectedCategory,
    selectedDate,
    setSelectedDate,
    filterByTag,
    setfilterByTag,
  } = useGlobalContext()

  const dropDownSelect = (value) => {
    setSelectedCategory(value)
  }

  const dateSelect = (selectedDate) => {
    const currentTime = new Date()

    const combinedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes(),
      currentTime.getSeconds(),
    )

    setDate(selectedDate)
    setSelectedDate(combinedDate.toISOString())
    setToggleCalendar(!toggleCalendar)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    const formattedDate = date.toLocaleDateString('en-US', options)

    const day = date.getUTCDate()
    const daySuffix = getDaySuffix(day)

    return formattedDate.replace(day, `${day}${daySuffix}`)
  }

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const strippedDate = selectedDate ? formatDate(selectedDate) : 'Select Date'

  return (
    <div className='flex flex-col text-white md:w-full lg:mb-4 lg:w-full lg:p-4 py-4 relative'>
      <div className='flex w-full items-center justify-center my-12 py-4 rounded-md shadow-[#7A8EFF] shadow-md bg-black'>
        <div className='flex justify-evenly w-[90%] md:w-[60%]'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='hover:scale-105 transition-all delay-100 cursor-pointer'>
                Category
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Filter based on category.</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedCategory}
                onValueChange={dropDownSelect}
              >
                <DropdownMenuRadioItem value='tech'>Tech</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='travel'>
                  Travel
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='health'>
                  Health
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='food'>Food</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='beauty'>
                  Beauty Product
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='relative'>
            <p
              className='cursor-pointer hover:scale-105 transition-all delay-100'
              onClick={() => {
                setToggleCalendar(!toggleCalendar)
              }}
            >
              {strippedDate}
            </p>
          </div>
          <p className='hover:scale-105 transition-all delay-100 cursor-pointer' onClick={()=>{setfilterByTag(!filterByTag)}}>
            {filterByTag ? 'Tagged': 'All'}
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

export default DetailCard
