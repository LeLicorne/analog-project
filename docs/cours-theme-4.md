# Thème 4 : Performance, SEO / GEO et Accessibilité

> Cours illustré par le projet **Quizz du jour** (AnalogJS, SSR + prérendu, Docker sur VPS).
> Fil rouge : _on ne mesure pas pour se rassurer, on mesure pour décider._ Chaque notion suit le même schéma : **ce que c'est → ce que j'ai fait dans le projet → comment je le prouve → quels outils comparer.**

Les chiffres viennent des mesures du dépôt (`docs/mesures.md`, `docs/performance.md`, `docs/tests.md`) : mesures Lighthouse mobile simulées, reproductibles avec Lighthouse dans Chrome (DevTools) ou sur PageSpeed Insights.

---

## 1. Performance

### 1.1 Les Core Web Vitals

| Métrique                                                | Mesure                                                         | « Bon » seuil | Remarque                                     |
| ------------------------------------------------------- | -------------------------------------------------------------- | ------------- | -------------------------------------------- |
| **LCP** (Largest Contentful Paint)                      | Affichage du plus gros élément visible                         | ≤ 2,5 s       | Critère de classement Google                 |
| **INP** (Interaction to Next Paint)                     | Délai entre une interaction et la mise à jour                  | ≤ 200 ms      | Remplace FID. **Pas mesuré par Lighthouse**  |
| **CLS** (Cumulative Layout Shift)                       | Décalages de mise en page inattendus                           | ≤ 0,1         | Un bouton qui bouge au moment du clic        |
| FCP (First Contentful Paint), TTFB (Time To First Byte) | Diagnostics                                                    | 1,8 s, 0,8 s  | Pas des Core Web Vitals                      |
| **TBT** (Total Blocking Time)                           | Blocage du fil principal (équivalent de l'INP dans Lighthouse) | ≤ 200 ms      | Pèse 30 % du score de performance Lighthouse |

**Comment tester** :

- **Lighthouse** : Chrome (navigation privée) → DevTools → onglet Lighthouse → Mobile → analyser.
- **PageSpeed Insights** (pagespeed.web.dev) : la même analyse sur un site en ligne, plus les données des vrais visiteurs de Chrome quand il y en a assez.
- **Panneau Performance** de DevTools : LCP, CLS et **INP** en direct pendant qu'on utilise la page (Lighthouse ne clique pas, il ne mesure pas l'INP).
- **Dans la CI** : Lighthouse relancé automatiquement à chaque modification, avec des seuils bloquants.

### 1.2 Ce que j'ai fait (avant → après, mobile simulé)

Diagnostic de départ : LCP dominé par la **contention de bande passante** (460 ko de JS non compressé préchargé en même temps que le CSS bloquant).

| Cause                                   | Correction                                                            | Effet                                                  |
| --------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------ |
| Aucune compression                      | Précompression gzip + brotli (Nitro `compressPublicAssets`)           | Chunk Angular 273 → 71 ko ; poids total 460 → 96 ko    |
| Pas de cache sur les fichiers hachés    | `Cache-Control: public, max-age=31536000, immutable` sur `/assets/**` | Visites suivantes : 0 téléchargement                   |
| Zod (92 ko) dans le chemin critique     | Validation écrite à la main (`parseResults`), testée                  | −25 ko compressés par page (et Zod sonde `eval` : CSP) |
| Firebase chargé pour tous               | `import()` dynamique : un visiteur anonyme ne télécharge rien         | Moins de JS au démarrage                               |
| « Chargement du quiz… » à l'hydratation | Questions chargées par la route (résolveur) côté serveur et client    | **CLS 0,043 → 0**                                      |

| Page         | Perf        | LCP             | Poids        |
| ------------ | ----------- | --------------- | ------------ |
| Accueil      | 83 → **99** | 3,51 s → 1,73 s | 460 → 96 ko  |
| Quiz du jour | 75 → **96** | 4,43 s → 2,48 s | 510 → 119 ko |

Après la refonte « cartoon BD » (100 % CSS, aucune police ni image ajoutée), Lighthouse CI, médiane de 3 mesures : perf 97-98, LCP ≈ 1,65 s, CLS 0, TBT ≈ 150 ms.

**Leçon de méthode** : le choix du design (100 % CSS, pas de police web, pas d'image) _est_ une optimisation de performance. La requête la plus rapide est celle qu'on ne fait pas.

### 1.3 Comment c'est verrouillé (pas juste mesuré une fois)

`lighthouserc.json` fait échouer la CI sous ces budgets : perf ≥ 0,9, accessibilité = 1, SEO = 1, bonnes pratiques ≥ 0,95, **LCP ≤ 2800 ms, CLS ≤ 0,1, TBT ≤ 200 ms**. Un budget est une règle de test, pas une intention.

### 1.4 Comparer les outils de performance

| Outil                              | Type                | Force                                                       | Limite                                                            |
| ---------------------------------- | ------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------- |
| **Lighthouse** (CLI, DevTools, CI) | Labo                | Gratuit, reproductible, audits détaillés, **budgets en CI** | Une machine, un réseau simulé ; ne mesure pas l'INP               |
| **PageSpeed Insights**             | Labo + terrain      | Lighthouse **+ données CrUX** réelles                       | Pas d'historique, une URL à la fois                               |
| **CrUX / Search Console**          | Terrain             | Ce que Google utilise réellement ; seul vrai INP            | Trafic minimum, retard de 28 jours, pas de diagnostic fin         |
| **WebPageTest**                    | Labo                | Vrais appareils et lieux, filmstrip, waterfall très précis  | Plus long à lire                                                  |
| **DebugBear / SpeedCurve**         | Labo planifié + RUM | Historique, alertes, comparaison de concurrents             | Payants (voir la page « Lighthouse alternative » de DebugBear)    |
| **Sentry** (perf + erreurs)        | Terrain (RUM)       | Erreurs JS et traces liées aux vrais utilisateurs           | SDK dans le bundle ; autoriser son domaine en `connect-src` (CSP) |

Dans le projet : `/healthz` (statut, commit, uptime) pour la supervision ; Lighthouse CI à chaque push ; Search Console, PSI et un moniteur externe (UptimeRobot, Better Stack, Uptime Kuma) sont **à brancher après la mise en ligne** (`docs/monitoring.md`).

---

## 2. Accessibilité

### 2.1 Vocabulaire en deux lignes

- **WCAG** (W3C) : norme internationale, 4 principes (perceptible, utilisable, compréhensible, robuste), niveaux A / AA / AAA. **AA** est la cible légale. WCAG 2.2 ajoute notamment : focus non masqué (2.4.11), taille de cible 24 px (2.5.8), saisie redondante (3.3.7), authentification accessible (3.3.8).
- **RGAA** : référentiel français, **13 thématiques, 106 critères**, audité à la main. Les outils automatiques ne couvrent qu'**environ 30 à 40 %** des critères : ils voient un `alt` manquant, pas un `alt` faux.

### 2.2 Ce qui rend le site accessible (et la preuve)

| Principe                                             | Dans le projet                                                                                                       | Preuve                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Pas d'information par la couleur seule               | Bonne / mauvaise réponse = **icône ✓ / ✗ + texte + bordure pleine ou pointillée**                                    | Revue manuelle, e2e                                    |
| Contraste ≥ 4,5:1 (texte), 3:1 (composants)          | **Jetons de couleur** dans `styles.css` ; une paire illisible fait échouer les tests, en clair **et** en sombre      | `src/styles.contrast.spec.ts` (49 vérifications) + axe |
| Clavier et focus                                     | Focus visible 3 px, focus déplacé après chaque étape du quiz, lien d'évitement, aucun piège                          | `e2e/quiz.spec.ts`                                     |
| Structure                                            | Un `h1`, titres ordonnés, repères `header/nav/main/footer`, `lang="fr"`, titre unique                                | `e2e/seo.spec.ts`, axe                                 |
| Formulaires                                          | Étiquettes, erreurs liées (`aria-describedby`, `aria-invalid`), `role="alert"`, `autocomplete`, pas de double saisie | `e2e/account.spec.ts`                                  |
| Mouvement et zoom                                    | `prefers-reduced-motion` respecté ; pas de défilement horizontal à 320 px (zoom 400 %) ; espacement WCAG 1.4.12      | `e2e/a11y-modes.spec.ts`                               |
| Aucune limite de temps, aucune animation automatique | Par conception                                                                                                       | —                                                      |

Automatisation : `e2e/a11y.spec.ts` lance **axe-core** sur chaque page avec les tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa` et exige **0 violation**. Idem en mode sombre, en 320 px et avec l'espacement forcé.

### 2.3 Démo

1. **Clavier seul** : Tab depuis l'accueil → lien d'évitement, focus visible, jouer un quiz sans souris.
2. **axe DevTools** (ou Lighthouse a11y) sur une page : 0 violation.
3. **Zoom 400 % + mode sombre** : rien ne déborde, le contraste tient.
4. (Si possible) **VoiceOver** (⌘ + F5) : écouter une question et le retour de réponse.

### 2.4 Comparer les outils d'accessibilité

| Outil                                                  | Couvre                                     | À utiliser pour                              |
| ------------------------------------------------------ | ------------------------------------------ | -------------------------------------------- |
| **Lighthouse (a11y)**                                  | Sous-ensemble des règles d'axe             | Garde-fou rapide en CI                       |
| **axe-core / axe DevTools**                            | Référence open source, 0 faux positif visé | Tests e2e, relecture de page                 |
| **Pa11y, WAVE, Accessibility Insights**                | Autres moteurs et visualisations           | Recouper, trouver ce qu'axe ne dit pas       |
| **Lecteurs d'écran** (VoiceOver, NVDA, JAWS, TalkBack) | Ce que l'utilisateur entend vraiment       | Critères de sens, ordre de lecture, annonces |
| **Audit RGAA par un tiers**                            | Les 106 critères                           | Seul moyen de déclarer une conformité        |

---

## 3. SEO puis GEO

### 3.1 SEO : les bases

- **SEO** = améliorer sa position dans les résultats **naturels** (SERP). **SEA** = annonces payantes (enchères + Quality Score). On ne paie pas la position SEO, on la mérite ; on paie le clic en SEA.
- **Comment fonctionne un moteur** : un **robot** (spider, `Googlebot`, `Bingbot`) suit les liens (« internaute fou »), récupère le HTML (**crawl**), décide quoi garder (**indexation**), puis classe (**ranking**) selon la requête. Le temps alloué est le **crawl budget**.
- **Les trois piliers** : technique (le robot peut lire), contenu (il répond à l'intention), popularité (liens entrants).
- **Mots-clés et longue traîne** : « quiz » (très concurrentiel, flou) vs « quiz histoire gratuit 5 questions du jour » (peu de volume, **intention précise**, conversion forte). La longue traîne représente, ensemble, la majorité des recherches. Outils : **Semrush** (volume, difficulté, concurrents), **AnswerThePublic** (les vraies questions posées), Google Search Console (ce pour quoi vous apparaissez déjà).

**Dans le projet** : une page par thème **et par jour** (`/quiz/<thème>/<AAAA-MM-JJ>`) avec le corrigé en clair : chaque page cible une requête de longue traîne (« quiz histoire du 12 novembre »). Le contenu est présent dans le HTML serveur.

### 3.2 Ce que j'ai mis en œuvre (preuve)

| Élément                     | Implémentation                                                                                            | Où                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------- |
| Titre + description uniques | Titre ≤ 60 caractères (`fitTitle` n'ajoute le nom du site que si ça tient) ; description par type de page | `src/data/seo/page-meta.ts` |
| Canonique, Open Graph       | `SeoService` : `canonical`, `og:*`, mis à jour à chaque navigation                                        | `core/seo/seo.service.ts`   |
| Données structurées         | JSON-LD : `Organization`, `WebSite`, `BreadcrumbList`, `FAQPage`, `Quiz` / `Question` (+ `Person` auteur) | `src/data/seo/json-ld.ts`   |
| `robots.txt`                | Généré, **un groupe par robot** (un robot qui a son groupe ignore `*`)                                    | `src/data/seo/robots.ts`    |
| `sitemap.xml`               | Généré, toutes les pages dont les quiz passés                                                             | `src/data/seo/sitemap.ts`   |
| `llms.txt`                  | Généré : résumé + pages utiles + FAQ                                                                      | `src/data/seo/llms.ts`      |
| 404 réelles                 | Pages inexistantes répondent 404 (elles répondaient 200)                                                  | `docs/mesures.md`           |
| Rendu serveur               | Prérendu des pages publiques ; contenu dans le HTML                                                       | `vite.config.ts`            |

**Score SEO Lighthouse 82 → 100.** Ce que le 82 cachait : aucune meta description, `robots.txt` qui renvoyait la page d'accueil (« 16 erreurs »), accueil vide sans JS, 404 en 200. **Mais** : le 100 ne dit rien du fond (contenu, intention, popularité). Lighthouse SEO = hygiène technique, pas du référencement.

### 3.3 Google et ses mises à jour : pandas, pingouins

Google corrige son algorithme pour éliminer ce qui gagnait grâce à la **manipulation** plutôt qu'à la valeur :

| Mise à jour                    | Année       | Cible                                                      | Exemple de pratique visée                            |
| ------------------------------ | ----------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| **Panda**                      | 2011        | **Contenu** : faible, dupliqué, fermes de contenu          | Pages fines, texte copié, 500 pages quasi identiques |
| **Penguin**                    | 2012        | **Liens** : achetés, artificiels, sur-optimisés            | Réseaux de liens, ancres exactes en masse            |
| Hummingbird, RankBrain, BERT   | 2013 à 2019 | **Comprendre l'intention**, pas seulement les mots         | Fin du « bourrage » de mots-clés                     |
| Helpful Content / Core updates | 2022 +      | Contenu fait **pour les moteurs** plutôt que pour les gens | Articles générés en masse, sans expertise            |

Panda et Penguin sont aujourd'hui intégrés au cœur de l'algorithme. Le principe reste.

### 3.4 White hat, black hat, et « les mauvaises habitudes »

**Black hat** (manipuler l'algorithme, résultat court terme, **risque de pénalité ou de désindexation**) : bourrage de mots-clés, texte caché (blanc sur blanc), **cloaking** (contenu différent pour le robot et pour l'humain), réseaux de blogs privés (PBN) et achat de liens, contenu spinné ou dupliqué, pages satellites (_doorway pages_), faux avis.

**Pratiques courantes mais mauvaises** (c'est ce qui surprend) :

| On a l'habitude de…                                         | Pourquoi c'est un problème                                                                                                                                          |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mettre une balise `<meta keywords>`                         | Ignorée par Google depuis des années                                                                                                                                |
| Bloquer un dossier dans `robots.txt` pour le « désindexer » | `Disallow` empêche de **lire**, pas d'indexer ; et le robot ne verra jamais le `noindex`. **Choix du projet** : pages de compte en `noindex`, **pas** en `Disallow` |
| Bloquer CSS / JS dans `robots.txt`                          | Le robot ne rend pas la page correctement                                                                                                                           |
| Rendre toute la page en JavaScript côté client              | Beaucoup de robots (surtout d'IA) n'exécutent pas JS : page vide                                                                                                    |
| Ancres « cliquez ici »                                      | Aucun signal, **et** mauvais pour l'accessibilité (RGAA 6)                                                                                                          |
| `user-scalable=no` ou bloquer le zoom                       | Échec WCAG, pénalisant sur mobile                                                                                                                                   |
| Tout mettre en `nofollow`                                   | Casse le maillage interne                                                                                                                                           |
| Titre bourré de mots-clés                                   | Réécrit par Google, taux de clic plus faible                                                                                                                        |
| Charger en `lazy` l'image principale (LCP)                  | Dégrade le LCP                                                                                                                                                      |

### 3.5 GEO : Generative Engine Optimization

**Définition.** Le GEO vise à être **cité, repris ou recommandé** dans la réponse d'un moteur génératif (AI Overviews / AI Mode de Google, ChatGPT Search, Perplexity, Claude, Copilot), là où le SEO vise à être **classé** dans une liste de liens. Le GEO est une **spécialité du SEO, pas son remplacement** (Semrush, HubSpot et Screaming Frog le disent dans le même sens).

**Comment ces moteurs construisent une réponse (simplifié)** :

1. L'utilisateur pose une question ; le moteur la **décompose en sous-requêtes** (_query fan-out_).
2. Il **récupère** des pages (son propre index, ou un robot de recherche IA comme `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`).
3. Il **extrait des passages** et **génère** une réponse en citant ses sources.

Conséquence : on gagne si la page est **récupérable** (robot autorisé, rendu serveur, rapide), **extractible** (passages clairs, factuels, autonomes) et **fiable** (source, date, auteur, données structurées cohérentes).

**Ce que Google dit officiellement** (page « AI features » de Search Central) : **aucune exigence supplémentaire** pour apparaître dans AI Overviews / AI Mode, **pas de balisage ni de fichier « IA » spécial** ; il faut être **indexé et éligible à un extrait**. Ce qui compte : robots.txt qui laisse explorer, maillage interne, contenu important **en texte**, données structurées **cohérentes avec le texte visible**. Contrôles : `nosnippet` / `max-snippet` / `noindex` (affichage dans Search), `Google-Extended` (entraînement et _grounding_ hors Search). Les apparitions comptent dans Search Console, type « Web ».

#### Trois familles de robots : à distinguer

| Famille                                | Rôle                                    | Exemples (dans `src/data/seo/crawlers.ts`)                                                                              | Choix du projet                                                                                                                    |
| -------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Recherche / réponse**                | Récupère une page **pour la citer**     | `Googlebot`, `Bingbot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`, `Claude-User`, `Applebot` | **Autorisés** : c'est ce qui rend le site citable                                                                                  |
| **Entraînement**                       | Collecte pour **entraîner** des modèles | `GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, `Applebot-Extended`, `Amazonbot`, `meta-externalagent`               | Autorisés (contenu gratuit et pédagogique) ; **un seul booléen** `ALLOW_AI_TRAINING` pour les bloquer tout en gardant la recherche |
| **Agent déclenché par un utilisateur** | Visite en direct à la demande           | `ChatGPT-User`, `Perplexity-User`, `Claude-User`                                                                        | Autorisés                                                                                                                          |

Message : **« bloquer l'IA » n'est pas une décision unique**. On peut refuser l'entraînement et rester cité.

#### Ce que j'ai fait pour le GEO

| Levier                               | Pourquoi ça aide une IA                                                      | Dans le projet                                                                                |
| ------------------------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Contenu dans le HTML serveur**     | La plupart des crawlers d'IA **n'exécutent pas JavaScript**                  | Prérendu / SSR ; test e2e « sans JS »                                                         |
| **Réponses autonomes et factuelles** | Un passage doit être compréhensible isolé                                    | Question + bonne réponse + explication courte                                                 |
| **Sources citées, dates, auteur**    | Signal de fiabilité (E-E-A-T)                                                | Lien source par question, vérifié chaque semaine (`check:links`) ; `Person` auteur en JSON-LD |
| **Données structurées**              | Lever l'ambiguïté (qui, quoi, quand) ; **doivent refléter le texte visible** | `Quiz`, `Question`, `FAQPage`, `Organization`, `BreadcrumbList`                               |
| **`robots.txt` assumé**              | Choisir qui peut lire et entraîner                                           | Un groupe par robot, testé (`robots.spec.ts`)                                                 |
| **`/llms.txt`**                      | Point d'entrée en Markdown lisible par un agent                              | Généré depuis les mêmes données que le sitemap                                                |
| **Fraîcheur et URL stables**         | Les IA privilégient du récent et du citable                                  | Un quiz par jour, une URL par date, sitemap régénéré chaque nuit                              |
| **Rapidité**                         | Un robot a un délai maximum                                                  | LCP ≈ 1,7 s (labo)                                                                            |

#### À dire sans détour sur `llms.txt`

`llms.txt` (format llmstxt.org) est **proposé, pas un standard adopté** : aucun grand moteur ne garantit s'en servir pour classer ou citer. Il est utile comme **point d'entrée lisible** et il est **contrôlé par la nouvelle catégorie expérimentale Lighthouse « Agentic Browsing »** (voir ci-dessous). Il **ne remplace pas** le contenu serveur, les données structurées et les sources. Le projet l'indique dans le code (`llms.ts`). Si on le présente comme une baguette magique, on fait du marketing, pas de l'ingénierie.

#### Lighthouse « Agentic Browsing » (expérimental)

D'après la documentation Chrome : nouvelle catégorie **expérimentale** (Chrome 150+), **sans score 0-100** : elle affiche un **ratio de contrôles réussis**. Elle vérifie notamment : l'intégration **WebMCP** (outils exposés aux agents, origin trial), une **accessibilité orientée agent** (noms accessibles, arbre d'accessibilité valide, éléments interactifs non masqués), la **stabilité** (CLS) et la **présence d'un `llms.txt`**. **Intérêt pédagogique** : les agents « lisent » votre page comme un lecteur d'écran. Une bonne accessibilité est donc aussi une bonne lisibilité par les IA : **c'est le même travail**.

#### Mesurer le GEO

Pas d'équivalent de la Search Console pour ChatGPT ou Perplexity. Méthodes :

1. **Panel de requêtes fixes** : 10 à 20 questions posées chaque mois à ChatGPT, Perplexity, Claude, Gemini (recherche activée) ; noter date, plateforme, **cité ou non**, position de la citation.
2. **Journaux serveur** : les robots d'IA n'exécutent pas JS, donc **aucun outil JavaScript (GA) ne les voit**. Seuls les journaux (Traefik / GoAccess) montrent `GPTBot`, `ClaudeBot`, `PerplexityBot`.
3. **Sources de trafic** : visites avec referrer `chatgpt.com`, `perplexity.ai` (dans l'outil d'analytique choisi).
4. **Search Console** : l'onglet Performance, type « Web », inclut les apparitions dans les fonctionnalités IA de Google.
5. **Outils** : Semrush, HubSpot et d'autres vendent désormais des suivis de « visibilité IA » (voir leurs articles sur les KPI du GEO). À comparer à votre panel manuel avant de payer.

**Démo** (tout dans le navigateur) :

1. Ouvrir `https://analog.baptiste-lore.com/robots.txt` puis `/llms.txt` : un groupe par robot, le résumé du site.
2. Ouvrir une page de quiz, puis DevTools → ⌘ + Maj + P → « Disable JavaScript » → recharger : le contenu est toujours là. Pour se faire passer pour un robot : DevTools → Network conditions → User agent personnalisé (`GPTBot`).
3. Tester les données structurées avec le [test des résultats enrichis de Google](https://search.google.com/test/rich-results), ou chercher `ld+json` dans le code source de la page.

---

## 4. Screaming Frog : un robot que vous pilotez

**Screaming Frog SEO Spider** est un **crawler** de bureau : il fait ce que fait un robot, sur **votre** site, et rend visible ce que vous ne voyez pas page par page. Sa force, c'est de **couvrir SEO, GEO et performance dans le même crawl**.

| Thème             | Ce que le crawl révèle                                                                                                                                                                                                                                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SEO technique** | Codes HTTP (404, 301, 5xx), chaînes de redirections, titres / descriptions manquants, trop longs ou dupliqués, `h1`, canoniques, `noindex`, **hreflang**, pages orphelines, profondeur de page, maillage interne, contenu dupliqué ou quasi dupliqué, liens cassés, validation du `robots.txt` et du sitemap                                                    |
| **GEO**           | **HTML brut, sans JavaScript** (gratuit : le contenu existe-t-il sans JS ?), rendu JavaScript (payant), **user-agent personnalisable** (explorer comme un robot donné), **extraction de données structurées** et validation JSON-LD, extraction personnalisée (XPath / CSS, ex. présence d'une source par question), analyses sémantiques / IA selon la version |
| **Performance**   | (payant) **Intégration PageSpeed Insights** : lance Lighthouse (+ CrUX) sur **toutes** les URL du crawl et met les métriques en colonnes (LCP, CLS, TBT, poids). On repère les pages les plus lentes du site, pas seulement l'accueil                                                                                                                           |

**Gratuit ou payant** : la version gratuite explore jusqu'à **500 URL**, sans exécuter JavaScript, ce qui suffit pour l'essentiel du SEO technique et du GEO. La **licence payante** ajoute le rendu JavaScript, l'intégration PageSpeed Insights et les autres intégrations (performance ci-dessus). Dans tous les cas, c'est un outil d'**audit** (instantané), pas de surveillance continue ; il ne remplace pas la mesure terrain.

**Démo (version gratuite)** : explorer `https://analog.baptiste-lore.com` avec la version gratuite, qui lit le **HTML brut sans exécuter JavaScript**, comme la plupart des robots d'IA. Vérifier que chaque page a son titre, son `h1` et son texte (onglets « Page Titles », « H1 », colonne « Word Count »). Comparer avec le navigateur, JavaScript désactivé (DevTools → « Disable JavaScript »). **Si tout est trouvé sans JavaScript, le site est lisible par un robot d'IA.**

**Positionnement final** : Lighthouse = une page, en profondeur, en CI. Screaming Frog = **tout le site, en largeur**. CrUX / Search Console = **la réalité des utilisateurs**. Il faut les trois niveaux.

---

## 5. À retenir

1. **Un seul chantier** : HTML serveur, sémantique, léger. Il sert la perf, le SEO, le GEO et l'accessibilité.
2. **Un score n'est pas une preuve.** Le 82 SEO cachait un accueil vide ; un outil ne vérifie que 30 à 40 % des critères d'accessibilité.
3. **Le GEO n'est pas magique** : pas de balisage « IA » requis (Google l'écrit), `llms.txt` est utile mais non standard ; ce qui compte, c'est être **récupérable, extractible, fiable**.
4. **Verrouiller par des tests** : budgets Lighthouse CI, axe en e2e, contraste calculé, robots / sitemap / JSON-LD testés. Sans test, la régression arrive.

---

## Annexes

### Outils utilisés (tous en interface)

| Besoin                       | Outil                                                                       |
| ---------------------------- | --------------------------------------------------------------------------- |
| Performance                  | Chrome DevTools → Lighthouse et panneau Performance ; PageSpeed Insights    |
| Accessibilité                | Extension axe DevTools, Lighthouse, VoiceOver                               |
| Données structurées          | Test des résultats enrichis de Google                                       |
| Vue d'un robot               | DevTools → « Disable JavaScript », User agent personnalisé ; Screaming Frog |
| Contrôles automatiques en CI | Onglet Actions du dépôt GitHub (budgets Lighthouse, axe, tests)             |

### Sources

- Semrush : `llms.txt`, problèmes de crawlabilité
- Chrome : Lighthouse « Agentic Browsing », scoring
- Google Search Central : fonctionnalités IA (AI Overviews, AI Mode)
- HubSpot : GEO et KPI de visibilité IA
- DebugBear : alternatives à Lighthouse
- Screaming Frog : optimisation pour la recherche IA
- Outils : Sentry, AnswerThePublic ; cours SEO fourni (`Cours.pdf`)
