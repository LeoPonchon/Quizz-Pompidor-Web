import { useEffect, useMemo, useRef, useState } from 'react';
import RichContent from './RichContent';

const DEFAULT_MODEL = process.env.REACT_APP_OPENROUTER_MODEL || 'openai/gpt-5.2';
const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY || '';
const FREE_FALLBACK_MODEL = 'openrouter/free';

function shouldRetryWithFreeFallback(message, model) {
  if (!message || model === FREE_FALLBACK_MODEL) {
    return false;
  }

  return message.includes('No endpoints found') || message.includes('"code":404');
}

function ChatWidget({ siteKnowledge, currentTheme, currentQuestion, currentCourseSection, screen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Pose-moi une question sur le cours, le quiz ou le TP. Je réponds à partir du contenu du site et je peux t'aider à retrouver une notion, une explication ou un extrait de code.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const contextLabel = useMemo(() => {
    if (screen === 'course' && currentCourseSection) {
      return `Cours: ${currentCourseSection.title}`;
    }

    if (screen === 'quiz' && currentQuestion) {
      return `Quiz: ${currentTheme?.label || 'Thème'} · ${currentQuestion.question}`;
    }

    return currentTheme?.label || 'Accueil';
  }, [screen, currentCourseSection, currentQuestion, currentTheme]);

  useEffect(() => {
    const element = messagesEndRef.current;
    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  function getHeaders() {
    return {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-OpenRouter-Title': 'Quiz Pompidor',
    };
  }

  function buildRequestMessages(questionText) {
    const history = messages.slice(-8).map((message) => ({
      role: message.role,
      content: message.content,
    }));

    return [
      {
        role: 'system',
        content: [
          'Tu es l\'assistant pédagogique du site Quiz Pompidor.',
          'Tu dois répondre uniquement à partir du contenu du site fourni ci-dessous.',
          'Si une réponse n\'est pas dans la base, dis-le clairement et propose la notion la plus proche.',
          'Sois clair, précis, et adapté à un étudiant en révision.',
          '',
          `Contexte actuel: ${contextLabel}`,
          '',
          'Base de connaissance du site:',
          siteKnowledge,
        ].join('\n'),
      },
      ...history,
      {
        role: 'user',
        content: questionText,
      },
    ];
  }

  async function requestCompletion(model, questionText) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        model,
        messages: buildRequestMessages(questionText),
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`OpenRouter a répondu ${response.status}: ${errorBody || 'erreur inconnue'}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error('Réponse vide de la part du modèle.');
    }

    return content;
  }

  async function handleSend(event) {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isSending) {
      return;
    }

    if (!OPENROUTER_API_KEY) {
      setError("La variable d'environnement REACT_APP_OPENROUTER_API_KEY n'est pas définie.");
      return;
    }

    setError('');
    setInput('');
    setMessages((current) => [...current, { role: 'user', content: trimmed }]);
    setIsSending(true);

    try {
      let content;

      try {
        content = await requestCompletion(DEFAULT_MODEL, trimmed);
      } catch (chatError) {
        if (!shouldRetryWithFreeFallback(chatError.message || '', DEFAULT_MODEL)) {
          throw chatError;
        }

        content = await requestCompletion(FREE_FALLBACK_MODEL, trimmed);
      }

      setMessages((current) => [...current, { role: 'assistant', content }]);
    } catch (chatError) {
      setError(chatError.message || 'Impossible de joindre OpenRouter.');
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            "Je n'ai pas pu récupérer de réponse. Vérifie ta clé OpenRouter, le modèle choisi ou ta connexion réseau.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className={`chat-shell ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="chat-toggle"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
        aria-expanded={isOpen}
      >
        {isOpen ? 'Masquer le chat IA' : 'Chat IA'}
      </button>

      <section className="chat-panel" aria-hidden={!isOpen}>
        <div className="chat-header">
          <div>
            <div className="chat-title">Assistant du cours</div>
            <div className="chat-subtitle">OpenRouter · {DEFAULT_MODEL}</div>
          </div>
          <button className="chat-close" onClick={() => setIsOpen(false)} type="button" aria-label="Fermer le chat">
            ×
          </button>
        </div>

        <div className="chat-body">
          <div className="chat-message chat-message-system">
            Je peux répondre sur le contenu du site, les chapitres, les QCM et les extraits de code du TP.
          </div>

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}-${message.content.slice(0, 18)}`}
              className={`chat-message chat-message-${message.role}`}
            >
              <RichContent content={message.content} variant="compact" />
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <form className="chat-form" onSubmit={handleSend}>
          <label className="chat-label" htmlFor="chatInput">
            Ta question
          </label>
          <textarea
            id="chatInput"
            ref={inputRef}
            rows={4}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSend(event);
              }
            }}
            placeholder="Ex: Explique-moi CORS ou montre-moi le code d'une route /signin."
          />

          <div className="chat-meta">
            <span>{OPENROUTER_API_KEY ? (isSending ? 'Envoi en cours...' : 'Shift+Entrée pour sauter une ligne') : 'Clé API manquante'}</span>
            <button className="chat-send" type="submit" disabled={isSending || !OPENROUTER_API_KEY}>
              Envoyer
            </button>
          </div>

          {!OPENROUTER_API_KEY && (
            <div className="chat-error">
              Ajoute <code>REACT_APP_OPENROUTER_API_KEY</code> dans ton fichier <code>.env</code> puis relance l’application.
            </div>
          )}

          {error && <div className="chat-error">{error}</div>}
        </form>
      </section>
    </div>
  );
}

export default ChatWidget;
