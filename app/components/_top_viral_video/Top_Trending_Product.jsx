import React from 'react'
import LinkPreviewContainer from '../LinkPreviewContainer'

function Top_Trending_Product() {
  return (
    <div className='md:mb-8'>
      <div className=' flex items-center justify-start lg:my-6 lg:ml-4 px-2 '>
        <h2 className='bg-[#7F8CFC]  w-fit py-3 px-8 rounded-3xl hover:scale-105 transition-all delay-100  text-white '>
          Top Trending Video
        </h2>
      </div>

      <LinkPreviewContainer videoType={'trending video'} />
    </div>
  )
}

export default Top_Trending_Product
