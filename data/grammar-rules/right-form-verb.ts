// Centralized Right Form of Verb Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

export interface RightFormVerbRule {
  id: number;
  ruleNo: string;
  title: string;
  bengali: string;
  description: string;
  structures: string[];
  examples: string[];
  notes?: string[];
}

export const rightFormVerbRules: RightFormVerbRule[] = [
  {
    id: 1,
    ruleNo: "Rule 01",
    title: "Modal Verb এর পরে নিম্নলিখিত Verb বসে",
    bengali: "Modal + V1/be+V3/have+V3",
    description: "Modal verb এর পরে base form (V1), be+V3 (continuous/passive), অথবা have+V3 (perfect) ব্যবহার হয়।",
    structures: [
      "Modal + V1",
      "Modal + be + V3 (Continuous/Passive)",
      "Modal + have + V3 (Perfect)"
    ],
    examples: [
      "He can (do) the work. → He can do the work.",
      "He may be (do) the work. → He may be doing the work.",
      "He could have (do) the work. → He could have done the work.",
      "You should (study) hard. → You should study hard.",
      "They might be (play) football. → They might be playing football."
    ]
  },
  {
    id: 2,
    ruleNo: "Rule 02",
    title: "To do Verb এর পরে V1 বসে",
    bengali: "do/does/did + V1",
    description: "To do verb (do, does, did) এর পরে সর্বদা base form (V1) ব্যবহার হয়।",
    structures: [
      "do/does/did + V1"
    ],
    examples: [
      "I do not (like) tea. → I do not like tea.",
      "He does not (play) football. → He does not play football.",
      "They did not (come) yesterday. → They did not come yesterday.",
      "Do you (know) him? → Do you know him?"
    ],
    notes: [
      "এ ক্ষেত্রে To do Verb এর পর not বা অন্য কোনো শব্দ থাকতে পারে।"
    ]
  },
  {
    id: 3,
    ruleNo: "Rule 03",
    title: "To have Verb এর পরে V3 বসে",
    bengali: "have/has/had + V3",
    description: "To have verb (have, has, had) এর পরে past participle (V3) ব্যবহার হয়।",
    structures: [
      "have/has/had + V3"
    ],
    examples: [
      "Forkan has (earn) money. → Forkan has earned money.",
      "He had (visit) the Cox's Bazar. → He had visited the Cox's Bazar.",
      "They have (complete) the work. → They have completed the work.",
      "She has (write) a letter. → She has written a letter."
    ]
  },
  {
    id: 4,
    ruleNo: "Rule 04",
    title: "To be Verb (Passive Voice-এর ক্ষেত্রে) এর পরে V3 বসে",
    bengali: "be + V3 (Passive)",
    description: "Passive voice এ to be verb এর পরে past participle (V3) ব্যবহার হয়।",
    structures: [
      "am/is/are + V3 (Present Passive)",
      "was/were + V3 (Past Passive)",
      "been + V3 (Perfect Passive)"
    ],
    examples: [
      "Rice is (eat) by me. → Rice is eaten by me.",
      "The book was (write) by him. → The book was written by him.",
      "The work has been (do) by them. → The work has been done by them.",
      "English is (speak) all over the world. → English is spoken all over the world."
    ],
    notes: [
      "Passive Voice-এ এমন Subject বসে যা নিজ থেকে কোনো কাজ করতে পারে না এবং ঐ Subject এর পরে To be Verb বসে।"
    ]
  },
  {
    id: 5,
    ruleNo: "Rule 05",
    title: "চারটি সাধারণ অবস্থানে Verb এর সাথে 'ing' যোগ হয়",
    bengali: "Verb + ing",
    description: "নির্দিষ্ট কিছু অবস্থানে verb এর সাথে ing যুক্ত হয়ে gerund বা present participle গঠন করে।",
    structures: [
      "Preposition + Verb-ing (যেখানে 'to' ব্যতিক্রম)",
      "To be Verb + Verb-ing (Continuous)",
      "Simple Sentence-এ দুটি Verb একসাথে হলে, Main Verb ছাড়া অন্য Verb এর সাথে 'ing'",
      "With a view to / Look forward to / Get used to এর পরে Verb-ing"
    ],
    examples: [
      "By (read) more, you can make a good result. → By reading more...",
      "I am interested in (learn) new things. → I am interested in learning...",
      "He has been (read) the book. → He has been reading...",
      "They were (play) football. → They were playing...",
      "I like (eat) Kacchi Biryani. → I like eating...",
      "They enjoy (watch) movies. → They enjoy watching...",
      "He goes to school with a view to (admit) college. → ...to admitting...",
      "I look forward to (meet) my friends. → ...to meeting..."
    ]
  },
  {
    id: 6,
    ruleNo: "Rule 06",
    title: "Subject Third Person Singular হলে Main Verb এর সাথে s/es যুক্ত হয়",
    bengali: "Third Person Singular + V1+s/es",
    description: "Third person singular subject এর সাথে present tense এ main verb এর সাথে s/es যুক্ত হয়।",
    structures: [
      "Third Person Singular Subject + V1+s/es"
    ],
    examples: [
      "Everyone (hate) a liar. → Everyone hates a liar.",
      "Every student (want) a good result. → Every student wants a good result.",
      "He (play) football. → He plays football.",
      "She (study) hard. → She studies hard.",
      "Ten kilometers (be) a long distance. → Ten kilometers is a long distance.",
      "Two hours (be) a long time. → Two hours is a long time."
    ],
    notes: [
      "Third Person Singular Subject: He/she/it, ব্যক্তি বা বস্তুর নাম, Every+Noun, Uncountable Noun, Money, Distance, Time, one যুক্ত Subject, body যুক্ত Subject, thing যুক্ত Subject",
      "Subject Third Person Singular Number হলে প্রয়োজন মত To be Verb ব্যবহার করা যেতে পারে।"
    ]
  },
  {
    id: 7,
    ruleNo: "Rule 07",
    title: "কিছু Word/Phrase রয়েছে যেগুলোর পরে নির্দিষ্ট Tense বসে",
    bengali: "Time indicators + Specific Tense",
    description: "নির্দিষ্ট time indicating words বা phrases এর সাথে নির্দিষ্ট tense ব্যবহার করতে হয়।",
    structures: [
      "Pally bou (Previously, Ago, After a few days, Last, Yesterday, Before, Once, Upon a time) → Past Indefinite (V2)",
      "HUS (Habitual Fact, Universal Truth, Scientific Truth) → Present Indefinite (V1)",
      "Arguon Fedo (Always, Regularly, Generally, Usually, Occasionally, Normally, Frequently, Everyday, Daily, Often) → Present Indefinite (V1)",
      "DAN TIR (Day by day, At present, Now, The moment, Increasingly, Rapidly) → Present Continuous (am/is/are + V+ing)",
      "JAYLER (Just, Already, Yet, Lately, Ever, Recently) → Present Perfect (have/has + V3)"
    ],
    examples: [
      "They (walk) together yesterday. → They walked together yesterday.",
      "I have already (finish) the work. → I have already finished the work.",
      "At this moment, he is (make) cakes. → he is making cakes.",
      "The sun (rise) in the east. → The sun rises in the east. (Universal Truth)",
      "He (go) to school daily. → He goes to school daily. (Habitual)",
      "Water (boil) at 100°C. → Water boils at 100°C. (Scientific Truth)",
      "I have just (complete) my homework. → I have just completed my homework.",
      "She is (study) at present. → She is studying at present."
    ]
  }
];

// Helper function to get rule by ID
export const getRightFormVerbRuleById = (id: number): RightFormVerbRule | undefined => {
  return rightFormVerbRules.find(rule => rule.id === id);
};

// Helper function to get all rule titles
export const getRightFormVerbRuleTitles = (): string[] => {
  return rightFormVerbRules.map(rule => rule.title);
};