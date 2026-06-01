const option = (label, text, correct = false) => ({ label, text, correct });
const unlabeledOption = (text, correct = false) => ({ text, correct });

function normalizeChoices(choices) {
  return choices.map((choice, index) => ({
    id: choice.id || choice.label || `choice-${index + 1}`,
    label: choice.label || '',
    text: choice.text,
    correct: Boolean(choice.correct),
  }));
}

function formatChoice(choice) {
  return choice.label ? `${choice.label}. ${choice.text}` : choice.text;
}

function choiceQuestion(number, question, choices) {
  const normalizedChoices = normalizeChoices(choices);
  const correctChoices = normalizedChoices.filter((choice) => choice.correct);

  return {
    question: `Question ${number}\n\n${question}`,
    answer: correctChoices.map(formatChoice).join('\n'),
    choices: normalizedChoices,
    multiple: correctChoices.length > 1,
  };
}

function textQuestion(number, question, answer) {
  return {
    question: `Question ${number}\n\n${question}`,
    answer,
  };
}

function matrix(rows) {
  return rows.map((row) => row.join('  ')).join('\n');
}

const coupureC = `Coupure C :
P1 : e11 → e12 → e13 | C1 | e14 → e15 → e16
P2 : e21 → e22 → e23 → e24 | C2 | e25
P3 : e31 → e32 → e33 | C3 | e34 → e35 → e36 → e37

Messages :
m1 : e11 → e22
m2 : e31 → e23
m3 : e13 → e35
m4 : e32 → e14
m5 : e33 → e15
m6 : e25 → e36
m7 : e16 → e37`;

const electionAlgorithm = `L'objectif de cet exercice est d'évaluer votre capacité à comprendre et à analyser un algorithme réparti.

Soit Π = {P1, P2, ..., PN} l'ensemble des processus d'un système réparti S. Chaque processus a un identifiant unique égal à son indice. Le réseau d'interconnexion est en anneau unidirectionnel. Chaque processus distingue son voisin droite et son voisin gauche. Les canaux de communication sont FIFO et les communications sont fiables. Enfin, les processus sont corrects.

Soit l'algorithme suivant pour un processus Pi :

Initialisation :
- droite_i : identité du site successeur de Pi
- gauche_i : identité du site prédécesseur de Pi;
- resultat_i : valeur ∈ {vrai, faux}, initialisée à faux ;
- etat_i : état ∈ {A, P}, initialisé à A;
- tmp_i : entier initialisé à i;
- v_i, w_i : entiers

Procédure demande() :
envoyer < M1, tmp_i > à droite_i;

Lors de la réception d'un message < M1, id > de gauche_i :
si etat_i = P alors
  envoyer < M1, id > à droite_i;
sinon
  si id = tmp_i alors
    resultat_i ← vrai;
  sinon
    v_i ← id;
    envoyer < M2, id > à droite_i;

Lors de la réception d'un message < M2, id > de gauche_i :
si etat_i = P alors
  envoyer < M2, id > à droite_i;
sinon
  w_i ← id;
  si v_i < w_i ET v_i < tmp_i alors
    tmp_i ← v_i;
    envoyer < M1, tmp_i > à droite_i;
  sinon
    etat_i ← P;

Comme vous avez pu le déduire, il y a deux types de messages pouvant être échangés : M1 et M2.`;

const progRepartieQuestions = [
  choiceQuestion(
    3,
    'Appelons la fonction send(...) pour envoyer un message M. Parmi les affirmations suivantes, quelles sont celles qui sont correctes ?',
    [
      option('a', "Aucune des autres réponses n'est correcte.", true),
      option('b', 'Le protocole de transport utilisé pourrait être UDP.'),
      option(
        'c',
        "Si la valeur de retour de cette fonction est strictement supérieure à zéro, cela signifie aussi que le buffer de réception de la socket de destination n'était pas plein lors de l'appel de send(...)"
      ),
      option(
        'd',
        "Si la valeur de retour de cette fonction est strictement supérieure à zéro, cela signifie aussi qu'il n'y a pas eu de perte de paquets."
      ),
    ]
  ),
  choiceQuestion(
    5,
    'Un processus P1 se connecte en TCP à P2. P1 appelle connect() qui est un appel bloquant.\n\nAu moment précis où connect() se débloque côté P1, quelle action réseau est effectuée par P1 ?',
    [
      option('a', 'P1 envoie un segment ACK en réponse au SYN+ACK reçu de P2.', true),
      option('b', "P1 reçoit un segment ACK envoyé par P2 après l'appel à accept()."),
      option('c', 'P1 exécute accept() et envoie un segment ACK.'),
      option('d', "P1 reçoit un segment SYN et passe la socket à l'état SYN_SENT."),
      option('e', 'P1 envoie un segment FIN pour terminer la connexion.'),
      option('f', "P1 envoie un segment SYN+ACK après l'appel à connect()."),
    ]
  ),
  choiceQuestion(
    6,
    "Que retourne exactement l'appel système fork() lors de son exécution réussie ?",
    [
      option('a', 'Il retourne le PID du nouveau processus aux deux appelants.'),
      option('b', 'Il retourne le PID du parent dans le processus fils, et 0 dans le processus parent.'),
      option('c', "Il retourne 1 pour indiquer le succès, et -1 pour l'échec."),
      option('d', "Il ne retourne rien (void) car il duplique l'exécution."),
      option('e', 'Il retourne 0 dans les deux processus (fils et parent).'),
      option('f', 'Il retourne 0 dans le processus fils, et le PID du fils dans le processus parent.', true),
    ]
  ),
  choiceQuestion(
    7,
    'Un système réparti est :',
    [
      option(
        'a',
        'Un ensemble de processus indépendants communiquant uniquement par échange de messages',
        true
      ),
      option('b', 'Un système centralisé accessible via un réseau'),
      option('c', "Un programme multithreadé exécuté sur un seul système d'exploitation"),
      option('d', 'Un système exécuté sur plusieurs cœurs partageant une mémoire commune'),
    ]
  ),
  choiceQuestion(
    8,
    'Concernant la communication dans un système réparti :\n(plusieurs réponses possibles)',
    [
      option('a', 'Elle est généralement asynchrone', true),
      option('b', 'Elle est toujours fiable dans les systèmes modernes'),
      option('c', 'Elle peut entraîner des réceptions dans le désordre', true),
      option('d', "Elle est équivalente à l'accès à une mémoire partagée"),
      option('e', 'Elle impose une latence non nulle', true),
      option('f', 'Elle peut être sujette à des pertes ou des retards', true),
    ]
  ),
  choiceQuestion(
    9,
    'Concernant la distinction entre système réparti et système parallèle :\n(plusieurs réponses possibles)',
    [
      option('a', 'Les deux modèles ont exactement les mêmes contraintes'),
      option('b', 'Un système parallèle est toujours distribué géographiquement'),
      option('c', "Un système réparti n'a pas de mémoire partagée globale", true),
      option('d', 'Un système parallèle suppose une synchronisation fine et locale', true),
      option('e', 'Un système réparti doit gérer les pannes indépendantes', true),
      option('f', "Le système réparti repose sur l'échange de messages", true),
    ]
  ),
  choiceQuestion(
    10,
    'Quelle hypothèse est fausse dans un système réparti classique ?',
    [
      option('a', 'Les processus peuvent tomber en panne indépendamment'),
      option('b', "Il n'existe pas de mémoire partagée globale"),
      option('c', 'Les horloges locales ne sont pas synchronisées'),
      option('d', 'Les délais de communication sont bornés', true),
    ]
  ),
  choiceQuestion(
    11,
    "Quel problème découle directement de l'absence d'horloge globale ?",
    [
      option('a', 'La surcharge réseau'),
      option('b', 'Le manque de parallélisme'),
      option(
        'c',
        "l'impossibilité de transmettre un message m2 causalement lié à un autre m1, si m1 n'a pas été reçu avant"
      ),
      option('d', 'La perte de messages'),
      option('e', 'La difficulté à définir un ordre global des événements', true),
    ]
  ),
  choiceQuestion(
    12,
    'Quelle est la distinction fondamentale entre la "réception" et la "délivrance" d\'un message dans un algorithme réparti ?',
    [
      option(
        'a',
        'La réception concerne le protocole UDP, tandis que la délivrance concerne le protocole TCP.'
      ),
      option('b', 'La réception se produit après la délivrance dans un modèle de causalité.'),
      option(
        'c',
        'La réception est une action active du programme (syscall), tandis que la délivrance est une interruption matérielle.'
      ),
      option(
        'd',
        "La réception est l'arrivée physique dans la file d'attente du système, tandis que la délivrance est la prise en compte effective par le processus applicatif.",
        true
      ),
      option(
        'e',
        'La délivrance garantit que le message est correct (checksum), alors que la réception ne le garantit pas.'
      ),
      option(
        'f',
        "Il n'y a aucune différence, ce sont deux termes synonymes pour l'arrivée d'un message."
      ),
    ]
  ),
  choiceQuestion(
    13,
    'Cocher une affirmation si elle est correcte.',
    [
      unlabeledOption(
        'Le multiplexage permet de scruter tout événement sur toute entité manipulable via un descripteur de fichier.',
        true
      ),
      unlabeledOption(
        "Le multiplexage des entrées / sorties permet d'éviter des situations d'interblocage.",
        true
      ),
      unlabeledOption(
        'Le multiplexage ne doit pas être utilisé dans un programme si ce dernier est concurrent.'
      ),
      unlabeledOption(
        "Si on utilise le multiplexage des entrées / sorties dans un programme, aucune attente ne peut être observée à l'exécution de ce programme."
      ),
    ]
  ),
  choiceQuestion(
    14,
    'Le multiplexage des entrées/sorties peut être utilisé pour...',
    [
      option('a', 'envoyer ou recevoir un message.'),
      option(
        'b',
        'permettre à un serveur TCP non concurrent, de traiter plusieurs clients en même temps, mais une requête à la fois.',
        true
      ),
      option('c', "attendre l'arrivée d'un message sur une ou plusieurs sockets.", true),
    ]
  ),
  choiceQuestion(
    15,
    "À quoi sert l'appel système fd_set() ?",
    [
      option(
        'a',
        'À surveiller un ensemble de descripteurs de fichiers pour détecter leur disponibilité sur des opérations de lecture / écriture',
        true
      ),
      option('b', "À définir les droits d'accès associés à un descripteur de fichier."),
      option(
        'c',
        "À indiquer à select() quels descripteurs doivent être surveillés pour des événements de lecture ou d'écriture.",
        true
      ),
      option('d', 'À allouer dynamiquement de la mémoire pour les sockets utilisés par un processus.'),
      option('e', 'À fermer automatiquement les descripteurs de fichiers inactifs.'),
    ]
  ),
  choiceQuestion(
    16,
    'Le multiplexage des entrées/sorties peut être utilisé pour...',
    [
      option('a', 'remplacer un ensemble de sockets par une seule socket.'),
      option('b', "attendre qu'un buffer de réception contienne des données.", true),
      option('c', "détecter la réception d'une demande de connexion.", true),
    ]
  ),
  choiceQuestion(
    17,
    'Le multiplexage des entrées/sorties peut être utilisé pour...',
    [
      option('a', 'générer automatiquement un serveur TCP concurrent.'),
      option(
        'b',
        "qu'un même processus soit capable de recevoir un message pendant qu'il envoie un autre message."
      ),
      option('c', "attendre qu'un buffer de réception contienne des données.", true),
    ]
  ),
  choiceQuestion(
    18,
    'Le multiplexage des entrées/sorties peut être utilisé pour...',
    [
      option('a', 'envoyer un message.'),
      option(
        'b',
        "regrouper des sockets TCP et UDP dans un ensemble de sockets et attendre, en une seule opération, l'arrivée de messages sur un sous ensemble de ces sockets.",
        true
      ),
      option('c', 'recevoir un message.'),
    ]
  ),
  choiceQuestion(
    19,
    'Le multiplexage des entrées/sorties peut être utilisé pour...',
    [
      option('a', 'envoyer ou recevoir un message.'),
      option(
        'b',
        "permettre à un serveur TCP de traiter, l'une après l'autre, des requêtes en provenance de différents clients, sans être un serveur concurrent.",
        true
      ),
      option('c', "attendre qu'un buffer d'envoi ne soit plus plein.", true),
    ]
  ),
  choiceQuestion(
    20,
    "Dans le cadre de l'implémentation de la diffusion fiable dans un graphe quelconque à N processus, l'idée a été d'utiliser le multiplexage pour qu'un processus Pi puisse attendre l'arrivée d'un message. L'ensemble fd_set que doit scruter Pi pour réaliser cette attente inclut :",
    [
      unlabeledOption("L'ensemble des sockets représentant les sites clients de Pi."),
      unlabeledOption("L'ensemble des sockets représentant les sites serveurs de Pi."),
      unlabeledOption("L'ensemble des sockets représentant les voisins de Pi.", true),
      unlabeledOption("L'ensemble des sockets représentant tous les sites Pj (j ≠ i)."),
    ]
  ),
  choiceQuestion(
    21,
    'Concernant la constante FD_SETSIZE utilisée pour le multiplexage, quelle affirmation est vraie ?',
    [
      option(
        'a',
        'Si un descripteur dépasse FD_SETSIZE, select() redimensionne automatiquement le tableau.'
      ),
      option(
        'b',
        "Elle est fixée dynamiquement à l'exécution selon la mémoire disponible."
      ),
      option('c', 'Sa valeur par défaut est 4096 sur les systèmes 64 bits.'),
      option(
        'd',
        "Sa valeur par défaut est 1024, mais elle peut être redéfinie avant l'inclusion de sys/select.h, à condition que tout le programme soit recompilé avec cette valeur.",
        true
      ),
      option(
        'e',
        'Elle peut être modifiée pour une seule fonction sans impacter le reste du programme ou les bibliothèques liées.'
      ),
      option(
        'f',
        "Elle représente le nombre d'octets maximum pouvant être lus par select(), et non le nombre de descripteurs."
      ),
    ]
  ),
  choiceQuestion(
    22,
    "Lors de l'utilisation de l'appel système select(), pourquoi est-il impératif de réinitialiser les ensembles de descripteurs (fd_set) à l'intérieur de la boucle de fonctionnement, avant chaque appel à la fonction ?",
    [
      option(
        'a',
        'Car la macro FD_ZERO est appelée implicitement par le noyau à la fin de select().'
      ),
      option('b', 'Car cela permet de changer dynamiquement la taille de FD_SETSIZE.'),
      option(
        'c',
        'Car select() modifie les ensembles passés en paramètres pour ne garder que les descripteurs prêts, effaçant les autres.',
        true
      ),
      option(
        'd',
        'Car select() ferme automatiquement les sockets inactives, il faut donc les rouvrir.'
      ),
      option(
        'e',
        "Car les descripteurs changent de numéro d'identification à chaque tour de boucle."
      ),
      option(
        'f',
        'Car select() réinitialise automatiquement tous les descripteurs à zéro après le timeout.'
      ),
    ]
  ),
  choiceQuestion(
    23,
    "L'affirmation suivante est-elle correcte ?\n\nSoit HL(e) l'horloge de Lamport d'un événement e.\n\nSi HL(e) < HL(e') alors e → e'",
    [unlabeledOption('Vrai'), unlabeledOption('Faux', true)]
  ),
  choiceQuestion(
    24,
    "L'affirmation suivante est-elle correcte ?\n\nLes horloges de Lamport permettent de détecter si deux événements sont concurrents.",
    [unlabeledOption('True'), unlabeledOption('False', true)]
  ),
  choiceQuestion(
    25,
    "L'affirmation suivante est-elle correcte ?\n\nSoit HL(e) l'horloge de Lamport d'un événement e.\n\nSi e → e', alors HL(e) < HL(e')",
    [unlabeledOption('True', true), unlabeledOption('False')]
  ),
  choiceQuestion(
    26,
    "L'affirmation suivante est-elle correcte ?\n\nSoit HL(e) l'horloge de Lamport d'un événement e.\n\nSi HL(e) est différent de HL(e') alors e et e' sont deux événements concurrents",
    [unlabeledOption('True'), unlabeledOption('False', true)]
  ),
  choiceQuestion(
    27,
    "L'affirmation suivante est-elle correcte ?\n\nLes horloges de Lamport produisent un ordre partiel dans lequel des événements peuvent avoir la même valeur. On peut alors casser les égalités en ajoutant l'id du processus local comme élément discriminant et obtenir un ordre total.",
    [unlabeledOption('True', true), unlabeledOption('False')]
  ),
  textQuestion(
    28,
    "Pour chacun des paires d'horloges vectorielles suivantes, indiquez s'il existe une relation d'ordre < ou >, ou si les deux vecteurs sont incomparables ||\n\n(1, 2) ? (2, 2)\n(3, 4) ? (4, 3)\n(5, 6, 7, 8) ? (6, 7, 8, 9)\n(1, 6, 0, 9) ? (1, 5, 0, 9)\n(2, 4, 8, 6, 0) ? (2, 6, 9, 6, 9)\n(2, 4, 6, 8, 0) ? (1, 3, 5, 7, 9)",
    '(1, 2) < (2, 2)\n(3, 4) || (4, 3)\n(5, 6, 7, 8) < (6, 7, 8, 9)\n(1, 6, 0, 9) > (1, 5, 0, 9)\n(2, 4, 8, 6, 0) < (2, 6, 9, 6, 9)\n(2, 4, 6, 8, 0) || (1, 3, 5, 7, 9)'
  ),
  choiceQuestion(
    29,
    "Dans un système réparti, chaque événement est estampillé par une horloge vectorielle de Mattern.\n\nSoit les estampilles suivantes pour deux événements e1 et e2 suivants :\n\n• pour e1 : (3, 5, 0, 9, 7)\n• pour e2 : (3, 5, 0, 9, 7)\n\nQue dire de la relation entre e1 et e2?",
    [
      option(
        'a',
        "Les deux événements sont intervenus en même temps, qu'ils soient sur le même processus ou des processus différents"
      ),
      option('b', "Il s'agit du même événement", true),
      option('c', 'Les deux événements sont sur le même processus et apparaissent simultanément'),
      option('d', 'Les deux événements sont sur des processus différents'),
      option(
        'e',
        "Les deux événements sont en concurrence, il n'y a pas de relation de causalité"
      ),
    ]
  ),
  choiceQuestion(
    30,
    "Soit un système réparti composé de 3 processus P1, P2 et P3. Ce système estampille ses événements au moyen d'horloges matricielles utilisant la variante “communication-aware” (modèle vu en cours).\n\nOn vous donne la ligne de temps suivantes. Au début de cette ligne de temps, l'état de l'horloge matricielle de chaque processus est présenté à sa gauche.\n\nÉtats initiaux :\nP1 =\n3 1 1\n0 0 0\n0 0 0\n\nP2 =\n1 1 0\n0 2 0\n0 0 0\n\nP3 =\n3 1 1\n0 0 0\n0 0 3\n\nLigne de temps :\nP1 : local → émission vers P2 → local → réception de P3 → réception de P2 (e_final)\nP2 : réception de P1 → réception de P3 → émission vers P1\nP3 : local → émission vers P2 → émission vers P1 → local → local\n\nQuelle sera l'estampille de l'événement e_final, dernier événement du processus P1, une fois tous les événements exécutés?",
    [
      option('a', matrix([[1, 8, 2], [1, 5, 1], [1, 6, 0]])),
      option('b', matrix([[1, 2, 5], [5, 6, 2], [8, 1, 6]])),
      option('c', matrix([[7, 1, 1], [1, 4, 0], [0, 1, 5]])),
      option('d', matrix([[8, 2, 2], [5, 6, 2], [1, 1, 6]])),
      option('e', matrix([[8, 2, 1], [1, 5, 0], [1, 1, 6]]), true),
      option('f', matrix([[8, 1, 2], [0, 5, 1], [1, 1, 6]])),
    ]
  ),
  choiceQuestion(
    31,
    "On considère une coupure dans un système réparti (ensemble d'états locaux des processus). Quelle propriété supplémentaire est nécessaire et suffisante pour que cette coupure soit dite cohérente ?",
    [
      option('a', 'Les horloges logiques de tous les processus ont la même valeur.'),
      option('b', "Chaque processus a exécuté le même nombre d'événements."),
      option('c', 'Tous les processus ont franchi la coupure au même instant réel.'),
      option('d', "Aucun message n'est en transit au moment de la coupure."),
      option('e', 'Tous les canaux de communication sont synchrones.'),
      option(
        'f',
        "La coupure respecte la causalité : aucune réception de message n'apparaît sans l'envoi correspondant",
        true
      ),
    ]
  ),
  choiceQuestion(
    32,
    `Soit 3 processus s'exécutant dans un système réparti.

On défini la coupure C suivante.

${coupureC}

En estampillant les événements avec une horloge logique de Lamport, et en supposant que chaque processus commence avec une horloge logique de 0 lors de son initialisation, quelle serait la date de cette coupure ?`,
    [
      option('a', '(0,0,0)'),
      option('b', '(4,5,4)'),
      option('c', '(2,3,4)'),
      option('d', '(6,6,6) <- the number of the beast!!'),
      option('e', '(3,4,3)', true),
      option('f', '(3, 3, 3)'),
    ]
  ),
  choiceQuestion(
    33,
    `Soit 3 processus s'exécutant dans un système réparti.

On défini la coupure C suivante.

${coupureC}

Cette coupure est-elle cohérente?`,
    [option('a', 'non'), option('b', 'oui', true)]
  ),
  textQuestion(
    34,
    `${electionAlgorithm}

Quelle est la valeur initiale des variables locales de chaque processus dans le système suivant ?

Anneau unidirectionnel : P7 → P3 → P4 → P5 → P2 → P7`,
    'P7 : etat_i = A ; resultat_i = faux ; tmp_i = 7 ; v_i = indéfinie ; w_i = indéfinie\nP3 : etat_i = A ; resultat_i = faux ; tmp_i = 3 ; v_i = indéfinie ; w_i = indéfinie\nP4 : etat_i = A ; resultat_i = faux ; tmp_i = 4 ; v_i = indéfinie ; w_i = indéfinie\nP5 : etat_i = A ; resultat_i = faux ; tmp_i = 5 ; v_i = indéfinie ; w_i = indéfinie\nP2 : etat_i = A ; resultat_i = faux ; tmp_i = 2 ; v_i = indéfinie ; w_i = indéfinie'
  ),
  textQuestion(
    35,
    "En supposant que tous les processus appellent la procédure demander en même temps, quelle est la valeur des variables locales de chaque processus après avoir exécuté l'algorithme ?\n\nAnneau unidirectionnel : P7 → P3 → P4 → P5 → P2 → P7",
    'P7 : etat_i = P ; resultat_i = faux ; tmp_i = 2 ; v_i = 3 ; w_i = 2\nP3 : etat_i = P ; resultat_i = faux ; tmp_i = 3 ; v_i = 7 ; w_i = 2\nP4 : etat_i = A ; resultat_i = vrai ; tmp_i = 2 ; v_i = 2 ; w_i = 3\nP5 : etat_i = P ; resultat_i = faux ; tmp_i = 5 ; v_i = 4 ; w_i = 3\nP2 : etat_i = P ; resultat_i = faux ; tmp_i = 2 ; v_i = 5 ; w_i = 4'
  ),
  choiceQuestion(
    36,
    'Cet algorithme est :',
    [
      unlabeledOption("un algorithme d'exclusion mutuelle."),
      unlabeledOption("un algorithme de calcul d'un état global d'un système réparti."),
      unlabeledOption('un algorithme répondant à un autre problème.'),
      unlabeledOption('un algorithme de diffusion.'),
      unlabeledOption("un algorithme d'élection d'un leader.", true),
    ]
  ),
  choiceQuestion(
    37,
    'Pourquoi Bitcoin, basé sur une blockchain publique, peut-il être considéré comme un système réparti ?',
    [
      option('a', "Il n'existe aucune autorité centrale contrôlant l'état global du système.", true),
      option(
        'b',
        'Le système repose sur une horloge physique globale parfaitement synchronisée.'
      ),
      option(
        'c',
        "Les pannes ou déconnexions de certains nœuds n'empêchent pas le système de continuer à fonctionner.",
        true
      ),
      option(
        'd',
        'Les nœuds coopèrent pour maintenir un état cohérent via un mécanisme de consensus distribué (preuve de travail).',
        true
      ),
      option('e', 'Les nœuds partagent une mémoire centrale commune pour stocker la blockchain.'),
      option(
        'f',
        'Les données (la blockchain) sont répliquées sur un grand nombre de nœuds du réseau.',
        true
      ),
    ]
  ),
  choiceQuestion(
    38,
    'Dans une blockchain classique (ex. Bitcoin, Ethereum), que contient fondamentalement la blockchain ?',
    [
      option('a', 'Une collection de blocs indépendants synchronisés par horloges physiques'),
      option(
        'b',
        'Une suite de blocs contenant des transactions, chaque bloc étant lié cryptographiquement au précédent par un hash',
        true
      ),
      option(
        'c',
        "Une base de données centralisée contenant l'état courant de tous les comptes."
      ),
      option('d', 'Un ensemble de clés privées partagées entre les nœuds du réseau.'),
      option('e', 'Un registre ne contenant que le solde final de chaque utilisateur.'),
      option('f', 'Une liste de transactions non ordonnées validées par un serveur central.'),
    ]
  ),
  choiceQuestion(
    40,
    "Dans une blockchain utilisant la preuve de travail (ex. Bitcoin), en quoi consiste précisément le minage d'un bloc ?",
    [
      option(
        'a',
        'À trouver une valeur de nonce telle que le hash du bloc contienne un nombre minimal de bits à 1.'
      ),
      option('b', 'À sélectionner arbitrairement un nonce fourni par le réseau.'),
      option('c', "À résoudre un système d'équations cryptographiques déterministes."),
      option('d', 'À recalculer les hashes de tous les blocs précédents.'),
      option(
        'e',
        'À trouver une valeur de nonce telle que le hash du bloc respecte une contrainte de difficulté, typiquement un nombre suffisant de bits à 0 en tête du hash.',
        true
      ),
      option('f', 'À chiffrer le contenu du bloc avec la clé privée du mineur.'),
    ]
  ),
];

export default progRepartieQuestions;
