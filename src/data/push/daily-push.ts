import { isIsoDate } from '../dates';
import type { IsoDate } from '../quiz.types';
import { computeStreak } from '../streak';
import { THEMES } from '../themes';

/** Ce qu'il faut savoir d'un utilisateur pour décider quoi lui envoyer : les clés de ses résultats (« thème:date ») et ses appareils (identifiants d'installation Firebase, FID). */
export interface PushUser {
  readonly uid: string;
  readonly resultKeys: readonly string[];
  readonly fids: readonly string[];
}

export interface PushMessage {
  readonly uid: string;
  readonly fid: string;
  readonly title: string;
  readonly body: string;
  /** Adresse relative du site ouverte au clic sur la notification. */
  readonly url: string;
}

const TITLE = 'Quizz du jour';

function playedDates(resultKeys: readonly string[]): IsoDate[] {
  return resultKeys.map((key) => key.split(':')[1] ?? '').filter(isIsoDate);
}

function pluralize(count: number, singular: string, plural: string): string {
  return count > 1 ? plural : singular;
}

/** Texte du rappel : il dépend de ce que l'utilisateur a déjà fait aujourd'hui et de sa série en cours. */
export function reminderBody(resultKeys: readonly string[], today: IsoDate): string | null {
  const playedToday = new Set(resultKeys.filter((key) => key.endsWith(`:${today}`)));
  const remaining = THEMES.length - playedToday.size;
  if (remaining <= 0) return null;

  const streak = computeStreak(playedDates(resultKeys), today);
  if (playedToday.size === 0 && streak > 0) {
    return `Ne perds pas ta série de ${streak} ${pluralize(streak, 'jour', 'jours')} : ton quiz du jour t'attend.`;
  }
  if (playedToday.size > 0) {
    return `Plus que ${remaining} ${pluralize(remaining, 'quiz', 'quiz')} à jouer aujourd'hui.`;
  }
  return 'Ton quiz du jour est prêt : 6 thèmes, 5 questions chacun.';
}

/** Un message par appareil de chaque utilisateur qui n'a pas terminé les six quiz du jour. */
export function planDailyPush(users: readonly PushUser[], today: IsoDate): PushMessage[] {
  return users.flatMap((user) => {
    const body = reminderBody(user.resultKeys, today);
    if (body === null) return [];
    return user.fids.map((fid) => ({ uid: user.uid, fid, title: TITLE, body, url: '/' }));
  });
}
