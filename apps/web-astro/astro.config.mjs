import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import { unified } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links'
import rehypeGatsbyPrism from './src/plugins/rehype-gatsby-prism.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://miro.rs',
  outDir: '../../dist/apps/web-astro',
  integrations: [
    mdx(),
    sitemap(),
    react(),
  ],
  vite: {
    environments: {
      prerender: {
        resolve: {
          // Bare imports in the prerender bundle resolve from the workspace root, where the
          // hoisted `cookie@0.6` (needed by Gatsby) shadows the version Astro depends on.
          // `react-icons@4` uses directory imports that Node's ESM loader rejects.
          noExternal: ['cookie', 'react-icons'],
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // The styles are shared with the Gatsby site, which is still on the legacy Sass API.
          silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
        },
      },
    },
  },
  markdown: {
    syntaxHighlight: 'prism',
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['nofollow', 'noopener', 'noreferrer'],
          },
        ],
        rehypeGatsbyPrism,
      ],
    }),
  },
});
