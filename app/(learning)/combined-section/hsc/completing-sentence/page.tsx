'use client';

import CombinedSectionLayout from '@/components/combined/CombinedSectionLayout';
import { completingSentenceRules } from '@/data/grammar-rules/completing-sentence';
import { completingSentenceQuestions } from '@/data/questions/completing-sentence';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import { createCombinedSectionConfig } from '@/lib/utils/combined-section-helpers';

export default function HSCCompletingSentenceCombinedPage() {
  // Use the extensible helper function to create configuration
  const config = createCombinedSectionConfig('Completing Sentence', 'HSC', completingSentenceRules, completingSentenceQuestions);

  return (
    <SafeAreaWrapper>
      <div className="min-h-screen bg-sf-bg">
        <CombinedSectionLayout
          topic={config.topic}
          level={config.level}
          rules={config.rules}
          questions={config.questions}
          ruleQuestionMapping={config.ruleQuestionMapping}
          questionCounts={config.questionCounts}
        />
      </div>
    </SafeAreaWrapper>
  );
}