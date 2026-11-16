import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/index.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    published: z.boolean(),
    // Transform string to Date object
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.string().optional(),
    cover: image().optional(),
    coverInfo: z.string().optional(),
    canonical: z.string().optional(),
  }),
});

export const collections = { blog };
