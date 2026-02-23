import { type SchemaTypeDefinition } from 'sanity'
import inventory from './inventory' // <--- 1. Import your new file
import part from './part'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [inventory, part], // <--- 2. Add it to this array
}