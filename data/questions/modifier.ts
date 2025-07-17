// Centralized Modifier Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

export interface ModifierQuestion {
  id: string;
  year?: number;
  board?: string;
  passage?: string;
  blanks?: { id: string; instruction: string; ruleId?: number; answer: string }[];
  ruleId?: number;
  question?: string;
}

export const modifierQuestions: ModifierQuestion[] = [
 {
    id: "dhaka-2016-modifier",
    year: 2016,
    board: "Dhaka Board",
    passage: "Rabindranath Tagore was a ___ poet of Bengali literature. He was born in a ___ family at Jarasanko, Kolkata. He went to school ___. He wrote his ___ verse at the age of eight. At the age of seventeen, he went to London ___ school there. He was put up in a lodging house under the care of a ___ coach, Mr Scott. He was lucky ___ an English family of Mr Scott. He also visited the House of Parliament ___ Gladstone and John Bright's debates on Irish rule. He wrote letters to Kolkata ___ English society. At this, his family thought that they might lose their son ___. So, he was called back to Kolkata.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "famous/great/renowned"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "rich/solvent"
      },
      {
        id: "c",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "early"
      },
      {
        id: "d",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "first"
      },
      {
        id: "e",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to attend"
      },
      {
        id: "f",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "professional"
      },
      {
        id: "g",
        instruction: "post-modify the adjective with an infinitive",
        ruleId: 12,
        answer: "enough to get/to have/to find"
      },
      {
        id: "h",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to listen to"
      },
      {
        id: "i",
        instruction: "post-modify the verb with a present participle",
        ruleId: 14,
        answer: "praising/admiring"
      },
      {
        id: "j",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "ultimately/forever"
      }
    ]
  },
  {
    id: "rajshahi-2016-modifier",
    year: 2016,
    board: "Rajshahi Board",
    passage: "It was a hot ___ day. A ___ crow flew all over the fields looking for water. For a long time, she could not find any water. She felt ___ weak, almost giving up hope. Suddenly, she saw a water jug below her. She flew ___ to see if there was any water inside. Yes, she could see some water inside the jug. The crow tried ___. Sadly, she found that the neck of the jug was too narrow. Then she tried to push the jug down for the water to flow out. But she found ___ jug too heavy. The Crow thought ___ what to do. ___, she saw some pebbles nearby. She ___ had a good idea. She started picking up the pebbles one by one, dropping each into the jug. As more and more pebbles filled the jug, the water level kept rising. Soon it was high ___ for the crow to drink. The crow quenched her thirst and flew away.",
    blanks: [
      {
        id: "a",
        instruction: "use a noun adjective to pre-modify the noun",
        ruleId: 4,
        answer: "summer"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "thirsty"
      },
      {
        id: "c",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "d",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "down"
      },
      {
        id: "e",
        instruction: "use an infinitive phrase to post-modify the verb",
        ruleId: 13,
        answer: "to drink water/to quench her thirst"
      },
      {
        id: "f",
        instruction: "use a demonstrative to pre-modify the noun",
        ruleId: 7,
        answer: "this/that"
      },
      {
        id: "g",
        instruction: "use a phrase to post-modify the verb",
        ruleId: 19,
        answer: "for a while"
      },
      {
        id: "h",
        instruction: "use a participle to pre-modify the verb",
        ruleId: 8,
        answer: "Looking around/Roaming around the field"
      },
      {
        id: "i",
        instruction: "pre-modify the verb",
        ruleId: 6,
        answer: "instantly/immediately"
      },
      {
        id: "j",
        instruction: "post-modify the adjective",
        ruleId: 16,
        answer: "enough"
      }
    ]
  },
  {
    id: "cumilla-2016-modifier",
    year: 2016,
    board: "Cumilla Board",
    passage: "I had a peculiar experience ___ while travelling to St. Martin's Island. visited the island along with my family. Zahid, ___, was our guide. On our way to the island, we watched ___ seagulls. The ___ birds were flying ___ with the ship. They became ___ dear and friendly to us. We entertained them with chips and biscuits. ___ them, we became ___ excited. We decided ___ in the idyllic island for a couple of days. We can never forget ___ lovely sea birds.",
    blanks: [
      {
        id: "a",
        instruction: "Post-modify the verb",
        ruleId: 16,
        answer: "last year"
      },
      {
        id: "b",
        instruction: "Post-modify the noun with an appositive",
        ruleId: 21,
        answer: "a local boy"
      },
      {
        id: "c",
        instruction: "use a determiner to pre-modify the noun",
        ruleId: 2,
        answer: "many"
      },
      {
        id: "d",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "sea"
      },
      {
        id: "e",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "along"
      },
      {
        id: "f",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "g",
        instruction: "use a present participle to pre-modify the verb",
        ruleId: 8,
        answer: "Feeding"
      },
      {
        id: "h",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "i",
        instruction: "use an infinitive phrase to post-modify the verb",
        ruleId: 13,
        answer: "to stay"
      },
      {
        id: "j",
        instruction: "use a demonstrative to pre-modify the adjective phrase",
        ruleId: 7,
        answer: "those"
      }
    ]
  },
  {
    id: "jashore-2016-modifier",
    year: 2016,
    board: "Jashore Board",
    passage: "Most of the people in ___ country do not know the importance of English. In fact, it is an ___ language and we are living in a ___ village. So, if you know English ___, you can communicate with ___ rest of the world. It is surely an important element of your ___ skill. Without the knowledge of English with proper understanding, you cannot complete ___ higher studies because most of the books are written in English in the process of higher education. Poor knowledge of English will also hamper your ___ development. In short, if you do not have a good command of English, you will suffer ___ of your life. So, don't waste your time and try to learn English ___ from today.",
    blanks: [
      {
        id: "a",
        instruction: "use possessive to pre-modify the noun",
        ruleId: 5,
        answer: "our"
      },
      {
        id: "b",
        instruction: "use an adjective to pre-modify the noun",
        ruleId: 1,
        answer: "international"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "global"
      },
      {
        id: "d",
        instruction: "post-modify the verb with an adverb",
        ruleId: 16,
        answer: "much/well"
      },
      {
        id: "e",
        instruction: "use the article to pre-modify the noun phrase",
        ruleId: 10,
        answer: "the"
      },
      {
        id: "f",
        instruction: "use a noun adjective to pre-modify the noun",
        ruleId: 4,
        answer: "language"
      },
      {
        id: "g",
        instruction: "use possessive to pre-modify the noun",
        ruleId: 5,
        answer: "your"
      },
      {
        id: "h",
        instruction: "use a noun-adjective",
        ruleId: 4,
        answer: "career"
      },
      {
        id: "i",
        instruction: "post-modify the verb with prepositional phrase/Adverbial",
        ruleId: 18,
        answer: "in the later part"
      },
      {
        id: "j",
        instruction: "post-modify the verb with an adverb",
        ruleId: 16,
        answer: "well/right"
      }
    ]
  },
  {
    id: "chattogram-2016-modifier",
    year: 2016,
    board: "Chattogram Board",
    passage: "Once there lived a ___ fox in a jungle. One day, while he was walking ___ through the jungle, he fell into a trap and lost his tail. He felt ___ unhappy and sad. But the fox was very cunning. He hit upon a plan. He invited all the foxes ___ to a meeting. When all the foxes arrived, the fox without a tail said, \"My dear friends, listen to me, please, I have discovered a ___ thing. It is that our tails are ___ useless. They look ugly and dirty. So, we all should cut off our tails, shouldn't we?\" All foxes listened to the cunning fox ___. Most of them agreed ___ their tails. But an old and ___ fox said to him, \"My friend, your plan is nice but evil. Actually, you want to cut off our tails because you have ___ tail of your own.\"",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify noun",
        ruleId: 1,
        answer: "clever/cunning"
      },
      {
        id: "b",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "alone"
      },
      {
        id: "c",
        instruction: "pre-modify the adjective",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "d",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to come"
      },
      {
        id: "e",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "significant/wonderful"
      },
      {
        id: "f",
        instruction: "pre-modify the adjective",
        ruleId: 3,
        answer: "really/quite"
      },
      {
        id: "g",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "attentively"
      },
      {
        id: "h",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to cut off"
      },
      {
        id: "i",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "wise"
      },
      {
        id: "j",
        instruction: "pre-modify the noun with a determiner",
        ruleId: 2,
        answer: "no"
      }
    ]
  },
  {
    id: "sylhet-2016-modifier",
    year: 2016,
    board: "Sylhet Board",
    passage: "Othello, ___, had risen to become a general. He had shown his bravery in many ___ battles against the Turks. Everyone praised him ___ and the senate trusted and honoured him. Brabantio, a rich senator of Venice had a daughter named Desdemona ___. Brabantio ___ invited Othello to his house where he and his daughter listened in wonder to Othello as he spoke about his adventures. He told them of deserts, of caves and of mountains high ___ to touch the sky. Desdemona had to weep ___ and she never became tired of listening to it. She pitied Othello ___ for the misfortunes and hardships of his life. Her pity ___ turned to love. She refused all the young men ___ because she loved Othello, a noble Muslim Moor from North Africa.",
    blanks: [
      {
        id: "a",
        instruction: "use an appositive to post-modify the noun",
        ruleId: 21,
        answer: "a noble Muslim Moor"
      },
      {
        id: "b",
        instruction: "use an adjective to pre-modify the noun",
        ruleId: 1,
        answer: "fierce"
      },
      {
        id: "c",
        instruction: "use an adverb to post-modify the verb",
        ruleId: 16,
        answer: "highly"
      },
      {
        id: "d",
        instruction: "use a relative clause to post-modify the noun",
        ruleId: 20,
        answer: "who was very beautiful and intelligent"
      },
      {
        id: "e",
        instruction: "use an adverb to pre-modify the verb",
        ruleId: 6,
        answer: "often"
      },
      {
        id: "f",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "enough"
      },
      {
        id: "g",
        instruction: "use a present participle to post-modify the verb phrase",
        ruleId: 15,
        answer: "hearing his adventure/listening to his stories"
      },
      {
        id: "h",
        instruction: "use an adverb to post-modify the verb",
        ruleId: 16,
        answer: "much/greatly"
      },
      {
        id: "i",
        instruction: "use an adverb to post-modify the verb",
        ruleId: 16,
        answer: "finally/soon/ultimately"
      },
      {
        id: "j",
        instruction: "use an infinitive to post-modify the verb",
        ruleId: 12,
        answer: "to marry"
      }
    ]
  },
  {
    id: "dinajpur-2016-modifier",
    year: 2016,
    board: "Dinajpur Board",
    passage: "Water is a ___ substance. It has no colour of ___ own. The ___ name of water is life. By drinking water, we can quench ___ thirst. Thus we can survive on earth. But ___ water is life killing. By drinking contaminated water, we suffer from diseases like diarrhoea, typhoid etc. We may ___ face ___ death by drinking such type of water. We are responsible for ___ pollution. Waste materials from mills and factories are thrown here and there. Farmers use fertilizers and insecticides on their land. During the rainy season, they are mixed with ponds and rivers. Besides, latrines ___ on ponds and rivers cause water pollution. ___ awareness should be raised to stop water pollution.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "liquid"
      },
      {
        id: "b",
        instruction: "possessive to pre modify",
        ruleId: 5,
        answer: "its"
      },
      {
        id: "c",
        instruction: "determiner to pre-modify the noun",
        ruleId: 2,
        answer: "other"
      },
      {
        id: "d",
        instruction: "possessive to pre-modify the noun",
        ruleId: 5,
        answer: "our"
      },
      {
        id: "e",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "impure/contaminated"
      },
      {
        id: "f",
        instruction: "pre-modify the verb",
        ruleId: 6,
        answer: "even"
      },
      {
        id: "g",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "unexpected/sudden"
      },
      {
        id: "h",
        instruction: "noun adjective to pre modify the noun",
        ruleId: 4,
        answer: "water"
      },
      {
        id: "i",
        instruction: "participle to post-modify the noun",
        ruleId: 9,
        answer: "built/standing"
      },
      {
        id: "j",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "Public/Social"
      }
    ]
  }
  // ADD MORE QUESTIONS HERE - copy from components/questions/ModifierQuestionsPage.tsx
  // Just follow the same structure as above
];