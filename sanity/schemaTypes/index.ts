import { type SchemaTypeDefinition } from 'sanity'
import inventory from './inventory' // <--- 1. Import your new file

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [inventory], // <--- 2. Add it to this array
}