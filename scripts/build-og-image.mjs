// Builds public/og-image.png (1200x630) in the site's own HUD idiom:
// true black, phosphor green, RWR diamond mark, corner brackets, tick rules.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

const b64 = (p) => readFileSync(p).toString('base64');
const martian700 = b64(join(root, 'node_modules/@fontsource/martian-mono/files/martian-mono-latin-700-normal.woff2'));
const plex400 = b64(join(root, 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'));

const PHOS = '#2fe07a';
const PHOS_BRIGHT = '#9bffc4';
const LABEL = '#3f6650';
const LINE = '#1d6b41';

// Corner brackets: 4 L-shapes, 26px arms, 2px stroke, inset 44px.
const B = 44, A = 26, S = 2;
const brackets = [
  `M${B} ${B + A} V${B} H${B + A}`,                       // top-left
  `M${1200 - B - A} ${B} H${1200 - B} V${B + A}`,          // top-right
  `M${B} ${630 - B - A} V${630 - B} H${B + A}`,           // bottom-left
  `M${1200 - B - A} ${630 - B} H${1200 - B} V${630 - B - A}`, // bottom-right
].map((d) => `<path d="${d}" fill="none" stroke="${PHOS}" stroke-width="${S}"/>`).join('\n    ');

// Tick rule: 1px ticks every 22px, 8px tall, along top and bottom inside brackets.
const ticks = (y) => {
  let s = '';
  for (let x = B + 10; x <= 1200 - B - 10; x += 22) {
    s += `<rect x="${x}" y="${y}" width="1" height="8" fill="${LINE}"/>`;
  }
  return s;
};

// Diamond mark (RWR indicator), scaled from the 26-unit favicon to 200px.
const C = 600, CY = 250, R = 100; // center x, center y, "radius"
const p = (x, y) => `${(C + (x - 13) * (R / 12)).toFixed(2)} ${(CY + (y - 13) * (R / 12)).toFixed(2)}`;
const diamond = [
  `M${p(13, 1.04)} L${p(24.96, 13)} L${p(13, 24.96)} L${p(1.04, 13)} Z`,
].join(' ');
const chevron = `M${p(8.58, 9.62)} L${p(13, 6.76)} L${p(17.42, 9.62)}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face { font-family: 'Martian Mono'; font-weight: 700; src: url(data:font/woff2;base64,${martian700}) format('woff2'); }
      @font-face { font-family: 'IBM Plex Mono'; font-weight: 400; src: url(data:font/woff2;base64,${plex400}) format('woff2'); }
    </style>
  </defs>
  <rect width="1200" height="630" fill="#000000"/>
  ${brackets}
  ${ticks(86)}
  ${ticks(536)}
  <text x="88" y="122" font-family="'IBM Plex Mono', monospace" font-size="20" letter-spacing="4" fill="${LABEL}">4167360.XYZ</text>
  <text x="1112" y="122" text-anchor="end" font-family="'IBM Plex Mono', monospace" font-size="20" letter-spacing="4" fill="${LABEL}">EST. 2002</text>
  <g>
    <path d="${diamond}" fill="none" stroke="${PHOS}" stroke-width="7"/>
    <path d="${chevron}" fill="none" stroke="${PHOS}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="${C}" y="${CY + 22}" text-anchor="middle" font-family="'Martian Mono', monospace" font-size="52" font-weight="700" fill="${PHOS}">UC</text>
  </g>
  <text x="600" y="448" text-anchor="middle" font-family="'Martian Mono', monospace" font-size="62" font-weight="700" letter-spacing="12" fill="${PHOS_BRIGHT}">UNCOMMON SOLID</text>
  <text x="600" y="492" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-size="19" letter-spacing="5" fill="${LABEL}">DIAGNOSTICS SOFTWARE / WEEK · SMALL USELESS WEB THINGS / WEEKEND</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(pub, 'og-image.png'));
console.log('wrote public/og-image.png');
