import React from 'react'
import Top_Video_Product from './_top_video_product/Top_Video_Product'
import DetailCard from './DetailCard'
import Top_LiveStream from './_top_livestream/Top_LiveStream'
import Top_Trending_Product from './_top_viral_video/Top_Trending_Product'

function ProductContainer() {
  return (
    <div className='mt-6 lg:mt-0 lg:w-screen lg:h-screen lg:overflow-y-scroll  md:gap-10 md:flex md:flex-col '>
      <DetailCard />
      <Top_Video_Product />
      <Top_LiveStream />
      <Top_Trending_Product />
    </div>
  )
}

export default ProductContainer
