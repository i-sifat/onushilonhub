import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function ExampleTopicNavigationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        {/* HSC Get Started Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-sf-text-bold">HSC Get Started Section</h2>
          <UniversalTopicNavigation 
            level="HSC" 
            section="get-started"
            showSearch={true}
            showFilters={true}
            showStats={true}
            showProgress={true}
          />
        </section>

        {/* HSC Grammar Items Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-sf-text-bold">HSC Grammar Items Section</h2>
          <UniversalTopicNavigation 
            level="HSC" 
            section="grammar-items"
            showSearch={true}
            showFilters={true}
            showStats={true}
            showProgress={false}
          />
        </section>

        {/* HSC Board Questions Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-sf-text-bold">HSC Board Questions Section</h2>
          <UniversalTopicNavigation 
            level="HSC" 
            section="board-questions"
            showSearch={true}
            showFilters={true}
            showStats={true}
            showProgress={false}
          />
        </section>

        {/* SSC Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-sf-text-bold">SSC Section</h2>
          <UniversalTopicNavigation 
            level="SSC" 
            section="get-started"
            showSearch={true}
            showFilters={true}
            showStats={true}
            showProgress={true}
          />
        </section>

        {/* Minimal Configuration */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-sf-text-bold">Minimal Configuration</h2>
          <UniversalTopicNavigation 
            level="HSC" 
            showSearch={false}
            showFilters={false}
            showStats={false}
            showProgress={false}
          />
        </section>
      </div>
    </div>
  );
}