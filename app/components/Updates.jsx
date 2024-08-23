'use client'

import React, { useEffect, useState } from 'react'
import { TrendSpotCarouselUpdate } from './T_Carousel'

function Updates() {
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/api/sample-updates')
        const data = await response.json()
        setUpdates(data)
      } catch (error) {
        console.error('Error fetching updates:', error)
      }
    }

    fetchUpdates()
  }, [])

  return (
    <div className='h-full flex justify-center items-center'>
      {updates.length > 0 ? (
        <TrendSpotCarouselUpdate information={updates} />
      ) : (
        <p className='text-white'>Loading updates...</p>
      )}
    </div>
  )
}

export default Updates
