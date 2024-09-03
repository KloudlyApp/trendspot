import { revalidateTag } from 'next/cache'

export default async function GET() {
  const tag = 'getResources'
  revalidateTag(tag)
  return NextResponse.json('Revalidated tag:', getActiveNiches)
}
