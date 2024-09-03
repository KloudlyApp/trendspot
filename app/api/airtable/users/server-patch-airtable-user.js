import { revalidateTag } from 'next/cache'
import airtableFetch from '../airtableFetch'

export default async function serverPatchAirtableUser(updatedAirtableUser) {
  const tableID = process.env.USERS_TABLE_ID
  const recordID = updatedAirtableUser.id

  const response = await airtableFetch(tableID, {
    recordID,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: updatedAirtableUser.fields }),
  })

  revalidateTag('getAirtableUser')

  return response
}
