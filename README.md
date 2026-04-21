# Quiz Pompidor

Application React pour réviser le cours MEAN / MongoDB / Node / Express / Angular à partir de thèmes, d’un mode cours complet et d’un chat IA facultatif.

## Fonctionnalités

- sélection de thèmes
- mode `Cours de base` pour apprendre depuis zéro sans QCM
- questions mélangées à chaque lancement
- saisie libre de la réponse
- correction tolérante avec normalisation des accents et distance de Levenshtein
- score et progression en temps réel
- écran de fin avec possibilité de rejouer le même thème ou d’en changer
- chat IA OpenRouter en bas à droite, rétractable avec animation

## Prérequis

- Node.js installé en local
- une clé OpenRouter si tu veux utiliser le chat IA

## Configuration du chat IA

Crée un fichier `.env` à la racine du projet avec:

```bash
REACT_APP_OPENROUTER_API_KEY=sk-or-...
REACT_APP_OPENROUTER_MODEL=openai/gpt-5.2
```

Le fichier `.env` est ignoré par Git.

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

Le build est généré dans le dossier `build/` et peut être déployé sur n’importe quel hébergement statique.

## Structure du projet

- `src/App.js` : orchestration principale de l’application
- `src/components/` : composants d’interface réutilisables
- `src/lib/quizData.js` : helpers de données et de correction
- `src/App.css` : styles de l’interface
- `src/index.js` : point d’entrée React
- `src/questions-pompidor.json` : banque de questions
- `public/index.html` : template HTML

## Remarque

Le projet reste front-first. Le quiz et le mode cours tournent entièrement côté navigateur, tandis que le chat IA appelle OpenRouter directement depuis le client avec la clé fournie par `REACT_APP_OPENROUTER_API_KEY`.
