import getActiveNiches from '../../niches/get-active-niches'
import getAirtableUser from '../get-airtable-user'

export const getUserNiche = async () => {
  const userData = await getAirtableUser()
  const niches = await getActiveNiches()

  let latestNiche = niches[0]
  if (userData?.fields?.['Latest Niche']?.[0]) {
    latestNiche = niches.find(
      (item) => item.id === userData.fields['Latest Niche'][0],
    )
  } else {
    console.log('userData latest niche not defined')
  }

  return latestNiche
}
