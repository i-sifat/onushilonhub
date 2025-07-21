// Centralized Transformation Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

import { Question, QuestionLevel, QuestionTopicSlug, QuestionBoard, QuestionDifficulty } from '../../types/question.types';

export interface TransformationQuestion extends Omit<Question, 'topic' | 'level'> {
  topic: 'transformation';
  level: QuestionLevel;
  transformations: TransformationItem[];
  instruction: string;
}

export interface TransformationItem {
  question: string;
  transformedSentence: string;
  transformationType: string;
  ruleId?: number;
}

export const transformationQuestions: TransformationQuestion[] = [
  // Dhaka Board 2019
  {
    id: "dhaka-2019-transformation",
    year: 2019,
    board: "Dhaka",
    instruction: "Read the text and change the sentences as directed: [Dhaka Board-2019]",
    transformations: [
      {
        question: "He was one of the greatest saints of Islam.",
        transformedSentence: "Very few saints of Islam were as great as he.",
        transformationType: "Positive",
        ruleId: 21
      },
      {
        question: "At that time his mother asked him for a glass of water.",
        transformedSentence: "At that time, he was asked for a glass of water by his mother.",
        transformationType: "Passive",
        ruleId: 1
      },
      {
        question: "There was no drinking water in the house, so he went out to fetch it.",
        transformedSentence: "As there was no drinking water in the house, he went out to fetch it.",
        transformationType: "Complex",
        ruleId: 1
      },
      {
        question: "When he came back, he found his mother sleeping.",
        transformedSentence: "He came back and found his mother sleeping.",
        transformationType: "Compound",
        ruleId: 1
      },
      {
        question: "He showed a great love and respect to his mother.",
        transformedSentence: "What a love and respect he showed to his mother!",
        transformationType: "Exclamatory",
        ruleId: 16
      }
    ],
    topic: 'transformation',
    level: 'HSC',
    difficulty: 'HARD'
  },

  // Rajshahi Board 2019
  {
    id: "rajshahi-2019-transformation",
    year: 2019,
    board: "Rajshahi",
    instruction: "Read the following sentences and change them as directed in the bracket. [Rajshahi Board-2019]",
    transformations: [
      {
        question: "Tell me your age.",
        transformedSentence: "Tell me what your age is.",
        transformationType: "Complex",
        ruleId: 1
      },
      {
        question: "Some poets are at least as great as Tennyson.",
        transformedSentence: "Tennyson is one of the greatest poets.",
        transformationType: "Superlative",
        ruleId: 22
      },
      {
        question: "What though the field be lost!",
        transformedSentence: "It does not matter though the field is lost.",
        transformationType: "Assertive",
        ruleId: 16
      },
      {
        question: "My watch was lost.",
        transformedSentence: "I lost my watch.",
        transformationType: "Active",
        ruleId: 1
      },
      {
        question: "He confessed that he was guilty.",
        transformedSentence: "He confessed his guilt.",
        transformationType: "Simple",
        ruleId: 1
      }
    ],
    topic: 'transformation',
    level: 'HSC',
    difficulty: 'HARD'
  },

  // Cumilla Board 2019
  {
    id: "cumilla-2019-transformation",
    year: 2019,
    board: "Cumilla",
    instruction: "Read the text and transform the sentences as directed. [Cumilla Board-2019]",
    transformations: [
      {
        question: "Dowry hampers the peace of the society.",
        transformedSentence: "The peace of the society is hampered by dowry.",
        transformationType: "Passive",
        ruleId: 1
      },
      {
        question: "The brutal condition of the dark age must be stopped soon.",
        transformedSentence: "We must stop the brutal condition of the dark age soon.",
        transformationType: "Active",
        ruleId: 1
      },
      {
        question: "This is one of the major problems of Bangladesh.",
        transformedSentence: "Very few problems of Bangladesh are as major as this.",
        transformationType: "Positive",
        ruleId: 22
      },
      {
        question: "The dowry seekers are very greedy and demand money from bride's father.",
        transformedSentence: "Being very greedy, the dowry seekers demand money from bride's father.",
        transformationType: "Simple",
        ruleId: 1
      },
      {
        question: "What an unworthy crime the dowry is!",
        transformedSentence: "The dowry is a very unworthy crime.",
        transformationType: "Assertive",
        ruleId: 16
      }
    ],
    topic: 'transformation',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },

  // Jashore Board 2019
  {
    id: "jashore-2019-transformation",
    year: 2019,
    board: "Jashore",
    instruction: "Read the following sentences and change them as directed in the bracket. [Jashore Board-2019]",
    transformations: [
      {
        question: "An honest man is honoured everywhere by all.",
        transformedSentence: "All honour an honest man everywhere.",
        transformationType: "Active",
        ruleId: 1
      },
      {
        question: "He is not only a teacher but also a singer.",
        transformedSentence: "He is both a teacher and a singer.",
        transformationType: "Simple",
        ruleId: 10
      },
      {
        question: "Though we are improving very fast, we have to work hard for the country.",
        transformedSentence: "We are improving very fast, yet we have to work hard for the country.",
        transformationType: "Compound",
        ruleId: 3
      },
      {
        question: "Very few cricket teams in the world are as unpredictable as Pakistan.",
        transformedSentence: "Pakistan is one of the most unpredictable cricket teams in the world.",
        transformationType: "Superlative",
        ruleId: 22
      },
      {
        question: "My friend came to me to get help from us.",
        transformedSentence: "My friend came to me so that he could get help from us.",
        transformationType: "Complex",
        ruleId: 2
      }
    ],
    topic: 'transformation',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },

  // Sylhet Board 2019
  {
    id: "sylhet-2019-transformation",
    year: 2019,
    board: "Sylhet",
    instruction: "Transform the underlined parts of the following text as per direction. [Sylhet Board-2019]",
    transformations: [
      {
        question: "\"Beautiful Isn't she?\" Tanvir whispered.",
        transformedSentence: "\"She is very beautiful.\"",
        transformationType: "Assertive",
        ruleId: 16
      },
      {
        question: "Tania nodded in agreement, but she was extremely nervous.",
        transformedSentence: "Though Tania nodded in agreement, she was extremely nervous.",
        transformationType: "Complex",
        ruleId: 3
      },
      {
        question: "The tigress was now quite close to them.",
        transformedSentence: "Wasn't the tigress now quite close to them?",
        transformationType: "Interrogative",
        ruleId: 14
      },
      {
        question: "He got closer to the animal and pressed the shutter button with a boyish grin in the face.",
        transformedSentence: "Getting closer to the animal, he pressed the shutter button with a boyish grin in the face.",
        transformationType: "Simple",
        ruleId: 1
      },
      {
        question: "And it suddenly occurred to Tania that her husband was the strongest man she had ever met.",
        transformedSentence: "No other man she had ever met was as strong as her husband.",
        transformationType: "Positive",
        ruleId: 21
      }
    ],
    topic: 'transformation',
    level: 'HSC',
    difficulty: 'HARD'
  }
];

// Export metadata for the topic
export const transformationQuestionsMetadata = {
  topic: 'transformation' as const,
  slug: 'transformation' as const,
  level: 'HSC' as QuestionLevel,
  totalQuestions: transformationQuestions.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0',
  yearRange: {
    from: Math.min(...transformationQuestions.filter(q => q.year).map(q => q.year!)),
    to: Math.max(...transformationQuestions.filter(q => q.year).map(q => q.year!))
  }
};