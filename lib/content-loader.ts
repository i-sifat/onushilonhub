// Static content loader without file system dependencies
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

// Static topic definitions
export const STATIC_GRAMMAR_TOPICS = {
  hsc: [
    {
      id: 'completing-sentence',
      name: 'Completing Sentence',
      description: 'Learn comprehensive rules and examples for completing sentences',
      available: true
    },
    {
      id: 'modifier',
      name: 'Modifier',
      description: 'Master pre-modify and post-modify techniques with detailed rules',
      available: true
    },
    {
      id: 'connector',
      name: 'Connector',
      description: 'Connect ideas effectively with proper linking words and phrases',
      available: true
    },
    {
      id: 'narration',
      name: 'Narration',
      description: 'Transform direct and indirect speech with proper rules',
      available: false
    },
    {
      id: 'voice',
      name: 'Voice',
      description: 'Convert active and passive voice constructions',
      available: false
    },
    {
      id: 'tense',
      name: 'Tense',
      description: 'Master all tense forms and their proper usage',
      available: false
    },
    {
      id: 'conditionals',
      name: 'Conditionals',
      description: 'Learn if-clauses and conditional sentence structures',
      available: false
    },
    {
      id: 'articles',
      name: 'Articles',
      description: 'Proper usage of a, an, and the in different contexts',
      available: false
    },
    {
      id: 'prepositions',
      name: 'Prepositions',
      description: 'Master prepositions of time, place, and manner',
      available: false
    }
  ],
  ssc: [
    {
      id: 'completing-sentence',
      name: 'Completing Sentence',
      description: 'Basic sentence completion rules and examples',
      available: false
    },
    {
      id: 'right-form-of-verbs',
      name: 'Right Form of Verbs',
      description: 'Choose correct verb forms in different contexts',
      available: false
    },
    {
      id: 'transformation',
      name: 'Transformation',
      description: 'Transform sentences while maintaining meaning',
      available: false
    },
    {
      id: 'punctuation',
      name: 'Punctuation',
      description: 'Proper use of punctuation marks in writing',
      available: false
    }
  ]
};

export const STATIC_QUESTION_TOPICS = {
  hsc: [
    {
      id: 'modifier',
      name: 'Modifier',
      description: 'Practice modifier questions from board examinations',
      available: true
    },
    {
      id: 'connector',
      name: 'Connector',
      description: 'Practice connector questions from board examinations',
      available: true
    },
    {
      id: 'completing-sentence',
      name: 'Completing Sentence',
      description: 'Practice sentence completion from board examinations',
      available: true
    },
    {
      id: 'narration',
      name: 'Narration',
      description: 'Practice narration questions from board examinations',
      available: false
    },
    {
      id: 'voice',
      name: 'Voice',
      description: 'Practice voice change questions from board examinations',
      available: false
    },
    {
      id: 'tense',
      name: 'Tense',
      description: 'Practice tense questions from board examinations',
      available: false
    }
  ],
  ssc: [
    {
      id: 'completing-sentence',
      name: 'Completing Sentence',
      description: 'Practice sentence completion from SSC board examinations',
      available: false
    },
    {
      id: 'right-form-of-verbs',
      name: 'Right Form of Verbs',
      description: 'Practice verb form questions from SSC board examinations',
      available: false
    }
  ]
};

// Get static grammar topics for a level
export function getGrammarTopics(level: 'hsc' | 'ssc'): string[] {
  return STATIC_GRAMMAR_TOPICS[level]
    .filter(topic => topic.available)
    .map(topic => topic.id);
}

// Get all grammar topics (including unavailable ones) for display
export function getAllGrammarTopics(level: 'hsc' | 'ssc') {
  return STATIC_GRAMMAR_TOPICS[level];
}

// Get static question topics for a level
export function getQuestionTopics(level: 'hsc' | 'ssc'): string[] {
  return STATIC_QUESTION_TOPICS[level]
    .filter(topic => topic.available)
    .map(topic => topic.id);
}

// Get all question topics (including unavailable ones) for display
export function getAllQuestionTopics(level: 'hsc' | 'ssc') {
  return STATIC_QUESTION_TOPICS[level];
}

// Load grammar rules from static imports
export async function getGrammarRules(level: 'hsc' | 'ssc', topic: string): Promise<GrammarItem | null> {
  try {
    if (level === 'hsc') {
      switch (topic) {
        case 'completing-sentence':
          const { rules: completingRules } = await import('../content/grammar-items/hsc/completingSentence/rules.json');
          return {
            topic: 'Completing Sentence',
            rules: completingRules
          };
        case 'modifier':
          const { modifierRules } = await import('../content/grammar-items/hsc/modifier/modifierRules.json');
          return {
            topic: 'Modifier',
            rules: modifierRules
          };
        case 'connector':
          const { connectorRules } = await import('../content/grammar-items/hsc/connectors/connectorRules.json');
          return {
            topic: 'Connector',
            rules: connectorRules
          };
        default:
          return null;
      }
    }
    return null;
  } catch (error) {
    
    console.error(`Error loading grammar rules for ${level}/${topic}:`, error);
    return null;
  }
}

// Load questions from static imports
export async function getQuestions(
  level: 'hsc' | 'ssc', 
  topic: string, 
  year?: number, 
  board?: string
): Promise<Question[]> {
  try {
    if (level === 
     'hsc') {
      switch (topic) {
        case 'modifier':
          const questions2016 = await import('../content/questions/hsc/modifier/questions/2016/questions.json');
          const questions2017 = await import('../content/questions/hsc/modifier/questions/2017/questions.json');
          const questions2019 = await import('../content/questions/hsc/modifier/questions/2019/questions.json');
          const questions2023 = await import('../content/questions/hsc/modifier/questions/2023/questions.json');
          const questions2024 = await import('../content/questions/hsc/modifier/questions/2024/questions.json');
          
          let allQuestions = [
            ...questions2016.questions2016,
            ...questions2017.questions2017,
            
            ...questions2019.questions2019,
            ...questions2023.questions2023,
            ...questions2024.questions2024
          ];

          // Apply filters
          if (year) {
            allQuestions = allQuestions.filter(q => q.year === year);
          }
          if (board) {
            allQuestions = allQuestions.filter(q => q.board?.toLowerCase().includes(boar
            d.toLowerCase()));
          }

          return allQuestions;

        case 'connector':
          const conn2016 = await import('../content/questions/hsc/connectors/questions/2016/questions.json');
          const conn2017 = await import('../content/questions/hsc/connectors/questions/2017/questions.json');
          const conn2018 = await import('../content/questions/hsc/connectors/questions/2018/questions.json');
          const conn2019 = await import('../content/questions/hsc/connectors/questions/2019/questions.json');
          const conn2022 = await import('../content/questions/hsc/connectors/questions/2022/questions.json');
          const conn2023 = await import('../content/questions/hsc/connectors/questions/2023/questions.json');
          const conn2024 = await import('../content/questions/hsc/connectors/questions/2024/questions.json');
          
          let connQuestions = [
            ...conn2016.questions2016,
            ...conn2017.questions2017,
            ...conn2018.questions2018,
            ...conn2019.questions2019,
            ...conn2022.questions2022,
            
            ...conn2023.questions2023,
            ...conn2024.questions2024
          ];

          // Apply filters
          if (year) {
            connQuestions = connQuestions.filter(q => q.year === year);
          }
          if (board) {
            connQuestions = connQuestions.filter(q => q.board?.toLowerCase().includes(board.toLowerCase()));
          }

          return connQu
          estions;

        case 'completing-sentence':
          const comp2022 = await import('../content/questions/hsc/completingSentence/questions/2022/questions.json');
          const comp2023 = await import('../content/questions/hsc/completingSentence/questions/2023/questions.json');
          const comp2024 = await import('../content/questions/hsc/completingSentence/questions/2024/questions.json');
          
          let compQuestions = [
            ...comp2022.default,
            ...comp2023.default,
            ...comp2024.default
          ];

          // Apply filters
          if (year) {
            compQuestions = compQuestions.filter(q => q.id.includes(year.toString()));
          }
          if (board) {
            compQuestions = compQuestions.filter(q => q.id.toLowerCase().includes(board.toLowerCase()));
          }

          return compQuestions;

        default:
          return [];
      }
    }
    return [];
  } catch (error) {
    console.error(`Error loading questions for ${level}/${topic}:`, error);
    return [];
  }
}

// Get available years for a topic (static data)
export function getAvailableYears(level: 'hsc' | 'ssc', topic: string): number[] {
  if (level === 'hsc') {
    switch (topic) {
      case 'modifier':
        return [2024, 2023, 2019, 2017, 2016];
      case 'connector':
        return [2024, 2023, 2022, 
         2019, 2018, 2017, 2016];
      case 'completing-sentence':
        return [2024, 2023, 2022];
      default:
        return [];
    }
  }
  return [];
}

// Get available boards for a topic (static data)
export function getAllAvailableBoards(level: 'hsc' | 'ssc'): string[] {
  if (level === 'hsc') {
    return ['dhaka', 'rajshahi', 'chattogram', 'cumilla', 'jashore', 'sylhet', 'barishal', 'dinajpur', 'mymensingh'];
  }
  return [];
}

// Search questions by keyword
export async function searchQuestions(
  level: 'hsc' | 's
  sc',
  topic: string,
  searchTerm: string,
  year?: number,
  board?: string
): Promise<Question[]> {
  const allQuestions = await getQuestions(level, topic, year, board);
  
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
  const topicMap: { [key: string]: string } = {
    'completing-sentence': 'Completing Sentence',
    'modifier': 'Modifier',
    'connector': 'Connector',
    'narration': 'Narration',
    'voice': 'Voice',
    'tense': '
    Tense',
    'conditionals': 'Conditionals',
    'articles': 'Articles',
    'prepositions': 'Prepositions',
    'right-form-of-verbs': 'Right Form of Verbs',
    'transformation': 'Transformation',
    'punctuation': 'Punctuation'
  };
  
  return topicMap[topic] || topic
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Utility function to format board names for display
export function formatBoardName(board: string): string {
  return board.charAt(0).toUpperCase() + board.slice(1);
}