import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trendspot.',
  description: 'Trending TikTok Videos',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} relative dark:bg-black flex justify-between`}
      >
        
          {children}
        
      </body>
    </html>
  )
}
