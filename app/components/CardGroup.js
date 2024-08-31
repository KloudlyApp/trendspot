import { CardSkeleton } from './CardShapes'

const CardGroup = ({ title, CardComponent, data }) => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div>
      <div className='px-0 ml-0'>
        <h2 className='bg-[#857FFF] w-fit py-3 px-8 rounded-3xl text-white lg:mb-4 capitalize'>
          {title}
        </h2>
      </div>

      <div className='flex gap-3 py-4 overflow-x-scroll overflow-y-visible h-[22rem]'>
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
