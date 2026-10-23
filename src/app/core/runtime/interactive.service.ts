import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';

/**
 * `ready` passe à `true` quand l'application est hydratée dans le navigateur.
 * Le HTML rendu par le serveur affiche déjà les formulaires : tant que ce signal est faux, leurs boutons restent
 * désactivés, sinon un envoi avant l'hydratation partirait en soumission native du navigateur (rechargement de la page,
 * et pour la connexion, mot de passe dans l'adresse).
 */
@Injectable({ providedIn: 'root' })
export class Interactive {
  readonly ready = signal(false);

  constructor() {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    // `afterNextRender` s'exécute aussi pendant le rendu serveur : le test du navigateur est indispensable.
    afterNextRender(() => {
      if (isBrowser) this.ready.set(true);
    });
  }
}
