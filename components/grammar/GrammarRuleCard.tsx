'use client';

import { Badge } from '@/components/ui/badge';

interface GrammarRuleCardProps {
  id: number;
  ruleNo?: string;
  title: string;
  bengali?: string;
  description: string;
  structures?: string[];
  examples: string[];
  className?: string;
}

export default function GrammarRuleCard({
  id,
  ruleNo,
  title,
  bengali,
  description,
  structures,
  examples,
  className = ''
}: GrammarRuleCardProps) {
  return (
    <div
      className={`bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 hover:border-sf-button/30 transition-all duration-300 ${className}`}
    >
      {/* Rule Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-sf-button border-sf-button/30">
              {ruleNo || `Rule ${id}`}
            </Badge>
            <h2 className="text-xl font-bold text-sf-text-bold">
              {title}
            </h2>
          </div>
        </div>
        
        {bengali && (
          <p className="text-sf-text-muted text-sm">
            <span className="font-medium">Bengali:</span> {bengali}
          </p>
        )}
      </div>
      
      {/* Structures */}
      {structures && structures.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Structures:</h3>
          <div className="space-y-3">
            {structures.map((structure, index) => (
              <div
                key={index}
                className="bg-sf-highlight/10 border-l-4 border-sf-button p-4 rounded-r-lg"
              >
                <p className="text-sf-text-subtle font-mono text-sm leading-relaxed">
                  {structure}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      <div>
        <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Examples:</h3>
        <div className="space-y-3">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-sf-highlight/10 border-l-4 border-sf-button p-4 rounded-r-lg"
            >
              <p className="text-sf-text-subtle leading-relaxed">
                {example}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}