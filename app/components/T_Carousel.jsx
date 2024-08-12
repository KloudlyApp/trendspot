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
      <div className=' lg:hidden place-self-center '>
        <Carousel
          setApi={setApi}
          className='w-full max-w-xs '
          opts={{ loop: false }}
        >
          <CarouselContent className='h-[400px]'>
            {information?.map(({ randomDate, update }) => (
              <CarouselItem
                key={update}
                className=' hover:scale-105 transition-all delay-100 '
              >
                <Card className='h-full'>
                  <CardContent className='flex  items-center justify-center p-6 h-[400px]'>
                    <UpdateCard date={randomDate} message={update} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='bg-black hover:bg-black'/>
          <CarouselNext className='bg-black hover:bg-black' />
        </Carousel>
        <div className='py-2 text-center text-sm text-muted-foreground text-white hidden'>
          Update {current}.
        </div>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        orientation='vertical'
        className='w-full max-w-xs hidden lg:flex '
      >
        <CarouselContent className='-mt-0 h-[300px] '>
          {information?.map(({ randomDate, update }) => (
            <CarouselItem
              key={update}
              className='hover:scale-105 transition-all delay-100'
            >
              <Card className=''>
                <CardContent className='flex  rounded items-center justify-center  gap-3  '>
                  <UpdateCard date={randomDate} message={update} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious  className='bg-black hover:bg-black'/>
        <CarouselNext  className='bg-black hover:bg-black'/>
      </Carousel>
    </>
  )
}
