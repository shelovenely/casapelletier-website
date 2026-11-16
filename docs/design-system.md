# Design system — Casa Pelletier

Ambiance visée : un club anglais à Paris. Cuir, bois sombre, cheminée, lumière basse.
Règle d'or : **peu d'effets, beaucoup d'espace**. Pas de dégradés décoratifs, pas d'icônes à tout va,
pas de cartes identiques alignées par trois. On compose comme une mise en page de magazine.

## Couleurs

Tokens déclarés dans `src/styles/global.css` (`@theme`), utilisables en classes Tailwind (`bg-vert`, `text-laiton`…).

| Token | Hex | Usage | Contraste vérifié |
|---|---|---|---|
| `noir` | `#141210` | Fond par défaut (noir chaud) | — |
| `vert` | `#1F2E26` | Sections alternées, appel à réserver | ivoire 12:1 |
| `vert-deep` | `#17231D` | Pied de page, formulaire | — |
| `tabac` | `#5A3A22` | Bandeau avis (à 40 %), texte secondaire sur ivoire | ivoire 8,6:1 |
| `cognac` | `#A9692E` | **Décoratif / gros titres uniquement** | noir 4,2:1 → AA grand texte seulement |
| `cognac-dark` | `#8A5222` | Liens et petits textes sur fond ivoire | ivoire 5,4:1 ✅ AA |
| `ivoire` | `#F3EBDD` | Texte principal sur fond sombre, fond « carte imprimée » | noir 15,8:1 |
| `ivoire-mute` | `#BFB6A6` | Texte secondaire sur fond sombre | noir 9,3:1 · vert 7,1:1 |
| `laiton` | `#B89A5B` | Surtitres, filets, bouton principal | noir 7:1 · vert 5,3:1 |

Décisions d'accessibilité :
- Le **bouton principal est laiton sur texte noir** (7:1) et non cognac, qui échoue en AA sur petit texte.
- Le cognac de la palette d'origine reste réservé aux éléments décoratifs ; `cognac-dark` a été ajouté pour les textes sur ivoire.

## Typographie

Polices **auto-hébergées** (`@fontsource`), aucun appel à Google Fonts (RGPD + performance).

| Rôle | Police | Réglages |
|---|---|---|
| Titres | Cormorant Garamond 400 / 500 / 400 italique | `display` 42→72 px, `h-section` 34→48 px, interlignage 1,02–1,08 |
| Texte | Jost (variable) | 17 px, graisse 350, interlignage 1,7 |
| Surtitres | Jost capitales | 11,5 px, interlettrage 0,24 em, couleur laiton |

L'italique de Cormorant sert d'accent dans les grands titres (« *rue du Château.* »), en laiton.
Les chiffres romains (I, II, III…) numérotent les univers, comme les chapitres d'un livre de club.

## Composants

| Composant | Fichier | Notes |
|---|---|---|
| Boutons | `.btn-primary`, `.btn-ghost`, `.btn-dark` | Rectangulaires, capitales espacées, hauteur ≥ 48 px (cible tactile) |
| Surtitre | `.eyebrow` | Optionnellement précédé d'un numéro romain (`Heading`) |
| Filet orné | `Ornament.astro` | Filet laiton + losange, séparateur récurrent |
| Photo | `ui/Photo.astro` | AVIF/WebP, `srcset` responsive, lazy-load, appel par nom de fichier |
| Bandeau de page | `PageHero.astro` | Photo plein écran + zoom lent (14 s) |
| Carte imprimée | `.paper` dans `Table.astro` | Fond ivoire, points de conduite entre plat et prix |
| Horaires | `HoursList.astro` | Jour courant mis en gras (heure de Paris) |
| Carte Google | `MapEmbed.astro` | Chargée seulement après consentement |
| Barre d'appel mobile | `MobileCallBar.astro` | Fixe en bas d'écran < 768 px |
| Formulaire devis | `QuoteForm.astro` | Champs soulignés, sans cadre |

## Mouvement

- Zoom lent sur les photos d'en-tête (14 s), apparition des titres en fondu (1,4 s, décalés de 250 ms).
- Apparition au défilement (`data-reveal`) : 1,2 s, déplacement de 18 px seulement.
- Tout est désactivé avec `prefers-reduced-motion`. Sans JavaScript, tout reste visible.

## Photos (direction pour le shooting / la sélection Instagram)

- Lumière chaude et basse, ombres profondes. Pas de flash.
- Matières : cuir, bois, laiton, verre. Mains et gestes plutôt que visages posés.
- **Loi Évin** : aucun gros plan de cigare allumé, de fumée, de marque, de bague ou de boîte. Le fumoir se montre comme une pièce (fauteuils, boiseries). Pour l'alcool : verres et bouteilles sans mise en scène festive, pas de personnes en train de boire.
