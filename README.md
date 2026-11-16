# casapelletier.fr

Site vitrine de **Casa Pelletier** — restaurant, bar à rhum & whisky, fumoir à cigares.
101 rue du Château, 75014 Paris · 01 83 91 48 46

Remplace la page provisoire hébergée sur Duda.

## Stack

- [Astro](https://astro.build) 7 — site 100 % statique, zéro framework JS côté client (≈ 3 Ko de JS au total)
- Tailwind CSS 4 (tokens dans `src/styles/global.css`)
- Contenus éditables en JSON dans `src/content/`, validés au build (zod), modifiables via **Decap CMS** (`/admin`)
- Formulaire de devis : **Formspree**
- Images : `astro:assets` (AVIF / WebP, `srcset`), polices auto-hébergées
- Hébergement : **Netlify** (`netlify.toml`)
- Bilingue : FR (racine) / EN (`/en/`), balises `hreflang`

## Démarrer

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère dist/
npm run preview    # sert dist/
npm run check      # vérification TypeScript / Astro
npm run placeholders   # régénère les images provisoires manquantes
```

Node ≥ 22.

## Structure

```
src/
  content/          ← contenus éditables (carte, bar, horaires, événements, FAQ)
  assets/images/    ← photos (noms descriptifs, ex. hero-salon-cheminee.jpg)
  components/
    pages/          ← une page = un composant, partagé FR / EN
    ui/             ← Photo, Heading, Ornament
  i18n/ui.ts        ← libellés FR/EN + table des URL FR ↔ EN
  lib/data.ts       ← lecture + validation des contenus
  lib/schema.ts     ← données structurées schema.org
  pages/            ← routes (FR à la racine, EN sous /en/)
public/
  admin/            ← Decap CMS
  og/               ← image de partage réseaux sociaux
docs/
  design-system.md  ← couleurs, typo, composants, direction photo
  conformite.md     ← Loi Évin, RGPD : ce qui est fait, ce qui reste à valider
  edition-contenus.md ← guide pour le client
```

### Pages

| FR | EN |
|---|---|
| `/` | `/en/` |
| `/la-table/` | `/en/dining/` |
| `/le-bar/` | `/en/bar/` |
| `/le-fumoir/` | `/en/cigar-lounge/` |
| `/evenements-privatisation/` | `/en/events/` |
| `/infos-pratiques/` | `/en/visit/` |
| `/mentions-legales/`, `/confidentialite/`, `/cookies/` | `/en/legal-notice/`, `/en/privacy/`, `/en/cookies/` |

## À valider par le client (TODO)

Rechercher `TODO` dans le code pour la liste exhaustive. Les principaux :

| Sujet | Où |
|---|---|
| **Horaires** (actuellement provisoires) | `src/content/infos.json` → `horaires` |
| **E-mail** public | `src/content/infos.json` → `email` |
| **Outil de réservation** en ligne (TheFork, Zenchef…) | `src/content/infos.json` → `reservationUrl` (un bouton apparaît automatiquement) |
| **Privatisation** totale / partielle, capacités par espace | `src/content/evenements.json` |
| **Lien avec Art Tabac** | `src/components/pages/Fumoir.astro`, `docs/conformite.md` |
| Carte, prix, cocktails (rédigés à titre d'exemple) | `src/content/carte.json`, `bar.json` |
| Validation juridique Loi Évin (page fumoir) | `docs/conformite.md` |
| Mentions légales (SIRET, licence…) | `src/pages/mentions-legales/index.astro` |
| Photos réelles + captures Instagram | `src/assets/images/` |
| Coordonnées GPS exactes | `src/content/infos.json` → `geo` |
| URL exactes des fiches Tripadvisor et Google | `src/content/infos.json` → `avis` |
| Logo officiel (SVG) | `src/components/Logo.astro` |

## Mise en ligne sur Netlify

1. Netlify → *Add new site* → *Import from Git* → choisir ce dépôt. Les réglages sont lus dans `netlify.toml`.
2. **Formspree** : créer un formulaire sur formspree.io (e-mail de réception = celui de la Casa), copier l'identifiant (`/f/xxxxxxx`) dans `src/content/infos.json` → `formspreeId`. Tant qu'il est vide, la page Événements affiche le téléphone à la place du formulaire.
3. **Admin (Decap CMS)** : sur GitHub, *Settings → Developer settings → OAuth Apps* → nouvelle app, callback `https://api.netlify.com/auth/done`. Puis sur Netlify : *Site configuration → Access & security → OAuth → Install provider → GitHub* avec le Client ID / Secret. Ajouter les comptes GitHub de l'équipe comme collaborateurs du dépôt.
4. **Rebuild quotidien** (pour retirer les événements passés de l'agenda) : Netlify → *Build hooks* → créer un hook, puis le déclencher chaque nuit : ajouter l'URL du hook comme secret GitHub `NETLIFY_BUILD_HOOK`, le workflow `.github/workflows/rebuild-quotidien.yml` s'en charge (3 h 17 UTC).

## Bascule DNS : Duda → Netlify

Le domaine `casapelletier.fr` est conservé. Seuls les enregistrements DNS changent ; le registrar reste le même.

**Avant la bascule**
1. Identifier où est géré le DNS : `whois casapelletier.fr` (registrar) et `dig NS casapelletier.fr +short` (serveurs DNS). Si le domaine a été acheté via Duda, demander à Duda le transfert du domaine (code d'autorisation / *auth code*) vers un registrar au nom du client (OVH, Gandi…), **ou** la modification des enregistrements.
2. Relever **tous** les enregistrements existants, en particulier **MX** (e-mails), **TXT** (SPF, DKIM, vérifications Google…). Ils ne doivent pas être supprimés : sinon les e-mails de la Casa s'arrêtent.
3. Baisser le TTL des enregistrements `A` et `CNAME` à 300 s, 24 à 48 h avant la bascule.
4. Vérifier le site sur l'URL Netlify temporaire (`xxx.netlify.app`) et dérouler la checklist ci-dessous.

**Bascule**
1. Netlify → *Domain management* → *Add a domain* → `www.casapelletier.fr` (domaine principal) + `casapelletier.fr`.
2. Chez le gestionnaire DNS :

   | Type | Nom | Valeur |
   |---|---|---|
   | `A` | `@` (casapelletier.fr) | `75.2.60.5` (load balancer Netlify — vérifier la valeur affichée par Netlify) |
   | `CNAME` | `www` | `<nom-du-site>.netlify.app` |

   Supprimer les anciens `A` / `CNAME` pointant vers Duda. **Ne pas toucher aux MX et TXT.**
3. Netlify génère le certificat HTTPS (Let's Encrypt) automatiquement une fois le DNS propagé (quelques minutes à quelques heures). Activer *Force HTTPS*.
4. La redirection `casapelletier.fr → www.casapelletier.fr` est déjà configurée dans `netlify.toml`.

**Après la bascule**
1. Contrôler : `dig www.casapelletier.fr +short`, ouverture du site en navigation privée, envoi d'un e-mail test à l'adresse de la Casa.
2. **Google Search Console** : ajouter la propriété (domaine), soumettre `https://www.casapelletier.fr/sitemap-index.xml`.
3. **Fiche Google Business Profile** : mettre le lien du site, les horaires (identiques au site), le lien de réservation.
4. Mettre à jour le lien dans la bio Instagram et sur Tripadvisor.
5. Résilier l'abonnement Duda **seulement** après 2 semaines sans incident.
6. Remonter le TTL à 3600 s.

## Checklist de recette

| Contrôle | Résultat |
|---|---|
| Lighthouse mobile (perf / accessibilité / bonnes pratiques / SEO) | 99–100 / 100 / 100 / 100 sur les pages testées |
| Responsive 375 / 768 / 1440 px | ✅ vérifié par captures |
| Liens internes | ✅ 0 lien cassé (script de crawl sur `dist/`) |
| JSON-LD | ✅ valide (Restaurant + BarOrPub, Menu, FAQPage, BreadcrumbList) — à repasser sur [validator.schema.org](https://validator.schema.org) et le [test des résultats enrichis](https://search.google.com/test/rich-results) après mise en ligne |
| `alt` sur toutes les images | ✅ |
| Contrastes AA | ✅ (voir `docs/design-system.md`) |
| `title` / `meta description` uniques par page, Open Graph, `hreflang`, canonical | ✅ |
| `sitemap-index.xml`, `robots.txt` | ✅ |
| Formulaire Formspree | ⏳ après création du formulaire |
| Bascule DNS | ⏳ voir ci-dessus |
