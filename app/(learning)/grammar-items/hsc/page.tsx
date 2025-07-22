import BackButton from '@/components/common/BackButton';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function HSCGrammarItemsPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Universal Topic Navigation */}
        <UniversalTopicNavigation
          level="HSC"
          section="grammar-items"
          showSearch={true}
          showFilters={true}
          showStats={true}
          showProgress={false}
        />
      </div>
    </div>
  );
}