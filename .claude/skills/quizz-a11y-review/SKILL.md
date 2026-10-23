---
name: quizz-a11y-review
description: Relit un changement de Quizz du jour du point de vue accessibilité (WCAG 2.2 AA, RGAA 4) et rend un verdict par critère. À utiliser avant de valider toute modification d'interface.
---

# Revue d'accessibilité

Référence : `docs/accessibilite.md` (critères RGAA et ce qui est déjà vérifié) et la page `/accessibilite` (ce que le site déclare : toute modification doit rester vraie).

## Quoi regarder dans le diff

1. **Sémantique d'abord** : `button`, `a`, `nav`, `main`, `fieldset/legend`, `label` relié au champ ; ARIA seulement si le HTML natif ne suffit pas.
2. **Clavier** : tout est atteignable et actionnable ; ordre logique ; focus visible (`:focus-visible`, 3 px) ; aucun piège ; après une action qui fait apparaître ou disparaître du contenu, le **focus est déplacé** (voir `quiz-player.component.ts`).
3. **Annonces** : les changements d'état passent par une région `role="status"` ou `role="alert"` **déjà présente** dans le DOM (sinon rien n'est annoncé).
4. **Couleur** : jamais seule (icône + texte) ; contrastes des jetons de `src/styles.css` : texte >= 4,5:1, composants >= 3:1, en clair **et** en sombre.
5. **Cibles** : 24 px minimum (44 px pour les boutons principaux).
6. **Formulaires** : étiquette visible, aide et erreur reliées par `aria-describedby`, `aria-invalid`, `autocomplete` correct, aucune saisie redondante ni test cognitif.
7. **Mouvement et temps** : aucune limite de temps ; toute transition sous `@media (prefers-reduced-motion: no-preference)`.
8. **Avant hydratation** : contrôles d'envoi en `[attr.disabled]` (le rendu serveur n'écrit pas `[disabled]`).
9. **Liens externes** : `rel="noopener noreferrer"` et mention « (s'ouvre dans un nouvel onglet) » pour les lecteurs d'écran.

## Vérifier, pas supposer

- Automatique : `bunx playwright test e2e/a11y.spec.ts e2e/a11y-modes.spec.ts` (une fois). axe ne couvre qu'environ 30 à 40 % des critères.
- Manuel, obligatoire pour une nouvelle interaction : parcours au clavier seul, puis VoiceOver (macOS : Cmd+F5), puis zoom 200 % et largeur 320 px.

## Format de la réponse

Un tableau `critère | verdict (conforme, à corriger, non vérifié) | preuve (fichier:ligne ou test)`, puis la liste des corrections à faire. Ne jamais écrire « conforme » pour ce qui n'a pas été testé : écrire « non vérifié ».
