import React from 'react'
import Profile_Updates_Card from './Profile_Updates_Card'

import ProductContainer from './ProductContainer'

function SectionContainer() {
  return (
    <div className='flex flex-col lg:max-w-full lg:flex-row gap-2 md:h-screen '>
      <Profile_Updates_Card />
      <ProductContainer />
    </div>
  )
}

export default SectionContainer
