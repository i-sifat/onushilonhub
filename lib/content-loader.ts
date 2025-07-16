import fs from 'fs';
import path from 'path';

export interface Question {
  id: string;
  question: string;
  ruleId?: number;
  year?: number;
  board?: string;
}

export interface YearQuestions {
  year: number;
  questions: Question[];
}

// Get all available years for completing sentence questions
export function getCompletingSentenceYears(level: 'hsc' | 'ssc'): number[] {
  const questionsPath = path.join(process.cwd(), 'content', 'questions', level, 'completingSentence', 'questions');
  
  if (!fs.existsSync(questionsPath)) {
    return [];
  }
  
  const years = fs.readdirSync(questionsPath)
    .filter(item => {
      const itemPath = path.join(questionsPath, item);
      return fs.statSync(itemPath).isDirectory() && !isNaN(parseInt(item));
    })
    .map(year => parseInt(year))
    .sort((a, b) => b - a); // Sort descending (newest first)
  
  return years;
}

// Get questions for a specific year
export function getCompletingSentenceQuestionsByYear(level: 'hsc' | 'ssc', year: number): Question[] {
  const yearPath = path.join(process.cwd(), 'content', 'questions', level, 'completingSentence', 'questions', year.toString(), 'questions.json');
  
  if (!fs.existsSync(yearPath)) {
    return [];
  }
  
  try {
    const fileContent = fs.readFileSync(yearPath, 'utf-8');
    const questions: Question[] = JSON.parse(fileContent);
    return questions.map(q => ({ ...q, year }));
  } catch (error) {
    console.error(`Error reading questions file ${yearPath}:`, error);
    return [];
  }
}

// Get all completing sentence questions organized by year
export function getAllCompletingSentenceQuestions(level: 'hsc' | 'ssc'): YearQuestions[] {
  const years = getCompletingSentenceYears(level);
  
  return years.map(year => ({
    year,
    questions: getCompletingSentenceQuestionsByYear(level, year)
  })).filter(yearData => yearData.questions.length > 0);
}

// Search questions by text
export function searchCompletingSentenceQuestions(level: 'hsc' | 'ssc', searchTerm: string): Question[] {
  const allYearQuestions = getAllCompletingSentenceQuestions(level);
  const allQuestions = allYearQuestions.flatMap(yearData => yearData.questions);
  
  if (!searchTerm.trim()) {
    return allQuestions;
  }
  
  const searchLower = searchTerm.toLowerCase();
  return allQuestions.filter(question =>
    question.question.toLowerCase().includes(searchLower) ||
    question.id.toLowerCase().includes(searchLower)
  );
}

// Utility functions
export function formatTopicName(topic: string): string {
  return topic
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatBoardName(board: string): string {
  return board.charAt(0).toUpperCase() + board.slice(1);
}

// Get questions count for a topic
export function getTopicQuestionCount(level: 'hsc' | 'ssc', topic: string): number {
  if (topic === 'completing-sentence') {
    const allYearQuestions = getAllCompletingSentenceQuestions(level);
    return allYearQuestions.reduce((total, yearData) => total + yearData.questions.length, 0);
  }
  return 0;
}