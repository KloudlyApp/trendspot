'use client'

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
    <main className='flex min-h-screen flex-col items-center justify-around p-24'>
      <h1>Loading...</h1>
    </main>
  )
  //
  // Hacky fix ends
  // ===============================================================================
}
