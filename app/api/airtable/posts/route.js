import { NextResponse } from 'next/server'
import airtableFetch from '../airtableFetch'
import moment from 'moment'

export async function GET(request) {
  const tableID = process.env.POSTS_TABLE_ID

  const { searchParams } = new URL(request.url)
  const niche = searchParams.get('niche')
  const date = moment(searchParams.get('date')).format('YYYY-MM-DD')
  const timezone = searchParams.get('timezone') || 'utc'

  const params = {
    filterByFormula: `AND(Niche='${niche}',IS_SAME(DATETIME_FORMAT(SET_TIMEZONE({Trending Date},'${timezone}'),'YYYY-MM-DD'),'${date}', 'day'))`,
  }

  // Fetches list of Posts from Airtable from a given date in a given niche
  const response = await airtableFetch(tableID, {
    params,
    next: { revalidate: 7000 },
  })

  return NextResponse.json(response.records)
}
