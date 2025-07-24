'use client';

import React from 'react';
import { UnifiedPageLayout } from '@/components/layout';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function CombinedSectionPage() {
  return (
    <UnifiedPageLayout
      pageType="combined"
      title="Combined Section"
      description="Study grammar rules and practice questions together in an integrated learning experience"
      statistics={{ topics: 9, sections: 2 }}
      showBackButton={true}
    >
      <UniversalTopicNavigation
        level="HSC"
        section="combined-section"
        showSearch={true}
        showFilters={true}
        showStats={false}
        showProgress={false}
      />
    </UnifiedPageLayout>
  );
}