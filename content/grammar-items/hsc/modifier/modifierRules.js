export const modifierRules = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Adjective to pre-modify the noun",
    description: "Adjective noun-এর গুণ বা বৈশিষ্ট্য বর্ণনা করে। অতএব, noun-এর পূর্বে adjective বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "adjective + noun",
    examples: [
      "a famous poet",
      "a hot day", 
      "an international language",
      "a liquid substance"
    ]
  },
  {
    id: 2,
    ruleNo: "Rule 2", 
    title: "Determiner to pre-modify the noun",
    description: "Determiners: 'this', 'that', 'some', 'other', 'any'. Determiner noun-এর পরিমাণ বা নির্দিষ্টতা নির্দেশ করে। সুতরাং, noun-এর পূর্বে determiner বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "determiner + noun",
    examples: [
      "the day",
      "some boys", 
      "another problem",
      "every student"
    ]
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Intensifier to pre-modify the adjective", 
    description: "Intensifier (e.g., very, too, so, quite) adjective-এর তীব্রতা বা মাত্রা বৃদ্ধি বা হ্রাস করে। তাই, adjective-এর পূর্বে intensifier বসিয়ে adjective-কে pre-modify করতে হয়।",
    structure: "intensifier + adjective",
    examples: [
      "very happy",
      "quite difficult",
      "too hot", 
      "really beautiful"
    ]
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Noun adjective to pre-modify the noun",
    description: "একটি noun অন্য একটি noun-এর গুণ বা বৈশিষ্ট্য নির্দেশ করতে পারে। এই ক্ষেত্রে, প্রথম noun-টি adjective-এর মতো কাজ করে এবং দ্বিতীয় noun-কে pre-modify করে।",
    structure: "noun adjective + noun",
    examples: [
      "language skill",
      "career development",
      "Bengali literature",
      "summer day"
    ]
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Possessive to pre-modify the noun",
    description: "A possessive pronoun (my, our, your, his, her, its, their) মালিকানা বা সম্পর্ক নির্দেশ করে। সুতরাং, noun-এর পূর্বে possessive pronoun বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "possessive + noun",
    examples: [
      "his dream",
      "our country",
      "their effort",
      "your teacher"
    ]
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Adverb to pre-modify the verb",
    description: "Adverb (e.g., quickly, slowly, easily) verb-এর কার্যপ্রণালী, সময়, স্থান বা মাত্রা নির্দেশ করে। তাই, verb-এর পূর্বে adverb বসিয়ে verb-কে pre-modify করতে হয়।",
    structure: "adverb + verb",
    examples: [
      "easily win",
      "finally arrived", 
      "happily accepted",
      "quietly entered"
    ]
  },
  {
    id: 7,
    ruleNo: "Rule 7",
    title: "Demonstrative to pre-modify the noun",
    description: "Demonstratives pronoun (this, that, these, those) নির্দিষ্ট noun বা pronoun-এর প্রতি ইঙ্গিত করে। সুতরাং, noun-এর পূর্বে demonstrative pronoun বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "demonstrative + noun",
    examples: [
      "this book",
      "that road",
      "these questions", 
      "those days"
    ]
  },
  {
    id: 8,
    ruleNo: "Rule 8",
    title: "Participle to pre-modify the verb",
    description: "Participle (present: -ing or past: -ed) verb-এর কার্যপ্রণালী বা সময় নির্দেশ করে। তাই, verb-এর পূর্বে participle বসিয়ে verb-কে pre-modify করতে হয়।",
    structure: "participle + verb",
    examples: [
      "Looking around, she saw the thief",
      "Hearing the news, he cried",
      "Opening the door, he entered",
      "Terrified by fear, the boy could not speak"
    ]
  },
  {
    id: 9,
    ruleNo: "Rule 9", 
    title: "Participle to pre-modify the noun",
    description: "Participles noun-এর গুণ বা বৈশিষ্ট্য নির্দেশ করে। সুতরাং, noun-এর পূর্বে participle বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "participle + noun",
    examples: [
      "a crying baby",
      "a broken chair",
      "a standing man",
      "the running water"
    ]
  },
  {
    id: 10,
    ruleNo: "Rule 10",
    title: "Article to pre-modify the noun phrase",
    description: "Articles (a, an, the) noun-এর নির্দিষ্টতা বা অনির্দিষ্টতা নির্দেশ করে। তাই, noun-এর পূর্বে article বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "article + noun phrase",
    examples: [
      "a man",
      "an idea", 
      "the book"
    ]
  },
  {
    id: 11,
    ruleNo: "Rule 11",
    title: "Quantifier to pre-modify the noun",
    description: "Quantifiers (some, many, much, a few, several, a lot of, most, all) পরিমাণ বা সংখ্যা নির্দেশ করে। noun-এর পূর্বে quantifier বসিয়ে noun-কে pre-modify করতে হয়।",
    structure: "quantifier + noun",
    examples: [
      "many students",
      "much water",
      "a few books", 
      "several problems"
    ]
  },
  {
    id: 12,
    ruleNo: "Rule 12",
    title: "Infinitive to post-modify the verb",
    description: "Infinitive অর্থাৎ to + verb (base form) বসিয়ে verb-এর উদ্দেশ্য বোঝাতে হয়। কেন/কী জন্য কাজটি করছে—এই প্রশ্ন করলে উত্তর খুঁজে পাওয়া যায়। এটি verb-এর পরে বসে post-modify করে।",
    structure: "verb + to + base verb",
    examples: [
      "Mills use fuel to produce products",
      "He went to London to attend school",
      "The crow tried to drink water",
      "He visited Parliament to listen to debates"
    ]
  },
  {
    id: 13,
    ruleNo: "Rule 13", 
    title: "Infinitive phrase to post-modify the verb",
    description: "Infinitive phrase অর্থাৎ to + verb + অতিরিক্ত শব্দ বসিয়ে কাজের উদ্দেশ্য বা বিস্তারিত প্রকাশ করা হয়। এটি মূল verb-এর পরে বসে ব্যাখ্যা করে।",
    structure: "verb + to + verb + object/extension",
    examples: [
      "He composed songs to inspire the people",
      "He was lucky to find an English family",
      "They stopped to buy groceries"
    ]
  },
  {
    id: 14,
    ruleNo: "Rule 14",
    title: "Present participle to post-modify the verb",
    description: "Present participle মানে verb+ing। এটি মূল verb-এর পরে বসে কাজটি কিভাবে হচ্ছে তা বোঝায়। অনেক সময় এটি অন্য কাজের পাশাপাশি ঘটে এমন ক্রিয়া প্রকাশ করে।",
    structure: "verb + verb+ing",
    examples: [
      "He wrote letters admiring English society",
      "We pollute water throwing garbage",
      "She walked singing a song"
    ]
  },
  {
    id: 15,
    ruleNo: "Rule 15",
    title: "Present participle phrase to post-modify the verb", 
    description: "Present participle phrase মানে verb+ing + অতিরিক্ত শব্দ। এটি মূল verb-এর পরে বসে বিস্তারিতভাবে কার্যপদ্ধতি বা পরিবেশ বোঝায়।",
    structure: "verb + verb+ing + object/extension",
    examples: [
      "We are going there learning English",
      "He wrote letters admiring English society",
      "She worked washing clothes in rivers"
    ]
  },
  {
    id: 16,
    ruleNo: "Rule 16",
    title: "Adverb to post-modify the verb",
    description: "Adverb দ্বারা verb-এর সময়, স্থান বা পদ্ধতি বোঝানো হয়। এটি verb-এর পরে বসে post-modify করে।",
    structure: "verb + adverb",
    examples: [
      "If you know English well",
      "The crow flew quickly", 
      "Try to learn English properly"
    ]
  },
  {
    id: 17,
    ruleNo: "Rule 17",
    title: "Adverbial phrase to post-modify the verb",
    description: "Adverbial phrase একটি শব্দগুচ্ছ, যা verb-এর পরে বসে সময়, স্থান, উপায় বা উদ্দেশ্য বোঝায়।",
    structure: "verb + adverbial phrase",
    examples: [
      "He sang the songs in this way",
      "You will suffer in every stage of your life",
      "She worked with great care"
    ]
  },
  {
    id: 18,
    ruleNo: "Rule 18",
    title: "Prepositional phrase to post-modify the verb",
    description: "Prepositional phrase মানে preposition + noun phrase, যা verb-এর পরে বসে স্থান, সময় বা উপায় বোঝাতে ব্যবহৃত হয়।",
    structure: "verb + preposition + noun phrase",
    examples: [
      "You will suffer in every stage of life",
      "He walks in the morning",
      "She studied at this time"
    ]
  },
  {
    id: 19,
    ruleNo: "Rule 19",
    title: "Phrase to post-modify the verb",
    description: "কোনো সাধারণ phrase বা শব্দগুচ্ছ যা verb-এর পরে বসে তার অর্থ আরও পরিষ্কার করে।",
    structure: "verb + phrase",
    examples: [
      "The crow thought for a while",
      "He waited after some time",
      "She handled it with great care"
    ]
  },
  {
    id: 20,
    ruleNo: "Rule 20",
    title: "Relative clause to post-modify the noun",
    description: "Relative clause মানে sub+verb সহ একটি clause, যা noun-এর পরে বসে সেটিকে বিশদভাবে ব্যাখ্যা করে। সাধারণত who, which, that ইত্যাদি দিয়ে শুরু হয়।",
    structure: "noun + who/which/that + subject + verb",
    examples: [
      "Arif, who is coming, is my brother",
      "The book which I like is expensive",
      "The man that you saw is my teacher"
    ]
  },
  {
    id: 21,
    ruleNo: "Rule 21",
    title: "Appositive to post-modify the noun",
    description: "Appositive মানে noun বা pronoun-এর পরে বসা একটি অতিরিক্ত noun বা noun phrase, যা ওই noun সম্পর্কিত অতিরিক্ত তথ্য দেয়। এতে sub+verb থাকে না।",
    structure: "noun, appositive noun/phrase,",
    examples: [
      "Nazrul, our national poet, won the attention",
      "Arif, the gentleman, is a player",
      "Dhaka, the capital city, is crowded"
    ]
  }
];