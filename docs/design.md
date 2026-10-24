# Design : le style « cartoon / BD »

Quizz du jour a un style de bande dessinée : aplats vifs, gros contours, ombres dures décalées, bulles de dialogue. Tout est en **CSS** (aucune police, aucune image, aucune illustration) : la refonte n'a donc ni alourdi le chemin critique ni touché à la CSP.

## Où ça vit

Un seul fichier : [`src/styles.css`](../src/styles.css). Les composants Angular n'ont aucun style (ni `styles:` ni `style=`), seulement des classes. Les jetons sont en tête de fichier ; tout le reste les utilise.

## Les jetons

| Jeton                             | Rôle                                                              |
| --------------------------------- | ----------------------------------------------------------------- |
| `--bg`, `--dots`, `--surface`     | Fond crème à trame de points, couleur des points, fond des cartes |
| `--ink`, `--muted`, `--link`      | Texte, texte atténué, liens                                       |
| `--border`, `--shadow`            | Contour (3 px) et ombre dure décalée                              |
| `--accent`, `--on-accent`         | Jaune « marqueur » et le texte posé dessus                        |
| `--primary`, `--on-primary`       | Bouton principal                                                  |
| `--ok-*`, `--ko-*`                | Bonne et mauvaise réponse (fond et bordure)                       |
| `--focus`                         | Anneau de focus                                                   |
| `--theme-<thème>`, `--on-theme`   | Une gommette de couleur par thème, texte toujours sombre dessus   |
| `--stroke`, `--radius`, `--shift` | Épaisseur du contour, arrondi, décalage de l'ombre                |

**Mode sombre = « BD de nuit »** : fond bleu nuit, contours et texte crème, accent jaune. Il suit la préférence du système.

## Les formes à connaître

- **`h1`** : bandeau jaune (couleur du thème sur les pages de thème, par `data-theme`).
- **Bulles de dialogue** : la question, le texte d'introduction (`.lead`) et le retour de réponse (`.feedback`). La queue est un pseudo-élément décoratif.
- **Boutons** : jaune pour l'action principale, blanc pour la secondaire. Ils « s'enfoncent » au clic.
- **Cartes de thème** : bandeau coloré (`data-theme`) + corps blanc.
- **Réponses** : grosses étiquettes ; la réponse choisie passe en jaune.

## Les règles à ne pas casser (chacune est testée)

1. **Toute couleur est un jeton**, et tout jeton de couleur passe les contrastes : `src/styles.contrast.spec.ts` lit le CSS et échoue si une paire passe sous 4,5:1 (texte) ou 3:1 (composants), en clair et en sombre. Ajouter une couleur = l'ajouter aux paires du test.
2. **Aucune information portée par la couleur seule.** Bonne réponse : bordure pleine + icône ✓ + texte « Bonne réponse ». Mauvaise réponse choisie : bordure pointillée + icône ✕ + texte « Votre réponse ». Un thème : emoji + nom, la couleur n'est qu'un décor.
3. **Pas d'`overflow: hidden`, de hauteur fixe ni de rotation** sur un élément large ou textuel : l'espacement du texte WCAG 1.4.12 et le défilement horizontal à 320 px (`e2e/a11y-modes.spec.ts`) casseraient. Seules les queues de bulles (petits pseudo-éléments) sont pivotées.
4. **Mouvements sous `@media (prefers-reduced-motion: no-preference)`**, courts (moins de 150 ms), jamais en boucle (WCAG 2.2.2). L'effet « le bouton s'enfonce » est un changement d'état immédiat, pas une animation.
5. **Focus toujours visible** : anneau de 4 px décalé de 3 px, jaune en sombre.
6. **Contraste élevé de Windows** (`forced-colors`) : le CSS ne dépend pas des ombres ni des fonds ; la structure passe par les contours.
7. **Aucun style ni script en ligne** (CSP) : un test d'analyse statique le vérifie.

## Ajouter un composant

Utiliser les jetons (`var(--surface)`, `var(--border)`, `var(--stroke)`, `var(--shift)`), reprendre une forme existante (carte, bulle, pastille), ajouter la page aux tests d'accessibilité (`quizz-new-page`), puis relire avec `quizz-a11y-review`. Si on introduit une nouvelle couleur : jeton + paire dans `styles.contrast.spec.ts` **avant** de l'utiliser.

## Ce qui est volontairement absent

Mascotte, illustrations, polices externes, sons, confettis, bascule manuelle clair/sombre. Chacun peut s'ajouter sans toucher à cette base (une police ou une image demanderait de revoir la CSP et les budgets de performance).
