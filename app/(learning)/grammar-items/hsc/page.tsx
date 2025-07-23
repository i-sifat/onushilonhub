import { UnifiedPageLayout } from '@/components/layout';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function HSCGrammarItemsPage() {
  return (
    <UnifiedPageLayout
      pageType="grammar"
      level="HSC"
      title="Grammar Rules & Concepts"
      description="Explore comprehensive grammar rules, structures, and examples for each topic"
      statistics={{ topics: 9, rules: 112 }}
      showBackButton={true}
    >
      {/* Universal Topic Navigation */}
      <UniversalTopicNavigation
        level="HSC"
        section="grammar-items"
        showSearch={true}
        showFilters={true}
        showStats={false} // Disable stats since they're now in the header
        showProgress={false}
      />
    </UnifiedPageLayout>
  );
}