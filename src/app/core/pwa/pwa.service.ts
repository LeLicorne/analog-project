import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

import { toIsoDate } from '@data/dates';
import { THEMES } from '@data/themes';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ readonly outcome: 'accepted' | 'dismissed' }>;
}

interface NetworkInformationLike {
  readonly saveData?: boolean;
}

export type InstallOutcome = 'accepted' | 'dismissed' | 'unavailable';

const PREFETCH_KEY_PREFIX = 'quizz-du-jour:prefetch:';
const CONTROL_TIMEOUT_MS = 5000;

/**
 * Tout ce qui fait de Quizz du jour une application : service worker (hors-ligne), mise à jour, invite d'installation,
 * état du réseau, et préchargement des quiz du jour pour pouvoir jouer sans connexion.
 */
@Injectable({ providedIn: 'root' })
export class PwaService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);

  /** Vrai par défaut (rendu serveur) ; mis à jour au démarrage dans le navigateur. */
  readonly online = signal(true);
  readonly updateAvailable = signal(false);
  readonly canInstall = signal(false);

  private installEvent: BeforeInstallPromptEvent | null = null;
  private registration: ServiceWorkerRegistration | undefined;

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) this.start();
    });
  }

  /** Active la nouvelle version du service worker puis recharge la page. */
  applyUpdate(): void {
    navigator.serviceWorker.addEventListener(
      'controllerchange',
      () => {
        window.location.reload();
      },
      { once: true },
    );
    this.registration?.waiting?.postMessage({ type: 'SKIP_WAITING' });
  }

  async promptInstall(): Promise<InstallOutcome> {
    const event = this.installEvent;
    if (!event) return 'unavailable';
    this.installEvent = null;
    this.canInstall.set(false);
    await event.prompt();
    return (await event.userChoice).outcome;
  }

  /**
   * Télécharge les pages des quiz du jour (le code est précaché par le service worker) pour qu'ils soient jouables hors connexion.
   * Une fois par jour, jamais en mode économie de données, jamais hors ligne.
   */
  async prefetchToday(): Promise<void> {
    const today = toIsoDate(new Date());
    const key = `${PREFETCH_KEY_PREFIX}${today}`;
    const connection = (navigator as Navigator & { connection?: NetworkInformationLike })
      .connection;
    if (!navigator.onLine || connection?.saveData === true || readFlag(key)) return;

    try {
      // Avant la prise de contrôle, les requêtes de la page ne passent pas par le service worker : rien ne serait mis en cache.
      await this.whenControlled();
      // Le code des pages (précaché d'après le manifeste du build) est rafraîchi par le service worker lui-même.
      navigator.serviceWorker.controller?.postMessage({ type: 'REFRESH_PRECACHE' });
      for (const path of ['/', ...THEMES.map((theme) => `/quiz/${theme.slug}`)]) {
        // `Accept: text/html` : le service worker range cette réponse avec les pages et non avec les fichiers.
        await fetch(path, { headers: { Accept: 'text/html' } });
      }
      writeFlag(key);
    } catch {
      // Réseau coupé en cours de route : on réessaiera au prochain démarrage.
    }
  }

  private start(): void {
    this.online.set(navigator.onLine);
    this.listen('online', () => {
      this.online.set(true);
    });
    this.listen('offline', () => {
      this.online.set(false);
    });
    this.listen('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.installEvent = event as BeforeInstallPromptEvent;
      this.canInstall.set(true);
    });
    this.listen('appinstalled', () => {
      this.installEvent = null;
      this.canInstall.set(false);
    });

    // Le service worker n'est actif qu'en production : en développement il servirait des fichiers périmés.
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      const register = (): void => {
        void this.register();
      };
      if (document.readyState === 'complete') register();
      else window.addEventListener('load', register, { once: true });
    }
  }

  /** La toute première visite démarre sans service worker : on attend qu'il prenne le contrôle de la page. */
  private whenControlled(): Promise<void> {
    if (navigator.serviceWorker.controller) return Promise.resolve();
    return new Promise<void>((resolve) => {
      const done = (): void => {
        clearTimeout(timer);
        navigator.serviceWorker.removeEventListener('controllerchange', done);
        resolve();
      };
      const timer = setTimeout(done, CONTROL_TIMEOUT_MS);
      navigator.serviceWorker.addEventListener('controllerchange', done);
    });
  }

  /** Écoute un événement de la fenêtre et le retire à la destruction du service. */
  private listen(type: string, handler: (event: Event) => void): void {
    window.addEventListener(type, handler);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener(type, handler);
    });
  }

  private async register(): Promise<void> {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      this.registration = registration;
      if (registration.waiting && navigator.serviceWorker.controller)
        this.updateAvailable.set(true);
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            this.updateAvailable.set(true);
          }
        });
      });
      await navigator.serviceWorker.ready;
      await this.prefetchToday();
    } catch (error) {
      console.error('Service worker indisponible', error);
    }
  }
}

function readFlag(key: string): boolean {
  try {
    return localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function writeFlag(key: string): void {
  try {
    localStorage.setItem(key, '1');
  } catch {
    // Stockage indisponible : le préchargement se refera au prochain démarrage.
  }
}
