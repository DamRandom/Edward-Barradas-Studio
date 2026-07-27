import { type SchemaTypeDefinition } from 'sanity'

import {collectionType} from './collectionType'
import {siteSettingsType} from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectionType, siteSettingsType],
}
