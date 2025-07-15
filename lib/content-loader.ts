import fs from 'fs';
import path from 'path';

export interface GrammarRule {
  id?: number;
  ruleNo?: string;
  title: string;
  content?: string;
  description?: string;
  bengali?: string;
  structures?: string[];
  examples?: string[];
  tips?: string[];
}

export interface GrammarItem {
  topic: string;
  rules: GrammarRule[];
}

export interface Question {
  id: string;
  year?: number;
  board?: string;
  passage?: string;
  question?: string;
  blanks?: Array<{
    id: string;
    answer?: string;
    instruction?: string;
    ruleId?: number;
    explanation?: string;
  }>;
  ruleId?: number;
}

export interface QuestionSet {
  year: number;
  board: string;
  questions: Question[];
}

// Get all available grammar topics for a level
export function getGrammarTopics(level: 'hsc' | 'ssc'): string[] {
  const grammarPath = path.join(process.cwd(), 'content', 'grammar-items', level);
  
  if (!fs.existsSync(grammarPath)) {
    return [];
  }
  
  try {
    const items = fs.readdirSync(grammarPath);
    const topics: string[] = [];
    
    items.forEach(item => {
      const itemPath = path.join(grammarPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Check if rules.json exists in the directory
        const rulesFile = path.join(itemPath, 'rules.json');
        if (fs.existsSync(rulesFile)) {
          topics.push(item);
        }
      } else if (item.endsWith('.json')) {
        // Direct JSON file
        topics.push(item.replace('.json', ''));
      }
    });
    
    return topics.sort();
  } catch (error) {
    console.error(`Error reading grammar topics for ${level}:`, error);
    return [];
  }
}

// Get grammar rules for a specific topic
export function getGrammarRules(level: 'hsc' | 'ssc', topic: string): GrammarItem | null {
  const grammarPath = path.join(process.cwd(), 'content', 'grammar-items', level);
  
  // Try directory structure first
  const topicDir = path.join(grammarPath, topic);
  const rulesFile = path.join(topicDir, 'rules.json');
  
  let filePath: string;
  
  if (fs.existsSync(rulesFile)) {
    filePath = rulesFile;
  } else {
    // Try direct JSON file
    const directFile = path.join(grammarPath, `${topic}.json`);
    if (fs.existsSync(directFile)) {
      filePath = directFile;
    } else {
      return null;
    }
  }
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Handle different data structures
    if (data.rules) {
      return {
        topic: data.topic || formatTopicName(topic),
        rules: data.rules
      };
    } else if (Array.isArray(data)) {
      return {
        topic: formatTopicName(topic),
        rules: data
      };
    } else {
      return {
        topic: formatTopicName(topic),
        rules: [data]
      };
    }
  } catch (error) {
    console.error(`Error reading grammar rules for ${level}/${topic}:`, error);
    return null;
  }
}

// Get all available question topics for a level
export function getQuestionTopics(level: 'hsc' | 'ssc'): string[] {
  const questionsPath = path.join(process.cwd(), 'content', 'questions', level);
  
  if (!fs.existsSync(questionsPath)) {
    return [];
  }
  
  try {
    const items = fs.readdirSync(questionsPath);
    const topics: string[] = [];
    
    items.forEach(item => {
      const itemPath = path.join(questionsPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Check if there are question files in subdirectories
        const hasQuestions = hasQuestionFiles(itemPath);
        if (hasQuestions) {
          topics.push(item);
        
        }
      }
    });
    
    return topics.sort();
  } catch (error) {
    console.error(`Error reading question topics for ${level}:`, error);
    return [];
  }
}

// Helper function to check if a directory contains question files
function hasQuestionFiles(dirPath: string): boolean {
  try {
    const items = fs.readdirSync(dirPath);
    
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        if (hasQuestionFiles(itemPath)) {
          return true;
        }
      } else if (item.endsWith('.json')) {
        return true;
      }
    }
    
    
    return false;
  } catch {
    return false;
  }
}

// Get all available years for a topic
export function getAvailableYears(level: 'hsc' | 'ssc', topic: string): number[] {
  const topicPath = path.join(process.cwd(), 'content', 'questions', level, topic);
  
  if (!fs.existsSync(topicPath)) {
    return [];
  }
  
  try {
    const items = fs.readdirSync(topicPath);
    const years: number[] = [];
    
    items.forEach(item => {
      const itemPath = path.join(topicPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !isNaN(parseInt(item))) {
        years.push(parseInt(item));
      }
    });
    
    return years.sort((a, b) => b - a); // Sort descending (newest first)
  } catch (error) {
    console.error(`Error reading years for ${level}/${topic}:`, error);
    return [];
  }
}

// Get all available boards for a specific year and topic
export function getAvailableBoards(level: 'hsc' | 'ssc', topic: string, year: number): string[] {
  const yearPath = path.join(process.cwd(), 'content', 'questions', level, topic, year.toString());
  
  if (!fs.existsSync(yearPath)) {
    return [];
  }
  
  try {
    const items = fs.read
    DirSync(yearPath);
    const boards: string[] = [];
    
    items.forEach(item => {
      if (item.endsWith('.json')) {
        boards.push(item.replace('.json', ''));
      }
    });
    
    return boards.sort();
  } catch (error) {
    console.error(`Error reading boards for ${level}/${topic}/${year}:`, error);
    return [];
  }
}

// Get questions for a specific topic, year, and board
export function getQuestions(
  level: 'hsc' | 'ssc', 
  topic: string, 
  year?: number, 
  board?: string
): Question[] {
  const topicPath = path.join(process.cwd(), 'content', 'questions', level, topic);
  
  
  if (!fs.existsSync(topicPath)) {
    return [];
  }
  
  const questions: Question[] = [];
  
  try {
    if (year && board) {
      // Get specific year and board
      const filePath = path.join(topicPath, year.toString(), `${board}.json`);
      
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        questions.push(...normalizeQuestions(data, year, board));
      }
    } else if (year) {
      // Get all boards for a specific year
      const yearPath = path.join(topicPath, year.toString());
      if (fs.existsSync(yearPath)) {
        const boards =
         getAvailableBoards(level, topic, year);
        boards.forEach(boardName => {
          const boardQuestions = getQuestions(level, topic, year, boardName);
          questions.push(...boardQuestions);
        });
      }
    } else {
      // Get all questions for the topic
      const years = getAvailableYears(level, topic);
      years.forEach(yearNum =>
       {
        const yearQuestions = getQuestions(level, topic, yearNum);
        questions.push(...yearQuestions);
      });
    }
  } catch (error) {
    console.error(`Error reading questions for ${level}/${topic}:`, error);
  }
  
  return questions;
}

// Normalize questions from different data structures
function normalizeQuestions(data: any, year: number, board: string): Question[] {
  if (!data) return [];
  
  // Handle different data structures
  if (Array.isArray(data)) {
    return data.map((item, index) => ({
      ...item,
      id: item.id || `${board}-${year}-${index}`,
      year,
      board
    }));
  } else if (data.questions && Array.isArray(data.questions)) {
    return data.questions.map((item: any, index: number) => ({
      ...item,
      id: item.id || `${board}-${year}-${index}`,
      year,
      board
    }));
  } else if (typeof data === 'object') {
    return [{
      ...data,
      id: data.id || `${board}-${year}-0`,
      year,
      board
    }];
  }
  
  return [];
}

// Search questions by keyword
export function searchQuestions(
  level: 'hsc' | 'ssc',
  topic: string,
  searchTerm: string,
  year?: number,
  board?: string
): Question[] {
  const allQuestions = getQuestions(level, topic, year, board);
  
  if (!searchTerm.trim()) {
    return allQuestions;
  }
  
  const searchLower = searchTerm.toLowerCase();
  
  return allQuestions.filter(question => {
    return (
      question.question?.toLowerCase().includes(searchLower) ||
      question.passage?.toLowerCase().includes(searchLower) ||
      question.blanks?.some(blank => 
        
         
        blank.answer?.toLowerCase().includes(searchLower) ||
        blank.instruction?.toLowerCase().includes(searchLower)
      )
    );
  });
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

// Get all years across all topics for a level
export function getAllAvailableYears(level: 'hsc' | 'ssc'): number[] {
  const topics =
   getQuestionTopics(level);
  const allYears = new Set<number>();
  
  topics.forEach(topic => {
    const years = getAvailableYears(level, topic);
    years.forEach(year => allYears.add(year));
  });
  
  return Array.from(allYears).sort((a, b) => b - a);
}

// Get all boards across all topics and years for a level
export function getAllAvailableBoards(level: 'hsc' | 'ssc'): string[] {
  const topics = getQuestionTopics(level);
  const allBoards = new Set<string>();
  
  topics.forEach(topic => {
    const years = getAvailableYears(level, topic);
    years.forEach(year => {
      const boards =
       getAvailableBoards(level, topic, year);
      boards.forEach(board => allBoards.add(board));
    });
  });
  
  return Array.from(allBoards).sort();
}