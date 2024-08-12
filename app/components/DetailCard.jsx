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

function DetailCard() {
  const [date, setDate] = useState(new Date())
  const [toggleCalendar, setToggleCalendar] = useState(false)
  const {
    selectedCategory,
    setSelectedCategory,
    selectedDate,
    setSelectedDate,
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

    setDate(date)
    setSelectedDate(combinedDate.toISOString())
    setToggleCalendar(!toggleCalendar)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getUTCDate().toString().padStart(2, '0')
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day}-${month}-${year}`
  }

 
  const strippedDate = selectedDate ? formatDate(selectedDate) : 'Select Date'

  return (
    <div className='flex flex-col text-white lg:mb-4 lg:w-full lg:p-4 p-4'>
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
                  <DropdownMenuRadioItem value='all'>
                  All
                </DropdownMenuRadioItem>
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
          <p className='hover:scale-105 transition-all delay-100 cursor-pointer'>
            Filter
          </p>
        </div>
      </div>

      {toggleCalendar && (
        <Calendar
          mode='single'
          selected={date}
          onSelect={dateSelect}
          className='rounded-md justify-center item-center w-fit mx-auto bg-[#5A53A7] mt-4'
        />
      )}
    </div>
  )
}

export default DetailCard

