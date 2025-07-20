// Centralized Transformation Grammar Rules Data

export interface TransformationRule {
  id: number;
  ruleNo: string;
  title: string;
  bengali: string;
  description: string;
  structures: string[];
  examples: string[];
  category: 'simple-complex-compound' | 'affirmative-negative' | 'assertive-interrogative' | 'assertive-exclamatory' | 'assertive-imperative' | 'degree';
}

export const transformationRules: TransformationRule[] = [
  // Simple - Complex - Compound Rules
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Verb + ing / Being + Past Participle",
    bengali: "ক্রিয়া + ing / Being + Past Participle",
    description: "Transform sentences using participles, subordinating conjunctions, and coordinating conjunctions",
    structures: [
      "Simple: Verb + ing → Being fired, she cried.",
      "Complex: since/as → As she was fired, she cried.",
      "Compound: And/so → She was fired and so she cried."
    ],
    examples: [
      "Simple: Being honest, he is loved by all.",
      "Complex: Since he is honest, he is loved by all.",
      "Compound: He is honest and so he is loved by all."
    ],
    category: 'simple-complex-compound'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "To + Non-finite Verb (Purpose)",
    bengali: "To + অসমাপিকা ক্রিয়া (উদ্দেশ্য)",
    description: "Transform sentences expressing purpose using infinitives, purpose clauses, and coordinating conjunctions",
    structures: [
      "Simple: To + non-finite verb → He came to meet me.",
      "Complex: So that → He came so that he could meet me.",
      "Compound: And/or → He came and [he] met me."
    ],
    examples: [
      "Simple: He went to market to buy vegetables.",
      "Complex: He went to market so that he could buy vegetables.",
      "Compound: He went to market and bought vegetables."
    ],
    category: 'simple-complex-compound'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "In spite of / Despite (Contrast)",
    bengali: "In spite of / Despite (বিপরীত)",
    description: "Transform sentences expressing contrast using prepositions, subordinating conjunctions, and coordinating conjunctions",
    structures: [
      "Simple: In spite of/despite → In spite of being healthy, he is lazy",
      "Complex: Though/although → Though he is healthy, he is lazy",
      "Compound: but → He is healthy but lazy"
    ],
    examples: [
      "Simple: Despite his illness, he attended the meeting.",
      "Complex: Although he was ill, he attended the meeting.",
      "Compound: He was ill but he attended the meeting."
    ],
    category: 'simple-complex-compound'
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Enough / Too... to (Degree of Ability)",
    bengali: "Enough / Too... to (সামর্থ্যের মাত্রা)",
    description: "Transform sentences expressing degree of ability using infinitives, result clauses, and coordinating conjunctions",
    structures: [
      "Simple: Enough/too… to → She was too tired to move",
      "Complex: So…..that [neg] → She was so weak that she could not move",
      "Compound: Very…..and → She was very weak and she could not move"
    ],
    examples: [
      "Simple: He is too weak to walk.",
      "Complex: He is so weak that he cannot walk.",
      "Compound: He is very weak and cannot walk."
    ],
    category: 'simple-complex-compound'
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Without (Condition)",
    bengali: "Without (শর্ত)",
    description: "Transform sentences expressing negative conditions using prepositions, conditional clauses, and coordinating conjunctions",
    structures: [
      "Simple: Without → Without working hard, you will fail",
      "Complex: If/in case → If you don't work hard, you will fail",
      "Compound: or → Work hard or you will fail"
    ],
    examples: [
      "Simple: Without studying, you cannot pass.",
      "Complex: If you don't study, you cannot pass.",
      "Compound: Study or you cannot pass."
    ],
    category: 'simple-complex-compound'
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Adjective (Description)",
    bengali: "বিশেষণ (বর্ণনা)",
    description: "Transform sentences with adjectives using relative clauses and coordinating conjunctions",
    structures: [
      "Simple: Adjective → It was a nice dress",
      "Complex: that/which → It was a dress that was nice",
      "Compound: And → It was a dress and it was nice"
    ],
    examples: [
      "Simple: He is a good student.",
      "Complex: He is a student who is good.",
      "Compound: He is a student and he is good."
    ],
    category: 'simple-complex-compound'
  },

  // Affirmative - Negative Rules
  {
    id: 7,
    ruleNo: "Rule 7",
    title: "Only → None but / Nothing but",
    bengali: "Only → None but / Nothing but",
    description: "Transform affirmative sentences with 'only' to negative using 'none but' or 'nothing but'",
    structures: [
      "Affirmative: only → It was only a dress",
      "Negative: none but / nothing but / not more than → It was nothing but a dress"
    ],
    examples: [
      "Affirmative: Only Allah can help us.",
      "Negative: None but Allah can help us.",
      "Affirmative: It was only a mistake.",
      "Negative: It was nothing but a mistake."
    ],
    category: 'affirmative-negative'
  },
  {
    id: 8,
    ruleNo: "Rule 8",
    title: "Few → Not many",
    bengali: "Few → Not many",
    description: "Transform affirmative sentences with 'few' to negative using 'not many'",
    structures: [
      "Affirmative: few → I have a few friends",
      "Negative: not many → I do not have many friends"
    ],
    examples: [
      "Affirmative: I have a few books.",
      "Negative: I do not have many books.",
      "Affirmative: Few students were present.",
      "Negative: Not many students were present."
    ],
    category: 'affirmative-negative'
  },
  {
    id: 9,
    ruleNo: "Rule 9",
    title: "Must / Have to → Cannot but / Cannot help",
    bengali: "Must / Have to → Cannot but / Cannot help",
    description: "Transform affirmative sentences with obligation to negative using 'cannot but' or 'cannot help'",
    structures: [
      "Affirmative: bound/can/have to/must → He must give me thanks",
      "Negative: cannot but / cannot help → He cannot help giving me thanks"
    ],
    examples: [
      "Affirmative: I must go there.",
      "Negative: I cannot but go there.",
      "Affirmative: He has to admit his fault.",
      "Negative: He cannot help admitting his fault."
    ],
    category: 'affirmative-negative'
  },
  {
    id: 10,
    ruleNo: "Rule 10",
    title: "Both... and → Not only... but also",
    bengali: "Both... and → Not only... but also",
    description: "Transform affirmative sentences with 'both...and' to negative using 'not only...but also'",
    structures: [
      "Affirmative: and / both… and → Both Karim and Kamal can...",
      "Negative: not only… but also → Not only Karim but also Kamal..."
    ],
    examples: [
      "Affirmative: Both he and his brother are intelligent.",
      "Negative: Not only he but also his brother is intelligent.",
      "Affirmative: She can both sing and dance.",
      "Negative: She can not only sing but also dance."
    ],
    category: 'affirmative-negative'
  },
  {
    id: 11,
    ruleNo: "Rule 11",
    title: "Every → No... but / There is no",
    bengali: "Every → No... but / There is no",
    description: "Transform affirmative sentences with 'every' to negative using 'no...but' or 'there is no'",
    structures: [
      "Affirmative: every → Every mother loves her child",
      "Negative: there is no… but / no → No mother hates her child"
    ],
    examples: [
      "Affirmative: Every student should study hard.",
      "Negative: There is no student but should study hard.",
      "Affirmative: Every man must die.",
      "Negative: No man can escape death."
    ],
    category: 'affirmative-negative'
  },
  {
    id: 12,
    ruleNo: "Rule 12",
    title: "Always → Never",
    bengali: "Always → Never",
    description: "Transform affirmative sentences with 'always' to negative using 'never' with opposite meaning",
    structures: [
      "Affirmative: always → I will always remember you",
      "Negative: never → I will never forget you"
    ],
    examples: [
      "Affirmative: He always speaks the truth.",
      "Negative: He never tells a lie.",
      "Affirmative: She always helps others.",
      "Negative: She never refuses to help others."
    ],
    category: 'affirmative-negative'
  },
  {
    id: 13,
    ruleNo: "Rule 13",
    title: "As soon as → No sooner had",
    bengali: "As soon as → No sooner had",
    description: "Transform affirmative sentences with 'as soon as' to negative using 'no sooner had'",
    structures: [
      "Affirmative: as soon as → As soon as he entered...",
      "Negative: no sooner had → No sooner had he entered..."
    ],
    examples: [
      "Affirmative: As soon as he saw me, he ran away.",
      "Negative: No sooner had he seen me than he ran away.",
      "Affirmative: As soon as the teacher entered, the students became quiet.",
      "Negative: No sooner had the teacher entered than the students became quiet."
    ],
    category: 'affirmative-negative'
  },

  // Assertive to Interrogative Rules
  {
    id: 14,
    ruleNo: "Rule 14",
    title: "Affirmative Assertive → Negative Interrogative",
    bengali: "ইতিবাচক বর্ণনামূলক → নেতিবাচক প্রশ্নবোধক",
    description: "Transform affirmative assertive sentences to negative interrogative sentences",
    structures: [
      "If the sentence is affirmative, change into negative interrogative",
      "Assertive: He is a good boy → Interrogative: Is he not a good boy?"
    ],
    examples: [
      "Assertive: You are very intelligent.",
      "Interrogative: Are you not very intelligent?",
      "Assertive: This is a beautiful place.",
      "Interrogative: Is this not a beautiful place?"
    ],
    category: 'assertive-interrogative'
  },
  {
    id: 15,
    ruleNo: "Rule 15",
    title: "Negative Assertive → Affirmative Interrogative",
    bengali: "নেতিবাচক বর্ণনামূলক → ইতিবাচক প্রশ্নবোধক",
    description: "Transform negative assertive sentences to affirmative interrogative sentences",
    structures: [
      "If the sentence is negative, change into affirmative/bare interrogative",
      "Assertive: He never cooks food → Interrogative: Does he ever cook food?"
    ],
    examples: [
      "Assertive: He never tells a lie.",
      "Interrogative: Does he ever tell a lie?",
      "Assertive: Nobody can solve this problem.",
      "Interrogative: Can anybody solve this problem?"
    ],
    category: 'assertive-interrogative'
  },

  // Assertive to Exclamatory Rules
  {
    id: 16,
    ruleNo: "Rule 16",
    title: "Article + Adjective → What + Article + Adjective",
    bengali: "Article + Adjective → What + Article + Adjective",
    description: "Transform assertive sentences with article before adjective to exclamatory using 'What'",
    structures: [
      "If there's an article (a/an) before adjective → use 'What' to begin exclamatory",
      "Assertive: You are a great fool → Exclamatory: What a great fool you are!"
    ],
    examples: [
      "Assertive: It is a beautiful flower.",
      "Exclamatory: What a beautiful flower it is!",
      "Assertive: She is a clever girl.",
      "Exclamatory: What a clever girl she is!"
    ],
    category: 'assertive-exclamatory'
  },
  {
    id: 17,
    ruleNo: "Rule 17",
    title: "Wish Sentences → If Sentences",
    bengali: "ইচ্ছা বাক্য → If বাক্য",
    description: "Transform wish sentences to exclamatory using 'If'",
    structures: [
      "Assertive: I wish I had so much money → Exclamatory: If I had so much money!",
      "Assertive: I wish I were a king → Exclamatory: If I were a king!"
    ],
    examples: [
      "Assertive: I wish I could fly.",
      "Exclamatory: If I could fly!",
      "Assertive: I wish I were rich.",
      "Exclamatory: If I were rich!"
    ],
    category: 'assertive-exclamatory'
  },
  {
    id: 18,
    ruleNo: "Rule 18",
    title: "Regret Sentences → Alas!",
    bengali: "দুঃখ বাক্য → Alas!",
    description: "Transform regret sentences to exclamatory using 'Alas!'",
    structures: [
      "Assertive: I regret the man is dead → Exclamatory: Alas! The man is dead"
    ],
    examples: [
      "Assertive: I regret that he failed.",
      "Exclamatory: Alas! He failed.",
      "Assertive: It is sad that she is no more.",
      "Exclamatory: Alas! She is no more."
    ],
    category: 'assertive-exclamatory'
  },

  // Assertive to Imperative Rules
  {
    id: 19,
    ruleNo: "Rule 19",
    title: "Should → Direct Command",
    bengali: "Should → সরাসরি আদেশ",
    description: "Transform assertive sentences with 'should' to imperative commands",
    structures: [
      "Assertive: You should do your homework → Imperative: Do your homework",
      "Assertive: You should not tell a lie → Imperative: Do not tell a lie"
    ],
    examples: [
      "Assertive: You should study hard.",
      "Imperative: Study hard.",
      "Assertive: You should not waste time.",
      "Imperative: Do not waste time."
    ],
    category: 'assertive-imperative'
  },
  {
    id: 20,
    ruleNo: "Rule 20",
    title: "Request → Please",
    bengali: "অনুরোধ → Please",
    description: "Transform assertive request sentences to imperative using 'Please'",
    structures: [
      "Assertive: You are requested to come early → Imperative: Please come early"
    ],
    examples: [
      "Assertive: You are requested to help me.",
      "Imperative: Please help me.",
      "Assertive: You are advised to be careful.",
      "Imperative: Please be careful."
    ],
    category: 'assertive-imperative'
  },

  // Degree Transformation Rules
  {
    id: 21,
    ruleNo: "Rule 21",
    title: "Superlative Degree Transformation",
    bengali: "উত্তম মাত্রার রূপান্তর",
    description: "Transform between positive, comparative, and superlative degrees for superlative meaning",
    structures: [
      "Positive: No other metal is as useful as iron",
      "Comparative: Iron is more useful than any other metals",
      "Superlative: Iron is the most useful of all the metals"
    ],
    examples: [
      "Positive: No other boy in the class is as tall as Rahim.",
      "Comparative: Rahim is taller than any other boy in the class.",
      "Superlative: Rahim is the tallest boy in the class."
    ],
    category: 'degree'
  },
  {
    id: 22,
    ruleNo: "Rule 22",
    title: "Comparative Degree Transformation",
    bengali: "তুলনামূলক মাত্রার রূপান্তর",
    description: "Transform between positive, comparative, and superlative degrees for comparative meaning",
    structures: [
      "Positive: Very few boys are as humble as Zamil",
      "Comparative: Zamil is more humble than most other boys",
      "Superlative: Zamil is one of the most humble boys"
    ],
    examples: [
      "Positive: Very few cities are as beautiful as Dhaka.",
      "Comparative: Dhaka is more beautiful than most other cities.",
      "Superlative: Dhaka is one of the most beautiful cities."
    ],
    category: 'degree'
  }
];


//
expert mode will enable the only table mode of only main thing which will be change.

  # Transformation of Sentences

## Affirmative to Negative / Negative to Affirmative

| **Affirmative** | **Negative** | **Example** |
|-----------------|--------------|-------------|
| **Only/Alone (person)** | **None but** | **A:** Allah can alone help us.<br>**N:** None but Allah can help us.<br>**A:** Only the brave deserve the fair.<br>**N:** None but the brave deserve the fair. |
| **Only/Alone (object)** | **Nothing but** | **A:** Only the moon was visible.<br>**N:** Nothing but the moon was visible.<br>**A:** Only the soup was tasty.<br>**N:** Nothing but the soup was tasty. |
| **Must / have to / has to** | **Cannot but + verb in base form** | **A:** Man must submit to destiny.<br>**N:** Man cannot but submit to destiny.<br>**A:** He has to go there.<br>**N:** He cannot but go there. |
| **Must / have to / has to** | **Cannot help + (verb + ing)** | **A:** Man must submit to destiny.<br>**N:** Man cannot help submitting to destiny.<br>**A:** He has to go there.<br>**N:** He cannot help going there. |
| **Only/Alone (number/age)** | **Not more than / Not less than** | **A:** He is only thirteen.<br>**N:** He is not more than thirteen.<br>**A:** She has only two dolls.<br>**N:** She has not more than two dolls. |
| **Could / Had to** | **Could not but + Verb**<br>**Could not help + (Verb + ing)** | **A:** He had to go there.<br>**N:** I could not but go there.<br>**A:** I could laugh.<br>**N:** I could not help laughing. |
| **Both...and / And** | **Not only...but also** | **A:** Both Jony and Jhihad can do the work.<br>**N:** Not only Jony but also Jhihad can do the work.<br>**A:** He ate eggs and vegetables.<br>**N:** He ate not only eggs but also vegetables. |
| **Every / All / A... + Verb** | **There is no...but**<br>**There is no...who + Neg.**<br>**No / Nobody / No one... + Opposite Verb** | **A:** Every mother loves her child.<br>**N:** There is no mother but loves her child.<br>**A:** A patriot loves his country.<br>**N:** There is no patriot who does not love his country.<br>**A:** All loves flowers.<br>**N:** Nobody hates flowers. |
| **Always** | **Never + Opposite Word** | **A:** They always remember us.<br>**N:** They never forget us.<br>**A:** Always speak the truth.<br>**N:** Never tell a lie.<br>**A:** I am always against smoking.<br>**N:** I am never in favour of smoking. |
| **As soon as** | **No sooner had...than** | **A:** As soon as the thief saw the police, he ran away.<br>**N:** No sooner had the thief seen the police than he ran away. |
| **Superlative Degree** | **Positive Degree** | **A:** Mount Everest is the highest peak of the world.<br>**N:** No other peak of the world is so high as the Mount Everest. |
| **too...to** | **so...that** | **A:** He is too weak to walk.<br>**N:** He is so weak that he cannot walk. |
| **very / Very much** | **Neg. + at all** | **A:** He likes me very much.<br>**N:** He doesn’t dislike me at all. |

## Assertive to Exclamatory

| **Rule** | **Examples** |
|----------|--------------|
| **‘What’ is used for ‘Article’ (a/an) used before Adjective** | **Asser:** It is a good news.<br>**Excl:** What a good news! |
| **‘How’ is used for ‘Very’ used before Adjective** | **Asser:** The place is very enchanting.<br>**Excl:** How enchanting the place is! |

## Voice Change

### Active to Passive
**Rule:** Object ব্যাটা Subject হয়ে হি হি করে হাসে  
Nominative লজ্জা পেয়ে by এর পরে বসে।  
Main Verb এর Past Participle হয়  
তার আগে জুড়ে বসে Auxiliary মহাশয়।  

| **Active** | **Passive** |
|------------|-------------|
| Dowry hampers the peace of the society. | The peace of the society is hampered by dowry. |
| His mother asked him for a glass of water. | He was asked for a glass of water by his mother. |

### Passive to Active

| **Passive** | **Active** |
|-------------|------------|
| It is known as an industrious creature. | People/we know it as an industrious creature. |
| He was called wise Solomon. | People called him wise Solomon. |

## Simple – Complex – Compound

| **Simple** | **Complex** | **Compound** |
|------------|-------------|--------------|
| **Without + (Verb + ing)**<br>Without studying hard, you will fail. | **Negative If Clause / Unless**<br>If you do not study hard, you will fail. | **Or**<br>Study hard or you will fail. |
| **By + (verb + ing)**<br>By eating a balanced diet you can keep fit. | **Affirmative If Clause**<br>If you eat a balanced diet, you can keep fit. | **And**<br>Eat a balanced diet and keep fit. |
| **Despite / In spite of**<br>In spite of his poverty, he is honest. | **Though / Although**<br>Though/Although he is poor, he is honest. | **But**<br>He is poor but honest. |
| **Present Participle (same subject)**<br>Going to his office, we found him absent. | **When / As / Since**<br>When we went to his office, we found him absent. | **And**<br>We went to his office and we found him absent. |
| **Participle (Verb + ing)**<br>Some people working in the field are farmers. | **Relative Pronoun (who, which, that)**<br>Some people who are working in the field are farmers. | **And**<br>Some people are working in the field and they are farmers. |
| **At the time of**<br>At the time of his waking up, it was raining. | **When / As / Since**<br>When he woke up, it was raining. | **Subject … and**<br>He woke up and it was raining. |
| **too...to**<br>He is too honest to accept bribe. | **So…that**<br>He is so honest that he can’t accept bribe. | **Very … and**<br>He is very honest and he can’t accept bribe. |
| **too… + for + object + to**<br>The load is too heavy for the porter to lift. | **So…that**<br>The load is so heavy that the porter cannot lift. | **Very … and**<br>The load is very heavy and the porter cannot lift. |
| **to + Verb / In order to + verb**<br>He studied hard to pass in the exam. | **So that … can / could …**<br>He studied hard so that he could pass in the exam. | **And … want to / wanted to**<br>He studied hard and wanted to pass in the exam. |
| **Besides + (v + ing)**<br>Besides giving him money, I gave good advice. | **When / As / Since**<br>When I gave him money, I gave him good advice. | **Not only … but also**<br>I gave him not only money but also good advice. |
| **Because of**<br>Because of his illness, he was absent in the meeting. | **As / Since**<br>Since he was ill, he was absent in the meeting. | **And**<br>He was ill, and absent in the meeting. |
| **As soon as**<br>As soon as we reached the stadium, the game began. | **No sooner…than / Hardly … when / Scarcely … when**<br>No sooner had we reached the stadium than the game began. | **And**<br>We reached the stadium and the game began. |
| **Sub + verb + Noun / Adj. / Adv.**<br>Health is wealth. | **Relative Pronoun (that)**<br>It is health which is wealth. | **And**<br>It is health and that is wealth. |
| **Participle (cause & effect)**<br>Being sick, he could not attend the class. | **As / Since / Because**<br>Since he was sick, he could not attend the class. | **And / So**<br>He was sick, so he could not attend the class. |
| **Appositive**<br>Water, one of the important elements of the environment, is polluted in many ways. | **Relative pronoun**<br>Water which is one of the important elements of the environment is polluted in many ways. | **And**<br>Water is one of the important elements of the environment and it is polluted in many ways. |
| **Adjective**<br>An industrious boy is sure to prosper. | **Relative pronoun**<br>The boy who is industrious is sure to prosper. | **And**<br>The boy is industrious and sure to prosper. |

## Positive Degree – Comparative Degree – Superlative Degree

| **Positive Degree** | **Comparative Degree** | **Superlative Degree** |
|--------------------|-----------------------|-------------------------|
| **No other…**<br>No other boy in the class is as good as Tuhin. | **than any other**<br>Tuhin is better than any other boy in the class. | **The + superlative degree**<br>Tuhin is the best boy in the class. |
| **Very few…**<br>Very few girls in the class are as beautiful as she. | **than most other / all other**<br>She is more beautiful than most other girls in the class. | **One of the**<br>She is one of the most beautiful girls in the class. |
| a) Chattogram is not as big as Dhaka.<br>b) She is as good as her brother. | a) Dhaka is bigger than Chattogram.<br>b) She is not better than her brother.<br>or<br>Her brother is not better than she. | |