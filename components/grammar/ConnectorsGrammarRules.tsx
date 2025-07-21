'use client';

import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { connectorsRules } from '@/data/grammar-rules/connectors';

export default function ConnectorsGrammarRules() {
  return (
    <div className="space-y-8">
      {/* Rules List */}
      <div className="space-y-6">
        {connectorsRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 hover:border-sf-button/30 transition-all duration-300"
          >
            {/* Rule Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-sf-button border-sf-button/30">
                    {rule.ruleNo}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-sf-text-bold leading-relaxed">
                  {rule.title}
                </h2>
                <p className="text-sf-text-subtle leading-relaxed">
                  <span className="font-medium">Usage:</span> {rule.description}
                </p>
              </div>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Examples:</h3>
              <div className="space-y-3">
                {rule.examples.map((example, index) => (
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
        ))}
      </div>

      {/* Practice Link */}
      <div className="mt-12 text-center bg-sf-highlight/10 rounded-xl p-8 border border-sf-button/20">
        <h3 className="text-xl font-bold text-sf-text-bold mb-4">
          Ready to Practice?
        </h3>
        <p className="text-sf-text-subtle mb-6">
          Now that you've learned the rules, practice with real HSC board questions 
          to master connector techniques.
        </p>
        <Link
          href="/board-questions/hsc/connectors"
          className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg group"
        >
          <FileText className="h-5 w-5 mr-2" />
          <span>Practice with Board Questions</span>
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}