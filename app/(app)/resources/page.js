'use client'

import { useState, useEffect } from 'react'
import getResources from '@/app/api/airtable/resources/get-resources'
import CardGroup from '@/app/components/CardGroup'
import ResourceCard from '@/app/components/ResourceCard'

export default function Resources() {
  const GROUPS = ['TikTok Resources', 'Content Resources', 'Other Resources']

  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState(
    Object.fromEntries(GROUPS.map((group) => [group, []])),
  )

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)

      const allResources = await getResources()
      const groupedResources = GROUPS.reduce((accumulator, group) => {
        accumulator[group] = allResources.filter(
          (item) => item.fields.Group === group,
        )
        return accumulator
      }, {})
      setResources(groupedResources)

      setLoading(false)
    }

    fetchResources()
  }, [])

  return (
    <div className='mt-6 lg:mt-8 lg:w-[calc(100vw-28rem)] px-2 lg:h-screen md:gap-10 lg:gap-2 md:h-[50%] md:flex md:flex-col gap-6 flex flex-col'>
      {GROUPS.map((group) => (
        <CardGroup
          key={group}
          title={group}
          CardComponent={(props) => <ResourceCard {...props} />}
          data={resources[group]}
          loading={loading}
        />
      ))}
    </div>
  )
}
