'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardReloader() {
  // ===============================================================================
  // This section is a hacky fix because I didn't know how to store cookies properly to share the accessToken from /api/whop/route.js to /dashboard/page.js\
  //
  useEffect(() => {
    if (localStorage.alreadyFailed === 10) {
      localStorage.removeItem('alreadyFailed')
      return redirect('/login')
    }
    if (localStorage.alreadyFailed) {
      localStorage.alreadyFailed++
    } else {
      localStorage.alreadyFailed = 1
    }

    window.location.reload()
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
