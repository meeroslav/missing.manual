import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean(),
    // Transform string to Date object
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    coverInfo: z.string().optional(),
  }),
});

export const collections = { blog };
