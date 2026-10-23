/**
 * Messages en français pour les erreurs Firebase Auth.
 * Identifiants incorrects et compte inexistant donnent le même message : on ne révèle pas quels e-mails sont inscrits.
 */
const MESSAGES: Readonly<Record<string, string>> = {
  'auth/invalid-credential': 'E-mail ou mot de passe incorrect.',
  'auth/wrong-password': 'E-mail ou mot de passe incorrect.',
  'auth/user-not-found': 'E-mail ou mot de passe incorrect.',
  'auth/invalid-email': 'Cette adresse e-mail n’est pas valide.',
  'auth/email-already-in-use': 'Impossible de créer le compte avec cette adresse e-mail.',
  'auth/weak-password': 'Le mot de passe est trop faible : utilisez au moins 8 caractères.',
  'auth/too-many-requests': 'Trop de tentatives. Patientez quelques minutes avant de réessayer.',
  'auth/network-request-failed': 'Connexion impossible : vérifiez votre réseau et réessayez.',
};

const FALLBACK = 'Une erreur est survenue. Réessayez dans un instant.';

export function authErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = error.code;
    if (typeof code === 'string') return MESSAGES[code] ?? FALLBACK;
  }
  return FALLBACK;
}
