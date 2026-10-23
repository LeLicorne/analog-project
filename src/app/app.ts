import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from '@app/core/auth/auth.service';
import { PwaService } from '@app/core/pwa/pwa.service';
import { SITE_NAME } from '@app/core/seo/site';
import { CloudSyncService } from '@app/core/sync/cloud-sync.service';
import { AccountMenuComponent } from '@app/features/account/account-menu.component';
import { PwaBannerComponent } from '@app/features/pwa/pwa-banner.component';
import { THEMES } from '@data/themes';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccountMenuComponent, PwaBannerComponent, RouterLink, RouterOutlet],
  template: `
    <a class="skip-link" href="#main">Aller au contenu principal</a>
    <header class="site-header">
      <a routerLink="/" class="site-header__brand">{{ siteName }}</a>
      <nav aria-label="Thèmes">
        <ul>
          @for (theme of themes; track theme.slug) {
            <li>
              <a [routerLink]="['/themes', theme.slug]">{{ theme.name }}</a>
            </li>
          }
        </ul>
      </nav>
      <app-account-menu />
    </header>
    <app-pwa-banner />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <footer class="site-footer">
      <p>
        {{ siteName }} · un quiz gratuit chaque jour, sans compte et sans limite de temps ·
        <a routerLink="/a-propos">À propos</a> · <a routerLink="/accessibilite">Accessibilité</a> ·
        <a routerLink="/plan-du-site">Plan du site</a>
        @if (pwa.canInstall()) {
          ·
          <button type="button" class="link-button" (click)="install()">
            Installer l’application
          </button>
        }
      </p>
    </footer>
  `,
})
export class App {
  protected readonly siteName = SITE_NAME;
  protected readonly themes = THEMES;

  protected readonly pwa = inject(PwaService);
  private readonly auth = inject(AuthService);

  constructor() {
    // Instancié ici pour que la synchronisation du compte tourne pendant toute la session.
    inject(CloudSyncService);
    afterNextRender(() => {
      void this.auth.restore();
    });
    this.moveFocusToMainOnNavigation();
  }

  protected async install(): Promise<void> {
    await this.pwa.promptInstall();
  }

  /** Après chaque changement de page, le focus revient sur le contenu : sinon le clavier reste dans l'ancienne page. */
  private moveFocusToMainOnNavigation(): void {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    let isFirstNavigation = true;
    const subscription = inject(Router).events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;
      if (isFirstNavigation) {
        isFirstNavigation = false;
        return;
      }
      document.getElementById('main')?.focus();
    });
    inject(DestroyRef).onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
