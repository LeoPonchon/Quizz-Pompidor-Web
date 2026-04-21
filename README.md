# Quiz Pompidor

Application React front-only pour réviser le cours MEAN / MongoDB / Node / Express / Angular à partir d’un QCM.

## Fonctionnalités

- sélection de thèmes
- questions mélangées à chaque lancement
- saisie libre de la réponse
- correction tolérante avec normalisation des accents et distance de Levenshtein
- score et progression en temps réel
- écran de fin avec possibilité de rejouer le même thème ou d’en changer

## Démarrage

```bash
npm install
npm start
```

L’application est alors disponible en local sur `http://localhost:3000`.

## Build de production

```bash
npm run build
```

Le build est généré dans le dossier `build/` et peut être déployé sur n’importe quel hébergement statique, y compris Vercel.

## Structure du projet

- `src/App.js` : logique principale du quiz
- `src/App.css` : styles de l’interface
- `src/index.js` : point d’entrée React
- `src/questions-pompidor.json` : banque de questions
- `public/index.html` : template HTML

## Remarque

Le projet ne dépend d’aucun backend. Tout se passe côté navigateur.
