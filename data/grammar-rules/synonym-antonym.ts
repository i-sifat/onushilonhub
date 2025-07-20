// Centralized Synonym and Antonym Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

export interface SynonymAntonymRule {
  id: number;
  ruleNo: string;
  title: string;
  bengali: string;
  description: string;
  structures: string[];
  examples: string[];
}

export const synonymAntonymRules: SynonymAntonymRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Common Adjective Synonyms and Antonyms",
    bengali: "সাধারণ বিশেষণের সমার্থক ও বিপরীত শব্দ",
    description: "Learn the most frequently used adjective synonyms and antonyms in HSC examinations",
    structures: [
      "Positive Adjective → Synonym (Similar meaning)",
      "Positive Adjective → Antonym (Opposite meaning)"
    ],
    examples: [
      "Beautiful → Synonyms: Pretty, Lovely, Attractive | Antonyms: Ugly, Hideous",
      "Happy → Synonyms: Joyful, Cheerful, Glad | Antonyms: Sad, Unhappy, Miserable",
      "Good → Synonyms: Excellent, Fine, Great | Antonyms: Bad, Poor, Terrible",
      "Easy → Synonyms: Simple, Effortless | Antonyms: Difficult, Hard, Complex"
    ]
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Size and Quantity Words",
    bengali: "আকার ও পরিমাণ সংক্রান্ত শব্দ",
    description: "Synonyms and antonyms for words describing size, quantity, and measurement",
    structures: [
      "Size Adjective → Similar size words",
      "Size Adjective → Opposite size words"
    ],
    examples: [
      "Big → Synonyms: Large, Huge, Enormous, Massive | Antonyms: Small, Tiny, Little, Minute",
      "Fast → Synonyms: Quick, Rapid, Swift, Speedy | Antonyms: Slow, Sluggish, Gradual",
      "High → Synonyms: Tall, Elevated, Lofty | Antonyms: Low, Short, Deep",
      "Wide → Synonyms: Broad, Extensive | Antonyms: Narrow, Thin"
    ]
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Emotion and Feeling Words",
    bengali: "আবেগ ও অনুভূতি সংক্রান্ত শব্দ",
    description: "Words expressing emotions, feelings, and mental states",
    structures: [
      "Emotion Word → Similar emotional state",
      "Emotion Word → Opposite emotional state"
    ],
    examples: [
      "Angry → Synonyms: Furious, Enraged, Irate | Antonyms: Calm, Peaceful, Serene",
      "Brave → Synonyms: Courageous, Bold, Fearless | Antonyms: Coward, Timid, Afraid",
      "Proud → Synonyms: Arrogant, Haughty | Antonyms: Humble, Modest",
      "Wise → Synonyms: Intelligent, Smart, Clever | Antonyms: Foolish, Stupid, Ignorant"
    ]
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Action and Movement Verbs",
    bengali: "ক্রিয়া ও চলাচল সংক্রান্ত শব্দ",
    description: "Synonyms and antonyms for action verbs and movement words",
    structures: [
      "Action Verb → Similar action",
      "Action Verb → Opposite action"
    ],
    examples: [
      "Start → Synonyms: Begin, Commence, Initiate | Antonyms: End, Finish, Stop",
      "Accept → Synonyms: Receive, Take, Admit | Antonyms: Reject, Refuse, Decline",
      "Create → Synonyms: Make, Build, Construct | Antonyms: Destroy, Demolish, Break",
      "Include → Synonyms: Contain, Comprise | Antonyms: Exclude, Omit, Leave out"
    ]
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Abstract Concept Words",
    bengali: "বিমূর্ত ধারণা সংক্রান্ত শব্দ",
    description: "Words representing abstract ideas, concepts, and qualities",
    structures: [
      "Abstract Noun → Similar concept",
      "Abstract Noun → Opposite concept"
    ],
    examples: [
      "Freedom → Synonyms: Liberty, Independence | Antonyms: Slavery, Bondage, Captivity",
      "Truth → Synonyms: Fact, Reality, Honesty | Antonyms: Lie, Falsehood, Deception",
      "Peace → Synonyms: Harmony, Tranquility | Antonyms: War, Conflict, Violence",
      "Success → Synonyms: Achievement, Victory, Triumph | Antonyms: Failure, Defeat, Loss"
    ]
  }
];