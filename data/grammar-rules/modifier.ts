// Centralized Modifier Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

import { GrammarRule, GrammarLevel, GrammarTopicSlug } from '../../types/grammar.types';

export interface ModifierRule extends Omit<GrammarRule, 'topic' | 'level'> {
  topic: 'modifier';
  level: GrammarLevel;
  structure?: string;
}

export const modifierRules: ModifierRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Pre-modify the noun with adjective",
    bengali: "বিশেষণ দিয়ে বিশেষ্যের পূর্ব-পরিবর্তন",
    description: "Adjective noun-এর গুণ বা বৈশিষ্ট্য বর্ণনা করে। অতএব, noun-এর পূর্বে adjective বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Adjective + Noun",
    structures: ["Adjective + Noun"],
    examples: ["Cricket is an [international] game. (Dhaka-2023)", "He was a [noble] man in our history. (Rajshahi-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Use a determiner",
    bengali: "নির্ধারক ব্যবহার",
    description: "Determiner noun-এর পরিমাণ বা নির্দিষ্টতা নির্দেশ করে। সুতরাং, noun-এর পূর্বে determiner বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Determiner + Noun",
    structures: ["Determiner + Noun"],
    examples: ["[Each] team consists of eleven players. (Dhaka-2023)", "[This] substance is found in the water of the tube well. (Dhaka-2019)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Use an intensifier to pre-modify adjective",
    bengali: "তীব্রতাবাচক দিয়ে বিশেষণের পূর্ব-পরিবর্তন",
    description: "Intensifier (e.g., very, too, so, quite) adjective-এর তীব্রতা বা মাত্রা বৃদ্ধি বা হ্রাস করে। তাই, adjective-এর পূর্বে intensifier বসিয়ে adjective-কে pre-modify করতে হয়।",
    structure: "Intensifier + Adjective",
    structures: ["Intensifier + Adjective"],
    examples: ["He was [so] kind that he risked his life. (Rajshahi-2023)", "It was a [very] weak boy who was drowning. (Rajshahi-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Use noun adjective to pre-modify the noun",
    bengali: "বিশেষ্য বিশেষণ দিয়ে বিশেষ্যের পূর্ব-পরিবর্তন",
    description: "একটি noun অন্য একটি noun-এর গুণ বা বৈশিষ্ট্য নির্দেশ করতে পারে। এই ক্ষেত্রে, প্রথম noun-টি adjective-এর মতো কাজ করে এবং দ্বিতীয় noun-কে pre-modify করে। এভাবে noun adjective noun-এর আগে বসে, noun-এর বৈশিষ্ট্য বর্ণনা করে। Note: ১ম noun-টি adjective হিসেবে কাজ করে, যদিও এটি noun।",
    structure: "Noun + Noun",
    structures: ["Noun + Noun"],
    examples: ["His literary works have enriched [Bangla] Literature. (Barishal-2023)", "A [cricket] match is played between two teams. (Dhaka-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Use possessive to pre-modify the noun",
    bengali: "অধিকারবাচক দিয়ে বিশেষ্যের পূর্ব-পরিবর্তন",
    description: "A possessive pronoun (my, our, your, his, her, its, their) মালিকানা বা সম্পর্ক নির্দেশ করে। সুতরাং, noun-এর পূর্বে possessive pronoun বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Possessive + Noun",
    structures: ["Possessive + Noun"],
    examples: ["It is not a game of [our] country. (Dhaka-2023)", "There are [many] villages in [our] country. (Dhaka-2019)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Use an adverb to pre-modify the verb",
    bengali: "ক্রিয়াবিশেষণ দিয়ে ক্রিয়ার পূর্ব-পরিবর্তন",
    description: "adverb (e.g., quickly, slowly, easily) verb-এর কার্যপ্রণালী, সময়, স্থান বা মাত্রা নির্দেশ করে। তাই, verb-এর পূর্বে adverb বসিয়ে verb-কে pre-modify করতে হয়।",
    structure: "Adverb + Verb",
    structures: ["Adverb + Verb"],
    examples: ["They can [hardly / not] put their signature and read [Bengali]. (Barishal-2019)", "[hardly] he finds work. (Cumilla-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 7,
    ruleNo: "Rule 7",
    title: "Use demonstrative to pre-modify the noun",
    bengali: "নির্দেশক দিয়ে বিশেষ্যের পূর্ব-পরিবর্তন",
    description: "Demonstratives pronoun (this, that, these, those) নির্দিষ্ট noun বা pronoun-এর প্রতি ইঙ্গিত করে। সুতরাং, noun-এর পূর্বে demonstrative pronoun বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Demonstrative + Noun",
    structures: ["Demonstrative + Noun"],
    examples: ["[this] substance is found in the water of the tube well. (Dhaka-2019)", "[these] animals are facing extinction problem. (Chattogram-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 8,
    ruleNo: "Rule 8",
    title: "Use a participle to pre-modify the verb",
    bengali: "কৃদন্ত দিয়ে ক্রিয়ার পূর্ব-পরিবর্তন",
    description: "participle (present: -ing or past: -ed) verb-এর কার্যপ্রণালী বা সময় নির্দেশ করে। তাই, verb-এর পূর্বে participle বসিয়ে verb-কে pre-modify করতে হয়।",
    structure: "Participle + Verb",
    structures: ["Participle + Verb"],
    examples: ["[Wasting] no time, he jumped into the canal. (Rajshahi-2023)", "[Taking] a deep breath, he dived. (Rajshahi-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 9,
    ruleNo: "Rule 9",
    title: "Use a participle to pre-modify the noun",
    bengali: "কৃদন্ত দিয়ে বিশেষ্যের পূর্ব-পরিবর্তন",
    description: "Participles noun-এর গুণ বা বৈশিষ্ট্য নির্দেশ করে। সুতরাং, noun-এর পূর্বে participle বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Participle + Noun",
    structures: ["Participle + Noun"],
    examples: ["A cricket field must be [well-maintained]. (Dhaka-2023)", "The [overflowing] latrines cause water pollution. (Dhaka-2019)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 10,
    ruleNo: "Rule 10",
    title: "Use article to pre-modify the noun phrase",
    bengali: "নির্দেশক দিয়ে বিশেষ্য বাক্যাংশের পূর্ব-পরিবর্তন",
    description: "Articles (a, an, the) noun-এর নির্দিষ্টতা বা অনির্দিষ্টতা নির্দেশ করে। তাই, noun-এর পূর্বে article বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Article + Noun Phrase",
    structures: ["Article + Noun Phrase"],
    examples: ["Sabbir is [an] ideal student. (Dinajpur-2017)", "Cricket is [an] international game. (Dhaka-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 11,
    ruleNo: "Rule 11",
    title: "Use quantifier to pre-modify the noun",
    bengali: "পরিমাণবাচক দিয়ে বিশেষ্যের পূর্ব-পরিবর্তন",
    description: "Quantifiers (some, many, much, a few, several, a lot of, most, all) পরিমাণ বা সংখ্যা নির্দেশ করে। noun-এর পূর্বে quantifier বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Quantifier + Noun",
    structures: ["Quantifier + Noun"],
    examples: ["There are [many] villages in [our] country. (Dhaka-2019)", "[Several] students were absent yesterday. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 12,
    ruleNo: "Rule 12",
    title: "Use a numeral adjective to pre-modify the noun",
    bengali: "সংখ্যাবাচক বিশেষণ দিয়ে বিশেষ্যের পূর্ব-পরিবর্তন",
    description: "Numeral adjectives (cardinal, e.g., one, two, three, or ordinal, e.g., first, second) সংখ্যা বা ক্রম নির্দেশ করে। noun-এর পূর্বে numeral adjective বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Numeral Adjective + Noun",
    structures: ["Numeral Adjective + Noun"],
    examples: ["[Two] Umpires conduct the game. (Dhaka-2023)", "[Many] people are uneducated in our country. (Barishal-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 13,
    ruleNo: "Rule 1p",
    title: "Use an infinitive to post-modify the verb",
    bengali: "অসমাপিকা ক্রিয়া দিয়ে ক্রিয়ার পরবর্তী-পরিবর্তন",
    description: "Infinitive অর্থাৎ to + verb (base form) বসিয়ে verb-এর উদ্দেশ্য বোঝাতে হয়। কেন/কী জন্য কাজটি করছে—এই প্রশ্ন করলে উত্তর খুঁজে পাওয়া যায়। এটি verb-এর পরে বসে post-modify করে।",
    structure: "Verb + Infinitive",
    structures: ["Verb + Infinitive"],
    examples: ["Sometimes, a third umpire is required [to resolve] an acute confusion. (Dhaka-2023)", "He tried [to save] the boy. (Rajshahi-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 14,
    ruleNo: "Rule 2p",
    title: "Use an infinitive phrase to post-modify the verb",
    bengali: "অসমাপিকা ক্রিয়া বাক্যাংশ দিয়ে ক্রিয়ার পরবর্তী-পরিবর্তন",
    description: "Infinitive phrase অর্থাৎ to + verb + অতিরিক্ত শব্দ বসিয়ে কাজের উদ্দেশ্য বা বিস্তারিত প্রকাশ করা হয়। এটি মূল verb-এর পরে বসে ব্যাখ্যা করে।",
    structure: "Verb + Infinitive Phrase",
    structures: ["Verb + Infinitive Phrase"],
    examples: ["Measures should be taken [to stop deforestation]. (Dhaka-2017)", "He wanted [to learn English]. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 15,
    ruleNo: "Rule 3p",
    title: "Use a present participle to post-modify the verb",
    bengali: "বর্তমান কৃদন্ত দিয়ে ক্রিয়ার পরবর্তী-পরিবর্তন",
    description: "Present participle মানে verb+ing। এটি মূল verb-এর পরে বসে কাজটি কিভাবে হচ্ছে তা বোঝায়। অনেক সময় এটি অন্য কাজের পাশাপাশি ঘটে এমন ক্রিয়া প্রকাশ করে।",
    structure: "Verb + Present Participle",
    structures: ["Verb + Present Participle"],
    examples: ["The boy started [drowning] into the canal. (Rajshahi-2023)", "He was seen [running] away. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 16,
    ruleNo: "Rule 4p",
    title: "Use a present participle phrase to post-modify the verb",
    bengali: "বর্তমান কৃদন্ত বাক্যাংশ দিয়ে ক্রিয়ার পরবর্তী-পরিবর্তন",
    description: "Present participle phrase মানে verb+ing + অতিরিক্ত শব্দ। এটি মূল verb-এর পরে বসে বিস্তারিতভাবে কার্যপদ্ধতি বা পরিবেশ বোঝায়।",
    structure: "Verb + Present Participle Phrase",
    structures: ["Verb + Present Participle Phrase"],
    examples: ["We are going there [learning English]. (Custom from provided content)", "He wrote letters [admiring English society]. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 17,
    ruleNo: "Rule 5p",
    title: "Use an adverb to post-modify the verb",
    bengali: "ক্রিয়াবিশেষণ দিয়ে ক্রিয়ার পরবর্তী-পরিবর্তন",
    description: "Adverb দ্বারা verb-এর সময়, স্থান বা পদ্ধতি বোঝানো হয়। এটি verb-এর পরে বসে post-modify করে।",
    structure: "Verb + Adverb",
    structures: ["Verb + Adverb"],
    examples: ["People praised him [enormously]. (Rajshahi-2023)", "He sings [well]. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 18,
    ruleNo: "Rule 6p",
    title: "Use an adverbial phrase to post-modify the verb",
    bengali: "ক্রিয়াবিশেষণ বাক্যাংশ দিয়ে ক্রিয়ার পরবর্তী-পরিবর্তন",
    description: "Adverbial phrase একটি শব্দগুচ্ছ, যা verb-এর পরে বসে সময়, স্থান, উপায় বা উদ্দেশ্য বোঝায়।",
    structure: "Verb + Adverbial Phrase",
    structures: ["Verb + Adverbial Phrase"],
    examples: ["Both teams try [hard enough] to out all batters of the opposite. (Dhaka-2023)", "He sang the songs of equality [in this way]. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 19,
    ruleNo: "Rule 7p",
    title: "Use a prepositional phrase to post-modify the verb",
    bengali: "অব্যয়ীয় বাক্যাংশ দিয়ে ক্রিয়ার পরবর্তী-পরিবর্তন",
    description: "Prepositional phrase মানে preposition + noun phrase, যা verb-এর পরে বসে স্থান, সময় বা উপায় বোঝাতে ব্যবহৃত হয়।",
    structure: "Verb + Prepositional Phrase",
    structures: ["Verb + Prepositional Phrase"],
    examples: ["He sold ice cream [on the beach]. (Cumilla-2023)", "You will suffer [in every stage of your life]. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 20,
    ruleNo: "Rule 8p",
    title: "Use a phrase to post-modify the verb",
    bengali: "বাক্যাংশ দিয়ে ক্রিয়ার পরবর্তী-পরিবর্তন",
    description: "কোনো সাধারণ phrase বা শব্দগুচ্ছ যা verb-এর পরে বসে তার অর্থ আরও পরিষ্কার করে।",
    structure: "Verb + Phrase",
    structures: ["Verb + Phrase"],
    examples: ["Government is trying to mark the tube wells [painting] red colour. (Dhaka-2019)", "The crow thought [for a while] what to do. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 21,
    ruleNo: "Rule 9p",
    title: "Use a relative clause to post-modify the noun",
    bengali: "সম্পর্কবাচক উপবাক্য দিয়ে বিশেষ্যের পরবর্তী-পরিবর্তন",
    description: "Relative clause মানে sub+verb সহ একটি clause, যা noun-এর পরে বসে সেটিকে বিশদভাবে ব্যাখ্যা করে। সাধারণত who, which, that ইত্যাদি দিয়ে শুরু হয়।",
    structure: "Noun + Relative Clause",
    structures: ["Noun + Relative Clause"],
    examples: ["We have to save wild animals [which are in the risk of extinction]. (Chattogram-2023)", "Arif, [who is coming], is my brother. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 22,
    ruleNo: "Rule 10p",
    title: "Post-modify the noun with an appositive",
    bengali: "সমার্থক শব্দ দিয়ে বিশেষ্যের পরবর্তী-পরিবর্তন",
    description: "Appositive মানে noun বা pronoun-এর পরে বসা একটি অতিরিক্ত noun বা noun phrase, যা ওই noun সম্পর্কিত অতিরিক্ত তথ্য দেয়। এতে sub+verb থাকে না।",
    structure: "Noun + Appositive",
    structures: ["Noun + Appositive"],
    examples: ["Amerigo, [a street child], lives alone. (Cumilla-2023)", "Nazrul, [our national poet], won the attention. (Custom from provided content)"],
    topic: 'modifier',
    level: 'HSC'
  }
];

// Export metadata for the topic
export const modifierMetadata = {
  topic: 'modifier' as const,
  slug: 'modifier' as const,
  level: 'HSC' as GrammarLevel,
  totalRules: modifierRules.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
};