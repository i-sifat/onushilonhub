// Centralized Transformation Questions Data

export interface TransformationQuestion {
  id: string;
  year?: number;
  board?: string;
  question: string;
  originalSentence: string;
  transformedSentence: string;
  transformationType: 'simple-complex-compound' | 'affirmative-negative' | 'assertive-interrogative' | 'assertive-exclamatory' | 'assertive-imperative' | 'degree';
  ruleId?: number;
  instruction: string;
}

export const transformationQuestions: TransformationQuestion[] = [
  // Simple-Complex-Compound Transformations
  {
    id: "dhaka-2022-transformation-1",
    year: 2022,
    board: "Dhaka Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "Being honest, he is loved by all.",
    transformedSentence: "Since he is honest, he is loved by all.",
    transformationType: "simple-complex-compound",
    ruleId: 1,
    instruction: "Simple to Complex"
  },
  {
    id: "dhaka-2022-transformation-2",
    year: 2022,
    board: "Dhaka Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "He came to meet me.",
    transformedSentence: "He came so that he could meet me.",
    transformationType: "simple-complex-compound",
    ruleId: 2,
    instruction: "Simple to Complex"
  },
  {
    id: "rajshahi-2022-transformation-1",
    year: 2022,
    board: "Rajshahi Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "In spite of being poor, he is honest.",
    transformedSentence: "Though he is poor, he is honest.",
    transformationType: "simple-complex-compound",
    ruleId: 3,
    instruction: "Simple to Complex"
  },
  {
    id: "chittagong-2022-transformation-1",
    year: 2022,
    board: "Chittagong Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "She was too tired to move.",
    transformedSentence: "She was so tired that she could not move.",
    transformationType: "simple-complex-compound",
    ruleId: 4,
    instruction: "Simple to Complex"
  },
  {
    id: "sylhet-2022-transformation-1",
    year: 2022,
    board: "Sylhet Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "Without working hard, you will fail.",
    transformedSentence: "If you don't work hard, you will fail.",
    transformationType: "simple-complex-compound",
    ruleId: 5,
    instruction: "Simple to Complex"
  },

  // Affirmative-Negative Transformations
  {
    id: "dhaka-2023-transformation-1",
    year: 2023,
    board: "Dhaka Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "Only Allah can help us.",
    transformedSentence: "None but Allah can help us.",
    transformationType: "affirmative-negative",
    ruleId: 7,
    instruction: "Affirmative to Negative"
  },
  {
    id: "rajshahi-2023-transformation-1",
    year: 2023,
    board: "Rajshahi Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "I have a few friends.",
    transformedSentence: "I do not have many friends.",
    transformationType: "affirmative-negative",
    ruleId: 8,
    instruction: "Affirmative to Negative"
  },
  {
    id: "chittagong-2023-transformation-1",
    year: 2023,
    board: "Chittagong Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "He must admit his fault.",
    transformedSentence: "He cannot but admit his fault.",
    transformationType: "affirmative-negative",
    ruleId: 9,
    instruction: "Affirmative to Negative"
  },
  {
    id: "sylhet-2023-transformation-1",
    year: 2023,
    board: "Sylhet Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "Both he and his brother are intelligent.",
    transformedSentence: "Not only he but also his brother is intelligent.",
    transformationType: "affirmative-negative",
    ruleId: 10,
    instruction: "Affirmative to Negative"
  },
  {
    id: "barisal-2023-transformation-1",
    year: 2023,
    board: "Barisal Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "Every mother loves her child.",
    transformedSentence: "There is no mother but loves her child.",
    transformationType: "affirmative-negative",
    ruleId: 11,
    instruction: "Affirmative to Negative"
  },

  // Assertive-Interrogative Transformations
  {
    id: "dhaka-2024-transformation-1",
    year: 2024,
    board: "Dhaka Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "He is a good student.",
    transformedSentence: "Is he not a good student?",
    transformationType: "assertive-interrogative",
    ruleId: 14,
    instruction: "Assertive to Interrogative"
  },
  {
    id: "rajshahi-2024-transformation-1",
    year: 2024,
    board: "Rajshahi Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "He never tells a lie.",
    transformedSentence: "Does he ever tell a lie?",
    transformationType: "assertive-interrogative",
    ruleId: 15,
    instruction: "Assertive to Interrogative"
  },

  // Assertive-Exclamatory Transformations
  {
    id: "cumilla-2024-transformation-1",
    year: 2024,
    board: "Cumilla Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "It is a beautiful flower.",
    transformedSentence: "What a beautiful flower it is!",
    transformationType: "assertive-exclamatory",
    ruleId: 16,
    instruction: "Assertive to Exclamatory"
  },
  {
    id: "mymensingh-2024-transformation-1",
    year: 2024,
    board: "Mymensingh Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "I wish I could fly.",
    transformedSentence: "If I could fly!",
    transformationType: "assertive-exclamatory",
    ruleId: 17,
    instruction: "Assertive to Exclamatory"
  },

  // Assertive-Imperative Transformations
  {
    id: "jashore-2024-transformation-1",
    year: 2024,
    board: "Jashore Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "You should study hard.",
    transformedSentence: "Study hard.",
    transformationType: "assertive-imperative",
    ruleId: 19,
    instruction: "Assertive to Imperative"
  },
  {
    id: "dinajpur-2024-transformation-1",
    year: 2024,
    board: "Dinajpur Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "You are requested to help me.",
    transformedSentence: "Please help me.",
    transformationType: "assertive-imperative",
    ruleId: 20,
    instruction: "Assertive to Imperative"
  },

  // Degree Transformations
  {
    id: "dhaka-2024-transformation-2",
    year: 2024,
    board: "Dhaka Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "Iron is the most useful of all metals.",
    transformedSentence: "No other metal is as useful as iron.",
    transformationType: "degree",
    ruleId: 21,
    instruction: "Superlative to Positive"
  },
  {
    id: "rajshahi-2024-transformation-2",
    year: 2024,
    board: "Rajshahi Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "Rahim is taller than any other boy in the class.",
    transformedSentence: "Rahim is the tallest boy in the class.",
    transformationType: "degree",
    ruleId: 21,
    instruction: "Comparative to Superlative"
  },
  {
    id: "chittagong-2024-transformation-2",
    year: 2024,
    board: "Chittagong Board",
    question: "Transform the following sentence as directed:",
    originalSentence: "Very few cities are as beautiful as Dhaka.",
    transformedSentence: "Dhaka is one of the most beautiful cities.",
    transformationType: "degree",
    ruleId: 22,
    instruction: "Positive to Superlative"
  }
];