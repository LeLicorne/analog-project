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
import { SITE_NAME } from '@app/core/seo/page-title';
import { CloudSyncService } from '@app/core/sync/cloud-sync.service';
import { AccountMenuComponent } from '@app/features/account/account-menu.component';
import { THEMES } from '@data/themes';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccountMenuComponent, RouterLink, RouterOutlet],
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
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <footer class="site-footer">
      <p>{{ siteName }} · un quiz gratuit chaque jour, sans compte et sans limite de temps.</p>
    </footer>
  `,
})
export class App {
  protected readonly siteName = SITE_NAME;
  protected readonly themes = THEMES;

  private readonly auth = inject(AuthService);

  constructor() {
    // Instancié ici pour que la synchronisation du compte tourne pendant toute la session.
    inject(CloudSyncService);
    afterNextRender(() => {
      void this.auth.restore();
    });
    this.moveFocusToMainOnNavigation();
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
