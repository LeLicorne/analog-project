import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { usePageSeo } from '@app/core/seo/seo.service';
import { AUTHOR, CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@app/core/seo/site';
import { BreadcrumbComponent } from '@app/shared/breadcrumb.component';
import { breadcrumbs, graph, organization } from '@data/seo/json-ld';
import { termsMeta } from '@data/seo/page-meta';

@Component({
  selector: 'app-terms-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent, RouterLink],
  template: `
    <app-breadcrumb
      [items]="[{ label: 'Accueil', path: '/' }, { label: 'Conditions d’utilisation' }]"
    />
    <h1>Conditions d’utilisation</h1>
    <p class="lead">
      En utilisant {{ siteName }}, vous acceptez les règles ci-dessous. Elles sont courtes : le
      service est gratuit et sans engagement.
    </p>
    <p>Dernière mise à jour : <time datetime="2026-11-17">17 novembre 2026</time>.</p>

    <h2>Le service</h2>
    <p>
      {{ siteName }} propose chaque jour des quiz de culture générale, gratuits, avec une
      explication et une source après chaque réponse. L’accès est libre, sans compte et sans limite
      de temps.
    </p>

    <h2>Compte facultatif</h2>
    <p>
      Un compte permet de sauvegarder vos résultats sur plusieurs appareils. Vous êtes responsable
      de la confidentialité de votre mot de passe. Vous pouvez demander la suppression de votre
      compte à tout moment (voir <a routerLink="/confidentialite">Confidentialité</a>).
    </p>

    <h2>Usage attendu</h2>
    <ul>
      <li>Utiliser le site de façon normale, pour jouer et apprendre.</li>
      <li>
        Ne pas tenter de perturber le service, d’accéder aux données d’autres joueurs ou de
        contourner ses protections.
      </li>
      <li>
        Ne pas copier massivement les questions par des moyens automatisés sans accord de l’éditeur.
      </li>
    </ul>

    <h2>Contenus et sources</h2>
    <p>
      Les questions portent sur des faits stables et vérifiables, avec une source. Une erreur reste
      possible : signalez-la pour qu’elle soit corrigée. Les droits sur les contenus sont décrits
      dans les <a routerLink="/mentions-legales">mentions légales</a>.
    </p>

    <h2>Disponibilité</h2>
    <p>
      Le service est fourni tel quel, sans garantie de disponibilité continue. L’éditeur peut le
      modifier, l’interrompre ou le supprimer, notamment pour maintenance. Les résultats conservés
      dans votre navigateur peuvent être perdus si vous effacez les données du site.
    </p>

    <h2>Responsabilité</h2>
    <p>
      {{ siteName }} est un divertissement. L’éditeur n’est pas responsable des conséquences d’une
      réponse erronée ni du contenu des sites externes vers lesquels renvoient les sources.
    </p>

    <h2>Modification des conditions</h2>
    <p>
      Ces conditions peuvent évoluer : la date de dernière mise à jour est indiquée en haut de la
      page.
    </p>

    <h2>Droit applicable</h2>
    <p>Ces conditions sont régies par le droit français.</p>

    <h2>Contact</h2>
    @if (contactEmail) {
      <p>
        Une question sur ces conditions ? <a [href]="'mailto:' + contactEmail">{{ contactEmail }}</a
        >.
      </p>
    } @else {
      <p>Aucune adresse de contact n’est renseignée dans cette version du site.</p>
    }
  `,
})
export default class TermsPage {
  protected readonly siteName = SITE_NAME;
  protected readonly contactEmail = CONTACT_EMAIL;

  constructor() {
    usePageSeo(() => ({
      ...termsMeta(),
      path: '/conditions-utilisation',
      jsonLd: [
        graph(
          organization(SITE_URL, AUTHOR),
          breadcrumbs(SITE_URL, [
            { name: 'Accueil', path: '/' },
            { name: 'Conditions d’utilisation', path: '/conditions-utilisation' },
          ]),
        ),
      ],
    }));
  }
}
