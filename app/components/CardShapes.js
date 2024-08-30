import { Skeleton } from '@/components/ui/skeleton'

const CardShape = ({ children }) => {
  return (
    <div className='h-[18.5rem] w-[12.5rem] rounded-xl overflow-hidden flex-shrink-0'>
      {children}
    </div>
  )
}
export default CardShape

export const CardSkeleton = () => {
  return (
    <CardShape>
      <Skeleton className='h-full w-full' />
    </CardShape>
  )
}
