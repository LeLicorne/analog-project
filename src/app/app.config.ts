import { provideFileRouter } from '@analogjs/router';
import type { ApplicationConfig } from '@angular/core';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(),
    // Angular 22 active par défaut l'hydratation incrémentale, qui injecte des scripts inline (relecture d'événements)
    // incompatibles avec la CSP `script-src 'self'`. Inutile ici : aucun `@defer`, et les contrôles interactifs
    // restent désactivés tant que l'application n'est pas hydratée.
    provideClientHydration(withNoIncrementalHydration()),
  ],
};
