'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { GrammarItem, formatTopicName } from '@/lib/content-loader';

interface GrammarRulesDisplayProps {
  grammarData: GrammarItem;
  level: string;
  topic: string;
}

export default function GrammarRulesDisplay({ grammarData, level, topic }: GrammarRulesDisplayProps) {
  return (
    <>
      <div className="space-y-8">
        {grammarData.rules.map((rule, index) => (
          <div
            key={rule.id || index}
            className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6"
          >
            {/* Rule Header */}
            <div className="mb-4">
              {rule.ruleNo && (
                <span className="inline-block bg-sf-button/20 text-sf-button px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {rule.ruleNo}
                </span>
              )}
              <h2 className="text-xl font-semibold text-sf-text-bold">
                {rule.title}
              </h2>
              {rule.bengali && (
                <p className="text-sf-text-muted text-sm mt-1">
                  {rule.bengali}
                </p>
              )}
            </div>
            
            {/* Rule Content */}
            {(rule.content || rule.description) && (
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-sf-text-subtle leading-relaxed">
                  {rule.content || rule.description}
                </p>
              </div>
            )}

            {/* Structures */}
            {rule.structures && rule.structures.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-sf-text-bold mb-3">Structures:</h3>
                <div className="space-y-2">
                  {rule.structures.map((structure, structureIndex) => (
                    <div
                      key={structureIndex}
                      className="bg-sf-highlight/10 border-l-4 border-sf-button p-3 rounded-r"
                    >
                      <p className="text-sf-text-subtle font-mono text-sm">{structure}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Examples */}
            {rule.examples && rule.examples.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-sf-text-bold mb-3">Examples:</h3>
                <div className="space-y-2">
                  {rule.examples.map((example, exampleIndex) => (
                    <div
                      key={exampleIndex}
                      className="bg-sf-highlight/10 border-l-4 border-sf-button p-3 rounded-r"
                    >
                      <p className="text-sf-text-subtle">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {rule.tips && rule.tips.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-sf-text-bold mb-3">Tips:</h3>
                <ul className="space-y-2">
                  {rule.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
                      className="flex items-start space-x-2 text-sf-text-subtle"
                    >
                      <div className="w-2 h-2 bg-sf-button rounded-full mt-2 flex-shrink-0"></div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Related Questions Link */}
      <div className="mt-12 text-center">
        <Link
          href={`/board-questions/${level}?topic=${topic}`}
          className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
        >
          <FileText className="h-5 w-5 mr-2" />
          Practice with {formatTopicName(topic)} Questions
        </Link>
      </div>
    </>
  );
}