import BackButton from '@/components/common/BackButton';
import { GraduationCap, Clock } from 'lucide-react';

export default function SSCBoardQuestionsPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-text-muted/20 rounded-full">
              <Clock className="h-12 w-12 text-sf-text-muted" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            SSC <span className="text-sf-button">Board Questions</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            SSC board questions are coming soon. We're working hard to bring you 
            comprehensive SSC question collections.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-sf-text-bold mb-4">
              SSC Board Questions - Coming Soon
            </h2>
            
            <p className="text-sf-text-subtle mb-6 leading-relaxed">
              We're currently developing comprehensive SSC board questions. All SSC features are temporarily disabled while we focus on perfecting the HSC experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/board-questions/hsc"
                className="inline-flex items-center justify-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
              >
                Explore HSC Board Questions
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center bg-sf-bg border border-sf-button text-sf-button hover:bg-sf-button hover:text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}