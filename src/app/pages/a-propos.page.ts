import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { usePageSeo } from '@app/core/seo/seo.service';
import { CONTACT_EMAIL, AUTHOR, SITE_URL } from '@app/core/seo/site';
import { BreadcrumbComponent } from '@app/shared/breadcrumb.component';
import { aboutPage, breadcrumbs, graph, organization } from '@data/seo/json-ld';
import { aboutMeta } from '@data/seo/page-meta';

@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent, RouterLink],
  template: `
    <app-breadcrumb [items]="[{ label: 'Accueil', path: '/' }, { label: 'À propos' }]" />
    <h1>À propos de Quizz du jour</h1>
    <p class="lead">
      Quizz du jour propose chaque jour six quiz gratuits de cinq questions : culture générale,
      histoire, géographie, sciences, web et code, gaming.
    </p>

    @if (author) {
      <h2>Qui édite ce site</h2>
      <p>
        Quizz du jour est édité par <strong>{{ author.name }}</strong
        >.
        @if (author.sameAs.length > 0) {
          Profils publics :
          @for (profile of author.sameAs; track profile) {
            <a [href]="profile" rel="me noopener noreferrer" target="_blank">{{ profile }}</a
            >{{ $last ? '.' : ', ' }}
          }
        }
      </p>
    }

    <h2>Comment les quiz sont conçus</h2>
    <p>
      Chaque question a une seule bonne réponse, une explication de une à trois phrases et un lien
      vers une source (Wikipédia, MDN Web Docs, W3C). Un script contrôle automatiquement ces liens
      et signale ceux qui ne répondent plus.
    </p>
    <p>
      Les questions portent sur des faits stables et vérifiables. Nous évitons les classements, les
      records et les chiffres susceptibles de changer.
    </p>

    <h2>Un quiz identique pour tous</h2>
    <p>
      Le quiz de chaque thème est tiré à partir de la date, selon le fuseau horaire de Paris. Tous
      les joueurs ont les mêmes questions le même jour, sans que le site ait besoin de savoir qui
      joue. Une fois toutes les questions d’un thème proposées, un nouveau cycle commence avec un
      autre mélange.
    </p>

    <h2>Installer l’application et jouer hors ligne</h2>
    <p>
      Quizz du jour s’installe sur l’écran d’accueil, sans magasin d’applications : depuis Chrome ou
      Edge, utilisez le bouton « Installer l’application » en bas de page ; depuis Safari sur
      iPhone, choisissez Partager puis « Sur l’écran d’accueil ». Une fois installée, elle permet de
      jouer aux quiz du jour sans connexion : vos résultats sont enregistrés sur l’appareil et
      sauvegardés au retour du réseau.
    </p>

    <h2>Vie privée</h2>
    <p>
      Jouer ne demande aucun compte. Vos résultats restent dans votre navigateur. Si vous créez un
      compte, ils sont sauvegardés pour vous suivre d’un appareil à l’autre.
    </p>

    <h2>Accessibilité</h2>
    <p>
      Le site vise la conformité WCAG 2.2 niveau AA : navigation complète au clavier, aucun
      minuteur, contrastes élevés, thème clair et sombre, résultats jamais indiqués par la couleur
      seule.
    </p>

    <h2>Signaler une erreur</h2>
    @if (contactEmail) {
      <p>
        Une réponse vous semble fausse ? Écrivez-nous à
        <a [href]="'mailto:' + contactEmail">{{ contactEmail }}</a> en indiquant la date et le thème
        du quiz.
      </p>
    } @else {
      <p>
        Une réponse vous semble fausse ? Indiquez la date et le thème du quiz à l’éditeur du site.
      </p>
    }
    <p><a routerLink="/" class="btn">Voir les quiz du jour</a></p>
  `,
})
export default class AboutPage {
  protected readonly contactEmail = CONTACT_EMAIL;
  protected readonly author = AUTHOR;

  constructor() {
    usePageSeo(() => ({
      ...aboutMeta(),
      path: '/a-propos',
      jsonLd: [
        graph(
          organization(SITE_URL, AUTHOR),
          aboutPage(SITE_URL),
          breadcrumbs(SITE_URL, [
            { name: 'Accueil', path: '/' },
            { name: 'À propos', path: '/a-propos' },
          ]),
        ),
      ],
    }));
  }
}
