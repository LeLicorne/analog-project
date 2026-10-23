import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
export class NotFoundComponent {}
