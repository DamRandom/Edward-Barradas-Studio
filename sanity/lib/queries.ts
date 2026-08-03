import { groq } from 'next-sanity'

export const recentTwoCollectionsQuery = groq`*[_type == "collection" && lower(name) != "my choice"] | order(coalesce(publishedAt, _createdAt) desc)[0...2] {
  _id,
  name,
  "src": coverImage.asset->url,
  "photos": photos[] {
    "url": image.asset->url,
    date,
    tags
  }
}`

export const myChoiceQuery = groq`*[_type == "collection" && lower(name) == "my choice"][0] {
  _id,
  name,
  "src": coverImage.asset->url,
  "photos": photos[] {
    "url": image.asset->url,
    date,
    tags
  }
}`

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
  publishedAt,
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

export const instagramPostsQuery = groq`*[_type == "instagramPost" && isActive == true] | order(publishedAt desc)[0...6] {
  _id,
  "image": image.asset->url,
  url,
  likes,
  comments,
  reposts
}`
