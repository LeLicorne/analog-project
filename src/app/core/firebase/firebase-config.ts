import { z } from 'zod';

const firebaseConfigSchema = z.object({
  apiKey: z.string().min(1),
  authDomain: z.string().min(1),
  projectId: z.string().min(1),
  storageBucket: z.string().min(1),
  messagingSenderId: z.string().min(1),
  appId: z.string().min(1),
  measurementId: z.string().min(1).exactOptional(),
});

export type FirebaseConfig = z.infer<typeof firebaseConfigSchema>;

export function parseFirebaseConfig(env: Record<string, string | undefined>): FirebaseConfig {
  const measurementId = env['VITE_FIREBASE_MEASUREMENT_ID'];
  return firebaseConfigSchema.parse({
    apiKey: env['VITE_FIREBASE_API_KEY'],
    authDomain: env['VITE_FIREBASE_AUTH_DOMAIN'],
    projectId: env['VITE_FIREBASE_PROJECT_ID'],
    storageBucket: env['VITE_FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: env['VITE_FIREBASE_MESSAGING_SENDER_ID'],
    appId: env['VITE_FIREBASE_APP_ID'],
    ...(measurementId ? { measurementId } : {}),
  });
}
