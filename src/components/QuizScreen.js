import RichContent from './RichContent';

function normalizeQuestionContent(question) {
  if (!question || question.includes('```')) {
    return question;
  }

  const prefix = 'Component Angular:\n';
  const suffix = '\nCe component est-il mal écrit ?';

  if (question.startsWith(prefix) && question.endsWith(suffix)) {
    const code = question.slice(prefix.length, -suffix.length);
    return `Component Angular:\n\n\`\`\`js\n${code}\n\`\`\`\n\nCe component est-il mal écrit ?`;
  }

  return question;
}
function QuizScreen({
  currentTheme,
  totalCount,
  currentQuestion,
  isCodeQuestion,
  isBinaryQuestion,
  answer,
  setAnswer,
  answered,
  inputRef,
  onValidate,
  onNext,
  onGoToThemes,
  onRestartTheme,
  result,
}) {
  return (
    <div className="screen">
      <div className="topbar">
        <div>
          <span className="badge">{currentTheme?.label || 'Thème'}</span>
        </div>
        <div className="small">{totalCount} questions mélangées</div>
      </div>

      <div className="question">
        <RichContent content={currentQuestion.question} transformContent={normalizeQuestionContent} />
      </div>

      {isBinaryQuestion ? (
        <>
          <label>Choisis la bonne réponse</label>
          <div className="binary-choices" role="group" aria-label="Réponse oui ou non">
            <button
              type="button"
              className={`binary-choice-btn ${answer === 'oui' ? 'selected' : ''}`}
              onClick={() => setAnswer('oui')}
              disabled={answered}
            >
              Oui, c’est mal écrit
            </button>
            <button
              type="button"
              className={`binary-choice-btn ${answer === 'non' ? 'selected' : ''}`}
              onClick={() => setAnswer('non')}
              disabled={answered}
            >
              Non, c’est correct
            </button>
          </div>
        </>
      ) : isCodeQuestion ? (
        <>
          <label htmlFor="answerInput">Écris ta réponse</label>
          <textarea
            ref={inputRef}
            id="answerInput"
            autoComplete="off"
            spellCheck="false"
            rows={8}
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && !answered) {
                event.preventDefault();
                onValidate();
              } else if (event.key === 'Enter' && answered) {
                event.preventDefault();
                onNext();
              }
            }}
            disabled={answered}
          />
        </>
      ) : (
        <>
          <label htmlFor="answerInput">Écris ta réponse</label>
          <input
            ref={inputRef}
            id="answerInput"
            type="text"
            autoComplete="off"
            spellCheck="false"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !answered) {
                event.preventDefault();
                onValidate();
              } else if (event.key === 'Enter' && answered) {
                event.preventDefault();
                onNext();
              }
            }}
            disabled={answered}
          />
        </>
      )}

      <div className="buttons">
        <button className="action primary" onClick={onValidate} disabled={answered} type="button">
          Valider
        </button>
        <button className="action secondary" onClick={onNext} disabled={!answered} type="button">
          Question suivante
        </button>
        <button className="action secondary" onClick={onGoToThemes} type="button">
          Changer de thème
        </button>
        <button className="action danger" onClick={onRestartTheme} type="button">
          Relancer ce thème
        </button>
      </div>

      <div className={`result ${result ? (result.isCorrect ? 'good' : 'bad') : ''}`} aria-live="polite">
        {result && (
          <>
            <div>
              <strong>{result.isCorrect ? 'Juste' : 'Faux'}</strong>
              {result.isCorrect ? ' · +1 point' : ' · +0 point'}
            </div>
            <div className="result-line">
              <strong>Réponse attendue :</strong>
              <RichContent content={result.expectedRaw} className="result-rich" />
            </div>
            <div className="result-line">
              <strong>Ta réponse :</strong>
              <RichContent content={result.userRaw || '∅'} className="result-rich" />
            </div>
            <div className="result-line">
              <strong>Distance de Levenshtein :</strong> {result.distance} ·{' '}
              <strong>Tolérance :</strong> {result.tolerance}
            </div>
            {currentQuestion.explanation && (
              <div className="result-line">
                <strong>Pourquoi :</strong> {currentQuestion.explanation}
              </div>
            )}
          </>
        )}
      </div>

      <div className="hint">
        Règle de correction: accents et casse ignorés, petite tolérance Levenshtein selon la longueur.
        Le score prend <strong>+1</strong> seulement si la réponse est jugée suffisamment proche.
      </div>

      <div className="small extra-hint">
        {isBinaryQuestion ? (
          <>
            Astuce: choisis <code>oui</code> ou <code>non</code>, puis valide.
          </>
        ) : isCodeQuestion ? (
          <>
            Astuce: <code>Entrée</code> ajoute une nouvelle ligne.
            Utilise <code>Ctrl+Entrée</code> pour valider.
          </>
        ) : (
          <>
            Astuce: <code>Entrée</code> valide, puis <code>Entrée</code> passe à la suivante.
          </>
        )}
      </div>
    </div>
  );
}

export default QuizScreen;
