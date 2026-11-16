/**
 * Lecture et validation des contenus éditables (src/content/*.json).
 * Si un fichier est mal rempli (prix manquant, horaire au mauvais format…),
 * le build échoue avec un message clair au lieu de publier un site cassé.
 */
import { z } from 'astro/zod';
import infosRaw from '../content/infos.json';
import carteRaw from '../content/carte.json';
import barRaw from '../content/bar.json';
import evenementsRaw from '../content/evenements.json';
import faqRaw from '../content/faq.json';

const heure = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Format attendu : HH:MM (ex. 18:30)');
const prix = z.string().regex(/^\d+([.,]\d{1,2})?$/, 'Prix en chiffres, sans le symbole €');
export const JOURS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

const infosSchema = z.object({
  nom: z.string(),
  telephone: z.string(),
  telephoneInternational: z.string().regex(/^\+\d+$/),
  email: z.email().or(z.literal('')),
  adresse: z.object({ rue: z.string(), codePostal: z.string(), ville: z.string(), pays: z.string() }),
  geo: z.object({ latitude: z.number(), longitude: z.number() }),
  metro: z.array(z.object({ ligne: z.string(), station: z.string(), minutes: z.number() })),
  acces_fr: z.string(),
  acces_en: z.string(),
  googleMapsUrl: z.url(),
  instagram: z.string(),
  reservationUrl: z.url().or(z.literal('')),
  formspreeId: z.string(),
  avis: z.object({
    tripadvisor: z.object({ note: z.number(), service: z.number(), url: z.url() }),
    google: z.object({ note: z.number(), url: z.url() }),
    motsCles_fr: z.array(z.string()),
    motsCles_en: z.array(z.string()),
  }),
  horaires: z
    .array(
      z.object({
        jour: z.enum(JOURS),
        ouvert: z.boolean(),
        creneaux: z.array(z.object({ de: heure, a: heure })),
      }),
    )
    .length(7, 'Il faut exactement 7 jours'),
  noteHoraires_fr: z.string(),
  noteHoraires_en: z.string(),
});

const plat = z.object({
  nom_fr: z.string(),
  nom_en: z.string(),
  description_fr: z.string().default(''),
  description_en: z.string().default(''),
  prix,
  signature: z.boolean().default(false),
  photo: z.string().default(''),
});
const carteSchema = z.object({
  miseAJour: z.string(),
  sections: z.array(z.object({ titre_fr: z.string(), titre_en: z.string(), plats: z.array(plat) })),
  note_fr: z.string(),
  note_en: z.string(),
});

const boisson = z.object({ nom: z.string(), composition_fr: z.string(), composition_en: z.string(), prix });
const barSchema = z.object({
  familles: z.array(z.object({ titre_fr: z.string(), titre_en: z.string(), texte_fr: z.string(), texte_en: z.string() })),
  cocktails: z.array(boisson),
  sansAlcool: z.array(boisson),
});

const evenementsSchema = z.object({
  capaciteMax: z.number(),
  formats: z.array(
    z.object({
      titre_fr: z.string(), titre_en: z.string(),
      capacite_fr: z.string(), capacite_en: z.string(),
      texte_fr: z.string(), texte_en: z.string(),
    }),
  ),
  espaces: z.array(z.object({ nom_fr: z.string(), nom_en: z.string(), capacite_fr: z.string(), capacite_en: z.string() })),
  agenda: z.array(
    z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date au format AAAA-MM-JJ'),
      publie: z.boolean(),
      titre_fr: z.string(), titre_en: z.string(),
      texte_fr: z.string(), texte_en: z.string(),
    }),
  ),
});

const faqSchema = z.object({
  questions: z.array(z.object({ q_fr: z.string(), q_en: z.string(), r_fr: z.string(), r_en: z.string() })),
});

function parse<T extends z.ZodType>(schema: T, data: unknown, fichier: string): z.infer<T> {
  const res = schema.safeParse(data);
  if (!res.success) {
    const details = res.error.issues.map((i) => `  - ${i.path.join('.')} : ${i.message}`).join('\n');
    throw new Error(`Contenu invalide dans src/content/${fichier} :\n${details}`);
  }
  return res.data;
}

export const infos = parse(infosSchema, infosRaw, 'infos.json');
export const carte = parse(carteSchema, carteRaw, 'carte.json');
export const bar = parse(barSchema, barRaw, 'bar.json');
export const evenements = parse(evenementsSchema, evenementsRaw, 'evenements.json');
export const faq = parse(faqSchema, faqRaw, 'faq.json');

/** Événements publiés et à venir (évalué au moment du build). */
export function agendaAVenir() {
  const today = new Date().toISOString().slice(0, 10);
  return evenements.agenda.filter((e) => e.publie && e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

/** Champ localisé : pick(obj, 'titre', 'en') -> obj.titre_en */
export function pick<T extends Record<string, unknown>>(obj: T, key: string, lang: 'fr' | 'en'): string {
  return String(obj[`${key}_${lang}`] ?? obj[`${key}_fr`] ?? '');
}

export const telHref = `tel:${infos.telephoneInternational}`;
export const adresseLigne = `${infos.adresse.rue}, ${infos.adresse.codePostal} ${infos.adresse.ville}`;
export const instagramUrl = `https://www.instagram.com/${infos.instagram}/`;
