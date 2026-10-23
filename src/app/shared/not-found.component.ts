import { injectResponse } from '@analogjs/router/tokens';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { usePageSeo } from '@app/core/seo/seo.service';
import { notFoundMeta } from '@data/seo/page-meta';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <h1>Page introuvable</h1>
    <p>Ce quiz n’existe pas, ou pas encore. Retrouvez tous les quiz du jour sur l’accueil.</p>
    <p><a routerLink="/" class="btn">Retour à l’accueil</a></p>
  `,
})
export class NotFoundComponent {
  constructor() {
    // Rendu côté serveur : un vrai code 404, sinon les moteurs indexeraient ces pages vides.
    const response = injectResponse();
    if (response) response.statusCode = 404;
    usePageSeo(() => ({ ...notFoundMeta(), noindex: true }));
  }
}
