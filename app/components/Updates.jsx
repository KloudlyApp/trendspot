import { UpdatesCarousel } from './UpdatesCarousel'
import serverGetUpdates from '../api/airtable/updates/server-get-updates'

export default async function Updates() {
  let updates = await serverGetUpdates()

  if (updates.length < 1) {
    updates = [
      {
        id: 'placeholder',
        fields: {
          Date: new Date(),
          Body: 'Welcome to Trendspot!',
        },
      },
    ]
  }

  return (
    <div className='h-full flex justify-center items-center md:mt-4 md:mb-8 lg:mb-0'>
      <UpdatesCarousel data={updates} />
    </div>
  )
}
