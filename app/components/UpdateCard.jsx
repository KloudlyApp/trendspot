import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function UpdateCard({ date, body, img_url, link_url, link_text }) {
  const shortDate = moment(date).format('MMM Do')

  return (
    <div className='bg-[#262626] md:my-0 min-w-[300px] h-[300px] w-[300px] rounded-lg text-white flex flex-col'>
      <div className='flex-1 flex flex-col'>
        {img_url && (
          <div className='h-[90px] max-h-28 flex items-center justify-center overflow-hidden w-full rounded-t-lg'>
            <a
              href={img_url}
              target='_blank'
              rel='noopener noreferrer'
              className='w-full'
            >
              <Image
                src={img_url}
                height={100}
                width={100}
                alt='image'
                className='w-full hover:scale-110 hover:opacity-80 transition-all'
              />
            </a>
          </div>
        )}

        <div
          className={`w-[90%] overflow-y-scroll px-2 ml-4 mt-6 ${img_url ? 'max-h-[8rem]' : 'max-h-[13rem]'} `}
        >
          <p className='text-white text-pretty'>{body}</p>
        </div>
      </div>

      <div className='flex justify-between items-center p-4 mt-auto'>
        <p className='message-white min-w-20'>{shortDate}</p>
        {link_url && link_text ?
          <a
            href={link_url}
            className='text-[#857FFF] text-right hover:underline hover:scale-105 transition-all'
            target='_blank'
            rel='noopener noreferrer'
          >
            {link_text}
          </a>
        : <div></div>}
      </div>
    </div>
  )
}

export default UpdateCard
