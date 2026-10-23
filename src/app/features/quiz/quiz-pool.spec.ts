import type { ActivatedRouteSnapshot } from '@angular/router';

import { resolveQuizPool } from './quiz-pool';

function route(theme: string | null): ActivatedRouteSnapshot {
  return { paramMap: { get: () => theme } } as unknown as ActivatedRouteSnapshot;
}

describe('resolveQuizPool', () => {
  it('charge toutes les questions d’un thème connu', async () => {
    expect((await resolveQuizPool(route('histoire'))).length).toBeGreaterThanOrEqual(60);
  });

  it('renvoie une liste vide pour un thème inconnu ou absent', async () => {
    expect(await resolveQuizPool(route('inconnu'))).toEqual([]);
    expect(await resolveQuizPool(route(null))).toEqual([]);
  });
});
