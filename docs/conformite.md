# Conformité — points bloquants

> ⚠️ **À faire valider par un juriste avant la mise en ligne**, en particulier la page *Le Fumoir & la Cave*.
> Ce document liste ce qui a été mis en place côté site ; il ne remplace pas un avis juridique.

## Loi Évin — tabac (Code de la santé publique, art. L3512-4 et suivants)

Toute propagande ou publicité, directe ou indirecte, en faveur du tabac est interdite.

Mis en place :
- Aucune marque, aucun prix, aucune promotion de cigares, nulle part sur le site (contenus et données).
- Page fumoir rédigée sur un ton strictement informatif : fonctionnement de la pièce, règles d'accès, conservation, quelques repères pratiques.
- Mention « Fumer nuit gravement à votre santé et à celle de votre entourage » en haut et en bas de la page fumoir, et dans les mentions légales.
- Phrase d'avertissement : « Cette page […] a une vocation purement informative. »
- Les règles légales du fumoir sont rappelées (décret 2006-1386, art. R3512-3 et R3512-4 CSP) : pièce close, ventilation, **aucune prestation de service à l'intérieur**, mineurs non admis.
- L'expression d'avis « temple du cigare » est **volontairement écartée** de la page d'accueil.
- Pas de vente de cigares évoquée : en France, la vente au détail de tabac est réservée aux débitants (buralistes).

À valider par le client / juriste :
- [ ] Le principe même d'une section « initiation » (repères coupe / allumage). Elle peut être supprimée en retirant `reperes` de `src/components/pages/Fumoir.astro`.
- [ ] Le lien éventuel avec **Art Tabac** (nature du partenariat, mention ou non sur le site).
- [ ] Âge d'accès au fumoir affiché (la réglementation fixe un minimum de 16 ans ; le site indique « adultes »).
- [ ] Politique « cigares apportés » (FAQ).
- [ ] Les mots-clés SEO « fumoir cigare Paris » / « bar à cigares Paris 14 » sont utilisés uniquement dans les titres et descriptions factuels de la page.

## Loi Évin — alcool (art. L3323-2 et suivants)

- Mention « L'abus d'alcool est dangereux pour la santé, à consommer avec modération » dans le pied de page de **toutes les pages** et sur la page Bar.
- Descriptions des boissons limitées à des éléments objectifs : origine, âge, composition, prix (l'affichage des prix est une obligation pour un restaurant).
- Une offre sans alcool est présentée sur la page Bar.
- Visuels sobres (voir `docs/design-system.md`).

## RGPD / cookies (recommandations CNIL)

- Aucun outil de mesure d'audience ni cookie publicitaire.
- Polices auto-hébergées : aucune requête vers Google Fonts.
- Carte Google Maps : bloquée par défaut, chargée seulement après consentement (bandeau ou bouton « Afficher la carte »). Le bouton « Refuser » est aussi visible que « Accepter ». Choix conservé 6 mois, modifiable via le lien « Gérer les cookies » du pied de page.
- Formulaire de devis : case de consentement obligatoire, lien vers la politique de confidentialité, champ anti-spam invisible (pas de reCAPTCHA).
- Pages : mentions légales, politique de confidentialité, politique cookies (FR, avec traduction EN).

À compléter par le client :
- [ ] Raison sociale, SIRET, RCS, TVA, directeur de la publication, numéro de licence (mentions légales).
- [ ] Adresse e-mail de contact pour l'exercice des droits.
- [ ] Vérifier le cadre de transfert de Formspree (DPF / clauses contractuelles types).

## Avis clients

Les notes (4,8 Tripadvisor, 4,9 service, 4,7 Google) et les expressions affichées proviennent des avis publics.
Aucun témoignage n'a été inventé. Pour citer un avis complet avec le prénom de son auteur, obtenir son accord.
