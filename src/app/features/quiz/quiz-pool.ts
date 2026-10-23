import type { ActivatedRouteSnapshot } from '@angular/router';

import { loadQuestions } from '@data/question-loader';
import type { Question } from '@data/quiz.types';
import { isThemeSlug } from '@data/themes';

/**
 * Résolveur de route : charge les questions du thème AVANT d'afficher la page, côté serveur comme côté client.
 * Le HTML rendu par le serveur et le premier rendu du navigateur sont ainsi identiques (pas d'état « chargement »
 * qui remplacerait le contenu à l'hydratation, donc pas de décalage de mise en page).
 */
export function resolveQuizPool(route: ActivatedRouteSnapshot): Promise<readonly Question[]> {
  const slug = route.paramMap.get('theme') ?? '';
  return isThemeSlug(slug) ? loadQuestions(slug) : Promise.resolve([]);
}
