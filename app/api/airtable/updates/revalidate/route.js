import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
  const tag = 'getUpdates'
  revalidateTag(tag)
  console.log(`Revalidated tag: ${tag}`)
  return NextResponse.json(`Revalidated tag: ${tag}`)
}
