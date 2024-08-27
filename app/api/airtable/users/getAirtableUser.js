import airtableFetch from '../airtableFetch'

const getAirtableUser = async (whopUserData) => {
  const tableID = process.env.USERS_TABLE_ID

  // Fetch Airtable's user data corresponding to the Whop user id
  const userID = whopUserData.id
  const params = {
    'fields[]': 'Latest Niche',
    filterByFormula: `{Whop ID}='${userID}'`,
  }

  const airtableUserData = await airtableFetch(tableID, { params })
  return airtableUserData
}

export default getAirtableUser
