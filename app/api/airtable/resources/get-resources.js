import airtableFetch from '../airtableFetch'

const getResources = async () => {
  const tableID = process.env.RESOURCES_TABLE_ID
  const params = {
    filterByFormula: 'AND(Archived=FALSE(),URL)',
  }

  // Fetches list of active (non-archived) Niches from Airtable
  const response = await airtableFetch(tableID, { params })

  return response.records
}

export default getResources
