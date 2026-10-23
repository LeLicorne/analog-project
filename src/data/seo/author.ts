export interface Author {
  readonly name: string;
  /** Profils publics de l'auteur (GitHub, LinkedIn...), en https uniquement. */
  readonly sameAs: readonly `https://${string}`[];
}

function isHttpsUrl(value: string): value is `https://${string}` {
  try {
    return new URL(value).protocol === 'https:' && value.startsWith('https://');
  } catch {
    return false;
  }
}

/**
 * Auteur du site, lu dans l'environnement (`VITE_AUTHOR_NAME`, `VITE_AUTHOR_GITHUB`, `VITE_AUTHOR_LINKEDIN`).
 * Sans nom, aucun auteur n'est publié : on n'invente jamais une identité, et les données structurées ne décrivent
 * que ce que la page affiche (la page À propos montre l'auteur quand il est configuré).
 */
export function parseAuthor(env: Readonly<Record<string, string | undefined>>): Author | null {
  const name = env['VITE_AUTHOR_NAME']?.trim();
  if (!name) return null;
  const sameAs = [env['VITE_AUTHOR_GITHUB'], env['VITE_AUTHOR_LINKEDIN']]
    .map((value) => value?.trim() ?? '')
    .filter(isHttpsUrl);
  return { name, sameAs };
}
