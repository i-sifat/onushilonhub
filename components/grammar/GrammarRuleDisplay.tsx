"use client";

import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GrammarRuleDisplayProps {
  title: string;
  banglaDescription: string;
  examples: string[];
  className?: string;
  showExamplesLabel?: boolean;
}

interface AnswerState {
  [key: string]: boolean;
}

export const GrammarRuleDisplay: React.FC<GrammarRuleDisplayProps> = ({
  title,
  banglaDescription,
  examples,
  className,
  showExamplesLabel = true
}) => {
  const [revealedAnswers, setRevealedAnswers] = useState<AnswerState>({});

  const toggleAnswer = (exampleIndex: number, answerIndex: number) => {
    const key = `${exampleIndex}-${answerIndex}`;
    console.log('Toggle answer called:', key);
    setRevealedAnswers(prev => {
      const newState = {
        ...prev,
        [key]: !prev[key]
      };
      console.log('New state:', newState);
      return newState;
    });
  };

  const parseExampleWithAnswers = (example: string, exampleIndex: number) => {
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
      
      // Capture the current values to avoid closure issues
      const currentExampleIndex = exampleIndex;
      const currentAnswerIndex = answerIndex;

      console.log('Creating button with key:', key, 'for answer:', answer, 'isRevealed:', isRevealed);
      parts.push(
        <button
          key={key}
          onClick={() => {
            console.log('Button clicked with key:', key, 'exampleIndex:', currentExampleIndex, 'answerIndex:', currentAnswerIndex);
            toggleAnswer(currentExampleIndex, currentAnswerIndex);
          }}
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
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Title */}
      <h3 className="text-xl font-semibold text-sf-text-bold leading-relaxed">
        {title}
      </h3>
      
      {/* Bangla Description */}
      <p className="text-sf-text-subtle leading-relaxed text-base">
        {banglaDescription}
      </p>
      
      {/* Interactive Examples */}
      {examples && examples.length > 0 && (
        <div className="space-y-4">
          {showExamplesLabel && (
            <h4 className="text-lg font-medium text-sf-text-bold">Examples:</h4>
          )}
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
      )}
    </div>
  );
};

export default GrammarRuleDisplay;