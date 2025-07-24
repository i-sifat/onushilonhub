'use client';

import React from 'react';
import CombinedSectionLayout from '@/components/combined/CombinedSectionLayout';
import { ModifierRule } from '@/data/grammar-rules/modifier';
import { ModifierQuestion } from '@/data/questions/modifier';

// Test data to avoid TypeScript errors in the main data files
const testRules: ModifierRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Use adjective to pre-modify the noun",
    banglaDescription: "Adjective noun-এর গুণ বা বৈশিষ্ট্য বর্ণনা করে। অতএব, noun-এর পূর্বে adjective বসিয়ে noun-কে pre-modify করতে হয়।",
    examples: ["Cricket is an [international] game. (Dhaka-2023)", "He was a [noble] man in our history. (Rajshahi-2023)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Use Determiner to pre-modify the noun",
    banglaDescription: "Determiner noun-এর পরিমাণ বা নির্দিষ্টতা নির্দেশ করে। সুতরাং, noun-এর পূর্বে determiner বসিয়ে noun-কে pre-modify করতে হয়।",
    examples: ["[Each] team consists of eleven players. (Dhaka-2023)", "[This] substance is found in the water of the tube well. (Dhaka-2019)"],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Use Intensifier to pre-modify the adjective",
    banglaDescription: "Intensifier (e.g., very, too, so, quite) adjective-এর তীব্রতা বা মাত্রা বৃদ্ধি বা হ্রাস করে। তাই, adjective-এর পূর্বে intensifier বসিয়ে adjective-কে pre-modify করতে হয়।",
    examples: ["He was [so] kind that he risked his life. (Rajshahi-2023)", "It was a [very] weak boy who was drowning. (Rajshahi-2023)"],
    topic: 'modifier',
    level: 'HSC'
  }
];

const testQuestions: ModifierQuestion[] = [
  {
    id: "q1",
    topic: 'modifier',
    level: 'HSC',
    question: "Cricket is an (a) --- (pre-modify the noun) game. It is not a game of (b) --- (use possessive to pre-modify the noun) country.",
    answer: "(a) international; (b) our",
    board: 'Dhaka',
    year: 2023,
    ruleId: 1
  },
  {
    id: "q2",
    topic: 'modifier',
    level: 'HSC',
    question: "(c) --- (use determiner to pre-modify the noun) team consists of eleven players.",
    answer: "(c) Each",
    board: 'Dhaka',
    year: 2023,
    ruleId: 2
  },
  {
    id: "q3",
    topic: 'modifier',
    level: 'HSC',
    question: "He was (d) --- (use an intensifier to pre-modify the adjective) kind that he risked his life.",
    answer: "(d) so",
    board: 'Rajshahi',
    year: 2023,
    ruleId: 3
  }
];

export default function TestCombinedLayoutPage() {
  return (
    <div className="min-h-screen bg-sf-bg">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-sf-text-bold mb-2">
            Combined Section Layout Test
          </h1>
          <p className="text-sf-text-muted">
            Testing the responsive two-panel layout with rule selection and question display.
          </p>
        </div>
        
        <div className="h-[800px] border border-sf-text-muted/20 rounded-xl overflow-hidden">
          <CombinedSectionLayout
            topic="Modifier"
            level="HSC"
            rules={testRules}
            questions={testQuestions}
          />
        </div>
      </div>
    </div>
  );
}