import airtableFetch from '../airtableFetch'

const getActiveNiches = async () => {
  const tableID = process.env.NICHES_TABLE_ID
  const params = {
    'fields[]': 'Name',
    'sort[0][field]': 'Name',
    'sort[0][direction]': 'asc',
    filterByFormula: 'Archived=FALSE()',
  }

  // Fetches list of active (non-archived) Niches from Airtable
  const response = await airtableFetch(tableID, { params })

  return response.records
}

export default getActiveNiches
