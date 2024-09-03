import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export default async function GET() {
  const tag = 'getResources'
  revalidateTag(tag)
  return NextResponse.json(`Revalidated tag: ${tag}`)
}
