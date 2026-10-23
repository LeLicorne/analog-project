import { ApplicationRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { PushService as PushServiceType } from './push.service';

const messaging = vi.hoisted(() => ({
  isSupported: vi.fn(),
  getMessaging: vi.fn(() => ({})),
  register: vi.fn(),
  onRegistered: vi.fn(),
  unregister: vi.fn(),
}));
const firestore = vi.hoisted(() => ({ setDoc: vi.fn() }));

vi.mock('firebase/messaging', () => messaging);
vi.mock('firebase/firestore', () => ({
  doc: (_db: unknown, ...segments: string[]) => ({ path: segments.join('/') }),
  setDoc: firestore.setDoc,
  serverTimestamp: () => 'SERVER_TIMESTAMP',
  deleteField: () => 'DELETE_FIELD',
}));

const DEVICE_KEY = 'quizz-du-jour:push-device';
const authFake = { user: signal<{ uid: string; email: string | null } | null>(null) };
const requestPermission = vi.fn<() => Promise<NotificationPermission>>();

async function createPush(options: { configured: boolean }): Promise<PushServiceType> {
  vi.stubEnv('VITE_FIREBASE_VAPID_KEY', options.configured ? 'cle-vapid' : '');
  vi.resetModules();
  const [{ PushService }, { AuthService }, { FirebaseService }] = await Promise.all([
    import('./push.service'),
    import('@app/core/auth/auth.service'),
    import('@app/core/firebase/firebase.service'),
  ]);
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [
      { provide: AuthService, useValue: authFake },
      {
        provide: FirebaseService,
        useValue: { app: () => Promise.resolve({}), firestore: () => Promise.resolve({}) },
      },
    ],
  });
  const push = TestBed.inject(PushService);
  TestBed.inject(ApplicationRef).tick();
  return push;
}

describe('PushService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
    localStorage.clear();
    authFake.user.set({ uid: 'u1', email: 'a@b.fr' });
    vi.stubGlobal(
      'Notification',
      Object.assign(vi.fn(), { permission: 'default', requestPermission }),
    );
    vi.stubGlobal('PushManager', function PushManager() {
      return undefined;
    });
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { ready: Promise.resolve({ scope: '/' }) },
      configurable: true,
    });
    messaging.isSupported.mockResolvedValue(true);
    messaging.getMessaging.mockReturnValue({});
    messaging.onRegistered.mockImplementation(
      (_messaging: unknown, listener: (fid: string) => void) => {
        messaging.register.mockImplementation(() => {
          listener('fid-123');
          return Promise.resolve();
        });
        return () => undefined;
      },
    );
    messaging.unregister.mockResolvedValue(undefined);
    firestore.setDoc.mockResolvedValue(undefined);
  });

  it('reste masqué sans clé VAPID : la fonction n’est pas configurée', async () => {
    const push = await createPush({ configured: false });
    expect(push.configured).toBe(false);
    expect(push.available()).toBe(false);
  });

  it('reste masqué si le navigateur ne gère pas les notifications push', async () => {
    Reflect.deleteProperty(window, 'PushManager');
    const push = await createPush({ configured: true });
    expect(push.available()).toBe(false);
  });

  it('est disponible quand tout est réuni', async () => {
    expect((await createPush({ configured: true })).available()).toBe(true);
  });

  it('active : demande l’autorisation, enregistre l’appareil auprès de FCM, puis dans le compte', async () => {
    requestPermission.mockResolvedValue('granted');
    const push = await createPush({ configured: true });
    await push.enable();

    expect(messaging.register).toHaveBeenCalledWith(
      {},
      expect.objectContaining({ vapidKey: 'cle-vapid', serviceWorkerRegistration: { scope: '/' } }),
    );
    const [ref, payload, options] = firestore.setDoc.mock.calls[0] as [
      { path: string },
      { pushTokens: Record<string, boolean>; updatedAt: string },
      object,
    ];
    expect(ref.path).toBe('users/u1');
    expect(payload.pushTokens).toEqual({ 'fid-123': true });
    expect(payload.updatedAt).toBe('SERVER_TIMESTAMP');
    expect(options).toEqual({ merge: true });
    expect(push.enabled()).toBe(true);
    expect(localStorage.getItem(DEVICE_KEY)).toBe('fid-123');
    expect(push.busy()).toBe(false);
  });

  it('explique comment débloquer quand l’autorisation est refusée', async () => {
    requestPermission.mockResolvedValue('denied');
    const push = await createPush({ configured: true });
    await push.enable();
    expect(push.error()).toContain('bloquées');
    expect(push.permission()).toBe('denied');
    expect(push.enabled()).toBe(false);
    expect(firestore.setDoc).not.toHaveBeenCalled();
  });

  it('exige un compte connecté', async () => {
    authFake.user.set(null);
    const push = await createPush({ configured: true });
    await push.enable();
    expect(push.error()).toContain('Connectez-vous');
    expect(requestPermission).not.toHaveBeenCalled();
  });

  it('annonce un échec d’enregistrement sans rien enregistrer', async () => {
    requestPermission.mockResolvedValue('granted');
    messaging.onRegistered.mockImplementation(() => () => undefined);
    messaging.register.mockRejectedValue(new Error('FCM indisponible'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const push = await createPush({ configured: true });
    await push.enable();
    expect(push.error()).toContain('pas pu être activé');
    expect(push.enabled()).toBe(false);
    expect(firestore.setDoc).not.toHaveBeenCalled();
    expect(localStorage.getItem(DEVICE_KEY)).toBeNull();
  });

  describe('notification de test', () => {
    const postMessage = vi.fn();

    beforeEach(() => {
      postMessage.mockReset();
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          ready: Promise.resolve({ scope: '/' }),
          getRegistration: () => Promise.resolve({ active: { postMessage } }),
        },
        configurable: true,
      });
    });

    it('demande au service worker d’afficher la notification, sans compte ni clé VAPID', async () => {
      authFake.user.set(null);
      requestPermission.mockResolvedValue('granted');
      const push = await createPush({ configured: false });
      await push.sendTest();
      expect(postMessage).toHaveBeenCalledWith({ type: 'SHOW_TEST_NOTIFICATION' });
      expect(push.testSent()).toBe(true);
      expect(push.error()).toBe('');
      expect(firestore.setDoc).not.toHaveBeenCalled();
      expect(messaging.register).not.toHaveBeenCalled();
    });

    it('ne redemande pas l’autorisation si elle est déjà accordée', async () => {
      vi.stubGlobal(
        'Notification',
        Object.assign(vi.fn(), { permission: 'granted', requestPermission }),
      );
      const push = await createPush({ configured: false });
      await push.sendTest();
      expect(requestPermission).not.toHaveBeenCalled();
      expect(postMessage).toHaveBeenCalledOnce();
    });

    it('explique comment débloquer quand les notifications sont refusées', async () => {
      requestPermission.mockResolvedValue('denied');
      const push = await createPush({ configured: false });
      await push.sendTest();
      expect(push.error()).toContain('bloquées');
      expect(postMessage).not.toHaveBeenCalled();
      expect(push.testSent()).toBe(false);
    });

    it('explique que le service worker n’est pas actif (développement, premier chargement)', async () => {
      requestPermission.mockResolvedValue('granted');
      Object.defineProperty(navigator, 'serviceWorker', {
        value: { getRegistration: () => Promise.resolve(undefined) },
        configurable: true,
      });
      const push = await createPush({ configured: false });
      await push.sendTest();
      expect(push.error()).toContain('service worker');
      expect(push.testSent()).toBe(false);
    });
  });

  it('désactive : retire l’appareil du compte et se désinscrit de FCM', async () => {
    requestPermission.mockResolvedValue('granted');
    const push = await createPush({ configured: true });
    await push.enable();
    firestore.setDoc.mockClear();

    await push.disable();
    const payload = firestore.setDoc.mock.calls[0]?.[1] as { pushTokens: Record<string, string> };
    expect(payload.pushTokens).toEqual({ 'fid-123': 'DELETE_FIELD' });
    expect(messaging.unregister).toHaveBeenCalledOnce();
    expect(push.enabled()).toBe(false);
    expect(localStorage.getItem(DEVICE_KEY)).toBeNull();
  });

  it('désactive même si le réseau est coupé : il ne doit jamais bloquer une déconnexion', async () => {
    requestPermission.mockResolvedValue('granted');
    const push = await createPush({ configured: true });
    await push.enable();
    firestore.setDoc.mockRejectedValue(new Error('hors ligne'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await push.disable();
    expect(push.enabled()).toBe(false);
    expect(localStorage.getItem(DEVICE_KEY)).toBeNull();
  });
});
