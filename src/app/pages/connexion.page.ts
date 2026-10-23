import type { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { pageTitle } from '@app/core/seo/page-title';
import { AuthFormComponent } from '@app/features/account/auth-form.component';

export const routeMeta = {
  title: pageTitle('Se connecter'),
  meta: [{ name: 'robots', content: 'noindex' }],
} satisfies RouteMeta;

@Component({
  selector: 'app-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuthFormComponent],
  template: `<app-auth-form mode="login" />`,
})
export default class LoginPage {}
