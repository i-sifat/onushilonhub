// Centralized Punctuation Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

import { GrammarRule, GrammarLevel, GrammarTopicSlug } from '../../types/grammar.types';

export interface PunctuationRule extends Omit<GrammarRule, 'topic' | 'level'> {
  topic: 'punctuation';
  level: GrammarLevel;
}

export const punctuationRules: PunctuationRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Capital Letters (বড় হাতের অক্ষর)",
    bengali: "বড় হাতের অক্ষর ব্যবহারের নিয়ম",
    description: "Use capital letters at the beginning of sentences, proper nouns, and specific situations",
    structures: [
      "First word of a sentence",
      "Proper nouns (names, places, months, days)",
      "First word after direct speech",
      "The pronoun 'I'"
    ],
    examples: [
      "Once upon a time... (sentence beginning)",
      "Abu, Bangladesh, January, Monday (proper nouns)",
      "He said, \"My dear sons...\" (after direct speech)",
      "I am going to die soon. (pronoun I)"
    ],
    topic: 'punctuation',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Full Stop (পূর্ণচ্ছেদ)",
    bengali: "পূর্ণচ্ছেদ ব্যবহারের নিয়ম",
    description: "Use full stop at the end of declarative sentences and abbreviations",
    structures: [
      "End of declarative sentences",
      "After abbreviations",
      "After indirect speech"
    ],
    examples: [
      "He had three sons. (declarative sentence)",
      "Mr. Abu was a farmer. (abbreviation)",
      "Abu said that he was going to die. (indirect speech)"
    ],
    topic: 'punctuation',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Comma (কমা)",
    bengali: "কমা ব্যবহারের নিয়ম",
    description: "Use comma to separate items, clauses, and in various grammatical situations",
    structures: [
      "Between items in a series",
      "Before coordinating conjunctions",
      "After introductory phrases",
      "Around non-essential information"
    ],
    examples: [
      "Once upon a time, there lived... (after introductory phrase)",
      "They dug, but found nothing. (before conjunction)",
      "Abu, the farmer, was poor. (around non-essential info)",
      "Red, blue, and green (series)"
    ],
    topic: 'punctuation',
    level: 'HSC'
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Quotation Marks (উদ্ধৃতি চিহ্ন)",
    bengali: "উদ্ধৃতি চিহ্ন ব্যবহারের নিয়ম",
    description: "Use quotation marks for direct speech and quoted material",
    structures: [
      "Around direct speech",
      "Around quoted material",
      "Punctuation inside quotation marks"
    ],
    examples: [
      "Abu said, \"My dear sons, I am going to die.\"",
      "He called it \"the real treasure.\"",
      "\"If you can find it,\" he said, \"you will be rich.\""
    ],
    topic: 'punctuation',
    level: 'HSC'
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Question Mark (প্রশ্নবোধক চিহ্ন)",
    bengali: "প্রশ্নবোধক চিহ্ন ব্যবহারের নিয়ম",
    description: "Use question mark at the end of interrogative sentences",
    structures: [
      "End of direct questions",
      "End of rhetorical questions"
    ],
    examples: [
      "Where is the treasure?",
      "Can you find it?",
      "Isn't hard work the real treasure?"
    ],
    topic: 'punctuation',
    level: 'HSC'
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Exclamation Mark (বিস্ময়বোধক চিহ্ন)",
    bengali: "বিস্ময়বোধক চিহ্ন ব্যবহারের নিয়ম",
    description: "Use exclamation mark to express strong emotion or surprise",
    structures: [
      "After exclamatory sentences",
      "After interjections",
      "After strong commands"
    ],
    examples: [
      "What a surprise!",
      "Alas! He died.",
      "Stop! Don't go there."
    ],
    topic: 'punctuation',
    level: 'HSC'
  }
];

// Export metadata for the topic
export const punctuationMetadata = {
  topic: 'punctuation' as const,
  slug: 'punctuation' as const,
  level: 'HSC' as GrammarLevel,
  totalRules: punctuationRules.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
};