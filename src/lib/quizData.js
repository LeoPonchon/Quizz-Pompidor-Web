import questionBank from '../questions-pompidor.json';
import progRepartieQuestions from './progRepartieQuestions';

export const themeDefinitions = [
  {
    key: 'all',
    label: 'Quiz Pompidor',
    description: 'Toutes les questions Pompidor (banque complète), mélangées à chaque lancement.',
    sourceName: null,
  },
  {
    key: 'software-engineering',
    label: 'Modularités',
    description: 'DAO/JPA, Spring (IoC/DI), transactions, MVC/Thymeleaf.',
    sourceName: 'Ingénierie logicielle',
  },
  {
    key: 'distributed-programming',
    label: 'Prog répartie',
    description: "QCM de programmation répartie reconstruits depuis les captures, dans l'ordre original.",
    questions: progRepartieQuestions,
    ordered: true,
  },
];

export function normalizeForComparison(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[â€™']/g, "'")
    .replace(/[-â€“â€”]/g, ' ')
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

  return themeDefinitions.map((definition) => ({
    ...definition,
    questions:
      definition.questions ||
      (definition.key === 'all'
        ? allQuestions
        : definition.key === 'course'
          ? courseSections
          : themesMap[definition.sourceName] || []),
  }));
}

export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function shuffleDifferentFromOriginal(array) {
  const shuffled = shuffle(array);

  if (shuffled.length <= 1 || shuffled.some((item, index) => item !== array[index])) {
    return shuffled;
  }

  return [...shuffled.slice(1), shuffled[0]];
}

export function shuffleQuestionChoices(questions) {
  return (questions || []).map((question) => {
    if (!Array.isArray(question.choices) || question.choices.length <= 1) {
      return question;
    }

    return {
      ...question,
      choices: shuffleDifferentFromOriginal(question.choices),
    };
  });
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
    .map((theme) => `- ${theme.label}: ${theme.description} (${theme.questions.length} entrÃ©es)`)
    .join('\n');

  const courseOverview = courseSections
    .map((section, index) => {
      const bulletPoints = (section.keyPoints || []).map((point) => `    - ${point}`).join('\n');
      const checklist = (section.checklist || []).map((item) => `    - ${item}`).join('\n');

      return [
        `Section ${index + 1}: ${section.title}`,
        `  Objectif: ${section.goal}`,
        `  Points clÃ©s:`,
        bulletPoints || '    - Aucun',
        `  Exemple: ${section.example || 'Aucun'}`,
        `  VÃ©rification:`,
        checklist || '    - Aucune',
      ].join('\n');
    })
    .join('\n\n');

  const quizEntries = (allQuestions || [])
    .map((item) => `- Q: ${item.question}\n  R: ${item.answer}`)
    .join('\n');

  return [
    "Tu es l'assistant du site Quiz Pompidor.",
    'RÃ©ponds uniquement avec les Ã©lÃ©ments de cette base de connaissance.',
    "Si le contenu ne suffit pas, dis que la notion n'est pas dans le site et donne la meilleure piste disponible.",
    '',
    `Titre du cours complet: ${courseTitle}`,
    `Introduction du cours: ${courseIntro}`,
    '',
    'AperÃ§u des thÃ¨mes:',
    themeOverview,
    '',
    'Cours de base complet:',
    courseOverview,
    '',
    'Banque QCM complÃ¨te:',
    quizEntries,
  ].join('\n');
}
