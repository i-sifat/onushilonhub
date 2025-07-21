import BackButton from '@/components/common/BackButton';
import { RightFormVerbQuestionsPage } from '@/components/questions';
import { BookOpen } from 'lucide-react';

export default function HSCUseOfVerbsPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <BookOpen className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            HSC <span className="text-sf-button">Use of Verbs</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Practice using the right form of verbs with board questions. 
            Master verb forms, tenses, and subject-verb agreement patterns.
          </p>
        </div>

        {/* Questions Component */}
        <RightFormVerbQuestionsPage />
      </div>
    </div>
  );
}