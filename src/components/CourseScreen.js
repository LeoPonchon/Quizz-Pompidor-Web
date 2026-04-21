function CourseScreen({
  currentTheme,
  courseTitle,
  courseIntro,
  courseSections,
  index,
  currentCourseSection,
  onSelectSection,
  onPrevious,
  onNext,
  onGoToThemes,
  onRestartTheme,
}) {
  return (
    <div className="screen">
      <div className="course-header">
        <span className="badge">{currentTheme?.label || 'Cours'}</span>
        <h2 className="course-page-title">{courseTitle}</h2>
        <p className="course-page-intro">{courseIntro}</p>
      </div>

      <div className="course-layout">
        <aside className="course-nav">
          {courseSections.length > 0 ? (
            courseSections.map((section, sectionIndex) => (
              <button
                key={section.title}
                className={`course-nav-btn ${sectionIndex === index ? 'active' : ''}`}
                onClick={() => onSelectSection(sectionIndex)}
                type="button"
              >
                {section.title}
              </button>
            ))
          ) : (
            <div className="course-block">
              <div className="course-block-title">Cours</div>
              <p className="course-goal">Aucune section de cours n’a été chargée.</p>
            </div>
          )}
        </aside>

        <article className="course-panel">
          {currentCourseSection ? (
            <>
              <h3 className="course-title">{currentCourseSection.title}</h3>
              <p className="course-goal">{currentCourseSection.goal}</p>

              {currentCourseSection.keyPoints?.length > 0 && (
                <div className="course-block">
                  <div className="course-block-title">À retenir</div>
                  <ul className="course-list">
                    {currentCourseSection.keyPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentCourseSection.example && (
                <div className="course-block">
                  <div className="course-block-title">Exemple</div>
                  <pre className="course-code">{currentCourseSection.example}</pre>
                </div>
              )}

              {currentCourseSection.checklist?.length > 0 && (
                <div className="course-block">
                  <div className="course-block-title">Vérification</div>
                  <ul className="course-list">
                    {currentCourseSection.checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="course-block">
              <div className="course-block-title">Cours</div>
              <p className="course-goal">Aucune section de cours disponible.</p>
            </div>
          )}
        </article>
      </div>

      <div className="buttons">
        <button className="action secondary" onClick={onPrevious} disabled={index === 0} type="button">
          Précédente
        </button>
        <button className="action primary" onClick={onNext} type="button">
          Suivante
        </button>
        <button className="action secondary" onClick={onGoToThemes} type="button">
          Changer de thème
        </button>
        <button className="action danger" onClick={onRestartTheme} type="button">
          Recommencer le cours
        </button>
      </div>
    </div>
  );
}

export default CourseScreen;
