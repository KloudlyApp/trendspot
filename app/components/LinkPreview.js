import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'


const cache = {}
const CACHE_DURATION = 60 * 60 * 1000

const LinkPreview = ({ url }) => {
  const [previewData, setPreviewData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPreviewData = async () => {
      const cachedData = cache[url]

      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        // Use cached data if it's still fresh
        setPreviewData(cachedData.data)
        setLoading(false)
      } else {
        try {
          const response = await fetch(
            `/api/link-preview?url=${encodeURIComponent(url)}`,
          )
          if (!response.ok) throw new Error('Failed to fetch preview')
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

          // Cache the data with a timestamp
          cache[url] = { data, timestamp: Date.now() }
          setPreviewData(data)
        } catch (err) {
          console.error('Error fetching link preview:', err)
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchPreviewData()
  }, [url])

  const fetchTikTokInfo = async (url) => {
    try {
      const response = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      )
      const responseJSON = await response.json()
      return responseJSON
    } catch (error) {
      console.error('Error fetching TikTok embed info:', error)
      return {}
    }
  }

  if (loading) return <div><Skeleton className="h-[260px] w-[300px] rounded-xl" /></div>
  if (error) return <div>Error: {error}</div>
  if (!previewData) {
    return null
  } else {
    console.log(previewData.images[0])
  }

  return (
    <Link
      key={url}
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='flex gap-72 rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition-shadow duration-300 w-full '
    >
      {previewData.images && previewData.images.length > 0 && (
        <div className='w-full  flex'>
          <img
            src={previewData.images[0]}
            alt={previewData.title}
            className='object-fill w-full h-[260px] aspect-square'
          />
        </div>
      )}

      <div className='absolute inset-x-0 bottom-0 bg-[#7A8EFF] bg-opacity-60 p-4'>
        <h1 className='font-bold text-white overflow-hidden text-ellipsis whitespace-normal break-words max-h-12 text-sm overflow-y-scroll '>
          {previewData.title}
        </h1>
      </div>
    </Link>
  )
}

export default LinkPreview
