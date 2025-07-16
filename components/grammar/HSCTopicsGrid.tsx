'use client';

import TopicCard from './TopicCard';

interface HSCTopicsGridProps {
  level: 'hsc' | 'ssc';
}

const HSC_GRAMMAR_TOPICS = [
  {
    id: 'completing-sentence',
    name: 'Completing Sentence',
    description: 'Practice completing sentences with appropriate words, phrases, and clauses based on grammar rules and context.',
    available: true,
  },
  {
    id: 'modifier',
    name: 'Modifier',
    description: 'Learn to use pre-modifiers and post-modifiers to enhance noun phrases and verb phrases effectively.',
    available: false,
  },
  {
    id: 'connectors',
    name: 'Connectors',
    description: 'Master the use of linking words and phrases to create coherent and well-connected sentences.',
    available: false,
  },
  {
    id: 'transformation',
    name: 'Transformation',
    description: 'Practice transforming sentences between different structures while maintaining meaning.',
    available: false,
  },
  {
    id: 'right-form-of-verbs',
    name: 'Right Form of Verbs',
    description: 'Learn to use correct verb forms in different tenses, voices, and grammatical contexts.',
    available: false,
  },
  {
    id: 'punctuation',
    name: 'Punctuation',
    description: 'Master the proper use of punctuation marks to enhance clarity and meaning in writing.',
    available: false,
  },
  {
    id: 'voice-change',
    name: 'Voice Change',
    description: 'Practice converting sentences between active and passive voice forms.',
    available: false,
  },
  {
    id: 'narration',
    name: 'Narration',
    description: 'Learn to convert direct speech to indirect speech and vice versa.',
    available: false,
  },
  {
    id: 'preposition',
    name: 'Preposition',
    description: 'Master the correct usage of prepositions in various contexts and expressions.',
    available: false,
  },
  {
    id: 'articles',
    name: 'Articles',
    description: 'Learn the proper use of definite and indefinite articles in different situations.',
    available: false,
  },
];

export default function HSCTopicsGrid({ level }: HSCTopicsGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {HSC_GRAMMAR_TOPICS.map((topic) => (
        <TopicCard
          key={topic.id}
          id={topic.id}
          name={topic.name}
          description={topic.description}
          available={topic.available}
          level={level}
          questionCount={topic.available ? undefined : undefined}
        />
      ))}
    </div>
  );
}