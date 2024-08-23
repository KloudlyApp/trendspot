import 'server-only'

import { createClient } from 'next-sanity'

const client = createClient({
  token: process.env.SANITY_API_TOKEN,
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function sanityFetch({ query, params = {}, tags }) {
  return client.fetch(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  })
}

export async function sanityPatch({ id, params = {}, tags }) {
  return client.patch(id).set(params).commit()
}

// export async function sanityCreate({ query, params = {}, tags }) {
//   return client.create(query, params, {
//     next: {
//       revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
//       tags,
//     },
//   })
// }

// export async function sanityDelete({ query, params = {}, tags }) {
//   return client.delete(query, params, {
//     next: {
//       revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
//       tags,
//     },
//   })
// }
