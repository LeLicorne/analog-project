export interface FirebaseConfig {
  readonly apiKey: string;
  readonly authDomain: string;
  readonly projectId: string;
  readonly storageBucket: string;
  readonly messagingSenderId: string;
  readonly appId: string;
  readonly measurementId?: string;
}

const REQUIRED_VARIABLES = {
  apiKey: 'VITE_FIREBASE_API_KEY',
  authDomain: 'VITE_FIREBASE_AUTH_DOMAIN',
  projectId: 'VITE_FIREBASE_PROJECT_ID',
  storageBucket: 'VITE_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'VITE_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'VITE_FIREBASE_APP_ID',
} as const;

/**
 * Construit la config Firebase depuis les variables d'environnement et échoue tout de suite, avec le nom de la variable
 * manquante. Écrit à la main : Zod 4 sonde `eval` avec `new Function`, ce que la CSP signale comme une violation.
 */
export function parseFirebaseConfig(env: Record<string, string | undefined>): FirebaseConfig {
  const missing: string[] = [];
  const read = (variable: string): string => {
    const value = env[variable]?.trim();
    if (!value) missing.push(variable);
    return value ?? '';
  };

  const config = {
    apiKey: read(REQUIRED_VARIABLES.apiKey),
    authDomain: read(REQUIRED_VARIABLES.authDomain),
    projectId: read(REQUIRED_VARIABLES.projectId),
    storageBucket: read(REQUIRED_VARIABLES.storageBucket),
    messagingSenderId: read(REQUIRED_VARIABLES.messagingSenderId),
    appId: read(REQUIRED_VARIABLES.appId),
  };
  if (missing.length > 0) {
    throw new Error(`Configuration Firebase incomplète : ${missing.join(', ')}`);
  }

  const measurementId = env['VITE_FIREBASE_MEASUREMENT_ID']?.trim();
  return measurementId ? { ...config, measurementId } : config;
}
