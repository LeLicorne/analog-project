import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { type FirebaseApp, getApps, initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

import { parseFirebaseConfig } from './firebase-config';

/**
 * Accès à Firebase. Auth et Firestore sont chargés à la demande : leur SDK pèse plusieurs dizaines de ko
 * et ne doit pas ralentir le premier affichage d'un visiteur qui n'a pas de compte.
 */
@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

  private authPromise: Promise<Auth> | undefined;
  private firestorePromise: Promise<Firestore> | undefined;

  get app(): FirebaseApp {
    return getApps()[0] ?? initializeApp(parseFirebaseConfig(import.meta.env));
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
    const { getAnalytics, isSupported } = await import('firebase/analytics');
    if (await isSupported()) getAnalytics(this.app);
  }

  private async createAuth(): Promise<Auth> {
    const { connectAuthEmulator, getAuth } = await import('firebase/auth');
    const auth = getAuth(this.app);
    if (this.useEmulators && this.isBrowser) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    }
    return auth;
  }

  private async createFirestore(): Promise<Firestore> {
    const { connectFirestoreEmulator, getFirestore } = await import('firebase/firestore');
    const firestore = getFirestore(this.app);
    if (this.useEmulators && this.isBrowser) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
    return firestore;
  }
}
