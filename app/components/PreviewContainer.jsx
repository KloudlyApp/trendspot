'use client'

import React, { useEffect, useState } from 'react'
import LinkPreview from './LinkPreview'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

function PreviewContainer() {
  const [sampleData, setSampleData] = useState([])

  useEffect(() => {
    fetch('/api/sample-data')
      .then((response) => response.json())
      .then((data) => setSampleData(data.slice(0, 20))) // this is where you can add different filters to the displayed data
      .catch((error) => console.error('Error: ', error))
  }, [])

  return (
    <>
      <div className=' h-fit my-10  flex justify-center md:hidden '>
        <Carousel className=' w-[80%] '>
          <CarouselContent className=''>
            {sampleData.map((item) => {
              return (
                <CarouselItem
                  key={Math.random() + item.slug}
                  className=' h-full w-[20px]
                  '
                >
                  <Card className='text-white'>
                    {/* <h1>tag: {item.tag}</h1>
                    <h1>type: {item.type}</h1>
                    <h1>niche: {item.niche}</h1>
                    <h1>trendingDate: {item.trendingDate}</h1> */}
                    <CardContent className='flex  items-center justify-center p-6'>
                      <LinkPreview
                        url={`https://www.tiktok.com/t/${item.slug}`}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className='bg-black hover:bg-black' />
          <CarouselNext className='bg-black hover:bg-black' />
        </Carousel>
      </div>

      <div className='grid grid-cols-4'>
        {sampleData.map((item) => {
          return (
            <Card className='text-white' key={item+Math.random()}>
              <CardContent className='flex  items-center justify-center h-full'>
                <LinkPreview url={`https://www.tiktok.com/t/${item.slug}`} />
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default PreviewContainer
