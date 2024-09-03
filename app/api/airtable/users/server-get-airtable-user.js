import airtableFetch from '../airtableFetch'

export default async function serverGetAirtableUser(whopUser) {
  const tableID = process.env.USERS_TABLE_ID

  // Fetch Airtable's user data corresponding to the Whop user id
  const userID = whopUser.id
  const params = {
    filterByFormula: `{Whop ID}='${userID}'`,
  }

  const airtableUserData = await airtableFetch(tableID, {
    params,
    next: { revalidate: 7000, tags: ['getAirtableUser'] },
  })

  return airtableUserData?.records?.[0] || {}
}
