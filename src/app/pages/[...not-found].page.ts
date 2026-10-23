import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NotFoundComponent } from '@app/shared/not-found.component';

@Component({
  selector: 'app-catch-all-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NotFoundComponent],
  template: `<app-not-found />`,
})
export default class CatchAllPage {}
