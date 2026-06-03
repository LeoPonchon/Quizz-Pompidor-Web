import { shuffleQuestionChoices } from './quizData';

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
