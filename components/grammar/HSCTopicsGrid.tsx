'use client';

import TopicCard from './TopicCard';

interface HSCTopicsGridProps {
  level: 'hsc' | 'ssc';
  isGrammarItems?: boolean;
}

const HSC_GRAMMAR_TOPICS = [
  {
    id: 'preposition',
    name: 'Gap Filling (Preposition)',
    description: 'Practice appropriate preposition and one word preposition usage in gap filling activities without clues.',
    available: true,
    marks: '0.5×10=5',
    details: 'Appropriate preposition and one word preposition'
  },
  {
    id: 'gap-filling-with-clues',
    name: 'Gap Filling (With Clues)',
    description: 'Special use of words including was born, have to/has to, would rather, had better, let alone, as soon as, etc.',
    available: false,
    marks: '0.5×10=5',
    details: 'Was born, Have to/has to, Would rather, Had better, Let alone, As soon as, What\'s __ like, What does __ look like, Introductory of \'there\', Introductory of \'it\''
  },
  {
    id: 'completing-sentence',
    name: 'Completing Sentences',
    description: 'Complete sentences with appropriate clauses and phrases based on grammar rules and context.',
    available: true,
    marks: '1×10=10',
    details: 'With clauses/phrases'
  },
  {
    id: 'use-of-verbs',
    name: 'Use of Verbs',
    description: 'Practice right form of verbs and subject-verb agreement in various grammatical contexts.',
    available: false,
    marks: '0.5×14=7',
    details: 'Right form of verbs and Subject-verb agreement'
  },
  {
    id: 'narration',
    name: 'Narration/Speech',
    description: 'Convert between direct and indirect speech forms with proper grammatical changes.',
    available: true,
    marks: '1×7=7',
    details: 'Direct to indirect and Indirect to direct'
  },
  {
    id: 'modifier',
    name: 'Use of Modifiers',
    description: 'Learn to use adjectives, adjective phrases, adverbs, and adverbial phrases effectively.',
    available: true,
    marks: '0.5×10=5',
    details: 'Adjective and adjective phrase, Adverb and adverbial phrase'
  },
  {
    id: 'connectors',
    name: 'Sentence Connectors',
    description: 'Master the use of conjunctions and conjunctional phrases to create coherent sentences.',
    available: true,
    marks: '0.5×14=7',
    details: 'Conjunction and Conjunctional phrase'
  },
  {
    id: 'synonym-antonym',
    name: 'Synonym and Antonym',
    description: 'Practice identifying and using synonyms and antonyms in various contexts.',
    available: false,
    marks: '0.5×14=7',
    details: 'Synonym and Antonym'
  },
  {
    id: 'transformation',
    name: 'Transformation of Sentences',
    description: 'Transform sentences between different types and structures while maintaining meaning.',
    available: true,
    marks: '1×10=10',
    details: 'Simple-Complex-Compound, Affirmative-Negative, Assertive-Interrogative/Exclamatory/Imperative, Degree'
  },
  {
    id: 'punctuation',
    name: 'Punctuation',
    description: 'Master the proper use of punctuation marks to enhance clarity and meaning in writing.',
    available: false,
    marks: '0.5×14=7',
    details: 'Proper punctuation usage'
  },
  {
    id: 'letter-writing',
    name: 'Letter Writing',
    description: 'Learn formal letter writing and e-mail writing techniques for effective communication.',
    available: false,
    marks: '1×10=10',
    details: 'Formal letter writing and E-Mail writing'
  },
  {
    id: 'paragraph-writing-basic',
    name: 'Paragraph Writing (Basic)',
    description: 'Master listing paragraphs and descriptive paragraph writing techniques.',
    available: false,
    marks: '1×15=15',
    details: 'Listing paragraph and Descriptive paragraph'
  },
  {
    id: 'paragraph-writing-advanced',
    name: 'Paragraph Writing (Advanced)',
    description: 'Learn comparison and contrast paragraphs, and cause and effect paragraph writing.',
    available: false,
    marks: '1×15=15',
    details: 'Comparison and contrast paragraph, Cause and effect paragraph'
  }
];

export default function HSCTopicsGrid({ level, isGrammarItems = false }: HSCTopicsGridProps) {
  return (
    <div className="space-y-8">
      {/* Part A: Grammar Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-2">
            Part A: Grammar (60 Marks)
          </h2>
          <p className="text-sf-text-subtle">
            Master essential grammar topics for HSC English examination
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HSC_GRAMMAR_TOPICS.slice(0, 9).map((topic) => (
            <TopicCard
              key={topic.id}
              id={topic.id}
              name={topic.name}
              description={topic.description}
              available={topic.available}
              level={level}
              isGrammarItems={isGrammarItems}
              marks={topic.marks}
              details={topic.details}
            />
          ))}
        </div>
      </div>

      {/* Part B: Composition Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-2">
            Part B: Composition (40 Marks)
          </h2>
          <p className="text-sf-text-subtle">
            Develop writing skills for effective communication
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HSC_GRAMMAR_TOPICS.slice(9).map((topic) => (
            <TopicCard
              key={topic.id}
              id={topic.id}
              name={topic.name}
              description={topic.description}
              available={topic.available}
              level={level}
              isGrammarItems={isGrammarItems}
              marks={topic.marks}
              details={topic.details}
            />
          ))}
        </div>
      </div>
    </div>
  );
}