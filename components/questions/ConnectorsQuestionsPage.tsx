'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Blank {
  id: string;
  answer: string;
  ruleId?: number;
  explanation?: string;
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
    id: "dhaka-2016-connectors",
    year: 2016,
    board: "Dhaka Board",
    passage: "A lion was drinking water from a brook. (a) ___ a lamb was also drinking water from the downstream of the same brook. The lion saw the lamb and decided to devour it. (b) ___ he was thinking about how to accomplish his evil design. (c) ___ he hit upon a plan. (d) ___ the lion complained that the lamb was disturbing him by muddying water. But the lamb said that he was drinking water from downstream. (e) ___ the questions of muddying water on his part did not arise. (f) ___ the lamb argued that it was the lion that was muddying the water for him as he was drinking water upstream. (g) ___ the lion retorted that the lamb spoke ill of him a year ago. (h) ___ the lamb said that he was not born a year ago. The lion grew into a rage. (i) ___ he said that perhaps his father spoke ill of him last year. (j) ___ the lion had the right to take revenge and kill the lamb.",
    blanks: [
      { id: "a", answer: "As", ruleId: 49, explanation: "As introduces a reason, explaining why the lamb was also drinking water, aligning with Rule 49 (As/ since/ because...), which denotes cause." },
      { id: "b", answer: "So", ruleId: 1, explanation: "So indicates the consequence of the lion's decision to devour the lamb, fitting Rule 1 (As a result/ so/ therefore...), which shows cause and effect." },
      { id: "c", answer: "That", ruleId: 45, explanation: "That introduces a clause describing the outcome of the lion's thinking, matching Rule 45 (That), used to connect explanatory clauses." },
      { id: "d", answer: "While", ruleId: 26, explanation: "While indicates simultaneous actions (lion complaining and lamb responding), corresponding to Rule 26 (When/ while) for concurrent events." },
      { id: "e", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the truth of the lamb's claim that it didn't muddy the water, aligning with Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "f", answer: "If", ruleId: 37, explanation: "If introduces a conditional argument by the lamb about the lion's actions, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "g", answer: "Which", ruleId: 10, explanation: "Which refers to the lion's retort as a relative clause, matching Rule 10 (Relative pronouns: Who, which, that...) for connecting clauses." },
      { id: "h", answer: "Who", ruleId: 10, explanation: "Who refers to the lamb as the subject of the clause, aligning with Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "i", answer: "And", ruleId: 5, explanation: "And connects two sequential actions of the lion (growing angry and speaking), fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "j", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the lion's reasoning for killing the lamb, matching Rule 1 (As a result/ so/ therefore...) for cause and effect." }
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
  },
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
  },
{
    id: "dhaka-2017-connectors",
    year: 2017,
    board: "Dhaka Board",
    passage: "Mobile phone has added a new dimension into our communication system. It has made the world closer to us. (a) ---, it has made worldwide communication easier. We use it for our day-to-day communication. (b) ---, it has been a part and parcel in our life as we cannot go for a single day without using it. We use it for rapid communication. (c) --- mobile phone is not free from defect. It has some negative sides as well. (d) --, excessive use of mobile phone may cause our hearing problem. (e) ---, it is a means of money wastage. (f) ---, it is seen that many underground crimes are being done with the use of mobile networks. (g) ---, the radiation from mobile phone may cause cancer to the users. (h) ---, we are aware of these harmful effects. (i) ---, we are not aware of using the mobile phone. (j)---, we must have to be conscious about the negative impact of mobile phone and accordingly, we should use it carefully.",
    blanks: [
      { id: "a", answer: "Besides", ruleId: 4, explanation: "Besides adds another benefit of mobile phones (easier communication), fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "b", answer: "So", ruleId: 1, explanation: "So indicates the consequence of mobile phones being essential, aligning with Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "c", answer: "But", ruleId: 18, explanation: "But contrasts the benefits with defects, matching Rule 18 (But/ on the other hand...) for contrasting ideas." },
      { id: "d", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of negative sides, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "e", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of negative sides, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "f", answer: "Thirdly", ruleId: 17, explanation: "Thirdly further continues the sequence of negative sides, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "g", answer: "Finally", ruleId: 14, explanation: "Finally marks the last negative side in the sequence, fitting Rule 14 (At the end/ finally...) for concluding events." },
      { id: "h", answer: "However", ruleId: 27, explanation: "However contrasts awareness of harmful effects with the next point, matching Rule 27 (However/ nevertheless...) for contrasting ideas." },
      { id: "i", answer: "But", ruleId: 18, explanation: "But contrasts awareness of effects with lack of awareness in usage, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "j", answer: "So", ruleId: 1, explanation: "So concludes the need for careful use due to negative impacts, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "rajshahi-2017-connectors",
    year: 2017,
    board: "Rajshahi Board",
    passage: "Man is a social being. (a) ---, man cannot live alone. (b) ---, man has been living together from time immemorial. Living in society is not an easy task. If we want to live in a society, we have to follow certain rules and regulations of that society. (c) ---, we have to be cooperative. (d) ----, we must help others when they need it. (e) ---, we have to be careful not to hurt others by our words or activities. (f) ----, we must control our emotions and behave well with others. (g) ---, we should not think and live only for us. (h) ---, we should always work for the betterment of the society. (i) ---, we should sacrifice our lives for others. (j)---, sacrificing our lives for others can make us immortal.",
    blanks: [
      { id: "a", answer: "So", ruleId: 1, explanation: "So indicates the consequence of man being a social being, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "b", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the truth of man living together historically, aligning with Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "c", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of societal rules, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "d", answer: "Therefore", ruleId: 1, explanation: "Therefore shows the result of needing to be cooperative, matching Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "e", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of societal rules, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "f", answer: "That is why", ruleId: 1, explanation: "That is why explains the need to control emotions due to not hurting others, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "g", answer: "Thirdly", ruleId: 17, explanation: "Thirdly further continues the sequence of societal rules, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "h", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes working for society over personal gain, aligning with Rule 31 (Rather) for emphasis." },
      { id: "i", answer: "So", ruleId: 1, explanation: "So indicates the consequence of societal betterment leading to sacrifice, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the truth that sacrifice leads to immortality, matching Rule 29 (Really/ actually/ in fact...) for asserting truth." }
    ]
  },
  {
    id: "cumilla-2017-connectors",
    year: 2017,
    board: "Cumilla Board",
    passage: "Trees are a vital part of our environment, (a) ---, they bear a great impact on the climate. (b) --- we are not careful about them. (c) ---, we destroy trees at random. (d) ---, one day the country will bear the consequence of greenhouse effect. (e) --- ours is an agricultural country, our economy depends upon it. (f) ---, our agriculture is dependent on rain, (g) --- trees play a vital role on our climate, (h) ---, trees keep the soil strong. (i) ---, trees save us from flood (j) --- many other natural calamities.",
    blanks: [
      { id: "a", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the truth of trees’ impact on climate, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "b", answer: "Yet", ruleId: 55, explanation: "Yet contrasts the importance of trees with lack of care, aligning with Rule 55 (Yet) for contrasting ideas." },
      { id: "c", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes the destructive action over care, matching Rule 31 (Rather) for emphasis." },
      { id: "d", answer: "As a result", ruleId: 1, explanation: "As a result indicates the consequence of tree destruction, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "e", answer: "As", ruleId: 49, explanation: "As introduces the reason why the economy depends on agriculture, aligning with Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "f", answer: "Besides", ruleId: 4, explanation: "Besides adds the point about agriculture’s dependence on rain, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "g", answer: "Again", ruleId: 4, explanation: "Again adds another point about trees’ role in climate, matching Rule 4 (Moreover/ besides/ again...) for additional points." },
      { id: "h", answer: "Next", ruleId: 17, explanation: "Next continues the sequence of trees’ benefits, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points, as it functions similarly to sequential connectors." },
      { id: "i", answer: "Furthermore", ruleId: 4, explanation: "Furthermore adds another benefit of trees, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "j", answer: "Thus", ruleId: 25, explanation: "Thus describes the outcome of trees’ role in preventing calamities, matching Rule 25 (Thus/ in this way) for describing how events occur." }
    ]
  },
  {
    id: "barishal-2017-connectors",
    year: 2017,
    board: "Barishal Board",
    passage: "Water is a vital element of the environment (a)--- this element is polluted in many ways. (b)--- farmers use chemical fertilizers and insecticides in their field. (c) --- rain and flood wash away these chemicals, they get mixed with water in rivers, canals and ponds (d) --- pollute it. (e)--- mills and factories throw their poisonous chemicals and waste product into water. (f) --- water vehicles also pollute water by dumping food waste and human waste into it. (g) --- insanitary latrines and unsafe drains also contribute to water pollution. Water is called life. (h) --- we cannot allow this pollution to continue. We have to raise an awareness about it. (i) ---, laws should be enforced strictly. (j) --- we fail to check water pollution, we will suffer.",
    blanks: [
      { id: "a", answer: "But", ruleId: 18, explanation: "But contrasts water’s importance with its pollution, fitting Rule 18 (But/ on the other hand...) for contrasting ideas." },
      { id: "b", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of pollution causes, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "c", answer: "When", ruleId: 26, explanation: "When indicates the timing of chemicals mixing with water, fitting Rule 26 (When/ while) for concurrent events." },
      { id: "d", answer: "And", ruleId: 5, explanation: "And connects the mixing of chemicals with pollution, matching Rule 5 (And/ as well as...) for joining elements." },
      { id: "e", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of pollution causes, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "f", answer: "Moreover", ruleId: 4, explanation: "Moreover adds another cause of pollution, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "g", answer: "Finally", ruleId: 14, explanation: "Finally marks the last cause of pollution, matching Rule 14 (At the end/ finally...) for concluding events." },
      { id: "h", answer: "So", ruleId: 1, explanation: "So indicates the consequence of water’s importance, necessitating action, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "i", answer: "Therefore", ruleId: 1, explanation: "Therefore suggests enforcing laws as a result of the need for awareness, matching Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "If", ruleId: 37, explanation: "If introduces a conditional outcome of failing to control pollution, fitting Rule 37 (If/ even if/ unless) for conditional statements." }
    ]
  },
  {
    id: "sylhet-2017-connectors",
    year: 2017,
    board: "Sylhet Board",
    passage: "Honesty is a noble virtue. The man possessing this invaluable quality is the happiest man on earth, (a)---. To be honest, a man should have trustworthiness. (b)---, nobody trusts a liar. A liar may prosper for the time being. (c)---, he goes to the dogs. (d)---. we should be honest. It is said that honesty is the best policy. (e)--- dishonesty is the sign of downfall. God helps those who are honest. (f)---, dishonest people are cursed. (g)--- children should be taught honesty from childhood. It is widely observed that children follow their parents. (h)--- business of life. (i)---, children should be allowed to mix with those friends who are honest. (j)--- they can mould their characters.",
    blanks: [
      { id: "a", answer: "Indeed", ruleId: 29, explanation: "Indeed emphasizes the truth of the happiest man claim, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "b", answer: "Because", ruleId: 49, explanation: "Because explains why nobody trusts a liar, aligning with Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "c", answer: "But", ruleId: 18, explanation: "But contrasts temporary prosperity with eventual failure, matching Rule 18 (But/ on the other hand...) for contrast." },
      { id: "d", answer: "So", ruleId: 1, explanation: "So concludes the need for honesty based on the liar’s fate, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "e", answer: "Whereas", ruleId: 18, explanation: "Whereas contrasts honesty with dishonesty’s downfall, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "f", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts God’s help for the honest with curses for the dishonest, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "g", answer: "So", ruleId: 1, explanation: "So indicates the consequence of children following parents, necessitating teaching honesty, matching Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "h", answer: "That is why", ruleId: 1, explanation: "That is why explains why parents’ influence affects children’s honesty, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "i", answer: "In addition", ruleId: 4, explanation: "In addition adds the point about choosing honest friends, matching Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "j", answer: "Thus", ruleId: 25, explanation: "Thus describes how honest friends help mould character, fitting Rule 25 (Thus/ in this way) for describing how events occur." }
    ]
  },
{
    id: "hsc-kh-set-2018-connectors",
    year: 2018,
    board: "HSC Kh Set",
    passage: "Many people think that money can do everything in life. (a) ---, it is a must for our life, it is not the thing that necessarily brings happiness. (b)---, it is absolutely a psychological matter. The person who is contented with what he gets and (c) --- he is really happy. Money can do something with happiness (d)--- it cannot give us happiness. (e) ---, we can see that the richest men of our society are not the happiest men. (f) ---, they lead a life burdened with cares and anxieties (g) --- pass sleepless nights. (h) --- there are a large number of poor men (i) --- are happy and enjoy a sound sleep. (j)---, money cannot ensure happiness.",
    blanks: [
      { id: "a", answer: "Although", ruleId: 52, explanation: "Although introduces a contrasting clause about money’s necessity versus its inability to ensure happiness, fitting Rule 52 (Though/ although) for contrasting clauses." },
      { id: "b", answer: "Actually", ruleId: 29, explanation: "Actually emphasizes the psychological nature of happiness, aligning with Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "c", answer: "What", ruleId: 10, explanation: "What acts as a relative pronoun referring to the person’s contentment, matching Rule 10 (Relative pronouns: Who, which, that, what...) for connecting clauses." },
      { id: "d", answer: "But", ruleId: 18, explanation: "But contrasts money’s partial role with its inability to give happiness, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "e", answer: "That is why", ruleId: 1, explanation: "That is why shows the consequence of money not ensuring happiness, evidenced by rich men’s lack of happiness, matching Rule 1 (As a result/ for this reason/ that is why...) for cause and effect." },
      { id: "f", answer: "Virtually", ruleId: 0, explanation: "Virtually is not a linker in rules.js; it’s an adverb, so no rule applies, and ruleId is 0." },
      { id: "g", answer: "And", ruleId: 5, explanation: "And connects the rich men’s burdened life with passing sleepless nights, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "h", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts the rich men’s situation with poor men’s happiness, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "i", answer: "Who", ruleId: 10, explanation: "Who refers to the poor men as the subject of the clause, matching Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "j", answer: "Thus", ruleId: 25, explanation: "Thus concludes how money fails to ensure happiness based on the contrast, fitting Rule 25 (Thus/ in this way) for describing how events occur." }
    ]
  },
  {
    id: "hsc-kha-set-2018-connectors",
    year: 2018,
    board: "HSC Kha Set",
    passage: "Time and tide wait for none. (a) ---, no one can stop the onward march of time. (b)---, we should not waste a single moment in vain. (c) ---, we should make proper use of every single moment of our life. (d)---, the students should understand the value of time. It is a matter of great regret that some of the students pass away their valuable time in Facebook. (e) ---, they kill their time. (f)---, they cannot prepare their lesson well. (g) --- they always have poor preparation for the examination. (h) ---, they cannot do well in the examination. (i)---, they do not stop wasting time. (j) ---, they continue to waste their time using Facebook till it is too late for them.",
    blanks: [
      { id: "a", answer: "As a matter of fact", ruleId: 29, explanation: "As a matter of fact emphasizes the truth that time cannot be stopped, aligning with Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "b", answer: "So", ruleId: 1, explanation: "So indicates the consequence of time’s unstoppable nature, urging not to waste it, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "c", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes using time properly over wasting it, matching Rule 31 (Rather) for emphasis." },
      { id: "d", answer: "Especially", ruleId: 0, explanation: "Especially is not a linker in rules.js; it’s an adverb, so no rule applies, and ruleId is 0." },
      { id: "e", answer: "Thus", ruleId: 25, explanation: "Thus describes how students kill time by using Facebook, fitting Rule 25 (Thus/ in this way) for describing how events occur." },
      { id: "f", answer: "As a result", ruleId: 1, explanation: "As a result shows the consequence of killing time leading to poor preparation, matching Rule 1 (As a result/ for this reason...) for cause and effect." },
      { id: "g", answer: "So", ruleId: 1, explanation: "So indicates the consequence of killing time resulting in poor exam preparation, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "h", answer: "As a result", ruleId: 1, explanation: "As a result shows the consequence of poor preparation leading to poor exam performance, matching Rule 1 (As a result/ for this reason...) for cause and effect." },
      { id: "i", answer: "Yet", ruleId: 55, explanation: "Yet contrasts poor performance with continued time-wasting, aligning with Rule 55 (Yet) for contrasting ideas." },
      { id: "j", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes the continued wasteful behavior over stopping, fitting Rule 31 (Rather) for emphasis." }
    ]
  },
{
    id: "dhaka-2019-connectors",
    year: 2019,
    board: "Dhaka Board",
    passage: "Trees are a vital part of our environment. (a) ---, they bear a great impact on the climate. (b) --- we are not careful about them. (c) ---, we destroy trees at random. (d) ---, one day the country will bear the consequence of greenhouse effect. (e) --- ours is an agricultural country, our economy depends upon it. (f) --- trees play a vital role on our climate, (g) ---, trees keep the soil strong. (h) ---, trees save us from flood. (i)--- tress provide us timber. (j)---- trees are our best friend.",
    blanks: [
      { id: "a", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the truth of trees’ impact on climate, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "b", answer: "But", ruleId: 18, explanation: "But contrasts trees’ importance with lack of care, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "c", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes destructive actions over care, matching Rule 31 (Rather) for emphasis." },
      { id: "d", answer: "As a result", ruleId: 1, explanation: "As a result indicates the consequence of tree destruction, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "e", answer: "Since", ruleId: 49, explanation: "Since explains why the economy depends on agriculture, aligning with Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "f", answer: "Besides", ruleId: 4, explanation: "Besides adds the point about trees’ role in climate, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "g", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of trees’ benefits, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "h", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of trees’ benefits, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "i", answer: "Moreover", ruleId: 4, explanation: "Moreover adds another benefit of trees, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "j", answer: "So", ruleId: 1, explanation: "So concludes that trees are our best friend due to their benefits, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "rajshahi-2019-connectors",
    year: 2019,
    board: "Rajshahi Board",
    passage: "Unemployment is a great problem in our country. a) ---, it is the burning question of the day. b) --- almost all the countries of the world suffer from the curse of unemployment problem. c)--- Bangladesh is the worst sufferer of this so-called problem. d) ---, nowhere in the world this problem is so acute as in our country. e) ---, there are many reasons behind it. f) ---, our country is industrially backward. g) ---, our system of education fails to give the student an independent start of life. h) ---, it has little provision for vocational training. i) ---, our students and youths have a false sense of dignity. j) ---, they run after jobs blindly.",
    blanks: [
      { id: "a", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the severity of unemployment as a current issue, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "b", answer: "Now", ruleId: 0, explanation: "Now is not explicitly listed as a linker in rules.js; it’s a temporal adverb, so ruleId is 0." },
      { id: "c", answer: "But", ruleId: 18, explanation: "But contrasts global unemployment with Bangladesh’s severe case, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "d", answer: "But", ruleId: 18, explanation: "But further contrasts the global situation with Bangladesh’s acute problem, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "e", answer: "However", ruleId: 27, explanation: "However introduces the reasons for unemployment, contrasting with the problem’s severity, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "f", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of reasons for unemployment, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "g", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of reasons, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "h", answer: "Thirdly", ruleId: 17, explanation: "Thirdly further continues the sequence of reasons, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "i", answer: "In addition", ruleId: 4, explanation: "In addition adds another reason for unemployment, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "j", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes that the false sense of dignity leads to blind job pursuit, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "cumilla-2019-connectors",
    year: 2019,
    board: "Cumilla Board",
    passage: "Unemployment is a great curse. (a) --- all the countries of the world suffer from the curse. (b) --- nowhere in the world, this problem is so acute as in our country. (c) --- there are many reasons behind it. (d) ---, our country is industrially backward. (e) --- our traditional education system is not service-oriented. (f) ---, our students and youths have a false sense of dignity. (g) ---, they run after jobs only. (h) ---, unemployment problem should be removed at any cost. (i) --- our education system should be changed (j) --- more mills and factories should be established.",
    blanks: [
      { id: "a", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the global prevalence of unemployment, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "b", answer: "But", ruleId: 18, explanation: "But contrasts global unemployment with its severity in our country, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "c", answer: "Actually", ruleId: 29, explanation: "Actually introduces the reasons for unemployment, emphasizing their truth, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "d", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of reasons for unemployment, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "e", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of reasons, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "f", answer: "Thirdly", ruleId: 17, explanation: "Thirdly further continues the sequence of reasons, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "g", answer: "So", ruleId: 1, explanation: "So indicates the consequence of a false sense of dignity leading to job pursuit, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "h", answer: "However", ruleId: 27, explanation: "However contrasts the reasons with the need to remove unemployment, aligning with Rule 27 (However/ nevertheless...) for contrast." },
      { id: "i", answer: "Moreover", ruleId: 4, explanation: "Moreover adds a solution to unemployment, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "j", answer: "In addition", ruleId: 4, explanation: "In addition adds another solution, matching Rule 4 (Moreover/ besides/ furthermore...) for additional points." }
    ]
  },
  {
    id: "jashore-2019-connectors",
    year: 2019,
    board: "Jashore Board",
    passage: "Honesty is a noble virtue. The man (a) --- possesses this rare quality is the happiest man on earth. To be honest, a man should have trustworthiness (b) --- nobody trusts a liar. A liar may prosper for the time being, (c) --- ultimately he goes to the dogs. (d) --- we should be honest. It is said that honesty is the best policy (e) --- dishonesty is the sign of downfall. God helps those who are honest. (f) --- dishonest people are cursed; Childhood is the best time (g) --- children should be taught honesty. It is said (h)--- children should be allowed to mix with those friends (i) ---are honest. (j) --- they can mould their characters.",
    blanks: [
      { id: "a", answer: "Who", ruleId: 10, explanation: "Who refers to the man as the subject of the clause, matching Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "b", answer: "Because", ruleId: 49, explanation: "Because explains why nobody trusts a liar, aligning with Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "c", answer: "But", ruleId: 18, explanation: "But contrasts temporary prosperity with eventual failure, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "d", answer: "So", ruleId: 1, explanation: "So concludes the need for honesty based on the liar’s fate, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "e", answer: "Whereas", ruleId: 18, explanation: "Whereas contrasts honesty with dishonesty’s downfall, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "f", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the point about dishonest people being cursed, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "g", answer: "Therefore", ruleId: 1, explanation: "Therefore indicates the consequence of childhood being the best time to teach honesty, matching Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "h", answer: "That", ruleId: 45, explanation: "That introduces a clause about allowing children to mix with honest friends, fitting Rule 45 (That) for explanatory clauses." },
      { id: "i", answer: "In addition", ruleId: 4, explanation: "In addition adds the point about choosing honest friends, matching Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "j", answer: "Thus", ruleId: 25, explanation: "Thus describes how honest friends help mould character, fitting Rule 25 (Thus/ in this way) for describing how events occur." }
    ]
  },
  {
    id: "sylhet-2019-connectors",
    year: 2019,
    board: "Sylhet Board",
    passage: "Education is essential in our life. a) --- we are not properly educated, we cannot live an honourable life in society. It teaches us b) --- how to earn but also how to spend. c) ---, it teaches d) --- to live in amity with others in society. e) ---, we must get the proper education. f) --- we should bear in mind g) --- education is not only what we learn at educational institutions but also h) --- we learn outside these institutions. i) ---, education is a lifelong process. It begins just after our birth j) --- ends only in death.",
    blanks: [
      { id: "a", answer: "If", ruleId: 37, explanation: "If introduces a conditional outcome of not being educated, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "b", answer: "Not only", ruleId: 6, explanation: "Not only introduces the first of paired ideas about earning and spending, matching Rule 6 (Not only … but also) for paired structures." },
      { id: "c", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the additional teaching of living in amity, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "d", answer: "How", ruleId: 10, explanation: "How acts as a relative pronoun introducing the manner of living in amity, matching Rule 10 (Relative pronouns: Who, which, that, what...) for connecting clauses." },
      { id: "e", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the need for proper education based on its benefits, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "f", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts formal education with broader learning, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "g", answer: "That", ruleId: 45, explanation: "That introduces a clause about the scope of education, fitting Rule 45 (That) for explanatory clauses." },
      { id: "h", answer: "What", ruleId: 10, explanation: "What acts as a relative pronoun referring to learning outside institutions, matching Rule 10 (Relative pronouns: Who, which, that, what...) for connecting clauses." },
      { id: "i", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes education as a lifelong process, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "j", answer: "And", ruleId: 5, explanation: "And connects the start and end of education’s timeline, fitting Rule 5 (And/ as well as...) for joining elements." }
    ]
  },
  {
    id: "barishal-2019-connectors",
    year: 2019,
    board: "Barishal Board",
    passage: "We should always keep in mind a) --- all kinds of physical exercise are not suitable for all. b) --- different people have different capacities. c) ---, harder exercise (d) --- wrestling and gymnastics are suitable for young people e) --- they have the energy to perform them. Weaker and old people should take the milder exercise f)--- walking, jogging and freehand exercise. Over exercise never does good, g) --- it breaks down the health. h) ---, we should always take those exercises i) --- would suit us. Physical exercise is important for the preservation of good health. It j) --- builds our character.",
    blanks: [
      { id: "a", answer: "That", ruleId: 45, explanation: "That introduces a clause about the suitability of exercises, fitting Rule 45 (That) for explanatory clauses." },
      { id: "b", answer: "For", ruleId: 49, explanation: "For explains why exercises vary, aligning with Rule 49 (As/ since/ because...) for indicating cause, as 'for' is a synonym in this context." },
      { id: "c", answer: "For example", ruleId: 20, explanation: "For example provides examples of harder exercises, fitting Rule 20 (For instance/ for example...) for examples." },
      { id: "d", answer: "Like", ruleId: 22, explanation: "Like introduces examples of specific exercises, matching Rule 22 (Such as/ like...) for exemplification." },
      { id: "e", answer: "As", ruleId: 49, explanation: "As explains why young people can perform harder exercises, aligning with Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "f", answer: "Like", ruleId: 22, explanation: "Like introduces examples of milder exercises, matching Rule 22 (Such as/ like...) for exemplification." },
      { id: "g", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes the negative effect of over-exercise, fitting Rule 31 (Rather) for emphasis." },
      { id: "h", answer: "So", ruleId: 1, explanation: "So concludes the need to choose suitable exercises, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "i", answer: "Which", ruleId: 10, explanation: "Which refers to exercises that suit us, matching Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "j", answer: "Also", ruleId: 15, explanation: "Also adds the benefit of character building, fitting Rule 15 (Too/ also/ as well) for additional information." }
    ]
  },
  {
    id: "chattogram-2019-connectors",
    year: 2019,
    board: "Chattogram Board",
    passage: "We must be aware of the dangers of smoking. It is harmful to us in various ways. It causes various diseases a) --- blood pressure, heart attack, bronchitis, cancer, etc. b) --- it pollutes air. c) -- smoking causes harm to d) ---the smokers e)--- the non-smokers who remain by them. f) --- we should give up smoking. g) ---it is h) --- great an addiction to get rid of. i) --- nothing is impossible for us. j) --- we are determined to give up, we can certainly do it.",
    blanks: [
      { id: "a", answer: "Such as", ruleId: 22, explanation: "Such as introduces examples of diseases caused by smoking, fitting Rule 22 (Such as/ like...) for exemplification." },
      { id: "b", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of smoking’s harms, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "c", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of smoking’s harms, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "d", answer: "Not only", ruleId: 6, explanation: "Not only introduces the first group affected by smoking, fitting Rule 6 (Not only … but also) for paired structures." },
      { id: "e", answer: "But also", ruleId: 6, explanation: "But also completes the pair with non-smokers, matching Rule 6 (Not only … but also) for paired structures." },
      { id: "f", answer: "So", ruleId: 1, explanation: "So concludes the need to quit smoking due to its harms, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "g", answer: "But", ruleId: 18, explanation: "But contrasts the need to quit with the difficulty of addiction, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "h", answer: "So", ruleId: 0, explanation: "So in this context is an intensifier, not a linker in rules.js, so no rule applies, and ruleId is 0." },
      { id: "i", answer: "But", ruleId: 18, explanation: "But contrasts addiction’s difficulty with the possibility of quitting, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "j", answer: "If", ruleId: 37, explanation: "If introduces a conditional outcome of determination leading to quitting, fitting Rule 37 (If/ even if/ unless) for conditional statements." }
    ]
  },
  {
    id: "dinajpur-2019-connectors",
    year: 2019,
    board: "Dinajpur Board",
    passage: "We cannot walk on a road in the darkness without light. a) ---, we cannot step forward in our life without education. b) ---, throughout the ages, education has always been compared to light and c) --- ignorance has been compared to darkness. d) --- the light of education enlightens us. e) ---, it broadens our mind and widens our outlook. f) ---, it is education which helps us to become a good citizen. g) ---, education creates good citizens and ensures the smooth development of country. h) --- ignorance stands on the way of development of an individual. i)--- ignorance has a detrimental effect on the overall development of a nation. j) ---, we should come forward to educate every single person of our country and thereby, ensure the development of our country.",
    blanks: [
      { id: "a", answer: "Similarly", ruleId: 30, explanation: "Similarly compares the need for light to the need for education, fitting Rule 30 (Similarly/ likewise) for comparison." },
      { id: "b", answer: "So", ruleId: 1, explanation: "So introduces the historical comparison of education to light, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "c", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts education with ignorance, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "d", answer: "Certainly", ruleId: 29, explanation: "Certainly emphasizes the enlightening effect of education, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "e", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the benefit of broadening the mind, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "f", answer: "Again", ruleId: 4, explanation: "Again adds another benefit of education, matching Rule 4 (Moreover/ besides/ again...) for additional points." },
      { id: "g", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes that education ensures national development, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "h", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts education’s benefits with ignorance’s hindrance, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "i", answer: "Hence", ruleId: 1, explanation: "Hence indicates the consequence of ignorance affecting national development, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "So", ruleId: 1, explanation: "So concludes the need to educate everyone for national development, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
   {
    id: "dhaka-2022-connectors",
    year: 2022,
    board: "Dhaka Board",
    passage: "Once there lived a grasshopper and an ant. The ant was hard-working. (a)---, the grasshopper was lazy. (b) ---, he idled away his time dancing and sleeping. (c) --- he sometimes advised the ant not to work so hard. (d) ---, the ant paid no heed to the grasshopper. (e) ---, he continued to work hard gathering food for the coming winter. (f) ---, winter came, covering everything with snow. The surface of the earth went under the snow-cover. (g) --- the grasshopper could not find any food. (h) ---, he had nothing in stock. (i) ---, he went to the ant for help. The ant gave him some food for the day. (j) ---, the long winter was ahead, and the grasshopper was really worried about his survival.",
    blanks: [
      { id: "a", answer: "But", ruleId: 18, explanation: "But contrasts the ant’s hard-working nature with the grasshopper’s laziness, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "b", answer: "That’s why", ruleId: 1, explanation: "That’s why explains why the grasshopper idled due to his laziness, aligning with Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "c", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the grasshopper’s action of advising the ant, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "d", answer: "But", ruleId: 18, explanation: "But contrasts the grasshopper’s advice with the ant’s disregard, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "e", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes the ant’s continued hard work over heeding the grasshopper, fitting Rule 31 (Rather) for emphasis." },
      { id: "f", answer: "Then", ruleId: 13, explanation: "Then indicates the sequence of winter arriving after the ant’s preparation, fitting Rule 13 (At the same time/ after that/ then...) for sequential events." },
      { id: "g", answer: "That is why", ruleId: 1, explanation: "That is why explains why the grasshopper found no food due to snow cover, aligning with Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "h", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the grasshopper’s lack of food stock, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "i", answer: "So", ruleId: 1, explanation: "So indicates the consequence of having no food, leading to seeking help, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "However", ruleId: 27, explanation: "However contrasts the temporary help with the ongoing worry about winter, matching Rule 27 (However/ nevertheless...) for contrast." }
    ]
  },
  {
    id: "rajshahi-2022-connectors",
    year: 2022,
    board: "Rajshahi Board",
    passage: "Air is an important element of our environment. (a) ---, clean air is essential for our life. (b) ---, air is polluted in many ways. (c) ---, one thing that pollutes air is smoke. Smoke is produced from different sources. (d) ---, we make fire to cook food and it creates smoke. (e) ---, buses and trucks plying in the roads emit smoke. (f) ---, the burning of coal in the railway engine also produces smoke. (g) ---, the mills and factories also produce a huge amount of smoke. (h)- - melt tar for road constructions which produces black smoke (i) --- all these smokes mix with the air and pollute it. (j) ---, smoke from different sources is causing serious harm to our environment.",
    blanks: [
      { id: "a", answer: "Indeed", ruleId: 29, explanation: "Indeed emphasizes the importance of clean air, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "b", answer: "However", ruleId: 27, explanation: "However contrasts the need for clean air with its pollution, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "c", answer: "For example", ruleId: 20, explanation: "For example introduces smoke as a pollutant, fitting Rule 20 (For instance/ for example...) for examples." },
      { id: "d", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of smoke sources, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "e", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of smoke sources, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "f", answer: "Besides", ruleId: 4, explanation: "Besides adds another source of smoke, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "g", answer: "Thirdly", ruleId: 17, explanation: "Thirdly further continues the sequence of smoke sources, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "h", answer: "In addition", ruleId: 4, explanation: "In addition adds tar melting as a source of smoke, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "i", answer: "As a result", ruleId: 1, explanation: "As a result indicates the consequence of smoke mixing with air, causing pollution, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "Thus", ruleId: 25, explanation: "Thus concludes how smoke causes environmental harm, fitting Rule 25 (Thus/ in this way) for describing how events occur." }
    ]
  },
  {
    id: "cumilla-2022-connectors",
    year: 2022,
    board: "Cumilla Board",
    passage: "Mobile phones are one of the most commonly used gadgets in today's world. (a) ---, mobile phones have made our life easy and convenient. (b) --- they are a blessing till we use them judiciously. (c) ---, they are very beneficial; they have some disadvantages. (d) ---, excessive use of the device acts as a barrier to quality communication. (e) ---, mobile phones waste a lot of time. (f) ---, they are the causes of many ailments such as weak eyesight, strain on brain, headaches, dry eyes, sleeplessness and more. (g) ---, they have created a lack of privacy in people's lives. (h) ---, we see how the device is both a boon and a bane. (i) --- ,we must not let mobile phones control our lives. (j) --- we must know when to draw the line.",
    blanks: [
      { id: "a", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." },
      { id: "b", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." },
      { id: "c", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." },
      { id: "d", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." },
      { id: "e", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." },
      { id: "f", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." },
      { id: "g", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." },
      { id: "h", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." },
      { id: "i", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." },
      { id: "j", answer: "", ruleId: 0, explanation: "No answer provided in the input; therefore, no rule can be assigned, and ruleId is 0." }
    ]
  },
  {
    id: "jashore-2022-connectors",
    year: 2022,
    board: "Jashore Board",
    passage: "Drug addiction is a great curse of the present world. (a) --- a few things were used as drugs. (b) --- the number of drugs has increased. (c) ---, cocaine, marijuana, opium, heroine, morphine, etc. (d) --- drugs offer another world to the addicted ones. (e) --- they do not know that this addiction destroys the inner part of the body of addicted persons. (f) ---, why do many people take drugs? The reasons are many. (g)---, some people are tempted by their so-called friends to have a taste of a drug. (h) ---, they are trapped forever. (i) --- some people take drugs to forget the frustration of their life. (j) --- , those who become drug addicts cannot live a normal life.",
    blanks: [
      { id: "a", answer: "Earlier", ruleId: 0, explanation: "Earlier is not a linker in rules.js; it’s a temporal adverb, so ruleId is 0." },
      { id: "b", answer: "Nowadays", ruleId: 0, explanation: "Nowadays is not a linker in rules.js; it’s a temporal adverb, so ruleId is 0." },
      { id: "c", answer: "For example", ruleId: 20, explanation: "For example introduces specific drugs, fitting Rule 20 (For instance/ for example...) for examples." },
      { id: "d", answer: "All these", ruleId: 0, explanation: "All these is not a linker in rules.js; it’s a determiner phrase, so ruleId is 0." },
      { id: "e", answer: "But", ruleId: 18, explanation: "But contrasts the perceived escape of drugs with their harmful effects, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "f", answer: "Then", ruleId: 13, explanation: "Then introduces the question about drug use as a sequential point, fitting Rule 13 (At the same time/ after that/ then...) for sequential events." },
      { id: "g", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of reasons for drug use, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "h", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of reasons, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "i", answer: "Thirdly", ruleId: 17, explanation: "Thirdly further continues the sequence of reasons, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "j", answer: "Consequently", ruleId: 1, explanation: "Consequently indicates the result of drug addiction preventing normal life, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "chattogram-2022-connectors",
    year: 2022,
    board: "Chattogram Board",
    passage: "We want success (a) --- prosperity in life. (b) --- we do not do what are needed in achieving these. (c) --- we want to make our life glorious, we must follow some rules. (d)--- we have to be industrious. (e) --- without hard work. success in life is impossible. (f) --- we should be sincere in our activities. Some people think that good luck is at the root of all achievements in life. (g) --- to them nothing is further from truth than it. (h) --- every success in life depends totally on our activities. (i) --- we spend time in idleness, we must suffer. (j) --- we should be honest in life because this virtue helps us greatly to gain our goal.",
    blanks: [
      { id: "a", answer: "And", ruleId: 5, explanation: "And connects success and prosperity as related goals, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "b", answer: "But", ruleId: 18, explanation: "But contrasts the desire for success with failure to act, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "c", answer: "If", ruleId: 37, explanation: "If introduces a conditional statement about achieving a glorious life, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "d", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of rules for success, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "e", answer: "Because", ruleId: 49, explanation: "Because explains why hard work is necessary for success, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "f", answer: "Moreover", ruleId: 4, explanation: "Moreover adds sincerity as another rule for success, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "g", answer: "But", ruleId: 18, explanation: "But contrasts the belief in luck with the truth about effort, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "h", answer: "Because", ruleId: 49, explanation: "Because explains why success depends on activities, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "i", answer: "If", ruleId: 37, explanation: "If introduces a conditional outcome of idleness leading to suffering, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "j", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the need for honesty to achieve goals, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "mymensingh-2022-connectors",
    year: 2022,
    board: "Mymensingh Board",
    passage: "The old sailor spoke so strangely (a)-- the guest stood still. The feast began (b) --- the guest could hear the music and laughter, (c) --- for some reasons he could not join the others. The old man told him about his last journey on the sea. They had sailed away to the south (d)---- they had arrived in the cold grey sea. (e) --- the sea was frozen. (f) --- the ice was all around them. The big sails opened wide (g) --- the strong wind blew them quickly through the icy waters. The weather was very cold. (h) ---, there were no birds and animals in that snow covered country. But one day the sailors saw an albatross flying towards the ship. All men were very pleased to see it and they gave it food and water. It came to the ship everyday (i) --- they called it. (j) --- one day, the old sailor killed the bird and after that everyone had to undergo terrible sufferings.",
    blanks: [
      { id: "a", answer: "That", ruleId: 45, explanation: "That introduces a clause explaining why the guest stood still, fitting Rule 45 (That) for explanatory clauses." },
      { id: "b", answer: "And", ruleId: 5, explanation: "And connects the start of the feast with the guest’s experience, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "c", answer: "But", ruleId: 18, explanation: "But contrasts hearing the feast with inability to join, aligning with Rule 18 (But/ on the other hand...) for contrast." },
      { id: "d", answer: "Until", ruleId: 35, explanation: "Until indicates the time frame of sailing until reaching the cold sea, fitting Rule 35 (Till/ until) for time duration." },
      { id: "e", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the detail of the frozen sea, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "f", answer: "And", ruleId: 5, explanation: "And connects the frozen sea with surrounding ice, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "g", answer: "As", ruleId: 49, explanation: "As explains why the sails moved quickly due to the wind, aligning with Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "h", answer: "Therefore", ruleId: 1, explanation: "Therefore indicates the consequence of cold weather leading to no wildlife, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "i", answer: "Whenever", ruleId: 26, explanation: "Whenever indicates the repeated timing of the albatross’s visits, fitting Rule 26 (When/ while) for temporal events." },
      { id: "j", answer: "But", ruleId: 18, explanation: "But contrasts the albatross’s visits with its killing, aligning with Rule 18 (But/ on the other hand...) for contrast." }
    ]
  },
   {
    id: "dhaka-2023-connectors",
    year: 2023,
    board: "Dhaka Board",
    passage: "Happiness is a relative term. (a) ----, it depends upon some factors. (b) ---, contentment is the key to happiness. (c) --- contentment varies from person to person. (d) ---, a beggar may be contented with only ten taka. (e) ---, a wealthy person may be dissatisfied even after getting one million taka. (f) ---, it is said that contentment brings happiness. (g) ---, we must learn to be contented with what we have. (h) ---, this learning is the simplest way to remain happy. (i) ---, we must remember that our life is short. (j) ---, in this short life we cannot get everything (k) --- we want. (l) --- we want everything, we will not get happiness. (m) ---, we will get frustrated and we will plunge into the world of sadness. (n) ---, it is always better to be contented with what we have than to live in eternal sadness.",
    blanks: [
      { id: "a", answer: "As", ruleId: 49, explanation: "As explains why happiness is relative due to various factors, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "b", answer: "Moreover", ruleId: 4, explanation: "Moreover adds contentment as a key factor, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "c", answer: "However", ruleId: 27, explanation: "However contrasts contentment’s importance with its variability, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "d", answer: "For example", ruleId: 20, explanation: "For example introduces the beggar’s contentment as an instance, fitting Rule 20 (For instance/ for example...) for examples." },
      { id: "e", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts the beggar’s contentment with a wealthy person’s dissatisfaction, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "f", answer: "Consequently", ruleId: 1, explanation: "Consequently indicates that contentment leads to happiness, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "g", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the need to learn contentment, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "h", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes that learning contentment is the simplest way to happiness, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "i", answer: "Additionally", ruleId: 4, explanation: "Additionally adds the reminder of life’s brevity, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "j", answer: "However", ruleId: 27, explanation: "However contrasts the reminder of short life with inability to get everything, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "k", answer: "Even if", ruleId: 37, explanation: "Even if introduces a conditional scenario of wanting everything, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "l", answer: "If", ruleId: 37, explanation: "If introduces the condition that wanting everything prevents happiness, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "m", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes frustration over happiness due to wanting everything, fitting Rule 31 (Rather) for emphasis." },
      { id: "n", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes that contentment is better than sadness, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "rajshahi-2023-connectors",
    year: 2023,
    board: "Rajshahi Board",
    passage: "The greatness of a book (a) --- depends on the acceptability of readers. (b) --- we read a book (c ) — once, we can discover many things in it. (d) --- basing on one reading, we cannot judge the standard of a book. (e) --- a book is praised (f) ---, we have no doubt about the greatness of the book. (g) --- the first reading, we may not understand the book. But if it is read more than once, we will see (h) --- it is read (i) --- praised. So, the great books are those (j) — have passed the test of time. (k) --- the appeal of a great book does not decrease. (l) --- the greatness of a book is newly felt (m) --- time passes. (n)---, a great book is widely read and reread by people all over the world.",
    blanks: [
      { id: "a", answer: "Mainly", ruleId: 0, explanation: "Mainly is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "b", answer: "If", ruleId: 37, explanation: "If introduces a condition about reading a book, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "c", answer: "For", ruleId: 49, explanation: "For explains the reason for discovering things in one reading, fitting Rule 49 (As/ since/ because...) as a synonym in this context." },
      { id: "d", answer: "But", ruleId: 18, explanation: "But contrasts discoveries with inability to judge from one reading, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "e", answer: "When", ruleId: 26, explanation: "When indicates the timing of a book being praised, fitting Rule 26 (When/ while) for temporal events." },
      { id: "f", answer: "Highly", ruleId: 0, explanation: "Highly is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "g", answer: "During", ruleId: 26, explanation: "During indicates the timing of the first reading, fitting Rule 26 (When/ while) for temporal events." },
      { id: "h", answer: "Why", ruleId: 10, explanation: "Why introduces the reason a book is read and praised, fitting Rule 10 (Relative pronouns: Who, which, that, what...) for connecting clauses." },
      { id: "i", answer: "And", ruleId: 5, explanation: "And connects reading with being praised, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "j", answer: "Which", ruleId: 10, explanation: "Which refers to great books, fitting Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "k", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the enduring appeal of great books, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "l", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes the renewed feeling of greatness, fitting Rule 31 (Rather) for emphasis." },
      { id: "m", answer: "When", ruleId: 26, explanation: "When indicates the timing of greatness being felt, fitting Rule 26 (When/ while) for temporal events." },
      { id: "n", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes that great books are widely read, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "sylhet-2023-connectors",
    year: 2023,
    board: "Sylhet Board",
    passage: "Bangladesh is a free and sovereign country. (a) --- it was a part of Pakistan from 1947 to 1971. In 1971 it became independent (b) --- started its journey as a free nation. (c) --- the journey was not smooth at all. On 7 March, 1971 (d) --- Bangabandhu delivered his speech, the common mass got united (e) --- started their preparation for a war. The Pakistani forces started mass killing (f) --- killed about 30 lakh innocent people. They thought (g) --- they could suppress the Bangalees within a few days. (h) --- the brave sons of our land proved them wrong. (i) --- the freedom fighters didn't have modem weapons in their hand, they were the real patriots and courageous. (j) ---, after few months they became successful in their mission. (k) --- the long waited date came (l) --- the Bangalees got their victory on 16 December, 1971. (m) --- we are the citizens of a free land (n) --- marching forward to the way of lasting development very quickly.",
    blanks: [
      { id: "a", answer: "Previously", ruleId: 0, explanation: "Previously is not a linker in rules.js; it’s a temporal adverb, so ruleId is 0." },
      { id: "b", answer: "And", ruleId: 5, explanation: "And connects independence with starting the journey, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "c", answer: "But", ruleId: 18, explanation: "But contrasts independence with the rough journey, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "d", answer: "When", ruleId: 26, explanation: "When indicates the timing of Bangabandhu’s speech, fitting Rule 26 (When/ while) for temporal events." },
      { id: "e", answer: "And", ruleId: 5, explanation: "And connects unity with preparation for war, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "f", answer: "And", ruleId: 5, explanation: "And connects mass killing with the number of deaths, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "g", answer: "That", ruleId: 45, explanation: "That introduces what the Pakistani forces thought, fitting Rule 45 (That) for explanatory clauses." },
      { id: "h", answer: "But", ruleId: 18, explanation: "But contrasts the Pakistani expectation with the Bangalees’ resistance, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "i", answer: "Though", ruleId: 32, explanation: "Though introduces a concession about lacking modern weapons, fitting Rule 32 (Though/ although/ even though...) for concession." },
      { id: "j", answer: "As a result", ruleId: 1, explanation: "As a result indicates the success due to patriotism, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "k", answer: "Finally", ruleId: 14, explanation: "Finally marks the culmination of the victory date, fitting Rule 14 (At the end/ finally...) for concluding events." },
      { id: "l", answer: "And", ruleId: 5, explanation: "And connects the arrival of the date with achieving victory, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "m", answer: "Now", ruleId: 0, explanation: "Now is not a linker in rules.js; it’s a temporal adverb, so ruleId is 0." },
      { id: "n", answer: "And", ruleId: 5, explanation: "And connects being citizens with progress toward development, fitting Rule 5 (And/ as well as...) for joining elements." }
    ]
  },
  {
    id: "jashore-2023-connectors",
    year: 2023,
    board: "Jashore Board",
    passage: "Leisure is the moment (a) --- a man is totally free from his work. In leisure, a man is (b) --- free from work but also from worries and tension. (c) --- it is a time, (d) --- a man is his own master and the mind is relaxed (e) --- the body is at rest. (f) --- life is full of duties. By performing our duties one after another, it our seems (g) --- our life is an exhausting business. This is the tragedy of our life that we cannot avoid our work and worries. (h) --- leisure helps us to break this chain and enable us to refresh ourselves and revive our spirit. Leisure breaks the monotony of existence with a touch of variety. (i) ---;into developed countries, we will see that people love to spend we look their leisure in different ways. (j) --- , they never idle away their leisure time. (k) --- it is seen that some people love to go for travelling, some enjoy sight-seeing in different places. (l) --- some people spend their free time playing different types of games. (m) --- leisure is always a source of joy. (n) --- everybody should try to find leisure to enjoy it to make the life happy and peaceful.",
    blanks: [
      { id: "a", answer: "When", ruleId: 26, explanation: "When indicates the timing of leisure, fitting Rule 26 (When/ while) for temporal events." },
      { id: "b", answer: "Not only", ruleId: 6, explanation: "Not only introduces freedom from work as part of a paired structure, fitting Rule 6 (Not only … but also) for paired structures." },
      { id: "c", answer: "Basically", ruleId: 0, explanation: "Basically is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "d", answer: "When", ruleId: 26, explanation: "When further defines the time of leisure, fitting Rule 26 (When/ while) for temporal events." },
      { id: "e", answer: "As well as", ruleId: 5, explanation: "As well as connects mental relaxation with physical rest, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "f", answer: "However", ruleId: 27, explanation: "However contrasts leisure with life’s duties, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "g", answer: "That", ruleId: 45, explanation: "That introduces the perception of life as exhausting, fitting Rule 45 (That) for explanatory clauses." },
      { id: "h", answer: "Hence", ruleId: 1, explanation: "Hence indicates how leisure breaks the chain of duties, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "i", answer: "If", ruleId: 37, explanation: "If introduces a condition about observing developed countries, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "j", answer: "Moreover", ruleId: 4, explanation: "Moreover adds that people don’t idle away leisure, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "k", answer: "For example", ruleId: 20, explanation: "For example introduces activities like travelling, fitting Rule 20 (For instance/ for example...) for examples." },
      { id: "l", answer: "Besides", ruleId: 4, explanation: "Besides adds playing games as another activity, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "m", answer: "Undoubtedly", ruleId: 29, explanation: "Undoubtedly emphasizes leisure as a source of joy, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "n", answer: "So", ruleId: 1, explanation: "So concludes the need to find leisure for happiness, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "dinajpur-2023-connectors",
    year: 2023,
    board: "Dinajpur Board",
    passage: "A cyclone is a devastating storm in Bangladesh that moves at a high speed. (a) --- it causes immense harm to people and property. (b) --- the inhabitants of coastal regions are the main victims of cyclone. (c) --- the cyclone of Bangladesh originates from the Bay of Bengal. (d) --- it is accompanied by thunders and heavy showers. (e) --- unbearable heat is felt for a few days. (f) --- one day the sky becomes terribly dark and strong winds begin to blow. (g) --- a terrible situation is created that lasts for hours. (h) --- it causes a great havoc causing death to people and other animals. (i) ---  dwelling houses are blown away. (j) --- the cyclone is followed by scarcity of food and outbreak of various diseases. (k) --- the great loss caused by cyclone can be reduced. (l) --- prior warning can be given to people using modern technology of weather forecast. (m) --- people and domestic animals of the cyclone-prone areas can be shifted to cyclone shelters. (n) --- a quick relief work and medical facilities should be ensured.",
    blanks: [
      { id: "a", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the harm caused by cyclones, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "b", answer: "Specifically", ruleId: 0, explanation: "Specifically is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "c", answer: "Actually", ruleId: 29, explanation: "Actually emphasizes the origin of cyclones, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "d", answer: "Moreover", ruleId: 4, explanation: "Moreover adds accompanying weather phenomena, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "e", answer: "Beforehand", ruleId: 0, explanation: "Beforehand is not a linker in rules.js; it’s a temporal adverb, so ruleId is 0." },
      { id: "f", answer: "Suddenly", ruleId: 0, explanation: "Suddenly is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "g", answer: "Then", ruleId: 13, explanation: "Then indicates the sequence of creating a terrible situation, fitting Rule 13 (At the same time/ after that/ then...) for sequential events." },
      { id: "h", answer: "Eventually", ruleId: 14, explanation: "Eventually marks the culmination of causing havoc, fitting Rule 14 (At the end/ finally...) for concluding events." },
      { id: "i", answer: "As a result", ruleId: 1, explanation: "As a result indicates the consequence of houses being blown away, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "Subsequently", ruleId: 13, explanation: "Subsequently indicates the sequence of scarcity and diseases following the cyclone, fitting Rule 13 (At the same time/ after that/ then...) for sequential events." },
      { id: "k", answer: "However", ruleId: 27, explanation: "However contrasts destruction with the possibility of reducing loss, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "l", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of mitigation measures, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "m", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of mitigation measures, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "n", answer: "Finally", ruleId: 14, explanation: "Finally concludes the sequence with relief and medical facilities, fitting Rule 14 (At the end/ finally...) for concluding events." }
    ]
  },
  {
    id: "barishal-2023-connectors",
    year: 2023,
    board: "Barishal Board",
    passage: "Scientists have always wondered (a) --- there is life anywhere out in the space. They have joined together in a major project called the communication with Extra Terrestrial Intelligence (b) --- seeks to establish contact with any other living beings in the universe. (c) ---, they are beaming out radio signals into the space. It was thought (d) --- there exists life on Mars. (e) --- two viking spacecrafts (f) --- landed on Mars in 1976 did not provide much evidence of life there. The pictures sent by them showed (g) --- the Mars has a sky; (h) --- , the sky is red instead of a blue one like ours. Its gravity is about half (i) --- strong (j) --- that of Earth. (k) ---, the atmosphere is also much thinner than our planet. It has deserts, high mountains, canals, volcanoes, craters etc. as well as summer (l) --- winter. (m) ---, there are no trees, (n) --- life forms.",
    blanks: [
      { id: "a", answer: "Whether", ruleId: 37, explanation: "Whether introduces a question about life in space, fitting Rule 37 (If/ even if/ unless) as a conditional question connector." },
      { id: "b", answer: "Which", ruleId: 10, explanation: "Which refers to the project, fitting Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "c", answer: "So", ruleId: 1, explanation: "So indicates the consequence of the project, beaming signals, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "d", answer: "That", ruleId: 45, explanation: "That introduces the belief about life on Mars, fitting Rule 45 (That) for explanatory clauses." },
      { id: "e", answer: "But", ruleId: 18, explanation: "But contrasts the belief with lack of evidence, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "f", answer: "Which", ruleId: 10, explanation: "Which refers to the spacecrafts, fitting Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "g", answer: "That", ruleId: 45, explanation: "That introduces what the pictures showed, fitting Rule 45 (That) for explanatory clauses." },
      { id: "h", answer: "However", ruleId: 27, explanation: "However contrasts Mars’ sky with Earth’s, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "i", answer: "As", ruleId: 30, explanation: "As compares Mars’ gravity strength to Earth’s, fitting Rule 30 (Similarly/ likewise) for comparison." },
      { id: "j", answer: "As", ruleId: 30, explanation: "As further compares gravity, fitting Rule 30 (Similarly/ likewise) for comparison." },
      { id: "k", answer: "Besides", ruleId: 4, explanation: "Besides adds the thinner atmosphere, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "l", answer: "And", ruleId: 5, explanation: "And connects summer with winter, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "m", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the absence of trees, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "n", answer: "Let alone", ruleId: 6, explanation: "Let alone emphasizes the absence of life forms beyond trees, fitting Rule 6 (Not only … but also) as a similar paired structure." }
    ]
  },
  {
    id: "mymensingh-2023-connectors",
    year: 2023,
    board: "Mymensingh Board",
    passage: "Time, by its very nature, is fleeting. (a) --- , time once gone is gone forever. (b) --- the sincere people realize the value of time. (c) --- not everyone is aware of the value of time. (d) --- it is seen that many of us waste time. (e) --- we realize the significance of lost time when it is too late. (f) --- we suffer in life. (g) --- all of us should make the best use of time. (h) ---- proper time management is the key to success in student life. (i) ---  we find that an ideal student is the one who makes the best use of time. (j) --- ,a lazy student fails to make the grade as he kills time. (k) --- the teachers advise their students not to waste time. (l) --- they warn the students against their addiction to social networking sites and gaming. (m) --- students should follow the advice of their teachers. (n) --- ,they will suffer in the long run.",
    blanks: [
      { id: "a", answer: "That’s why", ruleId: 1, explanation: "That’s why explains why time is gone forever due to its fleeting nature, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "b", answer: "Only", ruleId: 0, explanation: "Only is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "c", answer: "But", ruleId: 18, explanation: "But contrasts sincere people’s awareness with others’ lack of it, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "d", answer: "Sometimes", ruleId: 0, explanation: "Sometimes is not a linker in rules.js; it’s a temporal adverb, so ruleId is 0." },
      { id: "e", answer: "Unfortunately", ruleId: 0, explanation: "Unfortunately is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "f", answer: "As a result", ruleId: 1, explanation: "As a result indicates suffering due to late realization, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "g", answer: "So", ruleId: 1, explanation: "So concludes the need to use time well, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "h", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes time management’s role in success, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "i", answer: "For example", ruleId: 20, explanation: "For example introduces the ideal student as an instance, fitting Rule 20 (For instance/ for example...) for examples." },
      { id: "j", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts the ideal student with the lazy one, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "k", answer: "So", ruleId: 1, explanation: "So indicates teachers’ advice as a consequence, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "l", answer: "Besides", ruleId: 4, explanation: "Besides adds warnings about social media addiction, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "m", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the need to follow advice, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "n", answer: "Otherwise", ruleId: 39, explanation: "Otherwise warns of suffering if advice is ignored, fitting Rule 39 (Otherwise) for alternative outcomes." }
    ]
  },
  {
    id: "cumilla-2023-connectors",
    year: 2023,
    board: "Cumilla Board",
    passage: "Health (a) --- is the root of all happiness, can be enjoyed taking adequate care of body and mind. People (b) --- are always under mental stress and suffer from anxieties can not enjoy a good health. (c) --- to enjoy good health, it is also necessary to keep our mind sound. They are doctors (d) --- say that simple and carefree life is more conducive to health. Many people, (e) --- are not aware of health rules. They (f) --- take physical exercise (g) --- take proper food. (h) --- , a huge number of people of our country live below poverty line. (i) --- they can not afford to eat good food. (j) --- they can not enjoy good health. (k) --- , awareness about health rules (l) --- following them are very important in maintaining good health. (m) --- only healthy people can contribute to the national development. (n) --- we must be careful of our health.",
    blanks: [
      { id: "a", answer: "Which", ruleId: 10, explanation: "Which refers to health, fitting Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "b", answer: "Who", ruleId: 10, explanation: "Who refers to people under stress, fitting Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "c", answer: "So", ruleId: 1, explanation: "So concludes the need for a sound mind for health, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "d", answer: "Who", ruleId: 10, explanation: "Who refers to doctors, fitting Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "e", answer: "However", ruleId: 27, explanation: "However contrasts the need for health awareness with lack of it, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "f", answer: "Neither", ruleId: 6, explanation: "Neither introduces the first part of a paired negative structure, fitting Rule 6 (Not only … but also) for paired structures." },
      { id: "g", answer: "Nor", ruleId: 6, explanation: "Nor completes the paired negative structure with lack of proper food, fitting Rule 6 (Not only … but also) for paired structures." },
      { id: "h", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the poverty issue, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "i", answer: "Therefore", ruleId: 1, explanation: "Therefore indicates the consequence of poverty preventing good food, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "As a result", ruleId: 1, explanation: "As a result indicates the consequence of poor health, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "k", answer: "Indeed", ruleId: 29, explanation: "Indeed emphasizes the importance of health awareness, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "l", answer: "And", ruleId: 5, explanation: "And connects awareness with following health rules, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "m", answer: "Because", ruleId: 49, explanation: "Because explains why healthy people contribute to development, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "n", answer: "So", ruleId: 1, explanation: "So concludes the need to care for health, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "chattogram-2023-connectors",
    year: 2023,
    board: "Chattogram Board",
    passage: "Early rising is one of the best habits (a) --- a man can posses. b) --- the benefits of early rising are many. (c) ---, if we get up Early, we get enough time to work (d)---, we can enjoy the fresh air of the morning which refreshes our body and mind. (e) --- we can take some exercises or a walk. (f), in the morning nature smiles with colourful flowers and chirping of birds. (g)---, Early rising takes us to close contact with wonderful world of nature (h) --- we will suffer a lot. (i) ----, if we do not get up early in the morning, -, we do not have enough time to do our work. (j) ---, we can not finish our work in time. (k) --- late rising from bed tells upon our health. (l) --- we can never enjoy the freshness of nature. (m) ---, Early rising keeps us safe and sound both physically and mentally (n) ---, we should make a habit of early rising.",
    blanks: [
      { id: "a", answer: "That", ruleId: 10, explanation: "That refers to early rising as a habit, fitting Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "b", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the numerous benefits of early rising, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "c", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of benefits, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "d", answer: "Thus", ruleId: 25, explanation: "Thus describes how early rising leads to fresh air enjoyment, fitting Rule 25 (Thus/ in this way) for describing how events occur." },
      { id: "e", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of benefits, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "f", answer: "More importantly", ruleId: 0, explanation: "More importantly is not a linker in rules.js; it’s an adverbial phrase, so ruleId is 0." },
      { id: "g", answer: "Thus", ruleId: 25, explanation: "Thus describes how early rising connects to nature, fitting Rule 25 (Thus/ in this way) for describing how events occur." },
      { id: "h", answer: "However", ruleId: 27, explanation: "However contrasts benefits with suffering from not rising early, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "i", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of negative outcomes, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "j", answer: "As a result", ruleId: 1, explanation: "As a result indicates the consequence of insufficient time, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "k", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of negative outcomes, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "l", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the loss of nature’s freshness, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "m", answer: "As a whole", ruleId: 0, explanation: "As a whole is not a linker in rules.js; it’s a phrase, so ruleId is 0." },
      { id: "n", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the need to adopt early rising, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." }
    ]
  },
  {
    id: "dhaka-2024-connectors",
    year: 2024,
    board: "Dhaka Board",
    passage: "Teaching is a noble profession. (a) --- to be a teacher, one must possess some noble qualities too. (b) --- he should be a student. (c) --- teaching is related to knowledge, he can't acquire knowledge (d) --- he is a student. (e) --- a teacher thinks (f) --- he knows everything, he can't be a good teacher. (g) --- a thirst for knowledge is the second best quality of a teacher. (h) --- a teacher should be a psychologist. Different students have different ways of learning. (i) --- the teacher needs to teach his students by studying their psychology. Fourthly a teacher should have good delivery power. (j) --- his voice should be clear (k) --- artistic. (l) --- a teacher should be an actor (m) --- he needs to behave according to the classroom situation. And (n) --- a teacher must be a good human being.",
    blanks: [
      { id: "a", answer: "In order", ruleId: 0, explanation: "In order is not a linker in rules.js; it’s a phrase indicating purpose or sequence, so ruleId is 0." },
      { id: "b", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of qualities for a teacher, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "c", answer: "Since", ruleId: 49, explanation: "Since explains why a teacher needs to be a student due to the knowledge requirement, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "d", answer: "Unless", ruleId: 37, explanation: "Unless introduces a condition that knowledge acquisition depends on being a student, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "e", answer: "If", ruleId: 37, explanation: "If introduces a conditional scenario about a teacher’s mindset, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "f", answer: "That", ruleId: 45, explanation: "That introduces a clause about what the teacher thinks, fitting Rule 45 (That) for explanatory clauses." },
      { id: "g", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of teacher qualities, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "h", answer: "Thirdly", ruleId: 17, explanation: "Thirdly further continues the sequence of qualities, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "i", answer: "Therefore", ruleId: 1, explanation: "Therefore indicates the consequence of needing to study students’ psychology for teaching, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "Furthermore", ruleId: 4, explanation: "Furthermore adds the quality of clear voice, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "k", answer: "And", ruleId: 5, explanation: "And connects clear voice with being artistic, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "l", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the quality of being an actor, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "m", answer: "Because", ruleId: 49, explanation: "Because explains why a teacher needs to act according to the situation, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "n", answer: "Finally", ruleId: 14, explanation: "Finally concludes the sequence with being a good human, fitting Rule 14 (At the end/ finally...) for concluding events." }
    ]
  },
  {
    id: "rajshahi-2024-connectors",
    year: 2024,
    board: "Rajshahi Board",
    passage: "Mobile phone is a miracle of modern science. It has brought about a revolutionary development in the arena of communication. (a) --- it has eliminated distance (b) --- promoted human relationship. (c) --- it helps to promote business. (d) --- gearing the pace of business, it ensures the smooth growth of economy. (e) --- it can solve many problems of mathematics. (f) --- it has become a daily necessity. (g) --- it is not free from demerits. (h) --- becomes detrimental to the reckless users. (i) --- the use of mobile phone by the teenagers has to be regulated. (j) --- they will go to ruin. (k) --- if we want to save our young generation, we have to be more vigilant. (l) --- parents, teachers and neighbors can play positive role in this regard. (m) --- the people who are addicted to wanton mobile phone have to be more cautious. (n) --- they maintain abstinence, it will positively influence their offspring.",
    blanks: [
      { id: "a", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of mobile phone benefits, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "b", answer: "And", ruleId: 5, explanation: "And connects eliminating distance with promoting relationships, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "c", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of benefits, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "d", answer: "By", ruleId: 42, explanation: "By indicates the means of ensuring economic growth through business pace, fitting Rule 42 (By) for means or method." },
      { id: "e", answer: "Additionally", ruleId: 4, explanation: "Additionally adds the mathematical problem-solving benefit, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "f", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes that mobile phones are a necessity due to their benefits, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "g", answer: "However", ruleId: 27, explanation: "However contrasts benefits with demerits, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "h", answer: "For example", ruleId: 20, explanation: "For example introduces harm to reckless users as an instance, fitting Rule 20 (For instance/ for example...) for examples." },
      { id: "i", answer: "Thus", ruleId: 25, explanation: "Thus concludes the need to regulate teenagers’ use, fitting Rule 25 (Thus/ in this way) for describing how events occur." },
      { id: "j", answer: "Otherwise", ruleId: 39, explanation: "Otherwise warns of the consequence of unregulated use, fitting Rule 39 (Otherwise) for alternative outcomes." },
      { id: "k", answer: "And", ruleId: 5, explanation: "And connects the need to save the young with being vigilant, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "l", answer: "Furthermore", ruleId: 4, explanation: "Furthermore adds the role of parents and others, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "m", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the need for caution among addicts, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "n", answer: "If", ruleId: 37, explanation: "If introduces a conditional positive influence of abstinence, fitting Rule 37 (If/ even if/ unless) for conditional statements." }
    ]
  },
  {
    id: "barishal-2024-connectors",
    year: 2024,
    board: "Barishal Board",
    passage: "Time and tide wait for none. (a) --- no one can stop the march of time. (b) ---, it is very important to value our time. (c) ---, if time once has gone, we cannot regain it. (d) ---, we should not waste a single moment in vain. (e) --- we should make the proper use of very single moment of our life. (f) ---, the students should understand the value of time. (g) ---, it is a matter of great regret that some of the students pass away their valuable time in Facebook. (h) ---, they kill their time, (i) --- they cannot prepare their lessons well. (j) ---, they always have a poor preparation for the examination. (k) --- they cannot do well in the examination. (l) --- they don't stop wasting time. (m) ---, they continue to waste their time using different social media sites (n) --- it is too late for them.",
    blanks: [
      { id: "a", answer: "That is why", ruleId: 1, explanation: "That is why explains why no one can stop time, aligning with Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "b", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the importance of valuing time, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "c", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the irretrievable nature of time, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "d", answer: "Hence", ruleId: 1, explanation: "Hence indicates the consequence of not wasting time, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "e", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the need to use time properly, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "f", answer: "Especially", ruleId: 0, explanation: "Especially is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "g", answer: "However", ruleId: 27, explanation: "However contrasts the need to value time with students’ misuse, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "h", answer: "When", ruleId: 26, explanation: "When indicates the timing of time-wasting, fitting Rule 26 (When/ while) for temporal events." },
      { id: "i", answer: "So", ruleId: 1, explanation: "So shows the consequence of poor preparation due to time-wasting, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "j", answer: "As a result", ruleId: 1, explanation: "As a result indicates the outcome of poor exam preparation, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "k", answer: "Finally", ruleId: 14, explanation: "Finally concludes the sequence with poor exam performance, fitting Rule 14 (At the end/ finally...) for concluding events." },
      { id: "l", answer: "Still", ruleId: 55, explanation: "Still contrasts poor performance with continued time-wasting, aligning with Rule 55 (Yet) as a similar contrast connector." },
      { id: "m", answer: "Instead", ruleId: 31, explanation: "Instead emphasizes continued misuse over stopping, fitting Rule 31 (Rather) as a similar emphasis connector." },
      { id: "n", answer: "Until", ruleId: 35, explanation: "Until indicates the duration of time-wasting until it’s too late, fitting Rule 35 (Till/ until) for time duration." }
    ]
  },
  {
    id: "dinajpur-2024-connectors",
    year: 2024,
    board: "Dinajpur Board",
    passage: "My name is Amerigo. I am 13 years old (a) --- live on the street alone. My mother does not live with me. (b) ---, does not want me. (c) ---, she told me to go away. (d) ---, my mother is separated from my father. (e) --- she is married to another man. Probably she is happy with him.(f) ---, my father lives very far away. (g) ---, I cannot go there. (h) --- I want to go to him, he doesn't take me either. I begged him to send to me some money (i) ---I could buy a bus ticket. I am still waiting (j) --- he hasn't answered. (k) --- the streets are now my home. I used to do some works (l) ---, collecting trash, selling ice-cream of a owner etc. I sold ice-cream of the owner but he gave me nothing in return. (m) ---, I had to starve sometimes. (n) ---, my life is very hard without my parents.",
    blanks: [
      { id: "a", answer: "And", ruleId: 5, explanation: "And connects Amerigo’s age with living on the street, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "b", answer: "Because", ruleId: 49, explanation: "Because explains why the mother doesn’t live with Amerigo, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "c", answer: "Moreover", ruleId: 4, explanation: "Moreover adds the mother’s directive to leave, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "d", answer: "Unfortunately", ruleId: 0, explanation: "Unfortunately is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "e", answer: "Now", ruleId: 0, explanation: "Now is not a linker in rules.js; it’s a temporal adverb, so ruleId is 0." },
      { id: "f", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts the mother’s situation with the father’s distance, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "g", answer: "That’s why", ruleId: 1, explanation: "That’s why explains why Amerigo cannot go to his father, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "h", answer: "Even if", ruleId: 37, explanation: "Even if introduces a conditional scenario of wanting to join the father, fitting Rule 37 (If/ even if/ unless) for conditional statements." },
      { id: "i", answer: "So that", ruleId: 44, explanation: "So that indicates the purpose of begging for money, fitting Rule 44 (So that) for purpose clauses." },
      { id: "j", answer: "But", ruleId: 18, explanation: "But contrasts waiting with the father’s lack of response, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "k", answer: "For this reason", ruleId: 1, explanation: "For this reason explains why the streets are Amerigo’s home, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "l", answer: "Such as", ruleId: 22, explanation: "Such as introduces examples of work, fitting Rule 22 (Such as/ like...) for exemplification." },
      { id: "m", answer: "As a result", ruleId: 1, explanation: "As a result indicates the consequence of not being paid, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "n", answer: "Thus", ruleId: 25, explanation: "Thus concludes the hardship of life without parents, fitting Rule 25 (Thus/ in this way) for describing how events occur." }
    ]
  },
  {
    id: "chattogram-2024-connectors",
    year: 2024,
    board: "Chattogram Board",
    passage: "Self-confidence is essential to attain success in life. (a) --- a person having self-confidence has won half of the battle. Self-confidence enables a man to prosper by creating some other virtues requisite for success. (b) --- when a self-confident man fails to attain success, he becomes determined to reach his goal. This determination gives rise to some other virtues in him. (c) ---, he becomes diligent. He does not yield to failure. (d) --- he endeavours more in the process. (e) --- he becomes more sincere in his work. (f) --- he becomes successful. (g) --- a man devoid of self-confidence stumbles at every step, (h) --- he loses vitality to go ahead. (i) --- he does not try once more. (j) --- he is heard to curse his fortune. (k) --- the brave who have self-confidence can have their names enlisted in the list of the greatest men on earth. (l) --- this process has been going on since prehistoric time. (m) --- we must follow the track of the greatest people. (n) --- we have to be failure in life and lament.",
    blanks: [
      { id: "a", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the importance of self-confidence, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "b", answer: "Thus", ruleId: 25, explanation: "Thus describes how failure leads to determination in a confident person, fitting Rule 25 (Thus/ in this way) for describing how events occur." },
      { id: "c", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of virtues, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "d", answer: "Rather", ruleId: 31, explanation: "Rather emphasizes increased effort over yielding to failure, fitting Rule 31 (Rather) for emphasis." },
      { id: "e", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of virtues, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "f", answer: "Finally", ruleId: 14, explanation: "Finally concludes the sequence with success, fitting Rule 14 (At the end/ finally...) for concluding events." },
      { id: "g", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts confident people with those lacking confidence, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "h", answer: "Naturally", ruleId: 0, explanation: "Naturally is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "i", answer: "Even", ruleId: 0, explanation: "Even is not a linker in rules.js; it’s an intensifier, so ruleId is 0." },
      { id: "j", answer: "As a result", ruleId: 1, explanation: "As a result indicates the consequence of not trying again, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "k", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the success of confident people, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "l", answer: "And", ruleId: 5, explanation: "And connects the historical context with the current point, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "m", answer: "So", ruleId: 1, explanation: "So concludes the need to follow great people, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "n", answer: "Otherwise", ruleId: 39, explanation: "Otherwise warns of failure if the track is not followed, fitting Rule 39 (Otherwise) for alternative outcomes." }
    ]
  },
  {
    id: "jashore-2024-connectors",
    year: 2024,
    board: "Jashore Board",
    passage: "The internet has transformed the way we live. (a) ---, it has become an integral part of our life. On the one hand, this technology has brought us many benefits. (b) ---, it has many negative sides. (c) --- the internet, our communication systems have become much faster and more efficient. (d) ---, we can make bank transactions and pay our bills from home now. (e) ---, the internet allows us to access health information easily and, (f) ---, saves many lives. (g) ---, our learning opportunities have greatly increased, thanks to digital technologies. (h) ---, the internet is not an unmixed blessing. (i) ----, its harmful effects far outweigh its benefits. (j) ---, we should take precautions about using this technology. (k) ---, we must be careful not to become addicted to internet browsing. Second, we should keep an eye on our younger family members, (l) --- there are potential dangers in the virtual world. (m) ---, online gambling and cyberbullying are very common on the internet nowadays. (n) ---, it can be said that the internet technology is doing us more harm than good.",
    blanks: [
      { id: "a", answer: "In fact", ruleId: 29, explanation: "In fact emphasizes the internet’s integral role, fitting Rule 29 (Really/ actually/ in fact...) for asserting truth." },
      { id: "b", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts benefits with negative sides, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "c", answer: "Because of", ruleId: 50, explanation: "Because of explains why communication is faster due to the internet, fitting Rule 50 (Because of/ due to/ owing to...) for cause." },
      { id: "d", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of benefits, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "e", answer: "Secondly", ruleId: 17, explanation: "Secondly continues the sequence of benefits, matching Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "f", answer: "Thus", ruleId: 25, explanation: "Thus describes how the internet saves lives, fitting Rule 25 (Thus/ in this way) for describing how events occur." },
      { id: "g", answer: "Thirdly", ruleId: 17, explanation: "Thirdly further continues the sequence of benefits, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "h", answer: "However", ruleId: 27, explanation: "However contrasts benefits with drawbacks, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "i", answer: "Unfortunately", ruleId: 0, explanation: "Unfortunately is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "j", answer: "So", ruleId: 1, explanation: "So concludes the need for precautions, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "k", answer: "Firstly", ruleId: 17, explanation: "Firstly starts a sequence of precautions, aligning with Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "l", answer: "Because", ruleId: 49, explanation: "Because explains why we should monitor younger family members, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "m", answer: "Thirdly", ruleId: 17, explanation: "Thirdly continues the sequence of precautions, fitting Rule 17 (Firstly/ secondly/ thirdly) for sequential points." },
      { id: "n", answer: "In conclusion", ruleId: 14, explanation: "In conclusion summarizes the harm of the internet, fitting Rule 14 (At the end/ finally...) as a concluding connector." }
    ]
  },
  {
    id: "mymensingh-2024-connectors",
    year: 2024,
    board: "Mymensingh Board",
    passage: "Honesty is a noble virtue. The man (a) --- possesses this uncommon quality is the happiest man in the world. Truly speaking a man should have trustworthiness (b) ---- nobody believes a liar. A liar may prosper for the time being, (c) --- ultimately he goes to the dogs. (d) --- we should be honest in our life. It is believed that honesty is the best policy. (e) --- dishonesty is the sign of down fall. God helps those who are honest. (f) --- dishonest people are cursed. Childhood is the best time (g) --- children should be taught honesty. It is seen that children follow their parents. (h) ---, parents should be honest (i) --- they should be allowed to mix with those friends who are really honest. (j) --- parents should tell stories of honest people to children. (k) ---, they can tell the story of honest people from history. (l) --- parents should teach children how to distinguish between the right and the wrong. (m) ---children build up their character. (n) --- parents can show the path of honesty to children.",
    blanks: [
      { id: "a", answer: "Who", ruleId: 10, explanation: "Who refers to the man as the subject of the clause, fitting Rule 10 (Relative pronouns: Who, which, that...) for relative clauses." },
      { id: "b", answer: "Because", ruleId: 49, explanation: "Because explains why nobody believes a liar, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "c", answer: "But", ruleId: 18, explanation: "But contrasts temporary prosperity with eventual failure, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "d", answer: "That’s why", ruleId: 1, explanation: "That’s why concludes the need for honesty, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "e", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts honesty with dishonesty’s downfall, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "f", answer: "However", ruleId: 27, explanation: "However contrasts divine help for the honest with curses for the dishonest, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "g", answer: "When", ruleId: 26, explanation: "When indicates the timing of teaching honesty during childhood, fitting Rule 26 (When/ while) for temporal events." },
      { id: "h", answer: "For this reason", ruleId: 1, explanation: "For this reason explains why parents should be honest due to children’s imitation, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "i", answer: "And", ruleId: 5, explanation: "And connects parents’ honesty with choosing honest friends, fitting Rule 5 (And/ as well as...) for joining elements." },
      { id: "j", answer: "Besides", ruleId: 4, explanation: "Besides adds telling stories as a method, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "k", answer: "For example", ruleId: 20, explanation: "For example introduces historical stories as an instance, fitting Rule 20 (For instance/ for example...) for examples." },
      { id: "l", answer: "Also", ruleId: 15, explanation: "Also adds teaching right from wrong, fitting Rule 15 (Too/ also/ as well) for additional information." },
      { id: "m", answer: "Accordingly", ruleId: 1, explanation: "Accordingly indicates the consequence of character building, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "n", answer: "Thus", ruleId: 25, explanation: "Thus concludes how parents guide children to honesty, fitting Rule 25 (Thus/ in this way) for describing how events occur." }
    ]
  },
  {
    id: "cumilla-2024-connectors",
    year: 2024,
    board: "Cumilla Board",
    passage: "Junk food is very popular nowadays. (a) --- the children are very much fond of junk food. (b) --- the children are do we know what junk food actually is? Junk food is such kind of processed food (c) --- has been produced for its pungent taste rather than for its health value. (d) --- it contains high calories, salt, added sugar, saturated fat etc. (e) --- its nutritional value is very low. (f) ---- its appearance is very appealing and mouth watering. (g) ---- it can attract anybody. (h) --- it is harmful for health. (i) --- it consists of harmful substances, it may lead to a higher risk of obesity, cardiovascular diseases and other chronic health problems. (j) --- , it can also affect brain. (k) ---- addiction to it may even result in the rejection of healthier foods such as fruits, vegetables, salads etc. (l) ---  , the sugar used in junk food can damage our teeth and skin. (m) --- , we should avoid having junk food. (n) --- we should remember that health is the root of all happiness.",
    blanks: [
      { id: "a", answer: "Especially", ruleId: 0, explanation: "Especially is not a linker in rules.js; it’s an adverb, so ruleId is 0." },
      { id: "b", answer: "But", ruleId: 18, explanation: "But contrasts children’s fondness with lack of understanding, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "c", answer: "That", ruleId: 45, explanation: "That defines junk food’s purpose, fitting Rule 45 (That) for explanatory clauses." },
      { id: "d", answer: "In one hand", ruleId: 0, explanation: "In one hand is not a linker in rules.js; it’s a phrase, so ruleId is 0." },
      { id: "e", answer: "On the other hand", ruleId: 18, explanation: "On the other hand contrasts high calories with low nutrition, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "f", answer: "But", ruleId: 18, explanation: "But contrasts low nutrition with appealing appearance, fitting Rule 18 (But/ on the other hand...) for contrast." },
      { id: "g", answer: "Thus", ruleId: 25, explanation: "Thus describes how junk food attracts people, fitting Rule 25 (Thus/ in this way) for describing how events occur." },
      { id: "h", answer: "However", ruleId: 27, explanation: "However contrasts attraction with health harm, matching Rule 27 (However/ nevertheless...) for contrast." },
      { id: "i", answer: "Since", ruleId: 49, explanation: "Since explains why junk food leads to health risks, fitting Rule 49 (As/ since/ because...) for indicating cause." },
      { id: "j", answer: "Furthermore", ruleId: 4, explanation: "Furthermore adds the brain impact, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "k", answer: "Additionally", ruleId: 4, explanation: "Additionally adds the rejection of healthier foods, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "l", answer: "Moreover", ruleId: 4, explanation: "Moreover adds damage to teeth and skin, fitting Rule 4 (Moreover/ besides/ furthermore...) for additional points." },
      { id: "m", answer: "Therefore", ruleId: 1, explanation: "Therefore concludes the need to avoid junk food, fitting Rule 1 (As a result/ so/ therefore...) for cause and effect." },
      { id: "n", answer: "Ultimately", ruleId: 14, explanation: "Ultimately concludes the importance of health, fitting Rule 14 (At the end/ finally...) for concluding events." }
    ]
  }
  
];

const boards = ['All Boards', 'Dhaka Board', 'Chattogram Board', 'Cumilla Board', 'Rajshahi Board', 'Sylhet Board', 'Barisal Board', 'Jashore Board', 'Mymensingh Board', 'Dinajpur Board'];
const years = ['All Years', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export default function ConnectorsQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(question => {
      const matchesSearch = question.passage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.blanks.some(blank => blank.answer.toLowerCase().includes(searchTerm.toLowerCase()));
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
    
    blanks.forEach(blank => {
      const blankPattern = new RegExp(`\\(${blank.id}\\)\\s*___`, 'g');
      const replacement = showAnswers 
        ? `(${blank.id}) <span class="inline-flex items-center bg-sf-button/20 text-sf-button px-2 py-1 rounded font-semibold">${blank.answer}</span>`
        : `(${blank.id}) <span class="inline-block w-16 h-6 bg-sf-text-muted/20 border-b-2 border-sf-button rounded-sm"></span>`;
      formattedPassage = formattedPassage.replace(blankPattern, replacement);
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
                placeholder="Search in passages or answers..."
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
          HSC Connectors
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
                          <span>Hide Answers & Explanations</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span>Show Answers & Explanations</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Answers and Explanations */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-sf-text-muted/20">
                      <h4 className="text-lg font-semibold text-sf-text-bold mb-4">Answers & Explanations</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {question.blanks.map((blank) => (
                          <div
                            key={blank.id}
                            className="bg-sf-highlight/10 border border-sf-button/20 rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-sf-button border-sf-button/30">
                                ({blank.id})
                              </Badge>
                              <span className="font-semibold text-sf-text-bold">{blank.answer}</span>
                              {blank.ruleId && (
                                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                                  Rule {blank.ruleId}
                                </Badge>
                              )}
                            </div>
                            {blank.explanation && (
                              <p className="text-sm text-sf-text-subtle leading-relaxed">
                                {blank.explanation}
                              </p>
                            )}
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
