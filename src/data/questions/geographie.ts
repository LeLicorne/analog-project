import type { Question } from '../quiz.types';

export const questions = [
  {
    id: 'geographie-001',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est la capitale de l’Australie ?',
    choices: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    answerIndex: 2,
    explanation:
      'Canberra est la capitale fédérale de l’Australie. Cette ville planifiée, située dans le sud-est du pays, a été choisie comme compromis entre les rivales Sydney et Melbourne.',
    source: { label: 'Wikipédia : Canberra', url: 'https://fr.wikipedia.org/wiki/Canberra' },
  },
  {
    id: 'geographie-002',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le plus grand océan du monde ?',
    choices: ['L’océan Pacifique', 'L’océan Atlantique', 'L’océan Indien', 'L’océan Arctique'],
    answerIndex: 0,
    explanation:
      'L’océan Pacifique est le plus vaste et le plus profond des océans. Il couvre environ un tiers de la surface du globe.',
    source: {
      label: 'Wikipédia : Océan Pacifique',
      url: 'https://fr.wikipedia.org/wiki/Oc%C3%A9an_Pacifique',
    },
  },
  {
    id: 'geographie-003',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le plus long fleuve de France ?',
    choices: ['La Seine', 'La Garonne', 'Le Rhône', 'La Loire'],
    answerIndex: 3,
    explanation:
      'La Loire est le plus long fleuve de France, avec environ 1 000 km. Elle prend sa source dans le Massif central et se jette dans l’océan Atlantique près de Saint-Nazaire.',
    source: {
      label: 'Wikipédia : Loire (fleuve)',
      url: 'https://fr.wikipedia.org/wiki/Loire_(fleuve)',
    },
  },
  {
    id: 'geographie-004',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est la capitale du Brésil ?',
    choices: ['Rio de Janeiro', 'Brasília', 'São Paulo', 'Salvador'],
    answerIndex: 1,
    explanation:
      'Brasília est la capitale du Brésil depuis son inauguration en 1960. Cette ville planifiée se trouve sur le plateau central du pays, loin de la côte.',
    source: { label: 'Wikipédia : Brasília', url: 'https://fr.wikipedia.org/wiki/Bras%C3%ADlia' },
  },
  {
    id: 'geographie-005',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Le Nil se jette dans la mer Méditerranée.',
    answer: true,
    explanation:
      'Le Nil se jette dans la Méditerranée, au nord de l’Égypte, en formant un vaste delta. Avec plus de 6 600 km, c’est l’un des plus longs fleuves du monde.',
    source: { label: 'Wikipédia : Nil', url: 'https://fr.wikipedia.org/wiki/Nil' },
  },
  {
    id: 'geographie-006',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le plus haut sommet du monde au-dessus du niveau de la mer ?',
    choices: ['Le K2', 'L’Everest', 'Le Kangchenjunga', 'Le Lhotse'],
    answerIndex: 1,
    explanation:
      'L’Everest culmine à près de 8 850 m d’altitude. Il se situe dans l’Himalaya, à la frontière entre le Népal et la Chine.',
    source: { label: 'Wikipédia : Everest', url: 'https://fr.wikipedia.org/wiki/Everest' },
  },
  {
    id: 'geographie-007',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le plus grand désert chaud du monde ?',
    choices: ['Le Kalahari', 'Le désert de Thar', 'Le désert d’Arabie', 'Le Sahara'],
    answerIndex: 3,
    explanation:
      'Le Sahara est le plus grand désert chaud de la planète. Il s’étend sur plus de 9 millions de km² dans le nord de l’Afrique.',
    source: { label: 'Wikipédia : Sahara', url: 'https://fr.wikipedia.org/wiki/Sahara' },
  },
  {
    id: 'geographie-008',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est la capitale du Canada ?',
    choices: ['Ottawa', 'Toronto', 'Montréal', 'Vancouver'],
    answerIndex: 0,
    explanation:
      'Ottawa est la capitale fédérale du Canada. Elle se situe en Ontario, sur la rivière des Outaouais, à la frontière avec le Québec.',
    source: { label: 'Wikipédia : Ottawa', url: 'https://fr.wikipedia.org/wiki/Ottawa' },
  },
  {
    id: 'geographie-009',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est la plus grande île du monde, sans compter les continents ?',
    choices: ['Madagascar', 'Bornéo', 'Le Groenland', 'La Nouvelle-Guinée'],
    answerIndex: 2,
    explanation:
      'Le Groenland est la plus grande île du monde, avec environ 2,2 millions de km². Il se trouve entre l’océan Arctique et l’Atlantique Nord, et est en grande partie recouvert par une calotte glaciaire.',
    source: { label: 'Wikipédia : Groenland', url: 'https://fr.wikipedia.org/wiki/Groenland' },
  },
  {
    id: 'geographie-010',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : L’Autriche possède un accès direct à la mer.',
    answer: false,
    explanation:
      'L’Autriche est un pays enclavé d’Europe centrale, sans aucune côte maritime. Elle est entourée par huit pays, dont l’Allemagne, l’Italie et la Hongrie.',
    source: { label: 'Wikipédia : Autriche', url: 'https://fr.wikipedia.org/wiki/Autriche' },
  },
  {
    id: 'geographie-011',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel pays européen a la forme d’une botte ?',
    choices: ['La Grèce', 'L’Espagne', 'Le Portugal', 'L’Italie'],
    answerIndex: 3,
    explanation:
      'La péninsule italienne a la forme d’une botte qui semble donner un coup de pied dans la Sicile. Elle s’avance dans la mer Méditerranée depuis les Alpes.',
    source: { label: 'Wikipédia : Italie', url: 'https://fr.wikipedia.org/wiki/Italie' },
  },
  {
    id: 'geographie-012',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le plus vaste pays du monde par sa superficie ?',
    choices: ['Le Canada', 'La Chine', 'La Russie', 'Les États-Unis'],
    answerIndex: 2,
    explanation:
      'La Russie est le plus grand pays du monde, avec plus de 17 millions de km². Elle s’étend sur l’Europe de l’Est et l’ensemble du nord de l’Asie.',
    source: { label: 'Wikipédia : Russie', url: 'https://fr.wikipedia.org/wiki/Russie' },
  },
  {
    id: 'geographie-013',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle mer borde la côte sud-est de la France, de Marseille à Nice ?',
    choices: ['La mer Méditerranée', 'La mer du Nord', 'La Manche', 'La mer Baltique'],
    answerIndex: 0,
    explanation:
      'La mer Méditerranée borde le littoral méridional de la France, de la Camargue à la Côte d’Azur. Elle est presque entièrement fermée et ne communique avec l’Atlantique que par le détroit de Gibraltar.',
    source: {
      label: 'Wikipédia : Mer Méditerranée',
      url: 'https://fr.wikipedia.org/wiki/Mer_M%C3%A9diterran%C3%A9e',
    },
  },
  {
    id: 'geographie-014',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le plus haut sommet des Alpes ?',
    choices: ['Le Cervin', 'Le mont Blanc', 'Le Mont Rose', 'L’Eiger'],
    answerIndex: 1,
    explanation:
      'Le mont Blanc culmine à environ 4 806 m et domine le massif des Alpes. Il se situe à la frontière entre la France et l’Italie, près de Chamonix.',
    source: { label: 'Wikipédia : Mont Blanc', url: 'https://fr.wikipedia.org/wiki/Mont_Blanc' },
  },
  {
    id: 'geographie-015',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le Danube se jette dans la mer Noire.',
    answer: true,
    explanation:
      'Le Danube se jette dans la mer Noire par un delta situé en Roumanie et en Ukraine. Il traverse ou longe dix pays, ce qui en fait le fleuve le plus international du monde.',
    source: { label: 'Wikipédia : Danube', url: 'https://fr.wikipedia.org/wiki/Danube' },
  },
  {
    id: 'geographie-016',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle île de la Méditerranée, surnommée l’« île de Beauté », fait partie de la France ?',
    choices: ['La Sardaigne', 'La Sicile', 'La Corse', 'Majorque'],
    answerIndex: 2,
    explanation:
      'La Corse, surnommée l’« île de Beauté », est une île française de la Méditerranée. Son relief montagneux culmine à plus de 2 700 m au monte Cinto.',
    source: { label: 'Wikipédia : Corse', url: 'https://fr.wikipedia.org/wiki/Corse' },
  },
  {
    id: 'geographie-017',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel océan sépare l’Europe et l’Afrique du continent américain ?',
    choices: ['L’océan Atlantique', 'L’océan Indien', 'L’océan Pacifique', 'L’océan Arctique'],
    answerIndex: 0,
    explanation:
      'L’océan Atlantique s’étend entre les côtes de l’Europe et de l’Afrique à l’est et celles des Amériques à l’ouest. C’est le deuxième océan du monde par sa superficie.',
    source: {
      label: 'Wikipédia : Océan Atlantique',
      url: 'https://fr.wikipedia.org/wiki/Oc%C3%A9an_Atlantique',
    },
  },
  {
    id: 'geographie-018',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le plus petit État du monde par sa superficie ?',
    choices: ['Monaco', 'Le Vatican', 'Saint-Marin', 'Le Liechtenstein'],
    answerIndex: 1,
    explanation:
      'Le Vatican est le plus petit État souverain du monde, avec environ 0,44 km². Il est entièrement enclavé dans la ville de Rome, en Italie.',
    source: { label: 'Wikipédia : Vatican', url: 'https://fr.wikipedia.org/wiki/Vatican' },
  },
  {
    id: 'geographie-019',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel continent est situé autour du pôle Sud ?',
    choices: ['L’Océanie', 'L’Amérique du Sud', 'L’Afrique', 'L’Antarctique'],
    answerIndex: 3,
    explanation:
      'L’Antarctique est le continent qui entoure le pôle Sud. Presque entièrement recouvert d’une épaisse calotte glaciaire, il n’a pas de population permanente.',
    source: { label: 'Wikipédia : Antarctique', url: 'https://fr.wikipedia.org/wiki/Antarctique' },
  },
  {
    id: 'geographie-020',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Le désert de Gobi se situe en Amérique du Sud.',
    answer: false,
    explanation:
      'Le désert de Gobi se trouve en Asie, à cheval sur le sud de la Mongolie et le nord de la Chine. Les déserts d’Amérique du Sud sont par exemple l’Atacama et la Patagonie.',
    source: {
      label: 'Wikipédia : Désert de Gobi',
      url: 'https://fr.wikipedia.org/wiki/D%C3%A9sert_de_Gobi',
    },
  },
  {
    id: 'geographie-021',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle chaîne de montagnes forme la frontière naturelle entre la France et l’Espagne ?',
    choices: ['Les Pyrénées', 'Les Alpes', 'Le Jura', 'Les Vosges'],
    answerIndex: 0,
    explanation:
      'Les Pyrénées s’étendent sur environ 430 km, de l’Atlantique à la Méditerranée. Elles séparent la France de l’Espagne et abritent la principauté d’Andorre.',
    source: {
      label: 'Wikipédia : Pyrénées',
      url: 'https://fr.wikipedia.org/wiki/Pyr%C3%A9n%C3%A9es',
    },
  },
  {
    id: 'geographie-022',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est la capitale de l’Égypte ?',
    choices: ['Alexandrie', 'Gizeh', 'Louxor', 'Le Caire'],
    answerIndex: 3,
    explanation:
      'Le Caire est la capitale de l’Égypte et l’une des plus grandes villes d’Afrique. Elle est bâtie sur les rives du Nil, à proximité du plateau de Gizeh.',
    source: { label: 'Wikipédia : Le Caire', url: 'https://fr.wikipedia.org/wiki/Le_Caire' },
  },
  {
    id: 'geographie-023',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel grand fleuve français prend sa source en Suisse et se jette dans la mer Méditerranée ?',
    choices: ['La Seine', 'La Loire', 'Le Rhône', 'La Garonne'],
    answerIndex: 2,
    explanation:
      'Le Rhône prend sa source dans le massif des Alpes, en Suisse, traverse le lac Léman puis Lyon. Il se jette dans la Méditerranée par un delta, la Camargue.',
    source: { label: 'Wikipédia : Rhône', url: 'https://fr.wikipedia.org/wiki/Rh%C3%B4ne' },
  },
  {
    id: 'geographie-024',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Comment appelle-t-on une série de vagues géantes provoquée par un séisme ou une éruption sous-marine ?',
    choices: ['Un mascaret', 'Un tsunami', 'Une houle', 'Une tornade'],
    answerIndex: 1,
    explanation:
      'Un tsunami est une série de vagues très longues déclenchées par un séisme, un glissement de terrain ou une éruption sous la mer. Ces vagues peuvent traverser un océan entier avant de frapper les côtes.',
    source: { label: 'Wikipédia : Tsunami', url: 'https://fr.wikipedia.org/wiki/Tsunami' },
  },
  {
    id: 'geographie-025',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le Kilimandjaro est le plus haut sommet d’Afrique.',
    answer: true,
    explanation:
      'Le Kilimandjaro, en Tanzanie, culmine à environ 5 900 m et est le point culminant de l’Afrique. C’est un volcan isolé, sans lien avec une chaîne de montagnes.',
    source: {
      label: 'Wikipédia : Kilimandjaro',
      url: 'https://fr.wikipedia.org/wiki/Kilimandjaro',
    },
  },
  {
    id: 'geographie-026',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel fleuve d’Amérique du Sud a le plus grand débit du monde ?',
    choices: ['L’Orénoque', 'Le Paraná', 'Le Magdalena', 'L’Amazone'],
    answerIndex: 3,
    explanation:
      'L’Amazone est le fleuve au plus fort débit de la planète, loin devant tous les autres. Il traverse surtout le Brésil et se jette dans l’océan Atlantique.',
    source: {
      label: 'Wikipédia : Amazone (fleuve)',
      url: 'https://fr.wikipedia.org/wiki/Amazone_(fleuve)',
    },
  },
  {
    id: 'geographie-027',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle est la capitale de la Nouvelle-Zélande ?',
    choices: ['Auckland', 'Wellington', 'Christchurch', 'Dunedin'],
    answerIndex: 1,
    explanation:
      'Wellington est la capitale de la Nouvelle-Zélande. Elle se trouve à la pointe sud de l’île du Nord, alors qu’Auckland est la plus grande ville du pays.',
    source: { label: 'Wikipédia : Wellington', url: 'https://fr.wikipedia.org/wiki/Wellington' },
  },
  {
    id: 'geographie-028',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle étendue d’eau salée est la surface émergée la plus basse du globe, à environ 400 m sous le niveau de la mer ?',
    choices: ['La mer Caspienne', 'La mer d’Aral', 'La mer Morte', 'Le lac Assal'],
    answerIndex: 2,
    explanation:
      'Les rives de la mer Morte se situent à plus de 400 m sous le niveau des océans, ce qui en fait le point terrestre le plus bas du globe. Sa forte salinité empêche presque toute vie aquatique.',
    source: { label: 'Wikipédia : Mer Morte', url: 'https://fr.wikipedia.org/wiki/Mer_Morte' },
  },
  {
    id: 'geographie-029',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel détroit relie la Méditerranée à l’océan Atlantique, entre l’Espagne et le Maroc ?',
    choices: ['Le détroit de Gibraltar', 'Le Bosphore', 'Le détroit de Messine', 'Les Dardanelles'],
    answerIndex: 0,
    explanation:
      'Le détroit de Gibraltar relie la Méditerranée à l’Atlantique et sépare l’Europe de l’Afrique. Il ne mesure qu’environ 14 km de large à son endroit le plus étroit.',
    source: {
      label: 'Wikipédia : Détroit de Gibraltar',
      url: 'https://fr.wikipedia.org/wiki/D%C3%A9troit_de_Gibraltar',
    },
  },
  {
    id: 'geographie-030',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le Groenland est un État indépendant.',
    answer: false,
    explanation:
      'Le Groenland n’est pas un État souverain : c’est un territoire autonome rattaché au Royaume du Danemark. Il dispose de son propre gouvernement pour la plupart des affaires intérieures.',
    source: { label: 'Wikipédia : Groenland', url: 'https://fr.wikipedia.org/wiki/Groenland' },
  },
  {
    id: 'geographie-031',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel canal relie la mer Méditerranée à la mer Rouge ?',
    choices: ['Le canal de Panama', 'Le canal de Kiel', 'Le canal de Suez', 'Le canal de Corinthe'],
    answerIndex: 2,
    explanation:
      'Le canal de Suez, en Égypte, relie la Méditerranée à la mer Rouge et évite de contourner l’Afrique. Il a été inauguré en 1869 et mesure environ 190 km.',
    source: {
      label: 'Wikipédia : Canal de Suez',
      url: 'https://fr.wikipedia.org/wiki/Canal_de_Suez',
    },
  },
  {
    id: 'geographie-032',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle est la plus longue chaîne de montagnes continentale du monde, avec environ 7 000 km ?',
    choices: ['Les Andes', 'Les Rocheuses', 'L’Himalaya', 'Les Alpes'],
    answerIndex: 0,
    explanation:
      'Les Andes longent toute la côte ouest de l’Amérique du Sud, sur environ 7 000 km. Elles traversent notamment la Colombie, le Pérou, la Bolivie, le Chili et l’Argentine.',
    source: { label: 'Wikipédia : Andes', url: 'https://fr.wikipedia.org/wiki/Andes' },
  },
  {
    id: 'geographie-033',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel est le plus grand lac d’Afrique par sa superficie ?',
    choices: ['Le lac Tanganyika', 'Le lac Malawi', 'Le lac Tchad', 'Le lac Victoria'],
    answerIndex: 3,
    explanation:
      'Le lac Victoria est le plus grand lac d’Afrique et l’un des plus grands lacs d’eau douce du monde. Il est partagé entre l’Ouganda, la Tanzanie et le Kenya, et alimente le Nil Blanc.',
    source: {
      label: 'Wikipédia : Lac Victoria',
      url: 'https://fr.wikipedia.org/wiki/Lac_Victoria',
    },
  },
  {
    id: 'geographie-034',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Sur quel fleuve se trouvent les célèbres chutes Victoria, en Afrique australe ?',
    choices: ['Le Zambèze', 'Le Congo', 'Le Limpopo', 'L’Orange'],
    answerIndex: 0,
    explanation:
      'Les chutes Victoria se situent sur le Zambèze, à la frontière entre la Zambie et le Zimbabwe. Elles sont parmi les plus grandes chutes d’eau du monde et sont inscrites au patrimoine mondial de l’UNESCO.',
    source: {
      label: 'Wikipédia : Chutes Victoria',
      url: 'https://fr.wikipedia.org/wiki/Chutes_Victoria',
    },
  },
  {
    id: 'geographie-035',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : La Sicile est la plus grande île de la mer Méditerranée.',
    answer: true,
    explanation:
      'La Sicile est la plus grande île de la Méditerranée, avec environ 25 700 km². Elle appartient à l’Italie et est séparée du continent par le détroit de Messine.',
    source: { label: 'Wikipédia : Sicile', url: 'https://fr.wikipedia.org/wiki/Sicile' },
  },
  {
    id: 'geographie-036',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel est le plus long fleuve d’Europe ?',
    choices: ['Le Danube', 'Le Rhin', 'La Volga', 'L’Oural'],
    answerIndex: 2,
    explanation:
      'La Volga est le plus long fleuve d’Europe, avec environ 3 500 km. Elle traverse la Russie et se jette dans la mer Caspienne.',
    source: { label: 'Wikipédia : Volga', url: 'https://fr.wikipedia.org/wiki/Volga' },
  },
  {
    id: 'geographie-037',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel pays est composé de plus de 15 000 îles, dont Java, Sumatra et Bornéo en partie ?',
    choices: ['Les Philippines', 'Le Japon', 'Les Maldives', 'L’Indonésie'],
    answerIndex: 3,
    explanation:
      'L’Indonésie est le plus grand archipel du monde, avec plus de 15 000 îles. Il s’étend entre l’océan Indien et l’océan Pacifique, de part et d’autre de l’équateur.',
    source: { label: 'Wikipédia : Indonésie', url: 'https://fr.wikipedia.org/wiki/Indon%C3%A9sie' },
  },
  {
    id: 'geographie-038',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle grande ville française se situe au confluent du Rhône et de la Saône ?',
    choices: ['Lyon', 'Valence', 'Avignon', 'Grenoble'],
    answerIndex: 0,
    explanation:
      'Lyon est bâtie au confluent du Rhône et de la Saône, dans le sud-est de la France. Cette position fluviale a fait d’elle un carrefour commercial depuis l’Antiquité.',
    source: { label: 'Wikipédia : Lyon', url: 'https://fr.wikipedia.org/wiki/Lyon' },
  },
  {
    id: 'geographie-039',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle ville accueille le siège officiel du Parlement européen ?',
    choices: ['Bruxelles', 'Strasbourg', 'Luxembourg', 'Genève'],
    answerIndex: 1,
    explanation:
      'Le siège officiel du Parlement européen est à Strasbourg, dans l’est de la France, près de la frontière allemande. Une partie du travail parlementaire se déroule aussi à Bruxelles.',
    source: { label: 'Wikipédia : Strasbourg', url: 'https://fr.wikipedia.org/wiki/Strasbourg' },
  },
  {
    id: 'geographie-040',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : La Nouvelle-Zélande est située dans l’hémisphère Nord.',
    answer: false,
    explanation:
      'La Nouvelle-Zélande se trouve dans l’hémisphère Sud, dans le sud-ouest de l’océan Pacifique. Ses saisons sont donc inversées par rapport à celles de l’Europe.',
    source: {
      label: 'Wikipédia : Nouvelle-Zélande',
      url: 'https://fr.wikipedia.org/wiki/Nouvelle-Z%C3%A9lande',
    },
  },
  {
    id: 'geographie-041',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel est le plus grand pays d’Afrique par sa superficie ?',
    choices: ['Le Soudan', 'La République démocratique du Congo', 'La Libye', 'L’Algérie'],
    answerIndex: 3,
    explanation:
      'L’Algérie est le plus grand pays d’Afrique, avec environ 2,4 millions de km². Le Sahara en occupe la majeure partie, au sud du littoral méditerranéen.',
    source: { label: 'Wikipédia : Algérie', url: 'https://fr.wikipedia.org/wiki/Alg%C3%A9rie' },
  },
  {
    id: 'geographie-042',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Sur quelle grande île africaine vivent à l’état sauvage la plupart des espèces de lémuriens ?',
    choices: ['Madagascar', 'Zanzibar', 'Maurice', 'Bioko'],
    answerIndex: 0,
    explanation:
      'Les lémuriens vivent à l’état naturel presque exclusivement à Madagascar, île de l’océan Indien située à l’est de l’Afrique. Cette île est l’une des plus grandes du monde et abrite une biodiversité très riche.',
    source: { label: 'Wikipédia : Madagascar', url: 'https://fr.wikipedia.org/wiki/Madagascar' },
  },
  {
    id: 'geographie-043',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle est la plus grande étendue d’eau fermée du monde, appelée « mer » malgré son statut de lac ?',
    choices: ['La mer d’Aral', 'La mer Caspienne', 'La mer Morte', 'Le lac Supérieur'],
    answerIndex: 1,
    explanation:
      'La mer Caspienne est la plus grande étendue d’eau fermée de la planète, avec environ 370 000 km². Elle est bordée par la Russie, le Kazakhstan, le Turkménistan, l’Iran et l’Azerbaïdjan.',
    source: {
      label: 'Wikipédia : Mer Caspienne',
      url: 'https://fr.wikipedia.org/wiki/Mer_Caspienne',
    },
  },
  {
    id: 'geographie-044',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel volcan actif de Sicile domine la ville de Catane ?',
    choices: ['Le Vésuve', 'Le Stromboli', 'L’Etna', 'Santorin'],
    answerIndex: 2,
    explanation:
      'L’Etna est un volcan actif situé sur la côte est de la Sicile, au-dessus de Catane. Il culmine à environ 3 300 m et compte parmi les volcans les plus actifs d’Europe.',
    source: { label: 'Wikipédia : Etna', url: 'https://fr.wikipedia.org/wiki/Etna' },
  },
  {
    id: 'geographie-045',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Le Maroc est bordé à la fois par l’océan Atlantique et par la mer Méditerranée.',
    answer: true,
    explanation:
      'Le Maroc dispose d’une façade sur l’océan Atlantique à l’ouest et d’une côte sur la Méditerranée au nord. Il fait face à l’Espagne de l’autre côté du détroit de Gibraltar.',
    source: { label: 'Wikipédia : Maroc', url: 'https://fr.wikipedia.org/wiki/Maroc' },
  },
  {
    id: 'geographie-046',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Comment appelle-t-on un cyclone tropical qui se forme dans le nord-ouest de l’océan Pacifique, près de l’Asie de l’Est ?',
    choices: ['Un typhon', 'Un ouragan', 'Une mousson', 'Un blizzard'],
    answerIndex: 0,
    explanation:
      'Un typhon est un cyclone tropical du nord-ouest de l’océan Pacifique, qui touche surtout le Japon, les Philippines et la Chine. Dans l’Atlantique Nord, le même phénomène s’appelle un ouragan.',
    source: {
      label: 'Wikipédia : Cyclone tropical',
      url: 'https://fr.wikipedia.org/wiki/Cyclone_tropical',
    },
  },
  {
    id: 'geographie-047',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel pays a pour drapeau un carré rouge orné d’une croix blanche ?',
    choices: ['Le Danemark', 'La Géorgie', 'La Suisse', 'Le Tonga'],
    answerIndex: 2,
    explanation:
      'Le drapeau de la Suisse est rouge avec une croix blanche aux branches égales. Avec celui du Vatican, c’est l’un des deux seuls drapeaux nationaux de forme carrée.',
    source: {
      label: 'Wikipédia : Drapeau de la Suisse',
      url: 'https://fr.wikipedia.org/wiki/Drapeau_de_la_Suisse',
    },
  },
  {
    id: 'geographie-048',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel est le plus haut sommet d’Amérique du Sud ?',
    choices: ['Le Chimborazo', 'L’Aconcagua', 'Le Huascarán', 'Le Fitz Roy'],
    answerIndex: 1,
    explanation:
      'L’Aconcagua culmine à environ 6 960 m, en Argentine, près de la frontière chilienne. C’est le plus haut sommet du monde en dehors de l’Asie.',
    source: { label: 'Wikipédia : Aconcagua', url: 'https://fr.wikipedia.org/wiki/Aconcagua' },
  },
  {
    id: 'geographie-049',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel désert, situé principalement au Chili, est considéré comme l’un des plus arides du monde ?',
    choices: ['La Patagonie', 'Le désert de Mojave', 'Le Kalahari', 'Le désert d’Atacama'],
    answerIndex: 3,
    explanation:
      'Le désert d’Atacama longe la côte pacifique du nord du Chili. Il est réputé comme l’un des endroits les plus secs de la planète, où certaines stations n’enregistrent presque aucune pluie.',
    source: {
      label: 'Wikipédia : Désert d’Atacama',
      url: 'https://fr.wikipedia.org/wiki/D%C3%A9sert_d%27Atacama',
    },
  },
  {
    id: 'geographie-050',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le Pérou est traversé par l’équateur.',
    answer: false,
    explanation:
      'L’équateur ne traverse pas le Pérou, qui se trouve entièrement dans l’hémisphère Sud. En Amérique du Sud, il passe notamment par l’Équateur, la Colombie et le Brésil.',
    source: { label: 'Wikipédia : Pérou', url: 'https://fr.wikipedia.org/wiki/P%C3%A9rou' },
  },
  {
    id: 'geographie-051',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quelle est la capitale du Nigeria ?',
    choices: ['Lagos', 'Kano', 'Abuja', 'Ibadan'],
    answerIndex: 2,
    explanation:
      'Abuja est la capitale du Nigeria depuis 1991, en remplacement de Lagos. Elle a été construite au centre du pays, alors que Lagos reste la plus grande ville.',
    source: { label: 'Wikipédia : Abuja', url: 'https://fr.wikipedia.org/wiki/Abuja' },
  },
  {
    id: 'geographie-052',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel détroit sépare la Russie de l’Alaska, et donc l’Asie de l’Amérique du Nord ?',
    choices: [
      'Le détroit de Davis',
      'Le détroit de Béring',
      'Le détroit de Magellan',
      'Le passage de Drake',
    ],
    answerIndex: 1,
    explanation:
      'Le détroit de Béring relie l’océan Pacifique à l’océan Arctique entre la Sibérie orientale et l’Alaska. Il mesure environ 85 km de large à son point le plus étroit.',
    source: {
      label: 'Wikipédia : Détroit de Béring',
      url: 'https://fr.wikipedia.org/wiki/D%C3%A9troit_de_B%C3%A9ring',
    },
  },
  {
    id: 'geographie-053',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel est le plus long fleuve d’Asie ?',
    choices: ['Le fleuve Jaune', 'Le Mékong', 'Le Gange', 'Le Yangzi Jiang'],
    answerIndex: 3,
    explanation:
      'Le Yangzi Jiang, ou fleuve Bleu, est le plus long fleuve d’Asie avec environ 6 300 km. Il traverse la Chine d’ouest en est et se jette dans la mer de Chine orientale près de Shanghai.',
    source: {
      label: 'Wikipédia : Yangzi Jiang',
      url: 'https://fr.wikipedia.org/wiki/Yangzi_Jiang',
    },
  },
  {
    id: 'geographie-054',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel lac de Sibérie est le plus profond du monde, avec plus de 1 600 m ?',
    choices: ['Le lac Baïkal', 'Le lac Tanganyika', 'Le lac Supérieur', 'Le lac Ladoga'],
    answerIndex: 0,
    explanation:
      'Le lac Baïkal, en Sibérie, est le lac le plus profond du monde avec plus de 1 600 m. Il contient à lui seul environ un cinquième de l’eau douce liquide de surface de la planète.',
    source: {
      label: 'Wikipédia : Lac Baïkal',
      url: 'https://fr.wikipedia.org/wiki/Lac_Ba%C3%AFkal',
    },
  },
  {
    id: 'geographie-055',
    type: 'true-false',
    difficulty: 'difficile',
    prompt: 'Vrai ou faux : L’Islande est située sur la dorsale médio-atlantique.',
    answer: true,
    explanation:
      'L’Islande est l’une des rares terres émergées traversées par la dorsale médio-atlantique, où les plaques nord-américaine et eurasienne s’écartent. Cette position explique ses nombreux volcans et geysers.',
    source: { label: 'Wikipédia : Islande', url: 'https://fr.wikipedia.org/wiki/Islande' },
  },
  {
    id: 'geographie-056',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel fleuve traverse la ville de Bagdad, capitale de l’Irak ?',
    choices: ['L’Euphrate', 'Le Jourdain', 'Le Tigre', 'Le Nil'],
    answerIndex: 2,
    explanation:
      'Bagdad est bâtie sur les rives du Tigre. Avec l’Euphrate, ce fleuve délimite la Mésopotamie, la région située « entre les fleuves ».',
    source: {
      label: 'Wikipédia : Tigre (fleuve)',
      url: 'https://fr.wikipedia.org/wiki/Tigre_(fleuve)',
    },
  },
  {
    id: 'geographie-057',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quelle île des Caraïbes est partagée entre Haïti et la République dominicaine ?',
    choices: ['Cuba', 'La Jamaïque', 'Porto Rico', 'Hispaniola'],
    answerIndex: 3,
    explanation:
      'Hispaniola est une île des Grandes Antilles dont l’ouest appartient à Haïti et l’est à la République dominicaine. Christophe Colomb y aborda en 1492.',
    source: { label: 'Wikipédia : Hispaniola', url: 'https://fr.wikipedia.org/wiki/Hispaniola' },
  },
  {
    id: 'geographie-058',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel est le plus grand pays du monde sans accès à la mer ?',
    choices: ['Le Kazakhstan', 'La Mongolie', 'L’Éthiopie', 'Le Tchad'],
    answerIndex: 0,
    explanation:
      'Le Kazakhstan est le plus vaste pays enclavé du monde, avec environ 2,7 millions de km². Il s’étend de la mer Caspienne, qui n’est pas un océan, jusqu’aux monts de l’Altaï.',
    source: { label: 'Wikipédia : Kazakhstan', url: 'https://fr.wikipedia.org/wiki/Kazakhstan' },
  },
  {
    id: 'geographie-059',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel est le plus petit pays d’Afrique par sa superficie ?',
    choices: ['Maurice', 'Les Seychelles', 'La Gambie', 'Les Comores'],
    answerIndex: 1,
    explanation:
      'Les Seychelles sont le plus petit pays d’Afrique par la superficie, avec environ 455 km². Cet archipel de l’océan Indien se situe au nord-est de Madagascar.',
    source: { label: 'Wikipédia : Seychelles', url: 'https://fr.wikipedia.org/wiki/Seychelles' },
  },
  {
    id: 'geographie-060',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : La Garonne se jette dans la mer Méditerranée.',
    answer: false,
    explanation:
      'La Garonne se jette dans l’océan Atlantique, par l’estuaire de la Gironde, après avoir traversé Toulouse et Bordeaux. Elle prend sa source dans les Pyrénées.',
    source: { label: 'Wikipédia : Garonne', url: 'https://fr.wikipedia.org/wiki/Garonne' },
  },
] as const satisfies readonly Question[];

export default questions;
