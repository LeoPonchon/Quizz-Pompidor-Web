function ThemeSelection({ themes, onRandomTheme, onThemeSelect }) {
  return (
    <div className="screen">
      <span className="badge">Sélection du thème</span>
      <h2>Choisis un mode</h2>
      <p className="theme-desc">
        Le thème <strong>Quiz Pompidor</strong> regroupe toute la banque de questions.
        La catégorie <strong>Ingénierie logicielle</strong> est prête, mais vide pour le moment.
      </p>
      <div className="buttons">
        <button className="action primary" onClick={onRandomTheme} type="button">
          Thème aléatoire
        </button>
      </div>
      <div className="themes">
        {themes.map((theme) => {
          const isEmpty = theme.questions.length === 0;
          return (
            <button
              key={theme.key}
              className="theme-btn"
              onClick={() => onThemeSelect(theme.key)}
              type="button"
              disabled={isEmpty}
              style={isEmpty ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
            >
              <strong>{theme.label}</strong>
              <div className="theme-desc">{theme.description}</div>
              <span className="count">
                {theme.questions.length} {theme.key === 'course' ? 'sections' : 'questions'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeSelection;
