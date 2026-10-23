import { parseAuthor } from './author';

describe('parseAuthor', () => {
  it('ne publie aucun auteur sans nom', () => {
    expect(parseAuthor({})).toBeNull();
    expect(
      parseAuthor({ VITE_AUTHOR_NAME: '   ', VITE_AUTHOR_GITHUB: 'https://github.com/x' }),
    ).toBeNull();
  });

  it('lit le nom et les profils publics', () => {
    expect(
      parseAuthor({
        VITE_AUTHOR_NAME: ' Ada Lovelace ',
        VITE_AUTHOR_GITHUB: 'https://github.com/ada',
        VITE_AUTHOR_LINKEDIN: 'https://www.linkedin.com/in/ada',
      }),
    ).toEqual({
      name: 'Ada Lovelace',
      sameAs: ['https://github.com/ada', 'https://www.linkedin.com/in/ada'],
    });
  });

  it('écarte les adresses qui ne sont pas en https ou qui sont invalides', () => {
    const author = parseAuthor({
      VITE_AUTHOR_NAME: 'Ada',
      VITE_AUTHOR_GITHUB: 'http://github.com/ada',
      VITE_AUTHOR_LINKEDIN: 'javascript:alert(1)',
    });
    expect(author?.sameAs).toEqual([]);
  });

  it('accepte un auteur sans profil', () => {
    expect(parseAuthor({ VITE_AUTHOR_NAME: 'Ada' })).toEqual({ name: 'Ada', sameAs: [] });
  });
});
