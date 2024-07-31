import { NextResponse } from 'next/server'
import { getLinkPreview } from 'link-preview-js'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const previewData = await getLinkPreview(url, {
      timeout: 10000,
      followRedirects: 'follow',
    })
    return NextResponse.json(previewData)
  } catch (error) {
    console.error('Link preview error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch link preview',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
