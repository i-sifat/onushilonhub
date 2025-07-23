"use client";

import React, { useState, useCallback } from 'react';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractiveAnswerRevealProps {
  title: string;
  banglaDescription: string;
  examples: string[];
  className?: string;
}

interface AnswerState {
  [key: string]: boolean;
}

export const InteractiveAnswerReveal: React.FC<InteractiveAnswerRevealProps> = ({
  title,
  banglaDescription,
  examples,
  className
}) => {
  const [revealedAnswers, setRevealedAnswers] = useState<AnswerState>({});

  const toggleAnswer = useCallback((exampleIndex: number, answerIndex: number) => {
    const key = `${exampleIndex}-${answerIndex}`;
    setRevealedAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const parseExampleWithAnswers = useCallback((example: string, exampleIndex: number) => {
    // Parse examples like "Cricket is an [international] game. (Dhaka-2023)"
    const answerPattern = /\[([^\]]+)\]/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let answerIndex = 0;

    let match: RegExpExecArray | null;
    // Reset the regex lastIndex to ensure it starts from the beginning
    answerPattern.lastIndex = 0;
    while ((match = answerPattern.exec(example)) !== null) {
      // Add text before the answer
      if (match.index > lastIndex) {
        parts.push(example.slice(lastIndex, match.index));
      }

      // Add the interactive answer element
      const key = `${exampleIndex}-${answerIndex}`;
      const isRevealed = revealedAnswers[key] || false;
      const answer = match[1];

      parts.push(
        <button
          key={key}
          onClick={() => toggleAnswer(exampleIndex, answerIndex)}
          className={cn(
            "inline-flex items-center justify-center px-2 py-1 mx-1 rounded-md text-sm font-medium transition-all duration-200",
            "border focus:outline-none focus:ring-2 focus:ring-sf-button focus:ring-offset-2 focus:ring-offset-sf-bg",
            isRevealed 
              ? "bg-success-500/20 text-success-600 border-success-500/30 hover:bg-success-500/30"
              : "bg-sf-button/20 text-sf-button border-sf-button/30 hover:bg-sf-button/30 hover:scale-105"
          )}
          aria-label={isRevealed ? `Hide answer: ${answer}` : "Reveal answer"}
          data-testid={isRevealed ? "revealed-answer" : "eye-button"}
          data-answer-key={key}
        >
          {isRevealed ? (
            <span className="min-w-0">{answer}</span>
          ) : (
            <Eye className="h-3 w-3 flex-shrink-0" data-testid="eye-icon" />
          )}
        </button>
      );

      lastIndex = match.index + match[0].length;
      answerIndex++;
    }

    // Add remaining text
    if (lastIndex < example.length) {
      parts.push(example.slice(lastIndex));
    }

    return parts;
  }, [revealedAnswers, toggleAnswer]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Rule Title */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-sf-text-bold">
          {title}
        </h2>
        <p className="text-sf-text-subtle leading-relaxed">
          {banglaDescription}
        </p>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sf-text-bold">
          Examples
        </h3>
        <div className="space-y-3">
          {examples.map((example, index) => (
            <div 
              key={index}
              className="p-4 bg-neutral-800/50 border border-sf-text-muted/20 rounded-lg hover:border-sf-text-muted/30 transition-colors duration-200"
            >
              <div className="text-sf-text-subtle leading-relaxed text-base">
                {parseExampleWithAnswers(example, index)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-sf-text-muted flex items-center space-x-2 bg-neutral-800/30 p-3 rounded-md border border-sf-text-muted/10">
          <Eye className="h-3 w-3 text-sf-button" />
          <span>Click on the eye icons to reveal answers. Click revealed answers to hide them again.</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAnswerReveal;