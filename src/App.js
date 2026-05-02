import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import ChatWidget from './components/ChatWidget';
import CourseScreen from './components/CourseScreen';
import DoneScreen from './components/DoneScreen';
import HeroSummary from './components/HeroSummary';
import QuizScreen from './components/QuizScreen';
import ThemeSelection from './components/ThemeSelection';
import {
  buildOpenRouterKnowledgeBase,
  buildThemes,
  getAllQuestionsFromThemes,
  levenshtein,
  normalizeForComparison,
  shuffle,
  toleranceForLength,
} from './lib/quizData';
import { getQuestionExplanation } from './lib/questionExamples';
import questionBank from './questions-pompidor.json';

function App() {
  const allQuestions = useMemo(() => {
    const themesMap = questionBank.themes || {};
    const pompidorThemes = Object.fromEntries(
      Object.entries(themesMap).filter(([themeName]) => themeName !== 'Ingénierie logicielle')
    );
    return getAllQuestionsFromThemes(pompidorThemes);
  }, []);
  const themes = useMemo(() => buildThemes(allQuestions), [allQuestions]);
  const courseSections = useMemo(() => questionBank.course?.sections || [], []);
  const courseTitle = questionBank.course?.title || 'Cours complet';
  const courseIntro = questionBank.course?.intro || '';
  const siteKnowledge = useMemo(
    () =>
      buildOpenRouterKnowledgeBase({
        themes,
        courseTitle,
        courseIntro,
        courseSections,
        allQuestions,
      }),
    [themes, courseTitle, courseIntro, courseSections, allQuestions]
  );

  const [screen, setScreen] = useState('themes');
  const [currentThemeKey, setCurrentThemeKey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);

  const inputRef = useRef(null);

  const currentTheme = useMemo(
    () => themes.find((theme) => theme.key === currentThemeKey) || null,
    [themes, currentThemeKey]
  );

  const currentQuestion = questions[index] || null;
  const currentCourseSection = courseSections[index] || null;
  const isCodeQuestion = currentTheme?.key === 'code' || (currentQuestion?.answer || '').includes('\n');
  const isBinaryQuestion = currentTheme?.key === 'component-review';
  const questionExplanation = useMemo(
    () => getQuestionExplanation(currentQuestion, { isCodeQuestion, isBinaryQuestion }),
    [currentQuestion, isCodeQuestion, isBinaryQuestion]
  );
  const totalCount = questions.length;
  const themeCount = themes.length;
  const progressLabel = currentTheme ? `${Math.min(index + 1, totalCount)} / ${totalCount}` : 'Choisis un thème';

  useEffect(() => {
    if (screen === 'quiz' && !answered) {
      inputRef.current?.focus();
    }
  }, [screen, index, answered]);

  function startTheme(themeKey) {
    const theme = themes.find((entry) => entry.key === themeKey);
    if (!theme || theme.questions.length === 0) {
      return;
    }

    setCurrentThemeKey(themeKey);
    setQuestions(theme.key === 'course' ? courseSections : shuffle(theme.questions));
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setAnswer('');
    setResult(null);
    setScreen(theme.key === 'course' ? 'course' : 'quiz');
  }

  function startRandomTheme() {
    const nonEmptyThemes = themes.filter((theme) => theme.questions.length > 0);
    const availableThemes =
      nonEmptyThemes.length <= 1 ? nonEmptyThemes : nonEmptyThemes.filter((theme) => theme.key !== 'all');
    if (availableThemes.length === 0) {
      return;
    }

    const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
    startTheme(randomTheme.key);
  }

  function goToThemes() {
    setScreen('themes');
    setCurrentThemeKey(null);
    setQuestions([]);
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setAnswer('');
    setResult(null);
  }

  function finishTheme() {
    setScreen('done');
  }

  function validateCurrent() {
    if (answered || !currentQuestion) {
      return;
    }

    const userRaw = answer;
    if (isBinaryQuestion && !userRaw) {
      return;
    }

    const expectedRaw = currentQuestion.answer;
    const user = normalizeForComparison(userRaw);
    const expected = normalizeForComparison(expectedRaw);
    const distance = levenshtein(user, expected);
    const tolerance = toleranceForLength(expected.length);
    const isCorrect = user.length > 0 && distance <= tolerance;

    if (isCorrect) {
      setScore((value) => value + 1);
    }

    setAnswered(true);
    setResult({
      isCorrect,
      distance,
      tolerance,
      expectedRaw,
      userRaw,
    });
  }

  function acceptCurrentAsCorrect() {
    if (!answered || !result || result.isCorrect || result.acceptedByUser) {
      return;
    }

    setScore((value) => value + 1);
    setResult((prev) => {
      if (!prev || prev.isCorrect || prev.acceptedByUser) {
        return prev;
      }
      return { ...prev, isCorrect: true, acceptedByUser: true };
    });
  }

  function nextQuestion() {
    if (screen === 'course') {
      const nextIndex = index + 1;
      if (nextIndex >= questions.length) {
        finishTheme();
        return;
      }

      setIndex(nextIndex);
      return;
    }

    if (!answered) {
      return;
    }

    const nextIndex = index + 1;
    if (nextIndex >= questions.length) {
      finishTheme();
      return;
    }

    setIndex(nextIndex);
    setAnswered(false);
    setAnswer('');
    setResult(null);
  }

  function restartTheme() {
    if (currentThemeKey) {
      startTheme(currentThemeKey);
    }
  }

  function previousQuestion() {
    if (index === 0) {
      return;
    }

    setIndex(index - 1);
    setAnswered(false);
    setAnswer('');
    setResult(null);
  }

  const finalPercent = totalCount ? Math.round((score / totalCount) * 100) : 0;

  return (
    <div className="page-shell">
      <div className="wrap">
        <HeroSummary
          themeCount={themeCount}
          totalCount={totalCount}
          progressLabel={progressLabel}
          score={score}
        />

        <section className="card">
          {screen === 'themes' && (
            <ThemeSelection themes={themes} onRandomTheme={startRandomTheme} onThemeSelect={startTheme} />
          )}

          {screen === 'quiz' && currentQuestion && (
            <QuizScreen
              currentTheme={currentTheme}
              totalCount={totalCount}
              currentQuestion={currentQuestion}
              isCodeQuestion={isCodeQuestion}
              isBinaryQuestion={isBinaryQuestion}
              answer={answer}
              setAnswer={setAnswer}
              answered={answered}
              inputRef={inputRef}
              onValidate={validateCurrent}
              onAcceptCorrect={acceptCurrentAsCorrect}
              onNext={nextQuestion}
              onGoToThemes={goToThemes}
              onRestartTheme={restartTheme}
              result={result}
              questionExplanation={questionExplanation}
            />
          )}

          {screen === 'course' && currentQuestion && (
            <CourseScreen
              currentTheme={currentTheme}
              courseTitle={courseTitle}
              courseIntro={courseIntro}
              courseSections={courseSections}
              index={index}
              currentCourseSection={currentCourseSection}
              onSelectSection={setIndex}
              onPrevious={previousQuestion}
              onNext={nextQuestion}
              onGoToThemes={goToThemes}
              onRestartTheme={restartTheme}
            />
          )}

          {screen === 'done' && (
            <DoneScreen
              currentTheme={currentTheme}
              score={score}
              totalCount={totalCount}
              finalPercent={finalPercent}
              onRestartTheme={restartTheme}
              onGoToThemes={goToThemes}
            />
          )}
        </section>
      </div>

      <ChatWidget
        siteKnowledge={siteKnowledge}
        currentTheme={currentTheme}
        currentQuestion={currentQuestion}
        currentCourseSection={currentCourseSection}
        screen={screen}
      />
    </div>
  );
}

export default App;
