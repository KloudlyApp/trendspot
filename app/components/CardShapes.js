import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export const CardShape = ({ children }) => {
  return (
    <div className='h-[18.5rem] w-[12.5rem] rounded-xl overflow-hidden flex-shrink-0 hover:scale-[102%] duration-150 transition-all'>
      {children}
    </div>
  )
}

export const CardSkeleton = () => {
  return (
    <CardShape>
      <Skeleton className='h-full w-full' />
    </CardShape>
  )
}

export const LinkPreviewCard = ({ url, image, title, tag }) => {
  return (
    <CardShape>
      <Link
        key={url}
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex gap-72 rounded-2xl shadow-md overflow-hidden relative w-full'
      >
        {tag && (
          <div className='h-10 w-fit flex justify-center items-center bg-[#857FFF]/60 text-nowrap px-4 text-white text-center rounded-ts-2xl rounded-ee-2xl absolute'>
            {tag}
          </div>
        )}
        <div className='w-full  flex'>
          <img
            src={image}
            alt={title}
            className='object-cover h-[18.5rem] w-[12.5rem]'
          />
        </div>

        <div className='absolute inset-x-0 bottom-0 bg-[#857FFF]/60 p-4 flex place-items-center h-16'>
          <h1 className='font-bold text-white overflow-hidden text-ellipsis whitespace-normal break-words max-h-11 text-sm'>
            {title}
          </h1>
        </div>
      </Link>
    </CardShape>
  )
}
