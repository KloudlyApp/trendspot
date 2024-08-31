'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CardSkeleton, LinkPreviewCard } from './CardShapes'

const TikTokCard = ({ post }) => {
  const [previewData, setPreviewData] = useState({})
  const [loading, setLoading] = useState(true)

  const url = post.fields['Full Link']
  const tag = post.fields.Tag

  useEffect(() => {
    async function fetchPreviewData() {
      setLoading(true)
      const response = await fetch(
        `/api/link-preview?url=${encodeURIComponent(url)}`,
      )
      const data = await response.json()

      // If it's a TikTok link and there's no image, fetch from TikTok's embed API
      if (
        url.includes('tiktok.com') &&
        (!data.images || data.images.length === 0)
      ) {
        const tiktokData = await fetchTikTokInfo(url)
        data.title = tiktokData.title
        if (tiktokData.thumbnail_url) {
          data.images = [tiktokData.thumbnail_url]
        } else {
          data.images = ['/images/tiktok_placeholder.jpg']
        }
      }
      setPreviewData(data)
      setLoading(false)
    }

    fetchPreviewData()
  }, [url])

  const fetchTikTokInfo = async (url) => {
    const response = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
    )
    const responseJSON = await response.json()
    return responseJSON
  }

  if (loading) return <CardSkeleton />

  if (!previewData) {
    return null
  }

  return (
    <LinkPreviewCard
      url={url}
      tag={tag}
      image={previewData.images[0]}
      title={previewData.title}
    />
  )
}

export default TikTokCard
