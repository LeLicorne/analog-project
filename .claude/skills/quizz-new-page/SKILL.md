---
name: quizz-new-page
description: Ajoute une page à Quizz du jour en respectant toutes les conventions du projet (SEO, GEO, accessibilité, sécurité, tests). À utiliser dès qu'on crée une route, une page éditoriale ou un nouveau type de page.
---

# Ajouter une page

Une page n'est terminée que lorsque **toutes** les étapes ci-dessous sont faites : chacune correspond à une régression déjà rencontrée ou évitée par un test.

## 1. Le composant

- Fichier `src/app/pages/<route>.page.ts` (export par défaut, composant autonome, `ChangeDetectionStrategy.OnPush`). Modèle : `src/app/pages/a-propos.page.ts`.
- Page mince : la logique va dans `src/app/features/<feature>/` ou `src/data/`.
- Un seul `h1`. Fil d'Ariane (`app-breadcrumb`) sauf pour l'accueil. Titres hiérarchisés, listes sémantiques, aucun `style=` ni gestionnaire `on*` inline.
- Contenu **rendu côté serveur** : pas de contenu chargé après coup, pas d'état « Chargement… » qui remplace le HTML à l'hydratation (utiliser un résolveur de route, voir `quiz-pool.ts`).
- Tout contrôle d'envoi : `[attr.disabled]` tant que l'application n'est pas interactive (`Interactive`), jamais `[disabled]`.

## 2. SEO et GEO

- Titre (60 caractères maximum) et description (70 à 160) dans une fonction de `src/data/seo/page-meta.ts`, **uniques** ; l'ajouter à `page-meta.spec.ts`.
- `usePageSeo(() => ({ ...meta, path, jsonLd: [...] }))` avec `graph(organization(SITE_URL, AUTHOR), ...)` et un `breadcrumbs(...)`. Les données structurées décrivent uniquement ce que la page **affiche**.
- Page indexable : l'ajouter à `sitemapEntries` (`src/data/seo/sitemap.ts`), à `prerenderRoutes` (`vite.config.ts`), au lien du pied de page ou du plan du site, et à `llms.ts` si elle est utile à un agent.
- Page non indexable (compte, outil) : `noindex: true` dans `usePageSeo`, **pas** de `Disallow` dans robots.txt (le robot doit pouvoir lire le `noindex`), et jamais dans le sitemap.

## 3. Accessibilité

- Ajouter la route aux listes de `e2e/a11y.spec.ts` et `e2e/a11y-modes.spec.ts` (axe en clair et sombre, 320 px, espacement du texte).
- Réponse ou état jamais porté par la couleur seule ; focus déplacé sur ce qui apparaît ; messages d'état dans une région `role="status"` qui existe avant le changement.

## 4. Tests et vérification

- Ajouter la page à `e2e/seo.spec.ts` (`PAGES`).
- Logique nouvelle : test unitaire voisin.
- Lancer **une fois** : `bun run check`, puis `bun run test:e2e`. Corriger à la source, ne jamais relancer en boucle.
