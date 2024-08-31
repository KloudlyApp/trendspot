import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import UpdateCard from './UpdateCard'

export function UpdatesCarousel({ data }) {
  const validData =
    data?.filter(
      (update) =>
        update && update.fields && update.fields.Body && update.fields.Date,
    ) || []

  const renderCarouselItem = (update, idx) => (
    <CarouselItem key={update.id || idx} className='mt-2'>
      <Card>
        <CardContent className='flex items-center justify-center gap-3 h-[300px] my-2 rounded-md text-white'>
          <UpdateCard
            date={update.fields.Date}
            body={update.fields.Body}
            img_url={update.fields.Image?.[0]?.url}
            link_text={update.fields['Link Text']}
            link_url={update.fields['Link URL']}
            id={update.id}
          />
        </CardContent>
      </Card>
    </CarouselItem>
  )

  const carouselButtons = () => (
    <>
      <CarouselPrevious className='bg-[#857FFF]/20 border-none hover:bg-[#857FFF]/80' />
      <CarouselNext className='bg-[#857FFF]/20 border-none hover:bg-[#857FFF]/80' />
    </>
  )

  return (
    <>
      {/* Small Screen */}
      <div className='md:hidden place-self-center'>
        <Carousel className='w-full max-w-xs ' opts={{ loop: false }}>
          <CarouselContent className='h-[300px] my-2'>
            {validData.map(renderCarouselItem)}
          </CarouselContent>
          {carouselButtons()}
        </Carousel>
      </div>

      {/* Mid Screen */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        orientation='vertical'
        className='hidden md:flex lg:hidden w-full max-w-xs justify-center items-center'
      >
        <CarouselContent className='h-[310px] my-2 '>
          {validData.map(renderCarouselItem)}
        </CarouselContent>
        {carouselButtons()}
      </Carousel>

      {/* Large Screen  */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        orientation='vertical'
        className='hidden lg:flex w-full max-w-xs justify-center items-center py-2'
      >
        <CarouselContent className='h-[310px] my-2 '>
          {validData.map(renderCarouselItem)}
        </CarouselContent>
        {carouselButtons()}
      </Carousel>
    </>
  )
}
