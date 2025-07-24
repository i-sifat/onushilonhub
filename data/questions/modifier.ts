// Centralized Modifier Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

import { Question, QuestionLevel } from '@/types/question.types';

export interface ModifierQuestion extends Omit<Question, 'topic' | 'level'> {
  topic: 'modifier';
  level: QuestionLevel;
  passage?: string;
  blanks?: ModifierBlank[];
}

export interface ModifierBlank {
  id: string;
  answer: string;
  hints: string[];
  ruleId?: number;
}

export const modifierQuestions: ModifierQuestion[] = [
  // 2023 Questions
  {
    id: "dhaka-2023-1",
    topic: 'modifier',
    level: 'HSC',
    question: "Read the following text and use modifiers as directed in the blank spaces.\n\nCricket is an (a) --- (pre-modify the noun) game. It is not a game of (b) --- (use possessive to pre-modify the noun) country. A (c) --- (use a noun adjective to pre-modify the noun) match is played between two teams. (d) --- (use a distributive pronoun to pre-modify the noun) team consists of eleven players. A cricket field must be (e) --- (post-modify the noun). It requires two wooden bats, a ball & two sets of stamps. (f) --- (use a numeral adjective to pre-modify the noun) Umpires conduct the game. Sometimes, a third umpire is required (g) --- (use an infinitive to post-modify the verb) an acute confusion. (h) --- (use a participle to pre-modify the noun) the opportunity, the batter hits the ball away at a good distance and runs to the opposite wicket. If (i) --- (use an indefinite pronoun to pre-modify the noun) batter is out, next batter comes in his place. Both teams try (j) --- (use an adverbial phrase to post modify) to out all batters of the opposite.",
    answer: "(a) international/elite; (b) our; (c) cricket; (d) Each; (e) well-maintained; (f) Two; (g) to resolve/clear; (h) Having/Taking; (i) any; (j) hard enough",
    board: 'Dhaka',
    year: 2023,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'international/elite', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'b', answer: 'our', hints: ['use possessive to pre-modify the noun'], ruleId: 5 },
      { id: 'c', answer: 'cricket', hints: ['use a noun adjective to pre-modify the noun'], ruleId: 4 },
      { id: 'd', answer: 'Each', hints: ['use a distributive pronoun to pre-modify the noun'], ruleId: 2 },
      { id: 'e', answer: 'well-maintained', hints: ['post-modify the noun'], ruleId: 9 },
      { id: 'f', answer: 'Two', hints: ['use a numeral adjective to pre-modify the noun'], ruleId: 12 },
      { id: 'g', answer: 'to resolve/clear', hints: ['use an infinitive to post-modify the verb'], ruleId: 13 },
      { id: 'h', answer: 'Having/Taking', hints: ['use a participle to pre-modify the noun'], ruleId: 9 },
      { id: 'i', answer: 'any', hints: ['use an indefinite pronoun to pre-modify the noun'], ruleId: 2 },
      { id: 'j', answer: 'hard enough', hints: ['use an adverbial phrase to post modify'], ruleId: 18 }
    ]
  },
  {
    id: "rajshahi-2023-1",
    topic: 'modifier',
    level: 'HSC',
    question: "People around were just watching as the (a) --- (pre-modify the noun) boy started (b) --- (post-modify the verb) into the (c) --- (pre-modify the noun) canal. Then the traffic constable came. (d) --- (pre-modify the noun with a present participle) no time, he jumped into the canal. The (e) --- (pre-modify the noun with an adjective) constable did not think of his (f) --- (pre-modify the noun) life. He was (g) --- (use an intensifier to pre-modify the adjective) kind that he risked his life. People (h) --- (post-modify the noun) by canal praised him (i) --- (post-modify the verb with an adverb). This type of person is a model (j) --- (post-modify the noun).",
    answer: "(a) young; (b) drowning; (c) deep; (d) Wasting; (e) police; (f) own; (g) so; (h) standing/sitting; (i) enormously/greatly/cheerfully/a lot/tremendously; (j) for the society/of dedication and sacrifice",
    board: 'Rajshahi',
    year: 2023,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'young', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'b', answer: 'drowning', hints: ['post-modify the verb'], ruleId: 15 },
      { id: 'c', answer: 'deep', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'd', answer: 'Wasting', hints: ['pre-modify the noun with a present participle'], ruleId: 9 },
      { id: 'e', answer: 'police', hints: ['pre-modify the noun with an adjective'], ruleId: 1 },
      { id: 'f', answer: 'own', hints: ['pre-modify the noun'], ruleId: 5 },
      { id: 'g', answer: 'so', hints: ['use an intensifier to pre-modify the adjective'], ruleId: 3 },
      { id: 'h', answer: 'standing/sitting', hints: ['post-modify the noun'], ruleId: 21 },
      { id: 'i', answer: 'enormously/greatly/cheerfully/a lot/tremendously', hints: ['post-modify the verb with an adverb'], ruleId: 17 },
      { id: 'j', answer: 'for the society/of dedication and sacrifice', hints: ['post-modify the noun'], ruleId: 19 }
    ]
  },
  {
    id: "cumilla-2023-1",
    topic: 'modifier',
    level: 'HSC',
    question: "Amerigo, (a) --- (use noun in apposition) lives alone. His parents now live separate and none of them wants (b) --- (use an infinitive to post modify the verb) his responsibility. (c) --- (use possessive to pre-modify the noun) mother told him to go away because she is married to another man. (d) --- (use determiner to pre-modify the noun) streets are now his home. He wanted (e) --- (use an adjective to pre-modify the noun) money from his father to buy a (f) --- (use a noun adjective to pre-modify the noun) ticket. But his father did not answer. He earns his living by working hard. (g) --- (use adverbial to pre-modify the verb) he finds work. (h) --- (use demonstrative to pre-modify the noun) works are risky for him. Once he sold ice cream (i) --- (use a prepositional phrase to post modify the verb). But he got (j) --- (use quantifier to pre-modify the noun) money in return from the owner of the ice cream shop.",
    answer: "(a) a street child; (b) to take; (c) His; (d) The; (e) some; (f) bus; (g) hardly; (h) These; (i) on the beach; (j) no",
    board: 'Cumilla',
    year: 2023,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'a street child', hints: ['use noun in apposition'], ruleId: 22 },
      { id: 'b', answer: 'to take', hints: ['use an infinitive to post modify the verb'], ruleId: 13 },
      { id: 'c', answer: 'His', hints: ['use possessive to pre-modify the noun'], ruleId: 5 },
      { id: 'd', answer: 'The', hints: ['use determiner to pre-modify the noun'], ruleId: 2 },
      { id: 'e', answer: 'some', hints: ['use an adjective to pre-modify the noun'], ruleId: 1 },
      { id: 'f', answer: 'bus', hints: ['use a noun adjective to pre-modify the noun'], ruleId: 4 },
      { id: 'g', answer: 'hardly', hints: ['use adverbial to pre-modify the verb'], ruleId: 6 },
      { id: 'h', answer: 'These', hints: ['use demonstrative to pre-modify the noun'], ruleId: 7 },
      { id: 'i', answer: 'on the beach', hints: ['use a prepositional phrase to post modify the verb'], ruleId: 19 },
      { id: 'j', answer: 'no', hints: ['use quantifier to pre-modify the noun'], ruleId: 11 }
    ]
  },
  {
    id: "jashore-2023-1",
    topic: 'modifier',
    level: 'HSC',
    question: "Language plays a (a) --- (pre-modify the adjective with an intensifier) important role in our life. We use language from the time we wake up (b) --- (post-modify the verb) till we go to bed at night. We use language not only in our (c) --- (pre-modify the noun) hours but also in our dreams. We use language (d) --- (post-modify the verb with an infinitive) what we feel and to say what we like or dislike. We also use language (e) --- (post modify the verb with an infinitive) information. Language is (f) --- (pre-modify the adjective) present in our life. It is an (g) --- (pre-modify the noun) part of our life. As an (h) --- (pre-modify the noun) nation we also have a language. But we had to struggle (i) --- (use adverb to post-modify the verb) to establish the right to our language. Many (j) --- (pre-modify the noun with an adjective) sons of our country sacrificed their lives for our mother-tongue.",
    answer: "(a) very; (b) in the morning; (c) conscious/active; (d) to express; (e) to share/to gather; (f) always; (g) integral/inevitable; (h) independent; (i) a lot/hard/enormously; (j) brave/courageous",
    board: 'Jashore',
    year: 2023,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'very', hints: ['pre-modify the adjective with an intensifier'], ruleId: 3 },
      { id: 'b', answer: 'in the morning', hints: ['post-modify the verb'], ruleId: 19 },
      { id: 'c', answer: 'conscious/active', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'd', answer: 'to express', hints: ['post-modify the verb with an infinitive'], ruleId: 13 },
      { id: 'e', answer: 'to share/to gather', hints: ['post modify the verb with an infinitive'], ruleId: 13 },
      { id: 'f', answer: 'always', hints: ['pre-modify the adjective'], ruleId: 6 },
      { id: 'g', answer: 'integral/inevitable', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'h', answer: 'independent', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'i', answer: 'a lot/hard/enormously', hints: ['use adverb to post-modify the verb'], ruleId: 17 },
      { id: 'j', answer: 'brave/courageous', hints: ['pre-modify the noun with an adjective'], ruleId: 1 }
    ]
  },
  {
    id: "sylhet-2023-1",
    topic: 'modifier',
    level: 'HSC',
    question: "Drug addiction among the young generation has become a (a) --- (pre modify the noun) concern. Drug is mainly used as medicine (b) --- (use an infinitive to post modify the verb) diseases and an excess of taking drug for no disease is called drug addiction. It has grasped the young generation (c) --- (post modify the verb). They take drugs to forget (d) --- (use possessive to pre modify the noun) sadness. (e) --- (pre modify the noun) people take drugs (f) --- (use adverb to post modify). Drug addiction causes (g) --- (pre modify the noun) harm to human body. (h) --- (use a participle) them aware, we can remove this curse from our society. All concerned should take initiatives (i) --- (use an infinitive to post modify the verb) it. The criminals should be punished with an (j) --- (use a noun adjective) hand.",
    answer: "(a) major; (b) to cure; (c) heavily; (d) their; (e) Young; (f) widely/recklessly; (g) severe; (h) Making; (i) to prevent; (j) iron",
    board: 'Sylhet',
    year: 2023,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'major', hints: ['pre modify the noun'], ruleId: 1 },
      { id: 'b', answer: 'to cure', hints: ['use an infinitive to post modify the verb'], ruleId: 13 },
      { id: 'c', answer: 'heavily', hints: ['post modify the verb'], ruleId: 17 },
      { id: 'd', answer: 'their', hints: ['use possessive to pre modify the noun'], ruleId: 5 },
      { id: 'e', answer: 'Young', hints: ['pre modify the noun'], ruleId: 1 },
      { id: 'f', answer: 'widely/recklessly', hints: ['use adverb to post modify'], ruleId: 17 },
      { id: 'g', answer: 'severe', hints: ['pre modify the noun'], ruleId: 1 },
      { id: 'h', answer: 'Making', hints: ['use a participle'], ruleId: 9 },
      { id: 'i', answer: 'to prevent', hints: ['use an infinitive to post modify the verb'], ruleId: 13 },
      { id: 'j', answer: 'iron', hints: ['use a noun adjective'], ruleId: 4 }
    ]
  },
  {
    id: "barishal-2023-1",
    topic: 'modifier',
    level: 'HSC',
    question: "Kazi Nazrul Islam is called the Shelley of Bangla literature. He was a (a) --- (pre modify the noun) poet. He wrote (b) --- (post modify the verb) in almost all branches of Bangla literature. Nazrul, (c) --- (use an appositive to post modify the noun), won the attention of everybody in his childhood. He wrote ceaselessly until the death of (d) --- (use a possessive to pre modify the noun) poetic flair. He composed (e) --- (pre modify the noun) songs (f) --- (post modify the noun with an adjective clause). His literary works have enriched (g) --- (pre modify the noun) Literature. His poems and songs played a great role (h) --- (use an infinitive to post modify the verb) in our war of Liberation. He (i) --- (pre modify the verb) sang the songs of equality in his poems. He is (j) --- (pre modify the noun with determiner) pride, no doubt.",
    answer: "(a) revolutionary/rebel; (b) relentlessly/tirelessly; (c) an orphan child/a prodigy; (d) his; (e) many; (f) which are loved/appreciated by all; (g) Bengali/Bangla; (h) to encourage people; (i) always; (j) our",
    board: 'Barishal',
    year: 2023,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'revolutionary/rebel', hints: ['pre modify the noun'], ruleId: 1 },
      { id: 'b', answer: 'relentlessly/tirelessly', hints: ['post modify the verb'], ruleId: 17 },
      { id: 'c', answer: 'an orphan child/a prodigy', hints: ['use an appositive to post modify the noun'], ruleId: 22 },
      { id: 'd', answer: 'his', hints: ['use a possessive to pre modify the noun'], ruleId: 5 },
      { id: 'e', answer: 'many', hints: ['pre modify the noun'], ruleId: 11 },
      { id: 'f', answer: 'which are loved/appreciated by all', hints: ['post modify the noun with an adjective clause'], ruleId: 21 },
      { id: 'g', answer: 'Bengali/Bangla', hints: ['pre modify the noun'], ruleId: 4 },
      { id: 'h', answer: 'to encourage people', hints: ['use an infinitive to post modify the verb'], ruleId: 13 },
      { id: 'i', answer: 'always', hints: ['pre modify the verb'], ruleId: 6 },
      { id: 'j', answer: 'our', hints: ['pre modify the noun with determiner'], ruleId: 2 }
    ]
  },
  {
    id: "dinajpur-2023-1",
    topic: 'modifier',
    level: 'HSC',
    question: "An (a) --- (pre-modify the noun) student is he, who has (b) --- (use a quantifier to pre-modify the noun) good qualities. He studies (c) --- (post modify the verb). He knows that the (d) --- (pre-modify the noun) duty of a student is to study. So, he never neglects (e) --- (use a possessive) duty. He even makes the proper use of (f) --- (use a determiner to pre-modify the noun) moment. Sabuj, (g) --- (post modify the noun with an appositive) of our class is an example of a good student. Sabuj is (h) --- (pre-modify the adjective) helpful to us. I try (i) --- (modify the verb with an infinitive) a boy like Sabuj. I want to be one of the (j) --- (pre-modify the noun) stars in the class.",
    answer: "(a) ideal; (b) many; (c) regularly; (d) main; (e) his; (f) every; (g) a student; (h) very; (i) to be; (j) brightest",
    board: 'Dinajpur',
    year: 2023,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'ideal', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'b', answer: 'many', hints: ['use a quantifier to pre-modify the noun'], ruleId: 11 },
      { id: 'c', answer: 'regularly', hints: ['post modify the verb'], ruleId: 17 },
      { id: 'd', answer: 'main', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'e', answer: 'his', hints: ['use a possessive'], ruleId: 5 },
      { id: 'f', answer: 'every', hints: ['use a determiner to pre-modify the noun'], ruleId: 2 },
      { id: 'g', answer: 'a student', hints: ['post modify the noun with an appositive'], ruleId: 22 },
      { id: 'h', answer: 'very', hints: ['pre-modify the adjective'], ruleId: 3 },
      { id: 'i', answer: 'to be', hints: ['modify the verb with an infinitive'], ruleId: 13 },
      { id: 'j', answer: 'brightest', hints: ['pre-modify the noun'], ruleId: 1 }
    ]
  },
  {
    id: "mymensingh-2023-1",
    topic: 'modifier',
    level: 'HSC',
    question: "The purpose of education is to bring about (a) --- (use an adjective to pre-modify the noun) changes in (b) --- (use a possessive to pre-modify the noun) behaviour. It also brings changes in our lives and society (c) --- (use a relative clause to post-modify the noun). If it fails to do so, it can't be called education. Education is not only receiving certificates and getting grades. It is (d) --- (use an intensifier to pre-modify the adjective) more than that, we can apply our (e) --- (use a past participle to pre-modify the noun) knowledge in our engagement with the world that lies (f) --- (use an adverb to post-modify the verb). We can do that in (g) --- (use an adjective to pre-modify the noun) ways. One way is civic engagement which is (h) --- (use an adverb to pre-modify the verb) appreciated all over the world. Civic engagement means working to make difference in civic life (i) --- (use a prepositional phrase to post-modify the noun). A person (j) --- (use a past participle to post modify the noun) civically is concerned about civic issues like injustice, discrimination and other forms of social ills.",
    answer: "(a) positive/effective; (b) our; (c) in which we live/where we live; (d) much/far; (e) acquired; (f) around; (g) many/different; (h) greatly; (i) of a person; (j) behaved",
    board: 'Mymensingh',
    year: 2023,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'positive/effective', hints: ['use an adjective to pre-modify the noun'], ruleId: 1 },
      { id: 'b', answer: 'our', hints: ['use a possessive to pre-modify the noun'], ruleId: 5 },
      { id: 'c', answer: 'in which we live/where we live', hints: ['use a relative clause to post-modify the noun'], ruleId: 21 },
      { id: 'd', answer: 'much/far', hints: ['use an intensifier to pre-modify the adjective'], ruleId: 3 },
      { id: 'e', answer: 'acquired', hints: ['use a past participle to pre-modify the noun'], ruleId: 9 },
      { id: 'f', answer: 'around', hints: ['use an adverb to post-modify the verb'], ruleId: 17 },
      { id: 'g', answer: 'many/different', hints: ['use an adjective to pre-modify the noun'], ruleId: 1 },
      { id: 'h', answer: 'greatly', hints: ['use an adverb to pre-modify the verb'], ruleId: 6 },
      { id: 'i', answer: 'of a person', hints: ['use a prepositional phrase to post-modify the noun'], ruleId: 19 },
      { id: 'j', answer: 'behaved', hints: ['use a past participle to post modify the noun'], ruleId: 9 }
    ]
  },
  {
    id: "chattogram-2023-1",
    topic: 'modifier',
    level: 'HSC',
    question: "We know that (a) --- (use quantifier to pre-modify the noun) species are important for maintaining (b) --- (pre-modify the noun) balance. If one is lost, the whole natural environment changes (c) --- (post-modify the verb). In order to protect the environment from being spoilt, we should protect (d) --- (use possessive to pre-modify the noun) wildlife. (e) --- (use determiner to pre-modify the noun phrase) good news is that many countries are taking action (f) --- (use infinitive phrase to post-modify the verb). George Lay Cock, (g) --- (use appositive to post-modify the noun) writes, 'Mankind must develop a concern for wild creatures and determine that (h) --- (use demonstrative to pre-modify the noun) wild species will not perish (i) --- (use prepositional phrase as post-modifier). We have to save wild animals (j) --- (use relative clause as post-modifier).'",
    answer: "(a) all; (b) environmental/ecological; (c) drastically/greatly; (d) our; (e) The; (f) to protect the wildlife; (g) a famous environmentalist/author of several books on wildlife; (h) these; (i) in the near future; (j) which are in the risk of extinction",
    board: 'Chattogram',
    year: 2023,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'all', hints: ['use quantifier to pre-modify the noun'], ruleId: 11 },
      { id: 'b', answer: 'environmental/ecological', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'c', answer: 'drastically/greatly', hints: ['post-modify the verb'], ruleId: 17 },
      { id: 'd', answer: 'our', hints: ['use possessive to pre-modify the noun'], ruleId: 5 },
      { id: 'e', answer: 'The', hints: ['use determiner to pre-modify the noun phrase'], ruleId: 2 },
      { id: 'f', answer: 'to protect the wildlife', hints: ['use infinitive phrase to post-modify the verb'], ruleId: 13 },
      { id: 'g', answer: 'a famous environmentalist/author of several books on wildlife', hints: ['use appositive to post-modify the noun'], ruleId: 22 },
      { id: 'h', answer: 'these', hints: ['use demonstrative to pre-modify the noun'], ruleId: 7 },
      { id: 'i', answer: 'in the near future', hints: ['use prepositional phrase as post-modifier'], ruleId: 19 },
      { id: 'j', answer: 'which are in the risk of extinction', hints: ['use relative clause as post-modifier'], ruleId: 21 }
    ]
  },
  // 2019 Questions
  {
    id: "dhaka-2019-1",
    topic: 'modifier',
    level: 'HSC',
    question: "Arsenic is a (a) --- (pre-modify the noun) substance. It is (b) --- (use an intensifier to pre-modify the adjective) dangerous for human health. (c) --- (use a demonstrative to pre-modify the noun) substance is found in the water of the tube well. There are (d) --- (use quantifier to pre-modify the noun) villages in (e) --- (use possessive to pre-modify the noun) country. Most of our (f) --- (use a noun adjective to pre-modify the noun) people drink tube well water. As a result, many of them are suffering from the arsenic problem. This problem is (g) --- (pre-modify the verb) found in North Bengal. We should take proper measures (h) --- (post-modify the verb with an infinitive phrase). Government is trying to mark the tube wells having arsenic (i) --- (use a participle to post modify the verb) red colour. People should be refrained from drinking water of (j) --- (use demonstrative to pre-modify the noun) tube wells. Otherwise, they will suffer from arsenicosis.",
    answer: "(a) harmful/poisonous/detrimental; (b) very/extremely; (c) this; (d) many/several; (e) our; (f) village; (g) mostly/usually/unexpectedly/nowadays; (h) to remain safe/to remove this problem/to purify the water; (i) painting; (j) those/these",
    board: 'Dhaka',
    year: 2019,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'harmful/poisonous/detrimental', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'b', answer: 'very/extremely', hints: ['use an intensifier to pre-modify the adjective'], ruleId: 3 },
      { id: 'c', answer: 'this', hints: ['use a demonstrative to pre-modify the noun'], ruleId: 7 },
      { id: 'd', answer: 'many/several', hints: ['use quantifier to pre-modify the noun'], ruleId: 11 },
      { id: 'e', answer: 'our', hints: ['use possessive to pre-modify the noun'], ruleId: 5 },
      { id: 'f', answer: 'village', hints: ['use a noun adjective to pre-modify the noun'], ruleId: 4 },
      { id: 'g', answer: 'mostly/usually/unexpectedly/nowadays', hints: ['pre-modify the verb'], ruleId: 6 },
      { id: 'h', answer: 'to remain safe/to remove this problem/to purify the water', hints: ['post-modify the verb with an infinitive phrase'], ruleId: 13 },
      { id: 'i', answer: 'painting', hints: ['use a participle to post modify the verb'], ruleId: 15 },
      { id: 'j', answer: 'those/these', hints: ['use demonstrative to pre-modify the noun'], ruleId: 7 }
    ]
  },
  {
    id: "rajshahi-2019-1",
    topic: 'modifier',
    level: 'HSC',
    question: "Taking food is essential. We take food (a) --- (use an infinitive phrase to post-modify the verb). We can not survive on earth if we do not take food. In fact (b) --- (use a quantifier to pre-modify the noun phrase) living beings need to take food. But it is a matter of great regret that (c) --- (use possessive to pre-modify the noun) food is being adulterated. (d) --- (use a noun-adjective to pre-modify the noun) adulteration is increasing (e) --- (use an intensifier to pre-modify the adverb) alarmingly that we cannot stop it. (f) --- (use a determiner to pre-modify the noun phrase) dishonest businessmen use (g) --- (pre-modify the noun) chemicals in food and fruits to make illegal and quick money. But they do not think about (h) --- (use a possessive to pre-modify the noun) health. (i) --- (use present participle) adulterated food, people get sick. They are often attacked with different fatal diseases. So (j) --- (use a gerund) food safety is a must today.",
    answer: "(a) to survive/to live; (b) all/every; (c) our; (d) Food; (e) so; (f) Some; (g) harmful; (h) our; (i) Taking/Eating; (j) ensuring",
    board: 'Rajshahi',
    year: 2019,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'to survive/to live', hints: ['use an infinitive phrase to post-modify the verb'], ruleId: 13 },
      { id: 'b', answer: 'all/every', hints: ['use a quantifier to pre-modify the noun phrase'], ruleId: 11 },
      { id: 'c', answer: 'our', hints: ['use possessive to pre-modify the noun'], ruleId: 5 },
      { id: 'd', answer: 'Food', hints: ['use a noun-adjective to pre-modify the noun'], ruleId: 4 },
      { id: 'e', answer: 'so', hints: ['use an intensifier to pre-modify the adverb'], ruleId: 3 },
      { id: 'f', answer: 'Some', hints: ['use a determiner to pre-modify the noun phrase'], ruleId: 2 },
      { id: 'g', answer: 'harmful', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'h', answer: 'our', hints: ['use a possessive to pre-modify the noun'], ruleId: 5 },
      { id: 'i', answer: 'Taking/Eating', hints: ['use present participle'], ruleId: 9 },
      { id: 'j', answer: 'ensuring', hints: ['use a gerund'], ruleId: 14 }
    ]
  },
  {
    id: "cumilla-2019-1",
    topic: 'modifier',
    level: 'HSC',
    question: "Newspaper plays a very (a) --- (pre-modify the noun) role in modern civilization. It publishes news and views of home and abroad. Only (b) --- (pre-modify the noun) knowledge is not enough in this competitive world. A newspaper helps a man (c) --- (post modify the verb with an infinitive) his general knowledge. Besides academic books, one should read newspapers (d) --- (post modify the verb). The newspaper helps one (e) --- (post-modify the verb with an infinitive) the facts of the world. (f) --- (pre-modify the verb with a present participle phrase) regularly, one can be aware of everything. There are (g) --- (pre-modify the noun) kinds of newspaper. One should select the newspaper (h) --- (post-modify the verb). One should choose the (i) --- (pre-modify the noun) paper because many newspapers present news partially. Whatever the paper is, it (j) --- (pre-modify the verb) helps a man.",
    answer: "(a) significant/important; (b) bookish; (c) to increase/to enrich; (d) everyday/regularly; (e) to know; (f) Reading newspaper; (g) different/various; (h) properly/rightly/justly/wisely; (i) impartial; (j) always/really/actually/truly",
    board: 'Cumilla',
    year: 2019,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'significant/important', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'b', answer: 'bookish', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'c', answer: 'to increase/to enrich', hints: ['post modify the verb with an infinitive'], ruleId: 13 },
      { id: 'd', answer: 'everyday/regularly', hints: ['post modify the verb'], ruleId: 17 },
      { id: 'e', answer: 'to know', hints: ['post-modify the verb with an infinitive'], ruleId: 13 },
      { id: 'f', answer: 'Reading newspaper', hints: ['pre-modify the verb with a present participle phrase'], ruleId: 9 },
      { id: 'g', answer: 'different/various', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'h', answer: 'properly/rightly/justly/wisely', hints: ['post-modify the verb'], ruleId: 17 },
      { id: 'i', answer: 'impartial', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'j', answer: 'always/really/actually/truly', hints: ['pre-modify the verb'], ruleId: 6 }
    ]
  },
  {
    id: "jashore-2019-1",
    topic: 'modifier',
    level: 'HSC',
    question: "Air and water are the most (a) --- (pre-modify the noun with an adjective) elements of the environment. But we pollute them (b) --- (post-modify the verb with an adverb). Mills and factories use fuel (c) --- (post-modify the verb with an infinitive) their products. The burning of this fuel creates smoke (d) --- (post-modify the verb with an adverbial). Motor vehicles also pollute the air, (e) --- (use an appositive). Water is polluted by (f) --- (pre-modify the noun with a quantifier) kinds of waste and filth. We pollute water (g) --- (post-modify the verb with present participle phrase) into water. Farmers use (h) --- (pre modify the noun with an adjective) fertilizers and insecticides and pollute water. (i) --- (pre-modify the noun with a past participle) water is (j) --- (pre-modify the adjective with an intensifier) harmful to health.",
    answer: "(a) essential/valuable; (b) indiscriminately; (c) to manufacture; (d) on a large scale/hugely/enormously; (e) an important element of our environment; (f) all/various/different; (g) throwing waste; (h) chemical; (i) Polluted/Contaminated; (j) very",
    board: 'Jashore',
    year: 2019,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'essential/valuable', hints: ['pre-modify the noun with an adjective'], ruleId: 1 },
      { id: 'b', answer: 'indiscriminately', hints: ['post-modify the verb with an adverb'], ruleId: 17 },
      { id: 'c', answer: 'to manufacture', hints: ['post-modify the verb with an infinitive'], ruleId: 13 },
      { id: 'd', answer: 'on a large scale/hugely/enormously', hints: ['post-modify the verb with an adverbial'], ruleId: 18 },
      { id: 'e', answer: 'an important element of our environment', hints: ['use an appositive'], ruleId: 22 },
      { id: 'f', answer: 'all/various/different', hints: ['pre-modify the noun with a quantifier'], ruleId: 11 },
      { id: 'g', answer: 'throwing waste', hints: ['post-modify the verb with present participle phrase'], ruleId: 15 },
      { id: 'h', answer: 'chemical', hints: ['pre modify the noun with an adjective'], ruleId: 1 },
      { id: 'i', answer: 'Polluted/Contaminated', hints: ['pre-modify the noun with a past participle'], ruleId: 9 },
      { id: 'j', answer: 'very', hints: ['pre-modify the adjective with an intensifier'], ruleId: 3 }
    ]
  },
  {
    id: "chattogram-2019-1",
    topic: 'modifier',
    level: 'HSC',
    question: "We can't think of our existence without language. It plays a (a) --- (use an intensifier) important role in our life. We use language from the time we wake up (b) --- (post-modify the verb) till we go to bed at night. We use language not only in our (c) --- (pre-modify the noun) hours but also in our dreams. We use language (d) --- (use an infinitive) what we feel and to say what we like or dislike. We also use language (e) --- (post-modify the verb with an infinitive) information. Language is (f) --- (pre-modify the adjective) present in our life. It is an (g) --- (pre-modify the noun) part of our life. As an (h) --- (pre-modify the noun) nation, we also have a language. But we had to struggle (i) --- (post-modify the verb) to establish the right of our language. Many (j) --- (pre-modify the noun) sons sacrificed their lives for the language.",
    answer: "(a) very; (b) in the morning; (c) waking; (d) to express; (e) to get/convey/exchange; (f) ever/always; (g) essential/integral; (h) independent; (i) hard; (j) valiant",
    board: 'Chattogram',
    year: 2019,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'very', hints: ['use an intensifier'], ruleId: 3 },
      { id: 'b', answer: 'in the morning', hints: ['post-modify the verb'], ruleId: 19 },
      { id: 'c', answer: 'waking', hints: ['pre-modify the noun'], ruleId: 9 },
      { id: 'd', answer: 'to express', hints: ['use an infinitive'], ruleId: 13 },
      { id: 'e', answer: 'to get/convey/exchange', hints: ['post-modify the verb with an infinitive'], ruleId: 13 },
      { id: 'f', answer: 'ever/always', hints: ['pre-modify the adjective'], ruleId: 6 },
      { id: 'g', answer: 'essential/integral', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'h', answer: 'independent', hints: ['pre-modify the noun'], ruleId: 1 },
      { id: 'i', answer: 'hard', hints: ['post-modify the verb'], ruleId: 17 },
      { id: 'j', answer: 'valiant', hints: ['pre-modify the noun'], ruleId: 1 }
    ]
  },
  {
    id: "sylhet-2019-1",
    topic: 'modifier',
    level: 'HSC',
    question: "A library is a (a) --- (pre-modify the noun) of knowledge. The students (b) --- (use a participle) to all classes visit it in their library periods. Our college library is housed in two rooms. (c) --- (pre-modify the noun) almirahs are placed in one room. The other room is the (d) --- (use a participle to modify the noun) room where magazines, journals and newspapers are placed. There are about five thousand books in our library which are arranged (e) --- (post-modify the verb). Any type of book can be traced in no time. The books cater to the needs and interests (f) --- (use a prepositional phrase). There are two separate sections in the library. One of them contains reference books like (g) --- (use nouns) etc. The other section contains books (h) --- (use prepositional phrase). Every student has a library (i) --- (use a noun). The reading room is always crowded (j) --- (post-modify the verb) in the afternoon.",
    answer: "(a) storehouse; (b) coming; (c) Some/Several; (d) reading; (e) systematically; (f) of the students/of the readers; (g) dictionaries/encyclopedias; (h) of academic categories; (i) card; (j) mainly/generally",
    board: 'Sylhet',
    year: 2019,
    difficulty: 'MEDIUM',
    blanks: [
      { id: 'a', answer: 'storehouse', hints: ['pre-modify the noun'], ruleId: 4 },
      { id: 'b', answer: 'coming', hints: ['use a participle'], ruleId: 9 },
      { id: 'c', answer: 'Some/Several', hints: ['pre-modify the noun'], ruleId: 11 },
      { id: 'd', answer: 'reading', hints: ['use a participle to modify the noun'], ruleId: 9 },
      { id: 'e', answer: 'systematically', hints: ['post-modify the verb'], ruleId: 17 },
      { id: 'f', answer: 'of the students/of the readers', hints: ['use a prepositional phrase'], ruleId: 19 },
      { id: 'g', answer: 'dictionaries/encyclopedias', hints: ['use nouns'], ruleId: 4 },
      { id: 'h', answer: 'of academic categories', hints: ['use prepositional phrase'], ruleId: 19 },
      { id: 'i', answer: 'card', hints: ['use a noun'], ruleId: 4 },
      { id: 'j', answer: 'mainly/generally', hints: ['post-modify the verb'], ruleId: 17 }
    ]
  }
];

export const modifierQuestionsMetadata = {
  lastUpdated: '2024-01-15',
  version: '2.0.0',
  totalQuestions: 16,
  yearRange: '2019-2023',
  boards: ['Dhaka', 'Rajshahi', 'Cumilla', 'Jashore', 'Sylhet', 'Barishal', 'Dinajpur', 'Mymensingh', 'Chattogram'],
  levels: ['HSC'],
  topics: ['modifier']
};