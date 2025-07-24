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
      {/* Rule Title - Prominently displayed at the top */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className="text-sf-button border-sf-button/30">
            {ruleNo || `Rule ${id}`}
          </Badge>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-sf-text-bold leading-tight">
            {title}
          </h2>
          <div className="h-px bg-gradient-to-r from-sf-button/30 via-sf-button/10 to-transparent"></div>
        </div>
        
        {/* Bengali Description - Second line with proper spacing and typography */}
        {bengali && (
          <div className="space-y-2 pt-2">
            <p className="text-lg text-sf-text-subtle leading-relaxed font-medium">
              {bengali}
            </p>
          </div>
        )}
      </div>
      
      {/* Structures - Clear visual separation */}
      {structures && structures.length > 0 && (
        <div className="space-y-4 mb-6 pt-4 border-t border-sf-text-muted/10">
          <ContentBox
            type="structure"
            title="Structures"
            content={structures}
          />
        </div>
      )}

      {/* Examples - Below description with clear visual separation */}
      <div className="space-y-4 pt-4 border-t border-sf-text-muted/10">
        <ContentBox
          type="example"
          title="Examples"
          content={examples}
        />
      </div>
    </div>
  );
}