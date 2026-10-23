/**
 * Vérifie que chaque lien « source » des questions répond encore (statut 2xx après redirections).
 * Usage : bun scripts/check-source-urls.ts   (aussi : bun run check:links)
 *
 * Un lien cassé détruit la crédibilité d'une réponse « sourcée » : ce contrôle est destiné à tourner en CI et à intervalle
 * régulier (les pages distantes peuvent être renommées). Il utilise le réseau : il ne fait pas partie de `bun run check`.
 */
import { loadQuestions } from '../src/data/question-loader';
import { THEME_SLUGS } from '../src/data/quiz.types';

const CONCURRENCY = 3;
const TIMEOUT_MS = 20_000;
const ATTEMPTS = 5;
const PAUSE_BETWEEN_REQUESTS_MS = 150;
const USER_AGENT =
  'quizz-du-jour-link-check/1.0 (verification de liens sources, projet pedagogique)';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Attente avant de réessayer : l'en-tête Retry-After du serveur s'il existe, sinon 2, 4, 8 secondes... */
function backoffMs(response: Response | null, attempt: number): number {
  const retryAfter = Number(response?.headers.get('retry-after'));
  if (Number.isFinite(retryAfter) && retryAfter > 0) return Math.min(retryAfter, 60) * 1000;
  return 2 ** attempt * 1000;
}

interface Failure {
  readonly url: string;
  readonly reason: string;
  readonly questions: string[];
}

const usedBy = new Map<string, string[]>();
for (const theme of THEME_SLUGS) {
  for (const question of await loadQuestions(theme)) {
    usedBy.set(question.source.url, [...(usedBy.get(question.source.url) ?? []), question.id]);
  }
}

async function check(url: string): Promise<string | null> {
  let reason = '';
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    let response: Response | null = null;
    try {
      response = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { 'User-Agent': USER_AGENT },
      });
      if (response.ok) return null;
      reason = `HTTP ${response.status}`;
      // Une erreur client définitive (404, 410) ne se corrige pas en réessayant ; 429 et 5xx, si.
      if (response.status === 404 || response.status === 410) return reason;
    } catch (error) {
      reason = error instanceof Error ? error.message : String(error);
    }
    if (attempt < ATTEMPTS) await sleep(backoffMs(response, attempt));
  }
  return reason;
}

const urls = [...usedBy.keys()];
const failures: Failure[] = [];
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let url = urls[next++]; url !== undefined; url = urls[next++]) {
      const reason = await check(url);
      await sleep(PAUSE_BETWEEN_REQUESTS_MS);
      if (reason) failures.push({ url, reason, questions: usedBy.get(url) ?? [] });
    }
  }),
);

process.stdout.write(`${urls.length} lien(s) source vérifié(s), ${failures.length} en échec\n`);
for (const failure of failures) {
  process.stdout.write(
    `  ${failure.reason}  ${failure.url}\n    utilisé par : ${failure.questions.join(', ')}\n`,
  );
}
process.exit(failures.length > 0 ? 1 : 0);
