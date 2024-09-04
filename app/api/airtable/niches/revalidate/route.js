import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
  const tag = 'getActiveNiches'
  revalidateTag(tag)
  console.log(`Revalidated tag: ${tag}`)
  return NextResponse.json(`Revalidated tag: ${tag}`)
}
