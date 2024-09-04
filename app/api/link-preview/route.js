import { NextResponse } from 'next/server'
import { getLinkPreview } from 'link-preview-js'

export const revalidate = 86400 // revalidate every day

export async function GET(request) {
  const { searchParams } = new URL(request.nextUrl)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  const previewData = await getLinkPreview(url, {
    timeout: 10000,
    followRedirects: 'follow',
  })
  return NextResponse.json(previewData)
}
