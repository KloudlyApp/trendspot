'use client'

import { useState, useEffect } from 'react'
import { CardSkeleton, LinkPreviewCard } from './CardShapes'
import { useFilterContext } from '../context/filterContext'
import getLinkPreview from '../api/link-preview/get-link-preview'
import patchPost from '../api/airtable/posts/patch-post'
import moment from 'moment'

const TikTokCard = ({ post }) => {
  const [loading, setLoading] = useState(true)
  const [postFields, setPostFields] = useState({
    url: post.fields['Full Link'],
    tag: post.fields.Tag,
    image: post.fields.LinkImage?.[0]?.url,
    title: post.fields.LinkTitle,
  })

  // This finds the tag that needs to be revalidated
  const { filterNiche, filterDate } = useFilterContext()
  const niche = filterNiche?.fields?.Name
  const date = moment(filterDate).format('YYYY-MM-DD')
  const queryTag = `getQueriedPosts-${niche}-${date}`

  useEffect(() => {
    const initialize = async () => {
      setLoading(true)

      if (!postFields.image || !postFields.title) {
        const { image, title } = await getLinkPreview(postFields.url)
        const updatedPost = await patchPost(post.id, queryTag, {
          LinkImage: [{ url: image }],
          LinkTitle: title,
        })
        setPostFields({
          ...postFields,
          ...(updatedPost.fields?.LinkImage?.[0]?.url && {
            image: updatedPost.fields.LinkImage[0].url,
          }),
          ...(updatedPost.fields?.LinkTitle && {
            title: updatedPost.fields.LinkTitle,
          }),
        })
      }

      setLoading(false)
    }

    initialize()
  }, [postFields.url])

  if (loading) return <CardSkeleton />

  return (
    <LinkPreviewCard
      url={postFields.url}
      tag={postFields.tag}
      image={postFields.image || '/images/circle_logo_16x9.png'}
      title={postFields.title || postFields.url}
    />
  )
}

export default TikTokCard
