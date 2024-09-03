import { revalidateTag } from 'next/cache'

export default async function POST() {
  const tag = 'getResources'
  revalidateTag(tag)
  return NextResponse.json('Revalidated tag:', getActiveNiches)
}
