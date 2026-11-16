# Modifier le site sans toucher au code

Guide pour l'équipe de Casa Pelletier.

## Option 1 — L'interface d'administration (recommandé)

1. Aller sur **https://www.casapelletier.fr/admin/**
2. Se connecter avec son compte GitHub (le développeur vous aura ajouté au projet).
3. Choisir ce que vous voulez modifier :
   - **Horaires & informations** : horaires, téléphone, lien de réservation en ligne, notes des avis.
   - **La carte du restaurant** : ajouter, retirer ou modifier un plat et son prix.
   - **Le bar** : familles de spiritueux, cocktails, boissons sans alcool.
   - **Événements & privatisation** : agenda des soirées, formats, espaces.
   - **Questions fréquentes**.
4. Cliquer sur **Publier**. Le site est à jour en une à deux minutes.

Quelques règles :
- **Prix** : uniquement des chiffres (`24` ou `24,50`), sans le symbole €.
- **Horaires** : format `HH:MM` (ex. `18:30`). Un service qui finit après minuit s'écrit `01:00`.
- **Agenda** : un événement n'apparaît que s'il est coché « Publié » et que sa date n'est pas passée.
  Le site se met à jour chaque nuit pour retirer les dates passées.
- **Loi Évin** : pour le bar, rester factuel (origine, âge, composition). Pas de « exceptionnel », « à ne pas manquer », « happy hour ». **Jamais de marque ni de prix de cigares.**
- Pensez à remplir aussi les champs **EN** (version anglaise). S'ils sont vides, rien ne s'affiche en anglais.

Si une information est mal saisie, le site refuse de se publier et l'ancienne version reste en ligne : rien ne casse.

## Option 2 — Directement sur GitHub

Les contenus sont des fichiers texte dans `src/content/` :

| Fichier | Contenu |
|---|---|
| `infos.json` | Téléphone, adresse, horaires, liens, avis |
| `carte.json` | Carte du restaurant |
| `bar.json` | Bar |
| `evenements.json` | Formats, espaces, agenda |
| `faq.json` | Questions fréquentes |

Sur github.com, ouvrir le fichier, cliquer sur le crayon, modifier, puis « Commit changes ».

## Remplacer une photo

Les photos sont dans `src/assets/images/`. Pour remplacer une photo provisoire, envoyer un fichier
**portant exactement le même nom** (ex. `hero-salon-cheminee.jpg`). Format JPG, 2400 px de large pour
la photo d'accueil, 1600 px pour les autres. Le site s'occupe de la compression.
