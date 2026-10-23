import type { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { pageTitle } from '@app/core/seo/page-title';
import { AuthFormComponent } from '@app/features/account/auth-form.component';

export const routeMeta = {
  title: pageTitle('Créer un compte'),
  meta: [{ name: 'robots', content: 'noindex' }],
} satisfies RouteMeta;

@Component({
  selector: 'app-signup-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuthFormComponent],
  template: `<app-auth-form mode="signup" />`,
})
export default class SignupPage {}
