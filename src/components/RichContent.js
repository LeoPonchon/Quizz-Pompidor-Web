function renderHighlightedCode(code, language) {
  if (language !== 'js') {
    return code;
  }

  const tokenRegex =
    /(\/\/.*$|\/\*[\s\S]*?\*\/|`(?:\\.|[^`])*`|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\b(?:const|let|var|function|return|if|else|class|export|import|new|this|true|false|null|undefined|implements|private|public|constructor|async|await|try|catch)\b|@[A-Za-z_]\w*|\b\d+(?:\.\d+)?\b)/gm;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      parts.push(code.slice(lastIndex, match.index));
    }

    const token = match[0];
    let className = 'token-keyword';

    if (token.startsWith('//') || token.startsWith('/*')) {
      className = 'token-comment';
    } else if (token.startsWith('@')) {
      className = 'token-decorator';
    } else if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) {
      className = 'token-string';
    } else if (/^\d/.test(token)) {
      className = 'token-number';
    }

    parts.push(
      <span key={`token-${match.index}`} className={className}>
        {token}
      </span>
    );

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    parts.push(code.slice(lastIndex));
  }

  return parts;
}

function splitContent(content) {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        value: content.slice(lastIndex, match.index),
      });
    }

    parts.push({
      type: 'code',
      language: match[1] || '',
      value: match[2].replace(/\n$/, ''),
    });

    lastIndex = codeBlockRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      value: content.slice(lastIndex),
    });
  }

  return parts;
}

function RichContent({ content, transformContent, variant = 'default', className = '' }) {
  if (!content) {
    return null;
  }

  const normalizedContent = transformContent ? transformContent(content) : content;
  const parts = splitContent(normalizedContent);
  const wrapperClassName = ['rich-content', `rich-content--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName}>
      {parts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <pre
              key={`code-${index}`}
              className="rich-content-code"
              data-language={part.language || 'text'}
            >
              <code>{renderHighlightedCode(part.value, part.language)}</code>
            </pre>
          );
        }

        return part.value
          .split('\n\n')
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
          .map((paragraph, paragraphIndex) => (
            <div key={`text-${index}-${paragraphIndex}`} className="rich-content-text">
              {paragraph}
            </div>
          ));
      })}
    </div>
  );
}

export default RichContent;
