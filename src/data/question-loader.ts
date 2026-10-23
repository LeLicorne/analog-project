import type { Question, ThemeSlug } from './quiz.types';

/** Un import dynamique par thème : chaque pool de questions devient son propre chunk, chargé à la demande. */
const LOADERS = {
  'culture-generale': () => import('./questions/culture-generale'),
  histoire: () => import('./questions/histoire'),
  geographie: () => import('./questions/geographie'),
  sciences: () => import('./questions/sciences'),
  web: () => import('./questions/web'),
  gaming: () => import('./questions/gaming'),
} as const satisfies Record<ThemeSlug, () => Promise<{ default: readonly Question[] }>>;

export async function loadQuestions(theme: ThemeSlug): Promise<readonly Question[]> {
  return (await LOADERS[theme]()).default;
}
