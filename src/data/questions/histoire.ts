import type { Question } from '../quiz.types';

export const questions = [
  {
    id: 'histoire-001',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel pharaon a fait construire la Grande Pyramide de Gizeh ?',
    choices: ['Khâfrê (Képhren)', 'Ramsès II', 'Khéops', 'Toutânkhamon'],
    answerIndex: 2,
    explanation:
      'La Grande Pyramide de Gizeh a été édifiée pour le pharaon Khéops (Khoufou), de la IVe dynastie, vers 2600 av. J.-C. Elle reste l’une des sept merveilles du monde antique.',
    source: {
      label: 'Wikipédia : Pyramide de Khéops',
      url: 'https://fr.wikipedia.org/wiki/Pyramide_de_Kh%C3%A9ops',
    },
  },
  {
    id: 'histoire-002',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Dans quelle cité grecque la démocratie est-elle apparue à la fin du VIe siècle av. J.-C. ?',
    choices: ['Athènes', 'Sparte', 'Corinthe', 'Thèbes'],
    answerIndex: 0,
    explanation:
      'La démocratie est née à Athènes, où les réformes de Clisthène en 508 av. J.-C. donnent aux citoyens le pouvoir de voter les lois à l’assemblée, l’Ecclésia.',
    source: {
      label: 'Wikipédia : Démocratie athénienne',
      url: 'https://fr.wikipedia.org/wiki/D%C3%A9mocratie_ath%C3%A9nienne',
    },
  },
  {
    id: 'histoire-003',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Les Jeux olympiques de l’Antiquité se déroulaient à Delphes.',
    answer: false,
    explanation:
      'C’est faux : les Jeux olympiques antiques se tenaient à Olympie, dans le Péloponnèse, en l’honneur de Zeus. Delphes, sanctuaire d’Apollon, accueillait d’autres concours, les Jeux pythiques.',
    source: {
      label: 'Wikipédia : Jeux olympiques antiques',
      url: 'https://fr.wikipedia.org/wiki/Jeux_olympiques_antiques',
    },
  },
  {
    id: 'histoire-004',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'En quelle année Jules César a-t-il été assassiné au Sénat de Rome, lors des ides de mars ?',
    choices: ['49 av. J.-C.', '44 av. J.-C.', '31 av. J.-C.', '27 av. J.-C.'],
    answerIndex: 1,
    explanation:
      'Jules César est assassiné le 15 mars 44 av. J.-C. (les ides de mars) par un groupe de sénateurs conduits par Brutus et Cassius.',
    source: {
      label: 'Wikipédia : Jules César',
      url: 'https://fr.wikipedia.org/wiki/Jules_C%C3%A9sar',
    },
  },
  {
    id: 'histoire-005',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle cité nord-africaine dirigeait le général Hannibal Barca lorsqu’il traversa les Alpes avec des éléphants en 218 av. J.-C. ?',
    choices: ['Syracuse', 'Alexandrie', 'Athènes', 'Carthage'],
    answerIndex: 3,
    explanation:
      'Hannibal Barca était un général de Carthage. Pendant la deuxième guerre punique, il franchit les Alpes en 218 av. J.-C. pour attaquer Rome en Italie.',
    source: {
      label: 'Wikipédia : Hannibal Barca',
      url: 'https://fr.wikipedia.org/wiki/Hannibal_Barca',
    },
  },
  {
    id: 'histoire-006',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel chef gaulois, vaincu par Jules César à Alésia en 52 av. J.-C., s’est rendu aux Romains ?',
    choices: ['Brennus', 'Vercingétorix', 'Ambiorix', 'Dumnorix'],
    answerIndex: 1,
    explanation:
      'Vercingétorix, chef arverne, se rend à Jules César après le siège d’Alésia en 52 av. J.-C., ce qui met fin à la guerre des Gaules.',
    source: {
      label: 'Wikipédia : Vercingétorix',
      url: 'https://fr.wikipedia.org/wiki/Vercing%C3%A9torix',
    },
  },
  {
    id: 'histoire-007',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel événement de 476 marque traditionnellement la fin de l’Empire romain d’Occident ?',
    choices: [
      'La déposition de l’empereur Romulus Augustule par Odoacre',
      'Le sac de Rome par le roi wisigoth Alaric',
      'Le partage de l’Empire à la mort de Théodose',
      'La conversion de Constantin au christianisme',
    ],
    answerIndex: 0,
    explanation:
      'En 476, le chef germanique Odoacre dépose le jeune empereur Romulus Augustule, ce qui est traditionnellement retenu comme la fin de l’Empire romain d’Occident. L’Empire romain d’Orient lui survit jusqu’en 1453.',
    source: {
      label: 'Wikipédia : Chute de l’Empire romain d’Occident',
      url: 'https://fr.wikipedia.org/wiki/Chute_de_l%27Empire_romain_d%27Occident',
    },
  },
  {
    id: 'histoire-008',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Cléopâtre VII, dernière reine d’Égypte antique, appartenait à une dynastie d’origine égyptienne.',
    answer: false,
    explanation:
      'C’est faux : Cléopâtre VII descendait de Ptolémée Ier, général macédonien d’Alexandre le Grand, fondateur de la dynastie lagide. Elle meurt en 30 av. J.-C., et l’Égypte devient alors une province romaine.',
    source: {
      label: 'Wikipédia : Cléopâtre VII',
      url: 'https://fr.wikipedia.org/wiki/Cl%C3%A9op%C3%A2tre_VII',
    },
  },
  {
    id: 'histoire-009',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Qui est couronné empereur à Rome le jour de Noël de l’an 800 ?',
    choices: ['Clovis', 'Charles Martel', 'Louis le Pieux', 'Charlemagne'],
    answerIndex: 3,
    explanation:
      'Charlemagne, roi des Francs, est couronné empereur le 25 décembre 800 dans la basilique Saint-Pierre de Rome par le pape Léon III.',
    source: { label: 'Wikipédia : Charlemagne', url: 'https://fr.wikipedia.org/wiki/Charlemagne' },
  },
  {
    id: 'histoire-010',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel duc de Normandie devient roi d’Angleterre après sa victoire à la bataille de Hastings en 1066 ?',
    choices: [
      'Harold Godwinson',
      'Édouard le Confesseur',
      'Guillaume le Conquérant',
      'Richard Cœur de Lion',
    ],
    answerIndex: 2,
    explanation:
      'Guillaume, duc de Normandie, bat le roi anglo-saxon Harold Godwinson à Hastings le 14 octobre 1066 et est couronné roi d’Angleterre à Noël de la même année.',
    source: {
      label: 'Wikipédia : Bataille d’Hastings',
      url: 'https://fr.wikipedia.org/wiki/Bataille_d%27Hastings',
    },
  },
  {
    id: 'histoire-011',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel roi des Francs, converti au christianisme, fut baptisé à Reims par l’évêque Remi vers l’an 500 ?',
    choices: ['Childéric Ier', 'Clovis Ier', 'Dagobert Ier', 'Pépin le Bref'],
    answerIndex: 1,
    explanation:
      'Clovis Ier, roi des Francs de la dynastie mérovingienne, est baptisé à Reims par l’évêque Remi vers 500 (la date exacte reste débattue). Ce baptême rapproche les Francs de l’Église catholique.',
    source: { label: 'Wikipédia : Clovis Ier', url: 'https://fr.wikipedia.org/wiki/Clovis_Ier' },
  },
  {
    id: 'histoire-012',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel pape lance l’appel à la première croisade lors du concile de Clermont en 1095 ?',
    choices: ['Urbain II', 'Grégoire VII', 'Innocent III', 'Jean XXII'],
    answerIndex: 0,
    explanation:
      'Le pape Urbain II appelle les chrétiens d’Occident à partir pour Jérusalem lors du concile de Clermont, en novembre 1095. Cet appel déclenche la première croisade, qui s’achève en 1099 par la prise de Jérusalem.',
    source: {
      label: 'Wikipédia : Première croisade',
      url: 'https://fr.wikipedia.org/wiki/Premi%C3%A8re_croisade',
    },
  },
  {
    id: 'histoire-013',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Dans quelle ville Jeanne d’Arc a-t-elle été brûlée vive en 1431 ?',
    choices: ['Orléans', 'Reims', 'Rouen', 'Paris'],
    answerIndex: 2,
    explanation:
      'Jeanne d’Arc est brûlée vive à Rouen le 30 mai 1431, après un procès en hérésie mené par des juges favorables aux Anglais. Elle avait contribué à la levée du siège d’Orléans en 1429.',
    source: {
      label: 'Wikipédia : Jeanne d’Arc',
      url: 'https://fr.wikipedia.org/wiki/Jeanne_d%27Arc',
    },
  },
  {
    id: 'histoire-014',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : La guerre de Cent Ans a duré exactement cent ans.',
    answer: false,
    explanation:
      'C’est faux : la guerre de Cent Ans oppose les royaumes de France et d’Angleterre de 1337 à 1453, soit 116 ans, avec de longues périodes de trêve.',
    source: {
      label: 'Wikipédia : Guerre de Cent Ans',
      url: 'https://fr.wikipedia.org/wiki/Guerre_de_Cent_Ans',
    },
  },
  {
    id: 'histoire-015',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel sultan ottoman s’empare de Constantinople en 1453 ?',
    choices: ['Soliman le Magnifique', 'Bayezid Ier', 'Selim Ier', 'Mehmed II'],
    answerIndex: 3,
    explanation:
      'Le sultan Mehmed II prend Constantinople le 29 mai 1453, mettant fin à l’Empire byzantin. La ville devient la capitale de l’Empire ottoman et prend le nom d’Istanbul.',
    source: {
      label: 'Wikipédia : Chute de Constantinople',
      url: 'https://fr.wikipedia.org/wiki/Chute_de_Constantinople',
    },
  },
  {
    id: 'histoire-016',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel souverain de l’empire du Mali est célèbre pour son pèlerinage à La Mecque vers 1324, durant lequel il distribua de grandes quantités d’or ?',
    choices: ['Mansa Moussa', 'Soundiata Keïta', 'Askia Mohammed', 'Samori Touré'],
    answerIndex: 0,
    explanation:
      'Mansa Moussa, empereur du Mali, effectue vers 1324 un pèlerinage à La Mecque en traversant l’Égypte avec une immense caravane. Sa richesse en or a marqué les chroniqueurs du monde méditerranéen.',
    source: {
      label: 'Wikipédia : Mansa Moussa',
      url: 'https://fr.wikipedia.org/wiki/Mansa_Moussa',
    },
  },
  {
    id: 'histoire-017',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel imprimeur de Mayence met au point vers 1450 l’imprimerie à caractères mobiles en Europe ?',
    choices: ['Johannes Fust', 'Johannes Gutenberg', 'Nicolas Jenson', 'Alde Manuce'],
    answerIndex: 1,
    explanation:
      'Johannes Gutenberg met au point à Mayence, vers 1450, l’imprimerie à caractères mobiles métalliques. Sa Bible à 42 lignes, imprimée vers 1455, est l’un des premiers grands livres européens imprimés.',
    source: {
      label: 'Wikipédia : Johannes Gutenberg',
      url: 'https://fr.wikipedia.org/wiki/Johannes_Gutenberg',
    },
  },
  {
    id: 'histoire-018',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'En 1492, quel navigateur, au service de la couronne de Castille, atteint les Amériques en traversant l’Atlantique ?',
    choices: ['Vasco de Gama', 'Amerigo Vespucci', 'Christophe Colomb', 'Fernand de Magellan'],
    answerIndex: 2,
    explanation:
      'Christophe Colomb, au service des Rois Catholiques d’Espagne, aborde dans les Bahamas le 12 octobre 1492, croyant atteindre les Indes par l’ouest.',
    source: {
      label: 'Wikipédia : Christophe Colomb',
      url: 'https://fr.wikipedia.org/wiki/Christophe_Colomb',
    },
  },
  {
    id: 'histoire-019',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Fernand de Magellan a lui-même achevé le premier tour du monde, en revenant en Espagne en 1522.',
    answer: false,
    explanation:
      'C’est faux : Magellan est tué aux Philippines en avril 1521, lors de la bataille de Mactan. C’est Juan Sebastián Elcano qui ramène en Espagne, en 1522, le dernier navire de l’expédition et achève le tour du monde.',
    source: {
      label: 'Wikipédia : Fernand de Magellan',
      url: 'https://fr.wikipedia.org/wiki/Fernand_de_Magellan',
    },
  },
  {
    id: 'histoire-020',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel moine allemand publie en 1517 les 95 thèses qui déclenchent la Réforme protestante ?',
    choices: ['Jean Calvin', 'Ulrich Zwingli', 'Érasme', 'Martin Luther'],
    answerIndex: 3,
    explanation:
      'Martin Luther, moine et théologien de Wittenberg, publie en 1517 ses 95 thèses contre la vente des indulgences. Ce geste est considéré comme le point de départ de la Réforme protestante.',
    source: {
      label: 'Wikipédia : Martin Luther',
      url: 'https://fr.wikipedia.org/wiki/Martin_Luther',
    },
  },
  {
    id: 'histoire-021',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel roi de France remporte la bataille de Marignan en 1515 contre les Suisses ?',
    choices: ['François Ier', 'Charles VIII', 'Henri II', 'Louis XII'],
    answerIndex: 0,
    explanation:
      'François Ier remporte la bataille de Marignan les 13 et 14 septembre 1515 contre les mercenaires suisses, ce qui lui permet de reprendre le duché de Milan.',
    source: {
      label: 'Wikipédia : Bataille de Marignan',
      url: 'https://fr.wikipedia.org/wiki/Bataille_de_Marignan',
    },
  },
  {
    id: 'histoire-022',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel roi de France signe en 1598 l’édit de Nantes, qui accorde une tolérance religieuse aux protestants ?',
    choices: ['Henri III', 'Henri IV', 'Louis XIII', 'Charles IX'],
    answerIndex: 1,
    explanation:
      'Henri IV signe l’édit de Nantes en avril 1598 pour mettre fin aux guerres de Religion. Il accorde aux protestants la liberté de conscience et des droits de culte limités. Louis XIV le révoque en 1685.',
    source: {
      label: 'Wikipédia : Édit de Nantes',
      url: 'https://fr.wikipedia.org/wiki/%C3%89dit_de_Nantes',
    },
  },
  {
    id: 'histoire-023',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Léonard de Vinci est mort en France.',
    answer: true,
    explanation:
      'C’est vrai : Léonard de Vinci meurt le 2 mai 1519 au manoir du Clos Lucé, près d’Amboise, où il vivait à l’invitation du roi François Ier.',
    source: {
      label: 'Wikipédia : Léonard de Vinci',
      url: 'https://fr.wikipedia.org/wiki/L%C3%A9onard_de_Vinci',
    },
  },
  {
    id: 'histoire-024',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle forteresse parisienne les insurgés prennent-ils le 14 juillet 1789 ?',
    choices: ['Le château de Vincennes', 'La Conciergerie', 'Le Louvre', 'La Bastille'],
    answerIndex: 3,
    explanation:
      'Le 14 juillet 1789, les Parisiens s’emparent de la Bastille, forteresse royale devenue prison d’État. Cet épisode symbolise le début de la Révolution française.',
    source: {
      label: 'Wikipédia : Prise de la Bastille',
      url: 'https://fr.wikipedia.org/wiki/Prise_de_la_Bastille',
    },
  },
  {
    id: 'histoire-025',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel roi de France est guillotiné le 21 janvier 1793 ?',
    choices: ['Louis XV', 'Charles X', 'Louis XVI', 'Louis XVIII'],
    answerIndex: 2,
    explanation:
      'Louis XVI, condamné par la Convention nationale, est guillotiné le 21 janvier 1793 sur la place de la Révolution, aujourd’hui place de la Concorde, à Paris.',
    source: { label: 'Wikipédia : Louis XVI', url: 'https://fr.wikipedia.org/wiki/Louis_XVI' },
  },
  {
    id: 'histoire-026',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Dans quel édifice Napoléon Bonaparte est-il sacré empereur des Français le 2 décembre 1804 ?',
    choices: [
      'La cathédrale Notre-Dame de Paris',
      'La cathédrale de Reims',
      'La basilique de Saint-Denis',
      'L’église des Invalides',
    ],
    answerIndex: 0,
    explanation:
      'Napoléon est sacré empereur à Notre-Dame de Paris le 2 décembre 1804, en présence du pape Pie VII. Il se couronne lui-même, puis couronne Joséphine.',
    source: {
      label: 'Wikipédia : Sacre de Napoléon Ier',
      url: 'https://fr.wikipedia.org/wiki/Sacre_de_Napol%C3%A9on_Ier',
    },
  },
  {
    id: 'histoire-027',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle victoire de Napoléon, remportée le 2 décembre 1805 contre les armées russe et autrichienne, est surnommée « bataille des Trois Empereurs » ?',
    choices: ['Wagram', 'Austerlitz', 'Iéna', 'Eylau'],
    answerIndex: 1,
    explanation:
      'La bataille d’Austerlitz, le 2 décembre 1805, oppose Napoléon Ier aux empereurs Alexandre Ier de Russie et François II d’Autriche. Elle est considérée comme sa plus belle victoire.',
    source: {
      label: 'Wikipédia : Bataille d’Austerlitz',
      url: 'https://fr.wikipedia.org/wiki/Bataille_d%27Austerlitz',
    },
  },
  {
    id: 'histoire-028',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle bataille, livrée le 18 juin 1815 en actuelle Belgique, marque la défaite finale de Napoléon Ier ?',
    choices: ['Leipzig', 'Trafalgar', 'La Moskova', 'Waterloo'],
    answerIndex: 3,
    explanation:
      'À Waterloo, le 18 juin 1815, l’armée de Napoléon est battue par les troupes du duc de Wellington et du maréchal Blücher. Napoléon abdique de nouveau et est exilé à Sainte-Hélène.',
    source: {
      label: 'Wikipédia : Bataille de Waterloo',
      url: 'https://fr.wikipedia.org/wiki/Bataille_de_Waterloo_(1815)',
    },
  },
  {
    id: 'histoire-029',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Le Code civil des Français a été promulgué en 1804, sous le Consulat de Napoléon Bonaparte.',
    answer: true,
    explanation:
      'C’est vrai : le Code civil des Français est promulgué le 21 mars 1804, avant la proclamation de l’Empire en mai. Il est aussi appelé Code Napoléon et a inspiré de nombreux droits civils dans le monde.',
    source: {
      label: 'Wikipédia : Code civil des Français',
      url: 'https://fr.wikipedia.org/wiki/Code_civil_des_Fran%C3%A7ais',
    },
  },
  {
    id: 'histoire-030',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel chef de la révolution de Saint-Domingue, arrêté par les Français en 1802, est mort au fort de Joux en 1803 ?',
    choices: [
      'Jean-Jacques Dessalines',
      'Henri Christophe',
      'Toussaint Louverture',
      'Alexandre Pétion',
    ],
    answerIndex: 2,
    explanation:
      'Toussaint Louverture, ancien esclave devenu chef de la révolution de Saint-Domingue, est arrêté en 1802 et meurt au fort de Joux, dans le Jura, en 1803. Haïti proclame son indépendance le 1er janvier 1804 sous Jean-Jacques Dessalines.',
    source: {
      label: 'Wikipédia : Toussaint Louverture',
      url: 'https://fr.wikipedia.org/wiki/Toussaint_Louverture',
    },
  },
  {
    id: 'histoire-031',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'En quelle année les treize colonies britanniques d’Amérique du Nord proclament-elles leur indépendance ?',
    choices: ['1776', '1783', '1789', '1765'],
    answerIndex: 0,
    explanation:
      'La Déclaration d’indépendance des États-Unis est adoptée le 4 juillet 1776 à Philadelphie. L’indépendance est reconnue par le Royaume-Uni en 1783 par le traité de Paris.',
    source: {
      label: 'Wikipédia : Déclaration d’indépendance des États-Unis',
      url: 'https://fr.wikipedia.org/wiki/D%C3%A9claration_d%27ind%C3%A9pendance_des_%C3%89tats-Unis',
    },
  },
  {
    id: 'histoire-032',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Dans quel lieu l’Empire allemand est-il proclamé le 18 janvier 1871, pendant la guerre franco-prussienne ?',
    choices: [
      'Berlin',
      'La galerie des Glaces du château de Versailles',
      'Potsdam',
      'Francfort-sur-le-Main',
    ],
    answerIndex: 1,
    explanation:
      'L’Empire allemand est proclamé le 18 janvier 1871 dans la galerie des Glaces du château de Versailles. Le roi de Prusse Guillaume Ier devient empereur, sous l’impulsion du chancelier Otto von Bismarck.',
    source: {
      label: 'Wikipédia : Empire allemand',
      url: 'https://fr.wikipedia.org/wiki/Empire_allemand',
    },
  },
  {
    id: 'histoire-033',
    type: 'true-false',
    difficulty: 'facile',
    prompt:
      'Vrai ou faux : La guerre de Sécession a opposé le Nord et le Sud des États-Unis entre 1861 et 1865.',
    answer: true,
    explanation:
      'C’est vrai : la guerre de Sécession oppose de 1861 à 1865 les États de l’Union, dirigés par Abraham Lincoln, aux États confédérés du Sud. Elle s’achève par la victoire du Nord et l’abolition de l’esclavage.',
    source: {
      label: 'Wikipédia : Guerre de Sécession',
      url: 'https://fr.wikipedia.org/wiki/Guerre_de_S%C3%A9cession',
    },
  },
  {
    id: 'histoire-034',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel pays est le berceau de la révolution industrielle, à partir de la fin du XVIIIe siècle ?',
    choices: ['France', 'Allemagne', 'Pays-Bas', 'Royaume-Uni'],
    answerIndex: 3,
    explanation:
      'La révolution industrielle démarre au Royaume-Uni à la fin du XVIIIe siècle, grâce au développement du textile mécanisé, de la machine à vapeur et de l’exploitation du charbon.',
    source: {
      label: 'Wikipédia : Révolution industrielle',
      url: 'https://fr.wikipedia.org/wiki/R%C3%A9volution_industrielle',
    },
  },
  {
    id: 'histoire-035',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel mouvement insurrectionnel prend le pouvoir à Paris le 18 mars 1871, après la défaite française face à la Prusse ?',
    choices: ['La Fronde', 'La Terreur', 'La Commune de Paris', 'Le boulangisme'],
    answerIndex: 2,
    explanation:
      'La Commune de Paris, insurrection populaire née le 18 mars 1871, gouverne la capitale jusqu’à sa répression par l’armée versaillaise lors de la « Semaine sanglante », fin mai 1871.',
    source: {
      label: 'Wikipédia : Commune de Paris (1871)',
      url: 'https://fr.wikipedia.org/wiki/Commune_de_Paris_(1871)',
    },
  },
  {
    id: 'histoire-036',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel écrivain publie « J’accuse…! » dans le journal L’Aurore en janvier 1898, en défense du capitaine Dreyfus ?',
    choices: ['Émile Zola', 'Victor Hugo', 'Jean Jaurès', 'Marcel Proust'],
    answerIndex: 0,
    explanation:
      'Émile Zola publie « J’accuse…! », une lettre ouverte au président de la République, à la une de L’Aurore le 13 janvier 1898. Elle dénonce l’erreur judiciaire dont est victime Alfred Dreyfus.',
    source: {
      label: 'Wikipédia : Affaire Dreyfus',
      url: 'https://fr.wikipedia.org/wiki/Affaire_Dreyfus',
    },
  },
  {
    id: 'histoire-037',
    type: 'true-false',
    difficulty: 'facile',
    prompt:
      'Vrai ou faux : La statue de la Liberté, à New York, a été offerte aux États-Unis par le Royaume-Uni.',
    answer: false,
    explanation:
      'C’est faux : la statue de la Liberté est un don du peuple français aux États-Unis. Elle a été conçue par le sculpteur Auguste Bartholdi et inaugurée à New York en 1886.',
    source: {
      label: 'Wikipédia : Statue de la Liberté',
      url: 'https://fr.wikipedia.org/wiki/Statue_de_la_Libert%C3%A9',
    },
  },
  {
    id: 'histoire-038',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'En quelle année l’esclavage est-il aboli de façon définitive dans les colonies françaises, sous l’impulsion de Victor Schœlcher ?',
    choices: ['1794', '1848', '1830', '1870'],
    answerIndex: 1,
    explanation:
      'Le décret d’abolition définitive de l’esclavage dans les colonies françaises est signé le 27 avril 1848, sous la IIe République, à l’initiative de Victor Schœlcher. Une première abolition, votée en 1794, avait été annulée par Napoléon en 1802.',
    source: {
      label: 'Wikipédia : Victor Schœlcher',
      url: 'https://fr.wikipedia.org/wiki/Victor_Sch%C5%93lcher',
    },
  },
  {
    id: 'histoire-039',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Comment nomme-t-on l’ère de modernisation et d’ouverture du Japon qui débute en 1868 ?',
    choices: ['Ère Edo', 'Ère Heian', 'Ère Taishō', 'Ère Meiji'],
    answerIndex: 3,
    explanation:
      'L’ère Meiji débute en 1868, avec la chute du shogunat Tokugawa et la restauration du pouvoir impérial. Le Japon s’y industrialise et adopte des institutions modernes.',
    source: { label: 'Wikipédia : Ère Meiji', url: 'https://fr.wikipedia.org/wiki/%C3%88re_Meiji' },
  },
  {
    id: 'histoire-040',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel événement du 28 juin 1914 déclenche la crise qui mène à la Première Guerre mondiale ?',
    choices: [
      'L’invasion de la Belgique par l’Allemagne',
      'Le naufrage du Lusitania',
      'L’assassinat de l’archiduc François-Ferdinand à Sarajevo',
      'L’entrée en guerre des États-Unis',
    ],
    answerIndex: 2,
    explanation:
      'Le 28 juin 1914, l’archiduc François-Ferdinand d’Autriche, héritier du trône austro-hongrois, est assassiné à Sarajevo par Gavrilo Princip. L’Autriche-Hongrie déclare la guerre à la Serbie un mois plus tard.',
    source: {
      label: 'Wikipédia : Attentat de Sarajevo',
      url: 'https://fr.wikipedia.org/wiki/Attentat_de_Sarajevo',
    },
  },
  {
    id: 'histoire-041',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'À quelle date l’armistice mettant fin aux combats de la Première Guerre mondiale sur le front occidental est-il signé ?',
    choices: ['11 novembre 1918', '28 juin 1919', '8 mai 1945', '1er août 1914'],
    answerIndex: 0,
    explanation:
      'L’armistice avec l’Allemagne est signé le 11 novembre 1918 à Rethondes, dans la forêt de Compiègne, et met fin aux combats sur le front occidental.',
    source: {
      label: 'Wikipédia : Armistice du 11 novembre 1918',
      url: 'https://fr.wikipedia.org/wiki/Armistice_du_11_novembre_1918',
    },
  },
  {
    id: 'histoire-042',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle bataille de 1916, dans la Meuse, a duré de février à décembre et est devenue un symbole de la Première Guerre mondiale en France ?',
    choices: [
      'La bataille de la Marne',
      'La bataille de Verdun',
      'La bataille de la Somme',
      'La bataille du Chemin des Dames',
    ],
    answerIndex: 1,
    explanation:
      'La bataille de Verdun se déroule du 21 février au 19 décembre 1916 entre armées française et allemande. Elle est l’une des plus longues de la Première Guerre mondiale.',
    source: {
      label: 'Wikipédia : Bataille de Verdun',
      url: 'https://fr.wikipedia.org/wiki/Bataille_de_Verdun',
    },
  },
  {
    id: 'histoire-043',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel pays l’Allemagne nazie envahit-elle le 1er septembre 1939, déclenchant la Seconde Guerre mondiale en Europe ?',
    choices: ['Tchécoslovaquie', 'Autriche', 'Hongrie', 'Pologne'],
    answerIndex: 3,
    explanation:
      'L’Allemagne nazie envahit la Pologne le 1er septembre 1939. Le Royaume-Uni et la France lui déclarent la guerre deux jours plus tard, le 3 septembre.',
    source: {
      label: 'Wikipédia : Campagne de Pologne (1939)',
      url: 'https://fr.wikipedia.org/wiki/Campagne_de_Pologne_(1939)',
    },
  },
  {
    id: 'histoire-044',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Le général de Gaulle a lancé son appel du 18 juin 1940 depuis Londres.',
    answer: true,
    explanation:
      'C’est vrai : le 18 juin 1940, Charles de Gaulle s’exprime sur les ondes de la BBC, à Londres, pour appeler les Français à poursuivre le combat après la demande d’armistice du maréchal Pétain.',
    source: {
      label: 'Wikipédia : Appel du 18 Juin',
      url: 'https://fr.wikipedia.org/wiki/Appel_du_18_Juin',
    },
  },
  {
    id: 'histoire-045',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel jour a lieu le débarquement allié en Normandie, au cours de l’opération Overlord ?',
    choices: ['15 août 1944', '8 mai 1945', '6 juin 1944', '11 novembre 1944'],
    answerIndex: 2,
    explanation:
      'Le débarquement allié en Normandie a lieu le 6 juin 1944 (le « D-Day ») sur cinq plages, dont Omaha et Utah. Il ouvre un second front à l’ouest contre l’Allemagne nazie.',
    source: {
      label: 'Wikipédia : Débarquement de Normandie',
      url: 'https://fr.wikipedia.org/wiki/D%C3%A9barquement_de_Normandie',
    },
  },
  {
    id: 'histoire-046',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle attaque japonaise du 7 décembre 1941 fait entrer les États-Unis dans la Seconde Guerre mondiale ?',
    choices: ['Pearl Harbor', 'Midway', 'Guadalcanal', 'Iwo Jima'],
    answerIndex: 0,
    explanation:
      'Le 7 décembre 1941, l’aviation japonaise attaque par surprise la base navale américaine de Pearl Harbor, à Hawaï. Les États-Unis déclarent la guerre au Japon dès le lendemain.',
    source: {
      label: 'Wikipédia : Attaque de Pearl Harbor',
      url: 'https://fr.wikipedia.org/wiki/Attaque_de_Pearl_Harbor',
    },
  },
  {
    id: 'histoire-047',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel traité, signé le 28 juin 1919 dans la galerie des Glaces, met officiellement fin à l’état de guerre entre l’Allemagne et les Alliés ?',
    choices: [
      'Le traité de Trianon',
      'Le traité de Versailles',
      'Le traité de Brest-Litovsk',
      'Le traité de Sèvres',
    ],
    answerIndex: 1,
    explanation:
      'Le traité de Versailles est signé le 28 juin 1919 dans la galerie des Glaces du château de Versailles. Il impose à l’Allemagne des pertes territoriales, des limites militaires et des réparations.',
    source: {
      label: 'Wikipédia : Traité de Versailles (1919)',
      url: 'https://fr.wikipedia.org/wiki/Trait%C3%A9_de_Versailles_(1919)',
    },
  },
  {
    id: 'histoire-048',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : La ville de Stalingrad, théâtre d’une bataille décisive en 1942-1943, s’appelle aujourd’hui Volgograd.',
    answer: true,
    explanation:
      'C’est vrai : Stalingrad, sur la Volga, est rebaptisée Volgograd en 1961. La bataille qui s’y déroule de 1942 à 1943 se termine par la victoire soviétique et marque un tournant de la guerre sur le front de l’Est.',
    source: {
      label: 'Wikipédia : Bataille de Stalingrad',
      url: 'https://fr.wikipedia.org/wiki/Bataille_de_Stalingrad',
    },
  },
  {
    id: 'histoire-049',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quelle conférence réunit en février 1945 Roosevelt, Churchill et Staline pour préparer l’après-guerre ?',
    choices: ['Munich', 'Potsdam', 'Téhéran', 'Yalta'],
    answerIndex: 3,
    explanation:
      'La conférence de Yalta, en Crimée, réunit du 4 au 11 février 1945 Franklin Roosevelt, Winston Churchill et Joseph Staline. Ils y discutent de l’organisation de l’Europe d’après-guerre et du sort de l’Allemagne.',
    source: {
      label: 'Wikipédia : Conférence de Yalta',
      url: 'https://fr.wikipedia.org/wiki/Conf%C3%A9rence_de_Yalta',
    },
  },
  {
    id: 'histoire-050',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel dirigeant bolchevique prend la tête du gouvernement formé après la révolution d’Octobre 1917 en Russie ?',
    choices: ['Léon Trotski', 'Joseph Staline', 'Vladimir Ilitch Lénine', 'Alexandre Kerenski'],
    answerIndex: 2,
    explanation:
      'Vladimir Ilitch Lénine dirige les bolcheviks lors de la prise du pouvoir à Petrograd en octobre 1917 (novembre dans le calendrier grégorien). Il devient président du Conseil des commissaires du peuple.',
    source: {
      label: 'Wikipédia : Révolution russe',
      url: 'https://fr.wikipedia.org/wiki/R%C3%A9volution_russe',
    },
  },
  {
    id: 'histoire-051',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En quelle année le krach boursier de Wall Street ouvre-t-il la Grande Dépression ?',
    choices: ['1929', '1919', '1933', '1937'],
    answerIndex: 0,
    explanation:
      'Le krach boursier de Wall Street a lieu en octobre 1929, avec le « Jeudi noir » du 24 octobre. Il ouvre la Grande Dépression, crise économique mondiale des années 1930.',
    source: {
      label: 'Wikipédia : Krach de 1929',
      url: 'https://fr.wikipedia.org/wiki/Krach_de_1929',
    },
  },
  {
    id: 'histoire-052',
    type: 'single',
    difficulty: 'facile',
    prompt: 'En quelle année le mur de Berlin, construit en 1961, est-il ouvert ?',
    choices: ['1985', '1989', '1991', '1987'],
    answerIndex: 1,
    explanation:
      'Le mur de Berlin, érigé en août 1961, est ouvert dans la nuit du 9 novembre 1989. Sa chute précède la réunification de l’Allemagne, le 3 octobre 1990.',
    source: {
      label: 'Wikipédia : Chute du mur de Berlin',
      url: 'https://fr.wikipedia.org/wiki/Chute_du_mur_de_Berlin',
    },
  },
  {
    id: 'histoire-053',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En quelle année l’Inde obtient-elle son indépendance du Royaume-Uni ?',
    choices: ['1919', '1930', '1942', '1947'],
    answerIndex: 3,
    explanation:
      'L’Inde accède à l’indépendance le 15 août 1947, en même temps que la création du Pakistan. Le mouvement non violent de Gandhi a joué un rôle majeur dans cette indépendance.',
    source: {
      label: 'Wikipédia : Indépendance de l’Inde',
      url: 'https://fr.wikipedia.org/wiki/Ind%C3%A9pendance_de_l%27Inde',
    },
  },
  {
    id: 'histoire-054',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel astronaute américain est le premier homme à marcher sur la Lune, le 20 juillet 1969 ?',
    choices: ['Buzz Aldrin', 'Youri Gagarine', 'Neil Armstrong', 'John Glenn'],
    answerIndex: 2,
    explanation:
      'Neil Armstrong, commandant de la mission Apollo 11, pose le pied sur la Lune le 20 juillet 1969. Buzz Aldrin le rejoint peu après sur le sol lunaire.',
    source: { label: 'Wikipédia : Apollo 11', url: 'https://fr.wikipedia.org/wiki/Apollo_11' },
  },
  {
    id: 'histoire-055',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel président des États-Unis fait face à Nikita Khrouchtchev lors de la crise des missiles de Cuba en octobre 1962 ?',
    choices: ['John F. Kennedy', 'Dwight D. Eisenhower', 'Lyndon B. Johnson', 'Richard Nixon'],
    answerIndex: 0,
    explanation:
      'John F. Kennedy est président lors de la crise des missiles de Cuba, en octobre 1962, qui oppose les États-Unis à l’URSS de Khrouchtchev. L’installation de missiles soviétiques à Cuba est évitée par un accord.',
    source: {
      label: 'Wikipédia : Crise des missiles de Cuba',
      url: 'https://fr.wikipedia.org/wiki/Crise_des_missiles_de_Cuba',
    },
  },
  {
    id: 'histoire-056',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel homme d’État devient en 1994 le premier président noir d’Afrique du Sud, après les premières élections multiraciales ?',
    choices: ['Desmond Tutu', 'Nelson Mandela', 'Frederik de Klerk', 'Thabo Mbeki'],
    answerIndex: 1,
    explanation:
      'Nelson Mandela, emprisonné de 1962 à 1990 pour son opposition à l’apartheid, est élu président après les élections d’avril 1994 et prend ses fonctions le 10 mai 1994.',
    source: {
      label: 'Wikipédia : Nelson Mandela',
      url: 'https://fr.wikipedia.org/wiki/Nelson_Mandela',
    },
  },
  {
    id: 'histoire-057',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : L’URSS a été dissoute en 1989.',
    answer: false,
    explanation:
      'C’est faux : l’URSS est dissoute en décembre 1991, après la démission de Mikhaïl Gorbatchev le 25 décembre. 1989 est l’année de la chute du mur de Berlin.',
    source: {
      label: 'Wikipédia : Dissolution de l’URSS',
      url: 'https://fr.wikipedia.org/wiki/Dissolution_de_l%27URSS',
    },
  },
  {
    id: 'histoire-058',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En quelle année l’Organisation des Nations unies est-elle fondée ?',
    choices: ['1919', '1939', '1945', '1948'],
    answerIndex: 2,
    explanation:
      'L’ONU est fondée en 1945 : sa Charte est signée à San Francisco le 26 juin et entre en vigueur le 24 octobre 1945. Elle succède à la Société des Nations, créée en 1919.',
    source: {
      label: 'Wikipédia : Organisation des Nations unies',
      url: 'https://fr.wikipedia.org/wiki/Organisation_des_Nations_unies',
    },
  },
  {
    id: 'histoire-059',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Lequel de ces pays ne fait pas partie des six signataires du traité de Rome de 1957 instituant la Communauté économique européenne ?',
    choices: ['Italie', 'Belgique', 'Luxembourg', 'Royaume-Uni'],
    answerIndex: 3,
    explanation:
      'Le traité de Rome du 25 mars 1957 est signé par six pays : la France, l’Allemagne de l’Ouest, l’Italie, la Belgique, les Pays-Bas et le Luxembourg. Le Royaume-Uni n’adhère à la CEE qu’en 1973.',
    source: {
      label: 'Wikipédia : Communauté économique européenne',
      url: 'https://fr.wikipedia.org/wiki/Communaut%C3%A9_%C3%A9conomique_europ%C3%A9enne',
    },
  },
  {
    id: 'histoire-060',
    type: 'true-false',
    difficulty: 'difficile',
    prompt:
      'Vrai ou faux : Les Françaises ont voté pour la première fois lors des élections municipales d’avril 1945.',
    answer: true,
    explanation:
      'C’est vrai : le droit de vote des femmes est accordé par l’ordonnance du 21 avril 1944. Elles votent pour la première fois lors des élections municipales d’avril 1945.',
    source: {
      label: 'Wikipédia : Droit de vote des femmes',
      url: 'https://fr.wikipedia.org/wiki/Droit_de_vote_des_femmes',
    },
  },
] as const satisfies readonly Question[];

export default questions;
