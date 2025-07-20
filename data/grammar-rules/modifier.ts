export interface ModifierRule {
  id: number | string;
  ruleNo: string;
  title: string;
  description: string;
  structure: string;
  examples: string[];
}

export const modifierRules: ModifierRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Pre-modify the noun with adjective",
    description: "Adjective noun-এর গুণ বা বৈশিষ্ট্য বর্ণনা করে। অতএব, noun-এর পূর্বে adjective বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Adjective + Noun",
    examples: ["Cricket is an [international] game. (Dhaka-2023)", "He was a [noble] man in our history. (Rajshahi-2023)"]
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Use a determiner",
    description: "Determiner noun-এর পরিমাণ বা নির্দিষ্টতা নির্দেশ করে। সুতরাং, noun-এর পূর্বে determiner বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Determiner + Noun",
    examples: ["[Each] team consists of eleven players. (Dhaka-2023)", "[This] substance is found in the water of the tube well. (Dhaka-2019)"]
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Use an intensifier to pre-modify adjective",
    description: "Intensifier (e.g., very, too, so, quite) adjective-এর তীব্রতা বা মাত্রা বৃদ্ধি বা হ্রাস করে। তাই, adjective-এর পূর্বে intensifier বসিয়ে adjective-কে pre-modify করতে হয়।",
    structure: "Intensifier + Adjective",
    examples: ["He was [so] kind that he risked his life. (Rajshahi-2023)", "It was a [very] weak boy who was drowning. (Rajshahi-2023)"]
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Use noun adjective to pre-modify the noun",
    description: "একটি noun অন্য একটি noun-এর গুণ বা বৈশিষ্ট্য নির্দেশ করতে পারে। এই ক্ষেত্রে, প্রথম noun-টি adjective-এর মতো কাজ করে এবং দ্বিতীয় noun-কে pre-modify করে। এভাবে noun adjective noun-এর আগে বসে, noun-এর বৈশিষ্ট্য বর্ণনা করে। Note: ১ম noun-টি adjective হিসেবে কাজ করে, যদিও এটি noun।",
    structure: "Noun + Noun",
    examples: ["His literary works have enriched [Bangla] Literature. (Barishal-2023)", "A [cricket] match is played between two teams. (Dhaka-2023)"]
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Use possessive to pre-modify the noun",
    description: "A possessive pronoun (my, our, your, his, her, its, their) মালিকানা বা সম্পর্ক নির্দেশ করে। সুতরাং, noun-এর পূর্বে possessive pronoun বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Possessive + Noun",
    examples: ["It is not a game of [our] country. (Dhaka-2023)", "There are [many] villages in [our] country. (Dhaka-2019)"]
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Use an adverb to pre-modify the verb",
    description: "adverb (e.g., quickly, slowly, easily) verb-এর কার্যপ্রণালী, সময়, স্থান বা মাত্রা নির্দেশ করে। তাই, verb-এর পূর্বে adverb বসিয়ে verb-কে pre-modify করতে হয়।",
    structure: "Adverb + Verb",
    examples: ["They can [hardly / not] put their signature and read [Bengali]. (Barishal-2019)", "[hardly] he finds work. (Cumilla-2023)"]
  },
  {
    id: 7,
    ruleNo: "Rule 7",
    title: "Use demonstrative to pre-modify the noun",
    description: "Demonstratives pronoun (this, that, these, those) নির্দিষ্ট noun বা pronoun-এর প্রতি ইঙ্গিত করে। সুতরাং, noun-এর পূর্বে demonstrative pronoun বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Demonstrative + Noun",
    examples: ["[this] substance is found in the water of the tube well. (Dhaka-2019)", "[these] animals are facing extinction problem. (Chattogram-2023)"]
  },
  {
    id: 8,
    ruleNo: "Rule 8",
    title: "Use a participle to pre-modify the verb",
    description: "participle (present: -ing or past: -ed) verb-এর কার্যপ্রণালী বা সময় নির্দেশ করে। তাই, verb-এর পূর্বে participle বসিয়ে verb-কে pre-modify করতে হয়।",
    structure: "Participle + Verb",
    examples: ["[Wasting] no time, he jumped into the canal. (Rajshahi-2023)", "[Taking] a deep breath, he dived. (Rajshahi-2023)"]
  },
  {
    id: 9,
    ruleNo: "Rule 9",
    title: "Use a participle to pre-modify the noun",
    description: "Participles noun-এর গুণ বা বৈশিষ্ট্য নির্দেশ করে। সুতরাং, noun-এর পূর্বে participle বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Participle + Noun",
    examples: ["A cricket field must be [well-maintained]. (Dhaka-2023)", "The [overflowing] latrines cause water pollution. (Dhaka-2019)"]
  },
  {
    id: 10,
    ruleNo: "Rule 10",
    title: "Use article to pre-modify the noun phrase",
    description: "Articles (a, an, the) noun-এর নির্দিষ্টতা বা অনির্দিষ্টতা নির্দেশ করে। তাই, noun-এর পূর্বে article বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Article + Noun Phrase",
    examples: ["Sabbir is [an] ideal student. (Dinajpur-2017)", "Cricket is [an] international game. (Dhaka-2023)"]
  },
  {
    id: 11,
    ruleNo: "Rule 11",
    title: "Use quantifier to pre-modify the noun",
    description: "Quantifiers (some, many, much, a few, several, a lot of, most, all) পরিমাণ বা সংখ্যা নির্দেশ করে। noun-এর পূর্বে quantifier বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Quantifier + Noun",
    examples: ["There are [many] villages in [our] country. (Dhaka-2019)", "[Several] students were absent yesterday. (Custom from provided content)"]
  },
  {
    id: 12,
    ruleNo: "Rule 12",
    title: "Use a numeral adjective to pre-modify the noun",
    description: "Numeral adjectives (cardinal, e.g., one, two, three, or ordinal, e.g., first, second) সংখ্যা বা ক্রম নির্দেশ করে। noun-এর পূর্বে numeral adjective বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "Numeral Adjective + Noun",
    examples: ["[Two] Umpires conduct the game. (Dhaka-2023)", "[Many] people are uneducated in our country. (Barishal-2023)"]
  },
  {
    id: 13,
    ruleNo: "Rule 1p",
    title: "Use an infinitive to post-modify the verb",
    description: "Infinitive অর্থাৎ to + verb (base form) বসিয়ে verb-এর উদ্দেশ্য বোঝাতে হয়। কেন/কী জন্য কাজটি করছে—এই প্রশ্ন করলে উত্তর খুঁজে পাওয়া যায়। এটি verb-এর পরে বসে post-modify করে।",
    structure: "Verb + Infinitive",
    examples: ["Sometimes, a third umpire is required [to resolve] an acute confusion. (Dhaka-2023)", "He tried [to save] the boy. (Rajshahi-2023)"]
  },
  {
    id: 14,
    ruleNo: "Rule 2p",
    title: "Use an infinitive phrase to post-modify the verb",
    description: "Infinitive phrase অর্থাৎ to + verb + অতিরিক্ত শব্দ বসিয়ে কাজের উদ্দেশ্য বা বিস্তারিত প্রকাশ করা হয়। এটি মূল verb-এর পরে বসে ব্যাখ্যা করে।",
    structure: "Verb + Infinitive Phrase",
    examples: ["Measures should be taken [to stop deforestation]. (Dhaka-2017)", "He wanted [to learn English]. (Custom from provided content)"]
  },
  {
    id: 15,
    ruleNo: "Rule 3p",
    title: "Use a present participle to post-modify the verb",
    description: "Present participle মানে verb+ing। এটি মূল verb-এর পরে বসে কাজটি কিভাবে হচ্ছে তা বোঝায়। অনেক সময় এটি অন্য কাজের পাশাপাশি ঘটে এমন ক্রিয়া প্রকাশ করে।",
    structure: "Verb + Present Participle",
    examples: ["The boy started [drowning] into the canal. (Rajshahi-2023)", "He was seen [running] away. (Custom from provided content)"]
  },
  {
    id: 16,
    ruleNo: "Rule 4p",
    title: "Use a present participle phrase to post-modify the verb",
    description: "Present participle phrase মানে verb+ing + অতিরিক্ত শব্দ। এটি মূল verb-এর পরে বসে বিস্তারিতভাবে কার্যপদ্ধতি বা পরিবেশ বোঝায়।",
    structure: "Verb + Present Participle Phrase",
    examples: ["We are going there [learning English]. (Custom from provided content)", "He wrote letters [admiring English society]. (Custom from provided content)"]
  },
  {
    id: 17,
    ruleNo: "Rule 5p",
    title: "Use an adverb to post-modify the verb",
    description: "Adverb দ্বারা verb-এর সময়, স্থান বা পদ্ধতি বোঝানো হয়। এটি verb-এর পরে বসে post-modify করে।",
    structure: "Verb + Adverb",
    examples: ["People praised him [enormously]. (Rajshahi-2023)", "He sings [well]. (Custom from provided content)"]
  },
  {
    id: 18,
    ruleNo: "Rule 6p",
    title: "Use an adverbial phrase to post-modify the verb",
    description: "Adverbial phrase একটি শব্দগুচ্ছ, যা verb-এর পরে বসে সময়, স্থান, উপায় বা উদ্দেশ্য বোঝায়।",
    structure: "Verb + Adverbial Phrase",
    examples: ["Both teams try [hard enough] to out all batters of the opposite. (Dhaka-2023)", "He sang the songs of equality [in this way]. (Custom from provided content)"]
  },
  {
    id: 19,
    ruleNo: "Rule 7p",
    title: "Use a prepositional phrase to post-modify the verb",
    description: "Prepositional phrase মানে preposition + noun phrase, যা verb-এর পরে বসে স্থান, সময় বা উপায় বোঝাতে ব্যবহৃত হয়।",
    structure: "Verb + Prepositional Phrase",
    examples: ["He sold ice cream [on the beach]. (Cumilla-2023)", "You will suffer [in every stage of your life]. (Custom from provided content)"]
  },
  {
    id: 20,
    ruleNo: "Rule 8p",
    title: "Use a phrase to post-modify the verb",
    description: "কোনো সাধারণ phrase বা শব্দগুচ্ছ যা verb-এর পরে বসে তার অর্থ আরও পরিষ্কার করে।",
    structure: "Verb + Phrase",
    examples: ["Government is trying to mark the tube wells [painting] red colour. (Dhaka-2019)", "The crow thought [for a while] what to do. (Custom from provided content)"]
  },
  {
    id: 21,
    ruleNo: "Rule 9p",
    title: "Use a relative clause to post-modify the noun",
    description: "Relative clause মানে sub+verb সহ একটি clause, যা noun-এর পরে বসে সেটিকে বিশদভাবে ব্যাখ্যা করে। সাধারণত who, which, that ইত্যাদি দিয়ে শুরু হয়।",
    structure: "Noun + Relative Clause",
    examples: ["We have to save wild animals [which are in the risk of extinction]. (Chattogram-2023)", "Arif, [who is coming], is my brother. (Custom from provided content)"]
  },
  {
    id: 22,
    ruleNo: "Rule 10p",
    title: "Post-modify the noun with an appositive",
    description: "Appositive মানে noun বা pronoun-এর পরে বসা একটি অতিরিক্ত noun বা noun phrase, যা ওই noun সম্পর্কিত অতিরিক্ত তথ্য দেয়। এতে sub+verb থাকে না।",
    structure: "Noun + Appositive",
    examples: ["Amerigo, [a street child], lives alone. (Cumilla-2023)", "Nazrul, [our national poet], won the attention. (Custom from provided content)"]
  }
];

