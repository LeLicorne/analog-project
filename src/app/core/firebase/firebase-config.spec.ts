import { parseFirebaseConfig } from './firebase-config';

const validEnv = {
  VITE_FIREBASE_API_KEY: 'key',
  VITE_FIREBASE_AUTH_DOMAIN: 'x.firebaseapp.com',
  VITE_FIREBASE_PROJECT_ID: 'x',
  VITE_FIREBASE_STORAGE_BUCKET: 'x.appspot.com',
  VITE_FIREBASE_MESSAGING_SENDER_ID: '1',
  VITE_FIREBASE_APP_ID: '1:1:web:1',
};

describe('parseFirebaseConfig', () => {
  it('construit la config sans measurementId quand il est absent', () => {
    const config = parseFirebaseConfig(validEnv);
    expect(config.projectId).toBe('x');
    expect('measurementId' in config).toBe(false);
  });

  it('inclut measurementId quand il est fourni', () => {
    expect(
      parseFirebaseConfig({ ...validEnv, VITE_FIREBASE_MEASUREMENT_ID: 'G-1' }).measurementId,
    ).toBe('G-1');
  });

  it('échoue en nommant la variable manquante', () => {
    expect(() => parseFirebaseConfig({ ...validEnv, VITE_FIREBASE_API_KEY: undefined })).toThrow(
      'VITE_FIREBASE_API_KEY',
    );
  });

  it('traite une variable vide ou faite d’espaces comme absente', () => {
    expect(() => parseFirebaseConfig({ ...validEnv, VITE_FIREBASE_APP_ID: '   ' })).toThrow(
      'VITE_FIREBASE_APP_ID',
    );
  });

  it('liste toutes les variables manquantes d’un coup', () => {
    expect(() => parseFirebaseConfig({})).toThrow(/API_KEY.*AUTH_DOMAIN.*PROJECT_ID/);
  });
});
