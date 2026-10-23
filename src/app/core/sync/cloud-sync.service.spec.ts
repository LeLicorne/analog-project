import { ApplicationRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CloudSyncService } from './cloud-sync.service';

import { AuthService } from '@app/core/auth/auth.service';
import { FirebaseService } from '@app/core/firebase/firebase.service';
import { ProgressStore } from '@app/core/progress/progress.store';
import type { IsoDate } from '@data/quiz.types';

const firestore = vi.hoisted(() => ({ getDoc: vi.fn(), setDoc: vi.fn() }));

vi.mock('firebase/firestore', () => ({
  doc: (_db: unknown, ...segments: string[]) => ({ path: segments.join('/') }),
  getDoc: firestore.getDoc,
  setDoc: firestore.setDoc,
  serverTimestamp: () => 'SERVER_TIMESTAMP',
}));

const DAY = '2026-10-23' as IsoDate;
const authFake = { user: signal<{ uid: string; email: string | null } | null>(null) };
const result = (score: number): { score: number; answers: number[] } => ({
  score,
  answers: [0, 1, 2, 3, 0],
});

function remoteSnapshot(results: unknown): { get: () => unknown } {
  return { get: () => results };
}

function createSync(): { sync: CloudSyncService; store: ProgressStore } {
  const store = TestBed.inject(ProgressStore);
  const sync = TestBed.inject(CloudSyncService);
  TestBed.inject(ApplicationRef).tick();
  return { sync, store };
}

async function tick(): Promise<void> {
  TestBed.inject(ApplicationRef).tick();
  await new Promise((resolve) => setTimeout(resolve, 0));
  TestBed.inject(ApplicationRef).tick();
}

describe('CloudSyncService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
    authFake.user.set(null);
    firestore.setDoc.mockResolvedValue(undefined);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authFake },
        { provide: FirebaseService, useValue: { firestore: () => Promise.resolve({}) } },
      ],
    });
  });

  it('ne contacte pas Firestore tant que personne n’est connecté', async () => {
    const { store } = createSync();
    store.record('web', DAY, result(3));
    await tick();
    expect(firestore.getDoc).not.toHaveBeenCalled();
    expect(firestore.setDoc).not.toHaveBeenCalled();
  });

  it('à la connexion : fusionne le compte avec l’appareil et n’envoie que ce qui manque', async () => {
    firestore.getDoc.mockResolvedValue(remoteSnapshot({ 'web:2026-10-22': result(4) }));
    const { store } = createSync();
    store.record('histoire', DAY, result(2));

    authFake.user.set({ uid: 'u1', email: 'a@b.fr' });
    await tick();
    await vi.waitFor(() => {
      expect(firestore.setDoc).toHaveBeenCalledOnce();
    });

    expect(Object.keys(store.results()).sort()).toEqual(['histoire:2026-10-23', 'web:2026-10-22']);
    const [, payload, options] = firestore.setDoc.mock.calls[0] as [
      unknown,
      { results: object; updatedAt: string },
      object,
    ];
    expect(Object.keys(payload.results)).toEqual(['histoire:2026-10-23']);
    expect(payload.updatedAt).toBe('SERVER_TIMESTAMP');
    expect(options).toEqual({ merge: true });
  });

  it('envoie ensuite chaque nouveau résultat, une seule fois', async () => {
    firestore.getDoc.mockResolvedValue(remoteSnapshot({}));
    const { store } = createSync();
    authFake.user.set({ uid: 'u1', email: null });
    await tick();
    await vi.waitFor(() => {
      expect(firestore.getDoc).toHaveBeenCalled();
    });

    store.record('gaming', DAY, result(5));
    await tick();
    await vi.waitFor(() => {
      expect(firestore.setDoc).toHaveBeenCalledOnce();
    });
    await tick();
    expect(firestore.setDoc).toHaveBeenCalledOnce();
  });

  it('ignore des données distantes invalides sans perdre les résultats locaux', async () => {
    firestore.getDoc.mockResolvedValue(remoteSnapshot({ cassé: { score: 'x' } }));
    const { store } = createSync();
    store.record('web', DAY, result(1));
    authFake.user.set({ uid: 'u1', email: null });
    await tick();
    await vi.waitFor(() => {
      expect(firestore.setDoc).toHaveBeenCalled();
    });
    expect(Object.keys(store.results())).toEqual(['web:2026-10-23']);
  });

  it('flush : vrai quand tout est envoyé, faux quand l’envoi échoue', async () => {
    firestore.getDoc.mockResolvedValue(remoteSnapshot({}));
    const { sync, store } = createSync();
    authFake.user.set({ uid: 'u1', email: null });
    await tick();
    await vi.waitFor(() => {
      expect(firestore.getDoc).toHaveBeenCalled();
    });

    store.record('web', DAY, result(5));
    expect(await sync.flush()).toBe(true);

    firestore.setDoc.mockRejectedValue(new Error('hors ligne'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    store.record('gaming', DAY, result(2));
    expect(await sync.flush()).toBe(false);
    expect(sync.state()).toBe('error');
  });

  it('flush : vrai sans compte connecté', async () => {
    const { sync } = createSync();
    expect(await sync.flush()).toBe(true);
  });
});
