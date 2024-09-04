import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trendspot',
  description: 'Trending TikTok Videos',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico?v=1' type='image/x-icon' />
      </head>
      <body
        className={`${inter.className} relative dark:bg-black flex justify-between`}
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  )
}
