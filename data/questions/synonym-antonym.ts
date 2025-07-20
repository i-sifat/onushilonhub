// Centralized Synonym and Antonym Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

export interface SynonymAntonymQuestion {
  id: string;
  year?: number;
  board?: string;
  question: string;
  words?: { word: string; synonym?: string; antonym?: string; ruleId?: number }[];
  ruleId?: number;
}

export const synonymAntonymQuestions: SynonymAntonymQuestion[] = [
  {
    id: "sample-2024-synonym-antonym",
    year: 2024,
    board: "Sample Board",
    question: "Find synonyms and antonyms of the following words",
    words: [
      { word: "Beautiful", synonym: "Pretty, Lovely, Attractive", antonym: "Ugly, Hideous", ruleId: 1 },
      { word: "Happy", synonym: "Joyful, Cheerful, Glad", antonym: "Sad, Unhappy, Miserable", ruleId: 1 },
      { word: "Big", synonym: "Large, Huge, Enormous", antonym: "Small, Tiny, Little", ruleId: 2 },
      { word: "Good", synonym: "Excellent, Fine, Great", antonym: "Bad, Poor, Terrible", ruleId: 1 },
      { word: "Fast", synonym: "Quick, Rapid, Swift", antonym: "Slow, Sluggish", ruleId: 2 }
    ]
  }
  // ADD MORE QUESTIONS HERE - copy from board question papers
  // Just follow the same structure as above
];