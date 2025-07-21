// Centralized Completing Sentence Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

import { Question, QuestionLevel, QuestionTopicSlug, QuestionBoard, QuestionDifficulty } from '@/types/question.types';

export interface CompletingSentenceQuestion extends Omit<Question, 'topic' | 'level'> {
  topic: 'completing-sentence';
  level: QuestionLevel;
  ruleId?: number;
}

export const completingSentenceQuestions: CompletingSentenceQuestion[] = [
  { 
    id: "barisal-2022-a", 
    question: "I can't recall his name. It is long since...", 
    ruleId: 15,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Barishal',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "barisal-2022-b", 
    question: "A village doctor is a person who treats...", 
    ruleId: 31,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Barishal',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "barisal-2022-c", 
    question: "Our country is beset with many problems. We all should come forward in order to...", 
    ruleId: 1,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Barishal',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "barisal-2022-d", 
    question: "Whenever he speaks in English, he makes...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Barishal',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "barisal-2022-e", 
    question: "A student has to be punctual. He/She has to study regularly lest...", 
    ruleId: 3,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Barishal',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "chattogram-2022-a", 
    question: "Time once lost is lost forever. So we should...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Chattogram',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "chattogram-2022-b", 
    question: "All around us are not friends. In fact, friends who stand by us in our danger are...", 
    ruleId: 31,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Chattogram',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "chattogram-2022-c", 
    question: "For higher education, we should learn English. So, it is high time...", 
    ruleId: 13,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Chattogram',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "chattogram-2022-d", 
    question: "Neighbors are those persons who live adjacent to us. As man cannot live alone, he...", 
    ruleId: 31,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Chattogram',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "chattogram-2022-e", 
    question: "Birds fly in the sky. I wish I had...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Chattogram',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "cumilla-2022-a", 
    question: "Had he been a poet, he would have...", 
    ruleId: 141,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Cumilla',
    year: 2022,
    difficulty: 'HARD'
  },
  { 
    id: "cumilla-2022-b", 
    question: "Honesty is a great virtue. We should not...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Cumilla',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "cumilla-2022-c", 
    question: "A rainy day is the day when...", 
    ruleId: 31,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Cumilla',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "cumilla-2022-d", 
    question: "All of us should try our best to do something for...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Cumilla',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "cumilla-2022-e", 
    question: "It is very cold. They have to put on warm clothes so that...", 
    ruleId: 1,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Cumilla',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "dhaka-2022-a", 
    question: "I could not recognize you at first. It was many years since...", 
    ruleId: 15,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dhaka',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "dhaka-2022-b", 
    question: "Water is polluted in different ways. It is high time...", 
    ruleId: 13,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dhaka',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "dhaka-2022-c", 
    question: "I think you are not regular in studies. Be attentive lest...", 
    ruleId: 3,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dhaka',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "dhaka-2022-d", 
    question: "Birds fly in the sky freely. Had I the wings of a bird...", 
    ruleId: 141,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dhaka',
    year: 2022,
    difficulty: 'HARD'
  },
  { 
    id: "dhaka-2022-e", 
    question: "There are many obstacles in our way to success. We must work hard so that...", 
    ruleId: 1,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dhaka',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "dinajpur-2022-a", 
    question: "I am waiting for the chairman. Can you tell me when...", 
    ruleId: 31,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dinajpur',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "dinajpur-2022-b", 
    question: "Development of a country depends on the active participation of every citizen. Bangladesh expects that every citizen...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dinajpur',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "dinajpur-2022-c", 
    question: "Give me your address. I will...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dinajpur',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "dinajpur-2022-d", 
    question: "Her son died in an accident. She was so grief-stricken that...", 
    ruleId: 16,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dinajpur',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "dinajpur-2022-e", 
    question: "There is a job vacancy announced on BD.job.com. Anyone who wants to apply...", 
    ruleId: 31,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Dinajpur',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "jashore-2022-a", 
    question: "Sabbir Khan is a quack. He behaves as though...", 
    ruleId: 2,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Jashore',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "jashore-2022-b", 
    question: "A proverb goes that...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Jashore',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "jashore-2022-c", 
    question: "I found a box in the room. The box was too heavy for me...", 
    ruleId: 24,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Jashore',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "jashore-2022-d", 
    question: "Corruption is an obstacle to our national development. It is high time...", 
    ruleId: 13,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Jashore',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "jashore-2022-e", 
    question: "It is love that means...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Jashore',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "mymensingh-2022-a", 
    question: "Florence Nightingale wanted to be a nurse with a view to...", 
    ruleId: 1,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Mymensingh',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "mymensingh-2022-b", 
    question: "We are a free nation now. 1971 is the year when...", 
    ruleId: 31,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Mymensingh',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "mymensingh-2022-c", 
    question: "I don't have enough money. Had I been a rich man, I would...", 
    ruleId: 141,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Mymensingh',
    year: 2022,
    difficulty: 'HARD'
  },
  { 
    id: "mymensingh-2022-d", 
    question: "My final examination is going on. I studied hard lest...", 
    ruleId: 3,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Mymensingh',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "mymensingh-2022-e", 
    question: "Man proposes, God...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Mymensingh',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "rajshahi-2022-a", 
    question: "If I had a camera, I would take some photographs. I like...", 
    ruleId: 141,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Rajshahi',
    year: 2022,
    difficulty: 'HARD'
  },
  { 
    id: "rajshahi-2022-b", 
    question: "Though he was brilliant, he did not score well in the examination because...", 
    ruleId: 4,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Rajshahi',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "rajshahi-2022-c", 
    question: "Jamil had an accident yesterday while...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Rajshahi',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "rajshahi-2022-d", 
    question: "I am not a rich man. The car is too expensive for me...", 
    ruleId: 24,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Rajshahi',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "rajshahi-2022-e", 
    question: "There goes a proverb that a man is known by the company...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Rajshahi',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "sylhet-2022-a", 
    question: "A good student must possess...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Sylhet',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "sylhet-2022-b", 
    question: "The student who learns by trial and error is...", 
    ruleId: 31,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Sylhet',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  { 
    id: "sylhet-2022-c", 
    question: "He must be honest in thought, active in habit and obedient to...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Sylhet',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "sylhet-2022-d", 
    question: "To observe the rules of health is another...",
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Sylhet',
    year: 2022,
    difficulty: 'EASY'
  },
  { 
    id: "sylhet-2022-e", 
    question: "He who is always sincere in his studies makes...", 
    ruleId: 31,
    topic: 'completing-sentence',
    level: 'HSC',
    board: 'Sylhet',
    year: 2022,
    difficulty: 'MEDIUM'
  }
  // ADD MORE QUESTIONS HERE - copy from components/questions/CompletingSentenceQuestionsPage.tsx
  // Just follow the same structure as above
];

// Export metadata for the topic
export const completingSentenceQuestionsMetadata = {
  topic: 'completing-sentence' as const,
  slug: 'completing-sentence' as const,
  level: 'HSC' as QuestionLevel,
  totalQuestions: completingSentenceQuestions.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0',
  yearRange: {
    from: Math.min(...completingSentenceQuestions.filter(q => q.year).map(q => q.year!)),
    to: Math.max(...completingSentenceQuestions.filter(q => q.year).map(q => q.year!))
  }
};