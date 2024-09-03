export default async function patchPost(id, queryTag, fields = {}) {
  const response = await fetch('/api/airtable/posts', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postID: id,
      queryTag: queryTag,
      fields: fields,
    }),
  })
  if (!response.ok) {
    throw new Error(`Failed to patch post ${id}`)
  }
  return response.json()
}
