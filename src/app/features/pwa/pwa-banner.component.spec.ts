import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PwaBannerComponent } from './pwa-banner.component';

import { PwaService } from '@app/core/pwa/pwa.service';

const pwa = {
  online: signal(true),
  updateAvailable: signal(false),
  applyUpdate: vi.fn<() => void>(),
};

function render(): { root: HTMLElement; detect: () => void } {
  const fixture = TestBed.createComponent(PwaBannerComponent);
  fixture.detectChanges();
  return {
    root: fixture.nativeElement as HTMLElement,
    detect: () => {
      fixture.detectChanges();
    },
  };
}

describe('PwaBannerComponent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    pwa.online.set(true);
    pwa.updateAvailable.set(false);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [{ provide: PwaService, useValue: pwa }] });
  });

  it('garde en permanence une région d’annonces, vide quand tout va bien', () => {
    const { root } = render();
    const region = root.querySelector('[role="status"]');
    expect(region?.getAttribute('aria-live')).toBe('polite');
    expect(region?.querySelector('.banner')).toBeNull();
  });

  it('annonce le passage hors ligne dans la région existante', () => {
    const { root, detect } = render();
    pwa.online.set(false);
    detect();
    expect(root.querySelector('[role="status"] .banner--offline')?.textContent).toContain(
      'hors ligne',
    );
  });

  it('propose de recharger quand une nouvelle version est prête', () => {
    pwa.updateAvailable.set(true);
    const { root } = render();
    root.querySelector('button')?.click();
    expect(root.textContent).toContain('nouvelle version');
    expect(pwa.applyUpdate).toHaveBeenCalledOnce();
  });
});
