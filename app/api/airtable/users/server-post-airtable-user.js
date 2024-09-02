import { revalidateTag } from 'next/cache'
import airtableFetch from '../airtableFetch'

export default async function serverPostAirtableUser(updatedAirtableUser) {
  const tableID = process.env.USERS_TABLE_ID

  const response = await airtableFetch(tableID, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: updatedAirtableUser.fields }),
  })

  revalidateTag('airtableUser')

  const createdUser = response
  return createdUser
}
