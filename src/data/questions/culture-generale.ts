import type { Question } from '../quiz.types';

export const questions = [
  {
    id: 'culture-generale-001',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Qui a peint la célèbre série des Tournesols, réalisée à Arles en 1888 ?',
    choices: ['Claude Monet', 'Paul Cézanne', 'Vincent van Gogh', 'Paul Gauguin'],
    answerIndex: 2,
    explanation:
      'Les Tournesols sont l’œuvre du peintre néerlandais Vincent van Gogh, qui en a réalisé plusieurs versions à Arles en 1888 et 1889. Ils décorent la chambre qu’il préparait pour Paul Gauguin.',
    source: {
      label: 'Wikipédia : Vincent van Gogh',
      url: 'https://fr.wikipedia.org/wiki/Vincent_van_Gogh',
    },
  },
  {
    id: 'culture-generale-002',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Qui est l’auteur du roman Les Misérables, publié en 1862 ?',
    choices: ['Victor Hugo', 'Émile Zola', 'Alexandre Dumas', 'Honoré de Balzac'],
    answerIndex: 0,
    explanation:
      'Les Misérables est un roman de Victor Hugo, publié en 1862 alors que l’écrivain vivait en exil à Guernesey. Il suit notamment le destin de Jean Valjean.',
    source: {
      label: 'Wikipédia : Les Misérables',
      url: 'https://fr.wikipedia.org/wiki/Les_Mis%C3%A9rables',
    },
  },
  {
    id: 'culture-generale-003',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Dans la mythologie grecque, quel dieu règne sur la mer ?',
    choices: ['Zeus', 'Poséidon', 'Hadès', 'Apollon'],
    answerIndex: 1,
    explanation:
      'Poséidon est le dieu grec de la mer, frère de Zeus et d’Hadès. Il est généralement représenté avec un trident.',
    source: { label: 'Wikipédia : Poséidon', url: 'https://fr.wikipedia.org/wiki/Pos%C3%A9idon' },
  },
  {
    id: 'culture-generale-004',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Wolfgang Amadeus Mozart est né à Salzbourg.',
    answer: true,
    explanation:
      'Mozart est né le 27 janvier 1756 à Salzbourg et est mort à Vienne le 5 décembre 1791. Il a composé plus de 600 œuvres.',
    source: {
      label: 'Wikipédia : Wolfgang Amadeus Mozart',
      url: 'https://fr.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart',
    },
  },
  {
    id: 'culture-generale-005',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Combien de joueurs une équipe de football aligne-t-elle sur le terrain pendant un match, gardien de but compris ?',
    choices: ['9', '10', '12', '11'],
    answerIndex: 3,
    explanation:
      'Une équipe de football compte onze joueurs sur le terrain, gardien de but compris, selon les lois du jeu. Les règles modernes ont été fixées à Londres en 1863.',
    source: { label: 'Wikipédia : Football', url: 'https://fr.wikipedia.org/wiki/Football' },
  },
  {
    id: 'culture-generale-006',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Dans quelle ville se déroule chaque année le festival de cinéma qui décerne la Palme d’or ?',
    choices: ['Deauville', 'Cannes', 'Venise', 'Berlin'],
    answerIndex: 1,
    explanation:
      'La Palme d’or est la récompense suprême du Festival de Cannes, qui se tient chaque année sur la Côte d’Azur. Le festival a été créé en 1946.',
    source: {
      label: 'Wikipédia : Festival de Cannes',
      url: 'https://fr.wikipedia.org/wiki/Festival_de_Cannes',
    },
  },
  {
    id: 'culture-generale-007',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Qui a présenté en 1895 le premier film projeté devant un public payant à Paris avec le Cinématographe ?',
    choices: ['Georges Méliès', 'Charles Pathé', 'Thomas Edison', 'Les frères Lumière'],
    answerIndex: 3,
    explanation:
      'Auguste et Louis Lumière ont organisé la première projection publique payante du Cinématographe le 28 décembre 1895, au Salon indien du Grand Café à Paris.',
    source: {
      label: 'Wikipédia : Frères Lumière',
      url: 'https://fr.wikipedia.org/wiki/Fr%C3%A8res_Lumi%C3%A8re',
    },
  },
  {
    id: 'culture-generale-008',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle grande ville portuaire du sud de la France est célèbre pour sa bouillabaisse ?',
    choices: ['Marseille', 'Bordeaux', 'Lyon', 'Strasbourg'],
    answerIndex: 0,
    explanation:
      'La bouillabaisse est une soupe de poissons de roche traditionnelle de Marseille. Elle est servie avec une rouille et des croûtons.',
    source: {
      label: 'Wikipédia : Bouillabaisse',
      url: 'https://fr.wikipedia.org/wiki/Bouillabaisse',
    },
  },
  {
    id: 'culture-generale-009',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : La Joconde de Léonard de Vinci est exposée au musée d’Orsay, à Paris.',
    answer: false,
    explanation:
      'La Joconde est exposée au musée du Louvre, à Paris, et non au musée d’Orsay. Léonard de Vinci l’a peinte au début du XVIe siècle.',
    source: { label: 'Wikipédia : La Joconde', url: 'https://fr.wikipedia.org/wiki/La_Joconde' },
  },
  {
    id: 'culture-generale-010',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Combien de lettres compte l’alphabet français ?',
    choices: ['24', '25', '26', '28'],
    answerIndex: 2,
    explanation:
      'L’alphabet français compte 26 lettres, dont 6 voyelles (a, e, i, o, u, y). Il est issu de l’alphabet latin.',
    source: {
      label: 'Wikipédia : Alphabet français',
      url: 'https://fr.wikipedia.org/wiki/Alphabet_fran%C3%A7ais',
    },
  },
  {
    id: 'culture-generale-011',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Combien de cordes possède une guitare classique ?',
    choices: ['4', '5', '8', '6'],
    answerIndex: 3,
    explanation:
      'La guitare classique possède six cordes, accordées en mi, la, ré, sol, si, mi. Elle se joue avec les doigts.',
    source: { label: 'Wikipédia : Guitare', url: 'https://fr.wikipedia.org/wiki/Guitare' },
  },
  {
    id: 'culture-generale-012',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Combien de joueurs d’une même équipe sont sur le terrain au basket-ball ?',
    choices: ['4', '5', '6', '7'],
    answerIndex: 1,
    explanation:
      'Une équipe de basket-ball aligne cinq joueurs sur le terrain. Le sport a été inventé en 1891 par James Naismith, aux États-Unis.',
    source: { label: 'Wikipédia : Basket-ball', url: 'https://fr.wikipedia.org/wiki/Basket-ball' },
  },
  {
    id: 'culture-generale-013',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Le camembert est un fromage originaire de Normandie.',
    answer: true,
    explanation:
      'Le camembert est un fromage au lait de vache originaire de Normandie, du nom du village de Camembert dans l’Orne. Il est traditionnellement associé à Marie Harel, vers 1791.',
    source: {
      label: 'Wikipédia : Camembert (fromage)',
      url: 'https://fr.wikipedia.org/wiki/Camembert_(fromage)',
    },
  },
  {
    id: 'culture-generale-014',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Combien de cases compte un échiquier ?',
    choices: ['64', '48', '72', '81'],
    answerIndex: 0,
    explanation:
      'Un échiquier compte 64 cases, soit 8 colonnes sur 8 rangées, alternativement claires et foncées. Chaque joueur débute avec 16 pièces.',
    source: { label: 'Wikipédia : Échecs', url: 'https://fr.wikipedia.org/wiki/%C3%89checs' },
  },
  {
    id: 'culture-generale-015',
    type: 'single',
    difficulty: 'facile',
    prompt: 'De quel pays le dessert tiramisu est-il originaire ?',
    choices: ['France', 'Espagne', 'Italie', 'Grèce'],
    answerIndex: 2,
    explanation:
      'Le tiramisu est un dessert italien à base de mascarpone, de biscuits imbibés de café et de cacao. Il est originaire du nord-est de l’Italie, en Vénétie ou au Frioul.',
    source: { label: 'Wikipédia : Tiramisu', url: 'https://fr.wikipedia.org/wiki/Tiramisu' },
  },
  {
    id: 'culture-generale-016',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Parmi ces mots, lequel est un palindrome, c’est-à-dire se lit de la même façon dans les deux sens ?',
    choices: ['route', 'robot', 'radar', 'rival'],
    answerIndex: 2,
    explanation:
      '« Radar » est un palindrome : il se lit identiquement de gauche à droite et de droite à gauche. « Ressasser » et « kayak » en sont d’autres exemples.',
    source: { label: 'Wikipédia : Palindrome', url: 'https://fr.wikipedia.org/wiki/Palindrome' },
  },
  {
    id: 'culture-generale-017',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel groupe britannique a enregistré en 1975 le titre Bohemian Rhapsody ?',
    choices: ['Queen', 'The Rolling Stones', 'Pink Floyd', 'Led Zeppelin'],
    answerIndex: 0,
    explanation:
      'Bohemian Rhapsody a été enregistrée en 1975 par le groupe britannique Queen, dont le chanteur était Freddie Mercury. Elle figure sur l’album A Night at the Opera.',
    source: {
      label: 'Wikipédia : Bohemian Rhapsody',
      url: 'https://fr.wikipedia.org/wiki/Bohemian_Rhapsody',
    },
  },
  {
    id: 'culture-generale-018',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Dans la mythologie grecque, Athéna est la déesse de l’amour.',
    answer: false,
    explanation:
      'Athéna est la déesse de la sagesse, de la stratégie guerrière et des arts, et la protectrice d’Athènes. La déesse grecque de l’amour est Aphrodite.',
    source: { label: 'Wikipédia : Athéna', url: 'https://fr.wikipedia.org/wiki/Ath%C3%A9na' },
  },
  {
    id: 'culture-generale-019',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle plante fournit les fèves à partir desquelles on fabrique le chocolat ?',
    choices: ['Le caféier', 'Le vanillier', 'Le théier', 'Le cacaoyer'],
    answerIndex: 3,
    explanation:
      'Le chocolat est fabriqué à partir des fèves du cacaoyer, un arbre tropical originaire d’Amérique. Les Aztèques et les Mayas consommaient déjà du cacao avant l’arrivée des Européens.',
    source: { label: 'Wikipédia : Chocolat', url: 'https://fr.wikipedia.org/wiki/Chocolat' },
  },
  {
    id: 'culture-generale-020',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel est le nom romain du dieu grec Zeus, roi des dieux ?',
    choices: ['Mars', 'Jupiter', 'Neptune', 'Vulcain'],
    answerIndex: 1,
    explanation:
      'Jupiter est le dieu romain qui correspond au Zeus des Grecs, maître du ciel et de la foudre. Son épouse est Junon, équivalent d’Héra.',
    source: {
      label: 'Wikipédia : Jupiter (mythologie)',
      url: 'https://fr.wikipedia.org/wiki/Jupiter_(mythologie)',
    },
  },
  {
    id: 'culture-generale-021',
    type: 'single',
    difficulty: 'facile',
    prompt: 'De quelle ville anglaise le groupe The Beatles est-il originaire ?',
    choices: ['Manchester', 'Liverpool', 'Londres', 'Glasgow'],
    answerIndex: 1,
    explanation:
      'The Beatles a été formé à Liverpool en 1960, avec John Lennon, Paul McCartney, George Harrison et Ringo Starr. Le groupe s’est séparé en 1970.',
    source: { label: 'Wikipédia : The Beatles', url: 'https://fr.wikipedia.org/wiki/The_Beatles' },
  },
  {
    id: 'culture-generale-022',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Don Quichotte a été écrit par Miguel de Cervantes.',
    answer: true,
    explanation:
      'Don Quichotte est un roman de l’écrivain espagnol Miguel de Cervantes, dont la première partie est parue en 1605 et la seconde en 1615.',
    source: {
      label: 'Wikipédia : Don Quichotte',
      url: 'https://fr.wikipedia.org/wiki/Don_Quichotte',
    },
  },
  {
    id: 'culture-generale-023',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel sculpteur français a conçu la Statue de la Liberté, offerte par la France aux États-Unis ?',
    choices: ['Auguste Rodin', 'Camille Claudel', 'Gustave Eiffel', 'Frédéric Auguste Bartholdi'],
    answerIndex: 3,
    explanation:
      'La Statue de la Liberté a été conçue par le sculpteur Frédéric Auguste Bartholdi et inaugurée à New York le 28 octobre 1886. Gustave Eiffel a conçu sa structure interne.',
    source: {
      label: 'Wikipédia : Statue de la Liberté',
      url: 'https://fr.wikipedia.org/wiki/Statue_de_la_Libert%C3%A9',
    },
  },
  {
    id: 'culture-generale-024',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel réalisateur a tourné le film d’horreur Les Oiseaux, sorti en 1963 ?',
    choices: ['Orson Welles', 'Stanley Kubrick', 'Alfred Hitchcock', 'Billy Wilder'],
    answerIndex: 2,
    explanation:
      'Les Oiseaux est un film d’Alfred Hitchcock sorti en 1963, adapté d’une nouvelle de Daphne du Maurier. Le réalisateur britannique est aussi l’auteur de Psychose (1960).',
    source: {
      label: 'Wikipédia : Alfred Hitchcock',
      url: 'https://fr.wikipedia.org/wiki/Alfred_Hitchcock',
    },
  },
  {
    id: 'culture-generale-025',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Qui est l’auteur du conte Le Petit Prince, publié en 1943 ?',
    choices: ['Antoine de Saint-Exupéry', 'Jules Verne', 'Romain Gary', 'Jean Giono'],
    answerIndex: 0,
    explanation:
      'Le Petit Prince est un conte d’Antoine de Saint-Exupéry, publié en 1943 à New York, d’abord en anglais et en français. L’auteur a lui-même illustré l’ouvrage.',
    source: {
      label: 'Wikipédia : Le Petit Prince',
      url: 'https://fr.wikipedia.org/wiki/Le_Petit_Prince',
    },
  },
  {
    id: 'culture-generale-026',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Qui a écrit la comédie L’Avare, créée en 1668 ?',
    choices: ['Molière', 'Jean Racine', 'Pierre Corneille', 'Jean de La Fontaine'],
    answerIndex: 0,
    explanation:
      'L’Avare est une comédie de Molière, représentée pour la première fois en 1668 au théâtre du Palais-Royal à Paris. Le personnage principal est Harpagon.',
    source: { label: 'Wikipédia : Molière', url: 'https://fr.wikipedia.org/wiki/Moli%C3%A8re' },
  },
  {
    id: 'culture-generale-027',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le roman Madame Bovary a été écrit par Émile Zola.',
    answer: false,
    explanation:
      'Madame Bovary est un roman de Gustave Flaubert, publié en 1857. Émile Zola est l’auteur du cycle des Rougon-Macquart.',
    source: {
      label: 'Wikipédia : Gustave Flaubert',
      url: 'https://fr.wikipedia.org/wiki/Gustave_Flaubert',
    },
  },
  {
    id: 'culture-generale-028',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel acteur et réalisateur a créé le personnage de Charlot, vagabond à moustache, chapeau melon et canne ?',
    choices: ['Buster Keaton', 'Stan Laurel', 'Charlie Chaplin', 'Harold Lloyd'],
    answerIndex: 2,
    explanation:
      'Charlot est le personnage créé par l’acteur et réalisateur britannique Charlie Chaplin, apparu à l’écran en 1914. Il est le héros de films comme Le Kid (1921) et Les Temps modernes (1936).',
    source: {
      label: 'Wikipédia : Charlie Chaplin',
      url: 'https://fr.wikipedia.org/wiki/Charlie_Chaplin',
    },
  },
  {
    id: 'culture-generale-029',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel compositeur a écrit la Neuvième Symphonie, dont le finale reprend l’Ode à la joie ?',
    choices: ['Johannes Brahms', 'Ludwig van Beethoven', 'Joseph Haydn', 'Franz Schubert'],
    answerIndex: 1,
    explanation:
      'La Neuvième Symphonie, achevée en 1824, est l’œuvre de Ludwig van Beethoven. Son finale choral met en musique l’Ode à la joie de Friedrich von Schiller.',
    source: {
      label: 'Wikipédia : Ludwig van Beethoven',
      url: 'https://fr.wikipedia.org/wiki/Ludwig_van_Beethoven',
    },
  },
  {
    id: 'culture-generale-030',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel compositeur français a écrit le Boléro, créé en 1928 ?',
    choices: ['Claude Debussy', 'Erik Satie', 'Georges Bizet', 'Maurice Ravel'],
    answerIndex: 3,
    explanation:
      'Le Boléro est une œuvre de Maurice Ravel, créée à l’Opéra de Paris en 1928 comme musique de ballet. Elle repose sur un thème répété avec un crescendo continu.',
    source: {
      label: 'Wikipédia : Maurice Ravel',
      url: 'https://fr.wikipedia.org/wiki/Maurice_Ravel',
    },
  },
  {
    id: 'culture-generale-031',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Un piano standard compte 88 touches.',
    answer: true,
    explanation:
      'Un piano standard compte 88 touches, soit 52 blanches et 36 noires. Elles couvrent un peu plus de sept octaves.',
    source: { label: 'Wikipédia : Piano', url: 'https://fr.wikipedia.org/wiki/Piano' },
  },
  {
    id: 'culture-generale-032',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle équipe l’équipe de France de football a-t-elle battue 3 à 0 en finale de la Coupe du monde 1998 ?',
    choices: ['Italie', 'Allemagne', 'Pays-Bas', 'Brésil'],
    answerIndex: 3,
    explanation:
      'En finale de la Coupe du monde 1998, la France a battu le Brésil 3 buts à 0 au Stade de France, à Saint-Denis, le 12 juillet 1998. Zinédine Zidane a marqué deux buts.',
    source: {
      label: 'Wikipédia : Coupe du monde de football de 1998',
      url: 'https://fr.wikipedia.org/wiki/Coupe_du_monde_de_football_de_1998',
    },
  },
  {
    id: 'culture-generale-033',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Dans quelle ville se sont déroulés les premiers Jeux olympiques de l’ère moderne, en 1896 ?',
    choices: ['Paris', 'Athènes', 'Londres', 'Rome'],
    answerIndex: 1,
    explanation:
      'Les premiers Jeux olympiques modernes ont eu lieu à Athènes en 1896, à l’initiative du baron Pierre de Coubertin. Quatorze nations y ont participé.',
    source: {
      label: 'Wikipédia : Jeux olympiques d’été de 1896',
      url: 'https://fr.wikipedia.org/wiki/Jeux_olympiques_d%27%C3%A9t%C3%A9_de_1896',
    },
  },
  {
    id: 'culture-generale-034',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Qui a fondé l’Académie française en 1635 ?',
    choices: ['Richelieu', 'Louis XIV', 'Mazarin', 'Colbert'],
    answerIndex: 0,
    explanation:
      'L’Académie française a été fondée en 1635 par le cardinal de Richelieu, sous le règne de Louis XIII. Elle est chargée de veiller sur la langue française et publie un dictionnaire.',
    source: {
      label: 'Wikipédia : Académie française',
      url: 'https://fr.wikipedia.org/wiki/Acad%C3%A9mie_fran%C3%A7aise',
    },
  },
  {
    id: 'culture-generale-035',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Comment nomme-t-on la figure de style qui rapproche deux éléments sans outil de comparaison, comme dans « Cet homme est un lion » ?',
    choices: ['Comparaison', 'Antithèse', 'Métaphore', 'Hyperbole'],
    answerIndex: 2,
    explanation:
      'Cette figure de style est la métaphore, qui identifie deux réalités sans mot de comparaison. Si on disait « fort comme un lion », il s’agirait d’une comparaison.',
    source: { label: 'Wikipédia : Métaphore', url: 'https://fr.wikipedia.org/wiki/M%C3%A9taphore' },
  },
  {
    id: 'culture-generale-036',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le tournoi de Roland-Garros se joue sur terre battue.',
    answer: true,
    explanation:
      'Le tournoi de Roland-Garros, tournoi de tennis du Grand Chelem organisé à Paris, se dispute sur terre battue. Il a lieu chaque année à la fin du printemps.',
    source: {
      label: 'Wikipédia : Tournoi de Roland-Garros',
      url: 'https://fr.wikipedia.org/wiki/Tournoi_de_Roland-Garros',
    },
  },
  {
    id: 'culture-generale-037',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Comment appelle-t-on deux mots qui se prononcent de la même façon mais s’écrivent différemment, comme « vert » et « verre » ?',
    choices: ['Des antonymes', 'Des homophones', 'Des synonymes', 'Des paronymes'],
    answerIndex: 1,
    explanation:
      'Ce sont des homophones : des mots qui ont la même prononciation mais une orthographe et un sens différents. « Vert », « verre », « vers » et « ver » en sont un exemple classique en français.',
    source: { label: 'Wikipédia : Homophone', url: 'https://fr.wikipedia.org/wiki/Homophone' },
  },
  {
    id: 'culture-generale-038',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle épice, l’une des plus chères au monde, colore traditionnellement la paella valencienne ?',
    choices: ['Le safran', 'Le curry', 'Le paprika', 'Le gingembre'],
    answerIndex: 0,
    explanation:
      'Le safran donne sa couleur jaune-orangé et son parfum à la paella traditionnelle. Cette épice est obtenue à partir des stigmates séchés de la fleur de Crocus sativus.',
    source: { label: 'Wikipédia : Paella', url: 'https://fr.wikipedia.org/wiki/Paella' },
  },
  {
    id: 'culture-generale-039',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle plante aromatique est l’ingrédient de base du pesto génois ?',
    choices: ['Le persil', 'La roquette', 'L’épinard', 'Le basilic'],
    answerIndex: 3,
    explanation:
      'Le pesto génois est une sauce originaire de Ligurie, à base de basilic, d’huile d’olive, de pignons de pin, d’ail et de fromage. Son nom vient du verbe italien pestare, « piler ».',
    source: { label: 'Wikipédia : Pesto', url: 'https://fr.wikipedia.org/wiki/Pesto' },
  },
  {
    id: 'culture-generale-040',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel peintre a réalisé en 1937 le tableau Guernica ?',
    choices: ['Salvador Dalí', 'Joan Miró', 'Pablo Picasso', 'Georges Braque'],
    answerIndex: 2,
    explanation:
      'Guernica est un tableau de Pablo Picasso, peint en 1937 pour le pavillon espagnol de l’Exposition internationale de Paris. Il évoque le bombardement de la ville basque de Guernica pendant la guerre d’Espagne.',
    source: {
      label: 'Wikipédia : Guernica (Picasso)',
      url: 'https://fr.wikipedia.org/wiki/Guernica_(Picasso)',
    },
  },
  {
    id: 'culture-generale-041',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le premier vol humain en montgolfière a eu lieu en 1883.',
    answer: false,
    explanation:
      'Le premier vol humain libre en montgolfière a eu lieu le 21 novembre 1783 à Paris, avec Pilâtre de Rozier et le marquis d’Arlandes. Le ballon avait été conçu par les frères Montgolfier.',
    source: {
      label: 'Wikipédia : Montgolfière',
      url: 'https://fr.wikipedia.org/wiki/Montgolfi%C3%A8re',
    },
  },
  {
    id: 'culture-generale-042',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Dans quelle ville italienne se déroule l’action de la tragédie Roméo et Juliette de Shakespeare ?',
    choices: ['Florence', 'Venise', 'Vérone', 'Rome'],
    answerIndex: 2,
    explanation:
      'L’intrigue de Roméo et Juliette, tragédie de William Shakespeare écrite vers 1595, se déroule principalement à Vérone, en Italie. Les familles rivales y sont les Montaigu et les Capulet.',
    source: {
      label: 'Wikipédia : Roméo et Juliette',
      url: 'https://fr.wikipedia.org/wiki/Rom%C3%A9o_et_Juliette',
    },
  },
  {
    id: 'culture-generale-043',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Dans quel roman de Jules Verne le capitaine Nemo commande-t-il le sous-marin Nautilus ?',
    choices: [
      'Le Tour du monde en quatre-vingts jours',
      'Voyage au centre de la Terre',
      'De la Terre à la Lune',
      'Vingt mille lieues sous les mers',
    ],
    answerIndex: 3,
    explanation:
      'Le capitaine Nemo commande le Nautilus dans Vingt mille lieues sous les mers, roman de Jules Verne publié en 1870. Le récit est raconté par le professeur Pierre Aronnax.',
    source: {
      label: 'Wikipédia : Vingt Mille Lieues sous les mers',
      url: 'https://fr.wikipedia.org/wiki/Vingt_Mille_Lieues_sous_les_mers',
    },
  },
  {
    id: 'culture-generale-044',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Qui est l’auteur du roman Le Rouge et le Noir, publié en 1830 ?',
    choices: ['Stendhal', 'Honoré de Balzac', 'Gustave Flaubert', 'Guy de Maupassant'],
    answerIndex: 0,
    explanation:
      'Le Rouge et le Noir est un roman de Stendhal, pseudonyme de Henri Beyle, publié en 1830. Il raconte l’ascension sociale de Julien Sorel.',
    source: {
      label: 'Wikipédia : Le Rouge et le Noir',
      url: 'https://fr.wikipedia.org/wiki/Le_Rouge_et_le_Noir',
    },
  },
  {
    id: 'culture-generale-045',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Sur quelle avenue parisienne se termine traditionnellement le Tour de France cycliste depuis 1975 ?',
    choices: [
      'Rue de Rivoli',
      'Avenue des Champs-Élysées',
      'Boulevard Saint-Germain',
      'Avenue Foch',
    ],
    answerIndex: 1,
    explanation:
      'Depuis 1975, la dernière étape du Tour de France cycliste s’achève sur l’avenue des Champs-Élysées, à Paris. L’épreuve a été créée en 1903.',
    source: {
      label: 'Wikipédia : Avenue des Champs-Élysées',
      url: 'https://fr.wikipedia.org/wiki/Avenue_des_Champs-%C3%89lys%C3%A9es',
    },
  },
  {
    id: 'culture-generale-046',
    type: 'true-false',
    difficulty: 'difficile',
    prompt: 'Vrai ou faux : Le prix Goncourt est décerné chaque année par l’Académie française.',
    answer: false,
    explanation:
      'Le prix Goncourt est décerné par l’Académie Goncourt, et non par l’Académie française. Il existe depuis 1903 et récompense un roman de langue française.',
    source: {
      label: 'Wikipédia : Prix Goncourt',
      url: 'https://fr.wikipedia.org/wiki/Prix_Goncourt',
    },
  },
  {
    id: 'culture-generale-047',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle est la distance officielle d’un marathon ?',
    choices: ['42,195 km', '40 km', '45 km', '50 km'],
    answerIndex: 0,
    explanation:
      'Le marathon se court sur 42,195 km. Cette distance a été officiellement adoptée en 1921, d’après celle du marathon des Jeux olympiques de Londres en 1908.',
    source: {
      label: 'Wikipédia : Marathon (sport)',
      url: 'https://fr.wikipedia.org/wiki/Marathon_(sport)',
    },
  },
  {
    id: 'culture-generale-048',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel architecte a conçu la pyramide de verre du musée du Louvre, inaugurée en 1989 ?',
    choices: ['Jean Nouvel', 'Renzo Piano', 'Norman Foster', 'Ieoh Ming Pei'],
    answerIndex: 3,
    explanation:
      'La pyramide du Louvre a été conçue par l’architecte sino-américain Ieoh Ming Pei et inaugurée en 1989 dans la cour Napoléon, à Paris. Elle sert d’entrée principale au musée.',
    source: {
      label: 'Wikipédia : Musée du Louvre',
      url: 'https://fr.wikipedia.org/wiki/Mus%C3%A9e_du_Louvre',
    },
  },
  {
    id: 'culture-generale-049',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel peintre a cofondé le cubisme avec Pablo Picasso vers 1907-1908 ?',
    choices: ['Henri Matisse', 'Georges Braque', 'André Derain', 'Fernand Léger'],
    answerIndex: 1,
    explanation:
      'Georges Braque a développé le cubisme avec Pablo Picasso à partir de 1907-1908. Le nom du mouvement vient d’une remarque du critique Louis Vauxcelles sur les « petits cubes » des tableaux de Braque.',
    source: { label: 'Wikipédia : Cubisme', url: 'https://fr.wikipedia.org/wiki/Cubisme' },
  },
  {
    id: 'culture-generale-050',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quelle œuvre de Marcel Proust forme un cycle romanesque de sept tomes publiés entre 1913 et 1927 ?',
    choices: [
      'Le Temps retrouvé',
      'Du côté de chez Swann',
      'À la recherche du temps perdu',
      'La Prisonnière',
    ],
    answerIndex: 2,
    explanation:
      'À la recherche du temps perdu est le cycle romanesque de Marcel Proust, publié de 1913 à 1927. Du côté de chez Swann en est le premier volume et Le Temps retrouvé le dernier.',
    source: {
      label: 'Wikipédia : À la recherche du temps perdu',
      url: 'https://fr.wikipedia.org/wiki/%C3%80_la_recherche_du_temps_perdu',
    },
  },
  {
    id: 'culture-generale-051',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel cinéaste japonais a réalisé le film Les Sept Samouraïs, sorti en 1954 ?',
    choices: ['Yasujirō Ozu', 'Akira Kurosawa', 'Hayao Miyazaki', 'Kenji Mizoguchi'],
    answerIndex: 1,
    explanation:
      'Les Sept Samouraïs a été réalisé par Akira Kurosawa et est sorti en 1954. Le film a notamment inspiré le western Les Sept Mercenaires (1960).',
    source: {
      label: 'Wikipédia : Akira Kurosawa',
      url: 'https://fr.wikipedia.org/wiki/Akira_Kurosawa',
    },
  },
  {
    id: 'culture-generale-052',
    type: 'true-false',
    difficulty: 'difficile',
    prompt:
      'Vrai ou faux : Le stylo à bille moderne a été inventé dans les années 1930 par le Hongrois László Bíró.',
    answer: true,
    explanation:
      'Le stylo à bille moderne a été mis au point dans les années 1930 par le journaliste hongrois László Bíró. Il le fit breveter ensuite, puis développa sa production en Argentine.',
    source: {
      label: 'Wikipédia : Stylo à bille',
      url: 'https://fr.wikipedia.org/wiki/Stylo_%C3%A0_bille',
    },
  },
  {
    id: 'culture-generale-053',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Qui a composé le ballet Le Lac des cygnes, créé en 1877 ?',
    choices: [
      'Igor Stravinsky',
      'Sergueï Prokofiev',
      'Piotr Ilitch Tchaïkovski',
      'Nikolaï Rimski-Korsakov',
    ],
    answerIndex: 2,
    explanation:
      'Le Lac des cygnes est un ballet du compositeur russe Piotr Ilitch Tchaïkovski, créé en 1877 au théâtre Bolchoï de Moscou. Sa version chorégraphique la plus célèbre date de 1895 à Saint-Pétersbourg.',
    source: {
      label: 'Wikipédia : Le Lac des cygnes',
      url: 'https://fr.wikipedia.org/wiki/Le_Lac_des_cygnes',
    },
  },
  {
    id: 'culture-generale-054',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Qui a mis au point la conservation des aliments par stérilisation en bocaux hermétiques, publiée en 1810 ?',
    choices: ['Louis Pasteur', 'Denis Papin', 'Antoine Parmentier', 'Nicolas Appert'],
    answerIndex: 3,
    explanation:
      'Le confiseur et cuisinier français Nicolas Appert a mis au point la conservation des aliments en bocaux chauffés, procédé qu’il publie en 1810. On parle encore d’« appertisation » pour désigner cette technique.',
    source: {
      label: 'Wikipédia : Nicolas Appert',
      url: 'https://fr.wikipedia.org/wiki/Nicolas_Appert',
    },
  },
  {
    id: 'culture-generale-055',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel Français a mis au point au XIXe siècle un système d’écriture en relief à six points destiné aux personnes aveugles ?',
    choices: ['Louis Braille', 'Valentin Haüy', 'Charles Barbier', 'Nicéphore Niépce'],
    answerIndex: 0,
    explanation:
      'Louis Braille, devenu aveugle dans son enfance, a mis au point son système de six points en relief dans les années 1820 et l’a publié en 1829. Il s’est inspiré de l’écriture nocturne de Charles Barbier.',
    source: {
      label: 'Wikipédia : Louis Braille',
      url: 'https://fr.wikipedia.org/wiki/Louis_Braille',
    },
  },
  {
    id: 'culture-generale-056',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel scientifique et homme d’État américain est à l’origine de l’invention du paratonnerre, vers 1752 ?',
    choices: ['Thomas Edison', 'Alessandro Volta', 'Isaac Newton', 'Benjamin Franklin'],
    answerIndex: 3,
    explanation:
      'Benjamin Franklin a inventé le paratonnerre vers 1752, après ses expériences sur l’électricité atmosphérique. Il l’a mis au point à Philadelphie.',
    source: {
      label: 'Wikipédia : Paratonnerre',
      url: 'https://fr.wikipedia.org/wiki/Paratonnerre',
    },
  },
  {
    id: 'culture-generale-057',
    type: 'true-false',
    difficulty: 'difficile',
    prompt: 'Vrai ou faux : Le dieu romain Mars correspond au dieu grec Hermès.',
    answer: false,
    explanation:
      'Mars, dieu romain de la guerre, correspond au dieu grec Arès. L’équivalent romain d’Hermès est Mercure.',
    source: {
      label: 'Wikipédia : Mars (mythologie)',
      url: 'https://fr.wikipedia.org/wiki/Mars_(mythologie)',
    },
  },
  {
    id: 'culture-generale-058',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quelle sculpture de Michel-Ange, taillée dans un bloc de marbre de Carrare entre 1501 et 1504, représente un héros biblique de plus de quatre mètres de haut ?',
    choices: ['David', 'La Pietà', 'Moïse', 'Le Penseur'],
    answerIndex: 0,
    explanation:
      'Le David de Michel-Ange a été sculpté dans un bloc de marbre de Carrare entre 1501 et 1504 à Florence, et mesure plus de quatre mètres de haut. Il est conservé à la galerie de l’Académie de Florence.',
    source: { label: 'Wikipédia : Michel-Ange', url: 'https://fr.wikipedia.org/wiki/Michel-Ange' },
  },
  {
    id: 'culture-generale-059',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel héros de la mythologie grecque a conduit les Argonautes à la conquête de la Toison d’or ?',
    choices: ['Persée', 'Thésée', 'Jason', 'Bellérophon'],
    answerIndex: 2,
    explanation:
      'Jason a mené les Argonautes à bord du navire Argo jusqu’en Colchide pour conquérir la Toison d’or. Il a été aidé par la magicienne Médée.',
    source: {
      label: 'Wikipédia : Toison d’or',
      url: 'https://fr.wikipedia.org/wiki/Toison_d%27or',
    },
  },
  {
    id: 'culture-generale-060',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Dans l’Odyssée d’Homère, quelle île Ulysse cherche-t-il à regagner après la guerre de Troie ?',
    choices: ['Sparte', 'Ithaque', 'Crète', 'Rhodes'],
    answerIndex: 1,
    explanation:
      'Ulysse cherche à regagner Ithaque, son île et son royaume, après la guerre de Troie. Son retour dure dix ans dans l’Odyssée d’Homère.',
    source: { label: 'Wikipédia : Odyssée', url: 'https://fr.wikipedia.org/wiki/Odyss%C3%A9e' },
  },
] as const satisfies readonly Question[];

export default questions;
