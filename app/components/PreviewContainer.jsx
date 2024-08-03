'use client'

import React from 'react'
import LinkPreview from './LinkPreview'

function PreviewContainer() {
  const slugs_og = [
    'ZPRoQcyHY',
    'ZPRoQGYuR',
    'ZPRoQEvXT',
    'ZPRoQoRyS',
    'ZPRoQXVpp',
    'ZPRoQWr8o',
    'ZPRoC1MUJ',
    'ZPRoQGKTG',
    'ZPRoQfkWq',
    'ZPRoQEuLs',
    'ZPRoQ4rKA',
  ]
  const slugs = ['ZPRoQGKTG', 'ZPRoQfkWq', 'ZPRoQEuLs', 'ZPRoQ4rKA']
  return (
    <div className=' grid bg-indigo-800 grid-cols-1 md:grid-cols-4 gap-6 w-full place-items-center  '>
      {slugs_og.map((slug) => {
        return <LinkPreview url={`https://www.tiktok.com/t/${slug}`} />
      })}
    </div>
  )
}

export default PreviewContainer
