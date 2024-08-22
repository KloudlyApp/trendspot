import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function UpdateCard({ date, message, link_href, link_text, img_url }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
// If you want year, add  year: 'numeric'  in the object.
    const options = { month: 'short', day: 'numeric',}
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
    <div className={`bg-[#262626]  md:my-0 min-w-[300px] h-[300px] w-[300px] rounded-lg  my-4 justify-center text-white flex `}>
      <div className={`flex  flex-col gap-4  ${!img_url && 'justify-around my-0 gap-0'}`}>
        <div className='flex '>
        {img_url &&  <div className=' h-[90px] max-h-28 flex items-center justify-center overflow-hidden lg:flex-1 w-full rounded-t-lg hover:rouded-t-lg'>
           
              <Image src={img_url} height={100} width={100} alt='image' className='w-full ' />
            
          </div>}
       
        </div>

        <p className={`w-full text-white  lg:max-h-[6rem] overflow-y-scroll  px-2 ml-4 text-balance ${!img_url && 'lg:max-h-[11rem]'  } `}>
          {truncatedText}
        
        </p>

        <div className="flex justify-between  p-6">
        <p className=' message-white'>{strippedDate}</p>
        <Link href={`${link_href}`} className='text-[#7A8EFF] hover:underline'>
            <>Read Article</>
          </Link>
       </div>
      </div>
    </div>
  )
}

export default UpdateCard
