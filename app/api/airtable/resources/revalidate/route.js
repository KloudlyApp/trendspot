import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
  const tag = 'getResources'
  revalidateTag(tag)
  return NextResponse.json(`Revalidated tag: ${tag}`)
}
