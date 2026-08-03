import { type SchemaTypeDefinition } from 'sanity'

import {collectionType} from './collectionType'
import {siteSettingsType} from './siteSettingsType'
import {instagramPostType} from './instagramPostType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectionType, siteSettingsType, instagramPostType],
}
