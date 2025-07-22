import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';
import { Question } from '@/types/question.types';
import { GrammarRule } from '@/types/grammar.types';

// Mock data for testing
const mockQuestions: Question[] = [
  {
    id: 'test-1',
    question: 'Test question 1',
    answer: 'Test answer 1',
    difficulty: 'EASY',
    level: 'HSC',
    board: 'Dhaka',
    year: 2024
  },
  {
    id: 'test-2',
    question: 'Test question 2',
    answer: 'Test answer 2',
    difficulty: 'MEDIUM',
    level: 'HSC',
    board: 'Chattogram',
    year: 2023
  }
];

const mockGrammarRules: GrammarRule[] = [
  {
    id: 1,
    ruleNo: 'Rule 1',
    title: 'Test Grammar Rule 1',
    description: 'Test description 1',
    structures: ['Structure 1', 'Structure 2'],
    examples: ['Example 1', 'Example 2'],
    level: 'HSC',
    topic: 'transformation'
  },
  {
    id: 2,
    ruleNo: 'Rule 2',
    title: 'Test Grammar Rule 2',
    description: 'Test description 2',
    structures: ['Structure 3', 'Structure 4'],
    examples: ['Example 3', 'Example 4'],
    level: 'HSC',
    topic: 'transformation'
  }
];

export default function TestInterfaceControlsPage() {
  return (
    <div className="min-h-screen bg-sf-bg p-8 space-y-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-sf-text-bold mb-8 text-center">
          Interface Controls Theme Consistency Test
        </h1>
        
        <div className="space-y-16">
          {/* Topic Navigation with Filter Controls */}
          <section>
            <h2 className="text-2xl font-semibold text-sf-text-bold mb-6">
              Topic Navigation Controls
            </h2>
            <UniversalTopicNavigation 
              level="HSC" 
              section="board-questions"
              showSearch={true}
              showFilters={true}
            />
          </section>

          {/* Questions UI with List/Grid Toggle */}
          <section>
            <h2 className="text-2xl font-semibold text-sf-text-bold mb-6">
              Questions UI Controls
            </h2>
            <UniversalQuestionsUI
              topic="Test Questions"
              topicSlug="transformation"
              questions={mockQuestions}
              level="HSC"
            />
          </section>

          {/* Grammar UI with List/Grid Toggle */}
          <section>
            <h2 className="text-2xl font-semibold text-sf-text-bold mb-6">
              Grammar UI Controls
            </h2>
            <UniversalGrammarUI
              topic="Test Grammar"
              topicSlug="transformation"
              rules={mockGrammarRules}
              level="HSC"
            />
          </section>
        </div>

        {/* Color Reference */}
        <section className="mt-16 p-6 bg-sf-bg border border-sf-text-muted/20 rounded-lg">
          <h3 className="text-xl font-semibold text-sf-text-bold mb-4">
            Theme Color Reference
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-sf-button rounded-lg text-sf-bg font-semibold">
              sf-button (#febc38)
            </div>
            <div className="p-4 bg-sf-text-bold rounded-lg text-sf-bg font-semibold">
              sf-text-bold (#cfcfcf)
            </div>
            <div className="p-4 bg-sf-text-subtle rounded-lg text-sf-bg font-semibold">
              sf-text-subtle (#e8e8e8)
            </div>
            <div className="p-4 bg-sf-text-muted rounded-lg text-sf-bg font-semibold">
              sf-text-muted (#b8b8b8)
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}