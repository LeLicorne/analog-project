import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { usePageSeo } from '@app/core/seo/seo.service';
import { SITE_URL } from '@app/core/seo/site';
import { BreadcrumbComponent } from '@app/shared/breadcrumb.component';
import { breadcrumbs, graph, organization } from '@data/seo/json-ld';
import { siteMapMeta } from '@data/seo/page-meta';
import { THEMES } from '@data/themes';

@Component({
  selector: 'app-site-map-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent, RouterLink],
  template: `
    <app-breadcrumb [items]="[{ label: 'Accueil', path: '/' }, { label: 'Plan du site' }]" />
    <h1>Plan du site</h1>
    <p class="lead">
      Toutes les pages de Quizz du jour, du quiz du jour aux corrigés des jours passés.
    </p>

    <h2>Quiz par thème</h2>
    <ul>
      @for (theme of themes; track theme.slug) {
        <li>
          <span aria-hidden="true">{{ theme.icon }}</span>
          <a [routerLink]="['/themes', theme.slug]">{{ theme.name }}</a> :
          <a [routerLink]="['/quiz', theme.slug]">quiz du jour</a>, corrigés des jours passés sur la
          page du thème.
        </li>
      }
    </ul>

    <h2>Informations</h2>
    <ul>
      <li><a routerLink="/">Accueil</a> : les six quiz du jour et les questions fréquentes.</li>
      <li><a routerLink="/a-propos">À propos</a> : méthode, sources et vie privée.</li>
      <li><a routerLink="/accessibilite">Accessibilité</a> : niveau visé, tests et limites.</li>
    </ul>

    <h2>Compte</h2>
    <ul>
      <li><a routerLink="/connexion">Se connecter</a></li>
      <li><a routerLink="/inscription">Créer un compte</a></li>
    </ul>
  `,
})
export default class SiteMapPage {
  protected readonly themes = THEMES;

  constructor() {
    usePageSeo(() => ({
      ...siteMapMeta(),
      path: '/plan-du-site',
      jsonLd: [
        graph(
          organization(SITE_URL),
          breadcrumbs(SITE_URL, [
            { name: 'Accueil', path: '/' },
            { name: 'Plan du site', path: '/plan-du-site' },
          ]),
        ),
      ],
    }));
  }
}
