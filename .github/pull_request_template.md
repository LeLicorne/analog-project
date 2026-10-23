## Ce que fait ce changement

<!-- Une phrase : le problème résolu, pas la liste des fichiers. -->

## Relu, compris et testé

- [ ] J'ai relu **chaque ligne** générée et je peux expliquer ce qu'elle fait et pourquoi (code produit par un agent compris).
- [ ] `bun run check` est vert (format, lint, typecheck, tests unitaires).
- [ ] `bun run test:e2e` est vert pour les pages ou parcours touchés (lancé une fois, échecs corrigés à la source).
- [ ] Tout code métier nouveau a un test qui échouerait s'il était faux.

## Thèmes du projet

- [ ] **Accessibilité** : page ajoutée aux tests axe ; focus, annonces, couleur non seule, clavier vérifiés (`quizz-a11y-review`).
- [ ] **SEO / GEO** : titre et description uniques, rendu serveur, données structurées cohérentes avec le texte (`quizz-seo-geo-check`).
- [ ] **Sécurité** : pas de script ni style inline, pas de secret, règles Firestore testées si modifiées (`quizz-security-review`).
- [ ] **Performance** : pas de dépendance lourde dans le chemin critique ; Lighthouse mobile comparé si le JavaScript a grossi.

## Ce qui n'est pas vérifié

<!-- Être honnête : ce qui n'a pas été testé (appareil réel, lecteur d'écran, envoi réel...). -->
