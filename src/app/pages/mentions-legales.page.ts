import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { usePageSeo } from '@app/core/seo/seo.service';
import { AUTHOR, CONTACT_EMAIL, HOST_NAME, SITE_NAME, SITE_URL } from '@app/core/seo/site';
import { BreadcrumbComponent } from '@app/shared/breadcrumb.component';
import { breadcrumbs, graph, organization } from '@data/seo/json-ld';
import { legalNoticeMeta } from '@data/seo/page-meta';

@Component({
  selector: 'app-legal-notice-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent, RouterLink],
  template: `
    <app-breadcrumb [items]="[{ label: 'Accueil', path: '/' }, { label: 'Mentions légales' }]" />
    <h1>Mentions légales</h1>
    <p class="lead">
      Informations sur l’éditeur et l’hébergeur de {{ siteName }}, conformément à l’article 6 de la
      loi pour la confiance dans l’économie numérique (LCEN).
    </p>

    <h2>Éditeur du site</h2>
    @if (author) {
      <p>
        {{ siteName }} est édité par <strong>{{ author.name }}</strong
        >, qui en est aussi le responsable de la publication.
      </p>
    } @else {
      <p>
        L’identité de l’éditeur n’est pas renseignée dans cette version du site. Utilisez le contact
        ci-dessous pour joindre le responsable de la publication.
      </p>
    }

    <h2>Contact</h2>
    @if (contactEmail) {
      <p>
        Écrivez-nous à <a [href]="'mailto:' + contactEmail">{{ contactEmail }}</a
        >. Une réponse vous semble fausse, un contenu est inaccessible ou vous souhaitez exercer vos
        droits sur vos données : précisez la page concernée.
      </p>
    } @else {
      <p>Aucune adresse de contact n’est renseignée dans cette version du site.</p>
    }

    <h2>Hébergeur</h2>
    @if (hostName) {
      <p>{{ hostName }}</p>
    } @else {
      <p>L’hébergeur n’est pas renseigné dans cette version du site.</p>
    }

    <h2>Propriété intellectuelle</h2>
    <p>
      Sauf mention contraire, les questions, explications, textes et le code de {{ siteName }} sont
      protégés par le droit d’auteur et tous droits sont réservés. Une courte citation est permise
      si elle indique la source et renvoie vers la page d’origine.
    </p>
    <p>
      Les sources citées après chaque réponse (Wikipédia, MDN Web Docs, W3C) restent la propriété de
      leurs auteurs et sont soumises à leurs propres licences.
    </p>

    <h2>Liens externes</h2>
    <p>
      Chaque question renvoie vers une source externe. L’éditeur ne maîtrise ni le contenu de ces
      sites ni leur disponibilité, et ne peut en être tenu responsable. Un lien qui ne répond plus
      peut être signalé par le contact ci-dessus.
    </p>

    <h2>Responsabilité</h2>
    <p>
      Les quiz sont fournis à titre de divertissement et de culture générale. Les questions portent
      sur des faits stables et sont sourcées, sans garantie d’absence d’erreur : en cas de doute,
      consultez la source indiquée.
    </p>

    <h2>Données personnelles et cookies</h2>
    <p>
      Le détail des données traitées, du stockage local et de vos droits est sur la page
      <a routerLink="/confidentialite">Confidentialité</a>. Les règles d’usage du service sont dans
      les <a routerLink="/conditions-utilisation">conditions d’utilisation</a>.
    </p>
  `,
})
export default class LegalNoticePage {
  protected readonly siteName = SITE_NAME;
  protected readonly author = AUTHOR;
  protected readonly contactEmail = CONTACT_EMAIL;
  protected readonly hostName = HOST_NAME;

  constructor() {
    usePageSeo(() => ({
      ...legalNoticeMeta(),
      path: '/mentions-legales',
      jsonLd: [
        graph(
          organization(SITE_URL, AUTHOR),
          breadcrumbs(SITE_URL, [
            { name: 'Accueil', path: '/' },
            { name: 'Mentions légales', path: '/mentions-legales' },
          ]),
        ),
      ],
    }));
  }
}
