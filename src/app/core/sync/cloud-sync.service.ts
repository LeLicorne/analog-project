import { Injectable, effect, inject, signal, untracked } from '@angular/core';

import { AuthService } from '@app/core/auth/auth.service';
import { FirebaseService } from '@app/core/firebase/firebase.service';
import { ProgressStore, parseResults, type QuizResults } from '@app/core/progress/progress.store';

export type SyncState = 'idle' | 'syncing' | 'error';

/**
 * Synchronise la progression locale avec `users/{uid}` quand un compte est connecté.
 * À la connexion : fusion (le premier résultat d'un quiz gagne, des deux côtés), puis chaque nouveau résultat est envoyé.
 */
@Injectable({ providedIn: 'root' })
export class CloudSyncService {
  private readonly auth = inject(AuthService);
  private readonly progress = inject(ProgressStore);
  private readonly firebase = inject(FirebaseService);

  readonly state = signal<SyncState>('idle');

  private readonly syncedKeys = new Set<string>();
  private pulledUid: string | null = null;
  /** Les opérations s'enchaînent une par une : une sauvegarde ne double jamais la précédente. */
  private queue: Promise<void> = Promise.resolve();

  constructor() {
    effect(() => {
      const uid = this.auth.user()?.uid ?? null;
      const ready = this.progress.ready();
      const results = this.progress.results();
      if (!ready) return;
      untracked(() => {
        this.enqueue(() => this.sync(uid, results));
      });
    });
  }

  /**
   * Attend que tout ce qui est en cours soit envoyé au compte. À appeler avant une déconnexion :
   * renvoie `false` si la sauvegarde a échoué (réseau coupé), pour ne pas perdre de résultats.
   */
  async flush(): Promise<boolean> {
    await this.queue;
    const uid = this.auth.user()?.uid;
    if (!uid) return true;
    this.enqueue(() => this.sync(uid, this.progress.results()));
    await this.queue;
    return this.state() !== 'error';
  }

  private enqueue(task: () => Promise<void>): void {
    this.queue = this.queue.then(task, task);
  }

  private async sync(uid: string | null, results: QuizResults): Promise<void> {
    if (!uid) {
      this.pulledUid = null;
      this.syncedKeys.clear();
      return;
    }
    try {
      if (this.pulledUid !== uid) {
        this.pulledUid = uid;
        this.state.set('syncing');
        await this.pull(uid);
      } else {
        await this.push(uid, results);
      }
      this.state.set('idle');
    } catch (error) {
      this.state.set('error');
      console.error('Synchronisation impossible', error);
    }
  }

  private async pull(uid: string): Promise<void> {
    const [db, { doc, getDoc }] = await Promise.all([
      this.firebase.firestore(),
      import('firebase/firestore'),
    ]);
    const snapshot = await getDoc(doc(db, 'users', uid));
    const remote = parseResults(snapshot.get('results') ?? {}) ?? {};

    this.syncedKeys.clear();
    Object.keys(remote).forEach((key) => this.syncedKeys.add(key));

    const merged: QuizResults = { ...this.progress.results(), ...remote };
    if (Object.keys(merged).length !== Object.keys(this.progress.results()).length) {
      this.progress.replaceAll(merged);
    }
    await this.push(uid, merged);
  }

  private async push(uid: string, results: QuizResults): Promise<void> {
    const pending = Object.entries(results).filter(([key]) => !this.syncedKeys.has(key));
    if (pending.length === 0) return;

    const [db, { doc, serverTimestamp, setDoc }] = await Promise.all([
      this.firebase.firestore(),
      import('firebase/firestore'),
    ]);
    await setDoc(
      doc(db, 'users', uid),
      { results: Object.fromEntries(pending), updatedAt: serverTimestamp() },
      { merge: true },
    );
    pending.forEach(([key]) => this.syncedKeys.add(key));
  }
}
