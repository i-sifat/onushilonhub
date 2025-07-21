// Centralized Preposition Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

import { GrammarRule, GrammarLevel, GrammarTopicSlug } from '../../types/grammar.types';

export interface PrepositionRule extends Omit<GrammarRule, 'topic' | 'level'> {
  topic: 'preposition';
  level: GrammarLevel;
}

export const prepositionRules: PrepositionRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Preposition 'of' - Possession and Relationship",
    bengali: "'of' - মালিকানা ও সম্পর্ক",
    description: "Used to show possession, relationship, or part of something",
    structures: [
      "Noun + of + Noun",
      "Adjective + of + Noun/Pronoun"
    ],
    examples: [
      "The backbone of a nation (একটি জাতির মেরুদণ্ড)",
      "Conscious of their rights (তাদের অধিকার সম্পর্কে সচেতন)",
      "The roof of the house (বাড়ির ছাদ)",
      "Proud of his success (তার সাফল্যে গর্বিত)"
    ],
    topic: 'preposition',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Preposition 'between' - Two Things",
    bengali: "'between' - দুটি বস্তুর মধ্যে",
    description: "Used to show the relationship or difference between two things",
    structures: [
      "between + Noun + and + Noun",
      "difference between + Noun + and + Noun"
    ],
    examples: [
      "Between right and wrong (সঠিক ও ভুলের মধ্যে)",
      "Between good and bad (ভাল ও মন্দের মধ্যে)",
      "Between you and me (তোমার ও আমার মধ্যে)",
      "Choose between tea and coffee (চা ও কফির মধ্যে বেছে নাও)"
    ],
    topic: 'preposition',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Preposition 'on' - Surface and Phrases",
    bengali: "'on' - পৃষ্ঠে ও বাক্যাংশে",
    description: "Used for surface contact and in fixed phrases",
    structures: [
      "on + the + other hand",
      "on + surface/day/date"
    ],
    examples: [
      "On the other hand (অন্যদিকে)",
      "On the table (টেবিলের উপর)",
      "On Monday (সোমবারে)",
      "On 21st February (২১শে ফেব্রুয়ারিতে)"
    ],
    topic: 'preposition',
    level: 'HSC'
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Preposition 'to' - Direction and Purpose",
    bengali: "'to' - দিক ও উদ্দেশ্য",
    description: "Used to show direction, purpose, or giving importance",
    structures: [
      "give importance + to",
      "go + to + place",
      "listen + to"
    ],
    examples: [
      "Give importance to education (শিক্ষাকে গুরুত্ব দেওয়া)",
      "Go to school (স্কুলে যাওয়া)",
      "Listen to music (গান শোনা)",
      "Talk to someone (কারো সাথে কথা বলা)"
    ],
    topic: 'preposition',
    level: 'HSC'
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Preposition 'among' - More than Two",
    bengali: "'among' - দুইয়ের বেশি",
    description: "Used when referring to more than two people or things",
    structures: [
      "among + the + people/things",
      "distribute among + people"
    ],
    examples: [
      "Among the people (মানুষের মধ্যে)",
      "Among the students (ছাত্রদের মধ্যে)",
      "Distribute among the poor (গরিবদের মধ্যে বিতরণ)",
      "Popular among youth (যুবকদের মধ্যে জনপ্রিয়)"
    ],
    topic: 'preposition',
    level: 'HSC'
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Preposition 'in' - Inside/Location/Time",
    bengali: "'in' - ভিতরে/স্থান/সময়",
    description: "Used for enclosed spaces, locations, and time periods",
    structures: [
      "in + place/country/city",
      "in + time period",
      "in + a proper way"
    ],
    examples: [
      "In different parts (বিভিন্ন অংশে)",
      "In Bangladesh (বাংলাদেশে)",
      "In a proper way (যথাযথ উপায়ে)",
      "In the morning (সকালে)"
    ],
    topic: 'preposition',
    level: 'HSC'
  }
];

// Export metadata for the topic
export const prepositionMetadata = {
  topic: 'preposition' as const,
  slug: 'preposition' as const,
  level: 'HSC' as GrammarLevel,
  totalRules: prepositionRules.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
};