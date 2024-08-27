import formatDateYYYYMMDD from '@/lib/formatDateYYYYMMDD'
import airtableFetch from '../airtableFetch'

const getQueriedPosts = async (Niche, TrendingDate) => {
  console.log('getting posts')

  const dateString = formatDateYYYYMMDD(TrendingDate)

  const apiPath =
    process.env.POSTS_TABLE_ID +
    '?' +
    `filterByFormula=AND(Niche%3D'${Niche}'%2C%7BTrending+Date%7D%3DDATETIME_PARSE('${dateString}'))`

  // Fetches list of Posts from Airtable from a given date in a given niche
  const response = await airtableFetch(apiPath)
  console.log('posts response', response)
  return response.records
}

export default getQueriedPosts
