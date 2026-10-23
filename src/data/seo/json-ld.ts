import { formatDate } from '../dates';
import type { FaqEntry } from '../faq';
import type { IsoDate, Question, Theme } from '../quiz.types';
import { correctAnswerLabel } from '../scoring';

import type { Author } from './author';
import { SITE_NAME } from './page-meta';

export type JsonLd = Readonly<Record<string, unknown>>;

export interface Crumb {
  readonly name: string;
  readonly path: string;
}

const CONTEXT = 'https://schema.org';

export function graph(...nodes: readonly JsonLd[]): JsonLd {
  return { '@context': CONTEXT, '@graph': nodes };
}

/** L'éditeur du site. L'auteur (fondateur, avec ses profils publics) n'est décrit que s'il est configuré et affiché sur la page À propos. */
export function organization(siteUrl: string, author: Author | null = null): JsonLd {
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/og-image.png`,
    ...(author
      ? {
          founder: {
            '@type': 'Person',
            '@id': `${siteUrl}/#author`,
            name: author.name,
            url: `${siteUrl}/a-propos`,
            ...(author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
          },
        }
      : {}),
  };
}

export function webSite(siteUrl: string): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

export function breadcrumbs(siteUrl: string, crumbs: readonly Crumb[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}

export function faqPage(entries: readonly FaqEntry[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

function answer(text: string): JsonLd {
  return { '@type': 'Answer', text };
}

export function questionNode(question: Question): JsonLd {
  const correct = correctAnswerLabel(question);
  const wrong =
    question.type === 'true-false'
      ? [question.answer ? 'Faux' : 'Vrai']
      : question.choices.filter((_, index) => index !== question.answerIndex);
  return {
    '@type': 'Question',
    name: question.prompt,
    eduQuestionType: question.type === 'true-false' ? 'True/false' : 'Multiple choice',
    answerCount: wrong.length + 1,
    suggestedAnswer: wrong.map(answer),
    acceptedAnswer: {
      ...answer(correct),
      answerExplanation: { '@type': 'Comment', text: question.explanation },
    },
  };
}

export function quizNode(options: {
  readonly siteUrl: string;
  readonly path: string;
  readonly theme: Theme;
  readonly date: IsoDate;
  readonly questions: readonly Question[];
  readonly withAnswers: boolean;
}): JsonLd {
  const url = `${options.siteUrl}${options.path}`;
  return {
    '@type': 'Quiz',
    '@id': `${url}#quiz`,
    url,
    name: `Quiz ${options.theme.name} du ${formatDate(options.date)}`,
    about: options.theme.name,
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
    datePublished: options.date,
    publisher: { '@id': `${options.siteUrl}/#organization` },
    ...(options.withAnswers ? { hasPart: options.questions.map(questionNode) } : {}),
  };
}

export function collectionPage(options: {
  readonly siteUrl: string;
  readonly path: string;
  readonly theme: Theme;
  readonly archive: readonly { readonly name: string; readonly path: string }[];
}): JsonLd {
  const url = `${options.siteUrl}${options.path}`;
  return {
    '@type': 'CollectionPage',
    '@id': url,
    url,
    name: `Quiz ${options.theme.name}`,
    description: options.theme.description,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${options.siteUrl}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: options.archive.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.name,
        url: `${options.siteUrl}${entry.path}`,
      })),
    },
  };
}

export function aboutPage(siteUrl: string): JsonLd {
  return {
    '@type': 'AboutPage',
    '@id': `${siteUrl}/a-propos`,
    url: `${siteUrl}/a-propos`,
    name: `À propos de ${SITE_NAME}`,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
  };
}
