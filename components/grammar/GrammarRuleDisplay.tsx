"use client";

import React, { useState, useCallback, memo, useMemo } from 'react';
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

export const GrammarRuleDisplay: React.FC<GrammarRuleDisplayProps> = memo(({
  title,
  banglaDescription,
  examples,
  className,
  showExamplesLabel = true
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
      
      // Capture the current values to avoid closure issues
      const currentExampleIndex = exampleIndex;
      const currentAnswerIndex = answerIndex;

      parts.push(
        <button
          key={key}
          onClick={() => {
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
  }, [revealedAnswers, toggleAnswer]);

  // Parse examples on each render to ensure state updates are reflected
  const parsedExamples = examples.map((example, index) => ({
    example,
    index,
    parsed: parseExampleWithAnswers(example, index)
  }));

  return (
    <div className={cn("space-y-6", className)}>
      {/* Rule Title - Prominently displayed at the top */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-sf-text-bold leading-tight">
          {title}
        </h2>
        <div className="h-px bg-gradient-to-r from-sf-button/30 via-sf-button/10 to-transparent"></div>
      </div>
      
      {/* Bengali Description - Second line with proper spacing and typography */}
      <div className="space-y-3">
        <p className="text-lg text-sf-text-subtle leading-relaxed font-medium">
          {banglaDescription}
        </p>
      </div>
      
      {/* Interactive Examples - Below description with clear visual separation */}
      {examples && examples.length > 0 && (
        <div className="space-y-5 pt-4 border-t border-sf-text-muted/10">
          {showExamplesLabel && (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-sf-text-bold flex items-center space-x-2">
                <span>Examples</span>
                <div className="flex-1 h-px bg-gradient-to-r from-sf-text-muted/20 to-transparent"></div>
              </h3>
            </div>
          )}
          <div className="space-y-4">
            {parsedExamples.map(({ index, parsed }) => (
              <div 
                key={index}
                className="p-5 bg-neutral-800/50 border border-sf-text-muted/20 rounded-xl hover:border-sf-text-muted/30 hover:bg-neutral-800/60 transition-all duration-200 shadow-sm"
              >
                <div className="text-sf-text-subtle leading-relaxed text-base">
                  {parsed}
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-sf-text-muted flex items-center space-x-3 bg-neutral-800/30 p-4 rounded-lg border border-sf-text-muted/10">
            <Eye className="h-4 w-4 text-sf-button flex-shrink-0" />
            <span className="leading-relaxed">Click on the eye icons to reveal answers. Click revealed answers to hide them again.</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default GrammarRuleDisplay;