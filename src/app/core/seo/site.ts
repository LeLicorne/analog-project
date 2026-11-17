import { parseAuthor } from '@data/seo/author';

export { SITE_NAME } from '@data/seo/page-meta';

const DEFAULT_SITE_URL = 'http://localhost:4173';

/** Adresse publique du site, injectée au build (`VITE_SITE_URL`). */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, '');

/** Auteur publié (null tant que `VITE_AUTHOR_NAME` n'est pas défini). */
export const AUTHOR = parseAuthor(import.meta.env);

export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? '';

/** Hébergeur affiché dans les mentions légales (nom, adresse et téléphone), vide tant que `VITE_HOST_NAME` n'est pas défini. */
export const HOST_NAME = import.meta.env.VITE_HOST_NAME?.trim() ?? '';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
