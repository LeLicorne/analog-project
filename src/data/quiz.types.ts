declare const brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [brand]: B };

export const THEME_SLUGS = [
  'culture-generale',
  'histoire',
  'geographie',
  'sciences',
  'web',
  'gaming',
] as const;

export type ThemeSlug = (typeof THEME_SLUGS)[number];

/** Date calendaire `YYYY-MM-DD`, validée par `parseIsoDate`. */
export type IsoDate = Brand<string, 'IsoDate'>;

/** Identifiant stable d'une question : `<theme>-<numéro sur 3 chiffres>`, ex. `histoire-007`. */
export type QuestionId = `${ThemeSlug}-${number}`;

export type Difficulty = 'facile' | 'moyen' | 'difficile';

export interface Source {
  readonly label: string;
  readonly url: `https://${string}`;
}

interface QuestionBase {
  readonly id: QuestionId;
  /** Énoncé complet, compréhensible hors contexte (il est repris tel quel dans les pages publiques). */
  readonly prompt: string;
  /** Réponse expliquée en 1 à 3 phrases factuelles, autonomes et citables. */
  readonly explanation: string;
  readonly difficulty: Difficulty;
  readonly source: Source;
}

export interface SingleChoiceQuestion extends QuestionBase {
  readonly type: 'single';
  readonly choices: readonly [string, string, string, string];
  readonly answerIndex: 0 | 1 | 2 | 3;
}

export interface TrueFalseQuestion extends QuestionBase {
  readonly type: 'true-false';
  readonly answer: boolean;
}

export type Question = SingleChoiceQuestion | TrueFalseQuestion;

export interface Theme {
  readonly slug: ThemeSlug;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  /** Emoji purement décoratif (toujours `aria-hidden`). */
  readonly icon: string;
}

/** Réponse donnée par le joueur : index du choix (QCM) ou booléen (vrai/faux). */
export type Answer = number | boolean;
