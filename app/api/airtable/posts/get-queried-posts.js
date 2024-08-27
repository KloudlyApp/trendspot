import formatDateYYYYMMDD from '@/lib/formatDateYYYYMMDD'
import airtableFetch from '../airtableFetch'

const getQueriedPosts = async (Niche, TrendingDate) => {
  const nicheString = Niche.fields.Name
  const dateString = formatDateYYYYMMDD(TrendingDate)

  const apiPath =
    process.env.POSTS_TABLE_ID +
    '?' +
    `filterByFormula=AND(Niche%3D'${nicheString}'%2C%7BTrending+Date%7D%3DDATETIME_PARSE('${dateString}'))`

  // Fetches list of Posts from Airtable from a given date in a given niche
  const response = await airtableFetch(apiPath)
  console.log('posts response', response)
  console.log('posts example fields', response.records[0]?.fields)
  return response.records
}

export default getQueriedPosts
