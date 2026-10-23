import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { FirebaseService } from '@app/core/firebase/firebase.service';
import { ProgressStore } from '@app/core/progress/progress.store';
import type { IsoDate } from '@data/quiz.types';

type AuthUser = { uid: string; email: string | null } | null;

const firebaseAuth = vi.hoisted(() => ({
  currentUser: null as AuthUser,
  listener: undefined as ((user: AuthUser) => void) | undefined,
  signIn: vi.fn(),
  signUp: vi.fn(),
  reset: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: (_auth: unknown, listener: (user: AuthUser) => void) => {
    firebaseAuth.listener = listener;
    queueMicrotask(() => {
      listener(firebaseAuth.currentUser);
    });
    return () => undefined;
  },
  signInWithEmailAndPassword: firebaseAuth.signIn,
  createUserWithEmailAndPassword: firebaseAuth.signUp,
  sendPasswordResetEmail: firebaseAuth.reset,
  signOut: firebaseAuth.signOut,
}));

const HINT_KEY = 'quizz-du-jour:session-hint';
const DAY = '2026-10-23' as IsoDate;
const authLoader = vi.fn(() => Promise.resolve({}));

function createAuth(): AuthService {
  return TestBed.inject(AuthService);
}

describe('AuthService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
    firebaseAuth.currentUser = null;
    firebaseAuth.listener = undefined;
    authLoader.mockImplementation(() => Promise.resolve({}));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: FirebaseService, useValue: { auth: authLoader } }],
    });
  });

  it('visiteur anonyme : ne charge pas Firebase', async () => {
    const auth = createAuth();
    await auth.restore();
    expect(auth.status()).toBe('signed-out');
    expect(authLoader).not.toHaveBeenCalled();
  });

  it('restaure une session existante grâce à l’indice local', async () => {
    localStorage.setItem(HINT_KEY, '1');
    firebaseAuth.currentUser = { uid: 'u1', email: 'a@b.fr' };
    const auth = createAuth();
    await auth.restore();
    expect(auth.status()).toBe('signed-in');
    expect(auth.user()).toEqual({ uid: 'u1', email: 'a@b.fr' });
    expect(auth.isSignedIn()).toBe(true);
  });

  it('oublie l’indice quand la session a expiré', async () => {
    localStorage.setItem(HINT_KEY, '1');
    const auth = createAuth();
    await auth.restore();
    expect(auth.status()).toBe('signed-out');
    expect(localStorage.getItem(HINT_KEY)).toBeNull();
  });

  it('hors ligne sans code Firebase en cache : reste déconnecté sans casser la page, et garde l’indice', async () => {
    localStorage.setItem(HINT_KEY, '1');
    authLoader.mockRejectedValue(new Error('Failed to fetch dynamically imported module'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const auth = createAuth();
    await auth.restore();
    expect(auth.status()).toBe('signed-out');
    expect(localStorage.getItem(HINT_KEY)).toBe('1');
  });

  it('retente après un échec de chargement : l’échec n’est pas mémorisé', async () => {
    localStorage.setItem(HINT_KEY, '1');
    firebaseAuth.currentUser = { uid: 'u1', email: 'a@b.fr' };
    // L'échec arrive après le chargement du module Firebase, comme une coupure réseau pendant l'initialisation.
    authLoader.mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) =>
          setTimeout(() => {
            reject(new Error('hors ligne'));
          }, 10),
        ),
    );
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const auth = createAuth();
    await auth.restore();
    expect(auth.status()).toBe('signed-out');

    await auth.restore();
    expect(auth.status()).toBe('signed-in');
  });

  it('connexion : appelle Firebase et mémorise la session', async () => {
    firebaseAuth.signIn.mockImplementation(() => {
      firebaseAuth.listener?.({ uid: 'u1', email: 'a@b.fr' });
      return Promise.resolve();
    });
    const auth = createAuth();
    await auth.signIn('a@b.fr', 'secret-1234');
    expect(firebaseAuth.signIn).toHaveBeenCalledWith({}, 'a@b.fr', 'secret-1234');
    expect(auth.status()).toBe('signed-in');
    expect(localStorage.getItem(HINT_KEY)).toBe('1');
  });

  it('inscription et réinitialisation passent par Firebase', async () => {
    firebaseAuth.signUp.mockResolvedValue(undefined);
    firebaseAuth.reset.mockResolvedValue(undefined);
    const auth = createAuth();
    await auth.signUp('n@b.fr', 'secret-1234');
    await auth.resetPassword('n@b.fr');
    expect(firebaseAuth.signUp).toHaveBeenCalledWith({}, 'n@b.fr', 'secret-1234');
    expect(firebaseAuth.reset).toHaveBeenCalledWith({}, 'n@b.fr');
  });

  it('propage une erreur de connexion à l’appelant', async () => {
    firebaseAuth.signIn.mockRejectedValue({ code: 'auth/invalid-credential' });
    await expect(createAuth().signIn('a@b.fr', 'mauvais')).rejects.toEqual({
      code: 'auth/invalid-credential',
    });
  });

  it('déconnexion : vide la progression de l’appareil et l’indice de session', async () => {
    localStorage.setItem(HINT_KEY, '1');
    firebaseAuth.currentUser = { uid: 'u1', email: 'a@b.fr' };
    const store = TestBed.inject(ProgressStore);
    store.record('web', DAY, { score: 3, answers: [0, 1, 2] });
    const auth = createAuth();
    await auth.restore();
    expect(store.resultFor('web', DAY)).toBeDefined();

    firebaseAuth.listener?.(null);
    expect(auth.status()).toBe('signed-out');
    expect(store.resultFor('web', DAY)).toBeUndefined();
    expect(localStorage.getItem(HINT_KEY)).toBeNull();
  });

  it('signOut demande la déconnexion à Firebase', async () => {
    firebaseAuth.signOut.mockResolvedValue(undefined);
    await createAuth().signOut();
    expect(firebaseAuth.signOut).toHaveBeenCalledOnce();
  });
});
