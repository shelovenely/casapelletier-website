import { infos, instagramUrl, evenements } from './data';
import { ROUTES, type Lang } from '../i18n/ui';

const DAY_URI: Record<string, string> = {
  monday: 'https://schema.org/Monday', tuesday: 'https://schema.org/Tuesday', wednesday: 'https://schema.org/Wednesday',
  thursday: 'https://schema.org/Thursday', friday: 'https://schema.org/Friday', saturday: 'https://schema.org/Saturday',
  sunday: 'https://schema.org/Sunday',
};

/** Données structurées schema.org : Restaurant + BarOrPub (générées depuis infos.json). */
export function localBusinessSchema(site: URL, lang: Lang) {
  const url = new URL(ROUTES.home[lang], site).href;
  // Regroupe les créneaux identiques pour un balisage compact
  const groups = new Map<string, string[]>();
  for (const d of infos.horaires) {
    if (!d.ouvert) continue;
    for (const c of d.creneaux) {
      const k = `${c.de}|${c.a}`;
      groups.set(k, [...(groups.get(k) ?? []), DAY_URI[d.jour]]);
    }
  }
  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'BarOrPub'],
    '@id': new URL('/#etablissement', site).href,
    name: infos.nom,
    description:
      lang === 'fr'
        ? 'Restaurant de cuisine française, bar à rhum et whisky et fumoir à cigares dans une ambiance de club anglais, Paris 14e.'
        : 'French restaurant, rum and whisky bar and cigar lounge with an English club atmosphere, Paris 14th.',
    url,
    telephone: infos.telephoneInternational,
    ...(infos.email ? { email: infos.email } : {}),
    image: [new URL('/og/og-casa-pelletier.jpg', site).href],
    address: {
      '@type': 'PostalAddress',
      streetAddress: infos.adresse.rue,
      postalCode: infos.adresse.codePostal,
      addressLocality: infos.adresse.ville,
      addressRegion: 'Île-de-France',
      addressCountry: infos.adresse.pays,
    },
    geo: { '@type': 'GeoCoordinates', latitude: infos.geo.latitude, longitude: infos.geo.longitude },
    hasMap: infos.googleMapsUrl,
    openingHoursSpecification: [...groups].map(([k, days]) => {
      const [opens, closes] = k.split('|');
      return { '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens, closes };
    }),
    servesCuisine: lang === 'fr' ? ['Française', 'Viandes grillées'] : ['French', 'Grilled meats'],
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    acceptsReservations: infos.reservationUrl || 'True',
    hasMenu: new URL(ROUTES.table[lang], site).href,
    maximumAttendeeCapacity: evenements.capaciteMax,
    smokingAllowed: false,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: lang === 'fr' ? 'Terrasse couverte' : 'Covered terrace', value: true },
      { '@type': 'LocationFeatureSpecification', name: lang === 'fr' ? 'Cheminée' : 'Fireplace', value: true },
      { '@type': 'LocationFeatureSpecification', name: lang === 'fr' ? 'Fumoir' : 'Smoking room', value: true },
      { '@type': 'LocationFeatureSpecification', name: lang === 'fr' ? 'Privatisation' : 'Private hire', value: true },
    ],
    sameAs: [instagramUrl],
  };
}

export function breadcrumbSchema(site: URL, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: new URL(it.path, site).href })),
  };
}

export function faqSchema(items: { q: string; r: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.r } })),
  };
}
