import { LinkPreviewCard } from './CardShapes'

const ResourceCard = ({ post }) => {
  const imageArray =
    post?.fields?.Image?.[0]?.url ? [post.fields.Image[0].url] : []

  const title = post.fields.Title
  const url = post.fields['URL']
  const image =
    imageArray.length > 0 ? imageArray[0] : '/images/circle_logo_16x9.png'

  return <LinkPreviewCard url={url} image={image} title={title} />
}

export default ResourceCard
