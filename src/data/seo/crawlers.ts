/**
 * Politique d'accès des robots, à assumer et à pouvoir expliquer.
 *
 * - Les robots de RECHERCHE et de RÉPONSE (ils récupèrent une page pour la citer à un utilisateur) sont autorisés :
 *   c'est ce qui rend le site citable par les moteurs génératifs (GEO).
 * - Les robots d'ENTRAÎNEMENT collectent des pages pour entraîner des modèles. Le contenu étant gratuit et pédagogique,
 *   ils sont autorisés par défaut ; passer `ALLOW_AI_TRAINING` à `false` les bloque tout en gardant la recherche.
 */
export const ALLOW_AI_TRAINING = true;

export const SEARCH_AND_ANSWER_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
  'Applebot',
] as const;

export const AI_TRAINING_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
  'Amazonbot',
] as const;
