import Link from 'next/link'

const ResourceCard = ({ post }) => {
  const imageArray =
    post?.fields?.Image?.[0]?.url ? [post.fields.Image[0].url] : []

  const title = post.fields.Title
  const url = post.fields['URL']
  const image =
    imageArray.length > 0 ? imageArray[0] : '/images/tiktok_placeholder.jpg'

  return (
    <Link
      key={url}
      href={url || 'http://www.google.com'}
      target='_blank'
      rel='noopener noreferrer'
      className='flex gap-72 rounded-2xl shadow-md overflow-hidden relative w-full'
    >
      {
        <div className='w-full  flex'>
          <img
            src={image}
            alt={title}
            className='object-cover  h-[18.5rem] w-[12.5rem]'
          />
        </div>
      }

      <div className='absolute inset-x-0 bottom-0 bg-title-blue p-4'>
        <h1 className='font-bold text-white overflow-hidden text-ellipsis whitespace-normal break-words max-h-12 h-10 text-sm  '>
          {title}
        </h1>
      </div>
    </Link>
  )
}

export default ResourceCard
