'use client'

import React, { useEffect, useState } from 'react'
import LinkPreview from './LinkPreview'
import { Card, CardContent } from '@/components/ui/card'
import { useGlobalContext } from '../context/filterContext'

function PreviewContainer() {
  const [sampleData, setSampleData] = useState([])

  useEffect(() => {
    fetch('/api/sample-data')
      .then((response) => response.json())
      .then((data) => {
        // Sort the data by trendingDate from oldest to latest
        const sortedData = data.sort(
          (a, b) => new Date(a.trendingDate) - new Date(b.trendingDate),
        )

        // console.log('Sorted Sample Data:', sortedData); // Debugging

        setSampleData(sortedData.slice(0, 20))
      })
      .catch((error) => console.error('Error: ', error))
  }, [])

  const { selectedCategory, selectedDate } = useGlobalContext()

  useEffect(() => {
    // console.log('Selected Date useEffect:', selectedDate); // Debugging
  }, [selectedDate])

  const filterByDate = sampleData?.filter((item) => {
    const itemDate = new Date(item.trendingDate).getTime()
    const selected = new Date(selectedDate).getTime()

    // console.log('Item Date:', itemDate, 'Selected Date:', selected); // Debugging

    return itemDate > selected
  })

  // console.log('Filtered by date finally:', filterByDate); // Debugging

  const filteredItems = filterByDate?.filter(
    (item) => item.niche === selectedCategory,
  )

  // console.log('Filtered Items finally:', filteredItems); // Debugging

  return (
    <>
      <div className='w-full flex my-4 lg:hidden'>
        <div
          className='flex flex-row !overflow-x-scroll w-full gap-4'
          style={{ overflowX: 'scroll' }}
        >
          {/* {filteredItems?.map((item, index) => {
            return (
              <div key={index} className='flex-none'>
                <LinkPreview url={`https://www.tiktok.com/t/${item.slug}`} />
              </div>
            )
            

          })} */}

          {filteredItems.length < 1
            ? sampleData?.map((item, index) => {
                return (
                  <div key={index} className='flex-none'>
                    <LinkPreview
                      url={`https://www.tiktok.com/t/${item.slug}`}
                    />
                  </div>
                )
              })
            : filteredItems?.map((item, index) => {
                return (
                  <div key={index} className='flex-none'>
                    <LinkPreview
                      url={`https://www.tiktok.com/t/${item.slug}`}
                    />
                  </div>
                )
              })}
        </div>
      </div>

      <div className='lg:grid grid-cols-4 hidden gap-5 '>
      {filteredItems.length < 1
            ? sampleData?.map((item, index) => {
                return (
                  <div key={index} className='flex-none'>
                    <LinkPreview
                      url={`https://www.tiktok.com/t/${item.slug}`}
                    />
                  </div>
                )
              })
            : filteredItems?.map((item, index) => {
                return (
                  <div key={index} className='flex-none'>
                    <LinkPreview
                      url={`https://www.tiktok.com/t/${item.slug}`}
                    />
                  </div>
                )
              })}
      </div>
    </>
  )
}

export default PreviewContainer
