'use client'
import React, { useState, useEffect } from 'react'
import { GrClose } from 'react-icons/gr'

function Updates() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true)

  useEffect(() => {
    if (isOverlayVisible) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOverlayVisible])

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }
  return (
    <div
      className={`h-full absolute z-20 flex justify-end bg-black/80 w-full ${
        isOverlayVisible ? '' : 'hidden'
      }`}
    >
      <div className='flex justify-center gap-4 w-1/2 bg-slate-300 px-2 pt-2 flex-col h-fit mt-2 mr-2'>
        <div className='flex justify-end pr-2'>
          <GrClose className='cursor-pointer' onClick={toggleOverlay} />
        </div>
        <div className=''>Lorem ipsum dolor sit amet</div>
      </div>
    </div>
  )
}

export default Updates
