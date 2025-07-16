// Centralized Connectors Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

export interface ConnectorQuestion {
  id: string;
  question: string;
  ruleId?: number;
}

export const connectorsQuestions: ConnectorQuestion[] = [
  {
    id: "dhaka-2016-connectors",
    year: 2016,
    board: "Dhaka Board",
    passage: "A lion was drinking water from a brook. (a) ___ a lamb was also drinking water from the downstream of the same brook. The lion saw the lamb and decided to devour it. (b) ___ he was thinking about how to accomplish his evil design. (c) ___ he hit upon a plan. (d) ___ the lion complained that the lamb was disturbing him by muddying water. But the lamb said that he was drinking water from downstream. (e) ___ the questions of muddying water on his part did not arise. (f) ___ the lamb argued that it was the lion that was muddying the water for him as he was drinking water upstream. (g) ___ the lion retorted that the lamb spoke ill of him a year ago. (h) ___ the lamb said that he was not born a year ago. The lion grew into a rage. (i) ___ he said that perhaps his father spoke ill of him last year. (j) ___ the lion had the right to take revenge and kill the lamb.",
    blanks: [
      { id: "a", answer: "As", ruleId: 49, explanation: "As introduces a reason, explaining why the lamb was also drinking water, aligning with Rule 49 (As/ since/ because...), which denotes cause." },
      { id: "b", answer: "So", ruleId: 1, explanation: "So indicates the consequence of the lion’s decision to devour the lamb, fitting Rule 1 (As a result/ so/ therefore...), which shows cause and effect." },
      { id: "c", answer: "That", ruleId: 45, explanation: "That introduces a clause describing the outcome of the lion’s thinking, matching Rule 45 (That), used to connect explanatory clauses." },
      { id: "d", answer: "While", ruleId: 26, explanation: "While indicates simultaneous actions (lion complaining and lamb responding), corresponding to Rule 26 (When/ while) for concurrent events." },
      { id: "e", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the truth of the lamb’s claim that it didn’t muddy the water, aligning with Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "f", answer: "If", ruleId: 37, explanation: "If introduces a conditional argument by the lamb about the lion’s actions, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "g", answer: "Which", ruleId: 10, explanation: "Which refers to the lion’s retort as a relative clause, matching Rule 10 (Relative pronouns: Who, which, that...) for connecting clauses." },
      { id: "h", answer: "Who", ruleId: 10, explanation: "Who refers to the lamb as the subject of the clause, aligning with Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "i", answer: "And", ruleId: 5, explanation: "And connects two sequential actions of the lion (growing angry and speaking), fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "j", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the lion’s reasoning for killing the lamb, matching Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "rajshahi-2016-connectors",
    year: 2016,
    board: "Rajshahi Board",
    passage: "(a) ___ I was walking along the road the other day, I happened to notice a small brown leather purse lying on the pavement. I picked it up and opened it to see (b) ____ I could find out the owner’s name. There was nothing inside. It (c) ___ some small change and a rather old photograph a picture of a woman and a young girl about twelve years old who looked like the woman’s daughter. I put the photograph back (d) ___ took the purse to the police station. (e) ___ I handed it to the sergeant-in-charge. Before I left, the sergeant made a note of my name and address in case the owner of the purse wanted to write and thank me. That evening I went to have dinner with an uncle and aunt of mine. They had also invited another person, a young woman, (f) ____ there would be four people at the table. The young woman’s face was familiar, (g) ___ I could not remember where I had seen it. I was quite sure, (h) ___ we had not met before. (i) ___ conversation, however, the young woman happened to mark that she had lost her purse that afternoon. I at once remembered where I had seen her face. She was the young woman in the photograph (j) ___ she was now much older.",
    blanks: [
      { id: "a", answer: "While", ruleId: 26, explanation: "While indicates the simultaneous action of walking and noticing the purse, fitting Rule 26 (When/ while) for concurrent events." },
      { id: "b", answer: "Whether", ruleId: 46, explanation: "Whether expresses uncertainty about finding the owner’s name, aligning with Rule 46 (Whether/ whether … or) for uncertain conditions." },
      { id: "c", answer: "Had", ruleId: 0, explanation: "Had is not a linker in rules.js and seems to be a mistake; no rule applies, so ruleId is 0." },
      { id: "d", answer: "And", ruleId: 5, explanation: "And connects two actions (returning the photo and taking the purse), matching Rule 5 (And/ as well as...) for joining elements." },
      { id: "e", answer: "Then", ruleId: 13, explanation: "Then indicates the sequence of handing the purse after taking it to the station, fitting Rule 13 (At the same time/ after that/ then...) for sequential events." },
      { id: "f", answer: "And", ruleId: 5, explanation: "And connects the invitation of another person to the context, aligning with Rule 5 (And/ as well as...) for joining elements." },
      { id: "g", answer: "But", ruleId: 18, explanation: "But shows contrast between the familiar face and inability to recall, matching Rule 18 (But/ on the other hand...) for contrast." },
      { id: "h", answer: "That", ruleId: 45, explanation: "That introduces a clause of certainty about not having met, fitting Rule 45 (That) for explanatory clauses." },
      { id: "i", answer: "During", ruleId: 0, explanation: "During is a preposition, not a linker in rules.js, so no rule applies; ruleId is 0." },
      { id: "j", answer: "But", ruleId: 18, explanation: "But contrasts the young woman in the photograph with her older self, aligning with Rule 18 (But/ on the other hand...) for contrast." }
    ]
  },
  {
    id: "cumilla-2016-connectors",
    year: 2016,
    board: "Cumilla Board",
    passage: "Mobile phone has become an essential gadget for everybody. (a) — it has become very popular. (b) — it has created a number of problems. It has (c) — advantages (d) — disadvantages. (e) — it helps to connect people. (f) — it helps to exchange information (g) — it can be used for various purpose. (h) — it has a few disadvantages. (i) — it can cause a lot of troubles. (j) — its advantages are more than its disadvantages.",
    blanks: [
      { id: "a", answer: "As", ruleId: 49, explanation: "As explains why mobile phones are popular, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "b", answer: "But", ruleId: 18, explanation: "But contrasts popularity with problems, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "c", answer: "Both", ruleId: 9, explanation: "Both introduces dual aspects (advantages and disadvantages), matching Rule 9 (Both … and …) for dual entities." },
      { id: "d", answer: "And", ruleId: 5, explanation: "And connects advantages and disadvantages, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "e", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of benefits, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "f", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of benefits, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "g", answer: "Furthermore", ruleId: 4, explanation: "Furthermore adds another benefit of mobile phones, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "h", answer: "However", ruleId: 27, explanation: "However contrasts benefits with disadvantages, aligning with Rule 27 (However/ nevertheless...) for contrasting ideas." },
      { id: "i", answer: "Which", ruleId: 10, explanation: "Which refers to the mobile phone causing troubles, matching Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "j", answer: "However", ruleId: 27, explanation: "However contrasts disadvantages with greater advantages, fitting Rule 27 (However/ nevertheless...) for contrasting ideas." }
    ]
  },
  {
    id: "sylhet-2016-connectors",
    year: 2016,
    board: "Sylhet Board",
    passage: "The gifts of science are uncountable. (a) --- we cast our eyes, we see the wonders of science. Satellite TV channels are means through (b) --- we can see and hear the events (c) --- are happening all over the world. (d) ---, today we have specialized satellite channels on almost every interest. (e) ---, people now have more choices and more freedom about television programmes. Satellite channels help us a lot by reporting on climatic conditions of different parts of the world. (f) ---, we can be aware of storms, cyclones and tidal bores, (g) --- satellite channels are helping us to a great extent to enrich our own culture and tradition. (h) --- satellite channels are playing a favourable role, it is (i) --- doing harm to our young and new generation. (j) --- still we cannot deny the immense benefits we are getting from satellite channels.",
    blanks: [
      { id: "a", answer: "Wherever", ruleId: 48, explanation: "Wherever indicates any place where science’s wonders are seen, fitting Rule 48 (Wherever) for unspecified locations." },
      { id: "b", answer: "Which", ruleId: 10, explanation: "Which refers to satellite TV channels as a means, matching Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "c", answer: "That", ruleId: 45, explanation: "That introduces a clause about events happening worldwide, fitting Rule 45 (That) for explanatory clauses." },
      { id: "d", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the truth about specialized channels, aligning with Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "e", answer: "Therefore", ruleId: 1, explanation: "Therefore shows the consequence of more choices due to specialized channels, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "f", answer: "Thus", ruleId: 25, explanation: "Thus describes the outcome of satellite channels’ reporting, matching Rule 25 (Thus/ in this way) for describing how events occur." },
      { id: "g", answer: "Moreover", ruleId: 4, explanation: "Moreover adds another benefit of satellite channels, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "h", answer: "Though", ruleId: 52, explanation: "Though introduces a contrasting clause about harm despite benefits, aligning with Rule 52 (Though/ although) for contrasting clauses." },
      { id: "i", answer: "Also", ruleId: 15, explanation: "Also adds the idea of harm to the previous point, fitting Rule 15 (Too/ also/ as well) for additional information." },
      { id: "j", answer: "But", ruleId: 18, explanation: "But contrasts harm with undeniable benefits, matching Rule 18 (But/ on the other hand...) for contrast." }
    ]
  },
  {
    id: "chattogram-2016-connectors",
    year: 2016,
    board: "Chattogram Board",
    passage: "Bangladesh is mainly an agricultural country. (a)---, her economy and prosperity depend on agriculture. (b)---, our agriculture depends on the mercy of nature. (c)---, if there is sufficient rain, people can plough their lands and sow seeds in time. (d)---, they can reap a good harvest. (e)--- if it does not rain in time, the farmers cannot grow the crops easily and they do not have a good harvest. (f)---, without water our agriculture is lifeless. The rain is not always beneficial to our agriculture (g) ---, sometimes it rains so much that it causes floods. (h) ---, our crops go underwater and most often, they are totally destroyed. (i)---, the farmers who constitute the most part of our professional people, lose everything. (j)---, we can safely conclude that our economy depends on rain.",
    blanks: [
      { id: "a", answer: "So", ruleId: 1, explanation: "So indicates the consequence of Bangladesh being an agricultural country, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "b", answer: "Again", ruleId: 4, explanation: "Again adds another point about agriculture’s dependency on nature, matching Rule 4 (Moreover/ besides/ again...) for additional points." },
      { id: "c", answer: "Hence", ruleId: 1, explanation: "Hence shows the result of sufficient rain enabling farming, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "d", answer: "As a result", ruleId: 1, explanation: "As a result indicates the outcome of timely rain leading to a good harvest, matching Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "e", answer: "On the contrary", ruleId: 18, explanation: "On the contrary contrasts the lack of rain with the previous point, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "f", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the necessity of water for agriculture, matching Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "g", answer: "For example", ruleId: 20, explanation: "For example provides an example of excessive rain causing floods, fitting Rule 20 (For instance/ for example...) for examples." },
      { id: "h", answer: "As a result", ruleId: 1, explanation: "As a result shows the consequence of floods destroying crops, matching Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "i", answer: "Consequently", ruleId: 1, explanation: "Consequently indicates the result of crop destruction for farmers, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "In fine", ruleId: 2, explanation: "In fine summarizes the conclusion about the economy’s dependence on rain, matching Rule 2 (In short/ in fine...) for summarizing." }
    ]
  }
  // ADD MORE QUESTIONS HERE - copy from components/questions/ConnectorsQuestionsPage.tsx
  // Just follow the same structure as above
];