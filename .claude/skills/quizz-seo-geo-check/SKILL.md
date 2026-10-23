---
name: quizz-seo-geo-check
description: Contrôle le SEO technique et le GEO d'une page ou d'un changement de Quizz du jour (rendu serveur, balises, données structurées, robots, contenu citable). À utiliser avant de publier une page ou de modifier robots, sitemap ou métadonnées.
---

# Contrôle SEO et GEO

Référence : `docs/mesures.md` (état mesuré), `src/data/seo/` (toute la logique).

## 1. Ce que reçoit un robot

```
curl -s -A "GPTBot" http://localhost:4173/<page> | head -c 3000
```

Le HTML brut doit contenir le `title`, le `h1`, le contenu, la canonique et le JSON-LD. Un contenu qui n'apparaît qu'après JavaScript est invisible pour GPTBot, ClaudeBot et PerplexityBot. (Le test `e2e/seo.spec.ts` le vérifie pour six robots.)

## 2. Technique

- Un seul `h1`, titres hiérarchisés ; `title` <= 60 caractères, description 70 à 160, uniques (`page-meta.spec.ts`).
- Canonique : une seule adresse par contenu (le quiz du jour est `/quiz/<thème>`, pas l'adresse datée d'aujourd'hui).
- Code HTTP : 200 pour une page, **404 réel** (et `noindex`) pour une adresse inconnue.
- `robots.txt` (`src/data/seo/robots.ts`) : robots de recherche et de réponse IA autorisés nommément, interdictions répétées dans chaque groupe, pas de `Disallow` sur une page qu'on veut en `noindex`. Accès à vérifier aussi **au niveau du pare-feu, du CDN et de Traefik** : un robot bloqué au réseau ne lit jamais le robots.txt.
- Sitemap : seulement des pages indexables, URL absolues. Pages de compte jamais dedans.
- Maillage : toute page est atteignable par un lien interne ; pas de page orpheline.

## 3. GEO : un passage doit pouvoir être cité seul

- Réponse directe en début de section ; phrases autonomes ; faits datés ; **sources citées** ; aucun chiffre inventé.
- Données structurées identiques au texte visible (la FAQ du JSON-LD vient de `src/data/faq.ts`, la même source que l'affichage) ; auteur (`Person` + `sameAs`) seulement s'il est configuré et affiché.
- Pas de bourrage de mots-clés. `llms.txt` existe mais n'est pas une stratégie.

## 4. Vérifier

`bun run test` (métadonnées, JSON-LD, robots, sitemap), `bun run test:e2e` (une fois), et pour une mise en ligne : Search Console (indexation, sitemap), test des résultats enrichis, `bun run check:links`.

## Format de la réponse

Liste `constat | gravité | correction | fichier`, du plus bloquant (rendu serveur, accès robots) au plus fin (formulation).
