import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const logs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().max(160),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(), // slug of a projects entry
    kind: z.enum(['log', 'workshop']).default('log'),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    blurb: z.string(),
    status: z.enum(['live', 'wip', 'dormant']),
    started: z.string(), // "2024.03"
    ended: z.string().optional(), // archive shelf shows "2005 – 2008"
    stack: z.array(z.string()).default([]),
    source: z.string().url().optional(),
    demo: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { logs, projects };
