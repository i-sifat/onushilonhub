// Centralized Connectors Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

import { GrammarRule, GrammarLevel, GrammarTopicSlug } from '../../types/grammar.types';

export interface ConnectorRule extends Omit<GrammarRule, 'topic' | 'level'> {
  topic: 'connectors';
  level: GrammarLevel;
  structure?: string;
}

export const connectorsRules: ConnectorRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "As a result/ for this/ for this reason/ that is why/ this is why/ thus/ as a consequence/ consequently/ therefore/ so/ hence কারণে/ফলে/এভাবে/তাই",
    bengali: "কারণে/ফলে/এভাবে/তাই",
    description: "Clause/ Sentence দ্বারা কোনো কিছুর কারণ বোঝালে সেই কারণে সংঘটিত প্রভাবের আগে উপরোক্ত Linkers-গুলো ব্যবহূত হয়",
    structure: "Cause + As a result/Therefore/So + Effect",
    structures: ["Cause + As a result/Therefore/So + Effect"],
    examples: [
      "Bangladesh is a small country. So, she cannot house her large population.",
      "Many dishonest businessmen hoard the daily commodities. As a result, the prices of them lie at an imbalanced rate.",
      "Jubaer walked slowly. For this/ For this reason/ That is why/ Thus/ Therefore/ he failed to reach the station in time.",
      "Despite my warning he violated my instruction. As a consequence/ Consequently/ Hence/ Therefore/ For this/ For this reason/ That is why/ Thus/ As a result/ So, he had to suffer much."
    ],
    topic: 'connectors',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "In short/ in brief/ in a few words/ in a word/ in a nutshell/ in fine/ in conclusion/ to sum up/ to summarize/ on the whole সংক্ষেপে/ এককথায় বলতে গেলে",
    bengali: "সংক্ষেপে/ এককথায় বলতে গেলে",
    description: "পূর্বে আলোচিত কোনো বক্তব্যের ইতি টানতে তার পূর্বে এই Linkers-গুলো ব্যবহূত হয়",
    structure: "Discussion + In short/In conclusion + Summary",
    structures: ["Discussion + In short/In conclusion + Summary"],
    examples: [
      "His whole family depends on him. He is the only earning member of his family. In a word, he is the umbrella of his family.",
      "Bangladesh is a small country. She has a large population. She cannot ensure the basic rights of her citizens. People are mostly poor here. Most of them are illiterate. In short/ In brief/ In a word/ In a nutshell/ In fine/ In conclusion/ To conclude/ To sum up/ To summarize/ On the whole, Bangladesh is burdened with many problems."
    ],
    topic: 'connectors',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "In other words/ in the other way অন্য কথায়/ অন্যভাবে বলতে গেলে",
    bengali: "অন্য কথায়/ অন্যভাবে বলতে গেলে",
    description: "কোনো বক্তব্যকে একবার লিখে একই বক্তব্যকে অন্যভাবে প্রকাশ করতে হলে এই Linkers-গুলো ব্যবহূত হয়",
    structure: "Statement + In other words + Rephrased statement",
    structures: ["Statement + In other words + Rephrased statement"],
    examples: [
      "The students do not try to understand English. In other words, they are going from bad to worse.",
      "His crazy activities were crossing all limits. In other words, he was almost mad.",
      "Many students do not prepare themselves for the examination. In other words/ in the other way, they adopt unfair means in the examination."
    ],
    topic: 'connectors',
    level: 'HSC'
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Moreover/ besides/ in addition/ in addition to that/ further more/ in addition to/ again তা ছাড়া/ অধিকন্তু/ আবার",
    bengali: "তা ছাড়া/ অধিকন্তু/ আবার",
    description: "আগের বক্তব্যের সঙ্গে আরও বক্তব্য সংযুক্ত করতে এই Linkers-গুলো ব্যবহূত হয়",
    structure: "Statement + Moreover/Besides + Additional statement",
    structures: ["Statement + Moreover/Besides + Additional statement"],
    examples: [
      "The man has a big flat. Besides this, he has a car.",
      "Our country is a beautiful country. Moreover, she is full of natural resources.",
      "Besides a colour television, the bridegroom demanded a motorcycle.",
      "Bangladesh is a small country. It has a huge population. Poverty is its main problem. Moreover/ Besides/ In addition to that/ In addition/ Furthermore/ Again natural disasters have become its part and parcel."
    ],
    topic: 'connectors',
    level: 'HSC'
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "And/ as well as/ along with/ together with এবং",
    bengali: "এবং",
    description: "এ ধরনের linker দুটি noun/ verb/ adjective/ adverb/preposition-এর মাঝে সংযোজক হিসেবে ব্যবহূত হয়",
    structure: "Element 1 + And/As well as + Element 2",
    structures: ["Element 1 + And/As well as + Element 2"],
    examples: [
      "Sumon together with Lalchand came to my office.",
      "The teacher as well as the students was present.",
      "The students went to the principal and demanded new facilities in their college library.",
      "The boy as well as his brothers has come.",
      "Mr. Hassan along with his son visited our house."
    ],
    topic: 'connectors',
    level: 'HSC'
  }
  // Continue with remaining rules following the same pattern...
];

// Export metadata for the topic
export const connectorsMetadata = {
  topic: 'connectors' as const,
  slug: 'connectors' as const,
  level: 'HSC' as GrammarLevel,
  totalRules: connectorsRules.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
};