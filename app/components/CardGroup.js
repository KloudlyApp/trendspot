import { CardSkeleton } from './CardShapes'

const CardGroup = ({ title, CardComponent, data }) => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div>
      <div className='lg:px-0 lg:ml-0 px-2'>
        <h2 className='bg-[#7A8EFF] w-fit py-3 px-8 rounded-3xl hover:scale-105 transition-all delay-100 text-white lg:mb-4 capitalize'>
          {title}
        </h2>
      </div>

      <div className='flex gap-3 my-4 overflow-x-scroll h-[20rem]'>
        {!data ?
          skeletons.map((skeleton) => <CardSkeleton key={skeleton} />)
        : data?.length < 1 ?
          <p className='place-self-center text-white text-2xl'>No results.</p>
        : data.map((item) => <CardComponent post={item} key={item.id} />)}
      </div>
    </div>
  )
}
export default CardGroup
