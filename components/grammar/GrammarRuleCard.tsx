'use client';

import { Badge } from '@/components/ui/badge';
import { ContentBox } from '@/components/ui/content-box';

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
          <ContentBox
            type="structure"
            title="Structures"
            content={structures}
          />
        </div>
      )}

      {/* Examples */}
      <div>
        <ContentBox
          type="example"
          title="Examples"
          content={examples}
        />
      </div>
    </div>
  );
}