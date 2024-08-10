'use client'

import React, { useState } from 'react'
import PreviewContainer from '../PreviewContainer'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import DetailCard from '../DetailCard'

function Top_Video_Product() {
  const [toggleProduct, settoggleProduct] = useState(true)
  return (
    <div>
      <div className=' flex items-center justify-center'>
        <h2 className='bg-[#7F8CFC]  w-fit py-3 px-8 rounded-3xl hover:scale-105 transition-all delay-100  text-white'>
          Top Video Products
        </h2>
        {toggleProduct ? (
          <div
          className='flex  ml-6 border border-white rounded p-2  text-white'
            onClick={() => {
              settoggleProduct(!toggleProduct)
            }}
            >
            {' '}
            Hide <ChevronDownIcon className='ml-1' />
          </div>
        ) : (
          <div
          className='flex  ml-6 border  border-white rounded p-2  text-white' 
          onClick={() => {
            settoggleProduct(!toggleProduct)
          }}
          >
            {' '}
            Show <ChevronUpIcon className='ml-1' />
          </div>
        )}
      </div>

        <DetailCard/>
      {toggleProduct && <PreviewContainer />}
    </div>
  )
}

export default Top_Video_Product
