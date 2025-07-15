import fs from 'fs';
import path from 'path';

export interface Question {
  id: string;
  topic: string;
  question: string;
  answer?: string;
  marks?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface BoardQuestions {
  board: string;
  year: number;
  questions: Question[];
}

export interface GrammarRule {
  title: string;
  content: string;
  examples?: string[];
  tips?: string[];
}

export interface RulesData {
  topic: string;
  rules: GrammarRule[];
}

// Get all available years for a level (HSC/SSC)
export function getAvailableYears(level: 'hsc' | 'ssc'): number[] {
  const questionsPath = path.join(process.cwd(), 'content', 'questions', level);
  
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

// Get all available boards for a specific year and level
export function getAvailableBoards(level: 'hsc' | 'ssc', year: number): string[] {
  const yearPath = path.join(process.cwd(), 'content', 'questions', level, year.toString());
  
  if (!fs.existsSync(yearPath)) {
    return [];
  }
  
  const boards = fs.readdirSync(yearPath)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''))
    .sort();
  
  return boards;
}

// Get all available grammar topics across all years and boards
export function getAvailableTopics(level: 'hsc' | 'ssc'): string[] {
  const questionsPath = path.join(process.cwd(), 'content', 'questions', level);
  const topics = new Set<string>();
  
  if (!fs.existsSync(questionsPath)) {
    return [];
  }
  
  const years = getAvailableYears(level);
  
  years.forEach(year => {
    const boards = getAvailableBoards(level, year);
    boards.forEach(board => {
      try {
        const questions = getQuestionsForBoard(level, year, board);
        questions.forEach(q => topics.add(q.topic));
      } catch (error) {
        console.warn(`Error reading questions for ${level}/${year}/${board}:`, error);
      }
    });
  });
  
  return Array.from(topics).sort();
}

// Get questions for a specific board and year
export function getQuestionsForBoard(level: 'hsc' | 'ssc', year: number, board: string): Question[] {
  const filePath = path.join(process.cwd(), 'content', 'questions', level, year.toString(), `${board}.json`);
  
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: BoardQuestions = JSON.parse(fileContent);
    return data.questions || [];
  } catch (error) {
    console.error(`Error reading questions file ${filePath}:`, error);
    return [];
  }
}

// Get all questions with filtering
export function getFilteredQuestions(
  level: 'hsc' | 'ssc',
  filters: {
    topic?: string;
    board?: string;
    year?: number;
    search?: string;
  }
): { questions: Question[]; metadata: { board: string; year: number }[] } {
  const allQuestions: Question[] = [];
  const metadata: { board: string; year: number }[] = [];
  
  const years = filters.year ? [filters.year] : getAvailableYears(level);
  
  years.forEach(year => {
    const boards = filters.board ? [filters.board] : getAvailableBoards(level, year);
    
    boards.forEach(board => {
      const questions = getQuestionsForBoard(level, year, board);
      
      let filteredQuestions = questions;
      
      // Filter by topic
      if (filters.topic) {
        filteredQuestions = filteredQuestions.filter(q => 
          q.topic.toLowerCase().includes(filters.topic!.toLowerCase())
        );
      }
      
      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredQuestions = filteredQuestions.filter(q =>
          q.question.toLowerCase().includes(searchTerm) ||
          q.topic.toLowerCase().includes(searchTerm) ||
          (q.answer && q.answer.toLowerCase().includes(searchTerm))
        );
      }
      
      if (filteredQuestions.length > 0) {
        allQuestions.push(...filteredQuestions);
        metadata.push({ board, year });
      }
    });
  });
  
  return { questions: allQuestions, metadata };
}

// Get available grammar topics for rules
export function getAvailableRuleTopics(level: 'hsc' | 'ssc'): string[] {
  const rulesPath = path.join(process.cwd(), 'content', 'grammar-items', level);
  
  if (!fs.existsSync(rulesPath)) {
    return [];
  }
  
  const topics = fs.readdirSync(rulesPath)
    .filter(item => {
      const itemPath = path.join(rulesPath, item);
      const rulesFile = path.join(itemPath, 'rules.json');
      return fs.statSync(itemPath).isDirectory() && fs.existsSync(rulesFile);
    })
    .sort();
  
  return topics;
}

// Get rules for a specific topic
export function getRulesForTopic(level: 'hsc' | 'ssc', topic: string): RulesData | null {
  const rulesFile = path.join(process.cwd(), 'content', 'grammar-items', level, topic, 'rules.json');
  
  if (!fs.existsSync(rulesFile)) {
    return null;
  }
  
  try {
    const fileContent = fs.readFileSync(rulesFile, 'utf-8');
    const data: RulesData = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error(`Error reading rules file ${rulesFile}:`, error);
    return null;
  }
}

// Utility function to format topic names for display
export function formatTopicName(topic: string): string {
  return topic
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Utility function to format board names for display
export function formatBoardName(board: string): string {
  return board.charAt(0).toUpperCase() + board.slice(1);
}