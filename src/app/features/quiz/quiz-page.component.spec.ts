import { DOCUMENT } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QuizPageComponent } from './quiz-page.component';

import { SITE_URL } from '@app/core/seo/site';
import type { IsoDate, ThemeSlug } from '@data/quiz.types';

const DATE = '2026-10-23' as IsoDate;

async function render(options: {
  slug?: ThemeSlug;
  date?: IsoDate;
  isToday: boolean;
  withCorrige: boolean;
}): Promise<{ fixture: ComponentFixture<QuizPageComponent>; element: HTMLElement }> {
  TestBed.resetTestingModule();
  await TestBed.configureTestingModule({
    imports: [QuizPageComponent],
    providers: [provideRouter([]), provideLocationMocks()],
  }).compileComponents();
  TestBed.inject(DOCUMENT)
    .head.querySelectorAll('script[data-seo-jsonld], link[rel="canonical"]')
    .forEach((node) => {
      node.remove();
    });

  const fixture = TestBed.createComponent(QuizPageComponent);
  fixture.componentRef.setInput('slug', options.slug ?? 'histoire');
  fixture.componentRef.setInput('date', options.date ?? DATE);
  fixture.componentRef.setInput('isToday', options.isToday);
  fixture.componentRef.setInput('withCorrige', options.withCorrige);
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return { fixture, element: fixture.nativeElement as HTMLElement };
}

function jsonLdNodes(): { '@type': string; hasPart?: unknown[] }[] {
  const script = TestBed.inject(DOCUMENT).head.querySelector('script[data-seo-jsonld]');
  const graph = JSON.parse(script?.textContent ?? '{}') as {
    '@graph': { '@type': string; hasPart?: unknown[] }[];
  };
  return graph['@graph'];
}

describe('QuizPageComponent', () => {
  describe('quiz passé (page indexée)', () => {
    it('affiche le corrigé en clair, avec réponse, explication et source de chaque question', async () => {
      const { element } = await render({ isToday: false, withCorrige: true });

      expect(element.querySelector('h1')?.textContent).toContain('Quiz Histoire du');
      expect(element.querySelectorAll('.corrige li')).toHaveLength(5);
      expect(element.querySelectorAll('.corrige li strong')).toHaveLength(5);
      expect(element.querySelectorAll('.corrige a[href^="https://"]')).toHaveLength(5);
      expect(element.querySelector('.lead')?.textContent).toContain('5 questions');
    });

    it('propose de rejouer sans cacher le corrigé', async () => {
      const { element } = await render({ isToday: false, withCorrige: true });
      const details = element.querySelector('details.replay');
      expect(details?.querySelector('summary')?.textContent).toContain('Rejouer');
      expect(details?.hasAttribute('open')).toBe(false);
      expect(element.querySelector('.corrige')?.closest('details')).toBeNull();
    });

    it('relie les quiz entre eux : jour précédent impossible au lancement, retour au quiz du jour', async () => {
      const { element } = await render({ isToday: false, withCorrige: true });
      const links = [...element.querySelectorAll('.day-nav a')].map((link) =>
        link.textContent.trim(),
      );
      expect(links.some((text) => text.includes('Quiz du jour'))).toBe(true);
      expect(links.some((text) => text.startsWith('←'))).toBe(false);
    });

    it('publie les 5 questions et leurs réponses dans les données structurées', async () => {
      await render({ isToday: false, withCorrige: true });
      const quiz = jsonLdNodes().find((node) => node['@type'] === 'Quiz');
      expect(quiz?.hasPart).toHaveLength(5);
      expect(
        TestBed.inject(DOCUMENT).head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      ).toBe(`${SITE_URL}/quiz/histoire/${DATE}`);
    });
  });

  describe('quiz du jour', () => {
    it('ne montre ni corrigé ni réponses dans le JSON-LD', async () => {
      const { element } = await render({ isToday: true, withCorrige: false });
      expect(element.querySelector('.corrige')).toBeNull();
      expect(element.querySelector('app-quiz-player')).not.toBeNull();
      const quiz = jsonLdNodes().find((node) => node['@type'] === 'Quiz');
      expect(quiz).toBeDefined();
      expect(quiz).not.toHaveProperty('hasPart');
    });

    it('a une adresse canonique unique, sans la date', async () => {
      await render({ isToday: true, withCorrige: false });
      expect(
        TestBed.inject(DOCUMENT).head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      ).toBe(`${SITE_URL}/quiz/histoire`);
    });
  });
});
