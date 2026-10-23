import { ChangeDetectionStrategy, Component } from '@angular/core';

import { usePageSeo } from '@app/core/seo/seo.service';
import { AuthFormComponent } from '@app/features/account/auth-form.component';
import { accountMeta } from '@data/seo/page-meta';

@Component({
  selector: 'app-signup-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuthFormComponent],
  template: `<app-auth-form mode="signup" />`,
})
export default class SignupPage {
  constructor() {
    usePageSeo(() => ({ ...accountMeta('signup'), noindex: true }));
  }
}
