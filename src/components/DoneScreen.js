function DoneScreen({ currentTheme, score, totalCount, finalPercent, onRestartTheme, onGoToThemes }) {
  return (
    <div className="screen done">
      <h2>{currentTheme?.key === 'course' ? 'Cours terminé' : 'Thème terminé'}</h2>
      {currentTheme?.key === 'course' ? (
        <p>
          Le parcours <strong>{currentTheme?.label || 'inconnu'}</strong> est terminé.
          <br />
          Tu peux recommencer le cours ou changer de thème.
        </p>
      ) : (
        <p>
          Thème <strong>{currentTheme?.label || 'inconnu'}</strong> terminé.
          <br />
          Score final : <strong>{score} / {totalCount}</strong> · Réussite :{' '}
          <strong>{finalPercent}%</strong>.
        </p>
      )}
      <div className="buttons buttons-center">
        <button className="action primary" onClick={onRestartTheme} type="button">
          {currentTheme?.key === 'course' ? 'Recommencer le cours' : 'Rejouer ce thème'}
        </button>
        <button className="action secondary" onClick={onGoToThemes} type="button">
          Choisir un autre thème
        </button>
      </div>
    </div>
  );
}

export default DoneScreen;
