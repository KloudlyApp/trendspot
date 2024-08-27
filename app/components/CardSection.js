'use client'
import { useEffect, useState } from 'react'
import { useFilterContext } from '../context/filterContext'
import CardGroup from './CardGroup'
import TikTokCard from './TikTokCard'
import formatDateYYYYMMDD from '@/lib/formatDateYYYYMMDD'

const CardSection = () => {
  const { filterNiche, filterDate, filterByTag } = useFilterContext()

  const [allPosts, setAllPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/airtable/posts?niche=${filterNiche.fields.Name}&date=${formatDateYYYYMMDD(filterDate)}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      console.log('data', data)
      setAllPosts(data)
    }

    fetchPosts()
  }, [filterNiche, filterDate])

  let posts = allPosts
  if (filterByTag) {
    posts = posts?.filter((item) => item.fields.Tag)
  }

  const videoProducts = posts?.filter(
    (item) => item.fields.Type === 'Video product',
  )
  const livestreamProducts = posts?.filter(
    (item) => item.fields.Type === 'Livestream product',
  )
  const trendingVideos = posts?.filter(
    (item) => item.fields.Type === 'Trending video',
  )

  return (
    <>
      <CardGroup
        title={'top video products'}
        cards={<TikTokCard />}
        data={videoProducts}
      />
      <CardGroup
        title={'top livestream products'}
        cards={<TikTokCard />}
        data={livestreamProducts}
      />
      <CardGroup
        title={'top trending videos'}
        cards={<TikTokCard />}
        data={trendingVideos}
      />
    </>
  )
}
export default CardSection
