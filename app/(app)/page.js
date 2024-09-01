import FilterCard from '../components/FilterCard'
import { FilterStateProvider } from '../context/filterContext'
import CardSection from '../components/CardSection'

export default async function Home() {
  return (
    <div className='mt-6 lg:mt-0 md:h-[50%] lg:w-[calc(100vw-28rem)] px-2 lg:h-screen flex flex-col gap-6 md:gap-10 lg:gap-2'>
      <FilterStateProvider>
        <FilterCard />
        <CardSection />
      </FilterStateProvider>
    </div>
  )
}
