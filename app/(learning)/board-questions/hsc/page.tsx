import BackButton from '@/components/common/BackButton';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function HSCBoardQuestionsPage() {
    return (
        <div className="min-h-screen bg-sf-bg pt-20">
            <div className="w-full">
                {/* Back Button */}
                <div className="mb-6">
                    <BackButton />
                </div>

                {/* Universal Topic Navigation */}
                <UniversalTopicNavigation
                  level="HSC"
                  section="board-questions"
                  showSearch={true}
                  showFilters={true}
                  showStats={true}
                  showProgress={false}
                />
            </div>
        </div>
    );
}