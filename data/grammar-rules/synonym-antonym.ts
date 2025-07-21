// Centralized Synonym and Antonym Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

import { GrammarRule, GrammarLevel, GrammarTopicSlug } from '@/types/grammar.types';

export interface SynonymAntonymRule extends Omit<GrammarRule, 'topic' | 'level'> {
  topic: 'synonym-antonym';
  level: GrammarLevel;
}

export const synonymAntonymRules: SynonymAntonymRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Common Synonyms (সমার্থক শব্দ)",
    bengali: "সাধারণ সমার্থক শব্দ",
    description: "Words that have similar meanings and can be used interchangeably in most contexts",
    structures: [
      "Word → Synonym 1, Synonym 2, Synonym 3",
      "Choose the most appropriate synonym based on context"
    ],
    examples: [
      "Beautiful → Pretty, Lovely, Attractive, Gorgeous",
      "Happy → Joyful, Cheerful, Glad, Delighted",
      "Big → Large, Huge, Enormous, Massive",
      "Good → Excellent, Fine, Great, Wonderful",
      "Fast → Quick, Rapid, Swift, Speedy"
    ],
    topic: 'synonym-antonym',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Common Antonyms (বিপরীত শব্দ)",
    bengali: "সাধারণ বিপরীত শব্দ",
    description: "Words that have opposite meanings and express contrasting ideas",
    structures: [
      "Word → Antonym 1, Antonym 2",
      "Consider the degree of opposition when choosing antonyms"
    ],
    examples: [
      "Beautiful → Ugly, Hideous",
      "Happy → Sad, Unhappy, Miserable",
      "Big → Small, Tiny, Little",
      "Good → Bad, Poor, Terrible",
      "Fast → Slow, Sluggish"
    ],
    topic: 'synonym-antonym',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Academic Vocabulary Synonyms",
    bengali: "একাডেমিক শব্দভাণ্ডারের সমার্থক শব্দ",
    description: "Advanced synonyms commonly used in academic and formal writing",
    structures: [
      "Simple word → Academic equivalent",
      "Use formal synonyms in academic contexts"
    ],
    examples: [
      "Show → Demonstrate, Illustrate, Exhibit",
      "Help → Assist, Aid, Support",
      "Important → Significant, Crucial, Essential",
      "Think → Consider, Contemplate, Reflect",
      "Use → Utilize, Employ, Apply"
    ],
    topic: 'synonym-antonym',
    level: 'HSC'
  }
];

// Export metadata for the topic
export const synonymAntonymMetadata = {
  topic: 'synonym-antonym' as const,
  slug: 'synonym-antonym' as const,
  level: 'HSC' as GrammarLevel,
  totalRules: synonymAntonymRules.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
};