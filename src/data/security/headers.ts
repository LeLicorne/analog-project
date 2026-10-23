export interface SecurityHeaderOptions {
  /** Adresse publique du site : le HSTS n'est envoyé que pour une adresse en https. */
  readonly siteUrl: string;
  /** Build de test : autorise en plus les émulateurs Firebase locaux. */
  readonly useEmulators: boolean;
}

/** Services Firebase réellement appelés par le navigateur (Auth e-mail/mot de passe et Firestore). */
const FIREBASE_CONNECT_SOURCES = [
  'https://identitytoolkit.googleapis.com',
  'https://securetoken.googleapis.com',
  'https://firestore.googleapis.com',
] as const;

const EMULATOR_CONNECT_SOURCES = [
  'http://localhost:9099',
  'http://127.0.0.1:9099',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
] as const;

/**
 * Content-Security-Policy stricte, sans nonce ni hash.
 *
 * Elle n'a besoin d'aucun `'unsafe-inline'` parce que le site n'émet ni script ni style inline exécutable :
 * les pages statiques (prérendues) ne pourraient d'ailleurs pas recevoir de nonce par requête. Si un jour un script inline
 * devient nécessaire, il faudra un hash calculé au build plutôt que d'affaiblir `script-src`.
 * Les blocs JSON (`ld+json`, `ng-state`) ne sont pas exécutés : la CSP ne les concerne pas.
 */
export function buildCsp(options: SecurityHeaderOptions): string {
  const isHttps = options.siteUrl.startsWith('https://');
  const connect = [
    "'self'",
    ...FIREBASE_CONNECT_SOURCES,
    ...(options.useEmulators ? EMULATOR_CONNECT_SOURCES : []),
  ];

  const directives: Record<string, readonly string[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'"],
    'img-src': ["'self'", 'data:'],
    'font-src': ["'self'"],
    'connect-src': connect,
    'manifest-src': ["'self'"],
    'worker-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
  };

  const parts = Object.entries(directives).map(([name, sources]) => `${name} ${sources.join(' ')}`);
  if (isHttps) parts.push('upgrade-insecure-requests');
  return parts.join('; ');
}

export function buildSecurityHeaders(options: SecurityHeaderOptions): Record<string, string> {
  const headers: Record<string, string> = {
    'content-security-policy': buildCsp(options),
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'permissions-policy':
      'camera=(), microphone=(), payment=(), usb=(), serial=(), bluetooth=(), interest-cohort=()',
    'x-frame-options': 'DENY',
    'cross-origin-opener-policy': 'same-origin',
  };
  if (options.siteUrl.startsWith('https://')) {
    headers['strict-transport-security'] = 'max-age=63072000; includeSubDomains; preload';
  }
  return headers;
}
