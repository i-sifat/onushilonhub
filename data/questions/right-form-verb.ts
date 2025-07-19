// Centralized Right Form of Verb Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

export interface RightFormVerbQuestion {
  id: string;
  year?: number;
  board?: string;
  passage?: string;
  blanks?: { id: string; verb: string; ruleId?: number; answer: string; explanation?: string }[];
  question: string;
  ruleId?: number;
}

export const rightFormVerbQuestions: RightFormVerbQuestion[] = [
  {
    id: "sample-2024-right-form-verb",
    year: 2024,
    board: "Sample Board",
    question: "Fill in the blanks with the right form of verbs",
    passage: "Education (a) ___ (play) a vital role in the development of a nation. It (b) ___ (help) people to become conscious of their rights and duties. An educated person can (c) ___ (distinguish) between right and wrong. He (d) ___ (know) how to lead a happy and peaceful life. On the other hand, an illiterate person (e) ___ (live) like an animal. He cannot (f) ___ (understand) the difference between good and bad. So, we should (g) ___ (give) importance to education. The government (h) ___ (take) various steps to spread education among the people. Many schools and colleges (i) ___ (establish) in different parts of the country. If we (j) ___ (want) to develop our country, we must educate our people.",
    blanks: [
      {
        id: "a",
        verb: "play",
        ruleId: 6,
        answer: "plays",
        explanation: "Education is third person singular, so verb takes s/es"
      },
      {
        id: "b",
        verb: "help",
        ruleId: 6,
        answer: "helps",
        explanation: "It (Education) is third person singular"
      },
      {
        id: "c",
        verb: "distinguish",
        ruleId: 1,
        answer: "distinguish",
        explanation: "After modal verb 'can', use V1"
      },
      {
        id: "d",
        verb: "know",
        ruleId: 6,
        answer: "knows",
        explanation: "He is third person singular"
      },
      {
        id: "e",
        verb: "live",
        ruleId: 6,
        answer: "lives",
        explanation: "An illiterate person is third person singular"
      },
      {
        id: "f",
        verb: "understand",
        ruleId: 1,
        answer: "understand",
        explanation: "After modal verb 'cannot', use V1"
      },
      {
        id: "g",
        verb: "give",
        ruleId: 1,
        answer: "give",
        explanation: "After modal verb 'should', use V1"
      },
      {
        id: "h",
        verb: "take",
        ruleId: 6,
        answer: "takes",
        explanation: "The government is third person singular"
      },
      {
        id: "i",
        verb: "establish",
        ruleId: 4,
        answer: "are established",
        explanation: "Passive voice: Many schools and colleges are established"
      },
      {
        id: "j",
        verb: "want",
        ruleId: 7,
        answer: "want",
        explanation: "In conditional sentence with 'if', use present tense"
      }
    ]
  }
  // ADD MORE QUESTIONS HERE - copy from board question papers
  // Just follow the same structure as above
];