'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/utils/animations';
import InteractiveAnswerReveal from '@/components/ui/interactive-answer-reveal';
import { GrammarLevel } from '@/types/grammar.types';

// Generic interfaces for extensibility across different topics
export interface GenericRule {
  id: number;
  ruleNo: string;
  title: string;
  banglaDescription: string;
  examples?: string[];
  topic?: string; // Made optional to be compatible with existing ModifierRule
  level?: GrammarLevel; // Updated to use GrammarLevel to support 'BOTH'
}

export interface GenericQuestion {
  id: string;
  topic?: string; // Made optional to be compatible with existing question types
  level?: 'HSC' | 'SSC'; // Questions only have HSC/SSC levels, not BOTH
  question: string;
  answer?: string;
  board?: string;
  year?: number;
  ruleId?: number;
}

interface CombinedSectionLayoutProps<TRule extends GenericRule = GenericRule, TQuestion extends GenericQuestion = GenericQuestion> {
  topic: string;
  level: 'HSC' | 'SSC';
  rules: TRule[];
  questions: TQuestion[];
  className?: string;
}

interface RulesPanelProps<TRule extends GenericRule = GenericRule> {
  rules: TRule[];
  questionCounts: Record<number, number>;
  selectedRuleId?: number;
  onRuleSelect: (ruleId: number) => void;
  className?: string;
}

interface QuestionsPanelProps<TRule extends GenericRule = GenericRule, TQuestion extends GenericQuestion = GenericQuestion> {
  selectedRule?: TRule;
  relatedQuestions: TQuestion[];
  isLoading?: boolean;
  className?: string;
}

// Rules Panel Component
const RulesPanel: React.FC<RulesPanelProps> = ({
  rules,
  questionCounts,
  selectedRuleId,
  onRuleSelect,
  className
}) => {
  return (
    <div className={cn(
      "h-full flex flex-col bg-sf-bg border-r border-sf-text-muted/20",
      className
    )}>
      {/* Panel Header */}
      <div className="p-6 border-b border-sf-text-muted/20 bg-sf-bg/50 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-sf-text-bold mb-2">Grammar Rules</h2>
        <p className="text-sm text-sf-text-muted">
          Select a rule to see related questions
        </p>
      </div>

      {/* Rules List - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {rules.map((rule) => {
          const questionCount = questionCounts[rule.id] || 0;
          const isSelected = selectedRuleId === rule.id;
          
          return (
            <button
              key={rule.id}
              onClick={() => onRuleSelect(rule.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-200",
                "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                animations.presets.levelCard,
                isSelected
                  ? "bg-sf-button/10 border-sf-button/30 text-sf-button shadow-lg shadow-sf-button/10"
                  : "bg-sf-bg/50 border-sf-text-muted/20 text-sf-text-bold hover:border-sf-text-muted/40 hover:bg-sf-bg/80"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "text-xs font-semibold px-2 py-1 rounded-full",
                      isSelected
                        ? "bg-sf-button/20 text-sf-button"
                        : "bg-sf-text-muted/20 text-sf-text-muted"
                    )}>
                      {rule.ruleNo}
                    </span>
                  </div>
                  <h3 className={cn(
                    "font-semibold text-sm leading-tight mb-2",
                    isSelected ? "text-sf-button" : "text-sf-text-bold"
                  )}>
                    {rule.title}
                  </h3>
                  <p className={cn(
                    "text-xs leading-relaxed line-clamp-2",
                    isSelected ? "text-sf-button/80" : "text-sf-text-muted"
                  )}>
                    {rule.banglaDescription}
                  </p>
                </div>
                
                {/* Question Count Badge */}
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200",
                  questionCount > 0
                    ? isSelected
                      ? "bg-sf-button text-sf-bg"
                      : "bg-sf-highlight text-sf-bg"
                    : "bg-sf-text-muted/20 text-sf-text-muted"
                )}>
                  {questionCount}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Questions Panel Component
const QuestionsPanel: React.FC<QuestionsPanelProps> = ({
  selectedRule,
  relatedQuestions,
  isLoading = false,
  className
}) => {
  if (isLoading) {
    return (
      <div className={cn("h-full flex items-center justify-center", className)}>
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sf-button mx-auto"></div>
          <p className="text-sf-text-muted">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (!selectedRule) {
    return (
      <div className={cn("h-full flex items-center justify-center", className)}>
        <div className="text-center space-y-4 max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-sf-text-bold">
            Select a Grammar Rule
          </h3>
          <p className="text-sf-text-muted leading-relaxed">
            Choose a rule from the left panel to see its details and related practice questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Rule Details Section with InteractiveAnswerReveal */}
      <div className="border-b border-sf-text-muted/20 bg-sf-bg/50 backdrop-blur-sm">
        <div className="p-6">
          <InteractiveAnswerReveal
            title={selectedRule.title}
            banglaDescription={selectedRule.banglaDescription}
            examples={selectedRule.examples || []}
          />
        </div>
      </div>

      {/* Related Questions Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-sf-text-bold">
              Related Questions
            </h3>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-sf-highlight/20 text-sf-highlight">
              {relatedQuestions.length} question{relatedQuestions.length !== 1 ? 's' : ''}
            </span>
          </div>

          {relatedQuestions.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="text-lg font-semibold text-sf-text-bold">
                No Questions Found
              </h4>
              <p className="text-sf-text-muted max-w-md mx-auto">
                No practice questions are currently available for this rule. 
                Check back later for updates.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {relatedQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className={cn(
                    "p-6 bg-sf-bg/50 border border-sf-text-muted/20 rounded-xl",
                    "hover:border-sf-text-muted/40 hover:bg-sf-bg/80 transition-all duration-200",
                    animations.reveal.fadeIn,
                    `[animation-delay:${index * 100}ms]`
                  )}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-sf-text-muted/20 text-sf-text-muted">
                        {question.board} {question.year}
                      </span>
                      {question.level && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-sf-button/20 text-sf-button">
                          {question.level}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <div className="text-sf-text-subtle leading-relaxed whitespace-pre-wrap">
                      {question.question}
                    </div>
                    
                    {question.answer && (
                      <div className="mt-4 p-4 bg-success-500/10 border border-success-500/20 rounded-lg">
                        <h5 className="text-sm font-semibold text-success-600 mb-2">Answer:</h5>
                        <div className="text-sm text-success-700 leading-relaxed">
                          {question.answer}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Combined Section Layout Component
const CombinedSectionLayout: React.FC<CombinedSectionLayoutProps> = ({
  topic,
  level,
  rules,
  questions,
  className
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<number | undefined>();
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Calculate question counts for each rule
  const questionCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    
    // Initialize all rules with 0 count
    rules.forEach(rule => {
      counts[rule.id] = 0;
    });
    
    // For now, we'll use a simple approach - in the next task we'll implement proper matching
    // This is just to show the UI structure
    questions.forEach(question => {
      if (question.ruleId && counts[question.ruleId] !== undefined) {
        counts[question.ruleId]++;
      }
    });
    
    return counts;
  }, [rules, questions]);

  // Get related questions for selected rule
  const relatedQuestions = useMemo(() => {
    if (!selectedRuleId) return [];
    
    // For now, return questions that have matching ruleId
    // In the next task, we'll implement proper rule-question matching
    return questions.filter(question => question.ruleId === selectedRuleId);
  }, [selectedRuleId, questions]);

  // Get selected rule
  const selectedRule = useMemo(() => {
    return selectedRuleId ? rules.find(rule => rule.id === selectedRuleId) : undefined;
  }, [selectedRuleId, rules]);

  const handleRuleSelect = useCallback((ruleId: number) => {
    // Show loading state when switching rules
    setIsLoadingQuestions(true);
    setSelectedRuleId(ruleId);
    // Close mobile panel when rule is selected
    setIsMobilePanelOpen(false);
    
    // Simulate loading time for better UX (in real app, this would be actual data loading)
    setTimeout(() => {
      setIsLoadingQuestions(false);
    }, 300);
  }, []);

  const toggleMobilePanel = useCallback(() => {
    setIsMobilePanelOpen(prev => !prev);
  }, []);

  return (
    <div className={cn("h-full flex flex-col lg:flex-row", className)}>
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden bg-sf-bg border-b border-sf-text-muted/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-sf-text-bold">
              {topic} - Combined Section
            </h1>
            <p className="text-sm text-sf-text-muted">{level} Level</p>
          </div>
          <button
            onClick={toggleMobilePanel}
            className={cn(
              "px-4 py-2 rounded-lg border transition-all duration-200",
              "bg-sf-button/10 border-sf-button/30 text-sf-button",
              "hover:bg-sf-button/20 active:scale-95"
            )}
          >
            {isMobilePanelOpen ? 'Hide Rules' : 'Show Rules'}
          </button>
        </div>
      </div>

      {/* Rules Panel - Left side on desktop, collapsible on mobile */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        // Desktop: Fixed 30% width
        "lg:w-[30%] lg:flex-shrink-0",
        // Mobile: Full width when open, hidden when closed
        "lg:block",
        isMobilePanelOpen ? "block" : "hidden lg:block"
      )}>
        <RulesPanel
          rules={rules}
          questionCounts={questionCounts}
          selectedRuleId={selectedRuleId}
          onRuleSelect={handleRuleSelect}
          className="h-full lg:h-auto lg:min-h-screen"
        />
      </div>

      {/* Questions Panel - Right side on desktop, main content on mobile */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        // Desktop: 70% width
        "lg:w-[70%]",
        // Mobile: Hidden when rules panel is open
        isMobilePanelOpen ? "hidden lg:block" : "block"
      )}>
        <QuestionsPanel
          selectedRule={selectedRule}
          relatedQuestions={relatedQuestions}
          isLoading={isLoadingQuestions}
          className="h-full lg:h-auto lg:min-h-screen"
        />
      </div>

      {/* Mobile Overlay - Only visible when panel is open on mobile */}
      {isMobilePanelOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobilePanel}
        />
      )}
    </div>
  );
};

export default CombinedSectionLayout;
export type { CombinedSectionLayoutProps };