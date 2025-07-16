
export interface Question {
  id: string;
  topic?: string;
  question: string;
  answer?: string;
  marks?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  ruleId?: number;
  year?: number;
  board?: string;
  passage?: string;
  blanks?: { id: string; answer: string }[];
}

export interface YearQuestions {
  year: number;
  questions: Question[];
}

export interface GrammarRule {
  id?: string;
  ruleNo?: string;
  bengali?: string;
  title: string;
  content: string;
  description?: string;
  structures?: string[];
  examples?: string[];
  tips?: string[];
}

export interface RulesData {
  topic: string;
  rules: GrammarRule[];
}
