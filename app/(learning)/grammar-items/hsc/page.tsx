import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function HSCGrammarItemsPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Topic Navigation */}
        <UniversalTopicNavigation
          level="HSC"
          section="grammar-items"
          showSearch={true}
          showFilters={true}
          showStats={true}
          showProgress={false}
        />
      </SafeAreaWrapper>
    </div>
  );
}