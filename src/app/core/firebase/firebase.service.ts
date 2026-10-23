import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { type FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { type Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { type Firestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

import { parseFirebaseConfig } from './firebase-config';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

  readonly app: FirebaseApp = getApps()[0] ?? initializeApp(parseFirebaseConfig(import.meta.env));

  private authInstance: Auth | undefined;
  private firestoreInstance: Firestore | undefined;

  get auth(): Auth {
    if (!this.authInstance) {
      this.authInstance = getAuth(this.app);
      if (this.useEmulators && this.isBrowser) {
        connectAuthEmulator(this.authInstance, 'http://localhost:9099', { disableWarnings: true });
      }
    }
    return this.authInstance;
  }

  get firestore(): Firestore {
    if (!this.firestoreInstance) {
      this.firestoreInstance = getFirestore(getApp());
      if (this.useEmulators && this.isBrowser) {
        connectFirestoreEmulator(this.firestoreInstance, 'localhost', 8080);
      }
    }
    return this.firestoreInstance;
  }

  /** Analytics : navigateur uniquement et chargé à la demande, pour ne pas peser sur le LCP/INP ni sur le SSR. */
  async enableAnalytics(): Promise<void> {
    if (!this.isBrowser) return;
    const { getAnalytics, isSupported } = await import('firebase/analytics');
    if (await isSupported()) getAnalytics(this.app);
  }
}
