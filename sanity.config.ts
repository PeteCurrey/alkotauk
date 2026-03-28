import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Alkota UK',

  projectId: 'pa54q49w',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
