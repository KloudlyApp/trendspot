'use client'

import React, { useEffect, useState } from 'react'
import LinkPreview from './components/LinkPreview'

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

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='grid grid-cols-6 gap-6'>
        {slugs_og.map((slug) => {
          return <LinkPreview url={`https://www.tiktok.com/t/${slug}`} />
        })}
      </div>
    </main>
  )
}
