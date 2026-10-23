import type { Theme, ThemeSlug } from './quiz.types';
import { THEME_SLUGS } from './quiz.types';

export const THEMES = [
  {
    slug: 'culture-generale',
    name: 'Culture générale',
    tagline: 'Un peu de tout, pour tout le monde',
    description:
      'Cinq questions par jour sur les arts, la littérature, le cinéma, la musique, le sport et les mots : le quiz de culture générale à faire en 2 minutes.',
    icon: '🧠',
  },
  {
    slug: 'histoire',
    name: 'Histoire',
    tagline: "De l'Antiquité à nos jours",
    description:
      "Cinq questions par jour sur l'histoire de France et du monde : dates, personnages, batailles et événements, avec une explication sourcée à chaque réponse.",
    icon: '🏛️',
  },
  {
    slug: 'geographie',
    name: 'Géographie',
    tagline: 'Pays, capitales, reliefs et records',
    description:
      'Cinq questions par jour sur les pays, les capitales, les fleuves, les montagnes et les océans : testez votre sens de la carte du monde.',
    icon: '🌍',
  },
  {
    slug: 'sciences',
    name: 'Sciences',
    tagline: 'Physique, chimie, biologie, espace',
    description:
      "Cinq questions par jour sur la physique, la chimie, la biologie, l'astronomie et le corps humain, avec des réponses expliquées simplement.",
    icon: '🔬',
  },
  {
    slug: 'web',
    name: 'Web & code',
    tagline: 'HTML, CSS, JavaScript, réseau, sécurité',
    description:
      'Cinq questions par jour sur le développement web : HTML, CSS, JavaScript, TypeScript, HTTP, accessibilité et sécurité, avec renvoi à la documentation officielle.',
    icon: '💻',
  },
  {
    slug: 'gaming',
    name: 'Gaming',
    tagline: 'Jeux vidéo, consoles, studios, légendes',
    description:
      "Cinq questions par jour sur l'histoire du jeu vidéo : consoles, licences cultes, studios, personnages et records, des années 70 à aujourd'hui.",
    icon: '🎮',
  },
] as const satisfies readonly Theme[];

export function isThemeSlug(value: string): value is ThemeSlug {
  return (THEME_SLUGS as readonly string[]).includes(value);
}

export function getTheme(slug: ThemeSlug): Theme {
  const theme = THEMES.find((candidate) => candidate.slug === slug);
  if (!theme) throw new Error(`Thème inconnu : ${slug}`);
  return theme;
}
