'use client'

import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import UpdateCard from './UpdateCard'

export function TrendSpotCarouselUpdate({ information }) {
  const [api, setApi] = React.useState(null)
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      
      {/* Small Screen */}
      <div className=' md:hidden place-self-center  '>
        <Carousel
          setApi={setApi}
          className='w-full max-w-xs '
          opts={{ loop: false }}
        >
          <CarouselContent className='h-[300px]'>
            {information?.map((update, idx) => (
              <CarouselItem
                key={idx}
                className=' hover:scale-105 transition-all delay-100 '
              >
                <Card className='h-full'>
                  <CardContent className='flex  items-center justify-center p-6 h-[300px]'>
                    <UpdateCard
                      date={update?.posted_date}
                      message={update?.body}
                      img_url={update?.img_url}
                      link_text={update?.link_text}
                      link_href={update?.link_href}
                      id={update?.id}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='bg-black hover:bg-black hover:bg-black/20 border-none' />
          <CarouselNext className='bg-black hover:bg-black hover:bg-black/20 border-none' />
        </Carousel>



  
      </div>

        {/* Mid Screen */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        orientation='vertical'
        className='w-full max-w-xs hidden md:flex lg:hidden  justify-center items-center lg:py-2  '
      >
        <CarouselContent className='-mt-0 h-[400px] my-2 '>
          {information?.map((update, idx) => (
            <CarouselItem
              key={idx}
              className='hover:scale-105 transition-all delay-100 mt-2 hover:rounded-md md:basis-1/3'
            >
              <Card className=''>
                <CardContent className='flex   items-center justify-center gap-3  h-[300px] hover:my-2 rounded-md text-white  '>
                  <UpdateCard
                    date={update?.posted_date}
                    message={update?.body}
                    img_url={update?.img_url}
                    link_text={update?.link_text}
                    link_href={update?.link_href}
                    id={update?.id}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='bg-black/20 hover:bg-black/20 border-none' />
        <CarouselNext className='bg-black/20 hover:bg-black/20 border-none mb-4' />
      </Carousel>



      {/* Large Screen  */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        orientation='vertical'
        className='w-full max-w-xs hidden lg:flex  justify-center items-center lg:py-2  '
      >
        <CarouselContent className='-mt-0 h-[600px] my-2 '>
          {information?.map((update, idx) => (
            <CarouselItem
              key={idx}
              className='hover:scale-105 transition-all delay-100 mt-2 hover:rounded-md lg:basis-1/3'
            >
              <Card className=''>
                <CardContent className='flex   items-center justify-center gap-3  h-[300px] hover:my-2 rounded-md text-white  '>
                  <UpdateCard
                    date={update?.posted_date}
                    message={update?.body}
                    img_url={update?.img_url}
                    link_text={update?.link_text}
                    link_href={update?.link_href}
                    id={update?.id}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='bg-black/20 hover:bg-black/20 border-none' />
        <CarouselNext className='bg-black/20 hover:bg-black/20 border-none' />
      </Carousel>
    </>
  )
}
