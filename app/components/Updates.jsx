import { UpdatesCarousel } from './UpdatesCarousel'
import getUpdates from '../api/airtable/updates/get-updates'

export default async function Updates() {
  const updates = await getUpdates()

  return (
    <div className='h-full flex justify-center items-center md:mt-4 md:mb-8 lg:mb-0'>
      {updates.length > 0 ?
        <UpdatesCarousel data={updates} />
      : <p className='text-white'>Loading updates...</p>}
    </div>
  )
}
