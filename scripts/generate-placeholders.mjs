/**
 * Génère des images provisoires (placeholders) aux noms définitifs.
 * Quand les vraies photos arrivent, il suffit d'écraser le fichier du même nom
 * dans src/assets/images/ : aucune ligne de code à modifier.
 *
 * Usage : npm run placeholders   (n'écrase jamais une image existante, sauf --force)
 */
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const force = process.argv.includes('--force');
const OUT = 'src/assets/images';
mkdirSync(OUT, { recursive: true });
mkdirSync('public/og', { recursive: true });

// [fichier, largeur, hauteur, teinte de fond, position de la lumière (x%, y%), légende]
const images = [
  ['hero-salon-cheminee.jpg', 2400, 1600, '#1F2E26', [22, 62], 'Salon, cheminée allumée'],
  ['salon-chesterfield-lumiere-tamisee.jpg', 1600, 1100, '#2A2118', [70, 40], 'Salon Chesterfield'],
  ['table-cote-de-boeuf-de-la-casa.jpg', 1600, 1200, '#3A2416', [50, 45], 'Côte de bœuf de la Casa'],
  ['table-planche-a-partager.jpg', 1200, 1200, '#33261A', [45, 50], 'Planche à partager'],
  ['table-baba-de-la-casa.jpg', 1200, 1200, '#3B2A17', [55, 45], 'Baba de la Casa'],
  ['table-tarte-fine-aux-pommes.jpg', 1200, 1200, '#3D2C1A', [50, 55], 'Tarte fine aux pommes'],
  ['table-salle-dressee.jpg', 1600, 1100, '#22201A', [30, 35], 'Salle dressée'],
  ['bar-comptoir-bois-sombre.jpg', 1600, 1200, '#2B1C12', [65, 30], 'Comptoir du bar'],
  ['bar-etagere-rhums-whiskies.jpg', 1200, 1500, '#2E2014', [50, 30], 'Étagère rhums et whiskies'],
  ['bar-cocktail-maison.jpg', 1200, 1500, '#26201A', [50, 40], 'Cocktail maison'],
  ['fumoir-salon-cuir-ventile.jpg', 1600, 1200, '#1B1A16', [35, 40], 'Fumoir, fauteuils cuir'],
  ['cave-a-cigares-boiseries.jpg', 1200, 1500, '#2A1D13', [50, 35], 'Cave, boiseries'],
  ['terrasse-arboree-couverte.jpg', 1600, 1100, '#1E2A20', [60, 30], 'Terrasse arborée et couverte'],
  ['evenement-salon-privatise.jpg', 1600, 1100, '#24201A', [40, 45], 'Salon privatisé'],
  ['evenement-afterwork-terrasse.jpg', 1200, 1500, '#1F271F', [55, 35], 'Afterwork en terrasse'],
  ...Array.from({ length: 6 }, (_, i) => [
    `instagram-0${i + 1}.jpg`, 900, 900,
    ['#1F2E26', '#3A2416', '#2B1C12', '#1E2A20', '#2E2014', '#22201A'][i],
    [[30, 60], [50, 40], [65, 35], [40, 30], [55, 50], [35, 45]][i],
    `Instagram ${i + 1}`,
  ]),
];

const svg = (w, h, bg, [lx, ly], label, file) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <radialGradient id="glow" cx="${lx}%" cy="${ly}%" r="65%">
      <stop offset="0" stop-color="#C98A4B" stop-opacity=".55"/>
      <stop offset=".35" stop-color="#5A3A22" stop-opacity=".35"/>
      <stop offset="1" stop-color="#141210" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
      <stop offset=".55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".65"/>
    </radialGradient>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .42  0 0 0 0 .33  0 0 0 .09 0"/></filter>
  </defs>
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" filter="url(#grain)"/>
  <rect width="100%" height="100%" fill="url(#vignette)"/>
  <text x="${Math.round(w * 0.04)}" y="${h - Math.round(h * 0.05)}" font-family="Georgia, serif" font-size="${Math.max(18, Math.round(w / 60))}" fill="#F3EBDD" fill-opacity=".55" letter-spacing="2">PHOTO À VENIR · ${label}</text>
  <text x="${Math.round(w * 0.04)}" y="${h - Math.round(h * 0.05) + Math.max(22, Math.round(w / 48))}" font-family="monospace" font-size="${Math.max(13, Math.round(w / 90))}" fill="#B89A5B" fill-opacity=".6">${file}</text>
</svg>`;

let n = 0;
for (const [file, w, h, bg, light, label] of images) {
  const target = join(OUT, file);
  if (existsSync(target) && !force) continue;
  await sharp(Buffer.from(svg(w, h, bg, light, label, file))).jpeg({ quality: 82, mozjpeg: true }).toFile(target);
  n++;
}

// Image de partage réseaux sociaux (Open Graph), servie telle quelle depuis /public
const og = 'public/og/og-casa-pelletier.jpg';
if (!existsSync(og) || force) {
  await sharp(Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="g" cx="25%" cy="70%" r="70%"><stop offset="0" stop-color="#A9692E" stop-opacity=".5"/><stop offset="1" stop-color="#141210" stop-opacity="0"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="#1F2E26"/><rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#B89A5B" stroke-opacity=".6"/>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="96" fill="#F3EBDD" letter-spacing="6">Casa Pelletier</text>
  <text x="600" y="360" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="34" fill="#B89A5B">Restaurant · Bar à rhum &amp; whisky · Fumoir</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#F3EBDD" fill-opacity=".7" letter-spacing="4">101 RUE DU CHÂTEAU · PARIS 14</text>
</svg>`)).jpeg({ quality: 85, mozjpeg: true }).toFile(og);
  n++;
}
console.log(`${n} image(s) générée(s).`);
