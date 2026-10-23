import { ChangeDetectionStrategy, Component } from '@angular/core';

import { usePageSeo } from '@app/core/seo/seo.service';
import { CONTACT_EMAIL, SITE_URL } from '@app/core/seo/site';
import { BreadcrumbComponent } from '@app/shared/breadcrumb.component';
import { breadcrumbs, graph, organization } from '@data/seo/json-ld';
import { accessibilityMeta } from '@data/seo/page-meta';

@Component({
  selector: 'app-accessibility-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent],
  template: `
    <app-breadcrumb [items]="[{ label: 'Accueil', path: '/' }, { label: 'Accessibilité' }]" />
    <h1>Accessibilité</h1>
    <p class="lead">
      Quizz du jour vise la conformité WCAG 2.2 niveau AA et RGAA 4. Cette page explique ce qui est
      mis en œuvre, comment le site est vérifié, et ce qui n’a pas encore été vérifié.
    </p>

    <h2>État de conformité</h2>
    <p>
      Le site n’a pas fait l’objet d’un audit par un tiers : sa conformité n’est pas certifiée. Les
      vérifications ci-dessous sont des contrôles automatisés et des tests manuels réalisés par
      l’éditeur.
    </p>

    <h2>Ce qui est mis en œuvre</h2>
    <ul>
      <li>
        Navigation complète au clavier, avec un indicateur de focus visible et un lien d’évitement.
      </li>
      <li>
        Aucune limite de temps : le jeu est utilisable avec un lecteur d’écran, un contacteur ou une
        saisie lente.
      </li>
      <li>
        Une bonne ou une mauvaise réponse n’est jamais indiquée par la couleur seule : une icône et
        un texte l’accompagnent.
      </li>
      <li>
        Contrastes d’au moins 4,5 pour 1 pour le texte et 3 pour 1 pour les composants, en thème
        clair comme en thème sombre (selon la préférence du système).
      </li>
      <li>
        Le focus est déplacé sur le résultat de chaque réponse, sur la question suivante et sur le
        score, pour que l’information soit annoncée.
      </li>
      <li>
        Formulaires : champs étiquetés, erreurs reliées au champ, saisie assistée du navigateur
        autorisée.
      </li>
      <li>
        Le contenu se réorganise sans défilement horizontal jusqu’à 320 pixels de large (zoom 400
        %).
      </li>
      <li>
        Titres hiérarchisés, repères de page (en-tête, navigation, contenu, pied de page), langue
        déclarée.
      </li>
    </ul>

    <h2>Comment le site est vérifié</h2>
    <ul>
      <li>
        axe-core (règles WCAG 2.0 à 2.2, niveaux A et AA) sur les pages principales, en thème clair
        et sombre, à chaque modification.
      </li>
      <li>Lighthouse : 100 en accessibilité sur les pages principales.</li>
      <li>Tests automatisés de parcours : jeu complet, formulaires, focus, lien d’évitement.</li>
      <li>
        Tests manuels de l’éditeur, le 23 octobre 2026 : lecteur d’écran VoiceOver (macOS et iOS),
        navigation au clavier seul, zoom du navigateur et agrandissement du texte. Aucune anomalie
        n’a été constatée.
      </li>
    </ul>

    <h2>Limites connues</h2>
    <ul>
      <li>
        Les lecteurs d’écran NVDA, JAWS et TalkBack n’ont pas été testés : seul VoiceOver l’a été.
      </li>
      <li>La navigation vocale et les loupes d’écran n’ont pas été testées.</li>
      <li>
        Chaque question renvoie vers une source externe (Wikipédia, MDN Web Docs, W3C) dont
        l’accessibilité n’est pas maîtrisée par le site.
      </li>
      <li>Les emojis sont décoratifs et ignorés par les lecteurs d’écran.</li>
    </ul>

    <h2>Signaler un problème</h2>
    @if (contactEmail) {
      <p>
        Un contenu ou une fonction est inaccessible pour vous ? Écrivez-nous à
        <a [href]="'mailto:' + contactEmail">{{ contactEmail }}</a> en précisant la page concernée
        et votre outil d’assistance : nous répondrons avec une alternative.
      </p>
    } @else {
      <p>
        Un contenu ou une fonction est inaccessible pour vous ? Précisez la page concernée et votre
        outil d’assistance à l’éditeur du site.
      </p>
    }
  `,
})
export default class AccessibilityPage {
  protected readonly contactEmail = CONTACT_EMAIL;

  constructor() {
    usePageSeo(() => ({
      ...accessibilityMeta(),
      path: '/accessibilite',
      jsonLd: [
        graph(
          organization(SITE_URL),
          breadcrumbs(SITE_URL, [
            { name: 'Accueil', path: '/' },
            { name: 'Accessibilité', path: '/accessibilite' },
          ]),
        ),
      ],
    }));
  }
}
