// Centralized Narration Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

export interface NarrationQuestion {
  id: string;
  year?: number;
  board?: string;
  question: string;
  directSpeech?: string;
  indirectSpeech?: string;
  ruleId?: number;
  type: 'direct-to-indirect' | 'indirect-to-direct';
}

export const narrationQuestions: NarrationQuestion[] = [
  {
    id: "dhaka-2022-narration-1",
    year: 2022,
    board: "Dhaka Board",
    question: "Change the narration: He said to me, 'I am reading a book.'",
    directSpeech: "He said to me, 'I am reading a book.'",
    indirectSpeech: "He told me that he was reading a book.",
    ruleId: 1,
    type: "direct-to-indirect"
  },
  {
    id: "dhaka-2022-narration-2",
    year: 2022,
    board: "Dhaka Board",
    question: "Change the narration: The teacher asked the student if he had done his homework.",
    directSpeech: "The teacher said to the student, 'Have you done your homework?'",
    indirectSpeech: "The teacher asked the student if he had done his homework.",
    ruleId: 1,
    type: "indirect-to-direct"
  },
  {
    id: "rajshahi-2022-narration-1",
    year: 2022,
    board: "Rajshahi Board",
    question: "Change the narration: She said, 'What a beautiful flower it is!'",
    directSpeech: "She said, 'What a beautiful flower it is!'",
    indirectSpeech: "She exclaimed with joy that it was a very beautiful flower.",
    ruleId: 1,
    type: "direct-to-indirect"
  },
  {
    id: "chittagong-2022-narration-1",
    year: 2022,
    board: "Chittagong Board",
    question: "Change the narration: The mother said to her son, 'Do not tell a lie.'",
    directSpeech: "The mother said to her son, 'Do not tell a lie.'",
    indirectSpeech: "The mother advised her son not to tell a lie.",
    ruleId: 1,
    type: "direct-to-indirect"
  },
  {
    id: "sylhet-2022-narration-1",
    year: 2022,
    board: "Sylhet Board",
    question: "Change the narration: He wished that he might pass the examination.",
    directSpeech: "He said, 'May I pass the examination.'",
    indirectSpeech: "He wished that he might pass the examination.",
    ruleId: 1,
    type: "indirect-to-direct"
  },
  {
    id: "barisal-2023-narration-1",
    year: 2023,
    board: "Barisal Board",
    question: "Change the narration: 'Where are you going?' he asked me.",
    directSpeech: "'Where are you going?' he asked me.",
    indirectSpeech: "He asked me where I was going.",
    ruleId: 1,
    type: "direct-to-indirect"
  },
  {
    id: "cumilla-2023-narration-1",
    year: 2023,
    board: "Cumilla Board",
    question: "Change the narration: The father told his son that honesty was the best policy.",
    directSpeech: "The father said to his son, 'Honesty is the best policy.'",
    indirectSpeech: "The father told his son that honesty was the best policy.",
    ruleId: 6,
    type: "indirect-to-direct"
  },
  {
    id: "mymensingh-2023-narration-1",
    year: 2023,
    board: "Mymensingh Board",
    question: "Change the narration: 'Let us go for a walk,' he said to me.",
    directSpeech: "'Let us go for a walk,' he said to me.",
    indirectSpeech: "He proposed to me that we should go for a walk.",
    ruleId: 1,
    type: "direct-to-indirect"
  },
  {
    id: "jashore-2023-narration-1",
    year: 2023,
    board: "Jashore Board",
    question: "Change the narration: The teacher said, 'The sun rises in the east.'",
    directSpeech: "The teacher said, 'The sun rises in the east.'",
    indirectSpeech: "The teacher said that the sun rises in the east.",
    ruleId: 6,
    type: "direct-to-indirect"
  },
  {
    id: "dinajpur-2024-narration-1",
    year: 2024,
    board: "Dinajpur Board",
    question: "Change the narration: She exclaimed with sorrow that she was undone.",
    directSpeech: "She said, 'Alas! I am undone.'",
    indirectSpeech: "She exclaimed with sorrow that she was undone.",
    ruleId: 1,
    type: "indirect-to-direct"
  }
];