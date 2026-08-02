import { groq } from 'next-sanity'

export const recentCollectionsQuery = groq`*[_type == "collection"] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  _id,
  name,
  "src": coverImage.asset->url,
  "photos": photos[] {
    "url": image.asset->url,
    date,
    tags
  }
}`

export const allCollectionsQuery = groq`*[_type == "collection"] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  name,
  "src": coverImage.asset->url,
  "photos": photos[] {
    "url": image.asset->url,
    date,
    tags
  }
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  "heroImage": heroImage.asset->url,
  "aboutPortrait": aboutPortrait.asset->url,
  "aboutBackground": aboutBackground.asset->url
}`

