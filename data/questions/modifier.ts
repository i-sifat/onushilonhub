// Centralized Modifier Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

import { Question, QuestionLevel, QuestionTopicSlug, QuestionBoard, QuestionDifficulty, QuestionBlank } from '../../types/question.types';

export interface ModifierQuestion extends Omit<Question, 'topic' | 'level'> {
  topic: 'modifier';
  level: QuestionLevel;
  passage?: string;
  blanks?: ModifierBlank[];
}

export interface ModifierBlank extends QuestionBlank {
  ruleId?: number;
}

export const modifierQuestions: ModifierQuestion[] = [
  {
    id: "dhaka-2023",
    year: 2023,
    board: "Dhaka",
    question: "Use appropriate pre/post-modifiers in the blank spaces",
    passage: "Cricket is an [a1] game. It is not a game of [b5] country. A [c4] match is played between two teams. [d2] team consists of eleven players. A cricket field must be [e9] well-maintained. It requires two wooden bats, a ball & two sets of stamps. [f11] Umpires conduct the game. Sometimes, a third umpire is required [g1p] an acute confusion. [h8] the opportunity, the batter hits the ball away at a good distance and runs to the opposite wicket. If [i2] batter is out, next batter comes in his place. Both teams try [j6p] to out all batters of the opposite.",
    blanks: [
      { id: "a1", ruleId: 1, answer: "international / elite" },
      { id: "b5", ruleId: 5, answer: "our" },
      { id: "c4", ruleId: 4, answer: "cricket" },
      { id: "d2", ruleId: 2, answer: "Each" },
      { id: "e9", ruleId: 9, answer: "well-maintained" },
      { id: "f11", ruleId: 11, answer: "Two" },
      { id: "g1p", ruleId: 13, answer: "to resolve / clear" },
      { id: "h8", ruleId: 8, answer: "Having / Taking" },
      { id: "i2", ruleId: 2, answer: "any" },
      { id: "j6p", ruleId: 17, answer: "hard enough" }
    ],
    topic: 'modifier',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },
  {
    id: "rajshahi-2023",
    year: 2023,
    board: "Rajshahi",
    question: "Use appropriate pre/post-modifiers in the blank spaces",
    passage: "People around were just watching as the [a1] boy started [b3p] into the [c1] canal. Then the traffic constable came. [d8] no time, he jumped into the canal. The [e1] constable did not think of his [f5] life. He was [g3] kind that he risked his life. People [h9] by canal praised him [i5p]. This type of person is a model [j10p].",
    blanks: [
      { id: "a1", ruleId: 1, answer: "young" },
      { id: "b3p", ruleId: 15, answer: "drowning" },
      { id: "c1", ruleId: 1, answer: "deep" },
      { id: "d8", ruleId: 8, answer: "Wasting" },
      { id: "e1", ruleId: 1, answer: "police" },
      { id: "f5", ruleId: 5, answer: "own" },
      { id: "g3", ruleId: 3, answer: "so" },
      { id: "h9", ruleId: 9, answer: "standing / sitting" },
      { id: "i5p", ruleId: 17, answer: "enormously / greatly / cheerfully / a lot / tremendously" },
      { id: "j10p", ruleId: 22, answer: "for the society / of dedication and sacrifice" }
    ],
    topic: 'modifier',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },
  {
    id: "cumilla-2023",
    year: 2023,
    board: "Cumilla",
    question: "Use appropriate pre/post-modifiers in the blank spaces",
    passage: "Amerigo, [a10p] lives alone. His parents now live separate and none of them wants [b1p] his responsibility. [c5] mother told him to go away because she is married to another man. [d2] streets are now his home. He wanted [e1] money from his father to buy a [f4] ticket. But his father did not answer. He earns his living by working hard. [g6] he finds work. [h7] works are risky for him. Once he sold ice cream [i7p]. But he got [j11] money in return from the owner of the ice cream shop.",
    blanks: [
      { id: "a10p", ruleId: 22, answer: "a street child" },
      { id: "b1p", ruleId: 13, answer: "to take" },
      { id: "c5", ruleId: 5, answer: "His" },
      { id: "d2", ruleId: 2, answer: "The" },
      { id: "e1", ruleId: 1, answer: "some" },
      { id: "f4", ruleId: 4, answer: "bus" },
      { id: "g6", ruleId: 6, answer: "hardly" },
      { id: "h7", ruleId: 7, answer: "These" },
      { id: "i7p", ruleId: 19, answer: "on the beach" },
      { id: "j11", ruleId: 11, answer: "no" }
    ],
    topic: 'modifier',
    level: 'HSC',
    difficulty: 'HARD'
  },
  {
    id: "jashore-2023",
    board: "Jashore",
    year: 2023,
    question: "Use appropriate pre/post-modifiers in the blank spaces",
    passage: "Language plays a [a3] important role in our life. We use language from the time we wake up [b7p] till we go to bed at night. We use language not only in our [c1] hours but also in our dreams. We use language [d1p] what we feel and to say what we like or dislike. We also use language [e1p] information. Language is [f3] present in our life. It is an [g1] part of our life. As an [h1] nation we also have a language. But we had to struggle [i5p] to establish the right to our language. Many [j1] sons of our country sacrificed their lives for our mother-tongue.",
    blanks: [
      { id: "a3", ruleId: 3, answer: "very" },
      { id: "b7p", ruleId: 7, answer: "in the morning" },
      { id: "c1", ruleId: 1, answer: "conscious / active" },
      { id: "d1p", ruleId: 1, answer: "to express" },
      { id: "e1p", ruleId: 1, answer: "to share / to gather" },
      { id: "f3", ruleId: 3, answer: "always" },
      { id: "g1", ruleId: 1, answer: "integral / inevitable" },
      { id: "h1", ruleId: 1, answer: "independent" },
      { id: "i5p", ruleId: 5, answer: "a lot / hard / enormously" },
      { id: "j1", ruleId: 1, answer: "brave / courageous" }
    ],
    topic: 'modifier',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },
  {
    id: "sylhet-2023",
    board: "Sylhet",
    year: 2023,
    question: "Use appropriate pre/post-modifiers in the blank spaces",
    passage: "Drug addiction among the young generation has become a [a1] concern. Drug is mainly used as medicine [b1p] diseases and an excess of taking drug for no disease is called drug addiction. It has grasped the young generation [c5p]. They take drugs to forget [d5] sadness. [e1] people take drugs [f5p]. Drug addiction causes [g1] harm to human body. [h8] them aware, we can remove this curse from our society. All concerned should take initiatives [i1p] it. The criminals should be punished with an [j4] hand.",
    blanks: [
      { id: "a1", ruleId: 1, answer: "major" },
      { id: "b1p", ruleId: 1, answer: "to cure" },
      { id: "c5p", ruleId: 5, answer: "heavily" },
      { id: "d5", ruleId: 5, answer: "their" },
      { id: "e1", ruleId: 1, answer: "Young" },
      { id: "f5p", ruleId: 5, answer: "widely / recklessly" },
      { id: "g1", ruleId: 1, answer: "severe" },
      { id: "h8", ruleId: 8, answer: "Making" },
      { id: "i1p", ruleId: 1, answer: "to prevent" },
      { id: "j4", ruleId: 4, answer: "iron" }
    ],
    topic: 'modifier',
    level: 'HSC',
    difficulty: 'MEDIUM'
  }
];

// Export metadata for the topic
export const modifierQuestionsMetadata = {
  topic: 'modifier' as const,
  slug: 'modifier' as const,
  level: 'HSC' as QuestionLevel,
  totalQuestions: modifierQuestions.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0',
  yearRange: {
    from: Math.min(...modifierQuestions.filter(q => q.year).map(q => q.year!)),
    to: Math.max(...modifierQuestions.filter(q => q.year).map(q => q.year!))
  }
};