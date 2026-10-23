import { defineEventHandler, getRequestURL, setHeader, setResponseStatus, type H3Event } from 'h3';

const ALLOWED_METHODS = ['GET', 'HEAD', 'OPTIONS'];

/** Les adresses du site n'utilisent que des lettres, chiffres et `- . _ ~ /` : tout autre caractère est une tentative d'injection. */
const FORBIDDEN_PATH_CHARACTER = /[^A-Za-z0-9\-._~/]/;

/** Réponse à texte fixe : le gestionnaire d'erreurs par défaut recopierait l'adresse demandée dans un JSON. */
function reject(event: H3Event, status: number, message: string): string {
  setResponseStatus(event, status, message);
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  return message;
}

/**
 * Défense en profondeur, appliquée avant tout autre traitement.
 *
 * - Méthodes : le serveur ne sert que du contenu en lecture. Il n'existe aucune route qui modifie un état (les écritures
 *   vont directement à Firestore, protégées par ses règles), donc aucun jeton CSRF à vérifier ni aucun cookie de session.
 * - Chemin : une adresse contenant `{{`, `<`, `"` ou un caractère de contrôle ne correspond à aucune page : on la refuse
 *   au lieu de laisser le rendu serveur retomber sur la page d'accueil (faux 200, contenu dupliqué).
 */
export default defineEventHandler((event): string | undefined => {
  if (!ALLOWED_METHODS.includes(event.method)) {
    setHeader(event, 'Allow', ALLOWED_METHODS.join(', '));
    return reject(event, 405, 'Method Not Allowed');
  }

  let path: string;
  try {
    path = decodeURIComponent(getRequestURL(event).pathname);
  } catch {
    return reject(event, 400, 'Bad Request');
  }
  if (FORBIDDEN_PATH_CHARACTER.test(path)) return reject(event, 400, 'Bad Request');
  // Rien à signaler : la requête continue vers les routes.
  return undefined;
});
