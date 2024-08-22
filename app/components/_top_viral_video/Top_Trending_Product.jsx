import React from 'react'
import LinkPreviewContainer from '../LinkPreviewContainer'

function Top_Trending_Product() {
  return (
    <div className='md:mb-8'>
      <div className=' flex items-center justify-start lg:px-0 lg:ml-0 px-2 lg:my-2'>
        <h2 className='bg-[#7A8EFF]  w-fit py-3 px-8 rounded-3xl hover:scale-105 transition-all delay-100  text-white lg:mb-4 '>
          Top Trending Video
        </h2>
      </div>

      <LinkPreviewContainer videoType={'trending video'} />
    </div>
  )
}

export default Top_Trending_Product


// width: 1537px;
// height: min-content;
// display: flex;
// flex-direction: column;
// justify-content: flex-start;
// align-items: center;
// background: linear-gradient(180deg, rgba(41, 40, 40, 0.85) 0%, rgb(0, 0, 0) 100%);
// overflow: hidden;
// padding: 0px;
// align-content: center;
// flex-wrap: nowrap;
// gap: 0;
// position: absolute;
// border-radius: 0px 0px 0px 0px;