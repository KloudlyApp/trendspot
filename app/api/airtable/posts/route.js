import { NextResponse } from 'next/server'
import getQueriedPosts from './get-queried-posts'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const niche = searchParams.get('niche')
  const date = searchParams.get('date')

  const posts = await getQueriedPosts(niche, date)
  return NextResponse.json(posts)
}
