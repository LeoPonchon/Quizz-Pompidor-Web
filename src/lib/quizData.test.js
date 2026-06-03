import { shuffleDifferentFromOriginal, shuffleQuestionChoices } from './quizData';

afterEach(() => {
  jest.restoreAllMocks();
});

test('shuffles quiz choices without mutating the question bank', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.99);

  const questions = [
    {
      question: 'QCM',
      choices: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
      ],
    },
    {
      question: 'Texte',
      answer: 'Une reponse',
    },
  ];

  const preparedQuestions = shuffleQuestionChoices(questions);

  expect(preparedQuestions[0].choices.map((choice) => choice.id)).toEqual(['b', 'c', 'a']);
  expect(questions[0].choices.map((choice) => choice.id)).toEqual(['a', 'b', 'c']);
  expect(preparedQuestions[1]).toBe(questions[1]);
});

test('shuffles question order away from the original order', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.99);

  const questions = [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }];
  const shuffledQuestions = shuffleDifferentFromOriginal(questions);

  expect(shuffledQuestions.map((question) => question.id)).toEqual(['q2', 'q3', 'q1']);
  expect(questions.map((question) => question.id)).toEqual(['q1', 'q2', 'q3']);
});
