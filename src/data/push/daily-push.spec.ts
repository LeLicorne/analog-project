import type { IsoDate } from '../quiz.types';

import { planDailyPush, reminderBody, type PushUser } from './daily-push';

const today = '2026-10-25' as IsoDate;
const keys = (...values: string[]): string[] => values;

describe('reminderBody', () => {
  it('annonce le quiz du jour à un nouveau joueur', () => {
    expect(reminderBody([], today)).toContain('Ton quiz du jour est prêt');
  });

  it('protège une série en cours quand rien n’a été joué aujourd’hui', () => {
    const body = reminderBody(keys('web:2026-10-24', 'histoire:2026-10-23'), today);
    expect(body).toBe("Ne perds pas ta série de 2 jours : ton quiz du jour t'attend.");
  });

  it('accorde « jour » au singulier', () => {
    expect(reminderBody(keys('web:2026-10-24'), today)).toContain('série de 1 jour :');
  });

  it('ne parle pas de série brisée : un jour manqué la remet à zéro', () => {
    expect(reminderBody(keys('web:2026-10-22'), today)).toContain('Ton quiz du jour est prêt');
  });

  it('compte les quiz restants quand on a déjà commencé', () => {
    expect(reminderBody(keys('web:2026-10-25', 'gaming:2026-10-25'), today)).toBe(
      "Plus que 4 quiz à jouer aujourd'hui.",
    );
  });

  it('ne dérange pas celui qui a tout fini', () => {
    const all = ['culture-generale', 'histoire', 'geographie', 'sciences', 'web', 'gaming'].map(
      (theme) => `${theme}:2026-10-25`,
    );
    expect(reminderBody(all, today)).toBeNull();
  });

  it('ignore les clés mal formées', () => {
    expect(reminderBody(keys('n-importe-quoi', 'web:pas-une-date'), today)).toContain('prêt');
  });
});

describe('planDailyPush', () => {
  const user = (uid: string, fids: string[], resultKeys: string[] = []): PushUser => ({
    uid,
    fids,
    resultKeys,
  });

  it('envoie un message par appareil', () => {
    const plan = planDailyPush([user('u1', ['t1', 't2'])], today);
    expect(plan.map((message) => message.fid)).toEqual(['t1', 't2']);
    expect(plan.every((message) => message.uid === 'u1' && message.url === '/')).toBe(true);
  });

  it('saute les utilisateurs sans appareil et ceux qui ont tout fini', () => {
    const done = ['culture-generale', 'histoire', 'geographie', 'sciences', 'web', 'gaming'].map(
      (theme) => `${theme}:2026-10-25`,
    );
    const plan = planDailyPush(
      [user('sans-appareil', []), user('fini', ['t'], done), user('actif', ['t3'])],
      today,
    );
    expect(plan.map((message) => message.uid)).toEqual(['actif']);
  });

  it('personnalise chaque message', () => {
    const plan = planDailyPush(
      [user('a', ['ta'], ['web:2026-10-24']), user('b', ['tb'], ['web:2026-10-25'])],
      today,
    );
    expect(plan[0]?.body).toContain('série');
    expect(plan[1]?.body).toContain('Plus que 5 quiz');
  });
});
