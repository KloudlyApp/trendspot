import React from 'react'
import LinkPreviewContainer from '../LinkPreviewContainer'

function Top_LiveStream() {
  return (
    <div>
      <div className=' flex items-center justify-start lg:my-6 lg:ml-4 px-2'>
        <h2 className='bg-[#7A8EFF]  w-fit py-3 px-8 rounded-3xl hover:scale-105 transition-all delay-100  text-white '>
          Top LiveStream
        </h2>
      </div>

      <LinkPreviewContainer videoType={'livestream product'} />
    </div>
  )
}

export default Top_LiveStream
