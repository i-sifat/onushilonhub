// Centralized Completing Sentence Grammar Rules Data
// ADD MORE RULES HERE - just follow the same structure

import { GrammarRule, GrammarLevel, GrammarTopicSlug } from '../../types/grammar.types';

export interface CompletingSentenceRule extends Omit<GrammarRule, 'topic' | 'level'> {
  topic: 'completing-sentence';
  level: GrammarLevel;
}

export const completingSentenceRules: CompletingSentenceRule[] = [
 {
    id: 1,
    ruleNo: "Rule 1",
    title: "That/so that/in order that",
    bengali: "যাতে",
    description: "Purpose or result",
    structures: [
      "Structure 1: Present Tense → that/so that/in order that → subject + can/will/may + V1 + obj/ext.",
      "Structure 2: Past Tense → that/so that/in order that → subject + could/would/might + V1 + obj/ext."
    ],
    examples: [
      "We eat so that we can survive. (আমরা খাই, যাতে করে আমরা বাঁচতে পারি/লড়াই করতে পারি)",
      "We ate so that we could survive. (আমরা খেয়েছি, যাতে করে আমা বাঁচতে/লড়াই করতে পারতাম)",
      "The farmers sow seeds that they may get a harvest. (কৃষক বীজ বপন করে, যাতে করে তারা ফসল পেতে পারে)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "As if/as though",
    bengali: "এমন… যেন",
    description: "Comparison or manner",
    structures: [
      "Structure 1: Present Tense → as if/as though → subject + V2 + object. Or Subject + were + object.",
      "Structure 2: Past Tense → as if/as though → subject + had + V3 + object. Or Subject + had been + object."
    ],
    examples: [
      "He talks as if he knew everything. (সে এমনভাবে বলছে যেন সে সবই জানত)",
      "She spoke as if she had known everything. (সে এমনভাবে বলল যেন সবই জানে)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Lest/In case",
    bengali: "যাতে.. না/ নতুবা",
    description: "Prevention or precaution",
    structures: [
      "Structure: Any Tense → Lest → subject + should/might + V1 + object."
    ],
    examples: [
      "Walk fast lest you should miss the train. (দ্রুত হাঁট নতুবা তুমি ট্রেনটি মিস করবে)",
      "I wrote down her address in case I should forget it. (আমি তার ঠিকানা লিখে রেখেছি নতুবা আমি এটি ভুলে যাব)",
      "Take your umbrella lest you should get wet. (আপনার ছাতা নিন যাতে আপনি ভিজে না যান।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Though/although",
    bengali: "যদিও",
    description: "Contrast or concession",
    structures: [
      "1st Clause (কারণ) → 2nd Clause(ফলাফল)",
      "Positive meaningful sentence → Negative meaningful sentence",
      "Negative meaningful sentence → Positive meaningful sentence"
    ],
    examples: [
      "Though he is poor, he is honest. (যদিও সে দরিদ্র, সে সৎ)",
      "Though he knows English, he cannot speak in it. (যদিও সে ইংরেজি জানে, সে এটিতে কথা বলতে পারে না)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "No sooner had",
    bengali: "করতে না করতেই",
    description: "Immediate sequence",
    structures: [
      "Structure: No sooner had + subject + V3 + object → than/before + subject + V2 + object."
    ],
    examples: [
      "No sooner had I reached the station than the train left. (আমি স্টেশনে পৌঁছাতে না পৌঁছাতেই ট্রেনটি চলে গেল।)",
      "No sooner had we entered the room than they started clapping. (আমি কক্ষে প্রবেশ করতে না করতেই তারা হাতে তালি দেয়া শুরু করল)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 6,
    ruleNo: "Rule 6",
    title: "Hardly had",
    bengali: "করতে না করতেই",
    description: "Immediate sequence",
    structures: [
      "Structure: Hardly had + subject + V3 + object → before/when + subject + V2 + object."
    ],
    examples: [
      "Hardly had the teacher entered the classroom when the student kept quiet. (শিক্ষক শ্রেণিকক্ষে প্রবেশ করতিই শিক্ষার্থীরা চুপ হয়ে গেল)",
      "Hardly had I seen Sam when he started walking. (আমি সামকে দেখতেই সে হাঁটা ‍শুরু করল)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 7,
    ruleNo: "Rule 7",
    title: "Scarcely had",
    bengali: "করতে না করতেই",
    description: "Immediate sequence",
    structures: [
      "Structure: Scarcely had + subject + V3 + object → when + subject + V2 + object."
    ],
    examples: [
      "Scarcely had the teacher seen the student when she started studying. (শিক্ষককে দেখতেই শিক্ষার্থীরা পড়তে শুরু করল)",
      "Scarcely had John started the journey when it started raining. (জন ভ্রমণ শুরু করতেই বৃষ্টি শুরু হল)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 8,
    ruleNo: "Rule 8",
    title: "Barely had",
    bengali: "করতে না করতেই",
    description: "Immediate sequence",
    structures: [
      "Structure: Barely had + subject + V3 + object → when + subject + V2 + object."
    ],
    examples: [
      "Barely had Arthur started the speech when Russell started questioning. (আর্থার বক্তৃতা শুরু করতেই রাসেল প্রশ্ন করতে শুরু করল)",
      "Barely had Eva started cooking when the doorbell started ringing. (ঈভা রান্না শুরু করতেই ডোরবেল বাজতে লাগল)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 9,
    ruleNo: "Rule 9",
    title: "As Soon As",
    bengali: "করতেই",
    description: "Immediate sequence",
    structures: [
      "Structure: As soon as + subject + V2 + object → comma (,) subject + V2 + object."
    ],
    examples: [
      "As soon as Rana sat down, the phone rang. (রানা বসতেই ফোন বেজে উঠল)",
      "As soon as he teacher came, there was silence. ( শিক্ষক আসতেই নীরবতা নেমে আসল)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 10,
    ruleNo: "Rule 10",
    title: "Would you mind?",
    bengali: "আপত্তি করবেন কি?",
    description: "Polite request",
    structures: [
      "Structure 1: Would you mind → V1 + ing + object.",
      "Structure 2: Would you mind + If + somebody + V2 + object/ext.",
      "Structure 3: Would you mind + Somebody's + Verb + ing + object/ext."
    ],
    examples: [
      "Would you mind taking a cup of tea? (আপনি কি এক কাপ চা খেতে আপত্তি করবেন?)",
      "Would you mind if I used your mobile now? (আমি আপনার মোবাইল ব্যবহার করলে আপনি কিছু মনে করবেন?)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 11,
    ruleNo: "Rule 11",
    title: "Till/Until",
    bengali: "পর্যন্ত",
    description: "Time duration",
    structures: [
      "Structure 1: Present Tense/Future Tense → Till/Until → Present Tense.",
      "Structure 2: Past Tense → Till/Until → Past Tense."
    ],
    examples: [
      "Just wait till he comes. (তিনি না আসা পর্যন্ত অপেক্ষা করুন।)",
      "We waited until the train came. (আমরা ট্রেন না আসা পর্যন্ত অপেক্ষা করছিলাম।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 12,
    ruleNo: "Rule 12",
    title: "In spite of/Despite",
    bengali: "সত্ত্বেও",
    description: "Contrast",
    structures: [
      "In spite of/Despite → subject + verb + object",
      "Positive meaningful sentence → Negative meaningful sentence",
      "Negative meaningful sentence → Positive meaningful sentence"
    ],
    examples: [
      "In spite of his poverty he is honest. (দারিদ্র্য সত্ত্বেও তিনি সৎ।)",
      "Despite of his poverty he is donates. (দারিদ্র থাকা সত্ত্বেও তিনি দান করছেন)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 13,
    ruleNo: "Rule 13",
    title: "It is time/It is high time",
    bengali: "সময়",
    description: "Urgency or necessity",
    structures: [
      "Structure 1: It is time/It is high time/it is now time → subject + V2 + object.",
      "Structure 2: It is time/It is high time/it is now time → to + V1 + object."
    ],
    examples: [
      "It is time you worked for your future. (এটাই সময় আপনার ভবিষ্যতের জন্য কাজ করার)",
      "It is high time to work for your future. (এটাই উপযুক্ত সময় আপনার ভবিষ্যতের জন্য কাজ করার)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 14,
    ruleNo: "Rule 14",
    title: "Instead of/In lieu of",
    bengali: "পরিবর্তে",
    description: "Alternative",
    structures: [
      "Instead of/In lieu of + noun/gerund → main clause"
    ],
    examples: [
      "Instead of history he took economic. (ইতিহাসের বদলে সে অর্থনীতি নিল)",
      "In lieu of cricket she loves football. (ক্রিকেটের পরিবর্তে সে ফুটবল পছন্দ করে)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 15,
    ruleNo: "Rule 15",
    title: "Since (time)",
    bengali: "সময় পূর্বে বোঝাতে",
    description: "Time reference",
    structures: [
      "Structure 1: Present indefinite/Present perfect → since → Past indefinite.",
      "Structure 2: Past indefinite → since → Past perfect."
    ],
    examples: [
      "It is ten years since my sister was born. (আমার বোনের জন্মের দশ বছর হলো।)",
      "It was long since I had seen her last. (অনেক সময় হয়ে গেছে আমি তাকে শেষ দেখেছি)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 16,
    ruleNo: "Rule 16",
    title: "So…. that",
    bengali: "এতই যে",
    description: "Degree or extent",
    structures: [
      "Structure: Subject + verb + so + adjective/adverb + that + subject + cannot/could not + সঙ্গতিপূর্ণ verb + বাকী অংশ।"
    ],
    examples: [
      "The man is so weak that he cannot move his body. (লোকটি এতই দুর্বল যে সে তার শরীরকে নড়াচড়া করতে পারে না।)",
      "He is so expert that he can solve it easily. (তিনি এতই বিশেষজ্ঞ যে তিনি সহজেই এটি সমাধান করতে পারেন।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 17,
    ruleNo: "Rule 17",
    title: "Would rather",
    bengali: "তবুও/বরং",
    description: "Preference",
    structures: [
      "Structure: Subject + would rather + V1 → than + verb/noun"
    ],
    examples: [
      "He would rather die than forgive you. (সে তোমাকে ক্ষমা করার চেয়ে মরবে।)",
      "I would rather die than begging. (আমি ভিক্ষা করার চেয়ে বরং মরে যাব)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 18,
    ruleNo: "Rule 18",
    title: "Without + gerund",
    bengali: "ছাড়া/ব্যতীত",
    description: "Absence or lack",
    structures: [
      "Structure: Without + V1 +ing + object + personal subject + verb + প্রয়োজনীয় বাকী অংশ."
    ],
    examples: [
      "Without working hard you cannot achieve success. (কঠোর পরিশ্রম ছাড়া আপনি সফলতা অর্জন করতে পারবেন না।)",
      "Without reading more you cannot make a good result. (বেশি না পড়লে তুাম ভালো ফলাফল করতে পারবে না)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 19,
    ruleNo: "Rule 19",
    title: "By + gerund",
    bengali: "দ্বারা/দিয়ে",
    description: "Method or means",
    structures: [
      "Structure: By + V1 +ing + object +personal subject + verb + প্রয়োজনীয় বাকী অংশ।"
    ],
    examples: [
      "By working hard you can achieve success. (কঠোর পরিশ্রম করে আপনি সফলতা অর্জন করতে পারেন।)",
      "By reading more you can make a good result. (বেশি বেশি পড়ে ভালো ফলাফল করতে পারবেন।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 20,
    ruleNo: "Rule 20",
    title: "Unless",
    bengali: "যদি না",
    description: "Condition",
    structures: [
      "Structure: Unless যুক্ত incomplete sentence টি বসে → সঙ্গতিপূর্ণ পূর্নাঙ্গ বাক্য বসে।"
    ],
    examples: [
      "Unless you work hard you will fail in life. (আপনি যদি কঠোর পরিশ্রম না করেন তবে আপনি জীবনে ব্যর্থ হবেন।)",
      "Unless you walk fast you will miss the train. (আপনি যদি দ্রুত না হাঁটেন আপনি ট্রেনটি ধরতে ব্যর্থ হবেন।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 21,
    ruleNo: "Rule 21",
    title: "As long as/So long as",
    bengali: "যতদিন",
    description: "Duration condition",
    structures: [
      "Structure: As long as যুক্ত incomplete sentence টি বসে → সঙ্গতিপূর্ণ পূর্নাঙ্গ বাক্য বসে।"
    ],
    examples: [
      "I will fight against injustice as long as I can. (আমি যতদিন পারি অবিচারের বিরুদ্ধে লড়ব।)",
      "You may take my car so long as you drive carefully. (আপনি যতক্ষণ সাবধানে গাড়ি চালান ততক্ষণ আপনি আমার গাড়ি নিতে পারেন।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 22,
    ruleNo: "Rule 22",
    title: "Because of/on account of/owing to/due to",
    bengali: "কারণে",
    description: "Reason or cause",
    structures: [
      "Structure: Because of/on account of/owing to/due to Phrase যুক্ত incomplete sentence টি বসে → সঙ্গতিপূর্ণ পূর্নাঙ্গ বাক্য বসে।"
    ],
    examples: [
      "I could not help him due to my poverty. (আমি দারিদ্র্যের কারণে তাকে সাহায্য করতে পারিনি।)",
      "I could not went to school because of my illness. (আমি অসুস্থতার কারণে স্কুলে যেতে পারিনি।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 23,
    ruleNo: "Rule 23",
    title: "Not only…. but also",
    bengali: "এটি না... ওটিও",
    description: "Addition",
    structures: [
      "Not only এর পরে Subject থাকলে but also এর পরেও Subject বসে।",
      "Not only এর পরে Object থাকলে but also এর পরেও Object বসে।",
      "Not only এর পরে Verb থাকলে but also এর পরেও Verb বসে।"
    ],
    examples: [
      "Not only Rita but also Ritu will call me. (শুধু রিতাই নয় রিতুও আমাকে ডাকবে।)",
      "She is not only kind but also submissive. (তিনি শুধু দয়ালুই নন, অনুগতও বটে।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 24,
    ruleNo: "Rule 24",
    title: "Too.... to/Enough…. to",
    bengali: "এতই..... যে",
    description: "Degree of ability",
    structures: [
      "Structure 1: Subject + verb + too + adjective → to + V1 + object/ext.",
      "Structure 2: Subject + verb+ too+ adjective → for ব্যাক্তি বাচক subject এর objective form+ to+ V1+ obj/ext."
    ],
    examples: [
      "He is too weak to walk. (তিনি হাঁটতে খুব দুর্বল।)",
      "The Sum is too hard for me to solve it. (অংকটি সমাধান করা আমার জন্য খুব কঠিন)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 25,
    ruleNo: "Rule 25",
    title: "Let alone",
    bengali: "কেউ কোন কাজ করতে অসমর্থ",
    description: "Inability emphasis",
    structures: [
      "Let alone যুক্ত incomplete sentence টি বসে → (meaningful word or phrase)."
    ],
    examples: [
      "He cannot pass in the third division, let alone the first division. (সে তৃতীয় বিভাগেই পাশ করতে পারে না, আবার প্রথম বিভাগ!)",
      "He cannot carry 1 kg, let alone 10 kg. (সে ১ কেজিই বহন করতে পারে না, আবার ১০ কেজি!)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 26,
    ruleNo: "Rule 26",
    title: "Provided/provided that/providing that",
    bengali: "যদি অর্থে",
    description: "Condition",
    structures: [
      "Structure: …… provided/provided that/providing that → (meaningful sentence)."
    ],
    examples: [
      "He will shine in life provided that he works hard. (সে জীবনে উজ্জ্বল হবে যদি সে কঠোর পরিশ্রম করে।)",
      "The plane will take off provided the weather is good. (আবহাওয়া ভালো থাকলে প্লেন টেক অফ করবে।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 27,
    ruleNo: "Rule 27",
    title: "So much/so many",
    bengali: "অনেক",
    description: "Quantity emphasis",
    structures: [
      "Structure: So much/ so many যুক্ত incomplete sentence টি বসে → that + 1st subject + can/cannot + verb + প্রয়োজনীয় বাকী অংশ।"
    ],
    examples: [
      "You have so much intelligence that you can get a job. (আপনার এতই বুদ্ধি আছে যে আপনি একটি চাকরি পেতে পারেন।)",
      "There are so many problems that I cannot solve them. (অনেক সমস্যা আছে যে আমি সমাধান করতে পারি না।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 28,
    ruleNo: "Rule 28",
    title: "By the time",
    bengali: "যততক্ষণে",
    description: "Time reference",
    structures: [
      "Structure 1: Main clause + by the time + Dependent clause",
      "Structure 2: By the time + Dependent clause + Main clause"
    ],
    examples: [
      "I will be in bed by the time you get home. (যতক্ষণে তুমি বাসায় ফিরবে আমি বিছানায় থাকব।)",
      "By the time that the guards realised what was happening, the gang were already inside the bank. (যদক্ষণে প্রহরী বুঝতে পারল যে কি হচ্ছে, দলটি ব্যাংকে ঢুকে পড়ল।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 29,
    ruleNo: "Rule 29",
    title: "In the event",
    bengali: "কারণে",
    description: "Circumstance",
    structures: [
      "Structure: Results clause + in the event + Reason clause"
    ],
    examples: [
      "I got very nervous about the exam in the event that it might be very difficult. (আমি পরীক্ষা সম্পর্কে খুব ঘাবড়ে গিয়েছিলাম যে এটি খুব কঠিন হতে পারে।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 30,
    ruleNo: "Rule 30",
    title: "Now that",
    bengali: "এখন যেহেতু",
    description: "Current reason",
    structures: [
      "Structure 1: Now that + cause clause + Effect clause",
      "Structure 2: Effect clause + now that + cause clause"
    ],
    examples: [
      "Now that John is married, he has become much more responsible. (এখন যেহেতু জন বিবাহিত, তিনি অনেক বেশি দায়িত্বশীল হয়ে উঠেছেন।)",
      "I can enjoy myself now that the exams are over. (এখন যেহেতু পরীক্ষা শেষ, আমি এখন নিজেকে উপভোগ করতে পারি।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 31,
    ruleNo: "Rule 31",
    title: "Relative pronoun",
    bengali: "সম্পর্কবাচক সর্বনাম",
    description: "Who, which, that, where",
    structures: [
      "Structure 1: Subject+ who/which/what/that etc. + verb + object → verb +object.",
      "Structure 2: Subject + verb + object → that/who/which/what etc. → verb +object.",
      "Structure 3: That/Wh-word+ subject+ verb+ object → verb Object."
    ],
    examples: [
      "Riva who is a little girl is my student. (ছোট মেয়ে রিভা আমার ছাত্রী।)",
      "London is the place where I was born. (লন্ডন হচ্ছে সেই জায়গা যেখানে আমি জন্মহগ্রহণ করেছিলাম।)",
      "1971 is the year when Bangladesh became independent. (১৯৭১ হচ্ছে সেই বছর যখন বাংলাদেশ স্বাধীন হয়।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  },
  {
    id: 141,
    ruleNo: "Rule 141",
    title: "Conditional Sentence (If)",
    bengali: "যদি",
    description: "Condition",
    structures: [
      "First Conditional: If + subject + V1 + object → subject + can/should/will/may + V1 + object.",
      "Second Conditional: If + subject + V2 + object → subject + could/would/might + V1 + object.",
      "Third Conditional: If + subject + had + V3 + object → subject + could have/should have/would have/might have + V3 + object."
    ],
    examples: [
      "If she gets good grades she will go to university. (ভালো নম্বর পেলে সে বিশ্ববিদ্যালয়ে যাবে)",
      "If I had the time I would learn Italian. (আমার সময় থাকলে আমি ইতালিয়ান শিখতাম।)",
      "If I had seen him I would have given him the message. (আমি যদি তাকে দেখতে পেতাম তবে আমি তাকে বার্তা দিতাম।)"
    ],
    topic: 'completing-sentence',
    level: 'HSC'
  }
  // ADD MORE RULES HERE - copy from components/grammar-rules/CompletingSentenceGrammarRules.tsx
  // Just follow the same structure as above
];

// Export metadata for the topic
export const completingSentenceMetadata = {
  topic: 'completing-sentence' as const,
  slug: 'completing-sentence' as const,
  level: 'HSC' as GrammarLevel,
  totalRules: completingSentenceRules.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
};