import moment from 'moment-timezone'

const getQueriedPosts = async (Niche, TrendingDate) => {
  const response = await fetch(
    `/api/airtable/posts?niche=${encodeURIComponent(Niche)}&date=${moment(TrendingDate).format('YYYY-MM-DD')}&timezone=${moment.tz.guess()}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  return response.json()
}

export default getQueriedPosts
