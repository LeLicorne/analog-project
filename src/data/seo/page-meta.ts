import { formatDate, formatLongDate } from '../dates';
import type { IsoDate, Theme } from '../quiz.types';

export const SITE_NAME = 'Quizz du jour';

const MAX_TITLE_LENGTH = 60;

export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

/** Ajoute le nom du site seulement si le titre reste affichable en entier dans les résultats de recherche. */
export function fitTitle(base: string): string {
  const full = `${base} | ${SITE_NAME}`;
  return full.length <= MAX_TITLE_LENGTH ? full : base;
}

export function homeMeta(): PageMeta {
  return {
    title: `${SITE_NAME} : un quiz gratuit chaque jour`,
    description:
      'Six quiz gratuits par jour : culture générale, histoire, géographie, sciences, web et gaming. Cinq questions chacun, réponses expliquées et sourcées.',
  };
}

export function themeMeta(theme: Theme): PageMeta {
  return {
    title: fitTitle(`Quiz ${theme.name} gratuit : 5 questions par jour`),
    description: theme.description,
  };
}

export function todayMeta(theme: Theme, date: IsoDate): PageMeta {
  return {
    title: fitTitle(`Quiz ${theme.name} du jour : ${formatLongDate(date)}`),
    description: `Le quiz ${theme.name} du ${formatLongDate(date)} : 5 questions, sans limite de temps, avec une explication sourcée après chaque réponse.`,
  };
}

export function archiveMeta(theme: Theme, date: IsoDate, questionCount: number): PageMeta {
  return {
    title: fitTitle(`Quiz ${theme.name} du ${formatDate(date)} : réponses`),
    description: `Questions et réponses du quiz ${theme.name} du ${formatDate(date)} : ${questionCount} questions avec explication et source. Consultez le corrigé ou rejouez le quiz.`,
  };
}

export function aboutMeta(): PageMeta {
  return {
    title: fitTitle('À propos : méthode et sources des quiz'),
    description:
      'Comment sont conçus les quiz : sources citées pour chaque réponse, vérification automatique des liens, tirage du jour identique pour tous, accessibilité.',
  };
}

export function accountMeta(kind: 'login' | 'signup'): PageMeta {
  return {
    title: fitTitle(kind === 'login' ? 'Se connecter' : 'Créer un compte'),
    description:
      'Un compte facultatif pour sauvegarder vos résultats et votre série de jours sur tous vos appareils.',
  };
}

export function notFoundMeta(): PageMeta {
  return {
    title: fitTitle('Page introuvable'),
    description: 'Cette page n’existe pas. Retrouvez tous les quiz du jour sur la page d’accueil.',
  };
}
