import { UnifiedPageLayout } from '@/components/layout';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function HSCBoardQuestionsPage() {
    return (
        <UnifiedPageLayout
            pageType="questions"
            level="HSC"
            title="Board Questions & Practice"
            description="Practice with real board questions from previous years and mock tests"
            statistics={{ topics: 9, rules: 112, questions: 74 }}
            showBackButton={true}
        >
            {/* Universal Topic Navigation */}
            <UniversalTopicNavigation
              level="HSC"
              section="board-questions"
              showSearch={true}
              showFilters={true}
              showStats={false} // Disable stats since they're now in the header
              showProgress={false}
            />
        </UnifiedPageLayout>
    );
}