import { TestBed } from '@angular/core/testing';

import { ProgressStore } from './progress.store';

import type { IsoDate } from '@data/quiz.types';

const STORAGE_KEY = 'quizz-du-jour:progress:v1';
const day = '2026-10-23' as IsoDate;

function createStore(): ProgressStore {
  TestBed.resetTestingModule();
  return TestBed.inject(ProgressStore);
}

describe('ProgressStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('enregistre un résultat et le relit', () => {
    const store = createStore();
    store.record('histoire', day, { score: 4, answers: [0, 1, true, 2, false] });
    expect(store.resultFor('histoire', day)?.score).toBe(4);
    expect(store.playedDates()).toEqual([day]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')).toMatchObject({ version: 1 });
  });

  it('ne remplace pas le premier résultat quand on rejoue', () => {
    const store = createStore();
    store.record('web', day, { score: 5, answers: [0, 0, 0, 0, 0] });
    store.record('web', day, { score: 1, answers: [1, 1, 1, 1, 1] });
    expect(store.resultFor('web', day)?.score).toBe(5);
  });

  it('distingue les thèmes d’un même jour', () => {
    const store = createStore();
    store.record('web', day, { score: 3, answers: [] });
    expect(store.resultFor('gaming', day)).toBeUndefined();
  });

  it('survit à un stockage corrompu', () => {
    localStorage.setItem(STORAGE_KEY, '{pas du json');
    const store = createStore();
    expect(store.resultFor('web', day)).toBeUndefined();
  });

  it('ignore un stockage qui ne respecte pas le schéma', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, results: { 'web:2026-10-23': { score: 'beaucoup' } } }),
    );
    const store = createStore();
    expect(store.playedDates()).toEqual([]);
  });
});
