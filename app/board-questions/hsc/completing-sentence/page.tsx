import BackButton from '@/components/common/BackButton';
import CompletingSentenceQuestions from '@/components/questions/CompletingSentenceQuestions';
import { BookOpen } from 'lucide-react';
import questions2022 from '@/content/questions/hsc/completingSentence/questions/2022/questions.json';
import questions2023 from '@/content/questions/hsc/completingSentence/questions/2023/questions.json';
import questions2024 from '@/content/questions/hsc/completingSentence/questions/2024/questions.json';
import { Question } from '@/types';

const allQuestions: Question[] = [...questions2022, ...questions2023, ...questions2024].map(q => ({
  ...q,
  year: parseInt(q.id.split('-')[1]),
  board: q.id.split('-')[0].charAt(0).toUpperCase() + q.id.split('-')[0].slice(1)
}));

export default function HSCCompletingSentencePage() {
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
            HSC <span className="text-sf-button">Completing Sentence</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Practice completing sentences with board questions from 2022-2024. 
            Master the art of sentence completion with proper grammar rules and context.
          </p>
        </div>

        {/* Questions Component */}
        <CompletingSentenceQuestions questions={allQuestions} />
      </div>
    </div>
  );
}
