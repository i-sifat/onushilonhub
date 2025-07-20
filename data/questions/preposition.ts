// Centralized Preposition Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

export interface PrepositionQuestion {
  id: string;
  year?: number;
  board?: string;
  passage?: string;
  blanks?: { id: string; answer: string; ruleId?: number }[];
  question: string;
  ruleId?: number;
}

export const prepositionQuestions: PrepositionQuestion[] = [
  {
    id: "sample-2024-preposition",
    year: 2024,
    board: "Sample Board",
    question: "Fill in the blanks with appropriate prepositions",
    passage: "Education is the backbone (a) ___ a nation. It helps people to become conscious (b) ___ their rights and duties. An educated person can distinguish (c) ___ right and wrong. He knows how to lead a happy and peaceful life. (d) ___ the other hand, an illiterate person lives like an animal. He cannot understand the difference (e) ___ good and bad. So, we should give importance (f) ___ education. The government has taken various steps to spread education (g) ___ the people. Many schools and colleges have been established (h) ___ different parts (i) ___ the country. If we want to develop our country, we must educate our people (j) ___ proper way.",
    blanks: [
      { id: "a", answer: "of", ruleId: 1 },
      { id: "b", answer: "of", ruleId: 1 },
      { id: "c", answer: "between", ruleId: 2 },
      { id: "d", answer: "On", ruleId: 3 },
      { id: "e", answer: "between", ruleId: 2 },
      { id: "f", answer: "to", ruleId: 4 },
      { id: "g", answer: "among", ruleId: 5 },
      { id: "h", answer: "in", ruleId: 6 },
      { id: "i", answer: "of", ruleId: 1 },
      { id: "j", answer: "in", ruleId: 6 }
    ]
  }
  // ADD MORE QUESTIONS HERE - copy from board question papers
  // Just follow the same structure as above
];