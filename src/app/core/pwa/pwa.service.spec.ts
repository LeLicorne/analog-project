import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PwaService } from './pwa.service';

import { THEMES } from '@data/themes';

const postMessage = vi.fn();

function createPwa(): PwaService {
  const pwa = TestBed.inject(PwaService);
  TestBed.inject(ApplicationRef).tick();
  return pwa;
}

function installEvent(
  outcome: 'accepted' | 'dismissed',
): Event & { prompt: ReturnType<typeof vi.fn> } {
  return Object.assign(new Event('beforeinstallprompt', { cancelable: true }), {
    prompt: vi.fn().mockResolvedValue(undefined),
    userChoice: Promise.resolve({ outcome }),
  });
}

describe('PwaService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    Object.defineProperty(navigator, 'connection', { value: undefined, configurable: true });
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: { postMessage },
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      configurable: true,
    });
    TestBed.resetTestingModule();
  });

  describe('réseau', () => {
    it('suit le passage hors ligne et le retour du réseau', () => {
      const pwa = createPwa();
      expect(pwa.online()).toBe(true);
      window.dispatchEvent(new Event('offline'));
      expect(pwa.online()).toBe(false);
      window.dispatchEvent(new Event('online'));
      expect(pwa.online()).toBe(true);
    });

    it('part de l’état réel du navigateur', () => {
      vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
      expect(createPwa().online()).toBe(false);
    });
  });

  describe('installation', () => {
    it('garde l’invite du navigateur pour la proposer au bon moment', async () => {
      const pwa = createPwa();
      const event = installEvent('accepted');
      window.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
      expect(pwa.canInstall()).toBe(true);

      expect(await pwa.promptInstall()).toBe('accepted');
      expect(event.prompt).toHaveBeenCalledOnce();
      expect(pwa.canInstall()).toBe(false);
    });

    it('rapporte un refus et ne propose l’invite qu’une fois', async () => {
      const pwa = createPwa();
      window.dispatchEvent(installEvent('dismissed'));
      expect(await pwa.promptInstall()).toBe('dismissed');
      expect(await pwa.promptInstall()).toBe('unavailable');
    });

    it('masque l’installation une fois l’application installée', () => {
      const pwa = createPwa();
      window.dispatchEvent(installEvent('accepted'));
      window.dispatchEvent(new Event('appinstalled'));
      expect(pwa.canInstall()).toBe(false);
    });
  });

  describe('préchargement des quiz du jour', () => {
    it('attend que le service worker contrôle la page avant de télécharger', async () => {
      const listeners: Record<string, () => void> = {};
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          controller: null,
          addEventListener: (type: string, listener: () => void) => {
            listeners[type] = listener;
          },
          removeEventListener: vi.fn(),
        },
        configurable: true,
      });
      const fetchMock = vi.fn().mockResolvedValue(new Response('ok'));
      vi.stubGlobal('fetch', fetchMock);

      const pending = createPwa().prefetchToday();
      await new Promise((resolve) => setTimeout(resolve, 20));
      expect(fetchMock).not.toHaveBeenCalled();

      listeners['controllerchange']?.();
      await pending;
      expect(fetchMock).toHaveBeenCalled();
    });

    it('télécharge l’accueil et les six quiz comme des pages, puis s’en souvient', async () => {
      const fetchMock = vi.fn().mockResolvedValue(new Response('ok'));
      vi.stubGlobal('fetch', fetchMock);
      const pwa = createPwa();

      await pwa.prefetchToday();
      const paths = fetchMock.mock.calls
        .map((call) => String(call[0]))
        .filter((path) => !path.includes('/assets/'));
      expect(paths).toEqual(['/', ...THEMES.map((theme) => `/quiz/${theme.slug}`)]);
      expect(
        fetchMock.mock.calls.every((call) => (call[1] as RequestInit).headers !== undefined),
      ).toBe(true);
      expect(fetchMock.mock.calls[0]?.[1]).toEqual({ headers: { Accept: 'text/html' } });
      expect(postMessage).toHaveBeenCalledWith({ type: 'REFRESH_PRECACHE' });

      fetchMock.mockClear();
      await pwa.prefetchToday();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('ne fait rien hors ligne', async () => {
      const fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
      vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
      await createPwa().prefetchToday();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('respecte le mode économie de données', async () => {
      const fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
      Object.defineProperty(navigator, 'connection', {
        value: { saveData: true },
        configurable: true,
      });
      await createPwa().prefetchToday();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('retentera plus tard si le réseau tombe en cours de route', async () => {
      const fetchMock = vi
        .fn()
        .mockRejectedValueOnce(new Error('réseau coupé'))
        .mockResolvedValue(new Response('ok'));
      vi.stubGlobal('fetch', fetchMock);
      const pwa = createPwa();
      await pwa.prefetchToday();
      fetchMock.mockClear();
      await pwa.prefetchToday();
      expect(fetchMock).toHaveBeenCalledTimes(THEMES.length + 1);
    });
  });
});
