'use client'

import React, { useEffect, useState } from 'react'
import LinkPreview from './LinkPreview'
import { useGlobalContext } from '../context/filterContext'
import { Heading1Icon } from 'lucide-react'

function LinkPreviewContainer({videoType}) {
  const [sampleData, setSampleData] = useState([])
  const {
    selectedCategory,
    selectedDate,
    filterByDateArray,
    setfilterByDateArray,
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
    if (selectedDate) {
      const filterByDate = sampleData?.filter((item) => {
        const itemDate = new Date(item.trendingDate).getTime()
        const selected = new Date(selectedDate).getTime()
        return itemDate < selected
      })
      setfilterByDateArray(filterByDate)
    }
  }, [selectedDate, sampleData, setfilterByDateArray])

  const filteredItemsByLiveStream = filterByDateArray?.filter(
    (item) =>
      item.niche === selectedCategory && item.type === videoType,
  )

  return (
    <>
      <div className='w-full flex my-4 lg:hidden'>
        <div
          className='flex flex-row !overflow-x-scroll w-full gap-4'
          style={{ overflowX: 'scroll' }}
        >
          {filteredItemsByLiveStream.length < 1 ? (
          <p className='text-white px-4  '>There is no video in this category during this date or the data is fetching currently.</p>
          ) : (
            filteredItemsByLiveStream?.map((item, index) => (
              <div key={index} className='flex-none'>
                <LinkPreview url={`https://www.tiktok.com/t/${item.slug}`} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`lg:grid grid-cols-4 hidden gap-5  ${filteredItemsByLiveStream.length < 1 && 'grid-cols-1'}`}>
        {filteredItemsByLiveStream.length < 1 ? (
         <p className='text-white  text-nowrap'>There is no video in this category in this time frame or the data is fetching currently.</p>
        ) : (
          filteredItemsByLiveStream?.map((item, index) => (
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
