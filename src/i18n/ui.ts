export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr', 'en'];

/** Table de correspondance des URL FR / EN (sert au menu, au sélecteur de langue et aux balises hreflang). */
export const ROUTES = {
  home: { fr: '/', en: '/en/' },
  table: { fr: '/la-table/', en: '/en/dining/' },
  bar: { fr: '/le-bar/', en: '/en/bar/' },
  fumoir: { fr: '/le-fumoir/', en: '/en/cigar-lounge/' },
  events: { fr: '/evenements-privatisation/', en: '/en/events/' },
  infos: { fr: '/infos-pratiques/', en: '/en/visit/' },
  legal: { fr: '/mentions-legales/', en: '/en/legal-notice/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
  cookies: { fr: '/cookies/', en: '/en/cookies/' },
} as const;
export type RouteKey = keyof typeof ROUTES;

export const NAV: RouteKey[] = ['table', 'bar', 'fumoir', 'events', 'infos'];

export const ui = {
  fr: {
    nav: { home: 'Accueil', table: 'La Table', bar: 'Le Bar', fumoir: 'Le Fumoir', events: 'Événements', infos: 'Infos pratiques', legal: 'Mentions légales', privacy: 'Confidentialité', cookies: 'Cookies' },
    book: 'Réserver',
    bookOnline: 'Réserver en ligne',
    call: 'Appeler',
    privatise: 'Privatiser',
    quote: 'Demander un devis',
    menu: 'Menu',
    close: 'Fermer',
    skip: 'Aller au contenu',
    switchLang: 'English',
    switchLangLabel: 'Read this page in English',
    tagline: 'Restaurant · Bar à rhum & whisky · Fumoir',
    alcohol: "L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
    tobacco: 'Fumer nuit gravement à votre santé et à celle de votre entourage.',
    cookiesManage: 'Gérer les cookies',
    closed: 'Fermé',
    days: { monday: 'Lundi', tuesday: 'Mardi', wednesday: 'Mercredi', thursday: 'Jeudi', friday: 'Vendredi', saturday: 'Samedi', sunday: 'Dimanche' },
    metro: 'Métro',
    minWalk: 'min à pied',
    hours: 'Horaires',
    address: 'Adresse',
    phone: 'Téléphone',
    itinerary: 'Itinéraire',
    followUs: 'Suivre la Casa',
  },
  en: {
    nav: { home: 'Home', table: 'Dining', bar: 'The Bar', fumoir: 'Cigar Lounge', events: 'Events', infos: 'Visit us', legal: 'Legal notice', privacy: 'Privacy', cookies: 'Cookies' },
    book: 'Book a table',
    bookOnline: 'Book online',
    call: 'Call',
    privatise: 'Private hire',
    quote: 'Request a quote',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    switchLang: 'Français',
    switchLangLabel: 'Lire cette page en français',
    tagline: 'Restaurant · Rum & whisky bar · Cigar lounge',
    alcohol: "L'abus d'alcool est dangereux pour la santé, à consommer avec modération. (Alcohol abuse is dangerous for your health. Please drink responsibly.)",
    tobacco: 'Smoking seriously harms you and others around you.',
    cookiesManage: 'Cookie settings',
    closed: 'Closed',
    days: { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' },
    metro: 'Metro',
    minWalk: 'min walk',
    hours: 'Opening hours',
    address: 'Address',
    phone: 'Phone',
    itinerary: 'Directions',
    followUs: 'Follow us',
  },
} as const;

export const t = (lang: Lang) => ui[lang];
export const href = (key: RouteKey, lang: Lang) => ROUTES[key][lang];

/** Formate « 18:00 » en « 18 h » (fr) ou « 6pm » (en). */
export function formatHeure(h: string, lang: Lang) {
  const [H, M] = h.split(':').map(Number);
  if (lang === 'fr') return M ? `${H} h ${String(M).padStart(2, '0')}` : `${H} h`;
  const suffix = H >= 12 && H < 24 ? 'pm' : 'am';
  const h12 = H % 12 === 0 ? 12 : H % 12;
  return `${h12}${M ? '.' + String(M).padStart(2, '0') : ''}${suffix}`;
}
