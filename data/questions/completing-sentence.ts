// Centralized Completing Sentence Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

import { Question, QuestionLevel } from '@/types/question.types';

export interface CompletingSentenceQuestion extends Omit<Question, 'topic' | 'level' | 'blanks'> {
  topic: 'completing-sentence';
  level: QuestionLevel;
  ruleId?: number;
  blanks?: CompletingSentenceBlank[];
}

export interface CompletingSentenceBlank {
  id: string;
  answer: string;
  hints: string[];
  ruleId?: number;
}

export const completingSentenceQuestions: CompletingSentenceQuestion[] = [
  // 2024 Questions
  {
    id: "dhaka-2024-1",
    topic: 'completing-sentence',
    level: 'HSC',
    question: "Complete the following sentences with suitable clauses/phrases:\n\n(a) Trees are essential for our existence. So, ---\n(b) The rats are now thinking who will tie the bell on cat? Finally they realize it is easy to say ----\n(c) Wait until -----. You should not go out alone.\n(d) Love is divine. You can't find others to love you unless -----\n(e) Punctuality is a great virtue. So try ---\n(f) The patient was so serious and we were looking for a doctor. Alas! The patient had died before ----\n(g) Sharing is ---- So, teach your children how to share.\n(h) Everybody must be conscious of health because----\n(i) The train will start at 10 am. Now it is 09:55 am. So, walk fast lest ----\n(j) Corruption is a hindrance to national development. It is high time----",
    answer: "(a) we should plant more trees; (b) but difficult to do; (c) I come back; (d) you love them; (e) to be punctual; (f) we found a doctor/the doctor came; (g) a great virtue/an admirable virtue; (h) health is wealth; (i) you should/might miss the train; (j) we took steps against corruption/to take steps against corruption",
    board: 'Dhaka',
    year: 2024,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'we should plant more trees', hints: ['so that clause'], ruleId: 1 },
      { id: 'b', answer: 'but difficult to do', hints: ['contrast'], ruleId: 4 },
      { id: 'c', answer: 'I come back', hints: ['until clause'], ruleId: 11 },
      { id: 'd', answer: 'you love them', hints: ['unless clause'], ruleId: 20 },
      { id: 'e', answer: 'to be punctual', hints: ['infinitive'], ruleId: 13 },
      { id: 'f', answer: 'we found a doctor/the doctor came', hints: ['before clause'], ruleId: 5 },
      { id: 'g', answer: 'a great virtue/an admirable virtue', hints: ['noun phrase'], ruleId: 23 },
      { id: 'h', answer: 'health is wealth', hints: ['because clause'], ruleId: 22 },
      { id: 'i', answer: 'you should/might miss the train', hints: ['lest clause'], ruleId: 3 },
      { id: 'j', answer: 'we took steps against corruption/to take steps against corruption', hints: ['it is high time'], ruleId: 13 }
    ]
  },
  {
    id: "rajshahi-2024-1",
    topic: 'completing-sentence',
    level: 'HSC',
    question: "Complete the following sentences with suitable clauses/phrases:\n\n(a) Had you sought my help, ----\n(b) A man leading an indolent life ----\n(c) Strike the rod ----\n(d) The men, who love their country, ----\n(e) Be punctual in your studies ----\n(f) Food adulteration is a crime. It is high time ----\n(g) Childhood is the golden period of life. I wish ----\n(h) Scarcely had we got out of home ----\n(i) I know the man ----\n(j) He feigns as though -----",
    answer: "(a) you would not have faced such a crisis; (b) cannot succeed in life; (c) while it is hot; (d) are called patriots; (e) and cut a good figure in exam/or you may fail to make a good result; (f) we prevented this crime; (g) I were a child again; (h) when/before our mother started crying; (i) who climbed Everest; (j) he broke his legs",
    board: 'Rajshahi',
    year: 2024,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'you would not have faced such a crisis', hints: ['conditional clause'], ruleId: 32 },
      { id: 'b', answer: 'cannot succeed in life', hints: ['result clause'], ruleId: 16 },
      { id: 'c', answer: 'while it is hot', hints: ['time clause'], ruleId: 11 },
      { id: 'd', answer: 'are called patriots', hints: ['relative clause'], ruleId: 31 },
      { id: 'e', answer: 'and cut a good figure in exam/or you may fail to make a good result', hints: ['result clause'], ruleId: 3 },
      { id: 'f', answer: 'we prevented this crime', hints: ['it is high time'], ruleId: 13 },
      { id: 'g', answer: 'I were a child again', hints: ['wish clause'], ruleId: 14 },
      { id: 'h', answer: 'when/before our mother started crying', hints: ['scarcely had'], ruleId: 7 },
      { id: 'i', answer: 'who climbed Everest', hints: ['relative clause'], ruleId: 31 },
      { id: 'j', answer: 'he broke his legs', hints: ['as though clause'], ruleId: 2 }
    ]
  },
  {
    id: "cumilla-2024-1",
    topic: 'completing-sentence',
    level: 'HSC',
    question: "Complete the following sentences with suitable clauses/phrases:\n\n(a) I'm so tired that -----. Please, take a rickshaw right now.\n(b) Though Bangladesh is a small country, ----\n(c) I can't recall his name. It is long since ---\n(d) She came to my room while ----. She didn't wake me up.\n(e) It is true that most of the parents of our country are not interested enough to ----. They think, educating their daughters is nothing but a wastage of time and money.\n(f) There are many helpless people around us. I wish ----\n(g) He likes photography very much. But unfortunately lost his camera. If he had the camera, -----\n(h) Be punctual lest ----\n(i) Our job market is getting very competitive. Unless you study well, -----\n(j) It is too hot inside the room. Would you mind -----",
    answer: "(a) I cannot go any farther; (b) there are many heritage sites in this country; (c) we met last; (d) I was sleeping; (e) educate their daughters; (f) I could help them; (g) he would take many pictures; (h) you should/might lag behind; (i) you will not get a good job; (j) opening the window so that air can get in",
    board: 'Cumilla',
    year: 2024,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'I cannot go any farther', hints: ['so that clause'], ruleId: 16 },
      { id: 'b', answer: 'there are many heritage sites in this country', hints: ['though clause'], ruleId: 4 },
      { id: 'c', answer: 'we met last', hints: ['since clause'], ruleId: 15 },
      { id: 'd', answer: 'I was sleeping', hints: ['while clause'], ruleId: 11 },
      { id: 'e', answer: 'educate their daughters', hints: ['infinitive'], ruleId: 24 },
      { id: 'f', answer: 'I could help them', hints: ['wish clause'], ruleId: 14 },
      { id: 'g', answer: 'he would take many pictures', hints: ['conditional clause'], ruleId: 32 },
      { id: 'h', answer: 'you should/might lag behind', hints: ['lest clause'], ruleId: 3 },
      { id: 'i', answer: 'you will not get a good job', hints: ['unless clause'], ruleId: 20 },
      { id: 'j', answer: 'opening the window so that air can get in', hints: ['would you mind'], ruleId: 10 }
    ]
  },
  {
    id: "jashore-2024-1",
    topic: 'completing-sentence',
    level: 'HSC',
    question: "Complete the following sentences with suitable clauses/phrases:\n\n(a) The poor man knocked at the door. He came to me with a view to ----\n(b) Many illiterate people do not have any knowledge of health. If they were educated ----\n(c) Scarcely had the teacher gone out of the room ----\n(d) My grandmother lives in a village. It is many years since ----\n(e) Trees are very important for our existence on earth. It is high time ----\n(f) Despite the fact that he worked very hard ----. He was rather disappointed.\n(g) You should finish your work today. A stitch in time ----\n(h) You are making a long Journey. Keep your phone turned on in case ----\n(i) My friend is going to the USA. I wish ----\n(j) Time is so valuable that ----",
    answer: "(a) begging some food; (b) They would not suffer from malnutrition; (c) when the students made much noise; (d) I met her; (e) we planted more trees/to plant more trees; (f) he failed to complete the task; (g) saves nine; (h) someone wants to reach you; (i) I could go with him; (j) we cannot waste it consciously",
    board: 'Jashore',
    year: 2024,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'begging some food', hints: ['with a view to'], ruleId: 24 },
      { id: 'b', answer: 'They would not suffer from malnutrition', hints: ['conditional clause'], ruleId: 32 },
      { id: 'c', answer: 'when the students made much noise', hints: ['scarcely had'], ruleId: 7 },
      { id: 'd', answer: 'I met her', hints: ['since clause'], ruleId: 15 },
      { id: 'e', answer: 'we planted more trees/to plant more trees', hints: ['it is high time'], ruleId: 13 },
      { id: 'f', answer: 'he failed to complete the task', hints: ['despite clause'], ruleId: 4 },
      { id: 'g', answer: 'saves nine', hints: ['proverb'], ruleId: 23 },
      { id: 'h', answer: 'someone wants to reach you', hints: ['in case clause'], ruleId: 18 },
      { id: 'i', answer: 'I could go with him', hints: ['wish clause'], ruleId: 14 },
      { id: 'j', answer: 'we cannot waste it consciously', hints: ['so that clause'], ruleId: 16 }
    ]
  },
  {
    id: "barishal-2024-1",
    topic: 'completing-sentence',
    level: 'HSC',
    question: "Complete the following sentences with suitable clauses/phrases:\n\n(a) It is too late. Now I ---- go to lunch.\n(b) It is a long time since ---\n(c) Had I earned enough money, ----\n(d) He is a quack but he talks to the patients as if he ----\n(e) The girl returned home before evening lest she ----\n(f) Mira sings very well. If she gets opportunity, ----\n(g) The poem is too difficult for ---\n(h) In spite of having all facilities, the boy ----\n(i) Patriotism is a noble virtue. It is high time ----\n(j) He studied hard so that ----",
    answer: "(a) am unable to; (b) we last met; (c) I would have bought a house; (d) were a qualified doctor; (e) should be scolded by her parents; (f) she can become a famous singer; (g) young children to understand; (h) did not succeed; (i) we promoted it more actively; (j) he could pass the exam with flying colors",
    board: 'Barishal',
    year: 2024,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'am unable to', hints: ['too clause'], ruleId: 17 },
      { id: 'b', answer: 'we last met', hints: ['since clause'], ruleId: 15 },
      { id: 'c', answer: 'I would have bought a house', hints: ['conditional clause'], ruleId: 32 },
      { id: 'd', answer: 'were a qualified doctor', hints: ['as if clause'], ruleId: 2 },
      { id: 'e', answer: 'should be scolded by her parents', hints: ['lest clause'], ruleId: 3 },
      { id: 'f', answer: 'she can become a famous singer', hints: ['conditional clause'], ruleId: 32 },
      { id: 'g', answer: 'young children to understand', hints: ['too clause'], ruleId: 17 },
      { id: 'h', answer: 'did not succeed', hints: ['in spite of'], ruleId: 4 },
      { id: 'i', answer: 'we promoted it more actively', hints: ['it is high time'], ruleId: 13 },
      { id: 'j', answer: 'he could pass the exam with flying colors', hints: ['so that clause'], ruleId: 1 }
    ]
  },
  {
    id: "chattogram-2024-1",
    topic: 'completing-sentence',
    level: 'HSC',
    question: "Complete the following sentences with suitable clauses/phrases:\n\n(a) I miss my maternal grandmother a lot. 15 years have passed since ----\n(b) Zillur and Ashraf were lucky. No sooner had they ----\n(c) In our country, there are many people -----. Poverty is a curse for any society.\n(d) Corruption is an obstacle to our national development. It is high time ----\n(e) Study sincerely lest ----\n(f) Nurjahan studies medicine so that ----\n(g) Once there was an old man who had three sons. They were so lazy that ----\n(h) Rezwan tried his best to get the job but he could not get it. Had he got the job, he would ----\n(i) The man ---- can maintain a sound health.\n(j) Florence Nightingale wanted to be a nurse with a view to ----",
    answer: "(a) I last met her; (b) reached than they caught the bus; (c) who are poor / lead their lives under the poverty line; (d) to take action against corruption. /Government took necessary steps to stop corruption; (e) you should fail; (f) she can become a doctor and serve people; (g) they couldn't work hard to earn their living; (h) have moved to the city; (i) who does physical exercise; (j) helping the sick and injured people",
    board: 'Chattogram',
    year: 2024,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'I last met her', hints: ['since clause'], ruleId: 15 },
      { id: 'b', answer: 'reached than they caught the bus', hints: ['no sooner had'], ruleId: 7 },
      { id: 'c', answer: 'who are poor / lead their lives under the poverty line', hints: ['relative clause'], ruleId: 31 },
      { id: 'd', answer: 'to take action against corruption. /Government took necessary steps to stop corruption', hints: ['it is high time'], ruleId: 13 },
      { id: 'e', answer: 'you should fail', hints: ['lest clause'], ruleId: 3 },
      { id: 'f', answer: 'she can become a doctor and serve people', hints: ['so that clause'], ruleId: 1 },
      { id: 'g', answer: 'they couldn\'t work hard to earn their living', hints: ['so that clause'], ruleId: 16 },
      { id: 'h', answer: 'have moved to the city', hints: ['conditional clause'], ruleId: 32 },
      { id: 'i', answer: 'who does physical exercise', hints: ['relative clause'], ruleId: 31 },
      { id: 'j', answer: 'helping the sick and injured people', hints: ['with a view to'], ruleId: 24 }
    ]
  },
  {
    id: "dinajpur-2024-1",
    topic: 'completing-sentence',
    level: 'HSC',
    question: "Complete the following sentences with suitable clauses/phrases:\n\n(a) There goes a proverb, \"Grasp all ---. \"If you want to get everything at a time, you may end up in losing everything.\n(b) The first and foremost duty of a student is to study. Without --- you can never expect a good result.\n(c) You never speak the truth. I will not accompany you unless you ----\n(d) Early rising is good for health. You should rise early so that ---\n(e) Self-help is the best help and Allah helps those who ---\n(f) Don't be tensed for my return. ---- after I shall have finished my work.\n(g) You ought to read your texts again and again with a view to ----\n(h) You should remember that if you do not work hard, you will have a chance to fail in the exam. Work hard lest ----\n(i) It is 10 O'clock now. Our train will start exactly at 11 O'clock. It is high time we ----\n(j) My childhood was full of happiness. Would that ----",
    answer: "(a) lose all; (b) studying regularly/hard; (c) speak the truth; (d) you can possess/have a good health; (e) help themselves; (f) You can get in touch with me; (g) understanding the concept clearly; (h) you should/might fail in the exam; (i) started for the station; (j) I could be a child again",
    board: 'Dinajpur',
    year: 2024,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'lose all', hints: ['proverb'], ruleId: 23 },
      { id: 'b', answer: 'studying regularly/hard', hints: ['without clause'], ruleId: 19 },
      { id: 'c', answer: 'speak the truth', hints: ['unless clause'], ruleId: 20 },
      { id: 'd', answer: 'you can possess/have a good health', hints: ['so that clause'], ruleId: 1 },
      { id: 'e', answer: 'help themselves', hints: ['relative clause'], ruleId: 31 },
      { id: 'f', answer: 'You can get in touch with me', hints: ['time clause'], ruleId: 11 },
      { id: 'g', answer: 'understanding the concept clearly', hints: ['with a view to'], ruleId: 24 },
      { id: 'h', answer: 'you should/might fail in the exam', hints: ['lest clause'], ruleId: 3 },
      { id: 'i', answer: 'started for the station', hints: ['it is high time'], ruleId: 13 },
      { id: 'j', answer: 'I could be a child again', hints: ['would that'], ruleId: 14 }
    ]
  },
  {
    id: "mymensingh-2024-1",
    topic: 'completing-sentence',
    level: 'HSC',
    question: "Complete the following sentences with suitable clauses/phrases:\n\n(a) Patriotism is a noble virtue. It is high time ---\n(b) Hasan got GPA 4.50. Had he studies seriously he ---\n(c) Time is valuable. Those who waste time ----\n(d) This celling is not so high. He is tall enough ----\n(e) Lock the door and keep the key in a safe place lest -----.\n(f) You cannot understand everything clearly unless ----\n(g) A lot of passengers were waiting at the bus stop. A bus came. But the bus was so small that ----\n(h) Inspite of facing so many drawbacks in life he ---- ultimately.\n(i) Ayesha is a bright student. She studies hard so that ----\n(j) Freedom is man's birthright. He is born free but everywhere -----",
    answer: "(a) we practiced patriotism/to become patriots; (b) would have got/gotten GPA 5.00; (c) suffer in the long run / cannot succeed in life; (d) to touch the ceiling; (e) you should/might lose the key; (f) you study thoroughly; (g) it could not take all the passengers; (h) became successful; (i) she can cut a good figure in exam; (j) he is in chain",
    board: 'Mymensingh',
    year: 2024,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'we practiced patriotism/to become patriots', hints: ['it is high time'], ruleId: 13 },
      { id: 'b', answer: 'would have got/gotten GPA 5.00', hints: ['conditional clause'], ruleId: 32 },
      { id: 'c', answer: 'suffer in the long run / cannot succeed in life', hints: ['relative clause'], ruleId: 31 },
      { id: 'd', answer: 'to touch the ceiling', hints: ['enough clause'], ruleId: 17 },
      { id: 'e', answer: 'you should/might lose the key', hints: ['lest clause'], ruleId: 3 },
      { id: 'f', answer: 'you study thoroughly', hints: ['unless clause'], ruleId: 20 },
      { id: 'g', answer: 'it could not take all the passengers', hints: ['so that clause'], ruleId: 16 },
      { id: 'h', answer: 'became successful', hints: ['in spite of'], ruleId: 4 },
      { id: 'i', answer: 'she can cut a good figure in exam', hints: ['so that clause'], ruleId: 1 },
      { id: 'j', answer: 'he is in chain', hints: ['contrast'], ruleId: 4 }
    ]
  }
];

// Export metadata for the topic
export const completingSentenceQuestionsMetadata = {
  lastUpdated: '2024-01-15',
  version: '1.0.0',
  totalQuestions: 8,
  yearRange: '2024',
  boards: ['Dhaka', 'Rajshahi', 'Cumilla', 'Jashore', 'Barishal', 'Chattogram', 'Dinajpur', 'Mymensingh'],
  levels: ['HSC'],
  topics: ['completing-sentence']
};