import questionBank from '../questions-pompidor.json';

export const themeDefinitions = [
  {
    key: 'all',
    label: 'Tout le quiz',
    description: 'La banque complète du programme, mélangée à chaque lancement.',
    sourceName: null,
  },
  {
    key: 'course',
    label: 'Cours de base',
    description: 'Le parcours pour apprendre le cours depuis zéro, dans l’ordre des notions essentielles.',
    sourceName: 'Cours de base',
  },
  {
    key: 'mean',
    label: 'MEAN',
    description: 'Architecture, référencement et rendu côté client.',
    sourceName: 'Architecture et MEAN',
  },
  {
    key: 'mongo',
    label: 'MongoDB',
    description: 'Shell, requêtes, opérateurs et import de données.',
    sourceName: 'MongoDB',
  },
  {
    key: 'node',
    label: 'Node & Express',
    description: 'Serveur, endpoints REST, CORS et JSON.',
    sourceName: 'Node.js et Express',
  },
  {
    key: 'web',
    label: 'HTML & CSS',
    description: 'Balises, attributs, formulaire et responsive design.',
    sourceName: 'Web client HTML CSS JS',
  },
  {
    key: 'js',
    label: 'JavaScript & DOM',
    description: 'Langage, événements, DOM, AJAX et données JSON.',
    sourceName: 'Web client HTML CSS JS',
  },
  {
    key: 'auth',
    label: 'JWT & Auth',
    description: 'Cookies, sécurité et authentification côté client.',
    sourceName: 'AJAX et JWT',
  },
  {
    key: 'angular',
    label: 'Angular',
    description: 'Composants, services, routes, formulaires et RxJS.',
    sourceName: 'Angular classique',
  },
  {
    key: 'angular21',
    label: 'Angular 21 / SSR',
    description: 'SSR, prerender, signaux et serveur intégré.',
    sourceName: 'Angular 21 CSR SSR',
  },
  {
    key: 'ecommerce',
    label: 'TP E-commerce',
    description: 'Base ECOMMERCE, fichiers JSON et panier.',
    sourceName: 'TP e-commerce',
  },
  {
    key: 'code',
    label: 'Code',
    description: 'Extraits concrets à écrire pour construire les morceaux du TP.',
    sourceName: 'Code',
  },
];

export function normalizeForComparison(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, "'")
    .replace(/[-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getAllQuestionsFromThemes(themesMap) {
  const seen = new Set();
  const questions = [];

  Object.values(themesMap || {}).forEach((themeQuestions) => {
    (themeQuestions || []).forEach((question) => {
      const key = `${question.question}||${question.answer}`;
      if (seen.has(key)) {
        return;
      }

      seen.add(key);
      questions.push(question);
    });
  });

  return questions;
}

export function buildThemes(allQuestions) {
  const themesMap = questionBank.themes || {};
  const courseSections = questionBank.course?.sections || [];

  return themeDefinitions
    .map((definition) => ({
      ...definition,
      questions:
        definition.key === 'all'
          ? allQuestions
          : definition.key === 'course'
            ? courseSections
          : themesMap[definition.sourceName] || [],
    }))
    .filter((theme) => theme.questions.length > 0);
}

export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

export function toleranceForLength(length) {
  if (length <= 4) return 0;
  if (length <= 8) return 1;
  if (length <= 18) return 2;
  if (length <= 35) return 3;
  return Math.max(4, Math.floor(length * 0.12));
}

export function buildOpenRouterKnowledgeBase({ themes, courseTitle, courseIntro, courseSections, allQuestions }) {
  const themeOverview = themes
    .filter((theme) => theme.key !== 'all')
    .map((theme) => `- ${theme.label}: ${theme.description} (${theme.questions.length} entrées)`)
    .join('\n');

  const courseOverview = courseSections
    .map((section, index) => {
      const bulletPoints = (section.keyPoints || []).map((point) => `    - ${point}`).join('\n');
      const checklist = (section.checklist || []).map((item) => `    - ${item}`).join('\n');

      return [
        `Section ${index + 1}: ${section.title}`,
        `  Objectif: ${section.goal}`,
        `  Points clés:`,
        bulletPoints || '    - Aucun',
        `  Exemple: ${section.example || 'Aucun'}`,
        `  Vérification:`,
        checklist || '    - Aucune',
      ].join('\n');
    })
    .join('\n\n');

  const quizEntries = (allQuestions || [])
    .map((item) => `- Q: ${item.question}\n  R: ${item.answer}`)
    .join('\n');

  return [
    'Tu es l\'assistant du site Quiz Pompidor.',
    'Réponds uniquement avec les éléments de cette base de connaissance.',
    'Si le contenu ne suffit pas, dis que la notion n\'est pas dans le site et donne la meilleure piste disponible.',
    '',
    `Titre du cours complet: ${courseTitle}`,
    `Introduction du cours: ${courseIntro}`,
    '',
    'Aperçu des thèmes:',
    themeOverview,
    '',
    'Cours de base complet:',
    courseOverview,
    '',
    'Banque QCM complète:',
    quizEntries,
  ].join('\n');
}
