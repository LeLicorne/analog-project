import type { Question } from '../quiz.types';

export const questions = [
  {
    id: 'gaming-001',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle entreprise japonaise a créé Pac-Man, sorti en arcade en 1980 ?',
    choices: ['Sega', 'Taito', 'Namco', 'Konami'],
    answerIndex: 2,
    explanation:
      'Pac-Man est un jeu d’arcade édité par Namco en 1980 au Japon, conçu par Toru Iwatani. Il est devenu l’une des mascottes les plus reconnaissables du jeu vidéo.',
    source: { label: 'Wikipédia : Pac-Man', url: 'https://fr.wikipedia.org/wiki/Pac-Man' },
  },
  {
    id: 'gaming-002',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel créateur japonais est à l’origine de Mario et de The Legend of Zelda chez Nintendo ?',
    choices: ['Shigeru Miyamoto', 'Satoru Iwata', 'Gunpei Yokoi', 'Eiji Aonuma'],
    answerIndex: 0,
    explanation:
      'Shigeru Miyamoto a créé Mario avec Donkey Kong en 1981, puis The Legend of Zelda en 1986. Il travaille chez Nintendo depuis 1977.',
    source: {
      label: 'Wikipédia : Shigeru Miyamoto',
      url: 'https://fr.wikipedia.org/wiki/Shigeru_Miyamoto',
    },
  },
  {
    id: 'gaming-003',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En quelle année le premier The Legend of Zelda est-il sorti au Japon ?',
    choices: ['1983', '1984', '1985', '1986'],
    answerIndex: 3,
    explanation:
      'Le premier The Legend of Zelda sort au Japon en février 1986 sur le Famicom Disk System de Nintendo. Il paraît en Amérique du Nord en 1987 sur NES.',
    source: {
      label: 'Wikipédia : The Legend of Zelda',
      url: 'https://fr.wikipedia.org/wiki/The_Legend_of_Zelda',
    },
  },
  {
    id: 'gaming-004',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Qui est le créateur de la franchise Pokémon, lancée au Japon en 1996 ?',
    choices: ['Shigeru Miyamoto', 'Satoshi Tajiri', 'Masahiro Sakurai', 'Junichi Masuda'],
    answerIndex: 1,
    explanation:
      'Satoshi Tajiri, fondateur du studio Game Freak, a imaginé Pokémon. Les jeux Pokémon Rouge et Vert sortent en 1996 sur Game Boy, édités par Nintendo.',
    source: {
      label: 'Wikipédia : Satoshi Tajiri',
      url: 'https://fr.wikipedia.org/wiki/Satoshi_Tajiri',
    },
  },
  {
    id: 'gaming-005',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Sonic the Hedgehog est une mascotte créée par Nintendo.',
    answer: false,
    explanation:
      'Sonic the Hedgehog est la mascotte de Sega, introduite en 1991 avec le jeu sur Mega Drive. Il a été pensé comme un rival de Mario, la mascotte de Nintendo.',
    source: {
      label: 'Wikipédia : Sonic the Hedgehog',
      url: 'https://fr.wikipedia.org/wiki/Sonic_the_Hedgehog',
    },
  },
  {
    id: 'gaming-006',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle entreprise a créé la mascotte Sonic the Hedgehog, apparue en 1991 ?',
    choices: ['Nintendo', 'Sega', 'Atari', 'Namco'],
    answerIndex: 1,
    explanation:
      'Sonic the Hedgehog est la mascotte de Sega, introduite en 1991 pour concurrencer Mario de Nintendo. Le premier jeu est développé par la Sonic Team.',
    source: {
      label: 'Wikipédia : Sonic the Hedgehog',
      url: 'https://fr.wikipedia.org/wiki/Sonic_the_Hedgehog',
    },
  },
  {
    id: 'gaming-007',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle société japonaise a publié le premier Final Fantasy en 1987 ?',
    choices: ['Capcom', 'Enix', 'Konami', 'Square'],
    answerIndex: 3,
    explanation:
      'Final Fantasy est publié par Square en 1987 sur Famicom, avec Hironobu Sakaguchi à la tête du projet. Square a fusionné avec Enix en 2003 pour former Square Enix.',
    source: {
      label: 'Wikipédia : Final Fantasy',
      url: 'https://fr.wikipedia.org/wiki/Final_Fantasy',
    },
  },
  {
    id: 'gaming-008',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel jeu était fourni avec la Game Boy lors de son lancement en Amérique du Nord en 1989 ?',
    choices: ['Tetris', 'Dr. Mario', 'Kirby’s Dream Land', 'Metroid II'],
    answerIndex: 0,
    explanation:
      'Tetris, créé par Alexey Pajitnov en 1984, était vendu avec la Game Boy en 1989 en Amérique du Nord. Ce choix a largement contribué au succès de la console.',
    source: { label: 'Wikipédia : Tetris', url: 'https://fr.wikipedia.org/wiki/Tetris' },
  },
  {
    id: 'gaming-009',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel Suédois a créé Minecraft, dont la première version publique date de 2009 ?',
    choices: ['Gabe Newell', 'Jens Bergensten', 'Markus Persson', 'Peter Molyneux'],
    answerIndex: 2,
    explanation:
      'Markus Persson, dit « Notch », a créé Minecraft et fondé le studio Mojang. La version complète sort en 2011 et Microsoft rachète Mojang en 2014.',
    source: {
      label: 'Wikipédia : Markus Persson',
      url: 'https://fr.wikipedia.org/wiki/Markus_Persson',
    },
  },
  {
    id: 'gaming-010',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Nintendo existait déjà au XIXe siècle, avant de produire des jeux vidéo.',
    answer: true,
    explanation:
      'Nintendo a été fondée en 1889 à Kyoto pour fabriquer des cartes à jouer japonaises, les hanafuda. L’entreprise ne s’est tournée vers les jeux vidéo que dans les années 1970.',
    source: { label: 'Wikipédia : Nintendo', url: 'https://fr.wikipedia.org/wiki/Nintendo' },
  },
  {
    id: 'gaming-011',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel ingénieur de Nintendo a dirigé la conception de la Game Boy, sortie en 1989 ?',
    choices: ['Shigeru Miyamoto', 'Gunpei Yokoi', 'Satoru Iwata', 'Hiroshi Yamauchi'],
    answerIndex: 1,
    explanation:
      'Gunpei Yokoi, responsable de l’équipe Nintendo R&D1, a conçu la Game Boy en 1989. Il est aussi à l’origine des Game & Watch lancées en 1980.',
    source: {
      label: 'Wikipédia : Gunpei Yokoi',
      url: 'https://fr.wikipedia.org/wiki/Gunpei_Yokoi',
    },
  },
  {
    id: 'gaming-012',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Comment s’appelle au Japon la console que Nintendo a lancée en 1983 et qui est sortie ailleurs sous le nom de NES ?',
    choices: ['Famicom', 'Super Famicom', 'Mark III', 'Pocket Famicom'],
    answerIndex: 0,
    explanation:
      'Le Family Computer, ou Famicom, sort au Japon en 1983. Il est commercialisé en 1985 en Amérique du Nord puis en Europe sous le nom de Nintendo Entertainment System (NES).',
    source: {
      label: 'Wikipédia : Nintendo Entertainment System',
      url: 'https://fr.wikipedia.org/wiki/Nintendo_Entertainment_System',
    },
  },
  {
    id: 'gaming-013',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle entreprise a lancé la première PlayStation au Japon en décembre 1994 ?',
    choices: ['Nintendo', 'Sega', 'Microsoft', 'Sony'],
    answerIndex: 3,
    explanation:
      'La PlayStation est lancée par Sony Computer Entertainment au Japon le 3 décembre 1994. Elle marque l’entrée de Sony dans le marché des consoles de salon.',
    source: { label: 'Wikipédia : PlayStation', url: 'https://fr.wikipedia.org/wiki/PlayStation' },
  },
  {
    id: 'gaming-014',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En quelle année Microsoft a-t-il lancé sa première console Xbox ?',
    choices: ['1999', '2000', '2001', '2002'],
    answerIndex: 2,
    explanation:
      'La première Xbox de Microsoft sort en novembre 2001 en Amérique du Nord. Le jeu Halo : Combat Evolved fait partie de ses titres de lancement.',
    source: { label: 'Wikipédia : Xbox', url: 'https://fr.wikipedia.org/wiki/Xbox' },
  },
  {
    id: 'gaming-015',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : dans The Legend of Zelda, le héros que l’on incarne s’appelle Zelda.',
    answer: false,
    explanation:
      'Le héros de la série The Legend of Zelda s’appelle Link ; Zelda est la princesse du royaume d’Hyrule. La série, créée par Shigeru Miyamoto, débute en 1986.',
    source: {
      label: 'Wikipédia : The Legend of Zelda',
      url: 'https://fr.wikipedia.org/wiki/The_Legend_of_Zelda',
    },
  },
  {
    id: 'gaming-016',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle console de Nintendo, sortie en 2006, se jouait avec une télécommande sensible aux mouvements ?',
    choices: ['La Wii', 'La GameCube', 'La Wii U', 'La Nintendo DS'],
    answerIndex: 0,
    explanation:
      'La Wii, lancée par Nintendo en 2006, utilise la Wii Remote qui détecte les mouvements du joueur. Elle a séduit un public familial très large.',
    source: { label: 'Wikipédia : Wii', url: 'https://fr.wikipedia.org/wiki/Wii' },
  },
  {
    id: 'gaming-017',
    type: 'single',
    difficulty: 'facile',
    prompt: 'En quelle année la Nintendo Switch est-elle sortie ?',
    choices: ['2014', '2015', '2016', '2017'],
    answerIndex: 3,
    explanation:
      'La Nintendo Switch est sortie en mars 2017. C’est une console hybride qui se joue aussi bien sur téléviseur qu’en mode portable.',
    source: {
      label: 'Wikipédia : Nintendo Switch',
      url: 'https://fr.wikipedia.org/wiki/Nintendo_Switch',
    },
  },
  {
    id: 'gaming-018',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel studio américain a développé Doom, jeu de tir à la première personne sorti en 1993 ?',
    choices: ['Epic Games', 'id Software', 'Valve', 'Blizzard'],
    answerIndex: 1,
    explanation:
      'Doom est développé par id Software et sort en décembre 1993 sur PC. Il a popularisé le tir à la première personne et les modifications créées par les joueurs.',
    source: { label: 'Wikipédia : Doom', url: 'https://fr.wikipedia.org/wiki/Doom' },
  },
  {
    id: 'gaming-019',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En quelle année le jeu Half-Life de Valve est-il sorti sur PC ?',
    choices: ['1996', '1997', '1998', '2000'],
    answerIndex: 2,
    explanation:
      'Half-Life, premier jeu du studio Valve, sort en novembre 1998 sur PC. Il a ensuite donné naissance à des modifications célèbres, dont Counter-Strike.',
    source: { label: 'Wikipédia : Half-Life', url: 'https://fr.wikipedia.org/wiki/Half-Life' },
  },
  {
    id: 'gaming-020',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Minecraft appartient à Microsoft depuis 2014.',
    answer: true,
    explanation:
      'Microsoft a racheté le studio suédois Mojang, créateur de Minecraft, en 2014. Le jeu avait été créé par Markus Persson.',
    source: { label: 'Wikipédia : Minecraft', url: 'https://fr.wikipedia.org/wiki/Minecraft' },
  },
  {
    id: 'gaming-021',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En quelle année la plateforme de distribution Steam a-t-elle été lancée par Valve ?',
    choices: ['2003', '2000', '2006', '2009'],
    answerIndex: 0,
    explanation:
      'Steam est lancée par Valve en septembre 2003, d’abord pour mettre à jour automatiquement ses propres jeux. Elle est devenue une plateforme majeure de vente de jeux PC.',
    source: { label: 'Wikipédia : Steam', url: 'https://fr.wikipedia.org/wiki/Steam' },
  },
  {
    id: 'gaming-022',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle entreprise a développé World of Warcraft, sorti en 2004 ?',
    choices: ['Activision', 'Electronic Arts', 'Square Enix', 'Blizzard Entertainment'],
    answerIndex: 3,
    explanation:
      'World of Warcraft, jeu de rôle en ligne massivement multijoueur, sort en novembre 2004. Il est développé par Blizzard Entertainment et prolonge l’univers de la série Warcraft.',
    source: {
      label: 'Wikipédia : World of Warcraft',
      url: 'https://fr.wikipedia.org/wiki/World_of_Warcraft',
    },
  },
  {
    id: 'gaming-023',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle entreprise a créé Street Fighter II, jeu de combat d’arcade de 1991 ?',
    choices: ['Konami', 'Capcom', 'SNK', 'Sega'],
    answerIndex: 1,
    explanation:
      'Street Fighter II: The World Warrior est édité par Capcom en 1991 en arcade. Il a lancé la vogue des jeux de combat en face-à-face dans les salles.',
    source: {
      label: 'Wikipédia : Street Fighter II',
      url: 'https://fr.wikipedia.org/wiki/Street_Fighter_II',
    },
  },
  {
    id: 'gaming-024',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Qui est le créateur de la série Metal Gear, dont le premier épisode est sorti en 1987 chez Konami ?',
    choices: ['Shigeru Miyamoto', 'Yu Suzuki', 'Hideo Kojima', 'Hironobu Sakaguchi'],
    answerIndex: 2,
    explanation:
      'Hideo Kojima a conçu le premier Metal Gear, sorti en 1987 sur MSX2 chez Konami. La série est reconnue pour son approche de l’infiltration.',
    source: {
      label: 'Wikipédia : Hideo Kojima',
      url: 'https://fr.wikipedia.org/wiki/Hideo_Kojima',
    },
  },
  {
    id: 'gaming-025',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : la Game Boy de 1989 possédait un écran couleur.',
    answer: false,
    explanation:
      'La Game Boy de 1989 avait un écran monochrome à nuances de vert. La Game Boy Color, avec un écran couleur, n’est sortie qu’en 1998.',
    source: { label: 'Wikipédia : Game Boy', url: 'https://fr.wikipedia.org/wiki/Game_Boy' },
  },
  {
    id: 'gaming-026',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel genre de jeu le premier Resident Evil, sorti en 1996 sur PlayStation, a-t-il contribué à populariser ?',
    choices: [
      'Le survival horror',
      'Le jeu de plates-formes',
      'Le jeu de course',
      'La simulation de vie',
    ],
    answerIndex: 0,
    explanation:
      'Resident Evil, développé et édité par Capcom en 1996, est souvent associé à la popularisation du survival horror. Le jeu est dirigé par Shinji Mikami.',
    source: {
      label: 'Wikipédia : Resident Evil',
      url: 'https://fr.wikipedia.org/wiki/Resident_Evil',
    },
  },
  {
    id: 'gaming-027',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Sous quel nom japonais le héros Mega Man de Capcom, apparu en 1987, est-il connu ?',
    choices: ['Iron Kid', 'Blue Boy', 'Steel Man', 'Rockman'],
    answerIndex: 3,
    explanation:
      'Mega Man s’appelle Rockman au Japon, où le premier jeu sort en 1987 sur Famicom. Il est édité par Capcom et son personnage est dessiné par Keiji Inafune.',
    source: { label: 'Wikipédia : Mega Man', url: 'https://fr.wikipedia.org/wiki/Mega_Man' },
  },
  {
    id: 'gaming-028',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel studio japonais a développé le premier Kirby, Kirby’s Dream Land, sorti sur Game Boy en 1992 ?',
    choices: ['Game Freak', 'HAL Laboratory', 'Intelligent Systems', 'Rare'],
    answerIndex: 1,
    explanation:
      'Kirby’s Dream Land est développé par HAL Laboratory et publié par Nintendo en 1992. Le jeu a été conçu par Masahiro Sakurai.',
    source: { label: 'Wikipédia : Kirby', url: 'https://fr.wikipedia.org/wiki/Kirby' },
  },
  {
    id: 'gaming-029',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quelle entreprise japonaise a commercialisé la console Neo Geo en 1990 ?',
    choices: ['Sega', 'Taito', 'SNK', 'Hudson Soft'],
    answerIndex: 2,
    explanation:
      'SNK a lancé la Neo Geo en 1990, d’abord en arcade (MVS) puis en version salon (AES). Elle est connue pour des jeux de combat comme The King of Fighters.',
    source: { label: 'Wikipédia : Neo-Geo', url: 'https://fr.wikipedia.org/wiki/Neo-Geo' },
  },
  {
    id: 'gaming-030',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : la Dreamcast est la dernière console de salon commercialisée par Sega.',
    answer: true,
    explanation:
      'Sortie en 1998 au Japon, la Dreamcast est la dernière console de salon de Sega. Le constructeur a cessé la production en 2001 pour devenir éditeur de jeux.',
    source: { label: 'Wikipédia : Dreamcast', url: 'https://fr.wikipedia.org/wiki/Dreamcast' },
  },
  {
    id: 'gaming-031',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quelle entreprise japonaise a commercialisé la console PC Engine en 1987, en collaboration avec Hudson Soft ?',
    choices: ['NEC', 'Sony', 'Toshiba', 'Sharp'],
    answerIndex: 0,
    explanation:
      'La PC Engine sort au Japon en 1987, commercialisée par NEC avec Hudson Soft. Elle est vendue en Amérique du Nord sous le nom de TurboGrafx-16.',
    source: { label: 'Wikipédia : PC Engine', url: 'https://fr.wikipedia.org/wiki/PC_Engine' },
  },
  {
    id: 'gaming-032',
    type: 'single',
    difficulty: 'facile',
    prompt: 'En quelle année la Nintendo 64 est-elle sortie au Japon ?',
    choices: ['1994', '1995', '1997', '1996'],
    answerIndex: 3,
    explanation:
      'La Nintendo 64 sort au Japon en juin 1996. Super Mario 64 figure parmi ses jeux de lancement.',
    source: { label: 'Wikipédia : Nintendo 64', url: 'https://fr.wikipedia.org/wiki/Nintendo_64' },
  },
  {
    id: 'gaming-033',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En quelle année Nintendo a-t-il lancé la GameCube au Japon ?',
    choices: ['2000', '2001', '2002', '2003'],
    answerIndex: 1,
    explanation:
      'La GameCube est lancée par Nintendo en septembre 2001 au Japon. Elle succède à la Nintendo 64 et utilise des mini-disques optiques.',
    source: { label: 'Wikipédia : GameCube', url: 'https://fr.wikipedia.org/wiki/GameCube' },
  },
  {
    id: 'gaming-034',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle console portable de Nintendo, sortie en 2004, possède deux écrans ?',
    choices: ['La Game Boy Advance', 'La Nintendo 3DS', 'La Nintendo DS', 'La Game Boy Color'],
    answerIndex: 2,
    explanation:
      'La Nintendo DS, sortie fin 2004, possède deux écrans dont un tactile. Son nom signifie « Dual Screen ».',
    source: { label: 'Wikipédia : Nintendo DS', url: 'https://fr.wikipedia.org/wiki/Nintendo_DS' },
  },
  {
    id: 'gaming-035',
    type: 'true-false',
    difficulty: 'difficile',
    prompt: 'Vrai ou faux : Space Invaders (1978) a été créé par Namco.',
    answer: false,
    explanation:
      'Space Invaders a été conçu par Tomohiro Nishikado pour Taito, qui l’a sorti en 1978. Namco est l’éditeur de Pac-Man, sorti en 1980.',
    source: {
      label: 'Wikipédia : Space Invaders',
      url: 'https://fr.wikipedia.org/wiki/Space_Invaders',
    },
  },
  {
    id: 'gaming-036',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Comment s’appelle l’héroïne archéologue de la série Tomb Raider, apparue en 1996 ?',
    choices: ['Lara Croft', 'Samus Aran', 'Jill Valentine', 'Chun-Li'],
    answerIndex: 0,
    explanation:
      'Lara Croft est l’héroïne de Tomb Raider, dont le premier jeu sort en 1996. Il est développé par Core Design et édité par Eidos Interactive.',
    source: { label: 'Wikipédia : Tomb Raider', url: 'https://fr.wikipedia.org/wiki/Tomb_Raider' },
  },
  {
    id: 'gaming-037',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel éditeur est à l’origine de Grand Theft Auto V, sorti en 2013 ?',
    choices: ['Ubisoft', 'Electronic Arts', 'Bethesda', 'Rockstar Games'],
    answerIndex: 3,
    explanation:
      'Grand Theft Auto V est publié par Rockstar Games en septembre 2013 et développé par Rockstar North. Il se déroule dans la ville fictive de Los Santos.',
    source: {
      label: 'Wikipédia : Grand Theft Auto V',
      url: 'https://fr.wikipedia.org/wiki/Grand_Theft_Auto_V',
    },
  },
  {
    id: 'gaming-038',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel concepteur américain a créé la série The Sims, sortie en 2000 ?',
    choices: ['Peter Molyneux', 'Will Wright', 'Sid Meier', 'John Carmack'],
    answerIndex: 1,
    explanation:
      'Will Wright a conçu The Sims, un jeu de simulation de vie sorti en 2000 chez Maxis, édité par Electronic Arts. Il avait déjà créé SimCity en 1989.',
    source: { label: 'Wikipédia : Will Wright', url: 'https://fr.wikipedia.org/wiki/Will_Wright' },
  },
  {
    id: 'gaming-039',
    type: 'single',
    difficulty: 'facile',
    prompt: 'En quelle année Animal Crossing: New Horizons est-il sorti sur Nintendo Switch ?',
    choices: ['2018', '2019', '2020', '2021'],
    answerIndex: 2,
    explanation:
      'Animal Crossing: New Horizons est sorti en mars 2020 sur Nintendo Switch. Le jeu est publié par Nintendo.',
    source: {
      label: 'Wikipédia : Animal Crossing: New Horizons',
      url: 'https://fr.wikipedia.org/wiki/Animal_Crossing%3A_New_Horizons',
    },
  },
  {
    id: 'gaming-040',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Sony a d’abord travaillé avec Nintendo sur un projet de lecteur CD, avant de lancer sa propre PlayStation.',
    answer: true,
    explanation:
      'Au début des années 1990, Sony et Nintendo ont collaboré sur un lecteur CD pour la Super Nintendo. Le projet a été abandonné et Sony a développé sa propre console, la PlayStation, sortie en 1994.',
    source: { label: 'Wikipédia : PlayStation', url: 'https://fr.wikipedia.org/wiki/PlayStation' },
  },
  {
    id: 'gaming-041',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle entreprise a développé Fortnite, dont le mode Battle Royale est apparu en 2017 ?',
    choices: ['Valve', 'Riot Games', 'Activision', 'Epic Games'],
    answerIndex: 3,
    explanation:
      'Fortnite est développé par Epic Games, qui est aussi à l’origine du moteur Unreal Engine. Le mode Battle Royale, gratuit, est lancé en septembre 2017.',
    source: { label: 'Wikipédia : Fortnite', url: 'https://fr.wikipedia.org/wiki/Fortnite' },
  },
  {
    id: 'gaming-042',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle entreprise a créé League of Legends, sorti en 2009 ?',
    choices: ['Riot Games', 'Blizzard', 'Valve', 'Hi-Rez Studios'],
    answerIndex: 0,
    explanation:
      'League of Legends est développé et édité par Riot Games et sort en 2009 sur PC. Il est devenu l’un des jeux majeurs de l’e-sport mondial.',
    source: {
      label: 'Wikipédia : League of Legends',
      url: 'https://fr.wikipedia.org/wiki/League_of_Legends',
    },
  },
  {
    id: 'gaming-043',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Dans quel pays StarCraft, sorti en 1998, est-il devenu un phénomène d’e-sport diffusé à la télévision ?',
    choices: ['Le Japon', 'La Corée du Sud', 'Le Brésil', 'La Suède'],
    answerIndex: 1,
    explanation:
      'StarCraft, créé par Blizzard en 1998, a connu un succès considérable en Corée du Sud. Des ligues professionnelles y ont été diffusées à la télévision.',
    source: { label: 'Wikipédia : StarCraft', url: 'https://fr.wikipedia.org/wiki/StarCraft' },
  },
  {
    id: 'gaming-044',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Twitch, plateforme de streaming de jeux vidéo lancée en 2011, est issue de quel site ?',
    choices: ['YouTube', 'Ustream', 'Justin.tv', 'Mixer'],
    answerIndex: 2,
    explanation:
      'Twitch est lancée en 2011 comme une branche consacrée aux jeux vidéo de Justin.tv. Amazon l’a rachetée en 2014.',
    source: { label: 'Wikipédia : Twitch', url: 'https://fr.wikipedia.org/wiki/Twitch' },
  },
  {
    id: 'gaming-045',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Super Mario Bros. est sorti en 1985 d’abord sur la Game Boy.',
    answer: false,
    explanation:
      'Super Mario Bros. est sorti en 1985 sur la Famicom puis sur la NES. La Game Boy n’est apparue qu’en 1989.',
    source: {
      label: 'Wikipédia : Super Mario Bros.',
      url: 'https://fr.wikipedia.org/wiki/Super_Mario_Bros.',
    },
  },
  {
    id: 'gaming-046',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Sur quel ordinateur des étudiants du MIT ont-ils programmé le jeu Spacewar! en 1962 ?',
    choices: ['L’IBM 704', 'L’Apple II', 'L’Altair 8800', 'Le PDP-1'],
    answerIndex: 3,
    explanation:
      'Spacewar! a été programmé en 1962 au MIT, notamment par Steve Russell, sur un ordinateur PDP-1 de Digital Equipment Corporation. Il est l’un des premiers jeux vidéo.',
    source: { label: 'Wikipédia : Spacewar!', url: 'https://fr.wikipedia.org/wiki/Spacewar%21' },
  },
  {
    id: 'gaming-047',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle console, commercialisée en 1972 aux États-Unis, est considérée comme la première console de jeux vidéo de salon ?',
    choices: [
      'La Magnavox Odyssey',
      'La Pong d’Atari',
      'La Fairchild Channel F',
      'L’Intellivision',
    ],
    answerIndex: 0,
    explanation:
      'La Magnavox Odyssey sort en 1972 et repose sur les travaux de l’ingénieur Ralph Baer. Elle précède de plusieurs années l’Atari 2600.',
    source: {
      label: 'Wikipédia : Magnavox Odyssey',
      url: 'https://fr.wikipedia.org/wiki/Magnavox_Odyssey',
    },
  },
  {
    id: 'gaming-048',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'En quelle année la console Atari 2600, alors nommée Video Computer System, est-elle sortie aux États-Unis ?',
    choices: ['1975', '1976', '1977', '1980'],
    answerIndex: 2,
    explanation:
      'Atari lance son Video Computer System (VCS), plus tard rebaptisé Atari 2600, en 1977. Elle utilise des cartouches interchangeables.',
    source: { label: 'Wikipédia : Atari 2600', url: 'https://fr.wikipedia.org/wiki/Atari_2600' },
  },
  {
    id: 'gaming-049',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Dans quel jeu d’arcade de 1981 Mario fait-il sa première apparition ?',
    choices: ['Pac-Man', 'Donkey Kong', 'Mario Bros.', 'Space Invaders'],
    answerIndex: 1,
    explanation:
      'Mario apparaît pour la première fois dans Donkey Kong, sorti par Nintendo en 1981 et conçu par Shigeru Miyamoto. Il y est alors nommé Jumpman.',
    source: { label: 'Wikipédia : Donkey Kong', url: 'https://fr.wikipedia.org/wiki/Donkey_Kong' },
  },
  {
    id: 'gaming-050',
    type: 'true-false',
    difficulty: 'difficile',
    prompt: 'Vrai ou faux : Counter-Strike est né comme une modification du jeu Half-Life.',
    answer: true,
    explanation:
      'Counter-Strike est d’abord une modification de Half-Life créée par Minh Le et Jess Cliffe, dont la première version date de 1999. Valve l’a ensuite repris comme jeu à part entière.',
    source: {
      label: 'Wikipédia : Counter-Strike',
      url: 'https://fr.wikipedia.org/wiki/Counter-Strike',
    },
  },
  {
    id: 'gaming-051',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel jeu de combat d’arcade de 1992, édité par Midway, est célèbre pour ses « Fatalities » ?',
    choices: ['Street Fighter II', 'Tekken', 'Killer Instinct', 'Mortal Kombat'],
    answerIndex: 3,
    explanation:
      'Mortal Kombat est créé par Ed Boon et John Tobias et édité par Midway en 1992. Il a marqué les débats sur la classification des jeux vidéo.',
    source: {
      label: 'Wikipédia : Mortal Kombat',
      url: 'https://fr.wikipedia.org/wiki/Mortal_Kombat',
    },
  },
  {
    id: 'gaming-052',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Quel créateur américain a conçu Prince of Persia, sorti en 1989 sur Apple II ?',
    choices: ['Jordan Mechner', 'Sid Meier', 'Richard Garriott', 'Roberta Williams'],
    answerIndex: 0,
    explanation:
      'Jordan Mechner a créé Prince of Persia, publié par Broderbund en 1989 sur Apple II. Le jeu est connu pour ses animations réalistes.',
    source: {
      label: 'Wikipédia : Prince of Persia',
      url: 'https://fr.wikipedia.org/wiki/Prince_of_Persia',
    },
  },
  {
    id: 'gaming-053',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Dans quelle région française l’éditeur Ubisoft a-t-il été fondé en 1986 ?',
    choices: ['La Normandie', 'La Bretagne', 'L’Occitanie', 'L’Alsace'],
    answerIndex: 1,
    explanation:
      'Ubisoft a été fondée en 1986 en Bretagne par les cinq frères Guillemot, notamment Yves Guillemot. Le groupe est aujourd’hui l’un des grands éditeurs mondiaux.',
    source: { label: 'Wikipédia : Ubisoft', url: 'https://fr.wikipedia.org/wiki/Ubisoft' },
  },
  {
    id: 'gaming-054',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel studio français a développé Alone in the Dark, jeu de 1992 souvent considéré comme un précurseur du survival horror ?',
    choices: ['Ubisoft', 'Cryo Interactive', 'Infogrames', 'Delphine Software'],
    answerIndex: 2,
    explanation:
      'Alone in the Dark est développé par Infogrames et sort en 1992 sur PC, sous la direction de Frédérick Raynal. Il est souvent cité comme un précurseur du survival horror.',
    source: {
      label: 'Wikipédia : Alone in the Dark',
      url: 'https://fr.wikipedia.org/wiki/Alone_in_the_Dark',
    },
  },
  {
    id: 'gaming-055',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : Microsoft a commercialisé en 2018 une manette conçue pour les joueurs ayant un handicap moteur.',
    answer: true,
    explanation:
      'La Xbox Adaptive Controller, sortie en 2018, est une manette modulable pour les joueurs à mobilité réduite. Elle se branche à des boutons et accessoires externes.',
    source: { label: 'Wikipédia : Xbox', url: 'https://fr.wikipedia.org/wiki/Xbox' },
  },
  {
    id: 'gaming-056',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel réglage d’accessibilité aide les joueurs atteints de daltonisme à distinguer les éléments à l’écran ?',
    choices: [
      'Les sous-titres',
      'La réduction des vibrations',
      'Le remappage des touches',
      'Le mode daltonien',
    ],
    answerIndex: 3,
    explanation:
      'Un mode daltonien modifie les couleurs ou ajoute des repères visuels pour que le daltonisme ne gêne pas le jeu. Le daltonisme est une particularité de la vision des couleurs qui touche surtout les hommes.',
    source: { label: 'Wikipédia : Daltonisme', url: 'https://fr.wikipedia.org/wiki/Daltonisme' },
  },
  {
    id: 'gaming-057',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel jeu de Naughty Dog, sorti en 2020 sur PlayStation 4, a été salué pour son très grand nombre d’options d’accessibilité ?',
    choices: ['The Last of Us Part II', 'Uncharted 4', 'Ghost of Tsushima', 'Marvel’s Spider-Man'],
    answerIndex: 0,
    explanation:
      'The Last of Us Part II, développé par Naughty Dog et sorti en juin 2020, a été salué pour ses nombreuses options d’accessibilité, destinées aux joueurs ayant un handicap visuel, auditif ou moteur.',
    source: {
      label: 'Wikipédia : The Last of Us Part II',
      url: 'https://fr.wikipedia.org/wiki/The_Last_of_Us_Part_II',
    },
  },
  {
    id: 'gaming-058',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel studio japonais a développé Gran Turismo, jeu de course sorti en 1997 sur PlayStation ?',
    choices: ['Turn 10 Studios', 'Polyphony Digital', 'Criterion Games', 'Codemasters'],
    answerIndex: 1,
    explanation:
      'Gran Turismo est créé par Kazunori Yamauchi et son équipe de Polyphony Digital, alors rattachée à Sony. Le premier jeu sort en 1997 sur PlayStation.',
    source: {
      label: 'Wikipédia : Gran Turismo',
      url: 'https://fr.wikipedia.org/wiki/Gran_Turismo',
    },
  },
  {
    id: 'gaming-059',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle entreprise a développé Pokémon GO, application de réalité augmentée sortie en 2016 ?',
    choices: ['Game Freak', 'Ubisoft', 'Niantic', 'Zynga'],
    answerIndex: 2,
    explanation:
      'Pokémon GO est développé par Niantic, en partenariat avec The Pokémon Company et Nintendo, et sort en juillet 2016 sur mobiles. Il invite les joueurs à capturer des Pokémon dans le monde réel.',
    source: {
      label: 'Wikipédia : Pokémon Go',
      url: 'https://fr.wikipedia.org/wiki/Pok%C3%A9mon_Go',
    },
  },
  {
    id: 'gaming-060',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : Lara Croft est apparue pour la première fois en 1996 sur Nintendo 64.',
    answer: false,
    explanation:
      'Le premier Tomb Raider sort en 1996 sur PlayStation, Sega Saturn et PC, mais pas sur Nintendo 64. Il est développé par Core Design.',
    source: { label: 'Wikipédia : Tomb Raider', url: 'https://fr.wikipedia.org/wiki/Tomb_Raider' },
  },
] as const satisfies readonly Question[];

export default questions;
