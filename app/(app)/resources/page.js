import getResources from '@/app/api/airtable/resources/get-resources'
import CardGroup from '@/app/components/CardGroup'
import ResourceCard from '@/app/components/ResourceCard'

export default async function Resources() {
  const allResources = await getResources()

  console.log('all resources')
  console.dir(allResources, { depth: null })

  const resources = {
    tiktok: allResources.filter((item) => item.fields.Group === 'tiktok'),
    marketing: allResources.filter((item) => item.fields.Group === 'marketing'),
    legal: allResources.filter((item) => item.fields.Group === 'legal'),
  }

  return (
    <div className='mt-6 lg:w-screen lg:h-screen lg:overflow-y-scroll   md:gap-10 lg:gap-2 md:h-[50%] md:flex md:flex-col lg:mt-6 px-4 gap-6 flex flex-col'>
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
