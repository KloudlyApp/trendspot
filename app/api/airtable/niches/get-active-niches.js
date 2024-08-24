import airtableFetch from '../airtableFetch'

const getActiveNiches = async () => {
  const paramsArray = [
    {
      key: 'sort[0][field]',
      value: 'Name',
    },
    {
      key: 'sort[0][direction]',
      value: 'asc',
    },
    {
      key: 'filterByFormula',
      value: 'Archived=FALSE()',
    },
  ]
  const params = new URLSearchParams()
  paramsArray.forEach((param) => {
    const { key, value } = param
    params.set(key, value)
  })

  const apiPath = process.env.NICHES_TABLE_ID + '?' + params.toString()

  // Fetches list of active (non-archived) Niches from Airtable
  const response = await airtableFetch(apiPath)
  console.log('response', response)
  return response.records
}

export default getActiveNiches
