// Centralized Right Form of Verb Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

import { GrammarRule, GrammarLevel, GrammarTopicSlug } from '@/types/grammar.types';

export interface RightFormVerbRule extends Omit<GrammarRule, 'topic' | 'level'> {
  topic: 'use-of-verbs';
  level: GrammarLevel;
  notes?: string[];
}

export const rightFormVerbRules: RightFormVerbRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Modal Auxiliary + V1",
    bengali: "Modal Auxiliary + মূল ক্রিয়া",
    description: "Modal auxiliary verbs (can, could, may, might, shall, should, will, would, must, ought to, need, dare, used to, have to, had better, would rather) এর পরে সর্বদা V1 বসে।",
    structures: [
      "Subject + Modal Auxiliary + V1 + Object/Extension",
      "Modal Auxiliary + Subject + V1 + Object/Extension? (Interrogative)"
    ],
    examples: [
      "I can speak English fluently. (আমি সাবলীলভাবে ইংরেজি বলতে পারি।)",
      "You should study hard. (তোমার কঠোর পরিশ্রম করা উচিত।)",
      "We must obey our parents. (আমাদের বাবা-মায়ের আজ্ঞা মানতে হবে।)",
      "He would rather die than beg. (সে ভিক্ষা করার চেয়ে মরতে পছন্দ করবে।)"
    ],
    notes: [
      "Modal auxiliary এর পরে কখনো to বসে না (ought to ব্যতীত)",
      "Modal auxiliary এর কোনো past form নেই"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "To + V1 (Infinitive)",
    bengali: "To + মূল ক্রিয়া (অসমাপিকা ক্রিয়া)",
    description: "To এর পরে সর্বদা V1 বসে। এটি infinitive গঠন করে।",
    structures: [
      "Subject + Verb + to + V1 + Object/Extension",
      "It is + Adjective + to + V1 + Object/Extension"
    ],
    examples: [
      "I want to go home. (আমি বাড়ি যেতে চাই।)",
      "She decided to study medicine. (সে চিকিৎসাবিদ্যা পড়ার সিদ্ধান্ত নিল।)",
      "It is difficult to understand this. (এটি বোঝা কঠিন।)",
      "We came here to help you. (আমরা তোমাকে সাহায্য করতে এখানে এসেছি।)"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Let + Object + V1",
    bengali: "Let + Object + মূল ক্রিয়া",
    description: "Let এর পরে object এবং তারপর V1 বসে।",
    structures: [
      "Let + Object + V1 + Extension",
      "Let + us/me/him/her/them + V1 + Object/Extension"
    ],
    examples: [
      "Let me go. (আমাকে যেতে দাও।)",
      "Let us play football. (আসুন আমরা ফুটবল খেলি।)",
      "Let him come in. (তাকে ভিতরে আসতে দাও।)",
      "Let them finish their work. (তাদের কাজ শেষ করতে দাও।)"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Passive Voice Structure",
    bengali: "কর্মবাচ্য গঠন",
    description: "Passive voice এ be verb + V3 ব্যবহার হয়। Be verb টি tense অনুযায়ী পরিবর্তিত হয়।",
    structures: [
      "Subject + be verb + V3 + by + Object",
      "Subject + be verb + being + V3 + by + Object (Continuous)",
      "Subject + have/has/had + been + V3 + by + Object (Perfect)"
    ],
    examples: [
      "The work is done by him. (কাজটি তার দ্বারা করা হয়।)",
      "The letter was written by me. (চিঠিটি আমার দ্বারা লেখা হয়েছিল।)",
      "The house is being built by them. (বাড়িটি তাদের দ্বারা নির্মিত হচ্ছে।)",
      "The book has been read by her. (বইটি তার দ্বারা পড়া হয়েছে।)"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Gerund (V+ing as Noun)",
    bengali: "Gerund (ক্রিয়া+ing বিশেষ্য হিসেবে)",
    description: "Gerund হলো V+ing যা noun এর কাজ করে। এটি subject, object বা preposition এর object হিসেবে ব্যবহৃত হয়।",
    structures: [
      "Gerund + Verb + Object/Extension (Subject হিসেবে)",
      "Subject + Verb + Gerund + Object/Extension (Object হিসেবে)",
      "Preposition + Gerund + Object/Extension"
    ],
    examples: [
      "Swimming is a good exercise. (সাঁতার একটি ভালো ব্যায়াম।)",
      "I enjoy reading books. (আমি বই পড়তে উপভোগ করি।)",
      "He is fond of playing cricket. (সে ক্রিকেট খেলতে পছন্দ করে।)",
      "After finishing the work, he left. (কাজ শেষ করার পর সে চলে গেল।)"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Subject-Verb Agreement",
    bengali: "কর্তা-ক্রিয়ার সামঞ্জস্য",
    description: "Subject singular হলে verb singular হবে, subject plural হলে verb plural হবে।",
    structures: [
      "Singular Subject + Singular Verb + Object/Extension",
      "Plural Subject + Plural Verb + Object/Extension",
      "Third Person Singular + Verb+s/es + Object/Extension"
    ],
    examples: [
      "He goes to school daily. (সে প্রতিদিন স্কুলে যায়।)",
      "They go to school daily. (তারা প্রতিদিন স্কুলে যায়।)",
      "The boy plays football. (ছেলেটি ফুটবল খেলে।)",
      "The boys play football. (ছেলেরা ফুটবল খেলে।)"
    ],
    notes: [
      "Third person singular subject এর সাথে verb এ s/es যোগ হয়",
      "Collective noun singular verb নেয় যদি group হিসেবে কাজ করে"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  },
  {
    id: 7,
    ruleNo: "Rule 7",
    title: "Conditional Sentences",
    bengali: "শর্তসাপেক্ষ বাক্য",
    description: "If clause এ present tense হলে main clause এ future tense হয়। If clause এ past tense হলে main clause এ conditional হয়।",
    structures: [
      "If + Subject + V1/V2 + Object, Subject + will/would + V1 + Object",
      "If + Subject + had + V3 + Object, Subject + would have + V3 + Object"
    ],
    examples: [
      "If you work hard, you will succeed. (তুমি কঠোর পরিশ্রম করলে সফল হবে।)",
      "If I were rich, I would help the poor. (আমি ধনী হলে গরিবদের সাহায্য করতাম।)",
      "If he had studied, he would have passed. (সে পড়াশোনা করলে পাশ করত।)"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  },
  {
    id: 8,
    ruleNo: "Rule 8",
    title: "Present Participle (V+ing)",
    bengali: "বর্তমান কৃদন্ত (ক্রিয়া+ing)",
    description: "Present participle continuous tense, adjective বা adverb হিসেবে ব্যবহৃত হয়।",
    structures: [
      "Subject + be verb + V+ing + Object/Extension (Continuous)",
      "V+ing + Object, Subject + Verb + Extension (Participle phrase)"
    ],
    examples: [
      "I am reading a book. (আমি একটি বই পড়ছি।)",
      "The running water is clean. (প্রবাহমান পানি পরিষ্কার।)",
      "Walking in the park, I met my friend. (পার্কে হাঁটতে হাঁটতে আমি আমার বন্ধুর সাথে দেখা করলাম।)"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  },
  {
    id: 9,
    ruleNo: "Rule 9",
    title: "Past Participle (V3)",
    bengali: "অতীত কৃদন্ত (ক্রিয়ার তৃতীয় রূপ)",
    description: "Past participle perfect tense, passive voice এবং adjective হিসেবে ব্যবহৃত হয়।",
    structures: [
      "Subject + have/has/had + V3 + Object/Extension (Perfect)",
      "Subject + be verb + V3 + by + Object (Passive)",
      "V3 + Object, Subject + Verb + Extension (Participle phrase)"
    ],
    examples: [
      "I have finished my work. (আমি আমার কাজ শেষ করেছি।)",
      "The work was completed yesterday. (কাজটি গতকাল সম্পন্ন হয়েছিল।)",
      "Broken by the storm, the tree fell down. (ঝড়ে ভেঙে গিয়ে গাছটি পড়ে গেল।)"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  },
  {
    id: 10,
    ruleNo: "Rule 10",
    title: "Habitual Past (used to + V1)",
    bengali: "অভ্যাসগত অতীত (used to + মূল ক্রিয়া)",
    description: "অতীতের অভ্যাস বা নিয়মিত কাজ বোঝাতে used to + V1 ব্যবহার হয়।",
    structures: [
      "Subject + used to + V1 + Object/Extension",
      "Subject + did not use to + V1 + Object/Extension (Negative)",
      "Did + Subject + use to + V1 + Object/Extension? (Interrogative)"
    ],
    examples: [
      "I used to play cricket in my childhood. (আমি ছোটবেলায় ক্রিকেট খেলতাম।)",
      "She used to live in Dhaka. (সে ঢাকায় থাকত।)",
      "We did not use to watch TV much. (আমরা খুব বেশি টিভি দেখতাম না।)",
      "Did you use to study at night? (তুমি কি রাতে পড়াশোনা করতে?)"
    ],
    topic: 'use-of-verbs',
    level: 'HSC'
  }
];

// Export metadata for the topic
export const rightFormVerbMetadata = {
  topic: 'use-of-verbs' as const,
  slug: 'use-of-verbs' as const,
  level: 'HSC' as GrammarLevel,
  totalRules: rightFormVerbRules.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
};