import type { Question } from '../quiz.types';

export const questions = [
  {
    id: 'web-001',
    type: 'true-false',
    difficulty: 'difficile',
    prompt:
      'Vrai ou faux : TypeScript effectue la vérification des types à l’exécution dans le navigateur.',
    answer: false,
    explanation:
      'TypeScript vérifie les types à la compilation, puis les efface lors de la génération du JavaScript. Le navigateur exécute du JavaScript sans aucune information de type.',
    source: { label: 'Wikipédia : TypeScript', url: 'https://fr.wikipedia.org/wiki/TypeScript' },
  },
  {
    id: 'web-002',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Que signifie le sigle CSS dans le développement web ?',
    choices: [
      'Creative Style System',
      'Cascading Style Sheets',
      'Computed Style Syntax',
      'Coded Styling Standard',
    ],
    answerIndex: 1,
    explanation:
      'CSS signifie Cascading Style Sheets, en français feuilles de style en cascade. Ce langage décrit la présentation d’un document HTML.',
    source: { label: 'MDN : CSS', url: 'https://developer.mozilla.org/fr/docs/Web/CSS' },
  },
  {
    id: 'web-003',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Que renvoie la méthode Array.prototype.map en JavaScript ?',
    choices: [
      'Le tableau d’origine modifié sur place',
      'Un nouveau tableau contenant le résultat de la fonction appliquée à chaque élément',
      'Le premier élément satisfaisant la condition',
      'La somme de tous les éléments',
    ],
    answerIndex: 1,
    explanation:
      'La méthode map crée un nouveau tableau dont chaque élément est le résultat de la fonction de rappel appliquée à l’élément correspondant. Le tableau d’origine n’est pas modifié.',
    source: {
      label: 'MDN : Array.prototype.map',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    },
  },
  {
    id: 'web-004',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Que signifie le sigle HTML ?',
    choices: [
      'HyperText Markup Language',
      'High Transfer Markup Language',
      'HyperText Management Layer',
      'Hyperlink and Text Markup Logic',
    ],
    answerIndex: 0,
    explanation:
      'HTML signifie HyperText Markup Language. C’est le langage de balisage qui décrit la structure et le sens du contenu d’une page web.',
    source: { label: 'MDN : HTML', url: 'https://developer.mozilla.org/fr/docs/Web/HTML' },
  },
  {
    id: 'web-005',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Que signifie le code de statut HTTP 304 ?',
    choices: [
      'La ressource a été déplacée définitivement',
      'Le serveur est temporairement indisponible',
      'La ressource n’a pas été modifiée depuis la dernière version en cache',
      'Le client n’est pas authentifié',
    ],
    answerIndex: 2,
    explanation:
      'Le code 304 Not Modified indique au client qu’il peut réutiliser sa version en cache, car la ressource n’a pas changé. La réponse ne contient pas de corps.',
    source: {
      label: 'MDN : 304 Not Modified',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status/304',
    },
  },
  {
    id: 'web-006',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'À quoi sert l’en-tête HTTP Strict-Transport-Security (HSTS) ?',
    choices: [
      'À forcer le navigateur à vider son cache',
      'À limiter le nombre de requêtes par minute',
      'À autoriser le partage de ressources entre origines',
      'À indiquer au navigateur de n’utiliser que HTTPS pour accéder au site',
    ],
    answerIndex: 3,
    explanation:
      'HSTS demande au navigateur de n’utiliser que HTTPS pour ce site pendant la durée indiquée par max-age. Il empêche les attaques de rétrogradation vers HTTP.',
    source: {
      label: 'MDN : Strict-Transport-Security',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security',
    },
  },
  {
    id: 'web-007',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Que fait l’attribut defer sur une balise script externe ?',
    choices: [
      'Le script est exécuté dès que possible, dans un ordre quelconque',
      'Le script est téléchargé en parallèle puis exécuté après l’analyse du document, dans l’ordre des balises',
      'Le script est exécuté uniquement lors du premier clic',
      'Le script bloque l’analyse du HTML jusqu’à son exécution',
    ],
    answerIndex: 1,
    explanation:
      'Avec defer, le script est téléchargé sans bloquer l’analyse du HTML, puis exécuté une fois le document analysé, en respectant l’ordre d’apparition des scripts defer. L’attribut async, lui, n’offre aucune garantie d’ordre.',
    source: {
      label: 'MDN : l’élément script',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/script',
    },
  },
  {
    id: 'web-008',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : un élément button natif peut recevoir le focus et être activé au clavier sans code supplémentaire.',
    answer: true,
    explanation:
      'Un élément button natif est focusable avec la touche Tab et s’active avec Entrée ou Espace. Un simple div cliquable n’offre pas ce comportement sans attributs et scripts supplémentaires.',
    source: {
      label: 'MDN : l’élément button',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/button',
    },
  },
  {
    id: 'web-009',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle propriété CSS définit l’espace situé à l’intérieur d’un élément, entre son contenu et sa bordure ?',
    choices: ['padding', 'margin', 'gap', 'border-spacing'],
    answerIndex: 0,
    explanation:
      'La propriété padding définit les marges intérieures d’un élément, entre son contenu et sa bordure. La propriété margin règle au contraire l’espace extérieur.',
    source: {
      label: 'MDN : la propriété padding',
      url: 'https://developer.mozilla.org/fr/docs/Web/CSS/padding',
    },
  },
  {
    id: 'web-010',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Dans un navigateur, après l’exécution du code synchrone, lequel de ces rappels s’exécute en premier : celui d’un Promise.then déjà résolu ou celui d’un setTimeout avec un délai de 0 ms ?',
    choices: [
      'Celui de setTimeout, car un délai de 0 ms est immédiat',
      'L’ordre est laissé libre à chaque navigateur par la spécification',
      'Celui de Promise.then, car les microtâches passent avant les macrotâches',
      'Les deux en parallèle sur deux threads distincts',
    ],
    answerIndex: 2,
    explanation:
      'La boucle d’événements vide la file des microtâches, où se trouvent les rappels de promesses, avant de traiter la tâche suivante comme celle d’un setTimeout. Le rappel de Promise.then s’exécute donc avant celui de setTimeout, même à 0 ms.',
    source: {
      label: 'MDN : la boucle d’événements (en anglais)',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
    },
  },
  {
    id: 'web-011',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Que se passe-t-il en JavaScript si on lit une variable déclarée avec let avant la ligne de sa déclaration, dans le même bloc ?',
    choices: [
      'Une ReferenceError est levée',
      'La valeur undefined est renvoyée',
      'La valeur null est renvoyée',
      'La variable est créée automatiquement',
    ],
    answerIndex: 0,
    explanation:
      'Une variable let est dans la zone morte temporelle entre le début du bloc et sa déclaration. La lire à ce moment-là lève une ReferenceError, contrairement à var qui renvoie undefined.',
    source: {
      label: 'MDN : l’instruction let',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/let',
    },
  },
  {
    id: 'web-012',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle balise HTML sémantique est destinée à regrouper les liens de navigation principaux d’une page ?',
    choices: ['La balise section', 'La balise nav', 'La balise aside', 'La balise menu'],
    answerIndex: 1,
    explanation:
      'La balise nav représente une section contenant des liens de navigation principaux. Sa sémantique permet aux technologies d’assistance de la repérer comme point de repère.',
    source: {
      label: 'MDN : l’élément nav',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/nav',
    },
  },
  {
    id: 'web-013',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Qui est reconnu comme l’inventeur du World Wide Web, proposé en 1989 au CERN ?',
    choices: ['Vint Cerf', 'Brendan Eich', 'Tim Berners-Lee', 'Linus Torvalds'],
    answerIndex: 2,
    explanation:
      'Tim Berners-Lee a proposé le World Wide Web en 1989 alors qu’il travaillait au CERN. Il a défini les bases de l’URL, du HTTP et du HTML.',
    source: {
      label: 'Wikipédia : Tim Berners-Lee',
      url: 'https://fr.wikipedia.org/wiki/Tim_Berners-Lee',
    },
  },
  {
    id: 'web-014',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Que signifie un code de statut HTTP 500 ?',
    choices: [
      'Un accès interdit',
      'Une redirection permanente',
      'Une erreur interne du serveur',
      'Une requête réussie',
    ],
    answerIndex: 2,
    explanation:
      'Le code 500 Internal Server Error indique que le serveur a rencontré une situation inattendue qu’il ne sait pas gérer. Il s’agit d’une erreur côté serveur, pas côté client.',
    source: {
      label: 'MDN : 500 Internal Server Error',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status/500',
    },
  },
  {
    id: 'web-015',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quelle méthode HTTP le navigateur utilise-t-il pour la requête de pré-vérification (preflight) d’une requête CORS non simple ?',
    choices: ['HEAD', 'OPTIONS', 'GET', 'TRACE'],
    answerIndex: 1,
    explanation:
      'Avant certaines requêtes inter-origines, le navigateur envoie une requête OPTIONS de pré-vérification. Elle demande au serveur s’il autorise la méthode et les en-têtes prévus.',
    source: { label: 'MDN : CORS', url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/CORS' },
  },
  {
    id: 'web-016',
    type: 'single',
    difficulty: 'facile',
    prompt: 'À quoi sert l’attribut alt d’une balise img ?',
    choices: [
      'À définir la largeur de l’image',
      'À fournir un texte alternatif décrivant l’image',
      'À charger l’image en différé',
      'À ajouter une bordure autour de l’image',
    ],
    answerIndex: 1,
    explanation:
      'L’attribut alt fournit un texte de remplacement lu par les lecteurs d’écran et affiché si l’image ne se charge pas. Il est essentiel pour l’accessibilité.',
    source: {
      label: 'MDN : l’élément img',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/img',
    },
  },
  {
    id: 'web-017',
    type: 'true-false',
    difficulty: 'facile',
    prompt:
      'Vrai ou faux : HTML décrit la structure d’une page web, tandis que CSS décrit sa présentation.',
    answer: true,
    explanation:
      'HTML structure et donne du sens au contenu avec des balises, alors que CSS en contrôle l’apparence : couleurs, polices, marges et mise en page.',
    source: { label: 'MDN : CSS', url: 'https://developer.mozilla.org/fr/docs/Web/CSS' },
  },
  {
    id: 'web-018',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quelle est la spécificité CSS du sélecteur a.nav:hover, exprimée sous la forme (identifiants, classes et pseudo-classes, types) ?',
    choices: ['(0,2,1)', '(0,1,2)', '(1,1,0)', '(0,3,0)'],
    answerIndex: 0,
    explanation:
      'Le sélecteur contient un type (a), une classe (.nav) et une pseudo-classe (:hover). Classes et pseudo-classes comptent dans la même colonne, ce qui donne (0,2,1).',
    source: {
      label: 'MDN : la spécificité CSS',
      url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascade/Specificity',
    },
  },
  {
    id: 'web-019',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Quel en-tête de réponse HTTP indique aux caches quels en-têtes de requête ont influencé le contenu renvoyé ?',
    choices: ['Etag', 'Age', 'Via', 'Vary'],
    answerIndex: 3,
    explanation:
      'L’en-tête Vary liste les en-têtes de requête, comme Accept-Encoding, utilisés pour choisir la réponse. Les caches s’en servent pour ne réutiliser une réponse que pour des requêtes équivalentes.',
    source: {
      label: 'MDN : l’en-tête Vary',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Vary',
    },
  },
  {
    id: 'web-020',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel attribut d’une balise label permet de l’associer à un champ de formulaire donné ?',
    choices: [
      'for, qui reprend l’identifiant du champ',
      'href, qui reprend le nom du champ',
      'rel, qui reprend le type du champ',
      'name, qui reprend la valeur du champ',
    ],
    answerIndex: 0,
    explanation:
      'L’attribut for d’un label doit contenir la valeur de l’attribut id du champ associé. Cette association permet de cliquer sur le libellé pour activer le champ et aide les lecteurs d’écran.',
    source: {
      label: 'MDN : l’élément label',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/label',
    },
  },
  {
    id: 'web-021',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle propriété CSS permet de définir la couleur du texte d’un élément ?',
    choices: ['font-color', 'text-color', 'foreground', 'color'],
    answerIndex: 3,
    explanation:
      'La propriété CSS color définit la couleur de premier plan du texte et des décorations de texte d’un élément. Les noms font-color et text-color n’existent pas en CSS.',
    source: {
      label: 'MDN : la propriété color',
      url: 'https://developer.mozilla.org/fr/docs/Web/CSS/color',
    },
  },
  {
    id: 'web-022',
    type: 'true-false',
    difficulty: 'difficile',
    prompt:
      'Vrai ou faux : le code de statut HTTP 308 impose de conserver la méthode et le corps de la requête lors de la redirection permanente.',
    answer: true,
    explanation:
      'Le code 308 Permanent Redirect interdit de changer la méthode HTTP lors de la redirection. Pour un 301, certains clients transforment un POST en GET.',
    source: {
      label: 'MDN : 308 Permanent Redirect',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status/308',
    },
  },
  {
    id: 'web-023',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quelle est la portée d’une variable déclarée avec let en JavaScript ?',
    choices: [
      'Toute la fonction englobante',
      'Toujours l’objet global',
      'Uniquement le fichier courant',
      'Le bloc dans lequel elle est déclarée',
    ],
    answerIndex: 3,
    explanation:
      'Une variable déclarée avec let a une portée de bloc : elle n’existe que dans les accolades qui la contiennent. Une variable var a au contraire une portée de fonction.',
    source: {
      label: 'MDN : l’instruction let',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/let',
    },
  },
  {
    id: 'web-024',
    type: 'true-false',
    difficulty: 'difficile',
    prompt: 'Vrai ou faux : en JavaScript, Object.is(NaN, NaN) renvoie true.',
    answer: true,
    explanation:
      'Object.is utilise la comparaison SameValue, qui considère NaN égal à NaN. À l’inverse, NaN === NaN vaut false.',
    source: {
      label: 'MDN : Object.is',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/is',
    },
  },
  {
    id: 'web-025',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : JavaScript est une version simplifiée du langage Java.',
    answer: false,
    explanation:
      'JavaScript et Java sont deux langages distincts, avec des syntaxes, des modèles d’exécution et des usages différents. Le nom JavaScript est surtout un choix commercial de la fin des années 1990.',
    source: { label: 'Wikipédia : JavaScript', url: 'https://fr.wikipedia.org/wiki/JavaScript' },
  },
  {
    id: 'web-026',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel ingénieur a créé le langage JavaScript en 1995 chez Netscape ?',
    choices: ['Tim Berners-Lee', 'Anders Hejlsberg', 'James Gosling', 'Brendan Eich'],
    answerIndex: 3,
    explanation:
      'Brendan Eich a conçu JavaScript en 1995 pour le navigateur Netscape Navigator. Anders Hejlsberg est lié à TypeScript et James Gosling à Java.',
    source: {
      label: 'Wikipédia : Brendan Eich',
      url: 'https://fr.wikipedia.org/wiki/Brendan_Eich',
    },
  },
  {
    id: 'web-027',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Selon les WCAG, quel est le rapport de contraste minimal exigé au niveau AA pour un texte de taille normale ?',
    choices: ['2:1', '3:1', '7:1', '4,5:1'],
    answerIndex: 3,
    explanation:
      'Le critère 1.4.3 des WCAG exige un rapport de contraste d’au moins 4,5:1 au niveau AA pour le texte normal. Le niveau AAA exige 7:1, et le texte de grande taille 3:1 au niveau AA.',
    source: {
      label: 'W3C : WCAG 2.1, contraste minimum',
      url: 'https://www.w3.org/TR/WCAG21/#contrast-minimum',
    },
  },
  {
    id: 'web-028',
    type: 'true-false',
    difficulty: 'moyen',
    prompt: 'Vrai ou faux : en JavaScript, l’expression 0.1 + 0.2 est strictement égale à 0.3.',
    answer: false,
    explanation:
      'Le résultat de 0.1 + 0.2 vaut 0.30000000000000004, car les nombres JavaScript sont des flottants binaires IEEE 754 à double précision. Certaines décimales ne s’y représentent pas exactement.',
    source: {
      label: 'MDN : le type Number',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number',
    },
  },
  {
    id: 'web-029',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Parmi ces types de sélecteurs CSS, lequel a la spécificité la plus élevée ?',
    choices: [
      'Un sélecteur de type',
      'Un sélecteur universel',
      'Un sélecteur d’identifiant',
      'Un sélecteur de classe',
    ],
    answerIndex: 2,
    explanation:
      'En CSS, un sélecteur d’identifiant l’emporte sur un sélecteur de classe, lui-même plus spécifique qu’un sélecteur de type. Le sélecteur universel n’ajoute aucune spécificité.',
    source: {
      label: 'MDN : la spécificité CSS',
      url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascade/Specificity',
    },
  },
  {
    id: 'web-030',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Selon les seuils officiels des Core Web Vitals, quelle valeur d’INP (Interaction to Next Paint) est considérée comme bonne ?',
    choices: [
      '50 millisecondes ou moins',
      '500 millisecondes ou moins',
      '200 millisecondes ou moins',
      '1 seconde ou moins',
    ],
    answerIndex: 2,
    explanation:
      'Un INP de 200 millisecondes ou moins est considéré comme bon. Entre 200 et 500 ms, il nécessite des améliorations, et au-delà de 500 ms il est mauvais.',
    source: { label: 'web.dev : Interaction to Next Paint', url: 'https://web.dev/articles/inp' },
  },
  {
    id: 'web-031',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel code de statut HTTP indique qu’une ressource a été déplacée de façon permanente vers une autre URL ?',
    choices: ['200', '301', '404', '503'],
    answerIndex: 1,
    explanation:
      'Le code 301 Moved Permanently indique que la ressource a une nouvelle URL permanente, fournie dans l’en-tête Location. Les moteurs de recherche transfèrent alors l’indexation vers la nouvelle adresse.',
    source: {
      label: 'MDN : 301 Moved Permanently',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status/301',
    },
  },
  {
    id: 'web-032',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Avec la valeur border-box pour la propriété CSS box-sizing, que comprend la largeur définie par width ?',
    choices: [
      'Le contenu, le padding et la bordure',
      'Le contenu seul',
      'Le contenu et la marge extérieure',
      'Le padding et la marge seulement',
    ],
    answerIndex: 0,
    explanation:
      'Avec box-sizing: border-box, width et height incluent le contenu, le padding et la bordure, mais pas la marge. Avec content-box, ils ne s’appliquent qu’au contenu.',
    source: {
      label: 'MDN : la propriété box-sizing',
      url: 'https://developer.mozilla.org/fr/docs/Web/CSS/box-sizing',
    },
  },
  {
    id: 'web-033',
    type: 'true-false',
    difficulty: 'difficile',
    prompt:
      'Vrai ou faux : l’en-tête Cache-Control: no-cache interdit au navigateur de stocker la réponse.',
    answer: false,
    explanation:
      'La directive no-cache autorise le stockage mais impose de revalider la réponse auprès du serveur avant de la réutiliser. C’est la directive no-store qui interdit le stockage.',
    source: {
      label: 'MDN : l’en-tête Cache-Control',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Cache-Control',
    },
  },
  {
    id: 'web-034',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel mot-clé JavaScript déclare une variable dont la liaison ne peut pas être réaffectée ?',
    choices: ['var', 'let', 'static', 'const'],
    answerIndex: 3,
    explanation:
      'Une déclaration const crée une liaison en lecture seule : on ne peut pas lui réaffecter une autre valeur. Elle a une portée de bloc, comme let.',
    source: {
      label: 'MDN : l’instruction const',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/const',
    },
  },
  {
    id: 'web-035',
    type: 'single',
    difficulty: 'facile',
    prompt: 'En JavaScript, quel est le résultat de l’expression 2 + "2" ?',
    choices: ['Le nombre 4', 'La chaîne de caractères 22', 'NaN', 'Une erreur'],
    answerIndex: 1,
    explanation:
      'L’opérateur + effectue une concaténation dès qu’un des opérandes est une chaîne : le nombre 2 est converti en chaîne et le résultat est 22 sous forme de texte.',
    source: {
      label: 'MDN : opérateur d’addition',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Addition',
    },
  },
  {
    id: 'web-036',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Quel est le port TCP par défaut utilisé par HTTPS ?',
    choices: ['80', '443', '8080', '21'],
    answerIndex: 1,
    explanation:
      'Le port TCP par défaut de HTTPS est 443, alors que HTTP utilise le port 80. Le navigateur utilise ces valeurs lorsqu’aucun port n’est indiqué dans l’URL.',
    source: { label: 'Wikipédia : HTTPS', url: 'https://fr.wikipedia.org/wiki/HTTPS' },
  },
  {
    id: 'web-037',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle balise HTML représente un titre de niveau le plus élevé dans la hiérarchie des titres ?',
    choices: ['h6', 'header', 'h1', 'head'],
    answerIndex: 2,
    explanation:
      'La balise h1 représente le titre de niveau 1, le plus important, alors que h6 est le moins important. Les niveaux de titre structurent le document pour les utilisateurs et les technologies d’assistance.',
    source: {
      label: 'MDN : éléments de titre',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/Heading_Elements',
    },
  },
  {
    id: 'web-038',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : un cookie marqué HttpOnly ne peut pas être lu par JavaScript via document.cookie.',
    answer: true,
    explanation:
      'L’attribut HttpOnly interdit l’accès au cookie depuis les scripts. Il limite ainsi le vol de cookies de session en cas de faille XSS, sans empêcher son envoi avec les requêtes HTTP.',
    source: {
      label: 'MDN : l’en-tête Set-Cookie',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Set-Cookie',
    },
  },
  {
    id: 'web-039',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel en-tête HTTP permet à un site de restreindre les sources autorisées pour les scripts, styles et autres ressources chargés par une page ?',
    choices: ['Content-Security-Policy', 'X-Frame-Options', 'Accept-Language', 'Referrer-Policy'],
    answerIndex: 0,
    explanation:
      'L’en-tête Content-Security-Policy déclare les origines autorisées pour chaque type de ressource. Il réduit notamment l’impact des failles XSS en bloquant les scripts non autorisés.',
    source: {
      label: 'MDN : Content-Security-Policy',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Security-Policy',
    },
  },
  {
    id: 'web-040',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : Git et GitHub sont le même outil.',
    answer: false,
    explanation:
      'Git est un logiciel de gestion de versions décentralisé. GitHub est un service d’hébergement de dépôts Git qui y ajoute des fonctions collaboratives.',
    source: { label: 'Wikipédia : Git', url: 'https://fr.wikipedia.org/wiki/Git' },
  },
  {
    id: 'web-041',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'Que signifie le code de statut HTTP 204 ?',
    choices: [
      'La ressource a été créée',
      'La requête a réussi mais il n’y a aucun contenu à renvoyer',
      'La ressource n’a pas été modifiée',
      'La requête est en cours de traitement',
    ],
    answerIndex: 1,
    explanation:
      'Le code 204 No Content indique que la requête a réussi et que la réponse ne comporte pas de corps. Il est souvent utilisé après une mise à jour ou une suppression.',
    source: {
      label: 'MDN : 204 No Content',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status/204',
    },
  },
  {
    id: 'web-042',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Selon les seuils officiels des Core Web Vitals, quelle valeur de CLS (Cumulative Layout Shift) est considérée comme bonne ?',
    choices: ['0,1 ou moins', '0,5 ou moins', '1 ou moins', '2,5 ou moins'],
    answerIndex: 0,
    explanation:
      'Un CLS de 0,1 ou moins est considéré comme bon. Ce score mesure l’instabilité visuelle de la page, c’est-à-dire les décalages inattendus de la mise en page.',
    source: { label: 'web.dev : Cumulative Layout Shift', url: 'https://web.dev/articles/cls' },
  },
  {
    id: 'web-043',
    type: 'single',
    difficulty: 'facile',
    prompt: 'À quoi sert principalement le DNS (Domain Name System) ?',
    choices: [
      'À traduire les noms de domaine en adresses IP',
      'À chiffrer les mots de passe des utilisateurs',
      'À compresser les images d’un site',
      'À héberger les fichiers d’un site web',
    ],
    answerIndex: 0,
    explanation:
      'Le DNS est un annuaire distribué qui associe un nom de domaine, comme exemple.fr, à des adresses IP. Le navigateur l’interroge avant d’ouvrir une connexion vers le serveur.',
    source: {
      label: 'Wikipédia : Domain Name System',
      url: 'https://fr.wikipedia.org/wiki/Domain_Name_System',
    },
  },
  {
    id: 'web-044',
    type: 'true-false',
    difficulty: 'facile',
    prompt: 'Vrai ou faux : le code de statut HTTP 200 signifie que la requête a réussi.',
    answer: true,
    explanation:
      'Le code 200 OK indique que la requête a été traitée avec succès. La réponse contient généralement la ressource demandée ou le résultat de l’action.',
    source: {
      label: 'MDN : 200 OK',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status/200',
    },
  },
  {
    id: 'web-045',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En CSS, l’unité rem est relative à quoi ?',
    choices: [
      'À la taille de police de l’élément parent',
      'À la hauteur de la fenêtre du navigateur',
      'À la taille de police de l’élément racine',
      'À la largeur de l’élément parent',
    ],
    answerIndex: 2,
    explanation:
      'L’unité rem est relative à la taille de police de l’élément racine, c’est-à-dire html. L’unité em, elle, dépend de la taille de police de l’élément courant.',
    source: {
      label: 'MDN : les unités de longueur CSS',
      url: 'https://developer.mozilla.org/fr/docs/Web/CSS/length',
    },
  },
  {
    id: 'web-046',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Selon les seuils officiels des Core Web Vitals, à partir de quelle valeur le LCP (Largest Contentful Paint) est-il considéré comme bon ?',
    choices: [
      '1 seconde ou moins',
      '2,5 secondes ou moins',
      '4 secondes ou moins',
      '5 secondes ou moins',
    ],
    answerIndex: 1,
    explanation:
      'Un LCP est jugé bon lorsqu’il est de 2,5 secondes ou moins, mesuré au 75e centile des chargements de page. Au-delà de 4 secondes, il est considéré comme mauvais.',
    source: { label: 'web.dev : Largest Contentful Paint', url: 'https://web.dev/articles/lcp' },
  },
  {
    id: 'web-047',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quel code de statut HTTP signifie que la ressource demandée est introuvable ?',
    choices: ['200', '301', '404', '503'],
    answerIndex: 2,
    explanation:
      'Le code 404 Not Found indique que le serveur ne trouve pas la ressource demandée. Il ne dit pas si l’absence est temporaire ou définitive.',
    source: {
      label: 'MDN : 404 Not Found',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status/404',
    },
  },
  {
    id: 'web-048',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'À quoi sert l’attribut integrity d’une balise script chargeant une ressource depuis un CDN ?',
    choices: [
      'À compresser le fichier pendant le transfert',
      'À autoriser le script à accéder aux cookies',
      'À vérifier que le fichier reçu correspond à une empreinte cryptographique attendue',
      'À accélérer l’exécution du script',
    ],
    answerIndex: 2,
    explanation:
      'L’attribut integrity contient une empreinte (hash) de la ressource. Le navigateur refuse d’exécuter le fichier s’il ne correspond pas, ce qui protège contre une ressource altérée sur un CDN.',
    source: {
      label: 'MDN : Subresource Integrity',
      url: 'https://developer.mozilla.org/fr/docs/Web/Security/Subresource_Integrity',
    },
  },
  {
    id: 'web-049',
    type: 'single',
    difficulty: 'moyen',
    prompt: 'En JavaScript, que renvoie l’expression typeof null ?',
    choices: ['"null"', '"undefined"', '"number"', '"object"'],
    answerIndex: 3,
    explanation:
      'typeof null renvoie "object". C’est une particularité historique du langage conservée pour la compatibilité avec le code existant.',
    source: {
      label: 'MDN : l’opérateur typeof',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/typeof',
    },
  },
  {
    id: 'web-050',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Qu’est-ce que TypeScript ?',
    choices: [
      'Un sur-ensemble typé de JavaScript qui se compile en JavaScript',
      'Un moteur de rendu pour navigateurs',
      'Un framework CSS',
      'Un système de gestion de base de données',
    ],
    answerIndex: 0,
    explanation:
      'TypeScript ajoute un système de types statiques à JavaScript. Le code est vérifié à la compilation puis transformé en JavaScript standard.',
    source: { label: 'Wikipédia : TypeScript', url: 'https://fr.wikipedia.org/wiki/TypeScript' },
  },
  {
    id: 'web-051',
    type: 'single',
    difficulty: 'difficile',
    prompt:
      'Deux blocs voisins se suivent verticalement : le premier a margin-bottom de 20px et le second margin-top de 30px. Quel espace les sépare, en l’absence de bordure ou de padding ?',
    choices: [
      '50px, car les marges s’additionnent',
      '30px, car les marges verticales adjacentes fusionnent en gardant la plus grande',
      '20px, car la première marge l’emporte',
      '0px, car les marges s’annulent',
    ],
    answerIndex: 1,
    explanation:
      'Les marges verticales adjacentes de blocs en flux normal fusionnent : l’espace obtenu est la plus grande des deux, ici 30px. Ce mécanisme s’appelle l’effondrement des marges.',
    source: {
      label: 'MDN : la propriété margin',
      url: 'https://developer.mozilla.org/fr/docs/Web/CSS/margin',
    },
  },
  {
    id: 'web-052',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel attribut de cookie permet de limiter son envoi lors de requêtes provenant d’autres sites et ainsi de réduire les risques de CSRF ?',
    choices: ['Secure', 'Domain', 'SameSite', 'Path'],
    answerIndex: 2,
    explanation:
      'L’attribut SameSite contrôle si le cookie est envoyé avec des requêtes inter-sites. Les valeurs Lax et Strict limitent l’envoi et réduisent les risques d’attaques CSRF.',
    source: {
      label: 'MDN : l’en-tête Set-Cookie',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Set-Cookie',
    },
  },
  {
    id: 'web-053',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quelle méthode HTTP est utilisée par défaut par un navigateur pour récupérer une page lorsqu’on saisit une adresse dans la barre d’URL ?',
    choices: ['GET', 'POST', 'DELETE', 'PATCH'],
    answerIndex: 0,
    explanation:
      'GET demande la représentation d’une ressource sans en modifier l’état côté serveur. Le navigateur l’utilise pour charger une page à partir d’une URL.',
    source: {
      label: 'MDN : méthode GET',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Methods/GET',
    },
  },
  {
    id: 'web-054',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Dans Git, quelle commande enregistre dans l’historique un instantané des modifications indexées ?',
    choices: ['git push', 'git fetch', 'git clone', 'git commit'],
    answerIndex: 3,
    explanation:
      'git commit crée un nouveau commit contenant l’état des fichiers indexés, avec un message. git push, lui, envoie les commits vers un dépôt distant.',
    source: { label: 'Wikipédia : Git', url: 'https://fr.wikipedia.org/wiki/Git' },
  },
  {
    id: 'web-055',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle balise HTML crée un lien hypertexte vers une autre page ?',
    choices: ['La balise link', 'La balise href', 'La balise url', 'La balise a'],
    answerIndex: 3,
    explanation:
      'La balise a, associée à son attribut href, crée un lien hypertexte. La balise link sert à relier des ressources externes comme une feuille de style, et href est un attribut, pas une balise.',
    source: {
      label: 'MDN : l’élément a',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/a',
    },
  },
  {
    id: 'web-056',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel langage de programmation est exécuté nativement par les navigateurs web pour rendre les pages interactives ?',
    choices: ['Java', 'JavaScript', 'Python', 'PHP'],
    answerIndex: 1,
    explanation:
      'JavaScript est le langage de script exécuté nativement par les moteurs des navigateurs. Java, Python et PHP ne s’exécutent pas directement dans le navigateur.',
    source: {
      label: 'MDN : JavaScript',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
    },
  },
  {
    id: 'web-057',
    type: 'true-false',
    difficulty: 'moyen',
    prompt:
      'Vrai ou faux : le code de statut HTTP 401 signifie que le client est authentifié mais n’a pas le droit d’accéder à la ressource.',
    answer: false,
    explanation:
      'Le code 401 Unauthorized indique que le client n’est pas authentifié ou que ses identifiants sont invalides. Le cas d’un client authentifié sans droits correspond au code 403 Forbidden.',
    source: {
      label: 'MDN : 401 Unauthorized',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status/401',
    },
  },
  {
    id: 'web-058',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel code de statut HTTP indique qu’un client a envoyé trop de requêtes dans un laps de temps donné ?',
    choices: ['429', '408', '451', '502'],
    answerIndex: 0,
    explanation:
      'Le code 429 Too Many Requests signale que le client dépasse la limite de requêtes autorisée. Le serveur peut préciser le délai d’attente dans l’en-tête Retry-After.',
    source: {
      label: 'MDN : 429 Too Many Requests',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status/429',
    },
  },
  {
    id: 'web-059',
    type: 'single',
    difficulty: 'difficile',
    prompt: 'Comment une fonction fléchée détermine-t-elle la valeur de this en JavaScript ?',
    choices: [
      'Elle utilise toujours l’objet global',
      'Elle utilise l’objet sur lequel elle est appelée',
      'Elle utilise toujours undefined',
      'Elle reprend le this de la portée lexicale dans laquelle elle est définie',
    ],
    answerIndex: 3,
    explanation:
      'Une fonction fléchée n’a pas son propre this : elle capture celui du contexte englobant au moment de sa définition. Ce comportement ne change pas avec call, apply ou bind.',
    source: {
      label: 'MDN : les fonctions fléchées',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/Arrow_functions',
    },
  },
  {
    id: 'web-060',
    type: 'single',
    difficulty: 'facile',
    prompt:
      'Quel protocole chiffre les échanges entre un navigateur et un serveur web grâce à TLS ?',
    choices: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
    answerIndex: 2,
    explanation:
      'HTTPS est HTTP transporté au-dessus de TLS. Il assure la confidentialité, l’intégrité des échanges et l’authentification du serveur.',
    source: { label: 'Wikipédia : HTTPS', url: 'https://fr.wikipedia.org/wiki/HTTPS' },
  },
] as const satisfies readonly Question[];

export default questions;
