'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Question {
  id: string;
  question: string;
  ruleId?: number;
}

const allQuestions: Question[] = [
  { "id": "barisal-2022-a", "question": "I can't recall his name. It is long since...", "ruleId": 15 },
  { "id": "barisal-2022-b", "question": "A village doctor is a person who treats...", "ruleId": 31 },
  { "id": "barisal-2022-c", "question": "Our country is beset with many problems. We all should come forward in order to...", "ruleId": 1 },
  { "id": "barisal-2022-d", "question": "Whenever he speaks in English, he makes..." },
  { "id": "barisal-2022-e", "question": "A student has to be punctual. He/She has to study regularly lest...", "ruleId": 3 },
  { "id": "chattogram-2022-a", "question": "Time once lost is lost forever. So we should..." },
  { "id": "chattogram-2022-b", "question": "All around us are not friends. In fact, friends who stand by us in our danger are...", "ruleId": 31 },
  { "id": "chattogram-2022-c", "question": "For higher education, we should learn English. So, it is high time...", "ruleId": 13 },
  { "id": "chattogram-2022-d", "question": "Neighbors are those persons who live adjacent to us. As man cannot live alone, he...", "ruleId": 31 },
  { "id": "chattogram-2022-e", "question": "Birds fly in the sky. I wish I had..." },
  { "id": "cumilla-2022-a", "question": "Had he been a poet, he would have...", "ruleId": 141 },
  { "id": "cumilla-2022-b", "question": "Honesty is a great virtue. We should not..." },
  { "id": "cumilla-2022-c", "question": "A rainy day is the day when...", "ruleId": 31 },
  { "id": "cumilla-2022-d", "question": "All of us should try our best to do something for..." },
  { "id": "cumilla-2022-e", "question": "It is very cold. They have to put on warm clothes so that...", "ruleId": 1 },
  { "id": "dhaka-2022-a", "question": "I could not recognize you at first. It was many years since...", "ruleId": 15 },
  { "id": "dhaka-2022-b", "question": "Water is polluted in different ways. It is high time...", "ruleId": 13 },
  { "id": "dhaka-2022-c", "question": "I think you are not regular in studies. Be attentive lest...", "ruleId": 3 },
  { "id": "dhaka-2022-d", "question": "Birds fly in the sky freely. Had I the wings of a bird...", "ruleId": 141 },
  { "id": "dhaka-2022-e", "question": "There are many obstacles in our way to success. We must work hard so that...", "ruleId": 1 },
  { "id": "dinajpur-2022-a", "question": "I am waiting for the chairman. Can you tell me when...", "ruleId": 31 },
  { "id": "dinajpur-2022-b", "question": "Development of a country depends on the active participation of every citizen. Bangladesh expects that every citizen..." },
  { "id": "dinajpur-2022-c", "question": "Give me your address. I will..." },
  { "id": "dinajpur-2022-d", "question": "Her son died in an accident. She was so grief-stricken that...", "ruleId": 16 },
  { "id": "dinajpur-2022-e", "question": "There is a job vacancy announced on BD.job.com. Anyone who wants to apply...", "ruleId": 31 },
  { "id": "jashore-2022-a", "question": "Sabbir Khan is a quack. He behaves as though...", "ruleId": 2 },
  { "id": "jashore-2022-b", "question": "A proverb goes that..." },
  { "id": "jashore-2022-c", "question": "I found a box in the room. The box was too heavy for me...", "ruleId": 24 },
  { "id": "jashore-2022-d", "question": "Corruption is an obstacle to our national development. It is high time...", "ruleId": 13 },
  { "id": "jashore-2022-e", "question": "It is love that means..." },
  { "id": "mymensingh-2022-a", "question": "Florence Nightingale wanted to be a nurse with a view to...", "ruleId": 1 },
  { "id": "mymensingh-2022-b", "question": "We are a free nation now. 1971 is the year when...", "ruleId": 31 },
  { "id": "mymensingh-2022-c", "question": "I don't have enough money. Had I been a rich man, I would...", "ruleId": 141 },
  { "id": "mymensingh-2022-d", "question": "My final examination is going on. I studied hard lest...", "ruleId": 3 },
  { "id": "mymensingh-2022-e", "question": "Man proposes, God..." },
  { "id": "rajshahi-2022-a", "question": "If I had a camera, I would take some photographs. I like...", "ruleId": 141 },
  { "id": "rajshahi-2022-b", "question": "Though he was brilliant, he did not score well in the examination because...", "ruleId": 4 },
  { "id": "rajshahi-2022-c", "question": "Jamil had an accident yesterday while..." },
  { "id": "rajshahi-2022-d", "question": "I am not a rich man. The car is too expensive for me...", "ruleId": 24 },
  { "id": "rajshahi-2022-e", "question": "There goes a proverb that a man is known by the company..." },
  { "id": "sylhet-2022-a", "question": "A good student must possess..." },
  { "id": "sylhet-2022-b", "question": "The student who learns by trial and error is...", "ruleId": 31 },
  { "id": "sylhet-2022-c", "question": "He must be honest in thought, active in habit and obedient to..." },
  { "id": "sylhet-2022-d", "question": "To observe the rules of health is another..." },
  { "id": "sylhet-2022-e", "question": "He who is always sincere in his studies makes...", "ruleId": 31 },
  { "id": "barishal-2023-a", "question": "Patriotism is a noble virtue. We all should have patriotism ..." },
  { "id": "barishal-2023-b", "question": "Our freedom fighters risked their lives in the war of liberation so that ...", "ruleId": 1 },
  { "id": "barishal-2023-c", "question": "He was not hungry at all. Had he been hungry, ...", "ruleId": 141 },
  { "id": "barishal-2023-d", "question": "They continued to walk until ...", "ruleId": 11 },
  { "id": "barishal-2023-e", "question": "She can't ride a bicycle, let alone ...", "ruleId": 25 },
  { "id": "barishal-2023-f", "question": "Corruption is rampant in the country. It is high time ...", "ruleId": 13 },
  { "id": "barishal-2023-g", "question": "21st February is a red-letter day in our national history because ..." },
  { "id": "barishal-2023-h", "question": "There goes a proverb that honesty ..." },
  { "id": "barishal-2023-i", "question": "Mira has not been able to recall ..." },
  { "id": "barishal-2023-j", "question": "No sooner she crossed the main gate ...", "ruleId": 5 },
  { "id": "chattogram-2023-a", "question": "We take physical exercise so that ...", "ruleId": 1 },
  { "id": "chattogram-2023-b", "question": "Air is polluted in many ways. It is high time ...", "ruleId": 13 },
  { "id": "chattogram-2023-c", "question": "Prosperity does not come in one's life automatically. If you don't try hard, ...", "ruleId": 141 },
  { "id": "chattogram-2023-d", "question": "Time is very important in our life. You can't succeed unless ...", "ruleId": 20 },
  { "id": "chattogram-2023-e", "question": "He had finished the exam before ..." },
  { "id": "chattogram-2023-f", "question": "A village doctor is a person who ...", "ruleId": 31 },
  { "id": "chattogram-2023-g", "question": "We all are attracted to gold. But ..." },
  { "id": "chattogram-2023-h", "question": "I am fond of cricket. I wish I could ..." },
  { "id": "chattogram-2023-i", "question": "He walks slowly lest ...", "ruleId": 3 },
  { "id": "chattogram-2023-j", "question": "He is dull-headed. The poem is so difficult for him ...", "ruleId": 24 },
  { "id": "cumilla-2023-a", "question": "There is a wise saying that united we stand, so ..." },
  { "id": "cumilla-2023-b", "question": "Industry is the key to success. We work hard so that ...", "ruleId": 1 },
  { "id": "cumilla-2023-c", "question": "My younger brother is very fond of me. Whenever I go out, ..." },
  { "id": "cumilla-2023-d", "question": "Bangladesh is my motherland. It is blessed with rivers. In spite of that, ...", "ruleId": 12 },
  { "id": "cumilla-2023-e", "question": "If we lose the morning hours of life, ...", "ruleId": 141 },
  { "id": "cumilla-2023-f", "question": "I can't recall his name. It is long since ...", "ruleId": 15 },
  { "id": "cumilla-2023-g", "question": "The poem is too difficult for me ...", "ruleId": 24 },
  { "id": "cumilla-2023-h", "question": "My childhood was full of joys. Would that ..." },
  { "id": "cumilla-2023-i", "question": "We met the strange person while ..." },
  { "id": "cumilla-2023-j", "question": "Would you mind giving me a ...", "ruleId": 10 },
  { "id": "dhaka-2023-a", "question": "If you maintain honesty, ...", "ruleId": 141 },
  { "id": "dhaka-2023-b", "question": "I wish I could ..." },
  { "id": "dhaka-2023-c", "question": "It is a long time ...", "ruleId": 15 },
  { "id": "dhaka-2023-d", "question": "I don't like people who ...", "ruleId": 31 },
  { "id": "dhaka-2023-e", "question": "No sooner had he got a piece of loaf on the road ...", "ruleId": 5 },
  { "id": "dhaka-2023-f", "question": "He is walking slowly lest ...", "ruleId": 3 },
  { "id": "dhaka-2023-g", "question": "If he memorizes the answer without knowing the meaning ..." },
  { "id": "dhaka-2023-h", "question": "It is high time ...", "ruleId": 13 },
  { "id": "dhaka-2023-i", "question": "Had I earned enough money ...", "ruleId": 141 },
  { "id": "dhaka-2023-j", "question": "So, I have to go to the station with a view to ...", "ruleId": 1 },
  { "id": "dinajpur-2023-a", "question": "Honesty is the best policy. The people who ...", "ruleId": 31 },
  { "id": "dinajpur-2023-b", "question": "Because of the greenhouse effect, ...", "ruleId": 22 },
  { "id": "dinajpur-2023-c", "question": "You cannot shine in life if ...", "ruleId": 141 },
  { "id": "dinajpur-2023-d", "question": "Overeating is harmful to health. It is high time ...", "ruleId": 13 },
  { "id": "dinajpur-2023-e", "question": "There goes a proverb that morning ..." },
  { "id": "dinajpur-2023-f", "question": "I work hard although ...", "ruleId": 4 },
  { "id": "dinajpur-2023-g", "question": "No sooner had I reached the college ...", "ruleId": 5 },
  { "id": "dinajpur-2023-h", "question": "There are so many poor people in our country. I wish ...", "ruleId": 27 },
  { "id": "dinajpur-2023-i", "question": "In spite of having all facilities, ...", "ruleId": 12 },
  { "id": "dinajpur-2023-j", "question": "The old man who is sitting there ...", "ruleId": 31 },
  { "id": "jashore-2023-a", "question": "Florence Nightingale wanted to be a nurse with a view to ...", "ruleId": 1 },
  { "id": "jashore-2023-b", "question": "If I had the wings of a bird, ...", "ruleId": 141 },
  { "id": "jashore-2023-c", "question": "Unity is strength. United we stand ...", "ruleId": 4 },
  { "id": "jashore-2023-d", "question": "Time plays a very crucial role in human life. We cannot prosper unless ...", "ruleId": 20 },
  { "id": "jashore-2023-e", "question": "Whenever my uncle comes to our house, ..." },
  { "id": "jashore-2023-f", "question": "It is high time you gave up ...", "ruleId": 13 },
  { "id": "jashore-2023-g", "question": "The box is very heavy. Are you sure ...", "ruleId": 24 },
  { "id": "jashore-2023-h", "question": "John is fond of reading. Whenever ..." },
  { "id": "jashore-2023-i", "question": "Rima is a good singer. She sings so well that ...", "ruleId": 16 },
  { "id": "jashore-2023-j", "question": "Since Bangladesh is an agricultural country, its economy largely depends on ..." },
  { "id": "mymensingh-2023-a", "question": "There was a little rain yesterday. If it had rained heavily, ...", "ruleId": 141 },
  { "id": "mymensingh-2023-b", "question": "Though junk foods look appetizing, ...", "ruleId": 4 },
  { "id": "mymensingh-2023-c", "question": "Opportunity does not always come. You would have succeeded ..." },
  { "id": "mymensingh-2023-d", "question": "The old man is very weak. He walks very slowly lest ...", "ruleId": 3 },
  { "id": "mymensingh-2023-e", "question": "The amount of waste is growing rapidly all over the world. It is high time ...", "ruleId": 13 },
  { "id": "mymensingh-2023-f", "question": "I wish I were a poet. I would express ..." },
  { "id": "mymensingh-2023-g", "question": "English is an international language. We need to learn it because ..." },
  { "id": "mymensingh-2023-h", "question": "Kiran got a foreign scholarship. She was so happy that ...", "ruleId": 16 },
  { "id": "mymensingh-2023-i", "question": "It was my first lecture. I was too nervous ...", "ruleId": 7 },
  { "id": "mymensingh-2023-j", "question": "Manners define a man. We always appreciate ..." },
  { "id": "rajshahi-2023-a", "question": "The martyrs laid down their lives in 1971 so that ...", "ruleId": 1 },
  { "id": "rajshahi-2023-b", "question": "It's too late. If we had reached the station a little bit earlier ...", "ruleId": 141 },
  { "id": "rajshahi-2023-c", "question": "The poem is too difficult for me ...", "ruleId": 24 },
  { "id": "rajshahi-2023-d", "question": "Danger comes where danger is feared ...", "ruleId": 31 },
  { "id": "rajshahi-2023-e", "question": "She spoke as if ...", "ruleId": 2 },
  { "id": "rajshahi-2023-f", "question": "The thief was afraid of police. He ran away lest ...", "ruleId": 3 },
  { "id": "rajshahi-2023-g", "question": "Despite his hardship ...", "ruleId": 12 },
  { "id": "rajshahi-2023-h", "question": "He took logic instead of ...", "ruleId": 14 },
  { "id": "rajshahi-2023-i", "question": "If I had been hungry, ...", "ruleId": 141 },
  { "id": "rajshahi-2023-j", "question": "Corruption is a curse. It is high time ...", "ruleId": 13 },
  { "id": "sylhet-2023-a", "question": "Most of the rivers are getting polluted day by day. It is high time ...", "ruleId": 13 },
  { "id": "sylhet-2023-b", "question": "Milk is rich in food values. We should take milk every day so that ...", "ruleId": 1 },
  { "id": "sylhet-2023-c", "question": "Mr. John is very interested in tourism. He wants to visit Bangladesh with a view to ...", "ruleId": 1 },
  { "id": "sylhet-2023-d", "question": "I like to play cricket in my leisure time. When I get a chance ..." },
  { "id": "sylhet-2023-e", "question": "No nation can develop without education. So, it is rightly said that ..." },
  { "id": "sylhet-2023-f", "question": "Mina really sings well. If she gets the opportunity, ...", "ruleId": 141 },
  { "id": "sylhet-2023-g", "question": "He was a petty clerk. But he behaved as though ...", "ruleId": 2 },
  { "id": "sylhet-2023-h", "question": "The weather of that night was very rough. I would have met you provided ...", "ruleId": 26 },
  { "id": "sylhet-2023-i", "question": "Bangladesh is a small country. Though it has a small area, ...", "ruleId": 4 },
  { "id": "sylhet-2023-j", "question": "There is not a country in the world where ...", "ruleId": 31 },
  { "id": "barishal-2024-a", "question": "It is too late. Now I —— go to lunch.", "ruleId": 24 },
  { "id": "barishal-2024-b", "question": "It is a long time since —–", "ruleId": 15 },
  { "id": "barishal-2024-c", "question": "Had I earned enough money, ——", "ruleId": 141 },
  { "id": "barishal-2024-d", "question": "He is a quack but he talks to the patients as if he ——", "ruleId": 2 },
  { "id": "barishal-2024-e", "question": "The girl returned home before evening lest she ——", "ruleId": 3 },
  { "id": "barishal-2024-f", "question": "Mira sings very well. If she gets opportunity, ——", "ruleId": 141 },
  { "id": "barishal-2024-g", "question": "The poem is too difficult for —–", "ruleId": 24 },
  { "id": "barishal-2024-h", "question": "In spite of having all facilities, the boy ——", "ruleId": 12 },
  { "id": "barishal-2024-i", "question": "Patriotism is a noble virtue. It is high time ——", "ruleId": 13 },
  { "id": "barishal-2024-j", "question": "He studied hard so that ——", "ruleId": 1 },
  { "id": "chattogram-2024-a", "question": "I miss my maternal grandmother a lot. 15 years have passed since ——", "ruleId": 15 },
  { "id": "chattogram-2024-b", "question": "Zillur and Ashraf were lucky. No sooner had they ——", "ruleId": 5 },
  { "id": "chattogram-2024-c", "question": "In our country, there are many people —– Poverty is a curse for any society.", "ruleId": 31 },
  { "id": "chattogram-2024-d", "question": "Corruption is an obstacle to our national development. It is high time", "ruleId": 13 },
  { "id": "chattogram-2024-e", "question": "Study sincerely lest ——", "ruleId": 3 },
  { "id": "chattogram-2024-f", "question": "Nurjahan studies medicine so that ——", "ruleId": 1 },
  { "id": "chattogram-2024-g", "question": "Once there was an old man who had three sons. They were so lazy that", "ruleId": 16 },
  { "id": "chattogram-2024-h", "question": "Rezwan tried his best to get the job but he could not get it. Had he got the job, he would ——", "ruleId": 141 },
  { "id": "chattogram-2024-i", "question": "The man —— can maintain a sound health.", "ruleId": 31 },
  { "id": "chattogram-2024-j", "question": "Florence Nightingale wanted to be a nurse with a view to ——", "ruleId": 1 },
  { "id": "cumilla-2024-a", "question": "I'm so tired that —–. Please, take a rickshaw right now.", "ruleId": 16 },
  { "id": "cumilla-2024-b", "question": "Though Bangladesh is a small country, ——", "ruleId": 4 },
  { "id": "cumilla-2024-c", "question": "I can't recall his name. It is long since —–", "ruleId": 15 },
  { "id": "cumilla-2024-d", "question": "She came to my room while ——. She didn't wake me up." },
  { "id": "cumilla-2024-e", "question": "It is true that most of the parents of our country are not interested enough to ——. They think, educating their daughters is nothing but a wastage of time and money." },
  { "id": "cumilla-2024-f", "question": "There are many helpless people around us. I wish ——" },
  { "id": "cumilla-2024-g", "question": "He likes photography very much. But unfortunately lost his camera. If he had the camera, —–", "ruleId": 141 },
  { "id": "cumilla-2024-h", "question": "Be punctual lest ——", "ruleId": 3 },
  { "id": "cumilla-2024-i", "question": "Our job market is getting very competitive. Unless you study well, —–", "ruleId": 20 },
  { "id": "cumilla-2024-j", "question": "It is too hot inside the room. Would you mind —–", "ruleId": 10 },
  { "id": "dhaka-2024-a", "question": "Trees are essential for our existence. So, —–" },
  { "id": "dhaka-2024-b", "question": "The rats are now thinking who will tie the bell on cat? Finally they realize it is easy to say ——" },
  { "id": "dhaka-2024-c", "question": "Wait until —–. You should not go out alone.", "ruleId": 11 },
  { "id": "dhaka-2024-d", "question": "Love is divine. You can't find others to love you unless —–", "ruleId": 20 },
  { "id": "dhaka-2024-e", "question": "Punctuality is a great virtue. So try —–" },
  { "id": "dhaka-2024-f", "question": "The patient was so serious and we were looking for a doctor. Alas! The patient had died before ——" },
  { "id": "dhaka-2024-g", "question": "Sharing is —— So, teach your children how to share." },
  { "id": "dhaka-2024-h", "question": "Everybody must be conscious of health because——" },
  { "id": "dhaka-2024-i", "question": "The train will start at 10 am. Now it is 09:55 am. So, walk fast lest ——", "ruleId": 3 },
  { "id": "dhaka-2024-j", "question": "Corruption is a hindrance to national development. It is high time ——", "ruleId": 13 },
  { "id": "dinajpur-2024-a", "question": "There goes a proverb, \"Grasp all —–. \"If you want to get everything at a time, you may end up in losing everything." },
  { "id": "dinajpur-2024-b", "question": "The first and foremost duty of a student is to study. Without —– you can never expect a good result.", "ruleId": 18 },
  { "id": "dinajpur-2024-c", "question": "You never speak the truth. I will not accompany you unless you ——", "ruleId": 20 },
  { "id": "dinajpur-2024-d", "question": "Early rising is good for health. You should rise early so that —–", "ruleId": 1 },
  { "id": "dinajpur-2024-e", "question": "Self-help is the best help and Allah helps those who —–", "ruleId": 31 },
  { "id": "dinajpur-2024-f", "question": "Don't be tensed for my return. —— after I shall have finished my work." },
  { "id": "dinajpur-2024-g", "question": "You ought to read your texts again and again with a view to ——", "ruleId": 1 },
  { "id": "dinajpur-2024-h", "question": "You should remember that if you do not work hard, you will have a chance to fail in the exam. Work hard lest ——", "ruleId": 3 },
  { "id": "dinajpur-2024-i", "question": "It is 10 O'clock now. Our train will start exactly at 11 O'clock. It is high time we ——", "ruleId": 13 },
  { "id": "dinajpur-2024-j", "question": "My childhood was full of happiness. Would that ——" },
  { "id": "jashore-2024-a", "question": "The poor man knocked at the door. He came to me with a view to ——", "ruleId": 1 },
  { "id": "jashore-2024-b", "question": "Many illiterate people do not have any knowledge of health. If they were educated ——", "ruleId": 141 },
  { "id": "jashore-2024-c", "question": "Scarcely had the teacher gone out of the room ——", "ruleId": 7 },
  { "id": "jashore-2024-d", "question": "My grandmother lives in a village. It is many years since ——", "ruleId": 15 },
  { "id": "jashore-2024-e", "question": "Trees are very important for our existence on earth. It is high time ——", "ruleId": 13 },
  { "id": "jashore-2024-f", "question": "Despite the fact that he worked very hard ——. He was rather disappointed.", "ruleId": 12 },
  { "id": "jashore-2024-g", "question": "You should finish your work today. A stitch in time ——" },
  { "id": "jashore-2024-h", "question": "You are making a long Journey. Keep your phone turned on in case ——", "ruleId": 3 },
  { "id": "jashore-2024-i", "question": "My friend is going to the USA. I wish ——" },
  { "id": "jashore-2024-j", "question": "Time is so valuable that ——", "ruleId": 16 },
  { "id": "mymensingh-2024-a", "question": "Patriotism is a noble virtue. It is high time —–", "ruleId": 13 },
  { "id": "mymensingh-2024-b", "question": "Hasan got GPA 4.50. Had he studies seriously he —–", "ruleId": 141 },
  { "id": "mymensingh-2024-c", "question": "Time is valuable. Those who waste time ——", "ruleId": 31 },
  { "id": "mymensingh-2024-d", "question": "This celling is not so high. He is tall enough ——", "ruleId": 24 },
  { "id": "mymensingh-2024-e", "question": "Lock the door and keep the key in a safe place lest —–.", "ruleId": 3 },
  { "id": "mymensingh-2024-f", "question": "You cannot understand everything clearly unless ——", "ruleId": 20 },
  { "id": "mymensingh-2024-g", "question": "A lot of passengers were waiting at the bus stop. A bus came. But the bus was so small that ——", "ruleId": 16 },
  { "id": "mymensingh-2024-h", "question": "Inspite of facing so many drawbacks in life he —— ultimately.", "ruleId": 12 },
  { "id": "mymensingh-2024-i", "question": "Ayesha is a bright student. She studies hard so that ——", "ruleId": 1 },
  { "id": "mymensingh-2024-j", "question": "Freedom is man's birthright. He is born free but everywhere —–" },
  { "id": "rajshahi-2024-a", "question": "Had you sought my help, ——", "ruleId": 141 },
  { "id": "rajshahi-2024-b", "question": "A man leading an indolent life ——" },
  { "id": "rajshahi-2024-c", "question": "Strike the rod ——" },
  { "id": "rajshahi-2024-d", "question": "The men, who love their country, ——", "ruleId": 31 },
  { "id": "rajshahi-2024-e", "question": "Be punctual in your studies ——" },
  { "id": "rajshahi-2024-f", "question": "Food adulteration is a crime. It is high time ——", "ruleId": 13 },
  { "id": "rajshahi-2024-g", "question": "Childhood is the golden period of life. I wish ——" },
  { "id": "rajshahi-2024-h", "question": "Scarcely had we got out of home ——", "ruleId": 7 },
  { "id": "rajshahi-2024-i", "question": "I know the man ——", "ruleId": 31 },
  { "id": "rajshahi-2024-j", "question": "He feigns as though —–", "ruleId": 2 }
];

const boards = ['All Boards', 'Barisal', 'Chattogram', 'Cumilla', 'Dhaka', 'Dinajpur', 'Jashore', 'Mymensingh', 'Rajshahi', 'Sylhet'];
const years = ['All Years', '2022', '2023', '2024'];

export default function CompletingSentenceQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(question => {
      const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBoard = selectedBoard === 'All Boards' || question.id.toLowerCase().includes(selectedBoard.toLowerCase());
      const matchesYear = selectedYear === 'All Years' || question.id.includes(selectedYear);
      
      return matchesSearch && matchesBoard && matchesYear;
    });
  }, [searchTerm, selectedBoard, selectedYear]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years';

  const getQuestionMetadata = (questionId: string) => {
    const parts = questionId.split('-');
    return {
      board: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
      year: parts[1],
      questionNumber: parts[2]
    };
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
                placeholder="Search in questions..."
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
          HSC Completing Sentence
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
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => {
            const metadata = getQuestionMetadata(question.id);
            
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
                      {question.ruleId && (
                        <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold">
                          Rule {question.ruleId}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-sf-text-muted">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{metadata.board}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{metadata.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-sf-text-subtle leading-relaxed text-lg">
                      {question.question}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}