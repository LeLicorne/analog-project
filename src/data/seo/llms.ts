import { FAQ } from '../faq';
import { THEMES } from '../themes';

import { SITE_NAME } from './page-meta';

/**
 * Fichier `/llms.txt` (format llmstxt.org) : un résumé du site et la liste de ses pages utiles, en Markdown.
 * Aucun moteur majeur ne s'en sert comme standard : il est utile comme point d'entrée lisible pour un agent,
 * il ne remplace pas le contenu rendu côté serveur, les données structurées et les sources, qui font le vrai GEO.
 */
export function buildLlmsTxt(siteUrl: string): string {
  const themeLines = THEMES.map(
    (theme) => `- [Quiz ${theme.name}](${siteUrl}/themes/${theme.slug}): ${theme.description}`,
  );
  const faqLines = FAQ.map((entry) => `- ${entry.question} ${entry.answer}`);

  return [
    `# ${SITE_NAME}`,
    '',
    '> Un quiz gratuit chaque jour en français : six thèmes de cinq questions (culture générale, histoire, géographie, sciences, web et code, gaming). Chaque question a une seule bonne réponse, une explication courte et un lien vers sa source. Les quiz sont identiques pour tous les joueurs un même jour (fuseau horaire de Paris).',
    '',
    '## Quiz par thème',
    '',
    ...themeLines,
    '',
    '## Pages utiles',
    '',
    `- [Accueil](${siteUrl}/): les six quiz du jour et la FAQ.`,
    `- [À propos](${siteUrl}/a-propos): méthode, sources, accessibilité.`,
    `- [Plan du site](${siteUrl}/sitemap.xml): tous les quiz passés, avec leur corrigé en clair (une page par thème et par jour, à l'adresse /quiz/<thème>/<AAAA-MM-JJ>).`,
    '',
    '## Questions fréquentes',
    '',
    ...faqLines,
    '',
  ].join('\n');
}
