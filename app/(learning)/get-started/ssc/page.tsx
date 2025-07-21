import BackButton from '@/components/common/BackButton';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function SSCGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Universal Topic Navigation */}
        <UniversalTopicNavigation
          level="SSC"
          section="get-started"
          showSearch={true}
          showFilters={true}
          showStats={true}
          showProgress={false}
        />
      </div>
    </div>
  );
}