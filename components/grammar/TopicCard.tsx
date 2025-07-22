'use client';

import { StandardizedTopicCard } from '@/components/ui/standardized-topic-card';

interface TopicCardProps {
  id: string;
  name: string;
  description: string;
  available: boolean;
  level: 'hsc' | 'ssc';
  isGrammarItems?: boolean;
  questionCount?: number;
  marks?: string;
  details?: string;
}

/**
 * TopicCard - Legacy wrapper component that uses StandardizedTopicCard
 * 
 * This component maintains backward compatibility while using the new
 * standardized topic card design across all sections.
 */
export default function TopicCard({ 
  id, 
  name, 
  description, 
  available, 
  level,
  isGrammarItems = false,
  questionCount,
  marks,
  details
}: TopicCardProps) {
  // Only render if available - maintain legacy behavior
  if (!available) {
    return (
      <div className="h-full opacity-75 cursor-not-allowed">
        <div className="h-full border border-sf-text-muted/20 bg-neutral-800/50 rounded-xl p-6 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-sf-text-muted text-lg font-medium">{name}</div>
            <div className="text-sf-text-muted/70 text-sm">Coming Soon</div>
          </div>
        </div>
      </div>
    );
  }

  // Map to standardized topic structure
  const standardizedTopic = {
    id,
    name,
    slug: id,
    icon: getTopicIcon(id),
    color: getTopicColor(id)
  };

  // Determine section based on isGrammarItems prop
  const section = isGrammarItems ? 'grammar-items' : 'board-questions';

  return (
    <StandardizedTopicCard
      topic={standardizedTopic}
      section={section}
      questionCount={questionCount}
      size="standard"
      showHoverEffects={true}
    />
  );
}

// Helper functions to maintain topic consistency
function getTopicIcon(topicId: string): string {
  const iconMap: Record<string, string> = {
    'completing-sentence': '📝',
    'connectors': '🔗',
    'modifier': '🎯',
    'narration': '💬',
    'transformation': '🔄',
    'use-of-verbs': '⚡',
    'preposition': '📍',
    'punctuation': '❗',
    'synonym-antonym': '📚'
  };
  return iconMap[topicId] || '📚';
}

function getTopicColor(topicId: string): string {
  const colorMap: Record<string, string> = {
    'completing-sentence': '#3B82F6',
    'connectors': '#10B981',
    'modifier': '#F59E0B',
    'narration': '#8B5CF6',
    'transformation': '#EF4444',
    'use-of-verbs': '#06B6D4',
    'preposition': '#84CC16',
    'punctuation': '#F97316',
    'synonym-antonym': '#EC4899'
  };
  return colorMap[topicId] || '#3B82F6';
}