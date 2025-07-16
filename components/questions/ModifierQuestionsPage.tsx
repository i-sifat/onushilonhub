'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Blank {
  id: string;
  instruction: string;
  ruleId?: number;
  answer: string;
}

interface Question {
  id: string;
  year: number;
  board: string;
  passage: string;
  blanks: Blank[];
}

const allQuestions: Question[] = [
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
    id: "dhaka-2017-modifier",
    year: 2017,
    board: "Dhaka Board",
    passage: "Deforestation means cutting down of trees ___. To meet up the basic needs of food and housing, trees are being cut in large scale and thus it causes ___ imbalance. Besides, there are some dishonest people who cut trees in our forest ___. The ___ level is rising and many parts of the world are going to be engulfed by the sea in near future. New areas of the world are ___ turned into desert as a result of deforestation. So, we must stop ___ down trees unnecessarily. ___ trees indiscriminately will be hazardous for our future existence. If we destroy trees ___ one day the country will turn into a great dessert. The ___ temperature will cause the greenhouse effect. Necessary measures should be taken ___.",
    blanks: [
      {
        id: "a",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "indiscriminately"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "ecological/environmental"
      },
      {
        id: "c",
        instruction: "use an infinitive phrase to post-modify the verb",
        ruleId: 13,
        answer: "to earn their livelihood/to earn money"
      },
      {
        id: "d",
        instruction: "use a noun adjective to pre-modify the noun",
        ruleId: 4,
        answer: "sea/water"
      },
      {
        id: "e",
        instruction: "use a participle to pre-modify the verb",
        ruleId: 8,
        answer: "being"
      },
      {
        id: "f",
        instruction: "use a participle to post-modify the verb",
        ruleId: 14,
        answer: "cutting"
      },
      {
        id: "g",
        instruction: "use a participle to pre-modify the noun",
        ruleId: 9,
        answer: "cutting"
      },
      {
        id: "h",
        instruction: "use an adverbial phrase to post-modify the verb",
        ruleId: 17,
        answer: "in an indiscriminate way"
      },
      {
        id: "i",
        instruction: "use a participle to pre-modify the noun",
        ruleId: 9,
        answer: "rising"
      },
      {
        id: "j",
        instruction: "use an infinitive phrase to post-modify the verb",
        ruleId: 13,
        answer: "to stop deforestation"
      }
    ]
  },
  {
    id: "rajshahi-2017-modifier",
    year: 2017,
    board: "Rajshahi Board",
    passage: "Ayesha Begum has three sons and two daughters. Her husband was a ___ farmer who used ___ on other people's land. With great effort, they married ___ daughters off by the time they reached teenage. The sons also started ___ with their father as ___ labourers when they were old enough to help. By the time they were seventeen, they left for towns ___ money. At first, they used to send money to their parents ___ but after getting married they barely had enough to support their ___ families. Out of desperation; Ayesha Begum started ___ in the village to feed her old, ___ husband and herself.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "landless"
      },
      {
        id: "b",
        instruction: "post-modify the verb by using infinitive",
        ruleId: 12,
        answer: "to work"
      },
      {
        id: "c",
        instruction: "use a pronoun",
        ruleId: 5,
        answer: "their"
      },
      {
        id: "d",
        instruction: "use a present participle to modify the verb",
        ruleId: 14,
        answer: "working"
      },
      {
        id: "e",
        instruction: "pre-modify the noun",
        ruleId: 4,
        answer: "day"
      },
      {
        id: "f",
        instruction: "use the infinitive to post-modify the verb",
        ruleId: 12,
        answer: "to earn"
      },
      {
        id: "g",
        instruction: "use an adverb to post-modify the verb",
        ruleId: 16,
        answer: "occasionally"
      },
      {
        id: "h",
        instruction: "pre-modify the noun",
        ruleId: 5,
        answer: "own"
      },
      {
        id: "i",
        instruction: "post-modify the verb",
        ruleId: 14,
        answer: "begging"
      },
      {
        id: "j",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "invalid"
      }
    ]
  },
  {
    id: "cumilla-2017-modifier",
    year: 2017,
    board: "Cumilla Board",
    passage: "A balanced diet is a good mixture of ___ foods. It is essential for us ___ a healthy life. There are many benefits of eating a ___ diet because it prevents ___ diseases. As a result we do not get sick ___. We should select ___ diet according to our needs. We should not eat the ___ foods for the whole week. We can keep fit ___ a balanced diet. But it is not easy ___ a balanced diet. Here ___ nutritionist can help us.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "good/various"
      },
      {
        id: "b",
        instruction: "post-modify the adjective with an infinitive",
        ruleId: 12,
        answer: "to lead/to maintain"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "balanced"
      },
      {
        id: "d",
        instruction: "use determiner to pre-modify the noun",
        ruleId: 2,
        answer: "many"
      },
      {
        id: "e",
        instruction: "post-modify the verb with an adverb",
        ruleId: 16,
        answer: "easily/frequently"
      },
      {
        id: "f",
        instruction: "pre-modify the noun with possessive",
        ruleId: 5,
        answer: "our"
      },
      {
        id: "g",
        instruction: "use adjective to pre-modify the noun",
        ruleId: 1,
        answer: "same"
      },
      {
        id: "h",
        instruction: "use a participle",
        ruleId: 14,
        answer: "eating/taking"
      },
      {
        id: "i",
        instruction: "post-modify the adjective with an infinitive",
        ruleId: 12,
        answer: "to choose/select/combine"
      },
      {
        id: "j",
        instruction: "use a determiner",
        ruleId: 2,
        answer: "a"
      }
    ]
  },
  {
    id: "jashore-2017-modifier",
    year: 2017,
    board: "Jashore Board",
    passage: "A village doctor is a very ___ person in the rural areas of Bangladesh. He is ___ known as quack. A village doctor is not a ___ doctor. He usually sits in a small dispensary ___. He treats the patients ___. A village doctor is not a ___ man. His chamber is ___ furnished. He cannot supply costly medicine to ___ patients. In our country, the number of qualified doctors is ___ few. So, a village doctor is a great friend to the ___ villagers.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "familiar/common"
      },
      {
        id: "b",
        instruction: "pre-modify the verb",
        ruleId: 6,
        answer: "usually/commonly"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "skilled/qualified"
      },
      {
        id: "d",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "everyday/regularly"
      },
      {
        id: "e",
        instruction: "use a participle phrase to post-modify the verb",
        ruleId: 15,
        answer: "taking small money"
      },
      {
        id: "f",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "rich/wealthy"
      },
      {
        id: "g",
        instruction: "pre-modify the verb",
        ruleId: 6,
        answer: "not/poorly"
      },
      {
        id: "h",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "critical/poor"
      },
      {
        id: "i",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "very/quite"
      },
      {
        id: "j",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "poor"
      }
    ]
  },
  {
    id: "chattogram-2017-modifier",
    year: 2017,
    board: "Chattogram Board",
    passage: "The people of Bangladesh have expressed their shock ___ at the reaction of the Pakistan Parliament. Pakistan strongly protested the execution of two ___ collaborators who committed crimes against humanity on their own people in 1971. There is a demand for an apology from ___ government for the crimes of its army during the liberation war of Bangladesh. Recently Pakistan's National Assembly may be within its rights ___ for the execution of two collaborators. But it is quite clear to us that Pakistan always tries to erase its past history. To erase ___ history is not easy because history continues to follow all of us. Pakistan, ___, cannot come out of its military influence. As a result, the country has become ___ barbarous. So, Pakistan is going down ___. The founder of Pakistan Mr Jinnah was physically ___ weak and so, the state always tried to show its physical strength since ___ birth.",
    blanks: [
      {
        id: "a",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "strongly/deeply"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "notorious/ignoble"
      },
      {
        id: "c",
        instruction: "use a noun adjective to pre-modify the noun",
        ruleId: 4,
        answer: "Pakistan"
      },
      {
        id: "d",
        instruction: "use an infinitive phrase to post-modify the verb",
        ruleId: 13,
        answer: "to blame/to condemn"
      },
      {
        id: "e",
        instruction: "use a demonstrative to pre-modify the noun",
        ruleId: 7,
        answer: "this/that"
      },
      {
        id: "f",
        instruction: "post-modify the noun with an appositive",
        ruleId: 21,
        answer: "the mostly military ruled country"
      },
      {
        id: "g",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "so/very"
      },
      {
        id: "h",
        instruction: "use an adverb to post-modify the verb",
        ruleId: 16,
        answer: "gradually/slowly"
      },
      {
        id: "i",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "j",
        instruction: "use a possessive to pre-modify the noun",
        ruleId: 5,
        answer: "its"
      }
    ]
  },
  {
    id: "barishal-2017-modifier",
    year: 2017,
    board: "Barishal Board",
    passage: "Raja, ___, is known to his classmates as a good student. He has ___ good qualities. He knows that the ___ duty of a student is to study and he never neglects ___ duty. He prepares ___ lessons regularly. He maintains discipline. He knows the value of time. He gets up ___ so that he can get enough time to study. He goes to school ___. He never wastes a ___ moment in vain. Raja is ___ gentle. He always obeys his parents and teachers. He never mixes with ___ boys. A student like Raja is a great asset of a nation.",
    blanks: [
      {
        id: "a",
        instruction: "post-modify the noun with an appositive",
        ruleId: 21,
        answer: "a school boy"
      },
      {
        id: "b",
        instruction: "use a quantifier to pre-modify the noun",
        ruleId: 11,
        answer: "some/many"
      },
      {
        id: "c",
        instruction: "use an adjective to pre-modify the noun",
        ruleId: 1,
        answer: "prime/chief"
      },
      {
        id: "d",
        instruction: "use a demonstrative to pre-modify the noun",
        ruleId: 7,
        answer: "this"
      },
      {
        id: "e",
        instruction: "use possessive to pre-modify the noun",
        ruleId: 5,
        answer: "his"
      },
      {
        id: "f",
        instruction: "post-modify the verb with an adverb",
        ruleId: 16,
        answer: "early"
      },
      {
        id: "g",
        instruction: "post-modify the verb with an adverb",
        ruleId: 16,
        answer: "regularly"
      },
      {
        id: "h",
        instruction: "use determiner to pre-modify the noun",
        ruleId: 2,
        answer: "single"
      },
      {
        id: "i",
        instruction: "pre-modify the adjective with an intensifier",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "j",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "bad"
      }
    ]
  },
  {
    id: "dinajpur-2017-modifier",
    year: 2017,
    board: "Dinajpur Board",
    passage: "Sabbir is ___ ideal student. He prepares ___ lessons in collaboration with his teachers. He does ___ in every examination as he does not waste time. He knows time once lost is lost forever. So, he utilizes every moment. During his free time, he goes to his native village. He teaches ___ people. He wants ___ illiteracy from his village. ___ illiteracy from his village, he wants to bring about massive development there. He is ___ devoted to God. He says prayer ___ times a day. He never tells a lie. He respects his parents very much. Other superiors are also respected by him. His father, ___ supports him cordially. His mother, an ideal housewife, ___ supports him very much. Such a student like Sabbir is rarely found nowadays.",
    blanks: [
      {
        id: "a",
        instruction: "use determiner to pre-modify the noun phrase",
        ruleId: 2,
        answer: "an"
      },
      {
        id: "b",
        instruction: "use possessive to pre-modify the noun",
        ruleId: 5,
        answer: "his"
      },
      {
        id: "c",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "very well"
      },
      {
        id: "d",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "illiterate"
      },
      {
        id: "e",
        instruction: "use an infinitive phrase to post-modify the verb",
        ruleId: 13,
        answer: "to remove"
      },
      {
        id: "f",
        instruction: "use a present participle to pre-modify the verb",
        ruleId: 8,
        answer: "Removing"
      },
      {
        id: "g",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "h",
        instruction: "use quantifier to pre-modify the noun",
        ruleId: 11,
        answer: "five"
      },
      {
        id: "i",
        instruction: "post-modify the noun phrase with an appositive",
        ruleId: 21,
        answer: "an ideal man"
      },
      {
        id: "j",
        instruction: "pre-modify the verb",
        ruleId: 6,
        answer: "also"
      }
    ]
  },
  {
    id: "dhaka-2019-modifier",
    year: 2019,
    board: "Dhaka Board",
    passage: "Arsenic is a ___ substance. It is ___ dangerous for human health. ___ substance is found in the water of the tube well. There are ___ villages in ___ country. Most of our ___ people drink tube well water. As a result, many of them are suffering from the arsenic problem. This problem is ___ found in North Bengal. We should take proper measures ___. Government is trying to mark the tube wells having arsenic ___ red colour. People should be refrained from drinking water of ___ tube wells. Otherwise, they will suffer from arsenicosis.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "harmful/poisonous/detrimental"
      },
      {
        id: "b",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "very/extremely"
      },
      {
        id: "c",
        instruction: "use a demonstrative to pre-modify the noun",
        ruleId: 7,
        answer: "this"
      },
      {
        id: "d",
        instruction: "use quantifier to pre-modify the noun",
        ruleId: 11,
        answer: "many/several"
      },
      {
        id: "e",
        instruction: "use possessive to pre-modify the noun",
        ruleId: 5,
        answer: "our"
      },
      {
        id: "f",
        instruction: "use a noun adjective to pre-modify the noun",
        ruleId: 4,
        answer: "village/common"
      },
      {
        id: "g",
        instruction: "pre-modify the verb",
        ruleId: 6,
        answer: "mostly/usually/unexpectedly"
      },
      {
        id: "h",
        instruction: "post-modify the verb with an infinitive phrase",
        ruleId: 13,
        answer: "to remain safe/to remove this problem"
      },
      {
        id: "i",
        instruction: "use a participle to post modify the verb",
        ruleId: 14,
        answer: "painting"
      },
      {
        id: "j",
        instruction: "use demonstrative to pre-modify the noun",
        ruleId: 7,
        answer: "those/these"
      }
    ]
  },
  {
    id: "rajshahi-2019-modifier",
    year: 2019,
    board: "Rajshahi Board",
    passage: "Taking food is essential. We take food ___. We can not survive on earth if we do not take food. In fact ___ living beings need to take food. But it is a matter of great regret that ___ food is being adulterated. ___ adulteration is increasing ___ alarmingly that we cannot stop it. ___ dishonest businessmen use ___ chemicals in food and fruits to make illegal and quick money. But they do not think about ___ health. ___ adulterated food, people get sick. They are often attacked with different fatal diseases. So ___ food safety is a must today.",
    blanks: [
      {
        id: "a",
        instruction: "use an infinitive phrase to post-modify the verb",
        ruleId: 13,
        answer: "to survive/to live"
      },
      {
        id: "b",
        instruction: "use a quantifier to pre-modify the noun phrase",
        ruleId: 11,
        answer: "all/every"
      },
      {
        id: "c",
        instruction: "use possessive to pre-modify the noun",
        ruleId: 5,
        answer: "our"
      },
      {
        id: "d",
        instruction: "use a noun-adjective to pre-modify the noun",
        ruleId: 4,
        answer: "Food"
      },
      {
        id: "e",
        instruction: "use an intensifier to pre-modify the adverb",
        ruleId: 3,
        answer: "so"
      },
      {
        id: "f",
        instruction: "use a determiner to pre-modify the noun phrase",
        ruleId: 2,
        answer: "Some"
      },
      {
        id: "g",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "harmful"
      },
      {
        id: "h",
        instruction: "use a possessive to pre-modify the noun",
        ruleId: 5,
        answer: "our"
      },
      {
        id: "i",
        instruction: "use present participle",
        ruleId: 14,
        answer: "Taking/Eating"
      },
      {
        id: "j",
        instruction: "use a gerund",
        ruleId: 14,
        answer: "ensuring"
      }
    ]
  },
  {
    id: "cumilla-2019-modifier",
    year: 2019,
    board: "Cumilla Board",
    passage: "Newspaper plays a very ___ role in modern civilization. It publishes news and views of home and abroad. Only ___ knowledge is not enough in this competitive world. A newspaper helps a man ___ his general knowledge. Besides academic books, one should read newspapers ___. The newspaper helps one ___ the facts of the world. ___ regularly, one can be aware of everything. There are ___ kinds of newspaper. One should select the newspaper ___. One should choose the ___ paper because many newspapers present news partially. Whatever the paper is, it ___ helps a man.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "significant/important"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "bookish"
      },
      {
        id: "c",
        instruction: "post modify the verb with an infinitive",
        ruleId: 12,
        answer: "to increase/to enrich"
      },
      {
        id: "d",
        instruction: "post modify the verb",
        ruleId: 16,
        answer: "everyday/regularly"
      },
      {
        id: "e",
        instruction: "post modify the verb with an infinitive",
        ruleId: 12,
        answer: "to know"
      },
      {
        id: "f",
        instruction: "pre modify the verb with a present participle phrase",
        ruleId: 15,
        answer: "Reading newspaper"
      },
      {
        id: "g",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "different/various"
      },
      {
        id: "h",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "properly/rightly/justly"
      },
      {
        id: "i",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "impartial"
      },
      {
        id: "j",
        instruction: "pre-modify the verb",
        ruleId: 6,
        answer: "always/really/actually"
      }
    ]
  },
  {
    id: "jashore-2019-modifier",
    year: 2019,
    board: "Jashore Board",
    passage: "Air and water are the most ___ elements of the environment. But we pollute them ___. Mills and factories use fuel ___ their products. The burning of this fuel creates smoke ___. Motor vehicles also pollute the air, ___. Water is polluted by ___ kinds of waste and filth. We pollute water ___ into water. Farmers use ___ fertilizers and insecticides and pollute water. ___ water is ___ harmful to health.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun with an adjective",
        ruleId: 1,
        answer: "essential/valuable"
      },
      {
        id: "b",
        instruction: "post-modify the verb with an adverb",
        ruleId: 16,
        answer: "indiscriminately"
      },
      {
        id: "c",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to manufacture"
      },
      {
        id: "d",
        instruction: "post-modify the verb with an adverbial",
        ruleId: 17,
        answer: "on a large scale/hugely"
      },
      {
        id: "e",
        instruction: "use an appositive",
        ruleId: 21,
        answer: "an important element of our environment"
      },
      {
        id: "f",
        instruction: "pre-modify the noun with a quantifier",
        ruleId: 11,
        answer: "all/various/different"
      },
      {
        id: "g",
        instruction: "post-modify the verb with present participle phrase",
        ruleId: 15,
        answer: "throwing waste"
      },
      {
        id: "h",
        instruction: "pre modify the noun with an adjective",
        ruleId: 1,
        answer: "chemical"
      },
      {
        id: "i",
        instruction: "pre-modify the noun with a past participle",
        ruleId: 9,
        answer: "Polluted/Contaminated"
      },
      {
        id: "j",
        instruction: "pre-modify the adjective with an intensifier",
        ruleId: 3,
        answer: "very"
      }
    ]
  },
  {
    id: "chattogram-2019-modifier",
    year: 2019,
    board: "Chattogram Board",
    passage: "We can't think of our existence without language. It plays a ___ important role in our life. We use language from the time we wake up ___ till we go to bed at night. We use language not only in our ___ hours but also in our dreams. We use language ___ what we feel and to say what we like or dislike. We also use language ___ information. Language is ___ present in our life. It is an ___ part of our life. As an ___ nation, we also have a language. But we had to struggle ___ to establish the right of our language. Many ___ sons sacrificed their lives for the language.",
    blanks: [
      {
        id: "a",
        instruction: "use an intensifier",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "b",
        instruction: "post-modify the verb",
        ruleId: 18,
        answer: "in the morning"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "working"
      },
      {
        id: "d",
        instruction: "use an infinitive",
        ruleId: 12,
        answer: "to express"
      },
      {
        id: "e",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to get/convey/exchange"
      },
      {
        id: "f",
        instruction: "pre-modify the adjective",
        ruleId: 6,
        answer: "ever/always"
      },
      {
        id: "g",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "essential/integral"
      },
      {
        id: "h",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "independent"
      },
      {
        id: "i",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "hard"
      },
      {
        id: "j",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "valiant"
      }
    ]
  },
  {
    id: "sylhet-2019-modifier",
    year: 2019,
    board: "Sylhet Board",
    passage: "A library is a ___ of knowledge. The students ___ to all classes visit it in their library periods. Our college library is housed in two rooms. ___ almirahs are placed in one room. The other room is the ___ room where magazines, journals and newspapers are placed. There are about five thousand books in our library which are arranged ___. Any type of book can be traced in no time. The books cater to the needs and interests ___. There are two separate sections in the library. One of them contains reference books like ___ etc. The other section contains books ___. Every student has a library ___. The reading room is always crowded ___ in the afternoon.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "store house"
      },
      {
        id: "b",
        instruction: "use a participle",
        ruleId: 9,
        answer: "belonging"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 11,
        answer: "Some/Several"
      },
      {
        id: "d",
        instruction: "use a participle to modify the noun",
        ruleId: 9,
        answer: "reading"
      },
      {
        id: "e",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "systematically"
      },
      {
        id: "f",
        instruction: "use a prepositional phrase",
        ruleId: 18,
        answer: "of the readers/students"
      },
      {
        id: "g",
        instruction: "use nouns",
        ruleId: 1,
        answer: "dictionaries/encyclopaedias"
      },
      {
        id: "h",
        instruction: "use prepositional phrase",
        ruleId: 18,
        answer: "of academic categories"
      },
      {
        id: "i",
        instruction: "use a noun",
        ruleId: 4,
        answer: "card"
      },
      {
        id: "j",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "mainly/generally"
      }
    ]
  },
  {
    id: "barishal-2019-modifier",
    year: 2019,
    board: "Barishal Board",
    passage: "The roads ___ are beset with problems. ___ driving is one of them. Most of the drivers are not ___ trained. They are not well educated. They can ___ put their signature and read Bengali. They are indifferent to ___ life. They do not realize that life is ___ valuable than time. They drive ___. They do ___ drive consciously. Even they themselves are not conscious of ___ own lives. They drive ___ and try to overtake others.",
    blanks: [
      {
        id: "a",
        instruction: "use an adjective phrase to post-modify the noun",
        ruleId: 1,
        answer: "running across the country"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "Reckless"
      },
      {
        id: "c",
        instruction: "pre-modify the participle",
        ruleId: 6,
        answer: "well"
      },
      {
        id: "d",
        instruction: "use an adverb to pre-modify the verb",
        ruleId: 6,
        answer: "hardly/not"
      },
      {
        id: "e",
        instruction: "use a noun adjective",
        ruleId: 4,
        answer: "public"
      },
      {
        id: "f",
        instruction: "use a determiner",
        ruleId: 2,
        answer: "more"
      },
      {
        id: "g",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "recklessly/desperately"
      },
      {
        id: "h",
        instruction: "use an adverb to pre-modify the verb",
        ruleId: 6,
        answer: "not"
      },
      {
        id: "i",
        instruction: "use a possessive",
        ruleId: 5,
        answer: "their"
      },
      {
        id: "j",
        instruction: "use an adverb phrase to post-modify the verb",
        ruleId: 17,
        answer: "very fast/very quickly"
      }
    ]
  },
  {
    id: "dinajpur-2019-modifier",
    year: 2019,
    board: "Dinajpur Board",
    passage: "Bangladesh is a ___ country. Though it is a small country, it has a ___ population. People ___ depend on agriculture. They grow different kinds of crops ___. We earn ___ currencies by exporting some of these crops. We are also rich in ___ resources. Now, we are able ___ natural gas from underground. Our industries are also rising ___. We export ___ products to the developed countries. In this regard, we have already earned a ___ reputation.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "small"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "large"
      },
      {
        id: "c",
        instruction: "pre-modify the verb with an adverb",
        ruleId: 6,
        answer: "mainly/basically"
      },
      {
        id: "d",
        instruction: "post-modify the verb with an adverbial phrase",
        ruleId: 17,
        answer: "throughout the year"
      },
      {
        id: "e",
        instruction: "pre-modify the noun with a noun-adjective",
        ruleId: 4,
        answer: "foreign"
      },
      {
        id: "f",
        instruction: "pre-modify the noun with an adjective",
        ruleId: 1,
        answer: "natural"
      },
      {
        id: "g",
        instruction: "post-modify the adjective with an infinitive",
        ruleId: 12,
        answer: "to dig out"
      },
      {
        id: "h",
        instruction: "post-modify the verb with an adverb",
        ruleId: 16,
        answer: "rapidly"
      },
      {
        id: "i",
        instruction: "pre-modify the noun with a noun adjective",
        ruleId: 4,
        answer: "garment"
      },
      {
        id: "j",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "good"
      }
    ]
  },
  {
    id: "dhaka-2023-modifier",
    year: 2023,
    board: "Dhaka Board",
    passage: "Cricket is an ___ game. It is not a game of ___ country. A ___ match is played between two teams. ___ team consists of eleven players. A cricket field must be ___. It requires two wooden bats, a ball & two sets of stamps. ___ Umpires conduct the game. Sometimes, a third umpire is required ___ an acute confusion. ___ the opportunity, the batter hits the ball away at a good distance and runs to the opposite wicket. If ___ batter is out, next batter comes in his place. Both teams try ___ to out all batters of the opposite.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "international/elite"
      },
      {
        id: "b",
        instruction: "use possessive to pre-modify the noun",
        ruleId: 5,
        answer: "our"
      },
      {
        id: "c",
        instruction: "use a noun adjective to pre-modify the noun",
        ruleId: 4,
        answer: "cricket"
      },
      {
        id: "d",
        instruction: "use a distributive pronoun to pre modify the noun",
        ruleId: 2,
        answer: "Each"
      },
      {
        id: "e",
        instruction: "post-modify the noun",
        ruleId: 1,
        answer: "well-maintained"
      },
      {
        id: "f",
        instruction: "use a numeral adjective to pre-modify the noun",
        ruleId: 11,
        answer: "Two"
      },
      {
        id: "g",
        instruction: "use an infinitive to post-modify the verb",
        ruleId: 12,
        answer: "to resolve/clear"
      },
      {
        id: "h",
        instruction: "use a participle to pre-modify the noun",
        ruleId: 9,
        answer: "Having/Taking"
      },
      {
        id: "i",
        instruction: "use an indefinite pronoun to pre-modify the noun",
        ruleId: 2,
        answer: "any"
      },
      {
        id: "j",
        instruction: "use an adverbial phrase to post modify",
        ruleId: 17,
        answer: "hard enough"
      }
    ]
  },
  {
    id: "rajshahi-2023-modifier",
    year: 2023,
    board: "Rajshahi Board",
    passage: "People around were just watching as the ___ boy started ___ into the ___ canal. Then the traffic constable came. ___ no time, he jumped into the canal. The ___ constable did not think of his ___ life. He was ___ kind that he risked his life. People ___ by canal praised him ___. This type of person is a model ___.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "young"
      },
      {
        id: "b",
        instruction: "post-modify the verb",
        ruleId: 14,
        answer: "drowning"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "deep"
      },
      {
        id: "d",
        instruction: "pre-modify the noun with a present participle",
        ruleId: 9,
        answer: "Wasting"
      },
      {
        id: "e",
        instruction: "pre-modify the noun with an adjective",
        ruleId: 1,
        answer: "police"
      },
      {
        id: "f",
        instruction: "pre-modify the noun",
        ruleId: 5,
        answer: "own"
      },
      {
        id: "g",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "so"
      },
      {
        id: "h",
        instruction: "post-modify the noun",
        ruleId: 9,
        answer: "standing/sitting"
      },
      {
        id: "i",
        instruction: "post-modify the verb with an adverb",
        ruleId: 16,
        answer: "enormously/greatly/cheerfully"
      },
      {
        id: "j",
        instruction: "post-modify the noun",
        ruleId: 18,
        answer: "for the society"
      }
    ]
  },
  {
    id: "cumilla-2023-modifier",
    year: 2023,
    board: "Cumilla Board",
    passage: "Amerigo, ___ lives alone. His parents now live separate and none of them wants ___ his responsibility. ___ mother told him to go away because she is married to another man. ___ streets are now his home. He wanted ___ money from his father to buy a ___ ticket. But his father did not answer. He earns his living by working hard. ___ he finds work. ___ works are risky for him. Once he sold ice cream ___. But he got ___ money in return from the owner of the ice cream shop.",
    blanks: [
      {
        id: "a",
        instruction: "use noun in apposition",
        ruleId: 21,
        answer: "a street child"
      },
      {
        id: "b",
        instruction: "use an infinitive to post modify the verb",
        ruleId: 12,
        answer: "to take"
      },
      {
        id: "c",
        instruction: "use possessive to pre-modify the noun",
        ruleId: 5,
        answer: "His"
      },
      {
        id: "d",
        instruction: "use determiner to pre-modify the noun",
        ruleId: 2,
        answer: "The"
      },
      {
        id: "e",
        instruction: "use an adjective to pre-modify the noun",
        ruleId: 1,
        answer: "some"
      },
      {
        id: "f",
        instruction: "use a noun adjective to pre-modify the noun",
        ruleId: 4,
        answer: "bus"
      },
      {
        id: "g",
        instruction: "use adverbial to pre-modify the verb",
        ruleId: 6,
        answer: "hardly"
      },
      {
        id: "h",
        instruction: "use demonstrative to pre-modify the noun",
        ruleId: 7,
        answer: "These"
      },
      {
        id: "i",
        instruction: "use a prepositional phrase to post modify the verb",
        ruleId: 18,
        answer: "on the beach"
      },
      {
        id: "j",
        instruction: "use quantifier to pre-modify the noun",
        ruleId: 11,
        answer: "no"
      }
    ]
  },
  {
    id: "jashore-2023-modifier",
    year: 2023,
    board: "Jashore Board",
    passage: "Language plays a ___ important role in our life. We use language from the time we wake up ___ till we go to bed at night. We use language not only in our ___ hours. but also in our dreams. We use language ___ what we feel and to say what we like or dislike. We also use language ___ information. Language is ___ present in our life. It is an ___ part of our life. As an ___ nation we also have a language. But we had to struggle ___ to establish the right to our language. Many ___ sons of our country sacrificed their lives for our mother-tongue.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the adjective with an intensifier",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "b",
        instruction: "post-modify the verb",
        ruleId: 18,
        answer: "in the morning"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "conscious/active"
      },
      {
        id: "d",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to express"
      },
      {
        id: "e",
        instruction: "post modify the verb with an infinitive",
        ruleId: 12,
        answer: "to share/to gather"
      },
      {
        id: "f",
        instruction: "pre-modify the adjective",
        ruleId: 6,
        answer: "always"
      },
      {
        id: "g",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "integral/inevitable"
      },
      {
        id: "h",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "independent"
      },
      {
        id: "i",
        instruction: "use adverb to post-modify the verb",
        ruleId: 16,
        answer: "a lot/hard/enormously"
      },
      {
        id: "j",
        instruction: "pre-modify the noun with an adjective",
        ruleId: 1,
        answer: "brave/courageous"
      }
    ]
  },
  {
    id: "sylhet-2023-modifier",
    year: 2023,
    board: "Sylhet Board",
    passage: "Drug addiction among the young generation has become a ___ concern. Drug is mainly used as medicine ___ diseases and an excess of taking drug for no disease is called drug addiction. It has grasped the young generation ___. They take drugs to forget ___ sadness. ___ people take drugs ___. Drug addiction causes ___ harm to human body. ___ them aware, we can remove this curse from our society. All concerned should take initiatives ___ it. The criminals should be punished with an ___ hand.",
    blanks: [
      {
        id: "a",
        instruction: "pre modify the noun",
        ruleId: 1,
        answer: "major"
      },
      {
        id: "b",
        instruction: "use an infinitive to post modify the verb",
        ruleId: 12,
        answer: "to cure"
      },
      {
        id: "c",
        instruction: "post modify the verb",
        ruleId: 16,
        answer: "heavily"
      },
      {
        id: "d",
        instruction: "use possessive to pre modify the noun",
        ruleId: 5,
        answer: "their"
      },
      {
        id: "e",
        instruction: "pre modify the noun",
        ruleId: 1,
        answer: "Young"
      },
      {
        id: "f",
        instruction: "use adverb to post modify",
        ruleId: 16,
        answer: "widely/recklessly"
      },
      {
        id: "g",
        instruction: "pre modify the noun",
        ruleId: 1,
        answer: "severe"
      },
      {
        id: "h",
        instruction: "use a participle",
        ruleId: 8,
        answer: "Making"
      },
      {
        id: "i",
        instruction: "use an infinitive to post modify the verb",
        ruleId: 12,
        answer: "to prevent"
      },
      {
        id: "j",
        instruction: "use a noun adjective",
        ruleId: 4,
        answer: "iron"
      }
    ]
  },
  {
    id: "barishal-2023-modifier",
    year: 2023,
    board: "Barishal Board",
    passage: "Kazi Nazrul Islam is called the Shelley of Bangla literature. He was a ___ poet. He wrote ___ in almost all branches of Bangla literature. Nazrul, ___, won the attention of everybody in his childhood. He wrote ceaselessly until the death of ___ poetic flair. He composed ___ songs ___. His literary works have enriched ___ Literature. His poems and songs played a great role ___ in our war of Liberation. He ___ sang the songs of equality in his poems. He is ___ pride, no doubt.",
    blanks: [
      {
        id: "a",
        instruction: "pre modify the noun",
        ruleId: 1,
        answer: "revolutionary/rebel"
      },
      {
        id: "b",
        instruction: "post modify the verb",
        ruleId: 16,
        answer: "relentlessly/tirelessly"
      },
      {
        id: "c",
        instruction: "use an appositive to post modify the noun",
        ruleId: 21,
        answer: "an orphan child/a prodigy"
      },
      {
        id: "d",
        instruction: "use a possessive to pre modify the noun",
        ruleId: 5,
        answer: "his"
      },
      {
        id: "e",
        instruction: "pre modify the noun",
        ruleId: 11,
        answer: "many"
      },
      {
        id: "f",
        instruction: "post modify the noun with an adjective clause",
        ruleId: 20,
        answer: "which are loved/appreciated by all"
      },
      {
        id: "g",
        instruction: "pre modify the noun",
        ruleId: 4,
        answer: "Bengali/Bangla"
      },
      {
        id: "h",
        instruction: "use an infinitive to post modify the verb",
        ruleId: 12,
        answer: "to encourage people"
      },
      {
        id: "i",
        instruction: "pre modify the verb",
        ruleId: 6,
        answer: "always"
      },
      {
        id: "j",
        instruction: "pre modify the noun with determiner",
        ruleId: 2,
        answer: "our"
      }
    ]
  },
  {
    id: "dinajpur-2023-modifier",
    year: 2023,
    board: "Dinajpur Board",
    passage: "An ___ student is he, who has ___ good qualities. he studies ___. He knows that the ___ duty of a student is to study. So, he never neglects ___ duty. He even makes the proper use of ___ moment. Sabuj. ___ of our class is an example of a good student. Sabuj is ___ helpful to us. I try ___ a boy like Sabuj. I want to be one of the ___ stars in the class.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "ideal"
      },
      {
        id: "b",
        instruction: "use a quantifier to pre-modify the noun",
        ruleId: 11,
        answer: "many"
      },
      {
        id: "c",
        instruction: "post modify the verb",
        ruleId: 16,
        answer: "regularly"
      },
      {
        id: "d",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "main"
      },
      {
        id: "e",
        instruction: "use a possessive",
        ruleId: 5,
        answer: "his"
      },
      {
        id: "f",
        instruction: "use a determiner to pre-modify the noun",
        ruleId: 2,
        answer: "every"
      },
      {
        id: "g",
        instruction: "post modify the noun with an appositive",
        ruleId: 21,
        answer: "a student"
      },
      {
        id: "h",
        instruction: "pre-modify the adjective",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "i",
        instruction: "modify the verb with an infinitive",
        ruleId: 12,
        answer: "to be"
      },
      {
        id: "j",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "brightest"
      }
    ]
  },
  {
    id: "mymensingh-2023-modifier",
    year: 2023,
    board: "Mymensingh Board",
    passage: "The purpose of education is to bring about ___ changes in ___ behaviour. It also brings changes in our lives and society ___. If it fails to do so, it can't be called education. Education is not only receiving certificates and getting grades. It is ___ more than that, we can apply our ___ knowledge in our engagement with the world that lies ___. We can do that in ___ ways. One way is civic engagement which is ___ appreciated all over the world. Civic engagement means working to make difference in civic life ___. A person ___ civically is concerned about civic issues like injustice, discrimination and other forms of social ills.",
    blanks: [
      {
        id: "a",
        instruction: "use an adjective to pre-modify the noun",
        ruleId: 1,
        answer: "positive/effective"
      },
      {
        id: "b",
        instruction: "use a possessive to pre-modify the noun",
        ruleId: 5,
        answer: "our"
      },
      {
        id: "c",
        instruction: "use a relative clause to post-modify the noun",
        ruleId: 20,
        answer: "in which we live/where we live"
      },
      {
        id: "d",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "much/far"
      },
      {
        id: "e",
        instruction: "use a part participle to pre-modify the noun",
        ruleId: 9,
        answer: "acquired"
      },
      {
        id: "f",
        instruction: "use an adverb to post-modify the verb",
        ruleId: 16,
        answer: "around"
      },
      {
        id: "g",
        instruction: "use an adjective to pre-modify the noun",
        ruleId: 1,
        answer: "many/different"
      },
      {
        id: "h",
        instruction: "use an adverb to pre-modify the verb 'appreciated'",
        ruleId: 6,
        answer: "greatly"
      },
      {
        id: "i",
        instruction: "use a prepositional phrase to post-modify the noun life",
        ruleId: 18,
        answer: "of a person"
      },
      {
        id: "j",
        instruction: "use a past participle to post modify the noun",
        ruleId: 9,
        answer: "behaved"
      }
    ]
  },
  {
    id: "chattogram-2023-modifier",
    year: 2023,
    board: "Chattogram Board",
    passage: "We know that ___ species are important for maintaining ___ balance. If one is lost, the whole natural environment changes ___. In order to protect the environment from being spoilt, we should protect ___ wildlife. ___ good news is that many countries are taking action ___. George Lay Cock, ___ writes, \"Mankind must develop a concern for wild creatures and determine that ___ wild species will not perish ___. We have to save wild animals ___.",
    blanks: [
      {
        id: "a",
        instruction: "use quantifier to pre-modify the noun",
        ruleId: 11,
        answer: "all"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "environmental/ecological"
      },
      {
        id: "c",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "drastically/greatly"
      },
      {
        id: "d",
        instruction: "use possessive to pre-modify the noun",
        ruleId: 5,
        answer: "our"
      },
      {
        id: "e",
        instruction: "use determiner to pre-modify the noun phrase",
        ruleId: 2,
        answer: "The"
      },
      {
        id: "f",
        instruction: "use infinitive phrase to post-modify the verb",
        ruleId: 13,
        answer: "to protect the wildlife"
      },
      {
        id: "g",
        instruction: "use appositive to post-modify the noun",
        ruleId: 21,
        answer: "a famous environmentalist"
      },
      {
        id: "h",
        instruction: "use demonstrative to pre-modify the noun",
        ruleId: 7,
        answer: "these"
      },
      {
        id: "i",
        instruction: "use prepositional phrase as post-modifier",
        ruleId: 18,
        answer: "in the near future"
      },
      {
        id: "j",
        instruction: "use relative clause as post-modifier",
        ruleId: 20,
        answer: "which are in the risk of extinction"
      }
    ]
  },
  {
    id: "dhaka-2024-modifier",
    year: 2024,
    board: "Dhaka Board",
    passage: "Once there lived a ___ fox in a jungle. One day, while he was walking ___ through the jungle he fell into a trap and lost his tail. He felt ___ unhappy and sad. But the fox was very cunning. He hit upon a plan. He invited all the foxes ___ to a meeting. When all the foxes arrived, the fox without a tail said, \"My dear friends, listen to me, please, I have discovered a ___ thing. It is that our tails are ___ useless. They look ugly and dirty. So, we should cut off our tails, shouldn't we?\" All foxes listened to the cunning fox ___. Most of them agreed ___ their tails. But an old and ___ fox said to him, \"My friend, your plan is nice but evil. Actually, you want to cut off our tails because you have ___ tail of your own.\"",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
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
    id: "rajshahi-2024-modifier",
    year: 2024,
    board: "Rajshahi Board", 
    passage: "Trees, ___, are essential for maintaining eco-system. Without trees, the balance of eco-system will be ___ lost. Trees provide us with ___ elements without which we cannot live on this earth. It is a matter of ___ concern that we are felling trees ___. As a dire consequence, the global temperature is rising ___. The existence of flora and fauna is at an ___ risk. Polar ice caps are melting and ___ level is rising. ___, we can avoid such a catastrophe. If we want to keep our ___ earth safe and sound, we have to plant trees and protect our forests.",
    blanks: [
      {
        id: "a",
        instruction: "use an appositive",
        ruleId: 21,
        answer: "the lungs of nature"
      },
      {
        id: "b",
        instruction: "post modify the verb",
        ruleId: 16,
        answer: "completely"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "essential/vital"
      },
      {
        id: "d",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "great/serious"
      },
      {
        id: "e",
        instruction: "post modify the verb",
        ruleId: 16,
        answer: "indiscriminately"
      },
      {
        id: "f",
        instruction: "post modify the verb",
        ruleId: 16,
        answer: "alarmingly"
      },
      {
        id: "g",
        instruction: "use a pre-modifier",
        ruleId: 1,
        answer: "imminent/serious"
      },
      {
        id: "h",
        instruction: "use a noun adjective",
        ruleId: 4,
        answer: "sea/water"
      },
      {
        id: "i",
        instruction: "use a present participle phrase",
        ruleId: 15,
        answer: "Planting more trees"
      },
      {
        id: "j",
        instruction: "use a noun adjective",
        ruleId: 4,
        answer: "beautiful/green"
      }
    ]
  },
  {
    id: "cumilla-2024-modifier",
    year: 2024,
    board: "Cumilla Board",
    passage: "Man has ___ inborn curiosity to know the unknown and ___. He likes to see new places and wants to know about ___ nations, their cultures, manners and religions. Bookish knowledge is ___. In order to have practical knowledge one has to go for travelling. ___ people had to suffer much for travelling as they did not have ___ transports. Nowadays travelling has become much easier and comfortable for the invention of Aeroplan, buses. ships, speedy trains etc. Travelling plays a ___ important role in acquiring knowledge. So, the students go for ___ tour which also helps to remove ___ boredom of study. In fact, everyone should travel to develop practical knowledge which cannot be acquired by sitting ___.",
    blanks: [
      {
        id: "a",
        instruction: "use determiner to pre-modify the noun phrase",
        ruleId: 2,
        answer: "an"
      },
      {
        id: "b",
        instruction: "use an infinitive phrase",
        ruleId: 13,
        answer: "to explore new things"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "different/various"
      },
      {
        id: "d",
        instruction: "use adjective phrase",
        ruleId: 1,
        answer: "not enough/insufficient"
      },
      {
        id: "e",
        instruction: "use an adverbial phrase",
        ruleId: 17,
        answer: "In ancient times"
      },
      {
        id: "f",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "modern/fast"
      },
      {
        id: "g",
        instruction: "use an intensifier to pre-modify the adjective",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "h",
        instruction: "pre-modify the noun with a noun adjective",
        ruleId: 4,
        answer: "study/educational"
      },
      {
        id: "i",
        instruction: "pre-modify the noun with a possessive",
        ruleId: 5,
        answer: "their"
      },
      {
        id: "j",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "at home"
      }
    ]
  },
  {
    id: "barishal-2024-modifier",
    year: 2024,
    board: "Barishal Board",
    passage: "Books are ___ essential for us. They help us ___ knowledge. ___ books, we can know everything. They show us the ___ way. Books can be our ___ friends. They help us ___ our mind. They improve our ___ power. They give us solace to our ___ mind. Besides, reading ___ books; students should read other books. If they read other books, they will be able to know everything ___.",
    blanks: [
      {
        id: "a",
        instruction: "use intensifier",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "b",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to gain/acquire"
      },
      {
        id: "c",
        instruction: "pre-modify the noun with present participle",
        ruleId: 9,
        answer: "Reading"
      },
      {
        id: "d",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "right/correct"
      },
      {
        id: "e",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "best/true"
      },
      {
        id: "f",
        instruction: "post modify the verb with infinitive",
        ruleId: 12,
        answer: "to develop"
      },
      {
        id: "g",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "thinking/mental"
      },
      {
        id: "h",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "troubled/restless"
      },
      {
        id: "i",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "academic/text"
      },
      {
        id: "j",
        instruction: "post modify the verb",
        ruleId: 16,
        answer: "clearly/properly"
      }
    ]
  },
  {
    id: "chattogram-2024-modifier",
    year: 2024,
    board: "Chattogram Board",
    passage: "Long ago, there was an ___ king in England. He was tired of ruling and needed rest. He had ___ daughters Goneril, Regan and Cordelia. He made up his mind ___ among his daughters. But, at first, he wanted ___ how much they loved him. Firstly, the king asked his ___ daughter how much she loved him. Goneril declared that she loved him ___ than she could say. Lear, the king, was ___ satisfied. He gave her one-third of the kingdom. Then he asked his ___ daughter Regan. She replied that her love for him would never change. She was able ___ him. So, the king gave another-third of his kingdom. Then, it was the turn of Cordelia, the ___ daughter of the king.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "old/aged"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 11,
        answer: "three"
      },
      {
        id: "c",
        instruction: "post-modify the verb with an infinitive phrase",
        ruleId: 13,
        answer: "to divide his kingdom"
      },
      {
        id: "d",
        instruction: "post-modify the verb with an infinitive phrase",
        ruleId: 13,
        answer: "to know/test"
      },
      {
        id: "e",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "eldest/first"
      },
      {
        id: "f",
        instruction: "use an intensifier to post-modify the verb",
        ruleId: 3,
        answer: "more"
      },
      {
        id: "g",
        instruction: "pre-modify the adjective",
        ruleId: 3,
        answer: "very/quite"
      },
      {
        id: "h",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "second"
      },
      {
        id: "i",
        instruction: "post-modify the adjective with an infinitive",
        ruleId: 12,
        answer: "to satisfy"
      },
      {
        id: "j",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "youngest"
      }
    ]
  },
  {
    id: "jashore-2024-modifier",
    year: 2024,
    board: "Jashore Board",
    passage: "Kazi Nazrul Islam is one of ___ best poets Bengal has ___ produced. A ___ writer, he contributed to many branches of Bangla literature. However, it is his poems and songs that earned him the ___ reputation. Through his writings, Nazrul aimed ___ the society because he was ___ troubled by old values and religious superstitions. It is ___ important to note that while Nazrul fought against religious bigotry, he composed ___ songs that ___ glorified religion. Sadly, a/an ___ disease untimely ended his literary career in his early forties.",
    blanks: [
      {
        id: "a",
        instruction: "use determiner to pre modify the noun",
        ruleId: 2,
        answer: "the"
      },
      {
        id: "b",
        instruction: "use an adverb to pre modify the verb",
        ruleId: 6,
        answer: "ever"
      },
      {
        id: "c",
        instruction: "use an adjective to pre modify the noun",
        ruleId: 1,
        answer: "versatile/prolific"
      },
      {
        id: "d",
        instruction: "pre modify the noun",
        ruleId: 1,
        answer: "greatest/highest"
      },
      {
        id: "e",
        instruction: "use an infinitive to post modify the verb",
        ruleId: 12,
        answer: "to reform"
      },
      {
        id: "f",
        instruction: "pre modify the verb",
        ruleId: 6,
        answer: "deeply"
      },
      {
        id: "g",
        instruction: "use an intensifier to pre modify the adjective",
        ruleId: 3,
        answer: "very"
      },
      {
        id: "h",
        instruction: "use a determiner to pre modify the noun",
        ruleId: 2,
        answer: "many"
      },
      {
        id: "i",
        instruction: "pre modify the verb",
        ruleId: 6,
        answer: "beautifully"
      },
      {
        id: "j",
        instruction: "pre modify the noun",
        ruleId: 1,
        answer: "incurable/neurological"
      }
    ]
  },
  {
    id: "mymensingh-2024-modifier",
    year: 2024,
    board: "Mymensingh Board",
    passage: "A library is a ___ house of knowledge. The students ___ in all classes visit it in their leisure period. Usually a college library is housed in two rooms. ___ almirahs are placed in one room. The other room is the ___ room where magazines, Journals and newspapers are placed. Hundreds of books are arranged ___. So any type of book can be traced in no time. The books cater to the needs and interests ___. Generally there are two separate sections in the library. One of them contains reference books like ___ etc. The other section contains books ___. Every student has a ___ card. The reading room is always crowded ___ in the afternoon.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "great/vast"
      },
      {
        id: "b",
        instruction: "use a participle",
        ruleId: 9,
        answer: "studying"
      },
      {
        id: "c",
        instruction: "pre-modify the noun",
        ruleId: 11,
        answer: "Many/Several"
      },
      {
        id: "d",
        instruction: "use a participle to modify the noun",
        ruleId: 9,
        answer: "reading"
      },
      {
        id: "e",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "systematically"
      },
      {
        id: "f",
        instruction: "use a pre-positional phrase",
        ruleId: 18,
        answer: "of the readers"
      },
      {
        id: "g",
        instruction: "use nouns",
        ruleId: 1,
        answer: "dictionaries, encyclopedias"
      },
      {
        id: "h",
        instruction: "use a pre-positional phrase",
        ruleId: 18,
        answer: "of different subjects"
      },
      {
        id: "i",
        instruction: "use a noun adjective to modify noun",
        ruleId: 4,
        answer: "library"
      },
      {
        id: "j",
        instruction: "post modify the verb",
        ruleId: 16,
        answer: "especially/particularly"
      }
    ]
  },
  {
    id: "dinajpur-2024-modifier",
    year: 2024,
    board: "Dinajpur Board",
    passage: "Rainy season is the proper time for ___ plantation. It is the time when ___ environment is the most suitable one for the ___ growth of trees. We should plant trees according to ___ suitability of the land. There are ___ fallow lands around us. We can plant saplings on ___ lands. Sea-beaches, low-lying areas, road sides etc. can be brought under the scheme of tree plantation. We can easily engage landless people ___ the saplings and ensure their safe growth. The success of tree plantation programme requires ___ united effort. The Government, the NGOs and the educated section of the society should work ___ in this regard. Everybody should come forward spontaneously to contribute to ___ noble campaign.",
    blanks: [
      {
        id: "a",
        instruction: "use a noun adjective to pre modify the noun",
        ruleId: 4,
        answer: "tree"
      },
      {
        id: "b",
        instruction: "use article to pre modify the noun",
        ruleId: 10,
        answer: "the"
      },
      {
        id: "c",
        instruction: "use an adjective to pre modify the noun",
        ruleId: 1,
        answer: "healthy/proper"
      },
      {
        id: "d",
        instruction: "use possessive to pre modify the noun",
        ruleId: 5,
        answer: "the"
      },
      {
        id: "e",
        instruction: "use quantifier to pre modify the noun",
        ruleId: 11,
        answer: "many"
      },
      {
        id: "f",
        instruction: "use a demonstrative",
        ruleId: 7,
        answer: "those"
      },
      {
        id: "g",
        instruction: "use an infinitive phrase to post modify the verb",
        ruleId: 13,
        answer: "to take care of"
      },
      {
        id: "h",
        instruction: "use article to pre modify the noun phrase",
        ruleId: 10,
        answer: "a"
      },
      {
        id: "i",
        instruction: "post modify the verb with adverbial",
        ruleId: 17,
        answer: "together/unitedly"
      },
      {
        id: "j",
        instruction: "use a demonstrative to pre modify the noun phrase",
        ruleId: 7,
        answer: "this"
      }
    ]
  }
];

const boards = ['All Boards', 'Dhaka Board', 'Chattogram Board', 'Cumilla Board', 'Rajshahi Board', 'Sylhet Board', 'Barisal Board', 'Jashore Board', 'Mymensingh Board', 'Dinajpur Board'];
const years = ['All Years', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export default function ModifierQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(question => {
      const matchesSearch = question.passage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.blanks.some(blank => blank.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blank.instruction.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesBoard = selectedBoard === 'All Boards' || question.board === selectedBoard;
      const matchesYear = selectedYear === 'All Years' || question.year.toString() === selectedYear;
      
      return matchesSearch && matchesBoard && matchesYear;
    });
  }, [searchTerm, selectedBoard, selectedYear]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
  };

  const toggleQuestionExpansion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years';

  const renderPassageWithBlanks = (passage: string, blanks: Blank[], showAnswers: boolean) => {
    let formattedPassage = passage;
    let blankIndex = 0;
    
    // Replace each ___ with the appropriate blank
    formattedPassage = formattedPassage.replace(/___/g, () => {
      const blank = blanks[blankIndex];
      if (!blank) return '___';
      
      const replacement = showAnswers 
        ? `<span class="inline-flex items-center bg-sf-button/20 text-sf-button px-2 py-1 rounded font-semibold">${blank.answer}</span>`
        : `<span class="inline-block w-20 h-6 bg-sf-text-muted/20 border-b-2 border-sf-button rounded-sm"></span>`;
      
      blankIndex++;
      return replacement;
    });
    
    return formattedPassage;
  };

  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-sf-button" />
            <h3 className="text-lg font-semibold text-sf-text-bold">Filter Questions</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Search Questions
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sf-text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in passages, answers, or instructions..."
                className="w-full pl-10 pr-4 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
              />
            </div>
          </div>

          {/* Board Filter */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Board
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
            >
              {boards.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-sf-text-muted/20">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-sf-text-muted">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedBoard !== 'All Boards' && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Board: {selectedBoard}
                </Badge>
              )}
              {selectedYear !== 'All Years' && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Year: {selectedYear}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-sf-text-bold">
          {filteredQuestions.length} Question{filteredQuestions.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="text-sm text-sf-text-muted">
          HSC Modifier
        </div>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <Card className="border-sf-text-muted/20">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Questions Found</h3>
            <p className="text-sf-text-subtle">
              {hasActiveFilters 
                ? "No questions match your current filters. Try adjusting your search criteria."
                : "No questions available at the moment."
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((question, index) => {
            const isExpanded = expandedQuestions.has(question.id);
            
            return (
              <Card 
                key={question.id} 
                className="border-sf-text-muted/20 hover:border-sf-button/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-sf-button border-sf-button/30">
                        Question {index + 1}
                      </Badge>
                      <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold">
                        {question.blanks.length} blanks
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-sf-text-muted">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{question.board}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{question.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Passage */}
                  <div className="prose prose-invert max-w-none mb-4">
                    <div 
                      className="text-sf-text-subtle leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: renderPassageWithBlanks(question.passage, question.blanks, isExpanded)
                      }}
                    />
                  </div>

                  {/* Toggle Button */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleQuestionExpansion(question.id)}
                      className="flex items-center space-x-2 text-sf-button hover:text-sf-button/80 transition-colors font-medium"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          <span>Hide Answers & Instructions</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span>Show Answers & Instructions</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Answers and Instructions */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-sf-text-muted/20">
                      <h4 className="text-lg font-semibold text-sf-text-bold mb-4">Answers & Instructions</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {question.blanks.map((blank, blankIndex) => (
                          <div
                            key={blank.id}
                            className="bg-sf-highlight/10 border border-sf-button/20 rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-sf-button border-sf-button/30">
                                ({String.fromCharCode(97 + blankIndex)})
                              </Badge>
                              <span className="font-semibold text-sf-text-bold">{blank.answer}</span>
                              {blank.ruleId && (
                                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                                  Rule {blank.ruleId}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-sf-text-subtle leading-relaxed mb-2">
                              <strong>Instruction:</strong> {blank.instruction}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}