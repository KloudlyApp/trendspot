import formatDateYYYYMMDD from '@/lib/formatDateYYYYMMDD'
import airtableFetch from '../airtableFetch'

const getQueriedPosts = async (Niche, TrendingDate) => {
  const tableID = process.env.POSTS_TABLE_ID

  const dateString = formatDateYYYYMMDD(TrendingDate)
  const params = {
    filterByFormula: `AND(Niche='${Niche}',{Trending Date}=DATETIME_PARSE('${dateString}'))`,
  }

  // Fetches list of Posts from Airtable from a given date in a given niche
  const response = await airtableFetch(tableID, { params })
  console.log('posts response', response)
  return response.records
}

export default getQueriedPosts
