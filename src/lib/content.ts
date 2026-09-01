import { getCollection, type CollectionEntry } from 'astro:content';

export type Log = CollectionEntry<'logs'>;
export type Project = CollectionEntry<'projects'>;

/** Drafts are visible while writing, gone in the deployed build. */
const published = ({ data }: Log) => (import.meta.env.PROD ? !data.draft : true);

export const allLogs = async (): Promise<Log[]> =>
  (await getCollection('logs', published)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

export const allProjects = async (): Promise<Project[]> =>
  (await getCollection('projects')).sort(
    (a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name),
  );

/** `dormant` is the only thing that puts a project on the archive shelf. */
export const activeProjects = async (): Promise<Project[]> =>
  (await allProjects()).filter((p) => p.data.status !== 'dormant');

export const dormantProjects = async (): Promise<Project[]> =>
  (await allProjects()).filter((p) => p.data.status === 'dormant');

export const featuredProjects = async (): Promise<Project[]> =>
  (await activeProjects()).filter((p) => p.data.featured);

export const projectBySlug = async (slug: string): Promise<Project | undefined> =>
  (await allProjects()).find((p) => p.id === slug);

export const logsByProject = async (slug: string): Promise<Log[]> =>
  (await allLogs()).filter((e) => e.data.project === slug);

/** Counts across logs and projects, ordered by frequency then alphabetically. */
export const tagIndex = async (): Promise<Map<string, number>> => {
  const counts = new Map<string, number>();
  const bump = (tag: string) => counts.set(tag, (counts.get(tag) ?? 0) + 1);

  for (const entry of await allLogs()) entry.data.tags.forEach(bump);
  for (const project of await allProjects()) project.data.tags.forEach(bump);

  return new Map(
    [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
  );
};

export const taggedEntries = async (tag: string) => {
  const [logs, projects] = await Promise.all([allLogs(), allProjects()]);
  return {
    logs: logs.filter((e) => e.data.tags.includes(tag)),
    projects: projects.filter((p) => p.data.tags.includes(tag)),
  };
};

/** Everything the chrome reads out. Nothing in the header is hardcoded. */
export const siteCounts = async () => {
  const [logs, projects] = await Promise.all([allLogs(), allProjects()]);
  const years = logs.map((e) => e.data.date.getUTCFullYear());
  return {
    logs: logs.length,
    projects: projects.length,
    since: years.length ? Math.min(...years) : new Date().getUTCFullYear(),
    lastLog: logs[0]?.data.date,
  };
};

/** Neighbours in reverse-chronological order: previous is older, next is newer. */
export const neighbours = async (id: string) => {
  const logs = await allLogs();
  const i = logs.findIndex((e) => e.id === id);
  if (i === -1) return { prev: undefined, next: undefined };
  return { prev: logs[i + 1], next: logs[i - 1] };
};

const WORDS_PER_MINUTE = 200;

export const readingTime = (body = ''): number => {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

/* ---- Dates ----------------------------------------------------------- */
/* UTC throughout: frontmatter dates are plain calendar days and must not
   drift a day backwards for anyone west of Greenwich. */

const pad = (n: number) => String(n).padStart(2, '0');

/** `2026.08.24` — chrome and standalone rows. */
export const formatFull = (d: Date) =>
  `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;

/** `08.24` — rows already grouped under a year heading. */
export const formatShort = (d: Date) => `${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;

export const yearOf = (d: Date) => d.getUTCFullYear();

export const groupByYear = (logs: Log[]) => {
  const groups: { year: number; entries: Log[] }[] = [];
  for (const entry of logs) {
    const year = yearOf(entry.data.date);
    const last = groups.at(-1);
    if (last?.year === year) last.entries.push(entry);
    else groups.push({ year, entries: [entry] });
  }
  return groups;
};

/** `2005 – 2008`, or a bare start year when there is no end. */
export const yearRange = (started: string, ended?: string) => {
  const from = started.slice(0, 4);
  const to = ended?.slice(0, 4);
  return to && to !== from ? `${from} – ${to}` : from;
};
