import { notFound } from 'next/navigation';
import { getTopicBySlug, getTopicsByLevel } from '@/data/topics';
import { getGrammarRulesByTopic } from '@/data/grammar-rules';

interface PageProps {
  params: {
    level: 'hsc' | 'ssc';
    'topic-slug': string;
  };
}

export default function TopicGrammarRulesPage({ params }: PageProps) {
  const { level, 'topic-slug': topicSlug } = params;
  
  // Convert level to proper case
  const grammarLevel = level.toUpperCase() as 'HSC' | 'SSC';
  
  // Find the topic configuration
  const topic = getTopicBySlug(topicSlug);
  
  if (!topic || (topic.level !== grammarLevel && topic.level !== 'BOTH')) {
    notFound();
  }

  // Get grammar rules for this topic
  const grammarRulesData = getGrammarRulesByTopic(topicSlug as any);
  
  if (!grammarRulesData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{topic.icon}</span>
          <h1 className="text-3xl font-bold">{topic.name}</h1>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
            {grammarLevel}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{topic.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>📊 Difficulty: {topic.difficulty}</span>
          {topic.estimatedTime && (
            <span>⏱️ Estimated Time: {topic.estimatedTime} minutes</span>
          )}
          <span>📝 Rules: {grammarRulesData.rules.length}</span>
        </div>
      </div>

      <div className="grid gap-6">
        {grammarRulesData.rules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-lg shadow-md p-6 border">
            <div className="mb-4">
              {rule.ruleNo && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium mb-2">
                  Rule {rule.ruleNo}
                </span>
              )}
              <h2 className="text-xl font-semibold text-gray-900">{rule.title}</h2>
              {rule.bengali && (
                <p className="text-gray-600 mt-1">{rule.bengali}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-gray-700">{rule.description}</p>
            </div>

            {rule.structures && rule.structures.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Structure:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {rule.structures.map((structure, index) => (
                    <li key={index} className="text-gray-700 font-mono text-sm bg-gray-50 p-2 rounded">
                      {structure}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {rule.examples && rule.examples.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Examples:</h3>
                <ul className="space-y-2">
                  {rule.examples.map((example, index) => (
                    <li key={index} className="text-gray-700 bg-blue-50 p-3 rounded border-l-4 border-blue-200">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {rule.tips && rule.tips.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Tips:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {rule.tips.map((tip, index) => (
                    <li key={index} className="text-gray-600">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const hscTopics = getTopicsByLevel('HSC');
  const sscTopics = getTopicsByLevel('SSC');
  
  const params = [];
  
  // Generate params for HSC topics
  for (const topic of hscTopics) {
    params.push({
      level: 'hsc',
      'topic-slug': topic.slug
    });
  }
  
  // Generate params for SSC topics
  for (const topic of sscTopics) {
    params.push({
      level: 'ssc', 
      'topic-slug': topic.slug
    });
  }
  
  return params;
}