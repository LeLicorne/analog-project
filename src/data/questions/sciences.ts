import type { Question } from '../quiz.types';

export const questions = [
  {
    id: 'sciences-001',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'À quel type appartient le granite, une roche formée par le refroidissement lent d’un magma en profondeur ?',
    choices: ['Roche sédimentaire', 'Roche magmatique', 'Roche métamorphique', 'Roche organique'],
    answerIndex: 1,
    explanation:
      'Le granite est une roche magmatique plutonique : le magma refroidit lentement en profondeur et forme de gros cristaux de quartz, de feldspath et de mica.',
    source: { label: 'Wikipédia : Granite', url: 'https://fr.wikipedia.org/wiki/Granite' },
  },
  {
    id: 'sciences-002',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel instrument enregistre les ondes produites par les séismes ?',
    choices: ['Le baromètre', 'L’anémomètre', 'Le spectromètre', 'Le sismographe'],
    answerIndex: 3,
    explanation:
      'Le sismographe enregistre les vibrations du sol provoquées par les ondes sismiques. Il permet de déterminer la magnitude et la localisation d’un séisme.',
    source: { label: 'Wikipédia : Sismographe', url: 'https://fr.wikipedia.org/wiki/Sismographe' },
  },
  {
    id: 'sciences-003',
    type: 'true-false',
    difficulty: 'difficile',
    prompt:
      'Vrai ou faux : La température du canal d’un éclair est plus élevée que celle de la surface du Soleil.',
    answer: true,
    explanation:
      'L’air du canal d’un éclair atteint environ 30 000 °C, alors que la surface du Soleil est à environ 5 500 °C.',
    source: { label: 'Wikipédia : Foudre', url: 'https://fr.wikipedia.org/wiki/Foudre' },
  },
  {
    id: 'sciences-004',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle est l’unité de puissance dans le Système international ?',
    choices: ['Le joule', 'Le watt', 'Le newton', 'Le pascal'],
    answerIndex: 1,
    explanation:
      'Le watt (W) est l’unité de puissance : 1 watt correspond à 1 joule d’énergie transférée par seconde.',
    source: { label: 'Wikipédia : Watt', url: 'https://fr.wikipedia.org/wiki/Watt' },
  },
  {
    id: 'sciences-005',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le symbole chimique de l’or ?',
    choices: ['Ag', 'Or', 'Fe', 'Au'],
    answerIndex: 3,
    explanation:
      'Le symbole de l’or est Au, du latin aurum. Cet élément a pour numéro atomique 79.',
    source: { label: 'Wikipédia : Or', url: 'https://fr.wikipedia.org/wiki/Or' },
  },
  {
    id: 'sciences-006',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Contre quelle maladie Louis Pasteur a-t-il testé avec succès un vaccin sur un être humain en 1885 ?',
    choices: ['La rage', 'La variole', 'La tuberculose', 'Le choléra'],
    answerIndex: 0,
    explanation:
      'En juillet 1885, Louis Pasteur et son équipe ont administré un vaccin contre la rage au jeune Joseph Meister, mordu par un chien enragé. L’enfant a survécu.',
    source: {
      label: 'Wikipédia : Louis Pasteur',
      url: 'https://fr.wikipedia.org/wiki/Louis_Pasteur',
    },
  },
  {
    id: 'sciences-007',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel gaz à effet de serre est le principal rejeté par la combustion du charbon, du pétrole et du gaz ?',
    choices: ['Le dioxygène', 'Le dioxyde de carbone', 'L’argon', 'L’hélium'],
    answerIndex: 1,
    explanation:
      'La combustion des énergies fossiles rejette surtout du dioxyde de carbone (CO₂), dont l’accumulation dans l’atmosphère renforce l’effet de serre.',
    source: {
      label: 'Wikipédia : Dioxyde de carbone',
      url: 'https://fr.wikipedia.org/wiki/Dioxyde_de_carbone',
    },
  },
  {
    id: 'sciences-008',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'À quelle température l’eau pure entre-t-elle en ébullition sous la pression atmosphérique normale au niveau de la mer ?',
    choices: ['90 °C', '110 °C', '120 °C', '100 °C'],
    answerIndex: 3,
    explanation:
      'Sous la pression normale de 1 atmosphère, l’eau pure bout à 100 °C. Cette température diminue quand la pression baisse, par exemple en altitude.',
    source: {
      label: 'Wikipédia : Ébullition',
      url: 'https://fr.wikipedia.org/wiki/%C3%89bullition',
    },
  },
  {
    id: 'sciences-009',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Les baleines sont des mammifères.',
    answer: true,
    explanation:
      'Les baleines sont des mammifères marins : elles respirent de l’air par des poumons, sont à sang chaud et allaitent leurs petits.',
    source: { label: 'Wikipédia : Mammifère', url: 'https://fr.wikipedia.org/wiki/Mammif%C3%A8re' },
  },
  {
    id: 'sciences-010',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le plus grand organe du corps humain ?',
    choices: ['La peau', 'Le foie', 'Les poumons', 'L’intestin grêle'],
    answerIndex: 0,
    explanation:
      'La peau est le plus grand organe du corps humain : elle couvre une surface d’environ 2 m² chez l’adulte et protège contre les agressions extérieures.',
    source: { label: 'Wikipédia : Peau', url: 'https://fr.wikipedia.org/wiki/Peau' },
  },
  {
    id: 'sciences-011',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel physicien est l’auteur de la théorie de la relativité, publiée en 1905 puis en 1915 ?',
    choices: ['Albert Einstein', 'Niels Bohr', 'Max Planck', 'Stephen Hawking'],
    answerIndex: 0,
    explanation:
      'Albert Einstein a publié la relativité restreinte en 1905 puis la relativité générale en 1915, qui décrit la gravitation comme une courbure de l’espace-temps.',
    source: {
      label: 'Wikipédia : Albert Einstein',
      url: 'https://fr.wikipedia.org/wiki/Albert_Einstein',
    },
  },
  {
    id: 'sciences-012',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quels organes filtrent le sang pour produire l’urine ?',
    choices: ['Les reins', 'Le foie', 'La rate', 'Le pancréas'],
    answerIndex: 0,
    explanation:
      'Les reins filtrent le sang, éliminent les déchets et l’excès d’eau sous forme d’urine, et régulent l’équilibre des sels minéraux.',
    source: { label: 'Wikipédia : Rein', url: 'https://fr.wikipedia.org/wiki/Rein' },
  },
  {
    id: 'sciences-013',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel chimiste a publié en 1869 une classification périodique des éléments qui prédisait des éléments encore inconnus ?',
    choices: ['Dmitri Mendeleïev', 'Antoine Lavoisier', 'John Dalton', 'Linus Pauling'],
    answerIndex: 0,
    explanation:
      'Dmitri Mendeleïev a classé les éléments par masse atomique et propriétés en 1869, laissant des cases vides pour des éléments encore inconnus, découverts ensuite.',
    source: {
      label: 'Wikipédia : Dmitri Mendeleïev',
      url: 'https://fr.wikipedia.org/wiki/Dmitri_Mendele%C3%AFev',
    },
  },
  {
    id: 'sciences-014',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quels vaisseaux sanguins ramènent le sang vers le cœur ?',
    choices: ['Les artères', 'Les capillaires', 'Les veines', 'Les bronches'],
    answerIndex: 2,
    explanation:
      'Les veines ramènent le sang vers le cœur, tandis que les artères l’en éloignent. Les capillaires assurent les échanges avec les tissus.',
    source: { label: 'Wikipédia : Veine', url: 'https://fr.wikipedia.org/wiki/Veine' },
  },
  {
    id: 'sciences-015',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Les antibiotiques sont efficaces contre les infections virales comme la grippe.',
    answer: false,
    explanation:
      'Les antibiotiques agissent contre les bactéries et sont sans effet sur les virus. Leur usage inutile favorise l’apparition de bactéries résistantes.',
    source: {
      label: 'Wikipédia : Antibiotique',
      url: 'https://fr.wikipedia.org/wiki/Antibiotique',
    },
  },
  {
    id: 'sciences-016',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel physicien a découvert la radioactivité en 1896 ?',
    choices: ['Marie Curie', 'Ernest Rutherford', 'Wilhelm Röntgen', 'Henri Becquerel'],
    answerIndex: 3,
    explanation:
      'Henri Becquerel a découvert la radioactivité en 1896 en constatant que des sels d’uranium impressionnaient une plaque photographique sans exposition à la lumière.',
    source: {
      label: 'Wikipédia : Henri Becquerel',
      url: 'https://fr.wikipedia.org/wiki/Henri_Becquerel',
    },
  },
  {
    id: 'sciences-017',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel scientifique a proposé en 1912 la théorie de la dérive des continents ?',
    choices: ['Alfred Wegener', 'Charles Lyell', 'Harry Hess', 'Georges Cuvier'],
    answerIndex: 0,
    explanation:
      'Alfred Wegener a proposé en 1912 que les continents se déplacent. Sa théorie n’a été acceptée que dans les années 1960, avec la tectonique des plaques.',
    source: {
      label: 'Wikipédia : Alfred Wegener',
      url: 'https://fr.wikipedia.org/wiki/Alfred_Wegener',
    },
  },
  {
    id: 'sciences-018',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelles cellules du sang transportent le dioxygène grâce à l’hémoglobine ?',
    choices: ['Les globules rouges', 'Les globules blancs', 'Les plaquettes', 'Les lymphocytes'],
    answerIndex: 0,
    explanation:
      'Les globules rouges contiennent de l’hémoglobine, une protéine à base de fer qui fixe le dioxygène dans les poumons et le libère dans les tissus.',
    source: {
      label: 'Wikipédia : Globule rouge',
      url: 'https://fr.wikipedia.org/wiki/Globule_rouge',
    },
  },
  {
    id: 'sciences-019',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Le son peut se propager dans le vide.',
    answer: false,
    explanation:
      'Le son est une vibration mécanique qui a besoin d’un milieu matériel (air, eau, solide) pour se propager. Il ne se propage pas dans le vide, contrairement à la lumière.',
    source: {
      label: 'Wikipédia : Son (physique)',
      url: 'https://fr.wikipedia.org/wiki/Son_(physique)',
    },
  },
  {
    id: 'sciences-020',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est la planète du système solaire la plus proche du Soleil ?',
    choices: ['Vénus', 'Mercure', 'Mars', 'Terre'],
    answerIndex: 1,
    explanation:
      'Mercure est la planète la plus proche du Soleil, à une distance moyenne d’environ 58 millions de kilomètres.',
    source: {
      label: 'Wikipédia : Mercure (planète)',
      url: 'https://fr.wikipedia.org/wiki/Mercure_(plan%C3%A8te)',
    },
  },
  {
    id: 'sciences-021',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel métal est liquide à température ambiante ?',
    choices: ['Le plomb', 'Le mercure', 'Le zinc', 'L’étain'],
    answerIndex: 1,
    explanation:
      'Le mercure (Hg) fond à environ −39 °C : il est donc liquide à température ambiante, ce qui en fait un cas unique parmi les métaux courants.',
    source: {
      label: 'Wikipédia : Mercure (élément)',
      url: 'https://fr.wikipedia.org/wiki/Mercure_(%C3%A9l%C3%A9ment)',
    },
  },
  {
    id: 'sciences-022',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel savant de la Grèce antique est associé au principe selon lequel un corps plongé dans un fluide subit une poussée égale au poids du fluide déplacé ?',
    choices: ['Euclide', 'Archimède', 'Aristote', 'Ptolémée'],
    answerIndex: 1,
    explanation:
      'Archimède de Syracuse, au IIIe siècle av. J.-C., a établi que tout corps plongé dans un fluide reçoit une poussée verticale égale au poids du volume de fluide déplacé.',
    source: { label: 'Wikipédia : Archimède', url: 'https://fr.wikipedia.org/wiki/Archim%C3%A8de' },
  },
  {
    id: 'sciences-023',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le nombre 1 est un nombre premier.',
    answer: false,
    explanation:
      'Un nombre premier possède exactement deux diviseurs distincts, 1 et lui-même. Le nombre 1 n’en a qu’un seul, donc il n’est pas premier ; le plus petit nombre premier est 2.',
    source: {
      label: 'Wikipédia : Nombre premier',
      url: 'https://fr.wikipedia.org/wiki/Nombre_premier',
    },
  },
  {
    id: 'sciences-024',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle particule de l’atome porte une charge électrique négative ?',
    choices: ['L’électron', 'Le proton', 'Le neutron', 'Le noyau'],
    answerIndex: 0,
    explanation:
      'L’électron porte une charge négative, le proton une charge positive et le neutron est électriquement neutre.',
    source: { label: 'Wikipédia : Électron', url: 'https://fr.wikipedia.org/wiki/%C3%89lectron' },
  },
  {
    id: 'sciences-025',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel savant a découvert en 1610 les quatre plus grosses lunes de Jupiter avec une lunette astronomique ?',
    choices: ['Johannes Kepler', 'Galilée', 'Christiaan Huygens', 'Jean-Dominique Cassini'],
    answerIndex: 1,
    explanation:
      'Galilée a observé en janvier 1610 Io, Europe, Ganymède et Callisto autour de Jupiter. Ces lunes sont appelées satellites galiléens.',
    source: {
      label: 'Wikipédia : Galilée (savant)',
      url: 'https://fr.wikipedia.org/wiki/Galil%C3%A9e_(savant)',
    },
  },
  {
    id: 'sciences-026',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Le cœur humain est divisé en quatre cavités.',
    answer: true,
    explanation:
      'Le cœur humain comporte quatre cavités : deux oreillettes et deux ventricules. Le côté droit envoie le sang vers les poumons et le côté gauche vers le reste du corps.',
    source: { label: 'Wikipédia : Cœur', url: 'https://fr.wikipedia.org/wiki/C%C5%93ur' },
  },
  {
    id: 'sciences-027',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel naturaliste a proposé la théorie de l’évolution par sélection naturelle dans « De l’origine des espèces » ?',
    choices: ['Jean-Baptiste de Lamarck', 'Gregor Mendel', 'Louis Pasteur', 'Charles Darwin'],
    answerIndex: 3,
    explanation:
      'Charles Darwin a exposé en 1859 que les espèces évoluent par sélection naturelle : les individus les mieux adaptés à leur milieu se reproduisent davantage.',
    source: {
      label: 'Wikipédia : Charles Darwin',
      url: 'https://fr.wikipedia.org/wiki/Charles_Darwin',
    },
  },
  {
    id: 'sciences-028',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Le diamant et le graphite sont tous deux constitués uniquement d’atomes de carbone.',
    answer: true,
    explanation:
      'Le diamant et le graphite sont deux formes allotropiques du carbone. Seule la disposition des atomes diffère, ce qui explique leurs propriétés très différentes.',
    source: { label: 'Wikipédia : Carbone', url: 'https://fr.wikipedia.org/wiki/Carbone' },
  },
  {
    id: 'sciences-029',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel gaz est le plus abondant dans l’atmosphère terrestre ?',
    choices: ['Le dioxygène', 'Le dioxyde de carbone', 'Le diazote', 'L’argon'],
    answerIndex: 2,
    explanation:
      'L’atmosphère terrestre contient environ 78 % de diazote (N₂), contre environ 21 % de dioxygène.',
    source: {
      label: 'Wikipédia : Atmosphère terrestre',
      url: 'https://fr.wikipedia.org/wiki/Atmosph%C3%A8re_terrestre',
    },
  },
  {
    id: 'sciences-030',
    type: 'true-false',
    difficulty: 'difficile',
    prompt:
      'Vrai ou faux : Au sommet du mont Everest, l’eau pure bout à 100 °C comme au niveau de la mer.',
    answer: false,
    explanation:
      'Au sommet de l’Everest (8 849 m), la pression atmosphérique est environ trois fois plus faible qu’au niveau de la mer, donc l’eau bout vers 70 °C.',
    source: {
      label: 'Wikipédia : Pression atmosphérique',
      url: 'https://fr.wikipedia.org/wiki/Pression_atmosph%C3%A9rique',
    },
  },
  {
    id: 'sciences-031',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est la plus grande planète du système solaire ?',
    choices: ['Jupiter', 'Saturne', 'Neptune', 'Uranus'],
    answerIndex: 0,
    explanation:
      'Jupiter est la plus grande planète du système solaire : sa masse dépasse deux fois celle de toutes les autres planètes réunies.',
    source: {
      label: 'Wikipédia : Jupiter (planète)',
      url: 'https://fr.wikipedia.org/wiki/Jupiter_(plan%C3%A8te)',
    },
  },
  {
    id: 'sciences-032',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Dans quelle couche de l’atmosphère se trouve principalement la couche d’ozone ?',
    choices: ['La troposphère', 'La mésosphère', 'La stratosphère', 'La thermosphère'],
    answerIndex: 2,
    explanation:
      'La couche d’ozone se trouve surtout dans la stratosphère, entre environ 15 et 35 km d’altitude. Elle absorbe une grande partie des rayons ultraviolets du Soleil.',
    source: {
      label: 'Wikipédia : Stratosphère',
      url: 'https://fr.wikipedia.org/wiki/Stratosph%C3%A8re',
    },
  },
  {
    id: 'sciences-033',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel scientifique a découvert la pénicilline en 1928 ?',
    choices: ['Louis Pasteur', 'Robert Koch', 'Marie Curie', 'Alexander Fleming'],
    answerIndex: 3,
    explanation:
      'Alexander Fleming a remarqué en 1928 qu’une moisissure du genre Penicillium détruisait des bactéries, ce qui a conduit au premier antibiotique.',
    source: {
      label: 'Wikipédia : Alexander Fleming',
      url: 'https://fr.wikipedia.org/wiki/Alexander_Fleming',
    },
  },
  {
    id: 'sciences-034',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Les araignées sont des insectes.',
    answer: false,
    explanation:
      'Les araignées sont des arachnides : elles ont huit pattes et deux parties du corps, alors que les insectes ont six pattes et trois parties du corps.',
    source: { label: 'Wikipédia : Araignée', url: 'https://fr.wikipedia.org/wiki/Araign%C3%A9e' },
  },
  {
    id: 'sciences-035',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle est la cause principale des saisons sur Terre ?',
    choices: [
      'La variation de la distance Terre-Soleil',
      'L’inclinaison de l’axe de rotation de la Terre',
      'Les variations d’activité du Soleil',
      'Les phases de la Lune',
    ],
    answerIndex: 1,
    explanation:
      'Les saisons résultent de l’inclinaison de l’axe terrestre, d’environ 23,4°, qui modifie l’éclairement reçu selon l’hémisphère. La Terre est d’ailleurs au plus près du Soleil début janvier.',
    source: { label: 'Wikipédia : Saison', url: 'https://fr.wikipedia.org/wiki/Saison' },
  },
  {
    id: 'sciences-036',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel physicien français a mis en évidence la rotation de la Terre avec un pendule en 1851 ?',
    choices: [
      'Christiaan Huygens',
      'Gaspard-Gustave Coriolis',
      'Léon Foucault',
      'André-Marie Ampère',
    ],
    answerIndex: 2,
    explanation:
      'Léon Foucault a suspendu un long pendule sous la coupole du Panthéon en 1851. Son plan d’oscillation tourne lentement par rapport au sol, car la Terre tourne sur elle-même.',
    source: {
      label: 'Wikipédia : Pendule de Foucault',
      url: 'https://fr.wikipedia.org/wiki/Pendule_de_Foucault',
    },
  },
  {
    id: 'sciences-037',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Les marées océaniques sont dues principalement à l’attraction du Soleil.',
    answer: false,
    explanation:
      'Les marées sont dues principalement à l’attraction de la Lune, plus proche de la Terre. Son effet est environ deux fois plus fort que celui du Soleil.',
    source: { label: 'Wikipédia : Marée', url: 'https://fr.wikipedia.org/wiki/Mar%C3%A9e' },
  },
  {
    id: 'sciences-038',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est approximativement la vitesse de la lumière dans le vide ?',
    choices: ['30 000 km/s', '150 000 km/s', '300 000 km/s', '3 000 000 km/s'],
    answerIndex: 2,
    explanation:
      'La lumière se propage dans le vide à 299 792 km/s, soit environ 300 000 km/s. Aucune information ne peut aller plus vite.',
    source: {
      label: 'Wikipédia : Vitesse de la lumière',
      url: 'https://fr.wikipedia.org/wiki/Vitesse_de_la_lumi%C3%A8re',
    },
  },
  {
    id: 'sciences-039',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel est l’ordre de grandeur du nombre d’entités (atomes ou molécules) contenues dans une mole ?',
    choices: ['6,02 × 10¹³', '6,02 × 10³³', '6,02 × 10²³', '3,00 × 10⁸'],
    answerIndex: 2,
    explanation:
      'Une mole contient par définition environ 6,02 × 10²³ entités, valeur appelée constante d’Avogadro. Une mole d’eau pèse environ 18 grammes.',
    source: {
      label: 'Wikipédia : Mole (unité)',
      url: 'https://fr.wikipedia.org/wiki/Mole_(unit%C3%A9)',
    },
  },
  {
    id: 'sciences-040',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle molécule porte l’information génétique de la plupart des êtres vivants ?',
    choices: ['L’ARN messager', 'L’ATP', 'L’ADN', 'L’hémoglobine'],
    answerIndex: 2,
    explanation:
      'L’ADN (acide désoxyribonucléique) est le support de l’information génétique de tous les organismes cellulaires et de nombreux virus ; sa séquence de bases code les protéines.',
    source: {
      label: 'Wikipédia : Acide désoxyribonucléique',
      url: 'https://fr.wikipedia.org/wiki/Acide_d%C3%A9soxyribonucl%C3%A9ique',
    },
  },
  {
    id: 'sciences-041',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est la racine carrée de 144 ?',
    choices: ['11', '14', '12', '72'],
    answerIndex: 2,
    explanation: 'Le nombre 12 est la racine carrée de 144, car 12 × 12 = 144.',
    source: {
      label: 'Wikipédia : Racine carrée',
      url: 'https://fr.wikipedia.org/wiki/Racine_carr%C3%A9e',
    },
  },
  {
    id: 'sciences-042',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle est la formule chimique du sel de table ?',
    choices: ['NaCl', 'KCl', 'CaCO₃', 'NaOH'],
    answerIndex: 0,
    explanation:
      'Le sel de table est du chlorure de sodium, de formule NaCl : un cristal d’ions sodium Na⁺ et chlorure Cl⁻.',
    source: {
      label: 'Wikipédia : Chlorure de sodium',
      url: 'https://fr.wikipedia.org/wiki/Chlorure_de_sodium',
    },
  },
  {
    id: 'sciences-043',
    type: 'true-false',
    difficulty: 'difficile',
    prompt:
      'Vrai ou faux : Sur Vénus, une rotation complète de la planète sur elle-même dure plus longtemps qu’un tour autour du Soleil.',
    answer: true,
    explanation:
      'Vénus tourne sur elle-même en environ 243 jours terrestres, mais fait le tour du Soleil en environ 225 jours : son jour sidéral est donc plus long que son année.',
    source: {
      label: 'Wikipédia : Vénus (planète)',
      url: 'https://fr.wikipedia.org/wiki/V%C3%A9nus_(plan%C3%A8te)',
    },
  },
  {
    id: 'sciences-044',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le méthane est un gaz à effet de serre.',
    answer: true,
    explanation:
      'Le méthane (CH₄) est un gaz à effet de serre bien plus puissant que le dioxyde de carbone à quantité égale, mais il reste moins longtemps dans l’atmosphère.',
    source: { label: 'Wikipédia : Méthane', url: 'https://fr.wikipedia.org/wiki/M%C3%A9thane' },
  },
  {
    id: 'sciences-045',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel organite de la cellule produit l’essentiel de l’ATP par respiration cellulaire ?',
    choices: ['Le noyau', 'Le ribosome', 'Le lysosome', 'La mitochondrie'],
    answerIndex: 3,
    explanation:
      'Les mitochondries produisent l’essentiel de l’ATP, la molécule qui fournit l’énergie aux cellules, grâce à la respiration cellulaire qui consomme du dioxygène.',
    source: {
      label: 'Wikipédia : Mitochondrie',
      url: 'https://fr.wikipedia.org/wiki/Mitochondrie',
    },
  },
  {
    id: 'sciences-046',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel est l’élément chimique le plus abondant de l’Univers ?',
    choices: ['L’hélium', 'L’oxygène', 'Le carbone', 'L’hydrogène'],
    answerIndex: 3,
    explanation:
      'L’hydrogène représente environ les trois quarts de la masse de la matière ordinaire de l’Univers, devant l’hélium.',
    source: { label: 'Wikipédia : Hydrogène', url: 'https://fr.wikipedia.org/wiki/Hydrog%C3%A8ne' },
  },
  {
    id: 'sciences-047',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel est le numéro atomique de l’oxygène ?',
    choices: ['6', '8', '7', '16'],
    answerIndex: 1,
    explanation:
      'L’oxygène a pour numéro atomique 8 : ses atomes possèdent 8 protons dans leur noyau.',
    source: { label: 'Wikipédia : Oxygène', url: 'https://fr.wikipedia.org/wiki/Oxyg%C3%A8ne' },
  },
  {
    id: 'sciences-048',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Dans quelles disciplines Marie Curie a-t-elle reçu ses deux prix Nobel ?',
    choices: ['Chimie et médecine', 'Physique et chimie', 'Physique et médecine', 'Chimie et paix'],
    answerIndex: 1,
    explanation:
      'Marie Curie a reçu le prix Nobel de physique en 1903 puis celui de chimie en 1911, ce qui fait d’elle la première personne récompensée dans deux disciplines scientifiques.',
    source: { label: 'Wikipédia : Marie Curie', url: 'https://fr.wikipedia.org/wiki/Marie_Curie' },
  },
  {
    id: 'sciences-049',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel organe produit l’insuline, hormone qui régule la glycémie ?',
    choices: ['Le foie', 'Les reins', 'Le pancréas', 'La thyroïde'],
    answerIndex: 2,
    explanation:
      'L’insuline est produite par les cellules bêta des îlots de Langerhans du pancréas. Elle favorise l’entrée du glucose dans les cellules et fait baisser la glycémie.',
    source: { label: 'Wikipédia : Pancréas', url: 'https://fr.wikipedia.org/wiki/Pancr%C3%A9as' },
  },
  {
    id: 'sciences-050',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Comment nomme-t-on la limite d’un trou noir au-delà de laquelle même la lumière ne peut plus s’échapper ?',
    choices: [
      'La singularité gravitationnelle',
      'La limite de Roche',
      'Le disque d’accrétion',
      'L’horizon des événements',
    ],
    answerIndex: 3,
    explanation:
      'L’horizon des événements est la frontière d’un trou noir : à l’intérieur, la vitesse de libération dépasse celle de la lumière, donc rien ne peut en sortir.',
    source: { label: 'Wikipédia : Trou noir', url: 'https://fr.wikipedia.org/wiki/Trou_noir' },
  },
  {
    id: 'sciences-051',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle est approximativement la vitesse du son dans l’air à 20 °C ?',
    choices: ['34 m/s', '3 400 m/s', '340 m/s', '34 000 m/s'],
    answerIndex: 2,
    explanation:
      'Dans l’air à 20 °C, le son se propage à environ 343 m/s, soit près de 1 235 km/h. Il va plus vite dans l’eau et dans les solides.',
    source: {
      label: 'Wikipédia : Vitesse du son',
      url: 'https://fr.wikipedia.org/wiki/Vitesse_du_son',
    },
  },
  {
    id: 'sciences-052',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Dans quelle galaxie se trouve le système solaire ?',
    choices: ['La Voie lactée', 'Andromède', 'Le Grand Nuage de Magellan', 'Le Triangle'],
    answerIndex: 0,
    explanation:
      'Le Soleil appartient à la Voie lactée, une galaxie spirale barrée. Il se situe à environ 26 000 années-lumière de son centre.',
    source: {
      label: 'Wikipédia : Voie lactée',
      url: 'https://fr.wikipedia.org/wiki/Voie_lact%C3%A9e',
    },
  },
  {
    id: 'sciences-053',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel physicien a découvert l’électron en 1897 en étudiant les rayons cathodiques ?',
    choices: ['Ernest Rutherford', 'Niels Bohr', 'James Chadwick', 'Joseph John Thomson'],
    answerIndex: 3,
    explanation:
      'J. J. Thomson a montré en 1897 que les rayons cathodiques sont formés de particules chargées négativement, bien plus légères que les atomes : les électrons.',
    source: {
      label: 'Wikipédia : Joseph John Thomson',
      url: 'https://fr.wikipedia.org/wiki/Joseph_John_Thomson',
    },
  },
  {
    id: 'sciences-054',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Combien d’os compte le squelette d’un être humain adulte ?',
    choices: ['186', '226', '256', '206'],
    answerIndex: 3,
    explanation:
      'Le squelette d’un adulte compte 206 os. Un nouveau-né en possède davantage, car plusieurs os se soudent au cours de la croissance.',
    source: {
      label: 'Wikipédia : Squelette humain',
      url: 'https://fr.wikipedia.org/wiki/Squelette_humain',
    },
  },
  {
    id: 'sciences-055',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Comment appelle-t-on la particule élémentaire associée à la lumière ?',
    choices: ['Le photon', 'L’électron', 'Le neutrino', 'Le gluon'],
    answerIndex: 0,
    explanation:
      'Le photon est le quantum de l’interaction électromagnétique, donc de la lumière. Il n’a pas de masse et se déplace à la vitesse de la lumière dans le vide.',
    source: { label: 'Wikipédia : Photon', url: 'https://fr.wikipedia.org/wiki/Photon' },
  },
  {
    id: 'sciences-056',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Comment s’appelle le processus par lequel les plantes vertes fabriquent des sucres à partir de la lumière, de l’eau et du dioxyde de carbone ?',
    choices: [
      'La respiration cellulaire',
      'La fermentation',
      'La photosynthèse',
      'La transpiration',
    ],
    answerIndex: 2,
    explanation:
      'La photosynthèse utilise l’énergie lumineuse pour transformer l’eau et le dioxyde de carbone en glucose, en libérant du dioxygène.',
    source: {
      label: 'Wikipédia : Photosynthèse',
      url: 'https://fr.wikipedia.org/wiki/Photosynth%C3%A8se',
    },
  },
  {
    id: 'sciences-057',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel astronome a établi que les planètes décrivent des orbites elliptiques dont le Soleil occupe un foyer ?',
    choices: ['Nicolas Copernic', 'Johannes Kepler', 'Tycho Brahe', 'Ptolémée'],
    answerIndex: 1,
    explanation:
      'Johannes Kepler a énoncé en 1609 que les planètes suivent des ellipses dont le Soleil occupe l’un des foyers. C’est la première de ses trois lois.',
    source: {
      label: 'Wikipédia : Johannes Kepler',
      url: 'https://fr.wikipedia.org/wiki/Johannes_Kepler',
    },
  },
  {
    id: 'sciences-058',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Combien de chromosomes comptent les cellules humaines non sexuelles ?',
    choices: ['23', '46', '44', '48'],
    answerIndex: 1,
    explanation:
      'Les cellules somatiques humaines contiennent 46 chromosomes, soit 23 paires dont une paire de chromosomes sexuels.',
    source: { label: 'Wikipédia : Chromosome', url: 'https://fr.wikipedia.org/wiki/Chromosome' },
  },
  {
    id: 'sciences-059',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel scientifique a formulé la loi de la gravitation universelle, publiée en 1687 ?',
    choices: ['Galilée', 'Johannes Kepler', 'Albert Einstein', 'Isaac Newton'],
    answerIndex: 3,
    explanation:
      'Isaac Newton a énoncé la loi de la gravitation universelle dans ses Principia en 1687 : deux masses s’attirent avec une force proportionnelle au produit de leurs masses.',
    source: {
      label: 'Wikipédia : Isaac Newton',
      url: 'https://fr.wikipedia.org/wiki/Isaac_Newton',
    },
  },
  {
    id: 'sciences-060',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel est le pH de l’eau pure à 25 °C ?',
    choices: ['0', '5', '7', '14'],
    answerIndex: 2,
    explanation:
      'À 25 °C, l’eau pure est neutre et son pH vaut 7. Une solution est acide en dessous de 7 et basique au-dessus.',
    source: {
      label: 'Wikipédia : Potentiel hydrogène',
      url: 'https://fr.wikipedia.org/wiki/Potentiel_hydrog%C3%A8ne',
    },
  },
] as const satisfies readonly Question[];

export default questions;
