// Centralized Modifier Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

export interface ModifierRule {
  id: number;
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
    title: "Pre-modify the noun",
    description: "Use adjectives, determiners, or noun adjectives before the noun to describe or specify it.",
    structure: "Determiner/Adjective/Noun adjective + Noun",
    examples: [
      "A beautiful girl (সুন্দর মেয়ে)",
      "The rich man (ধনী লোক)",
      "My favorite book (আমার প্রিয় বই)",
      "A school building (একটি স্কুল ভবন)"
    ]
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Use a determiner to pre-modify the noun",
    description: "Use articles (a, an, the), demonstratives (this, that), possessives (my, his), or quantifiers (some, many) before nouns.",
    structure: "Determiner + Noun",
    examples: [
      "The book (বইটি)",
      "This house (এই বাড়ি)",
      "My friend (আমার বন্ধু)",
      "Some people (কিছু লোক)",
      "Many students (অনেক ছাত্র)"
    ]
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Use an intensifier to pre-modify the adjective",
    description: "Use words like very, quite, rather, extremely, too before adjectives to show degree or intensity.",
    structure: "Intensifier + Adjective",
    examples: [
      "Very beautiful (খুব সুন্দর)",
      "Quite intelligent (বেশ বুদ্ধিমান)",
      "Rather difficult (বেশ কঠিন)",
      "Extremely hot (অত্যন্ত গরম)",
      "Too expensive (খুব দামি)"
    ]
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Use a noun adjective to pre-modify the noun",
    description: "Use one noun to modify another noun, where the first noun acts as an adjective.",
    structure: "Noun (as adjective) + Noun",
    examples: [
      "School bag (স্কুলের ব্যাগ)",
      "Tea cup (চায়ের কাপ)",
      "Book store (বইয়ের দোকান)",
      "Water bottle (পানির বোতল)",
      "Cricket match (ক্রিকেট খেলা)"
    ]
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Use possessive to pre-modify the noun",
    description: "Use possessive adjectives (my, your, his, her, its, our, their) or possessive nouns before nouns.",
    structure: "Possessive + Noun",
    examples: [
      "My book (আমার বই)",
      "His car (তার গাড়ি)",
      "Our school (আমাদের স্কুল)",
      "John's house (জনের বাড়ি)",
      "The cat's tail (বিড়ালের লেজ)"
    ]
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Pre-modify the verb",
    description: "Use adverbs before verbs to describe how, when, or to what extent the action is performed.",
    structure: "Adverb + Verb",
    examples: [
      "Quickly run (দ্রুত দৌড়ানো)",
      "Carefully write (সাবধানে লেখা)",
      "Always help (সর্বদা সাহায্য করা)",
      "Never lie (কখনো মিথ্যা বলা না)",
      "Often visit (প্রায়ই দেখা করা)"
    ]
  },
  {
    id: 7,
    ruleNo: "Rule 7",
    title: "Use a demonstrative to pre-modify the noun",
    description: "Use demonstrative adjectives (this, that, these, those) before nouns to point out specific items.",
    structure: "Demonstrative + Noun",
    examples: [
      "This book (এই বই)",
      "That house (ওই বাড়ি)",
      "These flowers (এই ফুলগুলো)",
      "Those students (ওই ছাত্রছাত্রীরা)",
      "This problem (এই সমস্যা)"
    ]
  },
  {
    id: 8,
    ruleNo: "Rule 8",
    title: "Use a participle to pre-modify the verb",
    description: "Use present participles (-ing) or past participles (-ed/-en) before verbs to show ongoing or completed actions.",
    structure: "Participle + Verb",
    examples: [
      "Running fast (দৌড়াতে দৌড়াতে)",
      "Singing loudly (জোরে গান গাইতে গাইতে)",
      "Having finished (শেষ করে)",
      "Being tired (ক্লান্ত হয়ে)",
      "Looking around (চারদিকে তাকিয়ে)"
    ]
  },
  {
    id: 9,
    ruleNo: "Rule 9",
    title: "Use participle to post-modify the noun",
    description: "Use present or past participles after nouns to provide additional information about them.",
    structure: "Noun + Participle",
    examples: [
      "The man walking (হাঁটতে থাকা লোকটি)",
      "The book written (লেখা বইটি)",
      "A girl singing (গান গাইতে থাকা মেয়েটি)",
      "The house built (নির্মিত বাড়িটি)",
      "Students studying (অধ্যয়নরত ছাত্রছাত্রীরা)"
    ]
  },
  {
    id: 10,
    ruleNo: "Rule 10",
    title: "Use the article to pre-modify the noun phrase",
    description: "Use definite article 'the' or indefinite articles 'a/an' before noun phrases.",
    structure: "Article + Noun Phrase",
    examples: [
      "The beautiful garden (সুন্দর বাগানটি)",
      "A tall building (একটি উঁচু ভবন)",
      "The old man (বৃদ্ধ লোকটি)",
      "An interesting story (একটি আকর্ষণীয় গল্প)",
      "The first day (প্রথম দিনটি)"
    ]
  },
  {
    id: 11,
    ruleNo: "Rule 11",
    title: "Use an infinitive phrase to post-modify the noun",
    description: "Use 'to + verb' after nouns to show purpose or describe the noun's function.",
    structure: "Noun + to + Verb",
    examples: [
      "A book to read (পড়ার জন্য একটি বই)",
      "Time to study (পড়ার সময়)",
      "A place to live (থাকার জায়গা)",
      "Something to eat (খাওয়ার কিছু)",
      "A chance to win (জেতার সুযোগ)"
    ]
  },
  {
    id: 12,
    ruleNo: "Rule 12",
    title: "Post-modify the verb with an infinitive",
    description: "Use infinitive (to + verb) after verbs to show purpose or result.",
    structure: "Verb + to + Verb",
    examples: [
      "Want to go (যেতে চাওয়া)",
      "Try to understand (বোঝার চেষ্টা করা)",
      "Hope to succeed (সফল হওয়ার আশা করা)",
      "Plan to visit (দেখা করার পরিকল্পনা করা)",
      "Decide to help (সাহায্য করার সিদ্ধান্ত নেওয়া)"
    ]
  },
  {
    id: 13,
    ruleNo: "Rule 13",
    title: "Use an infinitive phrase to post-modify the verb",
    description: "Use infinitive phrases after verbs to express purpose, intention, or result.",
    structure: "Verb + Infinitive Phrase",
    examples: [
      "Came to see me (আমাকে দেখতে এসেছিল)",
      "Went to buy books (বই কিনতে গিয়েছিল)",
      "Stopped to rest (বিশ্রাম নিতে থামল)",
      "Called to inform (জানাতে ফোন করল)",
      "Worked to earn money (টাকা আয় করতে কাজ করল)"
    ]
  },
  {
    id: 14,
    ruleNo: "Rule 14",
    title: "Post-modify the verb with a present participle",
    description: "Use present participle (-ing form) after verbs to show simultaneous or continuous action.",
    structure: "Verb + Present Participle",
    examples: [
      "Kept working (কাজ করতে থাকল)",
      "Went running (দৌড়াতে গেল)",
      "Sat reading (পড়তে বসল)",
      "Stood waiting (অপেক্ষা করে দাঁড়িয়ে রইল)",
      "Came singing (গান গাইতে গাইতে এল)"
    ]
  },
  {
    id: 15,
    ruleNo: "Rule 15",
    title: "Use a present participle to post-modify the verb phrase",
    description: "Use present participle after verb phrases to show manner or accompanying action.",
    structure: "Verb Phrase + Present Participle",
    examples: [
      "Walked down the street singing (গান গাইতে গাইতে রাস্তা দিয়ে হাঁটল)",
      "Sat in the garden reading (বাগানে বসে পড়ল)",
      "Ran to school carrying books (বই নিয়ে স্কুলে দৌড়ে গেল)",
      "Worked all night preparing (সারারাত প্রস্তুতি নিয়ে কাজ করল)",
      "Traveled around the world learning (শিখতে শিখতে বিশ্বজুড়ে ভ্রমণ করল)"
    ]
  },
  {
    id: 16,
    ruleNo: "Rule 16",
    title: "Post-modify the verb",
    description: "Use adverbs, adverbial phrases, or prepositional phrases after verbs to provide additional information.",
    structure: "Verb + Adverb/Adverbial Phrase",
    examples: [
      "Spoke loudly (জোরে কথা বলল)",
      "Worked hard (কঠোর পরিশ্রম করল)",
      "Arrived late (দেরিতে পৌঁছাল)",
      "Left early (তাড়াতাড়ি চলে গেল)",
      "Studied carefully (সাবধানে পড়াশোনা করল)"
    ]
  },
  {
    id: 17,
    ruleNo: "Rule 17",
    title: "Post-modify the adjective",
    description: "Use adverbs, prepositional phrases, or infinitives after adjectives to modify their meaning.",
    structure: "Adjective + Modifier",
    examples: [
      "Very happy (খুব খুশি)",
      "Quite difficult (বেশ কঠিন)",
      "Easy to understand (বোঝা সহজ)",
      "Hard to believe (বিশ্বাস করা কঠিন)",
      "Good at singing (গানে ভালো)"
    ]
  },
  {
    id: 18,
    ruleNo: "Rule 18",
    title: "Post-modify the verb with prepositional phrase/Adverbial",
    description: "Use prepositional phrases or adverbials after verbs to show time, place, manner, or other circumstances.",
    structure: "Verb + Prepositional Phrase/Adverbial",
    examples: [
      "Went to school (স্কুলে গেল)",
      "Lived in Dhaka (ঢাকায় থাকত)",
      "Worked at night (রাতে কাজ করত)",
      "Traveled by train (ট্রেনে ভ্রমণ করল)",
      "Studied for hours (ঘণ্টার পর ঘণ্টা পড়াশোনা করল)"
    ]
  },
  {
    id: 19,
    ruleNo: "Rule 19",
    title: "Use a phrase to post-modify the verb",
    description: "Use various types of phrases after verbs to provide additional information about the action.",
    structure: "Verb + Phrase",
    examples: [
      "Worked with great enthusiasm (অসাধারণ উৎসাহের সাথে কাজ করল)",
      "Spoke in a loud voice (জোর গলায় কথা বলল)",
      "Walked through the forest (বনের মধ্য দিয়ে হাঁটল)",
      "Studied until midnight (মধ্যরাত পর্যন্ত পড়াশোনা করল)",
      "Played during the break (বিরতির সময় খেলল)"
    ]
  },
  {
    id: 20,
    ruleNo: "Rule 20",
    title: "Use a relative clause to post-modify the noun",
    description: "Use relative clauses (who, which, that, where, when) after nouns to provide additional information.",
    structure: "Noun + Relative Clause",
    examples: [
      "The man who came yesterday (যে লোকটি গতকাল এসেছিল)",
      "The book which I bought (যে বইটি আমি কিনেছি)",
      "The place where we met (যে জায়গায় আমরা দেখা করেছিলাম)",
      "The day when it happened (যে দিন এটি ঘটেছিল)",
      "The reason that he left (যে কারণে সে চলে গেছে)"
    ]
  },
  {
    id: 21,
    ruleNo: "Rule 21",
    title: "Post-modify the noun with an appositive",
    description: "Use appositives (noun phrases that rename or explain another noun) after nouns.",
    structure: "Noun + Appositive",
    examples: [
      "Mr. Rahman, our teacher (মি. রহমান, আমাদের শিক্ষক)",
      "Dhaka, the capital city (ঢাকা, রাজধানী শহর)",
      "My friend John (আমার বন্ধু জন)",
      "The poet Nazrul (কবি নজরুল)",
      "Dr. Smith, a famous scientist (ডা. স্মিথ, একজন বিখ্যাত বিজ্ঞানী)"
    ]
  }
];