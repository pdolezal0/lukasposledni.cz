import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './sanity'
import { singleton } from './sanity/tools/singleton'
import { structure } from './sanity/tools/structure'

export default defineConfig({
  title: 'Lukáš Poslední',
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  plugins: [
    structureTool({ structure: (S, context) => structure(S, context) }),
    singleton(),
  ],
  schema: {
    types: schemaTypes,
  },
})
