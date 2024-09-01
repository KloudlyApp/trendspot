import airtableFetch from '../airtableFetch'

const serverGetUpdates = async () => {
  const tableID = process.env.UPDATES_TABLE_ID
  const params = {
    'sort[0][field]': 'Date',
    'sort[0][direction]': 'asc',
    filterByFormula: 'Archived=FALSE()',
  }

  // Fetches list of active (non-archived) Updates from Airtable, sorted by Posted Date
  const response = await airtableFetch(tableID, {
    params,
    next: { revalidate: 7000 },
  })

  return response.records
}

export default serverGetUpdates
