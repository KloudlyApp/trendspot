'use client'

import React, { useEffect, useState } from 'react'
import LinkPreview from './LinkPreview'
import { useGlobalContext } from '../context/filterContext'
import { Skeleton } from '@/components/ui/skeleton'

function LinkPreviewContainer({ videoType }) {
  const [sampleData, setSampleData] = useState(null)
  const {
    selectedCategory,
    selectedDate,
    filterByDateArray,
    setfilterByDateArray,
    filterByTag,
    setfilterByTag,
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
      setfilterByDateArray(filterByDate)
    }
  }, [selectedDate, sampleData, setfilterByDateArray])

  if (!sampleData) {
    return (
      <div className='flex gap-3 my-4 mx-4'>
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className='h-[260px] w-[300px] rounded-xl' />
        ))}
      </div>
    )
  }
  const filteredItemsByTag = filterByTag
  ? filterByDateArray.filter((item) => item.tag)
  : filterByDateArray


  const filteredItemsByLiveStream = filteredItemsByTag?.filter(
    (item) => item.niche === selectedCategory && item.type === videoType,
  )

  return (
    <>
      <div className='w-full flex my-4 lg:hidden'>
        <div
          className='flex flex-row !overflow-x-scroll w-full gap-4'
          style={{ overflowX: 'scroll' }}
        >
          {filteredItemsByLiveStream.length < 1 ? (
            <p className='text-white px-4'>
              There is no video in this category during this date or the data is
              fetching currently.
            </p>
          ) : (
            filteredItemsByLiveStream.map((item, index) => (
              <div key={index} className='flex-none'>
                <LinkPreview url={`https://www.tiktok.com/t/${item.slug}`} />
              </div>
            ))
          )}
        </div>
      </div>

      <div
        className={`lg:flex overflow-x-scroll   hidden gap-5 ${
          filteredItemsByLiveStream.length < 1 && 'grid-cols-1'
        }`}
      >
        {filteredItemsByLiveStream.length < 1 ? (
          <p className='text-white text-nowrap'>
            There is no video in this category in this time frame or the data is
            fetching currently.
          </p>
        ) : (
          filteredItemsByLiveStream.map((item, index) => (
            <div key={index} className='flex-none'>
              <LinkPreview url={`https://www.tiktok.com/t/${item.slug}`} />
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default LinkPreviewContainer
