export default async function getLinkPreview(url) {
  // Use the standard link preview fetching utility
  const response = await fetch(
    `/api/link-preview?url=${encodeURIComponent(url)}`,
  )
  const data = await response.json()

  // If it's a TikTok link and there's no image, fetch from TikTok's embed API
  if (
    url.includes('tiktok.com') &&
    (!data.images || data.images.length === 0)
  ) {
    const tiktokData = await fetchTikTokInfo(url)
    data.title = tiktokData?.title
    if (tiktokData?.thumbnail_url) {
      data.images = [tiktokData?.thumbnail_url]
    } else {
      data.images = [
        'https://res.cloudinary.com/dykwopdox/image/upload/v1725333362/tiktok_placeholder_htfbon.jpg',
      ]
    }
  }

  const linkPreview = {
    image: data.images?.[0],
    title: data.title,
  }

  return linkPreview
}

const fetchTikTokInfo = async (url) => {
  try {
    const response = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
    )
    const responseJSON = await response.json()
    return responseJSON
  } catch (error) {
    console.error('error getting tiktok image', error)
  }
}
