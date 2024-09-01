import moment from 'moment'

const getQueriedPosts = async (Niche, TrendingDate) => {
  const response = await fetch(
    `/api/airtable/posts?niche=${Niche}&date=${moment(TrendingDate).format('YYYY-MM-DD')}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  return response.json()
}

export default getQueriedPosts
