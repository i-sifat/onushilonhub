import { UnifiedPageLayout } from '@/components/layout';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function HSCGetStartedPage() {
  return (
    <UnifiedPageLayout
      pageType="combined"
      level="HSC"
      title="Get Started with Learning"
      description="Begin your learning journey with interactive lessons and practice exercises"
      statistics={{ topics: 9, rules: 112, questions: 74 }}
      showBackButton={true}
    >
      {/* Universal Topic Navigation */}
      <UniversalTopicNavigation
        level="HSC"
        section="get-started"
        showSearch={true}
        showFilters={true}
        showStats={false} // Disable stats since they're now in the header
        showProgress={false}
      />
    </UnifiedPageLayout>
  );
}