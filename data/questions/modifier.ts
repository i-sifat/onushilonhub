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
    id: "dhaka-2023",
    board: "Dhaka",
    year: 2023,
    passage: "Cricket is an [a1] game. It is not a game of [b5] country. A [c4] match is played between two teams. [d2] team consists of eleven players. A cricket field must be [e9] well-maintained. It requires two wooden bats, a ball & two sets of stamps. [f11] Umpires conduct the game. Sometimes, a third umpire is required [g1p] an acute confusion. [h8] the opportunity, the batter hits the ball away at a good distance and runs to the opposite wicket. If [i2] batter is out, next batter comes in his place. Both teams try [j6p] to out all batters of the opposite.",
    blanks: [
      { id: "a1", rule: 1, ans: "international / elite" },
      { id: "b5", rule: 5, ans: "our" },
      { id: "c4", rule: 4, ans: "cricket" },
      { id: "d2", rule: 2, ans: "Each" },
      { id: "e9", rule: 9, ans: "well-maintained" },
      { id: "f11", rule: 11, ans: "Two" },
      { id: "g1p", rule: 1, ans: "to resolve / clear" },
      { id: "h8", rule: 8, ans: "Having / Taking" },
      { id: "i2", rule: 2, ans: "any" },
      { id: "j6p", rule: 6, ans: "hard enough" }
    ]
  },
  {
    id: "rajshahi-2023",
    board: "Rajshahi",
    year: 2023,
    passage: "People around were just watching as the [a1] boy started [b3p] into the [c1] canal. Then the traffic constable came. [d8] no time, he jumped into the canal. The [e1] constable did not think of his [f5] life. He was [g3] kind that he risked his life. People [h9] by canal praised him [i5p]. This type of person is a model [j10p].",
    blanks: [
      { id: "a1", rule: 1, ans: "young" },
      { id: "b3p", rule: 3, ans: "drowning" },
      { id: "c1", rule: 1, ans: "deep" },
      { id: "d8", rule: 8, ans: "Wasting" },
      { id: "e1", rule: 1, ans: "police" },
      { id: "f5", rule: 5, ans: "own" },
      { id: "g3", rule: 3, ans: "so" },
      { id: "h9", rule: 9, ans: "standing / sitting" },
      { id: "i5p", rule: 5, ans: "enormously / greatly / cheerfully / a lot / tremendously" },
      { id: "j10p", rule: 10, ans: "for the society / of dedication and sacrifice" }
    ]
  },
  {
    id: "cumilla-2023",
    board: "Cumilla",
    year: 2023,
    passage: "Amerigo, [a10p] lives alone. His parents now live separate and none of them wants [b1p] his responsibility. [c5] mother told him to go away because she is married to another man. [d2] streets are now his home. He wanted [e1] money from his father to buy a [f4] ticket. But his father did not answer. He earns his living by working hard. [g6] he finds work. [h7] works are risky for him. Once he sold ice cream [i7p]. But he got [j11] money in return from the owner of the ice cream shop.",
    blanks: [
      { id: "a10p", rule: 10, ans: "a street child" },
      { id: "b1p", rule: 1, ans: "to take" },
      { id: "c5", rule: 5, ans: "His" },
      { id: "d2", rule: 2, ans: "The" },
      { id: "e1", rule: 1, ans: "some" },
      { id: "f4", rule: 4, ans: "bus" },
      { id: "g6", rule: 6, ans: "hardly" },
      { id: "h7", rule: 7, ans: "These" },
      { id: "i7p", rule: 7, ans: "on the beach" },
      { id: "j11", rule: 11, ans: "no" }
    ]
  },
  {
    id: "jashore-2023",
    board: "Jashore",
    year: 2023,
    passage: "Language plays a [a3] important role in our life. We use language from the time we wake up [b7p] till we go to bed at night. We use language not only in our [c1] hours but also in our dreams. We use language [d1p] what we feel and to say what we like or dislike. We also use language [e1p] information. Language is [f3] present in our life. It is an [g1] part of our life. As an [h1] nation we also have a language. But we had to struggle [i5p] to establish the right to our language. Many [j1] sons of our country sacrificed their lives for our mother-tongue.",
    blanks: [
      { id: "a3", rule: 3, ans: "very" },
      { id: "b7p", rule: 7, ans: "in the morning" },
      { id: "c1", rule: 1, ans: "conscious / active" },
      { id: "d1p", rule: 1, ans: "to express" },
      { id: "e1p", rule: 1, ans: "to share / to gather" },
      { id: "f3", rule: 3, ans: "always" },
      { id: "g1", rule: 1, ans: "integral / inevitable" },
      { id: "h1", rule: 1, ans: "independent" },
      { id: "i5p", rule: 5, ans: "a lot / hard / enormously" },
      { id: "j1", rule: 1, ans: "brave / courageous" }
    ]
  },
  {
    id: "sylhet-2023",
    board: "Sylhet",
    year: 2023,
    passage: "Drug addiction among the young generation has become a [a1] concern. Drug is mainly used as medicine [b1p] diseases and an excess of taking drug for no disease is called drug addiction. It has grasped the young generation [c5p]. They take drugs to forget [d5] sadness. [e1] people take drugs [f5p]. Drug addiction causes [g1] harm to human body. [h8] them aware, we can remove this curse from our society. All concerned should take initiatives [i1p] it. The criminals should be punished with an [j4] hand.",
    blanks: [
      { id: "a1", rule: 1, ans: "major" },
      { id: "b1p", rule: 1, ans: "to cure" },
      { id: "c5p", rule: 5, ans: "heavily" },
      { id: "d5", rule: 5, ans: "their" },
      { id: "e1", rule: 1, ans: "Young" },
      { id: "f5p", rule: 5, ans: "widely / recklessly" },
      { id: "g1", rule: 1, ans: "severe" },
      { id: "h8", rule: 8, ans: "Making" },
      { id: "i1p", rule: 1, ans: "to prevent" },
      { id: "j4", rule: 4, ans: "iron" }
    ]
  },
  {
    id: "barishal-2023",
    board: "Barishal",
    year: 2023,
    passage: "Kazi Nazrul Islam is called the Shelley of Bangla literature. He was a [a1] poet. He wrote [b5p] in almost all branches of Bangla literature. Nazrul, [c10p], won the attention of everybody in his childhood. He wrote ceaselessly until the death of [d5] poetic flair. He composed [e11] songs [f9p]. His literary works have enriched [g4] Literature. His poems and songs played a great role [h1p] in our war of Liberation. He [i6] sang the songs of equality in his poems. He is [j2] pride, no doubt.",
    blanks: [
      { id: "a1", rule: 1, ans: "revolutionary / rebel" },
      { id: "b5p", rule: 5, ans: "relentlessly / tirelessly" },
      { id: "c10p", rule: 10, ans: "an orphan child / a prodigy" },
      { id: "d5", rule: 5, ans: "his" },
      { id: "e11", rule: 11, ans: "many" },
      { id: "f9p", rule: 9, ans: "which are loved / appreciated by all" },
      { id: "g4", rule: 4, ans: "Bengali / Bangla" },
      { id: "h1p", rule: 1, ans: "to encourage people" },
      { id: "i6", rule: 6, ans: "always" },
      { id: "j2", rule: 2, ans: "our" }
    ]
  },
  {
    id: "dinajpur-2023",
    board: "Dinajpur",
    year: 2023,
    passage: "An [a1] student is he, who has [b11] good qualities. he studies [c5p] regularly. He knows that the [d1] duty of a student is to study. So, he never neglects [e5] duty. He even makes the proper use of [f2] moment. Sabuj, [g10p] of our class is an example of a good student. Sabuj is [h3] helpful to us. I try [i1p] a boy like Sabuj. I want to be one of the [j1] stars in the class.",
    blanks: [
      { id: "a1", rule: 1, ans: "ideal" },
      { id: "b11", rule: 11, ans: "many" },
      { id: "c5p", rule: 5, ans: "regularly" },
      { id: "d1", rule: 1, ans: "main" },
      { id: "e5", rule: 5, ans: "his" },
      { id: modifierquestion.ts:112:1
      { id: "f2", rule: 2, ans: "every" },
      { id: "g10p", rule: 10, ans: "a student" },
      { id: "h3", rule: 3, ans: "very" },
      { id: "i1p", rule: 1, ans: "to be" },
      { id: "j1", rule: 1, ans: "brightest" }
    ]
  },
  {
    id: "mymensingh-2023",
    board: "Mymensingh",
    year: 2023,
    passage: "The purpose of education is to bring about [a1] changes in [b5] behaviour. It also brings changes in our lives and society [c9p]. If it fails to do so, it can't be called education. Education is not only receiving certificates and getting grades. It is [d3] more than that, we can apply our [e9] knowledge in our engagement with the world that lies [f5p]. We can do that in [g1] ways. One way is civic engagement which is [h6] appreciated all over the world. Civic engagement means working to make difference in civic life [i7p]. A person [j9p] civically is concerned about civic issues like injustice, discrimination and other forms of social ills.",
    blanks: [
      { id: "a1", rule: 1, ans: "positive / effective" },
      { id: "b5", rule: 5, ans: "our" },
      { id: "c9p", rule: 9, ans: "in which we live / where we live" },
      { id: "d3", rule: 3, ans: "much / far" },
      { id: "e9", rule: 9, ans: "acquired" },
      { id: "f5p", rule: 5, ans: "around" },
      { id: "g1", rule: 1, ans: "many / different" },
      { id: "h6", rule: 6, ans: "greatly" },
      { id: "i7p", rule: 7, ans: "of a person" },
      { id: "j9p", rule: 9, ans: "behaved" }
    ]
  },
  {
    id: "chattogram-2023",
    board: "Chattogram",
    year: 2023,
    passage: "We know that [a11] species are important for maintaining [b4] balance. If one is lost, the whole natural environment changes [c5p]. In order to protect the environment from being spoilt, we should protect [d5] wildlife. [e2] good news is that many countries are taking action [f1p]. George Lay Cock, [g10p] writes, \"Mankind must develop a concern for wild creatures and determine that [h7] wild species will not perish [i7p]. We have to save wild animals [j9p].",
    blanks: [
      { id modifierquestion.ts:135:1
      { id: "a11", rule: 11, ans: "all" },
      { id: "b4", rule: 4, ans: "environmental / ecological" },
      { id: "c5p", rule: 5, ans: "drastically / often for worse" },
      { id: "d5", rule: 5, ans: "our" },
      { id: "e2", rule: 2, ans: "The" },
      { id: "f1p", rule: 1, ans: "to protect (the wildlife)" },
      { id: "g10p", rule: 10, ans: "a famous environmentalist / author of several books on wildlife" },
      { id: "h7", rule: 7, ans: "these" },
      { id: "i7p", rule: 7, ans: "in the near future" },
      { id: "j9p", rule: 9, ans: "which are in the risk of extinction" }
    ]
  },
  {
    id: "dhaka-2019",
    board: "Dhaka",
    year: 2019,
    passage: "Arsenic is a [a1] substance. It is [b3] dangerous for human health. [c7] substance is found in the water of the tube well. There are [d11] villages in [e5] country. Most of our [f4] people drink tube well water. As a result, many of them are suffering from the arsenic problem. This problem is [g6] found in North Bengal. We should take proper measures [h1p]. Government is trying to mark the tube wells having arsenic [i8p] red colour. People should be refrained from drinking water of [j7] tube wells. Otherwise, they will suffer from arsenicosis.",
    blanks: [
      { id: "a1", rule: 1, ans: "harmful / poisonous / detrimental" },
      { id: "b3", rule: 3, ans: "very / extremely" },
      { id: "c7", rule: 7, ans: "this" },
      { id: "d11", rule: 11, ans: "many / several" },
      { id: "e5", rule: 5, ans: "some" },
      { id: "f4", rule: 4, ans: "village / common village" },
      { id: "g6", rule: 6, ans: "mostly / usually / unexpectedly / nowadays" },
      { id: "h1p", rule: 1, ans: "to remain save / to remove this problem / to purify the water" },
      { id: "i8p", rule: 8, ans: "painting" },
      { id: "j7", rule: 7, ans: "those / these" }
    ]
  },
  {
    id: "rajshahi-2019",
    board: "Rajshahi",
    year: 2019,
    passage: "Taking food is essential. We take food [a1p]. We can not survive on earth if we do not take food. In fact [b11] living beings need to take food. But it is a matter of great regret that [c5] food is being adulterated. [d4] adulteration is increasing [e3] alarmingly that we cannot stop it. [f2] dishonest businessmen use [g1] chemicals in food and fruits to make illegal and quick money. But they do not think about [h5] health. [i8] adulterated food, people get sick. They are often attacked with different fatal diseases. So [j8] food safety is a must today.",
    blanks: [
      { id: "a1p", rule: 1, ans: "to survive / to live" },
      { id: "b11", rule: 11, ans: "all / every" },
      { id: "c5", rule: 5, ans: "our" },
      { id: "d4", rule: 4, ans: "Food" },
      { id: "e3", rule: 3, ans: "so" },
      { id: "f2", rule: 2, ans: "Some" },
      { id: "g1", rule: 1, ans: "harmful" },
      { id: "h5", rule: 5, ans: "our" },
      { id: "i8", rule: 8, ans: "Taking / Eating" },
      { id: "j8", rule: 8, ans: "ensuring" }
    ]
  },
  {
    id: "cumilla-2019",
    board: "Cumilla",
    year: 2019,
    passage: "Newspaper plays a very [a1] role in modern civilization. It publishes news and views of home and abroad. Only [b1] knowledge is not enough in this competitive world. A newspaper helps a man [c1p] his general knowledge. Besides academic books, one should read newspapers [d5p]. The newspaper helps one [e1p] the facts of the world. [f8] regularly, one can be aware of everything. There are [g1] kinds of newspaper. One should select the newspaper [h5p]. One should choose the [i1] paper because many newspapers present news partially. Whatever the paper is, it [j6] helps a man.",
    blanks: [
      { id: "a1", rule: 1, ans: "significant / important" },
      { id: "b1", rule: 1, ans: "bookish" },
      { id: "c1p", rule: 1, ans: "to increase / to enrich" },
      { id: "d5p", rule: 5, ans: "everyday / regularly" },
      { id: "e1p", rule: 1, ans: "to know" },
      { id: "f8", rule: 8, ans: "Reading newspaper" },
      { id: "g1", rule: 1, ans: "different / various" },
      { id: "h5p", rule: 5, ans: "properly / rightly / justly / wisely" },
      { id: "i1", rule: 1, ans: "impartial" },
      { id: "j6", rule: 6, ans: "always / really / actually / truly" }
    ]
  },
  {
    id: "jashore-2019",
    board: "Jashore",
    year: 2019,
    passage: "Air and water are the most [a1] elements of the environment. But we pollute them [b5p]. Mills and factories use fuel [c1p] their products. The burning of this fuel creates smoke [d6p]. Motor vehicles also pollute the air, [e10p]. Water is polluted by [f11] kinds of waste and filth. We pollute water [g3p] into water. Farmers use [h1] fertilizers and insecticides and pollute water. [i9] water is [j3] harmful to health.",
    blanks: [
      { id: "a1", rule: 1, ans: "essential / valuable" },
      { id: "b5p", rule: 5, ans: "indiscriminately" },
      { id: "c1p", rule: 1, ans: "to manufacture" },
      { id: "d6p", rule: 6, ans: "on a large scale / hugely / enormously" },
      { id: "e10p", rule: 10, ans: "an important element of our environment" },
      { id: "f11", rule: 11, ans: "all / various / different" },
      { id: "g3p", rule: 3, ans: "throwing waste" },
      { id: "h1", rule: 1, ans: "chemical" },
      { id: "i9", rule: 9, ans: "Polluted / Contaminated" },
      { id: "j3", rule: 3, ans: "very" }
    ]
  },
  {
    id: "chattogram-2019",
    board: "Chattogram",
    year: 2019,
    passage: "We can’t think of our existence without language. It plays a [a3] important role in our life. We use language from the time we wake up [b7p] till we go to bed at night. We use language not only in our [c1] hours but also in our dreams. We use language [d1p] what we feel and to say what we like or dislike. We also use language [e1p] information. Language is [f3] present in our life. It is an [g1] part of our life. As an [h1] nation, we also have a language. But we had to struggle [i5p] to establish the right of our language. Many [j1] sons sacrificed their lives for the language.",
    blanks: [
      { id: "a3", rule: 3, ans: "very" },
      { id: "b7p", rule: 7, ans: "in the morning" },
      { id: "c1", rule: 1, ans: "walking" },
      { id: "d1p", rule: 1, ans: "to express" },
      { id: "e1p", rule: 1, ans: "to get / convey / exchange" },
      { id: "f3", rule: 3, ans: "ever / always" },
      { id: "g1", rule: 1, ans: "essential / integral" },
      { id: "h1", rule: 1, ans: "independent" },
      { id: "i5p", rule: 5, ans: "hard" },
      { id: "j1", rule: 1, ans: "valiant" }
    ]
  },
  {
    id: "sylhet-2019",
    board: "Sylhet",
    year: 2019,
    passage: "A library is a [a1] of knowledge. The students [b8] to all classes visit it in their library periods. Our college library is housed in two rooms. [c11] almirahs are placed in one room. The other room is the [d9] room where magazines, journals and newspapers are placed. There are about five thousand books in our library which are arranged [e5p]. Any type of book can be traced in no time. The books cater to the needs and interests [f7p]. There are two separate sections in the library. One of them contains reference books like [g4] etc. The other section contains books [h7p]. Every student has a library [i4]. The reading room is always crowded [j5p] in the afternoon.",
    blanks: [
      { id: "a1", rule: 1, ans: "store house" },
      { id: "b8", rule: 8, ans: "coming" },
      { id: "c11", rule: 11, ans: "Some / Several" },
      { id: "d9", rule: 9, ans: "reading" },
      { id: "e5p", rule: 5, ans: "systematically" },
      { id: "f7p", rule: 7, ans: "students / of the readers" },
      { id: "g4", rule: 4, ans: "dictionaries / encyclopedias" },
      { id: "h7p", rule: 7, ans: "of academic categories" },
      { id: "i4", rule: 4, ans: "card" },
      { id: "j5p", rule: 5, ans: "mainly / generally" }
    ]
  },
  {
    id: "barishal-2019",
    board: "Barishal",
    year: 2019,
    passage: "The roads [a9p] are beset with problems. [b1] driving is one of them. Most of the drivers are not [c3] trained. They are not well educated. They can [d6] put their signature and read Bengali. They are indifferent to [e4] life. They do not realize that life is [f2] valuable than time. They drive [g5p]. They do [h6] drive consciously. Even they themselves are not conscious of [i5] own lives. They drive [j6p] and try to overtake others.",
    blanks: [
      { id: "a9p", rule: 9, ans: "running across the country" },
      { id: "b1", rule: 1, ans: "Reckless" },
      { id: "c3", rule: 3, ans: "well" },
      { id: "d6", rule: 6, ans: "hardly / not" },
      { id: "e4", rule: 4, ans: "public" },
      { id: "f2", rule: 2, ans: "more" },
      { id: "g5p", rule: 5, ans: "recklessly / desperately / inconsiderately" },
      { id: "h6", rule: 6, ans: "not" },
      { id: "i5", rule: 5, ans: "their" },
      { id: "j6p", rule: 6, ans: "very fast / very quickly / very desperately / very speedily" }
    ]
  },
  {
    id: "dinajpur-2019",
    board: "Dinajpur",
    year: 2019,
    passage: "Bangladesh is a [a1] country. Though it is a small country, it has a [b1] population. People [c6] depend on agriculture. They grow different kinds of crops [d6p]. We earn [e4] currencies by exporting some of these crops. We are also rich in [f1] resources. Now, we are able [g1p] natural gas from underground. Our industries are also rising [h5p]. We export [i4] products to the developed countries. In this regard, we have already earned a [j1] reputation.",
    blanks: [
      { id: "a1", rule: 1, ans: "small" },
      { id: "b1", rule: 1, ans: "large" },
      { id: "c6", rule: 6, ans: "mainly / basically" },
      { id: "d6p", rule: 6, ans: "throughout the year" },
      { id: "e4", rule: 4, ans: "foreign" },
      { id: "f1", rule: 1, ans: "natural" },
      { id: "g1p", rule: 1, ans: "to dig out" },
      { id: "h5p", rule: 5, ans: "rapidly" },
      { id: "i4", rule: 4, ans: "garment" },
      { id: "j1", rule: 1, ans: "good" }
    ]
  },
  {
    id: "combined-kh-2018",
    board: "Combined",
    year: 2018,
    passage: "Television has become the most common and [a1] source of entertainment of the [b1] world. A wide range of programs of [c1] interest is telecast on [d11] channels. Almost every middle class and even working-class families have a television set today. [e4] programs are [f3] entertaining. They can be [g3] educative too. Courses [h9p] by the Open University are shown on BTV. [i11] channels like the Discovery Channel and the National Geographic Channel telecast highly informative programs. However, watching TV has become [j10] addiction for many.",
    blanks: [
      { id: "a1", rule: 1, ans: "widespread / great / popular" },
      { id: "b1", rule: 1, ans: "present / current" },
      { id: "c1", rule: 1, ans: "varied / various" },
      { id: "d11", rule: 11, ans: "numerous" },
      { id: "e4", rule: 4, ans: "Various Television" },
      { id: "f3", rule: 3, ans: "very / highly" },
      { id: "g3", rule: 3, ans: "highly" },
      { id: "h9p", rule: 9, ans: "run / conducted" },
      { id: "i11", rule: 11, ans: "several / some / many" },
      { id: "j10", rule: 10, ans: "an" }
    ]
  },
  {
    id: "combined-kha-2018",
    board: "Combined",
    year: 2018,
    passage: "Kazi Nazrul Islam is called the Shelley of Bengali Literature. He was a [a1] poet. He wrote [b5p] in every branch of Bengali Literature. Nazrul, [c10p], won the attention of everyone in his early childhood. He wrote ceaselessly until the death of [d5] poetic flair. He composed his songs [e1p]. His songs are [f3] melodious. He enriched the Bengali Literature [g6]. His literary works have enriched [h4] literature. He was [i10] secular poet. He sang the songs of equality [j6p].",
    blanks: [
      { id: "a1", rule: 1, ans: "famous / great / rebel / renowned" },
      { id: "b5p", rule: 5, ans: "almost / extensively / profusely" },
      { id: "c10p", rule: 10, ans: "our national poet / a rebel poet / a small boy" },
      { id: "d5", rule: 5, ans: "his" },
      { id: "e1p", rule: 1, ans: "to inspire people" },
      { id: "f3", rule: 3, ans: "very / highly" },
      { id: "g6", rule: 6, ans: "greatly / vastly" },
      { id: "h4", rule: 4, ans: "Bangla / Bengali" },
      { id: "i10", rule: 10, ans: "a" },
      { id: "j6p", rule: 6, ans: "throughout his life / in a loud voice" }
    ]
  },
  {
    id: "dhaka-2017",
    board: "Dhaka",
    year: 2017,
    passage: "Deforestation means cutting down of trees [a5p]. To meet up the basic needs of food and housing, trees are being cut in large scale and thus it causes [b4] imbalance. Besides, there are some dishonest people who cut trees in our forest [c1p]. The [d4] level is rising and many parts of the world are going to be engulfed by the sea in near future. New areas of the world are [e8] turned turned into desert as a result of deforestation. So, we must stop [f3p] down trees unnecessarily. [g8] trees indiscriminately will be hazardous for our future existence. If we destroy trees [h6p] one day the country will turn into a great dessert. The [i9] temperature will cause the greenhouse effect. Necessary measures should be taken [j1p].",
    blanks: [
      { id: "a5p", rule: 5, ans: "indiscriminately" },
      { id: "b4", rule: 4, ans: "ecological / environmental" },
      { id: "c1p", rule: 1, ans: "to earn their livelihood / to earn money" },
      { id: "d4", rule: 4, ans: "sea / water" },
      { id: "e8", rule: 8, ans: "being" },
      { id: "f3p", rule: 3, ans: "cutting" },
      { id: "g8", rule: 8, ans: "cutting" },
      { id: "h6p", rule: 6, ans: "in an indiscriminate way / without any consideration / in an inconsiderate manner" },
      { id: "i9", rule: 9, ans: "rising" },
      { id: "j1p", rule: 1, ans: "to stop deforestation" }
    ]
  },
  {
    id: "rajshahi-2017",
    board: "Rajshahi",
    year: 2017,
    passage: "Ayesha Begum has three sons and two daughters. Her husband was a [a1] farmer who used [b1p] on other people’s land. With great effort, they married [c5] daughters off by the time they reached teenage. The sons also started [d3p] with their father as [e1] labourers when they were old enough to help. By the time they were seventeen, they left for towns [f1p] money. At first, they used to send money to their parents [g5p] but after getting married they barely had enough to support their [h5] families. Out of desperation, Ayesha Begum started [i3p] in the village to feed her old, [j1] husband and herself.",
    blanks: [
      { id: "a1", rule: 1, ans: "landless" },
      { id: "b1p", rule: 1, ans: "to work" },
      { id: "c5", rule: 5, ans: "their" },
      { id: "d3p", rule: 3, ans: "working" },
      { id: "e1", rule: 1, ans: "day" },
      { id: "f1p", rule: 1, ans: "to earn" },
      { id: "g5p", rule: 5, ans: "occasionally" },
      { id: "h5", rule: 5, ans: "own" },
      { id: "i3p", rule: 3, ans: "begging" },
      { id: "j1", rule: 1, ans: "invalid" }
    ]
  },
  {
    id: "cumilla-2017",
    board: "Cumilla",
    year: 2017,
    passage: "A balanced diet is a good mixture of [a1] foods. It is essential for us [b1p] a healthy life. There are many benefits of eating a [c1] diet because it prevents [d2] diseases. As a result we do not get sick [e5p]. We should select [f5] diet according to our needs. We should not eat the [g1] foods for the whole week. We can keep fit [h8] a balanced diet. But it is not easy [i1p] a balanced diet. Here [j10] nutritionist can help us.",
    blanks: [
      { id: "a1", rule: 1, ans: "good / various" },
      { id: "b1p", rule: 1, ans: "to lead / to maintain" },
      { id: "c1", rule: 1, ans: "balanced" },
      { id: "d2", rule: 2, ans: "many" },
      { id: "e5p", rule: 5, ans: "easily / frequently" },
      { id: "f5", rule: 5, ans: "our" },
      { id: "g1", rule: 1, ans: "same" },
      { id: "h8", rule: 8, ans: "eating / taking" },
      { id: "i1p", rule: 1, ans: "to choose / select / combine / prepare" },
      { id: "j10", rule: 10, ans: "a" }
    ]
  },
  {
    id: "jashore-2017",
    board: "Jashore",
    year: 2017,
    passage: "A village doctor is a very [a1] person in the rural areas of Bangladesh. He is [b6] known as quack. A village doctor is not a [c1] doctor. He usually sits in a small dispensary [d5p]. He treats the patients [e3p]. A village doctor is not a [f1] man. His chamber is [g6] furnished. He cannot supply costly medicine to [h1] patients. In our country, the number of qualified doctors is [i3] few. So, a village doctor is a great friend to the [j1] villagers.",
    blanks: [
      { id: "a1", rule: 1, ans: "familiar / common" },
      { id: "b6", rule: 6, ans: "usually / commonly" },
      { id: "c1", rule: 1, ans: "skilled / qualified" },
      { id: "d5p", rule: 5, ans: "everyday / regularly" },
      { id: "e3p", rule: 3, ans: "taking small money" },
      { id: "f1", rule: 1, ans: "rich / wealth" },
      { id: "g6", rule: 6, ans: "not / poorly" },
      { id: "h1", rule: 1, ans: "critical / poor" },
      { id: "i3", rule: 3, ans: "very / quite" },
      { id: "j1", rule: 1, ans: "poor" }
    ]
  },
  {
    id: "chattogram-2017",
    board: "Chattogram",
    year: 2017,
    passage: "The people of Bangladesh have expressed their shock [a5p] at the reaction of the Pakistan Parliament. Pakistan strongly protested the execution of two [b1] collaborators who committed crimes against humanity on their own people in 1971. There is a demand for an apology from [c4] government for the crimes of its army during the liberation war of Bangladesh. Recently Pakistan’s National Assembly may be within its rights [d1p] for the execution of two collaborators. But it is quite clear to us that Pakistan always tries to erase its past history. To erase [e7] history is not easy because history continues to follow all of us. Pakistan, [f10p], cannot come out of its military influence. As a result, the country has become [g3] barbarous. So, Pakistan is going down [h5p]. The founder of Pakistan Mr Jinnah was physically [i3] weak and so, the state always tried to show its physical strength since [j5] birth.",
    blanks: [
      { id: "a5p", rule: 5, ans: "strongly / deeply" },
      { id: "b1", rule: 1, ans: "notorious / ignoble" },
      { id: "c4", rule: 4, ans: "Pakistan" },
      { id: "d1p", rule: 1, ans: "to blame / to condemn" },
      { id: "e7", rule: 7, ans: "this / that" },
      { id: "f10p", rule: 10, ans: "the mostly military ruled country" },
      { id: "g3", rule: 3, ans: "so / very" },
      { id: "h5p", rule: 5, ans: "gradually / slowly" },
      { id: "i3", rule: 3, ans: "very" },
      { id: "j5", rule: 5, ans: "its" }
    ]
  },
  {
    id: "barishal-2017",
    board: "Barishal",
    year: 2017,
    passage: "Raja, [a10p], is known to his classmates as a good student. He has [b11] good qualities. He knows that the [c1] duty of a student is to study and he never neglects [d7] duty. He prepares [e5] lessons regularly. He maintains discipline. He knows the value of time. He gets up [f5p] so that he can get enough time to study. He goes to school [g5p]. He never wastes a [h2] moment in vain. Raja is [i3] gentle. He always obeys his parents and teachers. He never mixes with [j1] boys. A student like Raja is a great asset of a nation.",
    blanks: [
      { id: "a10p", rule: 10, ans: "a school boy" },
      { id: "b11", rule: 11, ans: "some / many" },
      { id: "c1", rule: 1, ans: "prime / chief" },
      { id: "d7", rule: 7, ans: "this" },
      { id: "e5", rule: 5, ans: "his" },
      { id: "f5p", rule: 5, ans: "early" },
      { id: "g5p", rule: 5, ans: "regularly" },
      { id: "h2", rule: 2, ans: "single" },
      { id: "i3", rule: 3, ans: "very" },
      { id: "j1", rule: 1, ans: "bad" }
    ]
  },
  {
    id: "dinajpur-2017",
    board: "Dinajpur",
    year: 2017,
    passage: "Sabbir is [a10] ideal student. He prepares [b5] lessons in collaboration with his teachers. He does [c5p] in every examination as he does not waste time. He knows time once lost is lost forever. So, he utilizes every moment. During his free time, he goes to his native village. He teaches [d1] people. He wants [e1p] illiteracy from his village. [f8] illiteracy from his village, he wants to bring about massive development there. He is [g3] devoted to God. He says prayer [h11] times a day. He never tells a lie. He respects his parents very much. Other superiors are also respected by him. His father, [i10p] supports him cordially. His mother, an ideal housewife, [j6] supports him very much. Such a student like Sabbir is rarely found nowadays.",
    blanks: [
      { id: "a10", rule: 10, ans: "an" },
      { id: "b5", rule: 5, ans: "his" },
      { id: "c5p", rule: 5, ans: "very well" },
      { id: "d1", rule: 1, ans: "illiterate" },
      { id: "e1p", rule: 1, ans: "to remove" },
      { id: "f8", rule: 8, ans: "Removing" },
      { id: "g3", rule: 3, ans: "very" },
      { id: "h11", rule: 11, ans: "five" },
      { id: "i10p", rule: 10, ans: "an ideal man" },
      { id: "j6", rule: 6, ans: "also" }
    ]
  },
  {
    id: "dhaka-2016",
    board: "Dhaka",
    year: 2016,
    passage: "Rabindranath Tagore was a [a1] poet of Bengali literature. He was born in a [b1] family at Jarasanko, Kolkata. He went to school [c5p]. He wrote his [d1] verse at the age of eight. At the age of seventeen, he went to London [e1p] school there. He was put up in a lodging house under the care of a [f1] coach, Mr Scott. He was lucky [g1p] an English family of Mr Scott. He also visited the House of Parliament [h1p] Gladstone and John Bright’s debates on Irish rule. He wrote letters to Kolkata [i3p] English society. At this, his family thought that they might lose their son [j5p]. So, he was called back to Kolkata.",
    blanks: [
      { id: "a1", rule: 1, ans: "famous / great / renowned" },
      { id: "b1", rule: 1, ans: "rich / solvent" },
      { id: "c5p", rule: 5, ans: "early" },
      { id: "d1", rule: 1, ans: "first" },
      { id: "e1p", rule: 1, ans: "to attend" },
      { id: "f1", rule: 1, ans: "professional" },
      { id: "g1p", rule: 1, ans: "enough to get / to have / to find" },
      { id: "h1p", rule: 1, ans: "to listen to" },
      { id: "i3p", rule: 3, ans: "praising / admiring" },
      { id: "j5p", rule: 5, ans: "ultimately / forever" }
    ]
  },
  {
    id: "rajshahi-2016",
    board: "Rajshahi",
    year: 2016,
    passage: "It was a hot [a4] day. A [b1] crow flew all over the fields looking for water. For a long time, she could not find any water. She felt [c3] weak, almost giving up hope. Suddenly, she saw a water jug below her. She flew [d5p] to see if there was any water inside. Yes, she could see some water inside the jug. The crow tried [e1p]. Sadly, she found that the neck of the jug was too narrow. Then she tried to push the jug down for the water to flow out. But she found [f7] jug too heavy. The Crow thought [g8p] what to do. [h8] she saw some pebbles nearby. She [i6] had a good idea. She started picking up the pebbles one by one, dropping each into the jug. As more and more pebbles filled the jug, the water level kept rising. Soon it was high [j1p] for the crow to drink. The crow quenched her thirst and flew away.",
    blanks: [
      { id: "a4", rule: 4, ans: "summer" },
      { id: "b1", rule: 1, ans: "thirsty" },
      { id: "c3", rule: 3, ans: "very" },
      { id: "d5p", rule: 5, ans: "down" },
      { id: "e1p", rule: 1, ans: "to drink water / to quench her thirst" },
      { id: "f7", rule: 7, ans: "this / that" },
      { id: "g8p", rule: 8, ans: "for a while" },
      { id: "h8", rule: 8, ans: "Looking around / Roaming around the field" },
      { id: "i6", rule: 6, ans: "instantly / immediately" },
      { id: "j1p", rule: 1, ans: "enough" }
    ]
  },
  {
    id: "cumilla-2016",
    board: "Cumilla",
    year: 2016,
    passage: "I had a peculiar experience [a7p] while travelling to St. Martin’s Island. I visited the island along with my family. Zahid, [b10p], was our guide. On our way to the island, we watched [c2] seagulls. The [d1] birds were flying [e5p] with the ship. They became [f3] dear and friendly to us. We entertained them with chips and biscuits. [g8] them, we became [h3] excited. We decided [i1p] in the idyllic island for a couple of days. We can never forget [j7] lovely sea birds.",
    blanks: [
      { id: "a7p", rule: 7, ans: "last year" },
      { id: "b10p", rule: 10, ans: "a local boy" },
      { id: "c2", rule: 2, ans: "they" },
      { id: "d1", rule: 1, ans: "sea" },
      { id: "e5p", rule: 5, ans: "along" },
      { id: "f3", rule: 3, ans: "very" },
      { id: "g8", rule: 8, ans: "Seeding" },
      { id: "h3", rule: 3, ans: "very" },
      { id: "i1p", rule: 1, ans: "to stay" },
      { id: "j7", rule: 7, ans: "those" }
    ]
  },
  {
    id: "jashore-2016",
    board: "Jashore",
    year: 2016,
    passage: "Most of the people in [a5] country do not know the importance of English. In fact, it is an [b1] language and we are living in a [c1] village. So, if you know English [d5p], you can communicate with [e10] rest of the world. It is surely an important element of your [f4] skill. Without the knowledge of English with proper understanding, you cannot complete [g5] higher studies because most of the books are written in English in the process of higher education. Poor knowledge of English will also hamper your [h4] development. In short, if you do not have a good command of English, you will suffer [i7p] of your life. So, don’t waste your time and try to learn English [j5p] from today.",
    blanks: [
      { id: "a5", rule: 5, ans: "our" },
      { id: "b1", rule: 1, ans: "international" },
      { id: "c1", rule: 1, ans: "global" },
      { id: "d5p", rule: 5, ans: "much / well" },
      { id: "e10", rule: 10, ans: "the" },
      { id: "f4", rule: 4, ans: "language" },
      { id: "g5", rule: 5, ans: "your" },
      { id: "h4", rule: 4, ans: "career" },
      { id: "i7p", rule: 7, ans: "in the later part" },
      { id: "j5p", rule: 5, ans: "well / right" }
    ]
  },
  {
    id: "chattogram-2016",
    board: "Chattogram",
    year: 2016,
    passage: "Once there lived a [a1] fox in a jungle. One day, while he was walking [b5p] through the jungle, he fell into a trap and lost his tail. He felt [c3] unhappy and sad. But the fox was very cunning. He hit upon a plan. He invited all the foxes [d1p] to a meeting. When all the foxes arrived, the fox without a tail said, “My dear friends, listen to me, please, I have discovered a [e1] thing. It is that our tails are [f3] useless. They look ugly and dirty. So, we all should cut off our tails, shouldn’t we?” All foxes listened to the cunning fox [g5p]. Most of them agreed [h1p] their tails. But an old and [i1] fox said to him, “My friend, your plan is nice but evil. Actually, you want to cut off our tails because you have [j2] tail of your own.”",
    blanks: [
      { id: "a1", rule: 1, ans: "clever / cunning" },
      { id: "b5p", rule: 5, ans: "alone" },
      { id: "c3", rule: 3, ans: "very" },
      { id: "d1p", rule: 1, ans: "to come" },
      { id: "e1", rule: 1, ans: "significant / wonderful" },
      { id: "f3", rule: 3, ans: "really / quite" },
      { id: "g5p", rule: 5, ans: "attentively" },
      { id: "h1p", rule: 1, ans: "to cut off" },
      { id: "i1", rule: 1, ans: "wise" },
      { id: "j2", rule: 2, ans: "no" }
    ]
  },
  {
    id: "sylhet-2016",
    board: "Sylhet",
    year: 2016,
    passage: "Othello, [a10p], had risen to become a general. He had shown his bravery in many [b1] battles against the Turks. Everyone praised him [c5p] and the senate trusted and honoured him. Brabantio, a rich senator of Venice had a daughter named Desdemona [d9p]. Brabantio [e6] invited Othello to his house where he and his daughter listened in wonder to Othello as he spoke about his adventures. He told them of deserts, of caves and of mountains high [f3] to touch the sky. Desdemona had to weep [g3p] and she never became tired of listening to it. She pitied Othello [h5p] for the misfortunes and hardships of his life. Her pity [i5p] turned to love. She refused all the young men [j1p] because she loved Othello, a noble Muslim Moor from North Africa.",
    blanks: [
      { id: "a10p", rule: 10, ans: "a noble Muslim Moor" },
      { id: "b1", rule: 1, ans: "fierce" },
      { id: "c5p", rule: 5, ans: "highly" },
      { id: "d9p", rule: 9, ans: "who was very beautiful and intelligent" },
      { id: "e6", rule: 6, ans: "often" },
      { id: "f3", rule: 3, ans: "enough" },
      { id: "g3p", rule: 3, ans: "hearing his adventure / listening to his stories" },
      { id: "h5p", rule: 5, ans: "much / great" },
      { id: "i5p", rule: 5, ans: "finally / soon / ultimately" },
      { id: "j1p", rule: 1, ans: "to marry" }
    ]
  },
  {
    id: "dinajpur-2016",
    board: "Dinajpur",
    year: 2016,
    passage: "Water is a [a1] substance. It has no colour of [b5] own. The [c2] name of water is life. By drinking water, we can quench [d5] thirst. Thus we can survive on earth. But [e1] water is life killing. By drinking contaminated water, we suffer from diseases like diarrhoea, typhoid etc. We may [f6] face [g1] death by drinking such type of water. We are responsible for [h4] pollution. Waste materials from mills and factories are thrown here and there. Farmers use fertilizers and insecticides on their land. During the rainy season, they are mixed with ponds and rivers. Besides, latrines [i9p] on ponds and rivers cause water pollution. [j1] awareness should be raised to stop water pollution.",
    blanks: [
      { id: "a1", rule: 1, ans: "liquid" },
      { id: "b5", rule: 5, ans: "its" },
      { id: "c2", rule: 2, ans: "other" },
      { id: "d5", rule: 5, ans: "our" },
      { id: "e1", rule: 1, ans: "impure / contaminated" },
      { id: "f6", rule: 6, ans: "even" },
      { id: "g1", rule: 1, ans: "unexpected / sudden" },
      { id: "h4", rule: 4, ans: "water" },
      { id: "i9p", rule: 9, ans: "build / standing" },
      { id: "j1", rule: 1, ans: "Public / Social" }
    ]
  }
];
