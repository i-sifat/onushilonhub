'use client';

import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import GrammarRuleCard from './GrammarRuleCard';

interface GrammarRule {
  id: number;
  ruleNo?: string;
  title: string;
  bengali?: string;
  description: string;
  structures?: string[];
  examples: string[];
}

interface GrammarRulesListProps {
  rules: GrammarRule[];
  topic: string;
  level: 'hsc' | 'ssc';
  showPracticeLink?: boolean;
  className?: string;
}

export default function GrammarRulesList({
  rules,
  topic,
  level,
  showPracticeLink = true,
  className = ''
}: GrammarRulesListProps) {
  const topicName = topic.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Rules List */}
      <div className="space-y-6">
        {rules.map((rule) => (
          <GrammarRuleCard
            key={rule.id}
            id={rule.id}
            ruleNo={rule.ruleNo}
            title={rule.title}
            bengali={rule.bengali}
            description={rule.description}
            structures={rule.structures}
            examples={rule.examples}
          />
        ))}
      </div>

      {/* Practice Link */}
      {showPracticeLink && (
        <div className="mt-12 text-center bg-sf-highlight/10 rounded-xl p-8 border border-sf-button/20">
          <h3 className="text-xl font-bold text-sf-text-bold mb-4">
            Ready to Practice?
          </h3>
          <p className="text-sf-text-subtle mb-6">
            Now that you've learned the rules, practice with real {level.toUpperCase()} board questions 
            to master {topicName.toLowerCase()} techniques.
          </p>
          <Link
            href={`/board-questions/${level}/${topic}`}
            className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg group"
          >
            <FileText className="h-5 w-5 mr-2" />
            <span>Practice with Board Questions</span>
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}