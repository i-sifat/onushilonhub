// Centralized Connectors Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

export interface ConnectorRule {
  id: number;
  ruleNo: string;
  title: string;
  description: string;
  structure?: string;
  examples: string[];
}

export const connectorsRules: ConnectorRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "As a result/ for this/ for this reason/ that is why/ this is why/ thus/ as a consequence/ consequently/ therefore/ so/ hence কারণে/ফলে/এভাবে/তাই",
    description: "Clause/ Sentence দ্বারা কোনো কিছুর কারণ বোঝালে সেই কারণে সংঘটিত প্রভাবের আগে উপরোক্ত Linkers-গুলো ব্যবহূত হয়",
    structure: "Cause + As a result/Therefore/So + Effect",
    examples: [
      "Bangladesh is a small country. So, she cannot house her large population.",
      "Many dishonest businessmen hoard the daily commodities. As a result, the prices of them lie at an imbalanced rate.",
      "Jubaer walked slowly. For this/ For this reason/ That is why/ Thus/ Therefore/ he failed to reach the station in time.",
      "Despite my warning he violated my instruction. As a consequence/ Consequently/ Hence/ Therefore/ For this/ For this reason/ That is why/ Thus/ As a result/ So, he had to suffer much."
    ]
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "In short/ in brief/ in a few words/ in a word/ in a nutshell/ in fine/ in conclusion/ to sum up/ to summarize/ on the whole সংক্ষেপে/ এককথায় বলতে গেলে",
    description: "পূর্বে আলোচিত কোনো বক্তব্যের ইতি টানতে তার পূর্বে এই Linkers-গুলো ব্যবহূত হয়",
    structure: "Discussion + In short/In conclusion + Summary",
    examples: [
      "His whole family depends on him. He is the only earning member of his family. In a word, he is the umbrella of his family.",
      "Bangladesh is a small country. She has a large population. She cannot ensure the basic rights of her citizens. People are mostly poor here. Most of them are illiterate. In short/ In brief/ In a word/ In a nutshell/ In fine/ In conclusion/ To conclude/ To sum up/ To summarize/ On the whole, Bangladesh is burdened with many problems."
    ]
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "In other words/ in the other way অন্য কথায়/ অন্যভাবে বলতে গেলে",
    description: "কোনো বক্তব্যকে একবার লিখে একই বক্তব্যকে অন্যভাবে প্রকাশ করতে হলে এই Linkers-গুলো ব্যবহূত হয়",
    structure: "Statement + In other words + Rephrased statement",
    examples: [
      "The students do not try to understand English. In other words, they are going from bad to worse.",
      "His crazy activities were crossing all limits. In other words, he was almost mad.",
      "Many students do not prepare themselves for the examination. In other words/ in the other way, they adopt unfair means in the examination."
    ]
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Moreover/ besides/ in addition/ in addition to that/ further more/ in addition to/ again তা ছাড়া/ অধিকন্তু/ আবার",
    description: "আগের বক্তব্যের সঙ্গে আরও বক্তব্য সংযুক্ত করতে এই Linkers-গুলো ব্যবহূত হয়",
    structure: "Statement + Moreover/Besides + Additional statement",
    examples: [
      "The man has a big flat. Besides this, he has a car.",
      "Our country is a beautiful country. Moreover, she is full of natural resources.",
      "Besides a colour television, the bridegroom demanded a motorcycle.",
      "Bangladesh is a small country. It has a huge population. Poverty is its main problem. Moreover/ Besides/ In addition to that/ In addition/ Furthermore/ Again natural disasters have become its part and parcel."
    ]
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "And/ as well as/ along with/ together with এবং",
    description: "এ ধরনের linker দুটি noun/ verb/ adjective/ adverb/preposition-এর মাঝে সংযোজক হিসেবে ব্যবহূত হয়",
    structure: "Element 1 + And/As well as + Element 2",
    examples: [
      "Sumon together with Lalchand came to my office.",
      "The teacher as well as the students was present.",
      "The students went to the principal and demanded new facilities in their college library.",
      "The boy as well as his brothers has come.",
      "Mr. Hassan along with his son visited our house."
    ]
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Not only … but also শুধু নয় … আরও",
    description: "দুটি বিষয়, বস্তু, ঘটনা ইত্যাদির শুধু একটি নয়, অপরটিও হয়—এমন বোঝাতে প্রথমটির আগে not only এবং পরেরটির আগে but also বসে",
    examples: [
      "Not only Tanny but also Tania is now going to America this year.",
      "The boy is not only lazy but also dirty.",
      "Faruk not only reads novels but also plays tennis.",
      "Shamim works not only irregularly but also carelessly.",
      "Minhaj is not only a student but also a business man."
    ]
  },
  {
    id: 7,
    ruleNo: "Rule 7",
    title: "Either … or হয় … অথবা",
    description: "দুটির/ দুজনের মধ্যে হয় একটি/ একজন অথবা অন্যটি/ অন্যজন—এ রকম বোঝাতে এ linker ব্যবহূত হয়",
    examples: [
      "Either I or my friend will raise the flag.",
      "Either he or his brothers are guilty.",
      "You can either study or sleep.",
      "Either Maliha or Samia will present the meeting.",
      "He is either mad or foolish."
    ]
  },
  {
    id: 8,
    ruleNo: "Rule 8",
    title: "Neither … nor এটাও নয় … ওটাও নয়",
    description: "দুটি বিষয়ের/ বস্তুর বা দুই ব্যক্তির কেউই নয়/ কোনটিই নয়—এমন বোঝাতে এই linker ব্যবহূত হয়",
    examples: [
      "Neither Rana nor his sister passed.",
      "Neither the teachers nor the students were present.",
      "Neither you nor he is responsible.",
      "Neither the teachers nor the students missed the programme in the college.",
      "He neither did the work nor asked others to do this."
    ]
  },
  {
    id: 9,
    ruleNo: "Rule 9",
    title: "Both … and … এবং … উভয়েই/ উভয়টিই",
    description: "দুটি বস্তু/ বিষয় বা দুই ব্যক্তি/ পক্ষের উভয়টি/ উভয়কেই বোঝাতে এই linker ব্যবহূত হয়",
    examples: [
      "Both my friend and cousin came on the occasion of my birthday.",
      "I took both accounting and marketing as my major courses.",
      "He is both honest and kind.",
      "Both Anik and Jotisko are intelligent.",
      "Both the teacher and the student were absent."
    ]
  },
  {
    id: 10,
    ruleNo: "Rule 10",
    title: "Relative pronouns: Who, which, that, what, whom, whose",
    description: "এই Pronoun-গুলো Sub-ordinating Conjunction হিসেবে দুটি পৃথক বাক্যকে একটি বাক্যে পরিণত করে",
    examples: [
      "The man who came here yesterday is my brother.",
      "This is the book which is now out of print.",
      "I do not know what they want.",
      "Mr. Kalam is a businessman who works mainly with the foreigners.",
      "This is the boy whose pen has been lost."
    ]
  },
  {
    id: 11,
    ruleNo: "Rule 11",
    title: "Participles",
    description: "কোনো Incomplete expression বা Predication-কে Complete করতে Infinitive-এর বিকল্প হিসেবে Participle-কে ব্যবহার করা যায়",
    examples: [
      "To be Infinitive. and expert singer, he tries to sing well.",
      "Being Participle. an expert singer, he tries to sing well.",
      "Being Present Participle. a man of letters, Mr. Kalam is working for the removal of illiteracy.",
      "Brought Past Participle. up in America, Shila likes to stick to American culture.",
      "Having completed Perfect Participle. the work, we got our payment."
    ]
  },
  {
    id: 12,
    ruleNo: "Rule 12",
    title: "Including, Consisting of, Comprising অন্তর্ভুক্ত করে",
    description: "অন্তর্ভুক্ত রয়েছে, এমন বিষয় বা বস্তুর আগে এই Linkers-গুলো ব্যবহূত হয়",
    examples: [
      "Both the schools comprising engineers and geologists do not rule out the possibility of a major earthquake.",
      "He published all his writing including his autobiography.",
      "The newly formed committee has been declared comprising the experts in archeology.",
      "The family consisting of five members live in this house.",
      "The team consisting of 11 members won the game."
    ]
  },
  {
    id: 13,
    ruleNo: "Rule 13",
    title: "At the same time/ after that/ subsequently/ then/ coincidentally একই সময়ে/ যুগপৎভাবে",
    description: "একই সময়ে সংঘটিত দুটি বিষয়ের মধ্যে এই Linkers-গুলো ব্যবহূত হয়",
    examples: [
      "Rahim was reading a book. At the same time, Karim was writing a letter to his mother.",
      "I saw the boys. They were then playing football in the school field.",
      "He told me everything. After that, I had nothing to say.",
      "He committed a blunder. Subsequently, he had to pay.",
      "It was not pre-planned. I just met him coincidentally."
    ]
  },
  {
    id: 14,
    ruleNo: "Rule 14",
    title: "At the end/ at last/ at length/ finally/ lastly/ at the eleventh hour/ eventually/ last of all অবশেষে/ সবশেষে",
    description: "ধারাবাহিক কোনো ঘটনার মধ্যে সর্বশেষ ঘটনা বা এটির আগে এই Linkers-গুলো ব্যবহূত হয়",
    examples: [
      "The old sailor prayed for seven days. At last, God took pity on the old sailor.",
      "I worked hard. I made all needful corrections in the book. I drew the attention of all the teachers of English countrywide. At the end/ At last/ At length/ Finally/ Lastly/ Last of all/ In the end, I could achieve a dramatic success.",
      "At the eleventh hour, he came to me with the request. I could not entertain it.",
      "He made useless efforts. Eventually, everything failed.",
      "The govt. should take some necessary steps to remove illiteracy from the country. Secondly, there should be an awareness making programme through out the country."
    ]
  },
  {
    id: 15,
    ruleNo: "Rule 15",
    title: "Too/ also/ as well আরও",
    description: "আরও কোনো কিছু ঘটতে পারে; অধিক ঘটনা বা বস্তুকে উল্লেখ করার পর এই Linker-গুলো ব্যবহূত হয়। তবে also-কে Sentence-এর শুরুতে, মাঝে, এমনকি শেষেও ব্যবহার করা যায়",
    examples: [
      "He needs a pen. He also needs a book.",
      "Karim is a good student. Rahim is also a good student.",
      "He is going to school today. You can go as well.",
      "He is a singer. He is an actor too.",
      "He told the matter in detail. He helped me also."
    ]
  },
  {
    id: 16,
    ruleNo: "Rule 16",
    title: "At present/ at the present time/ presently/ now a days বর্তমানে/ আজকাল",
    description: "বর্তমান সময়ে ঘটছে, এমন বোঝাতে এই Linkers-গুলো ব্যবহূত হয়",
    examples: [
      "At present, the condition of the farmers is not good at all.",
      "At present, women contribute to the society remarkably.",
      "Now a days the green house effect has appeared as a great threat to our existence.",
      "He is waiting for me for a long time. So, I have to meet him presently.",
      "At the present time I have no cash in hand."
    ]
  },
  {
    id: 17,
    ruleNo: "Rule 17",
    title: "Firstly/ secondly/ thirdly প্রথমত/ দ্বিতীয়ত",
    description: "কোনো বক্তব্যকে ধারাবাহিকভাবে লিখতে গেলে এই Linkers-গুলো ব্যবহূত হয়",
    examples: [
      "There are many ways to solve the food problem in Bangladesh. Firstly, we must sustain the present production of food. Secondly, we must control the rapid population growth. Thirdly, steps should be taken against the fragmentation of land. Fourthly, modern and scientific method of cultivation should be introduced."
    ]
  },
  {
    id: 18,
    ruleNo: "Rule 18",
    title: "But/ on the other hand/ on the contrary/ instead of that/ whereas/ in contrast কিন্তু/ অন্য দিকে",
    description: "পূর্বে লিখিত কোনো বক্তব্যের বিপরীতে কোনো বক্তব্য লিখতে গেলে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "I expected you that day. But you did not come.",
      "He is poor. Whereas his own brother is a rich business man.",
      "I do not like him. But he likes me very much.",
      "Dhaka is over-populated. On the other hand/ On the contrary/ In contrast/ In contrast with this/ whereas, Khulna is less populated.",
      "I asked him for some money. Instead of that, he gave me some advice."
    ]
  },
  {
    id: 19,
    ruleNo: "Rule 19",
    title: "Otherwise/ lest অন্যথায়/ পা�ছে",
    description: "একটি ঘটনা না ঘটলে বা একটি কাজ না হলে অন্য ঘটনাটি ঘটে বা ঘটতে পারে—এমন বোঝাতে দুটি ঘটনা বা কাজের মধ্যে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "Read attentively lest you should fail in the examination.",
      "They walked fast lest they should miss the train.",
      "Hurry up lest you should miss the bus.",
      "Do it in time. Otherwise you will be punished.",
      "Walk fast lest you should miss the train."
    ]
  },
  {
    id: 20,
    ruleNo: "Rule 20",
    title: "For instance/ for example/ such as/ like/ namely/ that is to say যেমন/ অর্থাৎ",
    description: "উদাহরণ হিসেবে কিছু তথ্য যোগ করতে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "People of the developing country do not enjoy their basic right such as freedom of movement, freedom of speech etc.",
      "Bangladesh is a developing country. Its GDP rate is growing very fast. For instance/ For example, it is earning a huge amount of foreign currency from its various sectors namely man-power, garments and leather. That is to say, it has achieved a dramatic output from these sectors. Other sectors are also promising like these sectors such as jute, handicrafts, shrimps etc."
    ]
  },
  {
    id: 21,
    ruleNo: "Rule 21",
    title: "First of all/ initially/ primarily/ in the beginning/ at the start/ in the first place সর্ব প্রথম/ শুরুতে",
    description: "ধLEGEND: ধারাবাহিক/ পর্যায়ক্রমিক বক্তব্যকে লিখতে গেলে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "Some steps should be taken to control population in the beginning.",
      "Some steps should be taken to control traffic in Dhaka city.",
      "First of all/ In the first place any violation of traffic signal must be taken seriously.",
      "Initially/ At the start/ Primarily/ In the beginning, it might be difficult."
    ]
  },
  {
    id: 22,
    ruleNo: "Rule 22",
    title: "Always/ usually/ generally/ as usual/ most often/ very often/ frequently/ sometimes/ at times সর্বদা/ সাধারণত/ প্রায়ই/ মাঝেমধ্যে",
    description: "যে ঘটনা সর্বদা বা প্রায়ই বা মাঝেমধ্যে ঘটে, যে বৈশিষ্ট্য কোনো ব্যক্তি বা বিষয়ের জন্য প্রায়ই সত্য, সেই ঘটনা বা বৈশিষ্ট্যসম্পন্ন বাক্যে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "I do not like him. But he comes here frequently.",
      "Nothing can cure him. He takes drugs frequently.",
      "They have defeated us this time. They cannot defeat us always.",
      "He is a very simple and polite man as usual.",
      "He usually/ always/ generally/ as usual/ most often/ very often/ often/ sometimes/ at times gets up from bed early in the morning."
    ]
  },
  {
    id: 23,
    ruleNo: "Rule 23",
    title: "After পরে",
    description: "দুটি কাজ বা ঘটনার মধ্যে যেটি আগে হয়েছে বা হয় বা হবে, তার আগে After বসে",
    examples: [
      "The students came to college after the bell had rung.",
      "The patient died after the doctor had come.",
      "After he had passed his M.A. he joined a multinational company.",
      "His father died after he had left the hospital.",
      "We reached the station after the train had left."
    ]
  },
  {
    id: 24,
    ruleNo: "Rule 24",
    title: "Before/ prior to that পূর্বে",
    description: "পূর্বে হয়েছে, এমন কাজ বা ঘটনাকে পরে ঘটেছে এমন কাজ বা ঘটনার সঙ্গে যুক্ত করতে before ব্যবহার করা হয়",
    examples: [
      "The patient had died before the doctor came.",
      "We had reached the station before the train left.",
      "The sun had set before we reached home.",
      "Before the doctor came, the patient had died.",
      "They talked to us. Prior to that, they invited us."
    ]
  },
  {
    id: 25,
    ruleNo: "Rule 25",
    title: "Thus/ in this way এভাবে",
    description: "কোনো ঘটনা কীভাবে ঘটে বা ঘটেছে, তার বিবরণপরবর্তী সময়ে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "Most of the people of our country are illiterate. Many of them are lazy and inactive. In this way, they become poor.",
      "They went to the station. They booked some tickets there. Then they reached the station on the certain day. Thus they started their train journey."
    ]
  },
  {
    id: 26,
    ruleNo: "Rule 26",
    title: "When/ while যখন",
    description: "একই সময়ে সংঘটিত দুটি কাজের একটির আগে এ ধরনের Linker বসে। While-পরবর্তী Clause-টি সাধারণত Continuous-এর হয়",
    examples: [
      "When I came to college, I saw him.",
      "While I was sleeping, the phone rang.",
      "He met me while I was going to market.",
      "When it was summer, we went on a tour.",
      "When the train had left, we reached the station."
    ]
  },
  {
    id: 27,
    ruleNo: "Rule 27",
    title: "However/ nevertheless/ after all যা-ই হোক, মোটের ওপর",
    description: "আগে লেখা কোনো বক্তব্যের সাপেক্ষে কিছুটা বা পুরোপুরি বিপরীত বা আরও গুরুত্বপূর্ণ কিছু লিখতে চাইলে তার আগে এই Linker-গুলো ব্যবহূত হয়",
    examples: [
      "You should not disobey him. After all, he is your father.",
      "You are so late. However, you can start your work now.",
      "Television has some demerits. Nevertheless, it is considered to be a wonder of modern science.",
      "You cannot dishonour him. After all, he is your senior.",
      "I invited him. Nevertheless, he did not attend the function."
    ]
  },
  {
    id: 28,
    ruleNo: "Rule 28",
    title: "In case/ in any case যদি/ যেকোনো অবস্থায়",
    description: "যদি অথবা যেকোন অবস্থায় কোনো কিছু করা হয়/ হয়েছিল/ হবে বুঝালে এই Linkers ব্যবহূত হয়",
    examples: [
      "In case you come, I will go there.",
      "In case of emergency, you may call me.",
      "In any case, I will attend the meeting."
    ]
  },
  {
    id: 29,
    ruleNo: "Rule 29",
    title: "Really/ actually/ indeed/ in fact/ of course অবশ্যই, প্রকৃতপক্ষে, বস্তুত",
    description: "কোনো বক্তব্যের ভিত্তি সম্পর্কে নিশ্চয়তা বা সত্যতা বা গুরুত্বের যথার্থতা প্রকাশে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "Nobody respects Mr. Rashed. In fact, he is not an honest man.",
      "He was silent despite all my questions. Actually/ Indeed/ In fact/ Really, he had nothing to say.",
      "Bangladesh has to solve the problem of poverty. Of course, it is possible through sincere and pragmatic efforts and steps."
    ]
  },
  {
    id: 30,
    ruleNo: "Rule 30",
    title: "Another/ the other/ the latter অন্যটি, পরবর্তীটি",
    description: "দুটি বিষয়/ বস্তু/ দুজন ব্যক্তির মধ্যে পরবর্তীটি বা পরবর্তীজনের আগে এই Linkers-গুলো ব্যবহূত হয়",
    examples: [
      "Kamal and Hassan are very bright students. The latter is also a good player.",
      "There are two most important causes of sound pollution. One is the growth of urban population. The other is the increasing use of machines in our everyday life."
    ]
  },
  {
    id: 31,
    ruleNo: "Rule 31",
    title: "Rather বরং",
    description: "কোনো কিছুতে জোর দেওয়ার জন্য এই Linker-টি ব্যবহার করা হয়",
    examples: [
      "You would rather starve than steal.",
      "I would rather die than beg.",
      "Bangladesh is not a rich country. Rather, it is a poor country."
    ]
  },
  {
    id: 32,
    ruleNo: "Rule 32",
    title: "Similarly, in the same way, alike অনুরূপভাবে/ একইভাবে",
    description: "আগে কোনো কিছু লেখা হয়েছে, তার সঙ্গে মিল রেখে কিছু ঘটছে বা ঘটবে—এমন কিছু লিখতে এই Linkers-গুলো ব্যবহূত হয়",
    examples: [
      "Shamim turned the wheel. Similarly, his brother did.",
      "You have done the work nicely. He has done the work similarly/ in the same way.",
      "You should address the problem immediately. We should do alike."
    ]
  },
  {
    id: 33,
    ruleNo: "Rule 33",
    title: "According to/ in accordance with/ accordingly অনুসারে/ অনুযায়ী",
    description: "আগের কোনো কাজ/ ঘটনা/ বিষয়বস্তুর সঙ্গে তাল মিলিয়ে কোনো কাজ/ ঘটনা সম্পাদিত হলে এই Linkers ব্যবহূত হয়",
    examples: [
      "According to me, Khaled is not only a good student but also a good player.",
      "I talked to them according to the instruction of my boss.",
      "In accordance with the UNESCO’S declaration, International Mother Language Day is celebrated all over the world."
    ]
  },
  {
    id: 34,
    ruleNo: "Rule 34",
    title: "Till/ until পর্যন্ত/ যে পর্যন্ত না",
    description: "পর্যন্ত অর্থে Till এবং যে পর্যন্ত না অর্থে Until ব্যবহূত হয়",
    examples: [
      "Pray to Allah till the sunrise.",
      "Study hard till you learn the lesson.",
      "He was working until I come back."
    ]
  },
  {
    id: 35,
    ruleNo: "Rule 35",
    title: "Still/ till now/ even now এখনো/ এখন পর্যন্ত",
    description: "এখনো বা এখন পর্যন্ত চলছে, তা বোঝাতে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "The teacher is discussing the importance of learning English even now.",
      "He is still sleeping. Till now, he has not finished the work.",
      "We are discussing the problem even now."
    ]
  },
  {
    id: 36,
    ruleNo: "Rule 36",
    title: "Suddenly/ all on a sudden হঠাৎ",
    description: "হঠাৎ ঘটে যাওয়া কোনো কাজ বা ঘটনার পূর্বে বা পরে এই Linkers-গুলো ব্যবহূত হয়",
    examples: [
      "That day we were reading in our room. Suddenly, we heard them crying.",
      "We were walking along the street. Suddenly a man came to us running.",
      "The man jumped into the river and drowned. This happened all on a sudden."
    ]
  },
  {
    id: 37,
    ruleNo: "Rule 37",
    title: "If/ even if/ unless যদি/ এমনকি যদি/ যদি না",
    description: "যদি/ এমনকি যদি/ যদি না অর্থ প্রকাশ করতে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "If I had enough money, I would establish a college in my village.",
      "Unless you work hard you will not shine in life.",
      "You won’t be paid unless you do your duty well."
    ]
  },
  {
    id: 38,
    ruleNo: "Rule 38",
    title: "Above all সর্বোপরি",
    description: "সামগ্রিকভাবে কোনো কিছুকে প্রাধান্য দিয়ে লিখতে গেলে এই Linker ব্যবহূত হয়",
    examples: [
      "Above all, he was a very honest man.",
      "There was a remarkable turn out in the last Parliamentary election. Above all, people enjoyed the election as a celebration."
    ]
  },
  {
    id: 39,
    ruleNo: "Rule 39",
    title: "Undoubtedly/ no doubt/ surely/ of course/ certainly/ truly speaking নিঃসন্দেহে/ নিশ্চিতভাবে/ অবশ্যই",
    description: "নিঃসন্দেহে/ নিশ্চিতভাবে/ অবশ্যই—এমন বক্তব্য প্রকাশ করতে এ ধরনের Linkers ব্যবহূত হয়",
    examples: [
      "Undoubtedly you are wrong.",
      "Undoubtedly/ no doubt/ surely/ It is needless to say that/ It needs no telling that/ truly speaking, almost all the countries of the world are under a constant threat of terrorism."
    ]
  },
  {
    id: 40,
    ruleNo: "Rule 40",
    title: "Whoever যে-ই হোক",
    description: "কোনো ব্যক্তির ব্যক্তিপরিচয় অনিশ্চিত হলে এই Linker-টি তার পূর্বে ব্যবহূত হয়",
    examples: [
      "Whoever is present here, he/she should listen to our request.",
      "Whoever you are, I won’t respect you."
    ]
  },
  {
    id: 41,
    ruleNo: "Rule 41",
    title: "Unfortunately/ unluckily দুর্ভাগ্যজনকভাবে",
    description: "কোনো ঘটনা বা বিষয় দুর্ভাগ্যজনক হলে তা প্রকাশে এই Linker ব্যবহূত হয়",
    examples: [
      "We went to meet the Principal. Unfortunately, we did not get him at his office.",
      "He was missing. Luckily/ Fortunately, I found him in a park.",
      "I walked fast. Unluckily, I missed the train."
    ]
  },
  {
    id: 42,
    ruleNo: "Rule 42",
    title: "Whatever যা-ই হোক",
    description: "কোনো বিষয়/ বস্তুর পরিচয় অনিশ্চিত হলে তার পূর্বে এই Linker-টি ব্যবহূত হয়",
    examples: [
      "Whatever you want, it must be legal.",
      "Whatever your ambition is, it should be honest.",
      "Whatever he wants can never be met."
    ]
  },
  {
    id: 43,
    ruleNo: "Rule 43",
    title: "In order to/ to উদ্দেশে",
    description: "যে কাজের উদ্দেশে কোনো কিছু করা হবে বা হয় বা হয়েছে, উদ্দেশ-প্রকাশক সেই Verb-এর আগে in order to/ to বসে",
    examples: [
      "She went to market in order to buy a book.",
      "Many people go abroad in order to enjoy better opportunities.",
      "He came here in order to talk to us."
    ]
  },
  {
    id: 44,
    ruleNo: "Rule 44",
    title: "So that/ in order that যাতে",
    description: "উদ্দেশ-প্রকাশক Sub-ordinate Clause-এর আগে এ ধরনের Linker ব্যবহার করে Principal Clause-এর সঙ্গে যুক্ত করা হয়",
    examples: [
      "He is reading attentively so that he can get GPA-5.",
      "The man started his journey earlier so that he might reach his destination in time.",
      "Della sold her hair in order that she could buy a gift for her husband."
    ]
  },
  {
    id: 45,
    ruleNo: "Rule 45",
    title: "That যে/ যা/ যেটা",
    description: "যে/ যা/ যেটা বুঝিয়ে এই Linker ব্যবহূত হয়",
    examples: [
      "We know that he is a freedom fighter.",
      "That the man is dishonest is known to all.",
      "We know that he is a godfather.",
      "It is said that honesty is the best policy."
    ]
  },
  {
    id: 46,
    ruleNo: "Rule 46",
    title: "Whether/ whether … or কিনা",
    description: "নিশ্চিত নয়, এমন বিষয়, বস্তু, ঘটনা বা ব্যক্তির আগে এই Linker-টি ব্যবহূত হয়",
    examples: [
      "I do not know whether she will come or not.",
      "The man asked me whether I had completed the work.",
      "I do not know whether he is honest or dishonest."
    ]
  },
  {
    id: 47,
    ruleNo: "Rule 47",
    title: "Whenever যখনই হোক",
    description: "অনিশ্চিত সময়-প্রকাশক ঘটনা, কাজ বা কালের পূর্বে এই Linker-টি ব্যবহূত হয়",
    examples: [
      "Whenever you need me, just make a phone call.",
      "Inform him of the matter whenever he comes."
    ]
  },
  {
    id: 48,
    ruleNo: "Rule 48",
    title: "Wherever যেখানেই হোক",
    description: "অনির্ধারিত বা অজ্ঞাত স্থানকে প্রকাশ করতে এই Linker-টি ব্যবহার করা হয়",
    examples: [
      "Wherever he goes for help, nobody helps him.",
      "Wherever you go, I will always be with you."
    ]
  },
  {
    id: 49,
    ruleNo: "Rule 49",
    title: "As/ since/ because/ because of/ for/ on account of/ due to/ owing to যেহেতু/ কারণে",
    description: "যেহেতু/ কারণে প্রকাশক Clause-এর পূর্বে এই Linker-গুলো ব্যবহূত হয়",
    examples: [
      "I could not go out because of/ owing to the heavy rainfall.",
      "As/ since the weather was rough, we cancelled our journey.",
      "Because of his hard labour and perseverance, Ismail Hossain succeeded in life.",
      "I went to his house because/ as/ for I was invited.",
      "I could not go to school on account of my illness."
    ]
  },
  {
    id: 50,
    ruleNo: "Rule 50",
    title: "In any way/ any how/ by all means যেকোনোভাবে",
    description: "যে কোনভাবে/ যেকোনো উপায়ে কোনো কাজ করতে চাইলে বা করা হবে বা করা হয়েছে, এমন বোঝাতে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "You are in problems now. I will help you any how.",
      "We will make the programme successful by any means/ by all means.",
      "The problem is serious. In any way, we have to solve it."
    ]
  },
  {
    id: 51,
    ruleNo: "Rule 51",
    title: "Enough to যথেষ্ট",
    description: "কোনো বৈশিষ্ট্যের পর্যাপ্ততা বা অপর্যাপ্ততার কারণে কোনো কাজ সংঘটিত হলে বা না হলে সেই কাজের Verb-টির আগে এই Linker-টি বসে",
    examples: [
      "She was not meritorious enough to get GPA-5.",
      "The girl is intelligent enough to understand the questions.",
      "He is not strong enough to carry the load."
    ]
  },
  {
    id: 52,
    ruleNo: "Rule 52",
    title: "Though/ although যদিও",
    description: "দুটি বিপরীতধর্মী Clause-কে যুক্ত করতে এই Linker ব্যবহূত হয়",
    examples: [
      "Though worked hard, he could not get GPA-5.",
      "Though the man is rich, he is not happy.",
      "They could not catch the train although they hurried a bit."
    ]
  },
  {
    id: 53,
    ruleNo: "Rule 53",
    title: "In spite of/ despite সত্ত্বেও",
    description: "একটি Sentence/ Clause-এর সঙ্গে অন্য একটি বিপরীত ভাব প্রকাশ করা Phrase-কে যুক্ত করতে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "In spite of his hard labour, Kawsar could not reached his goal.",
      "He attended the meeting despite being sick.",
      "In spite of his illness, he attended the meeting."
    ]
  },
  {
    id: 54,
    ruleNo: "Rule 54",
    title: "Once/ once upon a time/ many days ago/ long long ago/ in ancient time/ in the past একদা, অনেক দিন আগে, অতীতে",
    description: "অনেক দিন আগে, অতীতে ঘটেছে এমন ঘটনা/ কাজ প্রকাশে এ ধরনের Linker ব্যবহূত হয়",
    examples: [
      "Once upon a time there was a powerful king in Bangladesh.",
      "Once/ Once upon a time/ Many days ago/ Long long ago/ In ancient time there lived a king who was fond of knowing his future from astrologers.",
      "In the past we had much but now we have very less."
    ]
  },
  {
    id: 55,
    ruleNo: "Rule 55",
    title: "Yet তার পরেও",
    description: "বিপরীতধর্মী বা বিপরীত ভাব প্রকাশক কোনো কাজ, ঘটনা বা বৈশিষ্ট্য প্রকাশ করতে এই Linker ব্যবহূত হয়",
    examples: [
      "I hold him several times to complete the work. Yet, he did not do it.",
      "Many things are changing now. Yet people are here still quite polite and friendly.",
      "He is poor, yet he is happy."
    ]
  },
  {
    id: 56,
    ruleNo: "Rule 56",
    title: "As if/ as though/ as it were যেন",
    description: "কারও কাজ বা কোনো ঘটনা দেখে কিছু মনে হলে তা এই Linker-এর পরে ব্যবহার করা হয়",
    examples: [
      "He talks as if/ as though he were a great scholar.",
      "They shouted as if they had seen a ghost.",
      "The sun is, as it were, the lamp of the universe.",
      "He talks as if/as though he were a mad."
    ]
  },
  {
    id: 57,
    ruleNo: "Rule 57",
    title: "To the last/ till the end/ to a close শেষ পর্যন্ত",
    description: "শেষ পর্যন্ত যেটি করা হয়েছে বা হবে—এমন কাজ বা ঘটনা লেখার শেষে এ Linker-গুলো বসে",
    examples: [
      "All the audience were present till the end.",
      "We fought to the last to save our country.",
      "He was present in the meeting till the end.",
      "The martyrs fought against the invading Pakistani army till the end/ to the last.",
      "The function came to a close at six pm."
    ]
  }
  // ADD MORE RULES HERE - copy from components/grammar-rules/ConnectorsGrammarRules.tsx
  // Just follow the same structure as above
];