import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

/**
 * Accès à Firebase. Auth et Firestore sont chargés à la demande : leur SDK pèse plusieurs dizaines de ko
 * et ne doit pas ralentir le premier affichage d'un visiteur qui n'a pas de compte.
 */
@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

  private appPromise: Promise<FirebaseApp> | undefined;
  private authPromise: Promise<Auth> | undefined;
  private firestorePromise: Promise<Firestore> | undefined;

  app(): Promise<FirebaseApp> {
    this.appPromise ??= this.createApp();
    return this.appPromise;
  }

  auth(): Promise<Auth> {
    this.authPromise ??= this.createAuth();
    return this.authPromise;
  }

  firestore(): Promise<Firestore> {
    this.firestorePromise ??= this.createFirestore();
    return this.firestorePromise;
  }

  /** Analytics : navigateur uniquement et chargé à la demande, pour ne pas peser sur le LCP/INP ni sur le SSR. */
  async enableAnalytics(): Promise<void> {
    if (!this.isBrowser) return;
    const [{ getAnalytics, isSupported }, app] = await Promise.all([
      import('firebase/analytics'),
      this.app(),
    ]);
    if (await isSupported()) getAnalytics(app);
  }

  private async createApp(): Promise<FirebaseApp> {
    const [{ getApps, initializeApp }, { parseFirebaseConfig }] = await Promise.all([
      import('firebase/app'),
      import('./firebase-config'),
    ]);
    return getApps()[0] ?? initializeApp(parseFirebaseConfig(import.meta.env));
  }

  private async createAuth(): Promise<Auth> {
    const [{ connectAuthEmulator, getAuth }, app] = await Promise.all([
      import('firebase/auth'),
      this.app(),
    ]);
    const auth = getAuth(app);
    if (this.useEmulators && this.isBrowser) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    }
    return auth;
  }

  private async createFirestore(): Promise<Firestore> {
    const [{ connectFirestoreEmulator, getFirestore }, app] = await Promise.all([
      import('firebase/firestore'),
      this.app(),
    ]);
    const firestore = getFirestore(app);
    if (this.useEmulators && this.isBrowser) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
    return firestore;
  }
}
