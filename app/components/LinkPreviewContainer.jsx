'use client'

import React, { useEffect, useState } from 'react'
import LinkPreview from './LinkPreview'
import { useGlobalContext } from '../context/filterContext'
import { Skeleton } from '@/components/ui/skeleton'

function LinkPreviewContainer({ videoType }) {
  const [sampleData, setSampleData] = useState(null)
  const {
    selectedNiche,
    selectedDate,
    filterByDateArray,
    setFilterByDateArray,
    filterByTag,
    setFilterByTag,
  } = useGlobalContext()

  useEffect(() => {
    fetch('/api/sample-data')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(a.trendingDate) - new Date(b.trendingDate),
        )
        setSampleData(sortedData.slice(0, 100))
      })
      .catch((error) => console.error('Error: ', error))
  }, [])

  useEffect(() => {
    if (selectedDate && sampleData) {
      const filterByDate = sampleData.filter((item) => {
        const itemDate = new Date(item.trendingDate).toLocaleDateString()
        const selected = new Date(selectedDate).toLocaleDateString()

        return itemDate === selected
      })
      setFilterByDateArray(filterByDate)
    }
  }, [selectedDate, sampleData, setFilterByDateArray])

  if (!sampleData) {
    return (
      <div className='flex gap-3 my-4 mx-4'>
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton
            key={index}
            className='h-[18.5rem] w-[12.5rem] rounded-xl'
          />
        ))}
      </div>
    )
  }
  const filteredItemsByTag =
    filterByTag ?
      filterByDateArray.filter((item) => item.tag)
    : filterByDateArray

  const filteredItemsByLiveStream = filteredItemsByTag?.filter(
    (item) => item.niche === selectedNiche && item.type === videoType,
  )

  return (
    <>
      <div className='w-full flex my-4 lg:hidden'>
        <div
          className={`flex flex-row  w-full gap-4 ${filteredItemsByLiveStream.length < 1 ? '!overflow-x-hidden' : 'overflow-x-scroll'}`}
        >
          {filteredItemsByLiveStream.length < 1 ?
            <p className='h-[260px] ml-4 text-center flex items-center justify-center my-auto text-white'>
              There is no video in this category during this date or the data is
              fetching currently.
            </p>
          : filteredItemsByLiveStream.map((item, index) => (
              <div key={index} className='flex-none'>
                <LinkPreview url={`https://www.tiktok.com/t/${item.slug}`} />
              </div>
            ))
          }
        </div>
      </div>

      <div
        className={`lg:flex   hidden gap-5 ${
          filteredItemsByLiveStream.length < 1 ?
            'grid-cols-1 !overflow-x-hidden'
          : 'overflow-x-scroll'
        }`}
      >
        {filteredItemsByLiveStream.length < 1 ?
          <p className='text-white text-nowrap h-[260px] text-center  flex items-center justify-center  my-auto align-middle '>
            There is no video in this category in this time frame or the data is
            fetching currently.
          </p>
        : filteredItemsByLiveStream.map((item, index) => (
            <div key={index} className='flex-none py-2'>
              <LinkPreview
                url={`https://www.tiktok.com/t/${item.slug}`}
                tag={item.tag}
              />
            </div>
          ))
        }
      </div>
    </>
  )
}

export default LinkPreviewContainer
