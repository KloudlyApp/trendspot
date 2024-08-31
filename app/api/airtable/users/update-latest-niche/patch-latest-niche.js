import { revalidateTag } from 'next/cache'
import airtableFetch from '../../airtableFetch'

const patchUserLatestNiche = async (userID, nicheID) => {
  const tableID = process.env.USERS_TABLE_ID

  console.log('props', userID, nicheID)

  const recordID = userID
  const method = 'PATCH'
  const headers = { 'Content-Type': 'application/json' }
  const body = JSON.stringify({
    fields: {
      'Latest Niche': [nicheID],
    },
  })

  const options = {
    recordID,
    method,
    headers,
    body,
  }

  console.log('patch options', options)

  const response = await airtableFetch(tableID, options)

  revalidateTag('airtableUser')

  console.log('patch response', response)

  return response
}

export default patchUserLatestNiche
