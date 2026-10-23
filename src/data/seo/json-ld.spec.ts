import { FAQ } from '../faq';
import { loadQuestions } from '../question-loader';
import type { IsoDate } from '../quiz.types';
import { getTheme } from '../themes';

import { breadcrumbs, faqPage, graph, questionNode, quizNode } from './json-ld';

const SITE = 'https://quizz.example';
const date = '2026-10-23' as IsoDate;

describe('données structurées', () => {
  it('encapsule les nœuds dans un @graph schema.org', () => {
    const data = graph({ '@type': 'Thing' });
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@graph']).toHaveLength(1);
  });

  it('numérote le fil d’Ariane à partir de 1 avec des URL absolues', () => {
    const data = breadcrumbs(SITE, [
      { name: 'Accueil', path: '/' },
      { name: 'Histoire', path: '/themes/histoire' },
    ]) as { itemListElement: { position: number; item: string }[] };
    expect(data.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    expect(data.itemListElement[1]?.item).toBe('https://quizz.example/themes/histoire');
  });

  it('reprend exactement les questions de la FAQ visible', () => {
    const data = faqPage(FAQ) as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(data.mainEntity.map((entry) => entry.name)).toEqual(FAQ.map((entry) => entry.question));
    expect(data.mainEntity.map((entry) => entry.acceptedAnswer.text)).toEqual(
      FAQ.map((entry) => entry.answer),
    );
  });

  it('décrit la bonne réponse et les mauvaises de chaque question', async () => {
    const questions = await loadQuestions('histoire');
    const single = questions.find((question) => question.type === 'single');
    const trueFalse = questions.find((question) => question.type === 'true-false');
    if (!single || !trueFalse) throw new Error('jeu de questions incomplet');

    const singleNode = questionNode(single) as { suggestedAnswer: unknown[]; answerCount: number };
    expect(singleNode.suggestedAnswer).toHaveLength(3);
    expect(singleNode.answerCount).toBe(4);

    const tfNode = questionNode(trueFalse) as {
      suggestedAnswer: { text: string }[];
      acceptedAnswer: { text: string };
    };
    expect(tfNode.suggestedAnswer).toHaveLength(1);
    expect(tfNode.suggestedAnswer[0]?.text).not.toBe(tfNode.acceptedAnswer.text);
  });

  it('n’expose les réponses que pour les quiz passés', async () => {
    const questions = (await loadQuestions('histoire')).slice(0, 5);
    const base = {
      siteUrl: SITE,
      path: '/quiz/histoire/2026-10-23',
      theme: getTheme('histoire'),
      date,
      questions,
    };
    expect(quizNode({ ...base, withAnswers: true })['hasPart']).toHaveLength(5);
    expect(quizNode({ ...base, withAnswers: false })).not.toHaveProperty('hasPart');
  });

  it('produit du JSON sérialisable', async () => {
    const questions = (await loadQuestions('web')).slice(0, 5);
    const node = quizNode({
      siteUrl: SITE,
      path: '/quiz/web/2026-10-23',
      theme: getTheme('web'),
      date,
      questions,
      withAnswers: true,
    });
    const parsed: unknown = JSON.parse(JSON.stringify(graph(node)));
    expect(parsed).toHaveProperty('@graph');
  });
});
