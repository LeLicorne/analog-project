export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

/** Source unique de la FAQ : affichée sur l'accueil et reprise telle quelle dans les données structurées. */
export const FAQ: readonly FaqEntry[] = [
  {
    question: 'Combien de questions y a-t-il par jour ?',
    answer:
      'Chaque jour, six quiz sont proposés (culture générale, histoire, géographie, sciences, web et code, gaming). Chaque quiz compte 5 questions, soit 30 questions par jour.',
  },
  {
    question: 'Faut-il un compte pour jouer ?',
    answer:
      'Non. Le jeu est gratuit et sans compte. Un compte facultatif permet de sauvegarder vos résultats et votre série de jours sur tous vos appareils.',
  },
  {
    question: 'Le quiz est-il le même pour tout le monde ?',
    answer:
      'Oui. Le quiz de chaque thème est tiré à partir de la date (fuseau horaire de Paris) : tous les joueurs ont les mêmes questions le même jour, et un nouveau quiz apparaît à minuit.',
  },
  {
    question: 'D’où viennent les réponses ?',
    answer:
      'Chaque question est accompagnée d’une explication et d’un lien vers une source (Wikipédia, MDN, W3C). Les liens sont vérifiés automatiquement avant chaque mise en ligne.',
  },
  {
    question: 'Y a-t-il une limite de temps ?',
    answer:
      'Non. Il n’y a aucun minuteur : vous répondez à votre rythme, ce qui rend le jeu utilisable avec un lecteur d’écran, au clavier ou avec un dispositif d’aide à la saisie.',
  },
];
