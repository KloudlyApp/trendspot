'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardReloader() {
  // ===============================================================================
  // This section is a hacky fix because I didn't know how to store cookies properly to share the accessToken from /api/whop/route.js to /dashboard/page.js\
  //
  useEffect(() => {
    if (localStorage.alreadyFailed) {
      const alreadyFailed = parseInt(localStorage.alreadyFailed, 10)
      if (alreadyFailed >= 4) {
        localStorage.removeItem('alreadyFailed')
        redirect('/login')
      } else {
        localStorage.alreadyFailed = `${alreadyFailed + 1}`
        window.location.reload()
      }
    } else {
      localStorage.alreadyFailed = '1'
      window.location.reload()
    }
  }, [])

  return (
    <div className='h-[calc(100vh-45rem)] md:h-[calc(100vh-33rem)] lg:h-[calc(100vh-4rem)] w-full lg:w-[calc(100vw-28rem)] lg:pr-8'>
      <Skeleton className='h-full w-full rounded-xl mt-4 lg:my-8' />
    </div>
  )
  //
  // Hacky fix ends
  // ===============================================================================
}
