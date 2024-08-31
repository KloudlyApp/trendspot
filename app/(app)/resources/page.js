import getResources from '@/app/api/airtable/resources/get-resources'
import CardGroup from '@/app/components/CardGroup'
import ResourceCard from '@/app/components/ResourceCard'

export default async function Resources() {
  const allResources = await getResources()

  const resources = {
    tiktok: allResources.filter((item) => item.fields.Group === 'tiktok'),
    marketing: allResources.filter((item) => item.fields.Group === 'marketing'),
    legal: allResources.filter((item) => item.fields.Group === 'legal'),
  }

  return (
    <div className='mt-6 lg:mt-8 lg:w-[calc(100vw-28rem)] px-2 lg:h-screen md:gap-10 lg:gap-2 md:h-[50%] md:flex md:flex-col gap-6 flex flex-col'>
      <CardGroup
        title={'TikTok Resources'}
        CardComponent={(props) => <ResourceCard {...props} />}
        data={resources.tiktok}
      />
      <CardGroup
        title={'Marketing Resources'}
        CardComponent={(props) => <ResourceCard {...props} />}
        data={resources.marketing}
      />
      <CardGroup
        title={'Legal Resources'}
        CardComponent={(props) => <ResourceCard {...props} />}
        data={resources.legal}
      />
    </div>
  )
}
