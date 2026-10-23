import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

import { FirebaseService } from '@app/core/firebase/firebase.service';
import { ProgressStore } from '@app/core/progress/progress.store';

export type AuthStatus = 'unknown' | 'signed-out' | 'signed-in';

export interface AuthUser {
  readonly uid: string;
  readonly email: string | null;
}

const SESSION_HINT_KEY = 'quizz-du-jour:session-hint';

function readSessionHint(): boolean {
  try {
    return localStorage.getItem(SESSION_HINT_KEY) === '1';
  } catch {
    return false;
  }
}

function writeSessionHint(active: boolean): void {
  try {
    if (active) localStorage.setItem(SESSION_HINT_KEY, '1');
    else localStorage.removeItem(SESSION_HINT_KEY);
  } catch {
    // Stockage indisponible : la session Firebase reste valide, seul le rechargement automatique est perdu.
  }
}

/**
 * Session Firebase Auth (e-mail + mot de passe). Le SDK n'est chargé que si le visiteur a déjà une session
 * (indice local) ou ouvre un formulaire de compte : un visiteur anonyme ne télécharge rien.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly firebase = inject(FirebaseService);
  private readonly progress = inject(ProgressStore);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly status = signal<AuthStatus>('unknown');
  readonly user = signal<AuthUser | null>(null);
  readonly isSignedIn = computed(() => this.status() === 'signed-in');

  private listening: Promise<void> | undefined;

  /** À appeler au démarrage dans le navigateur : ne charge Firebase que s'il y a une session à restaurer. */
  async restore(): Promise<void> {
    if (!this.isBrowser) return;
    if (!readSessionHint()) {
      this.status.set('signed-out');
      return;
    }
    try {
      await this.listen();
    } catch (error) {
      // Hors ligne et code Firebase absent du cache : on reste « déconnecté » sans casser la page, l'indice de session est
      // conservé pour restaurer le compte au prochain démarrage connecté.
      console.error('Session non restaurée', error);
      this.status.set('signed-out');
    }
  }

  async signUp(email: string, password: string): Promise<void> {
    await this.listen();
    const [auth, { createUserWithEmailAndPassword }] = await Promise.all([
      this.firebase.auth(),
      import('firebase/auth'),
    ]);
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.listen();
    const [auth, { signInWithEmailAndPassword }] = await Promise.all([
      this.firebase.auth(),
      import('firebase/auth'),
    ]);
    await signInWithEmailAndPassword(auth, email, password);
  }

  async resetPassword(email: string): Promise<void> {
    const [auth, { sendPasswordResetEmail }] = await Promise.all([
      this.firebase.auth(),
      import('firebase/auth'),
    ]);
    await sendPasswordResetEmail(auth, email);
  }

  async signOut(): Promise<void> {
    const [auth, { signOut }] = await Promise.all([this.firebase.auth(), import('firebase/auth')]);
    await signOut(auth);
  }

  private listen(): Promise<void> {
    this.listening ??= (async () => {
      // Un échec (hors ligne) ne doit pas rester mémorisé : la tentative suivante repartira de zéro.
      try {
        await this.startListening();
      } catch (error) {
        this.listening = undefined;
        throw error;
      }
    })();
    return this.listening;
  }

  private async startListening(): Promise<void> {
    const [auth, { onAuthStateChanged }] = await Promise.all([
      this.firebase.auth(),
      import('firebase/auth'),
    ]);
    await new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        // Les résultats sont déjà dans le compte : à la déconnexion on vide l'appareil, qui peut être partagé.
        // Fait dans ce callback, au même instant que le changement d'état, pour qu'aucun rechargement ne passe entre les deux.
        if (this.status() === 'signed-in' && !user) this.progress.clear();
        this.user.set(user ? { uid: user.uid, email: user.email } : null);
        this.status.set(user ? 'signed-in' : 'signed-out');
        writeSessionHint(user !== null);
        resolve();
      });
    });
  }
}
