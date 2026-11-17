import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { usePageSeo } from '@app/core/seo/seo.service';
import { AUTHOR, CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@app/core/seo/site';
import { BreadcrumbComponent } from '@app/shared/breadcrumb.component';
import { breadcrumbs, graph, organization } from '@data/seo/json-ld';
import { privacyMeta } from '@data/seo/page-meta';

@Component({
  selector: 'app-privacy-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent, RouterLink],
  template: `
    <app-breadcrumb [items]="[{ label: 'Accueil', path: '/' }, { label: 'Confidentialité' }]" />
    <h1>Confidentialité</h1>
    <p class="lead">
      {{ siteName }} collecte le minimum : jouer ne demande aucun compte, et le site n’utilise ni
      cookie ni outil de mesure d’audience. Cette page décrit ce qui est conservé, où, et comment
      l’effacer.
    </p>
    <p>Dernière mise à jour : <time datetime="2026-11-17">17 novembre 2026</time>.</p>

    <h2>Jouer sans compte</h2>
    <ul>
      <li>
        Vos résultats, votre série de jours et quelques indicateurs techniques (préchargement hors
        ligne, rappel) sont enregistrés dans le stockage local de votre navigateur
        (<code>localStorage</code>). Ils ne quittent pas votre appareil.
      </li>
      <li>
        Un cache du service worker conserve les pages et fichiers du site pour le mode hors ligne.
      </li>
      <li>
        Ces données sont strictement nécessaires au fonctionnement demandé : elles ne demandent pas
        de consentement. Vous pouvez les effacer à tout moment depuis les réglages de votre
        navigateur (données du site).
      </li>
    </ul>

    <h2>Cookies et mesure d’audience</h2>
    <p>
      Le site ne dépose aucun cookie et n’intègre aucune mesure d’audience, aucune publicité ni
      aucun traceur tiers. C’est pourquoi il n’affiche pas de bandeau de consentement.
    </p>

    <h2>Compte facultatif</h2>
    <p>
      Si vous créez un compte pour retrouver vos résultats sur plusieurs appareils, les données
      suivantes sont traitées :
    </p>
    <ul>
      <li>
        votre adresse e-mail et votre mot de passe (le mot de passe n’est jamais lisible par le
        site) ;
      </li>
      <li>vos résultats de quiz et la date de leur dernière sauvegarde ;</li>
      <li>le jeton de notification de vos appareils, si vous activez le rappel quotidien.</li>
    </ul>
    <p>
      Base légale : l’exécution du service que vous demandez en créant un compte. Les données sont
      conservées tant que le compte existe. Elles sont hébergées par Google (Firebase Authentication
      et Cloud Firestore), sous-traitant de l’éditeur ; selon la région du projet, un transfert hors
      de l’Union européenne peut avoir lieu, encadré par les mécanismes prévus par le RGPD. Seul
      votre compte peut lire et écrire votre profil (règles de sécurité Firestore).
    </p>

    <h2>Rappel quotidien par notification</h2>
    <p>
      Cette fonction est facultative et désactivée par défaut. L’activer demande l’autorisation de
      votre navigateur, puis enregistre un identifiant d’appareil auprès de Firebase Cloud
      Messaging. Vous pouvez la désactiver dans le site ou dans les réglages de notification du
      navigateur.
    </p>

    <h2>Journaux techniques</h2>
    <p>
      Comme tout serveur web, l’hébergeur peut conserver des journaux techniques (adresse IP, date,
      page demandée) pour la sécurité et le bon fonctionnement. {{ siteName }} n’exploite pas ces
      journaux à d’autres fins.
    </p>

    <h2>Vos droits</h2>
    <p>
      Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, leur
      portabilité, ou vous opposer à leur traitement, ainsi que demander la suppression de votre
      compte. Il n’existe pas encore de bouton de suppression dans le site : la demande se fait par
      e-mail.
    </p>
    @if (contactEmail) {
      <p>
        Écrivez-nous à <a [href]="'mailto:' + contactEmail">{{ contactEmail }}</a> depuis l’adresse
        du compte concerné.
      </p>
    } @else {
      <p>Aucune adresse de contact n’est renseignée dans cette version du site.</p>
    }
    <p>
      Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation
      auprès de la CNIL (<a href="https://www.cnil.fr" rel="noopener noreferrer" target="_blank"
        >cnil.fr<span class="sr-only"> (s’ouvre dans un nouvel onglet)</span></a
      >).
    </p>

    <h2>Pour aller plus loin</h2>
    <p>
      Éditeur et hébergeur : <a routerLink="/mentions-legales">mentions légales</a>. Règles d’usage
      : <a routerLink="/conditions-utilisation">conditions d’utilisation</a>.
    </p>
  `,
})
export default class PrivacyPage {
  protected readonly siteName = SITE_NAME;
  protected readonly contactEmail = CONTACT_EMAIL;

  constructor() {
    usePageSeo(() => ({
      ...privacyMeta(),
      path: '/confidentialite',
      jsonLd: [
        graph(
          organization(SITE_URL, AUTHOR),
          breadcrumbs(SITE_URL, [
            { name: 'Accueil', path: '/' },
            { name: 'Confidentialité', path: '/confidentialite' },
          ]),
        ),
      ],
    }));
  }
}
