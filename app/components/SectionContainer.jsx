import React from 'react'
import Profile_Updates_Card from './Profile_Updates_Card'
import Top_Video_Product from './_top_video_product/Top_Video_Product'
import DetailCard from './DetailCard'
import ProductContainer from './ProductContainer'

function SectionContainer() {
  return (
    <div className='flex flex-col lg:max-w-full lg:flex-row gap-2 md:h-screen'>
      <Profile_Updates_Card />
      <ProductContainer />
    </div>
  )
}

export default SectionContainer
