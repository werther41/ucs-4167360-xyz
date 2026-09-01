import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

import { allLogs } from '../lib/content';
import { site } from '../site';

export async function GET(context: APIContext) {
  const logs = await allLogs();

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items: logs.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: `/logs/${entry.id}/`,
      categories: [...entry.data.tags],
    })),
    customData: '<language>en</language>',
  });
}
