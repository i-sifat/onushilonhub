import { BackButton, LevelSelectionGrid } from '@/components/common';
import { BOARD_QUESTIONS_LEVELS } from '@/lib/constants/levelData';
import { FileText } from 'lucide-react';

export default function BoardQuestionsPage() {

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <FileText className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            Board <span className="text-sf-button">Questions</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Access thousands of board questions from HSC and SSC examinations. 
            Practice with real questions from all major education boards in Bangladesh.
          </p>
        </div>

        {/* Level Cards */}
        <LevelSelectionGrid
          levels={BOARD_QUESTIONS_LEVELS}
          basePath="/board-questions"
          actionText="Explore {level} Questions"
          className="mb-16"
        />

        {/* How to Use */}
        <div className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-6 text-center">
            How to Use Board Questions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-sf-text-bold mb-2">Choose Level</h3>
              <p className="text-sf-text-subtle text-sm">
                Select HSC or SSC based on your current academic level
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-sf-text-bold mb-2">Apply Filters</h3>
              <p className="text-sf-text-subtle text-sm">
                Filter by grammar topic, board, year, or search for specific content
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-sf-text-bold mb-2">Practice</h3>
              <p className="text-sf-text-subtle text-sm">
                Study the questions and answers to improve your grammar skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}