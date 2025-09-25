const FormattedMessage = ({ message }) => {
  // Only format AI responses, keep user messages as plain text
  if (message.sender === 'user') {
    return <p className="text-sm md:text-base leading-relaxed">{message.text}</p>;
  }

  // Function to handle inline formatting (bold text, etc.)
  const formatInlineText = (text) => {
    const parts = [];
    let currentIndex = 0;
    
    // Split by **text** pattern for bold
    const boldRegex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the bold part
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add the bold part
      parts.push(
        <strong key={currentIndex++} className="font-semibold text-[#3c6e71]">
          {match[1]}
        </strong>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : [text];
  };

  // Format AI responses
  const formatAIText = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const elements = [];
    let currentIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Headers (text wrapped in **)
      if (line.match(/^\*\*.*\*\*:?$/)) {
        elements.push(
          <h3 key={currentIndex++} className="text-lg font-semibold text-[#3c6e71] border-b border-[#3c6e71]/30 pb-1 mt-3 mb-2">
            {line.replace(/^\*\*|\*\*:?$/g, '')}
          </h3>
        );
      }
      // Bullet points
      else if (line.match(/^[\*\-\•]\s/)) {
        const bulletText = line.replace(/^[\*\-\•]\s/, '');
        elements.push(
          <div key={currentIndex++} className="flex items-start mb-1">
            <span className="text-[#3c6e71] mr-2 mt-1">•</span>
            <span className="text-sm md:text-base leading-relaxed">
              {formatInlineText(bulletText)}
            </span>
          </div>
        );
      }
      // Numbered lists
      else if (line.match(/^\d+\.\s/)) {
        const number = line.match(/^(\d+)\./)[1];
        const listText = line.replace(/^\d+\.\s/, '');
        elements.push(
          <div key={currentIndex++} className="flex items-start mb-1">
            <span className="text-[#3c6e71] mr-2 mt-1 font-semibold">{number}.</span>
            <span className="text-sm md:text-base leading-relaxed">
              {formatInlineText(listText)}
            </span>
          </div>
        );
      }
      // Code blocks (simple detection)
      else if (line.startsWith('```')) {
        // Skip the opening ```
        continue;
      }
      // Regular paragraphs
      else if (line.length > 0) {
        elements.push(
          <p key={currentIndex++} className="text-sm md:text-base leading-relaxed mb-2">
            {formatInlineText(line)}
          </p>
        );
      }
    }

    return elements.length > 0 ? elements : [
      <p key={0} className="text-sm md:text-base leading-relaxed">{formatInlineText(text)}</p>
    ];
  };

  return (
    <div className="space-y-1">
      {formatAIText(message.text)}
    </div>
  );
};

export default FormattedMessage;