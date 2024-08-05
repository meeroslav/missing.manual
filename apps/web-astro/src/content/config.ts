import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean(),
    // Transform string to Date object
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.string().optional(),
    cover: image().optional(),
    coverInfo: z.string().optional(),
  }),
});

export const collections = { blog };
