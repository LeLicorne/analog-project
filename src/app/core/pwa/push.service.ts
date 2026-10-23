import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, afterNextRender, computed, inject, signal } from '@angular/core';
import type * as MessagingModule from 'firebase/messaging';

import { AuthService } from '@app/core/auth/auth.service';
import { FirebaseService } from '@app/core/firebase/firebase.service';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY ?? '';
const DEVICE_KEY = 'quizz-du-jour:push-device';
const REGISTRATION_TIMEOUT_MS = 15_000;

function readDevice(): string | null {
  try {
    return localStorage.getItem(DEVICE_KEY);
  } catch {
    return null;
  }
}

function writeDevice(id: string | null): void {
  try {
    if (id) localStorage.setItem(DEVICE_KEY, id);
    else localStorage.removeItem(DEVICE_KEY);
  } catch {
    // Stockage indisponible : l'état « activé » sera simplement redemandé au prochain démarrage.
  }
}

/**
 * Rappel quotidien par notification (Firebase Cloud Messaging).
 * L'appareil est identifié par son Firebase Installation ID (FID, l'API `register` qui remplace `getToken`), rangé dans
 * `users/{uid}.pushTokens` ; un script serveur (`scripts/send-daily-push.ts`) envoie les messages à ces FID.
 * Sans `VITE_FIREBASE_VAPID_KEY`, la fonction entière est masquée.
 */
@Injectable({ providedIn: 'root' })
export class PushService {
  private readonly firebase = inject(FirebaseService);
  private readonly auth = inject(AuthService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly configured = VAPID_KEY !== '';
  readonly supported = signal(false);
  readonly permission = signal<NotificationPermission>('default');
  readonly enabled = signal(false);
  readonly busy = signal(false);
  readonly error = signal('');
  /** Vrai une fois la notification de test envoyée au service worker. */
  readonly testSent = signal(false);
  readonly available = computed(() => this.configured && this.supported());

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) return;
      const supported =
        'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
      this.supported.set(supported);
      if (!supported) return;
      this.permission.set(Notification.permission);
      this.enabled.set(Notification.permission === 'granted' && readDevice() !== null);
    });
  }

  async enable(): Promise<void> {
    const user = this.auth.user();
    if (!user) {
      this.error.set('Connectez-vous pour activer le rappel quotidien.');
      return;
    }
    this.busy.set(true);
    this.error.set('');
    try {
      const permission = await Notification.requestPermission();
      this.permission.set(permission);
      if (permission !== 'granted') {
        this.error.set(
          permission === 'denied'
            ? 'Les notifications sont bloquées pour ce site : autorisez-les dans les réglages du navigateur.'
            : 'Le rappel n’a pas été activé : l’autorisation n’a pas été accordée.',
        );
        return;
      }

      const [registration, messagingModule, app] = await Promise.all([
        navigator.serviceWorker.ready,
        import('firebase/messaging'),
        this.firebase.app(),
      ]);
      if (!(await messagingModule.isSupported())) {
        this.error.set('Ce navigateur ne prend pas en charge les notifications push.');
        return;
      }
      const fid = await this.register(messagingModule, app, registration);
      await this.saveDevice(user.uid, fid);
      writeDevice(fid);
      this.enabled.set(true);
    } catch (error) {
      console.error('Activation du rappel impossible', error);
      this.error.set('Le rappel n’a pas pu être activé pour le moment. Réessayez plus tard.');
    } finally {
      this.busy.set(false);
    }
  }

  /**
   * Notification de démonstration : demande le service worker d'afficher une notification, par le même code que pour un
   * vrai message push. Ne demande ni compte, ni clé VAPID, ni FCM : elle prouve seulement que l'affichage fonctionne.
   */
  async sendTest(): Promise<void> {
    this.error.set('');
    this.testSent.set(false);
    try {
      let permission = Notification.permission;
      if (permission === 'default') permission = await Notification.requestPermission();
      this.permission.set(permission);
      if (permission !== 'granted') {
        this.error.set(
          permission === 'denied'
            ? 'Les notifications sont bloquées pour ce site : autorisez-les dans les réglages du navigateur.'
            : 'La notification de test n’a pas été envoyée : l’autorisation n’a pas été accordée.',
        );
        return;
      }
      const worker = (await navigator.serviceWorker.getRegistration())?.active;
      if (!worker) {
        this.error.set(
          'Le service worker n’est pas encore actif : il ne l’est qu’en production, après un premier chargement. Rechargez la page.',
        );
        return;
      }
      worker.postMessage({ type: 'SHOW_TEST_NOTIFICATION' });
      this.testSent.set(true);
    } catch (error) {
      console.error('Notification de test impossible', error);
      this.error.set('La notification de test n’a pas pu être envoyée.');
    }
  }

  /** Retire l'appareil du compte. Au mieux : une panne réseau ne doit jamais empêcher de se déconnecter. */
  async disable(): Promise<void> {
    this.busy.set(true);
    this.error.set('');
    const fid = readDevice();
    const uid = this.auth.user()?.uid;
    try {
      if (fid && uid) await this.removeDevice(uid, fid);
      const [messagingModule, app] = await Promise.all([
        import('firebase/messaging'),
        this.firebase.app(),
      ]);
      if (await messagingModule.isSupported())
        await messagingModule.unregister(messagingModule.getMessaging(app));
    } catch (error) {
      console.error('Désactivation du rappel incomplète', error);
    } finally {
      writeDevice(null);
      this.enabled.set(false);
      this.busy.set(false);
    }
  }

  /** Enregistre l'appareil auprès de FCM et attend son FID, livré par un événement et non comme valeur de retour. */
  private register(
    messagingModule: typeof MessagingModule,
    app: Awaited<ReturnType<FirebaseService['app']>>,
    registration: ServiceWorkerRegistration,
  ): Promise<string> {
    const messaging = messagingModule.getMessaging(app);
    return new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => {
        unsubscribe();
        reject(new Error('Enregistrement FCM trop long'));
      }, REGISTRATION_TIMEOUT_MS);
      const unsubscribe = messagingModule.onRegistered(messaging, (fid) => {
        clearTimeout(timer);
        unsubscribe();
        resolve(fid);
      });
      messagingModule
        .register(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: registration })
        .catch((error: unknown) => {
          clearTimeout(timer);
          unsubscribe();
          reject(error instanceof Error ? error : new Error(String(error)));
        });
    });
  }

  private async saveDevice(uid: string, fid: string): Promise<void> {
    const [db, { doc, serverTimestamp, setDoc }] = await Promise.all([
      this.firebase.firestore(),
      import('firebase/firestore'),
    ]);
    await setDoc(
      doc(db, 'users', uid),
      { pushTokens: { [fid]: true }, updatedAt: serverTimestamp() },
      { merge: true },
    );
  }

  private async removeDevice(uid: string, fid: string): Promise<void> {
    const [db, { deleteField, doc, serverTimestamp, setDoc }] = await Promise.all([
      this.firebase.firestore(),
      import('firebase/firestore'),
    ]);
    await setDoc(
      doc(db, 'users', uid),
      { pushTokens: { [fid]: deleteField() }, updatedAt: serverTimestamp() },
      { merge: true },
    );
  }
}
