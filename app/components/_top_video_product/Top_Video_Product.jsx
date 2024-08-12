'use client'

import React, { useState } from 'react'
import PreviewContainer from '../PreviewContainer'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import DetailCard from '../DetailCard'

function Top_Video_Product() {
  const [toggleProduct, settoggleProduct] = useState(true)
  return (
    <div>
      <DetailCard />
      <div className=' flex items-center justify-start lg:my-6 lg:ml-4 px-2'>
        <h2 className='bg-[#7F8CFC]  w-fit py-3 px-8 rounded-3xl hover:scale-105 transition-all delay-100  text-white '>
          Top Video Products
        </h2>
      </div>

      {toggleProduct && <PreviewContainer />}
    </div>
  )
}

export default Top_Video_Product
