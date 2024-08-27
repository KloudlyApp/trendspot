'use client'

import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const cache = {}
const CACHE_DURATION = 60 * 60 * 1000

const TikTokCard = ({ post }) => {
  const [previewData, setPreviewData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const url = post.fields['Full Link']
  const tag = post.fields.Tag

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

  if (loading)
    return (
      <div>
        <Skeleton className='h-[18.5rem] w-[12.5rem] rounded-xl' />
      </div>
    )
  if (error)
    return (
      <div className='h-[260px] w-[300px] text-center flex items-center justify-center my-auto text-red-400'>
        Error: {error}
      </div>
    )

  if (!previewData) {
    return null
  } else {
  }

  return (
    <>
      <Link
        key={url}
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex gap-72 rounded-2xl shadow-md overflow-hidden relative hover:shadow-lg  duration-150 w-full hover:scale-105  transition-all delay-150 '
      >
        {tag && url ?
          <div className='h-10 w-fit flex justify-center items-center bg-[#7A8EFF] text-nowrap px-4 text-white text-center rounded-ts-2xl rounded-ee-2xl absolute'>
            {tag}
          </div>
        : null}
        {previewData.images && previewData.images.length > 0 && (
          <div className='w-full  flex'>
            <img
              src={previewData.images[0]}
              alt={previewData.title}
              className='object-cover  h-[18.5rem] w-[12.5rem]'
            />
          </div>
        )}

        <div className='absolute inset-x-0 bottom-0 bg-title-blue p-4'>
          <h1 className='font-bold text-white overflow-hidden text-ellipsis whitespace-normal break-words max-h-12 h-10 text-sm  '>
            {previewData.title}
          </h1>
        </div>
      </Link>
    </>
  )
}

export default TikTokCard
