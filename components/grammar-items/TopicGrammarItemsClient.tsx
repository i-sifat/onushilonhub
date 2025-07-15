'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, FileText } from 'lucide-react';

interface GrammarRule {
  title: string;
  content: string;
  examples?: string[];
  tips?: string[];
}

interface RulesData {
  topic: string;
  rules: GrammarRule[];
}

interface TopicGrammarItemsClientProps {
  level: string;
  topic: string;
}

export default function TopicGrammarItemsClient({ level, topic }: TopicGrammarItemsClientProps) {
  const [rulesData, setRulesData] = useState<RulesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatTopicName = (topic: string) => {
    return topic
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Simulate loading rules (in real app, this would read from the rules.json file)
  useEffect(() => {
    const loadRules = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // This is where you would normally read from /content/grammar-items/[level]/[topic]/rules.json
        // For now, we'll show empty state to demonstrate the upload instructions
        setRulesData(null);
      } catch (err) {
        setError('Failed to load grammar items');
      } finally {
        setLoading(false);
      }
    };

    if (level && topic) {
      loadRules();
    }
  }, [level, topic]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
        <span className="ml-2 text-sf-text-subtle">Loading grammar items...</span>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="text-sf-button hover:text-sf-button/80 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Grammar Items Content
  if (rulesData) {
    return (
      <>
        <div className="space-y-8">
          {rulesData.rules.map((rule, index) => (
            <div
              key={index}
              className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-sf-text-bold mb-4">
                {rule.title}
              </h2>
              
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-sf-text-subtle leading-relaxed">
                  {rule.content}
                </p>
              </div>

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

  // Empty State / Upload Instructions
  return (
    <>
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-sf-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sf-text-bold mb-2">
          No Grammar Items Available
        </h3>
        <p className="text-sf-text-subtle mb-6">
          Grammar items for "{formatTopicName(topic)}" haven't been uploaded yet.
        </p>
        
        <div className="bg-sf-highlight/10 rounded-lg p-6 border border-sf-button/20 text-left max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-sf-text-bold mb-2">
            To Add Grammar Items for This Topic:
          </h4>
          <p className="text-sf-text-subtle mb-4">
            Create a rules.json file at the following location:
          </p>
          <code className="block bg-sf-bg border border-sf-text-muted/20 rounded p-3 text-sm text-sf-text-subtle mb-4">
            /content/grammar-items/{level}/{topic}/rules.json
          </code>
          
          <div className="mt-4 p-4 bg-sf-bg border border-sf-text-muted/20 rounded">
            <h5 className="font-semibold text-sf-text-bold mb-2">Sample JSON Structure:</h5>
            <pre className="text-xs text-sf-text-subtle overflow-x-auto">
{`{
  "topic": "${formatTopicName(topic)}",
  "rules": [
    {
      "title": "Rule Title",
      "content": "Detailed explanation of the rule...",
      "examples": [
        "Example sentence 1",
        "Example sentence 2"
      ],
      "tips": [
        "Helpful tip 1",
        "Helpful tip 2"
      ]
    }
  ]
}`}
            </pre>
          </div>
        </div>
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