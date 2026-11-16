import type { ImageMetadata } from 'astro';

/**
 * Toutes les photos du site sont dans src/assets/images/ et appelées par leur nom de fichier.
 * Pour remplacer une photo : écraser le fichier en gardant exactement le même nom.
 */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true });

export function img(name: string): ImageMetadata {
  const entry = Object.entries(files).find(([path]) => path.endsWith(`/${name}`));
  if (!entry) throw new Error(`Image introuvable : src/assets/images/${name}`);
  return entry[1].default;
}
