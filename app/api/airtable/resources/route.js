import { NextResponse } from 'next/server'
import airtableFetch from '../airtableFetch'

export async function GET() {
  const tableID = process.env.RESOURCES_TABLE_ID
  const params = {
    filterByFormula: 'AND(Archived=FALSE(),URL)',
  }

  const response = await airtableFetch(tableID, {
    params,
    next: { tags: ['getResources'] },
  })

  return NextResponse.json(response.records)
}
