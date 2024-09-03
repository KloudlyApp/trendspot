import { NextResponse } from 'next/server'
import airtableFetch from '../airtableFetch'
import moment from 'moment'
import { revalidateTag } from 'next/cache'

const tableID = process.env.POSTS_TABLE_ID

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const niche = searchParams.get('niche')
  const date = moment(searchParams.get('date')).format('YYYY-MM-DD')
  const timezone = searchParams.get('timezone') || 'utc'

  const params = {
    filterByFormula: `AND(Niche='${niche}',IS_SAME(DATETIME_FORMAT(SET_TIMEZONE({Trending Date},'${timezone}'),'YYYY-MM-DD'),'${date}', 'day'))`,
  }

  const queryTag = `getQueriedPosts-${niche}-${date}`

  // Fetches list of Posts from Airtable from a given date in a given niche
  const response = await airtableFetch(tableID, {
    params,
    next: { revalidate: 7000, tags: [queryTag] },
  })

  if (response.records?.length < 1) {
    revalidateTag(queryTag)
  }

  return NextResponse.json(response.records)
}

export async function PATCH(request) {
  const { postID, queryTag, fields } = await request.json()

  const options = {
    recordID: postID,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: fields,
    }),
  }

  const response = await airtableFetch(tableID, options)

  revalidateTag(queryTag)

  return NextResponse.json(response)
}
