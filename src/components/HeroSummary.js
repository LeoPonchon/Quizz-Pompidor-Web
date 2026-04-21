function HeroSummary({ themeCount, totalCount, progressLabel, score }) {
  return (
    <section className="hero">
      <h1>Révision MEAN</h1>
      <p className="subtitle">
        Une seule page, plusieurs QCM par thème, ordre aléatoire à chaque lancement.
        Tu choisis ton terrain de jeu, puis tu réponds en <strong>retapant la réponse</strong>.
        La correction utilise la distance de Levenshtein pour pardonner les petites fautes de frappe.
      </p>
      <div className="grid">
        <div className="stat">
          <div className="label">Thèmes</div>
          <div className="value">{themeCount}</div>
        </div>
        <div className="stat">
          <div className="label">Questions du thème</div>
          <div className="value">{totalCount}</div>
        </div>
        <div className="stat">
          <div className="label">Progression</div>
          <div className="value">{progressLabel}</div>
        </div>
        <div className="stat">
          <div className="label">Score</div>
          <div className="value">{score}</div>
        </div>
      </div>
    </section>
  );
}

export default HeroSummary;
