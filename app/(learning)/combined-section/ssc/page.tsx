'use client';

import React from 'react';
import { UnifiedPageLayout } from '@/components/layout';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function SSCCombinedSectionPage() {
  return (
    <UnifiedPageLayout
      pageType="combined"
      level="SSC"
      title="SSC Combined Section"
      description="Study SSC grammar rules and practice questions together in an integrated learning experience"
      statistics={{ topics: 6, rules: 85, questions: 320 }}
      showBackButton={true}
    >
      <UniversalTopicNavigation
        level="SSC"
        section="combined-section"
        showSearch={true}
        showFilters={true}
        showStats={false}
        showProgress={false}
      />
    </UnifiedPageLayout>
  );
}