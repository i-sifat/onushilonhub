// Centralized Connectors Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

import { Question, QuestionLevel, QuestionTopicSlug, QuestionBoard, QuestionDifficulty, QuestionBlank } from '@/types/question.types';

export interface ConnectorQuestion extends Omit<Question, 'topic' | 'level'> {
  topic: 'connectors';
  level: QuestionLevel;
  passage?: string;
  blanks?: ConnectorBlank[];
}

export interface ConnectorBlank extends QuestionBlank {
  ruleId?: number;
  explanation?: string;
}

export const connectorsQuestions: ConnectorQuestion[] = [
  {
    id: "dhaka-2016-connectors",
    year: 2016,
    board: "Dhaka",
    question: "Fill in the blanks with appropriate connectors",
    passage: "A lion was drinking water from a brook. (a) ___ a lamb was also drinking water from the downstream of the same brook. The lion saw the lamb and decided to devour it. (b) ___ he was thinking about how to accomplish his evil design. (c) ___ he hit upon a plan. (d) ___ the lion complained that the lamb was disturbing him by muddying water. But the lamb said that he was drinking water from downstream. (e) ___ the questions of muddying water on his part did not arise. (f) ___ the lamb argued that it was the lion that was muddying the water for him as he was drinking water upstream. (g) ___ the lion retorted that the lamb spoke ill of him a year ago. (h) ___ the lamb said that he was not born a year ago. The lion grew into a rage. (i) ___ he said that perhaps his father spoke ill of him last year. (j) ___ the lion had the right to take revenge and kill the lamb.",
    blanks: [
      { id: "a", answer: "As", ruleId: 49 },
      { id: "b", answer: "So", ruleId: 1 },
      { id: "c", answer: "That", ruleId: 45 },
      { id: "d", answer: "While", ruleId: 26 },
      { id: "e", answer: "In fact", ruleId: 29 },
      { id: "f", answer: "If", ruleId: 37 },
      { id: "g", answer: "Which", ruleId: 10 },
      { id: "h", answer: "Who", ruleId: 10 },
      { id: "i", answer: "And", ruleId: 5 },
      { id: "j", answer: "Therefore", ruleId: 1 }
    ],
    topic: 'connectors',
    level: 'HSC',
    difficulty: 'HARD'
  },
  {
    id: "rajshahi-2016-connectors",
    year: 2016,
    board: "Rajshahi",
    question: "Fill in the blanks with appropriate connectors",
    passage: "(a) ___ I was walking along the road the other day, I happened to notice a small brown leather purse lying on the pavement. I picked it up and opened it to see (b) ____ I could find out the owner's name. There was nothing inside. It (c) ___ some small change and a rather old photograph a picture of a woman and a young girl about twelve years old who looked like the woman's daughter. I put the photograph back (d) ___ took the purse to the police station. (e) ___ I handed it to the sergeant-in-charge. Before I left, the sergeant made a note of my name and address in case the owner of the purse wanted to write and thank me. That evening I went to have dinner with an uncle and aunt of mine. They had also invited another person, a young woman, (f) ____ there would be four people at the table. The young woman's face was familiar, (g) ___ I could not remember where I had seen it. I was quite sure, (h) ___ we had not met before. (i) ___ conversation, however, the young woman happened to mark that she had lost her purse that afternoon. I at once remembered where I had seen her face. She was the young woman in the photograph (j) ___ she was now much older.",
    blanks: [
      { id: "a", answer: "While", ruleId: 26 },
      { id: "b", answer: "Whether", ruleId: 46 },
      { id: "c", answer: "Had" },
      { id: "d", answer: "And", ruleId: 5 },
      { id: "e", answer: "Then", ruleId: 13 },
      { id: "f", answer: "And", ruleId: 5 },
      { id: "g", answer: "But", ruleId: 18 },
      { id: "h", answer: "That", ruleId: 45 },
      { id: "i", answer: "During" },
      { id: "j", answer: "But", ruleId: 18 }
    ],
    topic: 'connectors',
    level: 'HSC',
    difficulty: 'HARD'
  },
  {
    id: "cumilla-2016-connectors",
    year: 2016,
    board: "Cumilla",
    question: "Fill in the blanks with appropriate connectors",
    passage: "Mobile phone has become an essential gadget for everybody. (a) — it has become very popular. (b) — it has created a number of problems. It has (c) — advantages (d) — disadvantages. (e) — it helps to connect people. (f) — it helps to exchange information (g) — it can be used for various purpose. (h) — it has a few disadvantages. (i) — it can cause a lot of troubles. (j) — its advantages are more than its disadvantages.",
    blanks: [
      { id: "a", answer: "As", ruleId: 49 },
      { id: "b", answer: "But", ruleId: 18 },
      { id: "c", answer: "Both", ruleId: 9 },
      { id: "d", answer: "And", ruleId: 5 },
      { id: "e", answer: "Firstly", ruleId: 17 },
      { id: "f", answer: "Secondly", ruleId: 17 },
      { id: "g", answer: "Furthermore", ruleId: 4 },
      { id: "h", answer: "However", ruleId: 27 },
      { id: "i", answer: "Which", ruleId: 10 },
      { id: "j", answer: "However", ruleId: 27 }
    ],
    topic: 'connectors',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },
  {
    id: "sylhet-2016-connectors",
    year: 2016,
    board: "Sylhet",
    question: "Fill in the blanks with appropriate connectors",
    passage: "The gifts of science are uncountable. (a) --- we cast our eyes, we see the wonders of science. Satellite TV channels are means through (b) --- we can see and hear the events (c) --- are happening all over the world. (d) ---, today we have specialized satellite channels on almost every interest. (e) ---, people now have more choices and more freedom about television programmes. Satellite channels help us a lot by reporting on climatic conditions of different parts of the world. (f) ---, we can be aware of storms, cyclones and tidal bores, (g) --- satellite channels are helping us to a great extent to enrich our own culture and tradition. (h) --- satellite channels are playing a favourable role, it is (i) --- doing harm to our young and new generation. (j) --- still we cannot deny the immense benefits we are getting from satellite channels.",
    blanks: [
      { id: "a", answer: "Wherever", ruleId: 48 },
      { id: "b", answer: "Which", ruleId: 10 },
      { id: "c", answer: "That", ruleId: 45 },
      { id: "d", answer: "In fact", ruleId: 29 },
      { id: "e", answer: "Therefore", ruleId: 1 },
      { id: "f", answer: "Thus", ruleId: 25 },
      { id: "g", answer: "Moreover", ruleId: 4 },
      { id: "h", answer: "Though", ruleId: 52 },
      { id: "i", answer: "Also", ruleId: 15 },
      { id: "j", answer: "But", ruleId: 18 }
    ],
    topic: 'connectors',
    level: 'HSC',
    difficulty: 'HARD'
  },
  {
    id: "chattogram-2016-connectors",
    year: 2016,
    board: "Chattogram",
    question: "Fill in the blanks with appropriate connectors",
    passage: "Bangladesh is mainly an agricultural country. (a)---, her economy and prosperity depend on agriculture. (b)---, our agriculture depends on the mercy of nature. (c)---, if there is sufficient rain, people can plough their lands and sow seeds in time. (d)---, they can reap a good harvest. (e)--- if it does not rain in time, the farmers cannot grow the crops easily and they do not have a good harvest. (f)---, without water our agriculture is lifeless. The rain is not always beneficial to our agriculture (g) ---, sometimes it rains so much that it causes floods. (h) ---, our crops go underwater and most often, they are totally destroyed. (i)---, the farmers who constitute the most part of our professional people, lose everything. (j)---, we can safely conclude that our economy depends on rain.",
    blanks: [
      { id: "a", answer: "So", ruleId: 1 },
      { id: "b", answer: "Again", ruleId: 4 },
      { id: "c", answer: "Hence", ruleId: 1 },
      { id: "d", answer: "As a result", ruleId: 1 },
      { id: "e", answer: "On the contrary", ruleId: 18 },
      { id: "f", answer: "Therefore", ruleId: 1 },
      { id: "g", answer: "For example", ruleId: 20 },
      { id: "h", answer: "As a result", ruleId: 1 },
      { id: "i", answer: "Consequently", ruleId: 1 },
      { id: "j", answer: "In fine", ruleId: 2 }
    ],
    topic: 'connectors',
    level: 'HSC',
    difficulty: 'MEDIUM'
  }
  // ADD MORE QUESTIONS HERE - copy from components/questions/ConnectorsQuestionsPage.tsx
  // Just follow the same structure as above
];

// Export metadata for the topic
export const connectorsQuestionsMetadata = {
  topic: 'connectors' as const,
  slug: 'connectors' as const,
  level: 'HSC' as QuestionLevel,
  totalQuestions: connectorsQuestions.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0',
  yearRange: {
    from: Math.min(...connectorsQuestions.filter(q => q.year).map(q => q.year!)),
    to: Math.max(...connectorsQuestions.filter(q => q.year).map(q => q.year!))
  }
};