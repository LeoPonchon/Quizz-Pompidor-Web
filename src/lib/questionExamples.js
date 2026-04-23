function normalize(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

const htmlTagExamples = {
  a: '<a href="/contact">Contact</a>',
  header: '<header>Mon site</header>',
  main: '<main>Contenu principal</main>',
  article: '<article>Un billet de blog</article>',
  footer: '<footer>Mentions legales</footer>',
  p: '<p>Bonjour tout le monde</p>',
  br: 'Ligne 1<br />Ligne 2',
  ul: '<ul><li>Pomme</li><li>Poire</li></ul>',
  li: '<li>Premier element</li>',
  table: '<table><tr><td>Cellule</td></tr></table>',
  tr: '<tr><td>Produit</td></tr>',
  td: '<td>42</td>',
  th: '<th>Prix</th>',
  div: '<div class="card">Bloc generique</div>',
  form: '<form action="/login" method="post"></form>',
  select: '<select><option>Paris</option></select>',
  option: '<option value="fr">France</option>',
  textarea: '<textarea>Commentaire</textarea>',
  'app-root': '<app-root></app-root>',
  'router-outlet': '<router-outlet></router-outlet>',
};

const htmlAttributeExamples = {
  href: '<a href="/produits">Produits</a>',
  target: '<a target="_blank">Documentation</a>',
  _blank: '<a href="https://example.com" target="_blank">Ouvrir</a>',
  name: '<input name="email" />',
  placeholder: '<input placeholder="Ton email" />',
  required: '<input required />',
  routerlink: '<a routerLink="/panier">Panier</a>',
  ngmodel: '<input [(ngModel)]="query" />',
  '[(ngmodel)]': '<input [(ngModel)]="query" />',
};

const inputTypeExamples = {
  password: '<input type="password" />',
  checkbox: '<input type="checkbox" />',
  radio: '<input type="radio" name="taille" />',
  text: '<input type="text" />',
};

const cssPropertyExamples = {
  'font-size': '.title { font-size: 2rem; }',
  'font-weight': '.title { font-weight: 700; }',
  'font-family': "body { font-family: Georgia, serif; }",
  margin: '.card { margin: 16px; }',
  float: '.photo { float: right; }',
};

const jsKeywordExamples = {
  let: 'let total = 0;',
  const: 'const apiUrl = "/api/products";',
  var: 'var compteur = 0;',
  function: 'function add(a, b) { return a + b; }',
  this: 'this.title = "Accueil";',
  await: 'const data = await fetch("/api/products");',
  document: 'document.getElementById("login-form")',
};

const jsEventExamples = {
  click: "button.addEventListener('click', handleClick);",
  mouseenter: "card.addEventListener('mouseenter', showTooltip);",
  mouseleave: "card.addEventListener('mouseleave', hideTooltip);",
  load: "window.addEventListener('load', initApp);",
  beforeunload: "window.addEventListener('beforeunload', saveDraft);",
};

const mongoOperatorExamples = {
  $gt: 'db.articles.find({ prix: { $gt: 100 } })',
  $lt: 'db.articles.find({ prix: { $lt: 100 } })',
  $gte: 'db.articles.find({ stock: { $gte: 1 } })',
  $lte: 'db.articles.find({ stock: { $lte: 10 } })',
  $exists: 'db.users.find({ email: { $exists: true } })',
  $in: 'db.articles.find({ rayon: { $in: ["sport", "maison"] } })',
  $nin: 'db.articles.find({ rayon: { $nin: ["promo"] } })',
  $or: 'db.articles.find({ $or: [{ stock: 0 }, { promotion: { $gt: 0 } }] })',
  $not: 'db.articles.find({ prix: { $not: { $gt: 100 } } })',
  $nor: 'db.articles.find({ $nor: [{ stock: 0 }, { promotion: { $gt: 0 } }] })',
};

const answerExamples = {
  mean: "Exemple : une appli MEAN peut utiliser MongoDB pour les donnees, Express et Node.js pour l'API, puis Angular pour l'interface.",
  seo: "Exemple : une page produit bien referencee peut apparaitre plus facilement dans Google.",
  'server-side rendering': "Exemple : le serveur renvoie deja le HTML d'une fiche produit avant que le navigateur execute JavaScript.",
  'client-side rendering': "Exemple : l'application charge une seule page puis change l'affichage en JavaScript quand on navigue.",
  javascript: "Exemple : on peut afficher une alerte ou mettre a jour le DOM au clic sur un bouton.",
  typescript: "Exemple : Angular utilise souvent TypeScript pour typer un composant comme HomepageService.",
  nosql: 'Exemple : dans MongoDB, on stocke des documents JSON/BSON plutot que des lignes dans des tables SQL classiques.',
  bson: 'Exemple : un document comme { nom: "Alice", age: 22 } est stocke par MongoDB en BSON.',
  mongosh: 'Exemple : on ouvre mongosh pour taper des commandes comme show dbs ou use ECOMMERCE.',
  mongodb: 'Exemple : on peut enregistrer les produits et les utilisateurs du TP dans MongoDB.',
  express: "Exemple : avec Express, on peut creer une route GET /api/products qui renvoie des donnees JSON.",
  mongoclient: 'Exemple : on cree un nouveau MongoClient(url) avant de se connecter a la base.',
  cors: "Exemple : CORS permet a un front sur localhost:3000 d'appeler une API sur localhost:8888 si le serveur l'autorise.",
  html: 'Exemple : <h1>Bonjour</h1> structure le contenu d\'une page.',
  css: 'Exemple : .title { color: tomato; } change la presentation visuelle.',
  'document object model': 'Exemple : document.querySelector("button") permet de recuperer un element de la page.',
  http: 'Exemple : le navigateur envoie une requete HTTP GET pour charger une page ou une API.',
  https: 'Exemple : https://banque.example chiffre les echanges entre le navigateur et le serveur.',
  json: 'Exemple : { "name": "Clavier", "price": 49.99 } est une reponse JSON typique.',
  'javascript object notation': 'Exemple : { "email": "leo@example.com" } est un objet JSON.',
  'node.js': 'Exemple : on peut lancer une API Express avec Node.js sur le port 8888.',
  jwt: 'Exemple : apres connexion, le serveur peut creer un JWT pour identifier l’utilisateur sur les requetes suivantes.',
  'json web token': 'Exemple : un JWT peut contenir le nom d’utilisateur et une date d’expiration.',
  cookie: 'Exemple : apres /signin, le serveur peut envoyer un cookie jwt qui sera renvoye automatiquement aux requetes suivantes.',
  'dans un cookie': 'Exemple : apres la connexion, le navigateur conserve le JWT dans un cookie comme jwt=abc123.',
  httponly: "Exemple : un cookie HttpOnly n'est pas lisible via document.cookie dans le code front.",
  samesite: "Exemple : un cookie SameSite=Strict aide a bloquer l'envoi automatique du cookie depuis un autre site.",
  secure: 'Exemple : un cookie Secure ne sera envoye que sur une connexion HTTPS.',
  jsonwebtoken: "Exemple : on utilise jsonwebtoken.sign(...) pour creer un token puis jsonwebtoken.verify(...) pour le verifier.",
  'cookie-parser': 'Exemple : cookie-parser remplit req.cookies pour lire facilement le cookie jwt.',
  angular: "Exemple : Angular peut servir a construire la page d'accueil, la recherche et le panier du TP.",
  ng: 'Exemple : on utilise la commande ng new pour creer un projet Angular.',
  routes: 'Exemple : un tableau Routes peut declarer le chemin /panier et le composant a afficher.',
  input: "Exemple : @Input() products permet a un composant enfant de recevoir une liste depuis son parent.",
  subscribe: 'Exemple : this.http.get("/api/products").subscribe(data => console.log(data));',
  '*ngfor': 'Exemple : <li *ngFor="let product of products">{{ product.name }}</li>',
  '@for': 'Exemple : @for (product of products; track product.id) { ... }',
  '*ngif': 'Exemple : <p *ngIf="loaded">Pret</p>',
  '@if': 'Exemple : @if (loaded) { <p>Pret</p> }',
  '@ngrx': 'Exemple : on peut stocker le panier dans un store global avec NgRx.',
  observable: "Exemple : HttpClient renvoie souvent un Observable sur lequel on s'abonne avec subscribe.",
  httpclient: 'Exemple : ce service Angular peut faire this.httpClient.get("/api/products").',
  signal: 'Exemple : const count = signal(0) stocke un etat reactif local.',
  computed: 'Exemple : const total = computed(() => items().reduce((sum, item) => sum + item.price, 0));',
  'une brique d\'interface reutilisable': 'Exemple : une carte produit ou une barre de recherche peut etre un composant Angular.',
  'une classe qui partage de la logique et des donnees': 'Exemple : un service peut centraliser les appels HTTP vers /api/products.',
  "a afficher une vue selon l'url": 'Exemple : /panier affiche le composant du panier tandis que /recherche affiche la liste.',
  'a gerer un etat reactif local': 'Exemple : un signal peut memoriser le contenu du panier et recalculer le total.',
  "construire un front de recherche et un panier": "Exemple : le TP te fait creer une recherche de produits puis ajouter ces produits dans un panier.",
  apache: 'Exemple : un proxy Apache peut exposer le site public et relayer les requetes vers NestJS.',
  nginx: 'Exemple : Nginx peut servir de reverse proxy devant une application NestJS en production.',
};

const questionExamples = [
  {
    test: (question) => normalize(question) === 'quel emplacement est presente comme preferable dans le cours pour un jwt ?',
    text: 'Exemple : apres /signin, le serveur renvoie le token dans un cookie jwt qui accompagne ensuite les appels a /validate.',
  },
  {
    test: (question) => normalize(question) === 'quelles sont les trois parties d\'un jwt dans le principe du cours ?',
    text: "Exemple : dans un JWT classique, on a d'abord l'en-tete, puis la charge utile avec les donnees, puis la signature.",
  },
  {
    test: (question) => normalize(question) === "qu'est-ce qui garantit l'authenticite d'un jwt ?",
    text: "Exemple : si quelqu'un modifie le contenu du token sans la bonne cle, la signature ne correspond plus.",
  },
  {
    test: (question) => normalize(question) === 'quels sont les deux emplacements cote client proposes pour stocker un jwt ?',
    text: 'Exemple : un token peut etre place soit dans un cookie, soit dans localStorage selon le choix d’architecture.',
  },
  {
    test: (question) => normalize(question) === 'dans le microservice d\'authentification, quelles trois routes sont citees ?',
    text: 'Exemple : /signup cree un compte, /signin connecte l’utilisateur et /validate verifie que le JWT est encore valide.',
  },
  {
    test: (question) => normalize(question) === 'dans le couplage nestjs + microservice, ou le cookie doit-il etre cree ?',
    text: "Exemple : NestJS recoit la reponse du microservice puis pose lui-meme le cookie JWT dans la reponse HTTP envoyee au navigateur.",
  },
  {
    test: (question) => normalize(question) === 'quel serveur frontal est recommande en production devant nestjs ?',
    text: 'Exemple : Nginx peut recevoir le trafic public puis le transmettre a l’application NestJS derriere.',
  },
  {
    test: (question) => normalize(question) === 'quelle est la difference principale entre http et https ?',
    text: 'Exemple : sur un formulaire de connexion, HTTPS chiffre le mot de passe pendant le transport alors que HTTP ne le fait pas.',
  },
  {
    test: (question) => normalize(question) === 'quels sont les trois langages de base du web cote client ?',
    text: 'Exemple : HTML structure une fiche produit, CSS la met en forme et JavaScript gere le bouton Ajouter au panier.',
  },
  {
    test: (question) => normalize(question) === 'quel est le role du tp e-commerce ?',
    text: 'Exemple : on construit une recherche de produits, puis un panier qui reagit aux actions de l’utilisateur.',
  },
];

function buildTagExample(answerKey, answer) {
  const snippet = htmlTagExamples[answerKey];
  return snippet ? `Exemple : ${snippet}` : `Exemple : on peut utiliser <${answer}>...</${answer}> dans une page HTML.`;
}

function buildAttributeExample(answerKey, answer) {
  const snippet = htmlAttributeExamples[answerKey];
  return snippet ? `Exemple : ${snippet}` : `Exemple : on peut ecrire ${answer} dans une balise HTML quand on en a besoin.`;
}

function buildCssExample(answerKey) {
  const snippet = cssPropertyExamples[answerKey];
  return snippet ? `Exemple : ${snippet}` : null;
}

function buildQuestionBasedFallback(question, answer) {
  const questionKey = normalize(question);
  const answerText = answer.trim();

  if (questionKey.startsWith('que signifie ')) {
    return `Exemple : dans le cours, cette expression apparait quand on parle de ${answerText}.`;
  }

  if (questionKey.startsWith('a quoi sert ') || questionKey.startsWith('qu est ce qu') || questionKey.startsWith("qu'est-ce qu")) {
    return `Exemple : dans un cas concret du cours, ${answerText.charAt(0).toLowerCase()}${answerText.slice(1)}.`;
  }

  if (questionKey.startsWith('quel est l objectif principal') || questionKey.startsWith("quel est l'objectif principal")) {
    return `Exemple : dans le TP ou le cours, on vise ${answerText.charAt(0).toLowerCase()}${answerText.slice(1)}.`;
  }

  if (questionKey.includes('quel port')) {
    return `Exemple : on accede au serveur via http://localhost:${answerText}.`;
  }

  if (questionKey.includes('quel fichier enregistre les dependances')) {
    return `Exemple : le projet liste React, react-dom ou express dans ${answerText}.`;
  }

  if (questionKey.includes('quel champ') || questionKey.includes('quelle propriete')) {
    return `Exemple : un document peut contenir { ${answerText}: ... } selon le cas du cours.`;
  }

  return `Exemple : dans le cours, on rencontre ${answerText} dans une situation concrete liee a cette notion.`;
}

export function getQuestionExplanation(question, options = {}) {
  const { answer = '', explanation = '' } = question || {};
  const { isCodeQuestion = false, isBinaryQuestion = false } = options;
  const answerText = (answer || '').trim();

  if (explanation) {
    return explanation;
  }

  if (!question?.question || !answerText || isCodeQuestion || isBinaryQuestion || answerText.includes('\n')) {
    return '';
  }

  const questionText = question.question;
  const answerKey = normalize(answerText);

  for (const entry of questionExamples) {
    if (entry.test(questionText, answerText)) {
      return entry.text;
    }
  }

  if (htmlTagExamples[answerKey]) {
    return buildTagExample(answerKey, answerText);
  }

  if (htmlAttributeExamples[answerKey]) {
    return buildAttributeExample(answerKey, answerText);
  }

  if (inputTypeExamples[answerKey]) {
    return `Exemple : ${inputTypeExamples[answerKey]}`;
  }

  if (cssPropertyExamples[answerKey]) {
    return buildCssExample(answerKey);
  }

  if (answerKey === '.') {
    return 'Exemple : .card cible les elements qui ont class="card".';
  }

  if (answerKey === '#') {
    return 'Exemple : #header cible l’element qui a id="header".';
  }

  if (mongoOperatorExamples[answerKey]) {
    return `Exemple : ${mongoOperatorExamples[answerKey]}`;
  }

  if (jsEventExamples[answerKey]) {
    return `Exemple : ${jsEventExamples[answerKey]}`;
  }

  if (jsKeywordExamples[answerKey]) {
    return `Exemple : ${jsKeywordExamples[answerKey]}`;
  }

  if (answerExamples[answerKey]) {
    return answerExamples[answerKey];
  }

  if (/^show /.test(answerText) || /^use /.test(answerText) || /^ng /.test(answerText) || /^node /.test(answerText)) {
    return `Exemple : on peut taper "${answerText}" directement dans le shell ou le terminal du contexte approprie.`;
  }

  if (/^[a-zA-Z_][\w.]*\(\)$/.test(answerText)) {
    return `Exemple : on appelle ${answerText} dans le bon contexte pour executer cette action.`;
  }

  if (/^app\./.test(answerText)) {
    return `Exemple : ${answerText}('/api/items', (req, res) => res.json([]));`;
  }

  if (/^req\./.test(answerText)) {
    return `Exemple : const valeur = ${answerText};`;
  }

  if (/^res\./.test(answerText)) {
    return `Exemple : ${answerText}({ ok: true });`;
  }

  if (/^\/[\w/-]+$/.test(answerText)) {
    return `Exemple : le front peut appeler ${answerText} pour recuperer ou envoyer des donnees.`;
  }

  if (/^[\w@*$[\]#.-]+$/.test(answerText) && questionText.includes('Angular')) {
    return `Exemple : on retrouve ${answerText} dans un composant, un template ou une configuration Angular du cours.`;
  }

  return buildQuestionBasedFallback(questionText, answerText);
}
