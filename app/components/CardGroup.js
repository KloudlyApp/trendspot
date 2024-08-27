import TikTokCard from './TikTokCard'
import { Skeleton } from '@/components/ui/skeleton'

const CardGroup = ({ title, cards, data }) => {
  console.log('data for', title, data)

  return (
    <div className='md:mb-8'>
      <div className=' flex items-center justify-start lg:px-0 lg:ml-0 px-2 lg:my-2'>
        <h2 className='bg-[#7A8EFF]  w-fit py-3 px-8 rounded-3xl hover:scale-105 transition-all delay-100  text-white lg:mb-4 capitalize'>
          {title}
        </h2>
      </div>

      {/* {!data ?
        <div className='flex gap-3 my-4 mx-4'>
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={index}
              className='h-[18.5rem] w-[12.5rem] rounded-xl'
            />
          ))}
        </div>
      :  */}
      <div
        className={`
        w-full flex my-4
        lg:gap-5
        ${
          data?.length < 1 ?
            'overflow-x-hidden lg:grid-cols-1'
          : 'overflow-x-scroll'
        }
      `}
      >
        {data?.length < 1 ?
          <p
            className='
          h-[260px] ml-4 text-center flex items-center justify-center my-auto
          text-white text-2xl
          lg:text-nowrap lg:ml-0
        '
          >
            No results.
          </p>
        : data?.map((item) => (
            <div key={item.id} className='flex-none lg:py-2'>
              <TikTokCard post={item} />
            </div>
          ))
        }
      </div>
      {/* } */}
    </div>
  )
}
export default CardGroup
