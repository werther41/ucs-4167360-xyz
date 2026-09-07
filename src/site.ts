/**
 * Every value the design shows as a placeholder lives here. Edit this file and
 * the chrome, the about page rails and the feed all follow.
 */
export const site = {
  name: "Uncommon Solid",
  domain: "4167360.xyz",
  url: "https://4167360.xyz",
  established: 2002,
  description:
    "Diagnostics platform software during the week, small useless web things on the weekend. Notes, half-finished projects, and twenty years of old websites.",

  /* Shown in the HUD status panel. */
  location: "San Francisco",
  building: "Onco Assistant",

  /* Shown in the about page ELSEWHERE panel. */
  github: {
    handle: "@werther41",
    url: "https://github.com/werther41",
  },
  email: "hi@4167360.xyz",
  feed: "/rss.xml",

  colophon: {
    built: "Astro",
    hosted: "Cloudflare",
    type: "Martian · Plex",
  },
} as const;

export const nav = [
  { label: "HUD", href: "/" },
  { label: "LOGS", href: "/logs" },
  { label: "WORKSHOP", href: "/workshop" },
  { label: "ABOUT", href: "/about" },
] as const;

export type NavKey = (typeof nav)[number]["label"];
