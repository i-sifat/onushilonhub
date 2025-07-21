// Centralized Narration Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

import { GrammarRule, GrammarLevel, GrammarTopicSlug } from '@/types/grammar.types';

export interface NarrationRule extends Omit<GrammarRule, 'topic' | 'level'> {
  topic: 'narration';
  level: GrammarLevel;
}

export const narrationRules: NarrationRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Reporting Verb and Inverted Comma Changes",
    bengali: "রিপোর্টিং ভার্ব এবং ইনভার্টেড কমার পরিবর্তন",
    description: "When converting from direct to indirect speech, the reporting verb and inverted commas are replaced based on the type of sentence.",
    structures: [
      "Assertive: Subject + said/told + Object + that + statement.",
      "Interrogative: Subject + asked + Object + if/wh-word + statement.",
      "Imperative: Subject + ordered/advised/forbade/requested + Object + to/not to + verb.",
      "Optative: Subject + wished/prayed + that + statement.",
      "Exclamatory: Subject + exclaimed with joy/sorrow + that + statement."
    ],
    examples: [
      "Direct: He said, 'I am happy.' → Indirect: He said that he was happy.",
      "Direct: She said to me, 'Are you coming?' → Indirect: She asked me if I was coming.",
      "Direct: The teacher said to the student, 'Get out.' → Indirect: The teacher ordered the student to get out.",
      "Direct: Father said, 'May you pass.' → Indirect: Father prayed that I might pass.",
      "Direct: The man said, 'Alas! I am undone.' → Indirect: The man exclaimed with sorrow that he was undone."
    ],
    topic: 'narration',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Person Changes in Narration",
    bengali: "ন্যারেশনে ব্যক্তি পরিবর্তনের নিয়ম",
    description: "Pronouns in the reported speech change based on the subject and object of the reporting verb. First person changes according to the subject, second person according to the object, and third person remains unchanged.",
    structures: [
      "First Person: Changes according to the subject of the reporting verb.",
      "Second Person: Changes according to the object of the reporting verb.",
      "Third Person: No change."
    ],
    examples: [
      "Direct: Rafiq said, 'I am happy.' → Indirect: Rafiq said that he was happy.",
      "Direct: He said to me, 'You are wrong.' → Indirect: He told me that I was wrong.",
      "Direct: She said, 'He is a student.' → Indirect: She said that he was a student.",
      "Direct: The teacher said, 'We are mortal.' → Indirect: The teacher said that we are mortal. (No change for universal 'we')",
      "Direct: He said to me, 'We should do our duty.' → Indirect: He said to me that we should do our duty."
    ],
    topic: 'narration',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Tense Changes in Narration",
    bengali: "ন্যারেশনে টেন্স পরিবর্তনের নিয়ম",
    description: "Tenses in the reported speech shift to a past form when converting to indirect speech, except for universal truths or eternal obligations.",
    structures: [
      "Present Indefinite → Past Indefinite",
      "Present Continuous → Past Continuous",
      "Present Perfect → Past Perfect",
      "Present Perfect Continuous → Past Perfect Continuous",
      "Past Indefinite → Past Perfect",
      "Past Continuous → Past Perfect Continuous",
      "shall/will → would",
      "can → could",
      "may → might",
      "must → had to (except for eternal obligations)"
    ],
    examples: [
      "Direct: He said, 'I am reading.' → Indirect: He said that he was reading.",
      "Direct: She said, 'I have finished.' → Indirect: She said that she had finished.",
      "Direct: They said, 'We went to Dhaka.' → Indirect: They said that they had gone to Dhaka.",
      "Direct: He said, 'You must obey your parents.' → Indirect: He said that I must obey my parents. (No change for eternal obligation)",
      "Direct: She said, 'I can swim.' → Indirect: She said that she could swim."
    ],
    topic: 'narration',
    level: 'HSC'
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Proximity Word Changes",
    bengali: "নিকটবর্তী শব্দের পরিবর্তন",
    description: "Words indicating time, place, or manner in direct speech change to reflect the context in indirect speech.",
    structures: [
      "now → then",
      "today → that day",
      "tomorrow → the next day",
      "yesterday → the previous day",
      "here → there",
      "this → that",
      "these → those",
      "come → go"
    ],
    examples: [
      "Direct: He said, 'I will come tomorrow.' → Indirect: He said that he would come the next day.",
      "Direct: She said, 'I am here now.' → Indirect: She said that she was there then.",
      "Direct: They said, 'This is our book.' → Indirect: They said that that was their book.",
      "Direct: He said, 'Come here.' → Indirect: He told me to go there.",
      "Direct: She said, 'I saw him yesterday.' → Indirect: She said that she had seen him the previous day."
    ],
    topic: 'narration',
    level: 'HSC'
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Sentence Type Narration Rules",
    bengali: "বাক্যের ধরন অনুযায়ী ন্যারেশনের নিয়ম",
    description: "Different sentence types (assertive, interrogative, imperative, optative, exclamatory) follow specific structures when converting to indirect speech.",
    structures: [
      "Assertive: Subject + said/told + Object + that + statement.",
      "Interrogative (Wh-word): Subject + asked + Object + wh-word + statement.",
      "Interrogative (Auxiliary): Subject + asked + Object + if + statement.",
      "Imperative: Subject + ordered/advised/forbade/requested + Object + to/not to + verb.",
      "Optative: Subject + wished/prayed + that + subject + may/might + verb.",
      "Exclamatory: Subject + exclaimed with joy/sorrow + that + statement."
    ],
    examples: [
      "Direct: Samira said to me, 'I am reading a novel.' → Indirect: Samira told me that she was reading a novel.",
      "Direct: He said to me, 'Where do you live?' → Indirect: He asked me where I lived.",
      "Direct: The teacher said to the student, 'Get out.' → Indirect: The teacher ordered the student to get out.",
      "Direct: Father said, 'May you pass.' → Indirect: Father prayed that I might pass.",
      "Direct: Silvia said, 'What a fine bird it is.' → Indirect: Silvia exclaimed with joy that it was a very fine bird."
    ],
    topic: 'narration',
    level: 'HSC'
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Passage Narration Rules",
    bengali: "প্যাসেজ ন্যারেশনের নিয়ম",
    description: "Special cases in narration, such as expressions of thanks, greetings, or multiple sentences, follow specific patterns.",
    structures: [
      "Thanks: Subject + thanked + Object.",
      "Good-bye: Subject + bade + Object + good-bye.",
      "Greetings: Subject + wished + Object + good morning/evening/night.",
      "Vocative: Addressing as + vocative word + sentence structure.",
      "Multiple Sentences (Assertive): First: said/told, Second: added that, Third: further added that.",
      "Multiple Sentences (Interrogative): First: asked, Second: also asked, Third: again asked.",
      "By Allah/By God: Swearing by Allah + sentence structure.",
      "Universal Truth: No tense change."
    ],
    examples: [
      "Direct: Rahim said to Imran, 'Thank you.' → Indirect: Rahim thanked Imran.",
      "Direct: He said to me, 'Good-bye.' → Indirect: He bade me good-bye.",
      "Direct: He said to me, 'Good morning.' → Indirect: He wished me good morning.",
      "Direct: Rahim said, 'Friends, I have read a book.' → Indirect: Addressing them as friends, Rahim said that he had read a book.",
      "Direct: Jamal said to Raihan, 'You are honest. I will trust you.' → Indirect: Jamal told Raihan that he was honest and added that he would trust him forever.",
      "Direct: By Allah, he said to me, 'He will do the work.' → Indirect: Swearing by Allah, he told me that he would do the work.",
      "Direct: He said, 'Honesty is the best policy.' → Indirect: He said that honesty is the best policy."
    ],
    topic: 'narration',
    level: 'HSC'
  }
];

// Export metadata for the topic
export const narrationMetadata = {
  topic: 'narration' as const,
  slug: 'narration' as const,
  level: 'HSC' as GrammarLevel,
  totalRules: narrationRules.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
};