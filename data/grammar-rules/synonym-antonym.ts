// Centralized Synonym and Antonym Grammar Rules Data

export interface SynonymAntonymRule {
  id: number;
  title: string;
  bengali: string;
  description: string;
  structures: string[];
  examples: string[];
}

export const synonymAntonymRules: SynonymAntonymRule[] = [
  {
    id: 1,
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
    ]
  },
  {
    id: 2,
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
    ]
  },
  {
    id: 3,
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
    ]
  }
];