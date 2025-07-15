import BackButton from '@/components/common/BackButton';
import TopicList from '@/components/rules/TopicList';
import { BookOpen, Loader2 } from 'lucide-react';

// Required for static export
export function generateStaticParams() {
  return [
    { level: 'hsc' },
    { level: 'ssc' }
  ];
}

export default function RulesLevelPage({ params }: { params: Promise<{ level: string }> }) {
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-sf-highlight/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-sf-button" />
            </div>
            <h1 className="text-3xl font-bold text-sf-text-bold">
              {level.toUpperCase()} Grammar Items
            </h1>
          </div>
          <p className="text-sf-text-subtle">
            {!loading && topics.length === 0 && (
              <div className="mt-8 bg-sf-highlight/10 rounded-lg p-6 border border-sf-button/20">
                <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
                  Ready to Add Grammar Items?
                </h3>
                <p className="text-sf-text-subtle mb-4">
                  To populate this section with grammar items, create topic folders and upload your files:
                </p>
                <div className="space-y-2">
                  <code className="block bg-sf-bg border border-sf-text-muted/20 rounded p-3 text-sm text-sf-text-subtle">
                    /content/grammar-items/{level}/[topic-name]/rules.json
                  </code>
                  <p className="text-sf-text-muted text-sm">
                    Example: <code>/content/grammar-items/{level}/tense/rules.json</code>
                  </p>
                  <p className="text-sf-text-muted text-sm">
                    Example: <code>/content/grammar-items/{level}/voice/rules.json</code>
                  </p>
                </div>
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
}