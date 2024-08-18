import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function UpdateCard({ date, message, link_href, link_text, img_url }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    const formattedDate = date.toLocaleDateString('en-US', options)

    const day = date.getUTCDate()
    const daySuffix = getDaySuffix(day)

    return formattedDate.replace(day, `${day}${daySuffix}`)
  }

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const strippedDate = formatDate(date)

  const truncateText = (message, wordLimit) => {
    const words = message?.split(' ')
    if (words.length <= wordLimit) return message
    return words.slice(0, wordLimit).join(' ')
  }
  const truncatedText = truncateText(message, 30)

  return (
    <div className='bg-[#262626]  md:my-0 p-6 min-w-[300px] h-[300px] w-[300px] rounded-lg  my-4 justify-center text-white   '>
      <div className='flex  flex-col gap-7 '>
        <div className='flex gap-7'>
          <div className='rounded-full w-[50px] h-[50px] max-h-14 flex items-center justify-center overflow-hidden '>
            {img_url && (
              <Image src={img_url} height={100} width={100} alt='image' className='' />
            )}
          </div>
          <div className=''>
            <h2 className='font-bold  message-white'>{ link_text}</h2>
            <p className=' message-white'>{strippedDate}</p>
          </div>
        </div>

        <p className=' text-white'>
          {truncatedText} ...
          <Link href={`${link_href}`} className='text-blue-500 hover:underline'>
            <>Read More</>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default UpdateCard
