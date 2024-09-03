'use client'

import { useEffect, useState } from 'react'
import { useFilterContext } from '../context/filterContext'
import CardGroup from './CardGroup'
import TikTokCard from './TikTokCard'
import getQueriedPosts from '../api/airtable/posts/get-queried-posts'
import getActiveNiches from '../api/airtable/niches/get-active-niches'

const CardSection = () => {
  const { filterNiche, filterDate, filterByTag } = useFilterContext()

  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initialize = async () => {
      setLoading(true)

      const niches = await getActiveNiches()
      const posts = await getQueriedPosts(
        filterNiche?.fields?.Name || niches?.[0]?.fields?.Name,
        filterDate,
      )
      setAllPosts(posts)

      setLoading(false)
    }

    initialize()
  }, [filterNiche, filterDate])

  let posts = allPosts
  if (filterByTag) {
    posts = posts?.filter((item) => item.fields.Tag)
  }

  const trendingVideos = posts?.filter(
    (item) => item.fields.Type === 'Trending video',
  )
  const videoProducts = posts?.filter(
    (item) => item.fields.Type === 'Video product',
  )
  const livestreamProducts = posts?.filter(
    (item) => item.fields.Type === 'Livestream product',
  )

  return (
    <>
      <CardGroup
        title={'top trending videos'}
        CardComponent={(props) => <TikTokCard {...props} />}
        data={trendingVideos}
        loading={loading}
      />
      <CardGroup
        title={'top video products'}
        CardComponent={(props) => <TikTokCard {...props} />}
        data={videoProducts}
        loading={loading}
      />
      <CardGroup
        title={'top livestream products'}
        CardComponent={(props) => <TikTokCard {...props} />}
        data={livestreamProducts}
        loading={loading}
      />
    </>
  )
}
export default CardSection
