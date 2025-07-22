import { BackButton, LevelSelectionGrid } from '@/components/common';
import { GET_STARTED_LEVELS } from '@/lib/constants/levelData';
import { Zap } from 'lucide-react';

export default function GetStartedPage() {

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <Zap className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            Get <span className="text-sf-button">Started</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Choose your academic level to start your grammar learning journey. 
            Practice with board questions and master grammar rules effectively.
          </p>
        </div>

        {/* Level Cards */}
        <LevelSelectionGrid
          levels={GET_STARTED_LEVELS}
          basePath="/get-started"
          className="mb-16"
        />

        {/* How to Get Started */}
        <div className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-6 text-center">
            How to Get Started
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
              <h3 className="font-semibold text-sf-text-bold mb-2">Select Topic</h3>
              <p className="text-sf-text-subtle text-sm">
                Browse through grammar topics and select the one you want to study
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-sf-text-bold mb-2">Study & Practice</h3>
              <p className="text-sf-text-subtle text-sm">
                Learn the rules, study examples, and practice with board questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}