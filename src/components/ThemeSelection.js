function ThemeSelection({ themes, onRandomTheme, onThemeSelect }) {
  return (
    <div className="screen">
      <span className="badge">Sélection du thème</span>
      <h2>Choisis un mode</h2>
      <p className="theme-desc">
        Certains thèmes sont en QCM, et le thème <strong>Cours de base</strong> est un vrai support de cours.
        Tu peux revenir ici à tout moment sans recharger la page.
      </p>
      <div className="buttons">
        <button className="action primary" onClick={onRandomTheme} type="button">
          Thème aléatoire
        </button>
      </div>
      <div className="themes">
        {themes.map((theme) => (
          <button
            key={theme.key}
            className="theme-btn"
            onClick={() => onThemeSelect(theme.key)}
            type="button"
          >
            <strong>{theme.label}</strong>
            <div className="theme-desc">{theme.description}</div>
            <span className="count">
              {theme.questions.length} {theme.key === 'course' ? 'sections' : 'questions'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelection;
