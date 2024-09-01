'use client'

import { useEffect, useState } from 'react'
import { useFilterContext } from '../context/filterContext'
import CardGroup from './CardGroup'
import TikTokCard from './TikTokCard'
import getQueriedPosts from '../api/airtable/posts/get-queried-posts'

const CardSection = () => {
  const { filterNiche, filterDate, filterByTag } = useFilterContext()

  const [allPosts, setAllPosts] = useState([])
  useEffect(() => {
    const initialize = async () => {
      const posts = await getQueriedPosts(
        filterNiche?.fields?.Name || 'error',
        filterDate,
      )
      setAllPosts(posts)
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
      />
      <CardGroup
        title={'top video products'}
        CardComponent={(props) => <TikTokCard {...props} />}
        data={videoProducts}
      />
      <CardGroup
        title={'top livestream products'}
        CardComponent={(props) => <TikTokCard {...props} />}
        data={livestreamProducts}
      />
    </>
  )
}
export default CardSection
