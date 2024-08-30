'use client'
import { useEffect, useState } from 'react'
import { useFilterContext } from '../context/filterContext'
import CardGroup from './CardGroup'
import TikTokCard from './TikTokCard'
import moment from 'moment'

const CardSection = () => {
  const { filterNiche, filterDate, filterByTag } = useFilterContext()

  const [allPosts, setAllPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/airtable/posts?niche=${filterNiche.fields.Name}&date=${moment(filterDate).format('YYYY-MM-DD')}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      setAllPosts(data)
    }

    fetchPosts()
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
