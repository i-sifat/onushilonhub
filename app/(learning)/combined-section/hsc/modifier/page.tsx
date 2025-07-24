'use client';

import CombinedSectionLayout from '@/components/combined/CombinedSectionLayout';
import { modifierRules } from '@/data/grammar-rules/modifier';
import { modifierQuestions } from '@/data/questions/modifier';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import { createCombinedSectionConfig } from '@/lib/utils/combined-section-helpers';

export default function HSCModifierCombinedPage() {
  // Use the extensible helper function to create configuration
  const config = createCombinedSectionConfig('Modifier', 'HSC', modifierRules, modifierQuestions);

  return (
    <SafeAreaWrapper>
      <div className="min-h-screen bg-sf-bg">
        <CombinedSectionLayout
          topic={config.topic}
          level={config.level}
          rules={config.rules}
          questions={config.questions}
        />
      </div>
    </SafeAreaWrapper>
  );
}