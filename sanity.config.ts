'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import StudioLogo from './app/components/StudioLogo' // Import the logo

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  
  title: "Penn Rock Admin", // Changes the browser tab title

  // Add the logo here
  studio: {
    components: {
      logo: StudioLogo,
    }
  },

  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})