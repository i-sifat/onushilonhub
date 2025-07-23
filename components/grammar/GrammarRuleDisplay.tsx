"use client";

import React from 'react';
import { AnswerToggle } from '@/components/ui/answer-toggle';
import { cn } from '@/lib/utils';

interface GrammarRuleDisplayProps {
  title: string;
  banglaDescription: string;
  examples: string[];
  className?: string;
  showExamplesLabel?: boolean;
}

export const GrammarRuleDisplay: React.FC<GrammarRuleDisplayProps> = ({
  title,
  banglaDescription,
  examples,
  className,
  showExamplesLabel = true
}) => {
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
      
      {/* Examples with Toggle */}
      {examples && examples.length > 0 && (
        <div className="space-y-3">
          {showExamplesLabel && (
            <h4 className="text-lg font-medium text-sf-text-bold">Examples:</h4>
          )}
          <AnswerToggle>
            <div className="space-y-3">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-neutral-700/50 border border-sf-text-muted/10"
                >
                  <p className="text-sf-text-subtle leading-relaxed">
                    {example}
                  </p>
                </div>
              ))}
            </div>
          </AnswerToggle>
        </div>
      )}
    </div>
  );
};

export default GrammarRuleDisplay;