'use client';

import { useState, useMemo, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  BookOpen, 
  RotateCcw, 
  Target, 
  EyeOff,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { GrammarRule, GrammarTopicSlug } from '@/types/grammar.types';
import { Question, QuestionTopicSlug, QuestionBoard } from '@/types/question.types';

interface UniversalCombinedUIProps {
  topic: string;
  topicSlug: GrammarTopicSlug | QuestionTopicSlug;
  rules: GrammarRule[];
  questions: Question[];
  level?: 'HSC' | 'SSC';
}

interface FilterState {
  searchTerm: string;
  selectedBoard: string;
  selectedYear: string;
  selectedRuleId: number | string | null;
  selectedCategory: string;
}

const BOARDS = [
  'All Boards', 'Dhaka', 'Chattogram', 'Rajshahi', 'Sylhet', 
  'Barishal', 'Rangpur', 'Mymensingh', 'Cumilla', 'Dinajpur', 'Jashore'
];

const YEARS = [
  'All Years', '2024', '2023', '2022', '2021', '2020', 
  '2019', '2018', '2017', '2016', '2015'
];

const CATEGORIES = [
  'All Categories', 'Basic', 'Intermediate', 'Advanced', 'Complex'
];

export default function UniversalCombinedUI({ 
  topic, 
  topicSlug, 
  rules, 
  questions, 
  level = 'HSC' 
}: UniversalCombinedUIProps) {
  const [selectedRuleId, setSelectedRuleId] = useState<number | string | null>(null);
  const [showAnswers, setShowAnswers] = useState<{[key: string]: boolean}>({});
  const [expandedRules, setExpandedRules] = useState<{[key: string]: boolean}>({});
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedBoard: 'All Boards',
    selectedYear: 'All Years',
    selectedRuleId: null,
    selectedCategory: 'All Categories'
  });

  // Update filter state
  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Get question count for each rule
  const getRuleQuestionCount = useMemo(() => {
    const counts: {[key: string]: number} = {};
    
    rules.forEach(rule => {
      let count = 0;
      
      questions.forEach(question => {
        // Handle different question structures
        if (question.ruleId === rule.id) {
          count++;
        } else if (question.blanks && Array.isArray(question.blanks)) {
          // For questions with blanks (like modifier questions)
          count += question.blanks.filter((blank: any) => 
            blank.ruleId === rule.id || blank.rule === rule.id
          ).length;
        }
      });
      
      counts[rule.id] = count;
    });
    
    return counts;
  }, [rules, questions]);

  // Filter questions based on all criteria
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      // Rule filter
      const matchesRule = filters.selectedRuleId === null || 
        question.ruleId === filters.selectedRuleId ||
        (question.blanks && question.blanks.some((blank: any) => 
          blank.ruleId === filters.selectedRuleId || blank.rule === filters.selectedRuleId
        ));

      // Search filter
      const matchesSearch = !filters.searchTerm || 
        question.question?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        question.passage?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (question as any).directSpeech?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (question as any).indirectSpeech?.toLowerCase().includes(filters.searchTerm.toLowerCase());

      // Board filter
      const matchesBoard = filters.selectedBoard === 'All Boards' || 
        question.board?.toLowerCase().includes(filters.selectedBoard.toLowerCase()) ||
        question.id?.toLowerCase().includes(filters.selectedBoard.toLowerCase());

      // Year filter
      const matchesYear = filters.selectedYear === 'All Years' || 
        question.year?.toString() === filters.selectedYear ||
        question.id?.includes(filters.selectedYear);

      // Category filter (based on difficulty or rule complexity)
      const matchesCategory = filters.selectedCategory === 'All Categories' ||
        question.difficulty?.toLowerCase() === filters.selectedCategory.toLowerCase();

      return matchesRule && matchesSearch && matchesBoard && matchesYear && matchesCategory;
    });
  }, [questions, filters]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      selectedBoard: 'All Boards',
      selectedYear: 'All Years',
      selectedRuleId: null,
      selectedCategory: 'All Categories'
    });
    setSelectedRuleId(null);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm || 
           filters.selectedBoard !== 'All Boards' || 
           filters.selectedYear !== 'All Years' || 
           filters.selectedRuleId !== null ||
           filters.selectedCategory !== 'All Categories';
  }, [filters]);

  // Get question metadata from ID
  const getQuestionMetadata = useCallback((questionId: string) => {
    const parts = questionId.split('-');
    return {
      board: parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Sample',
      year: parts[1] || '2024',
      questionNumber: parts[2] || ''
    };
  }, []);

  // Get selected rule
  const selectedRule = useMemo(() => {
    return selectedRuleId ? rules.find(rule => rule.id === selectedRuleId) : null;
  }, [selectedRuleId, rules]);

  // Toggle answer visibility
  const toggleAnswer = useCallback((questionId: string, blankId?: string) => {
    const key = blankId ? `${questionId}-${blankId}` : questionId;
    setShowAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  // Toggle rule expansion
  const toggleRuleExpansion = useCallback((ruleId: number | string) => {
    setExpandedRules(prev => ({
      ...prev,
      [ruleId]: !prev[ruleId]
    }));
  }, []);

  // Render question content based on type
  const renderQuestionContent = useCallback((question: Question) => {
    const questionAny = question as any;

    // Handle passage with blanks (modifier, completing sentence, etc.)
    if (question.passage && question.blanks) {
      let passageWithBlanks = question.passage;
      
      question.blanks.forEach((blank: any) => {
        const key = `${question.id}-${blank.id}`;
        const isAnswerVisible = showAnswers[key];
        const blankPattern = new RegExp(`\\[${blank.id}\\]`, 'g');
        
        const answer = blank.ans || blank.answer || '';
        const blankElement = isAnswerVisible 
          ? `<span class="inline-flex items-center bg-success-500/20 text-success-600 border border-success-500/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-success-500/30 hover:text-success-700 hover:border-success-500/50 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm hover:shadow-success-500/10 transition-all duration-200 ease-out active:scale-95" data-blank="${blank.id}" data-question="${question.id}">${answer}</span>`
          : `<span class="inline-flex items-center bg-sf-button/20 text-sf-button border border-sf-button/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-sf-button/30 hover:text-sf-button hover:border-sf-button/50 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm hover:shadow-sf-button/10 transition-all duration-200 ease-out active:scale-95" data-blank="${blank.id}" data-question="${question.id}">[${blank.id}]</span>`;
        
        passageWithBlanks = passageWithBlanks.replace(blankPattern, blankElement);
      });

      return (
        <div className="space-y-4">
          <div>
            <h4 className="text-md font-semibold text-sf-text-bold mb-3">Passage:</h4>
            <div 
              className="text-sf-text-subtle leading-relaxed cursor-pointer"
              dangerouslySetInnerHTML={{ __html: passageWithBlanks }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                const blankId = target.getAttribute('data-blank');
                const questionId = target.getAttribute('data-question');
                if (blankId && questionId) {
                  toggleAnswer(questionId, blankId);
                }
              }}
            />
          </div>
          
          <div className="text-xs text-sf-text-muted">
            <p>💡 Click on any blank to reveal the answer</p>
          </div>
        </div>
      );
    }

    // Handle narration questions (direct/indirect speech)
    if (questionAny.directSpeech && questionAny.indirectSpeech) {
      return (
        <div className="space-y-3">
          <p className="text-sf-text-subtle text-sm leading-relaxed">
            <span className="font-medium">Question:</span> {question.question}
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded-r-lg">
              <p className="text-xs font-medium text-blue-400 mb-1">Direct Speech:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {questionAny.directSpeech}
              </p>
            </div>
            
            <div className="bg-success-500/10 border-l-4 border-success-500 p-3 rounded-r-lg hover:bg-success-500/15 hover:border-success-600 transition-all duration-200">
              <p className="text-xs font-medium text-success-600 mb-1">Indirect Speech:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {questionAny.indirectSpeech}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Handle transformation questions
    if (questionAny.sentence && questionAny.transformedSentence) {
      return (
        <div className="space-y-3">
          <p className="text-sf-text-subtle text-sm leading-relaxed">
            <span className="font-medium">Transform:</span> {question.question}
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-3 rounded-r-lg">
              <p className="text-xs font-medium text-orange-400 mb-1">Original:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {questionAny.sentence}
              </p>
            </div>
            
            <div className="bg-success-500/10 border-l-4 border-success-500 p-3 rounded-r-lg hover:bg-success-500/15 hover:border-success-600 transition-all duration-200">
              <p className="text-xs font-medium text-success-600 mb-1">Transformed:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {questionAny.transformedSentence}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Handle simple questions with answers
    if (question.answer) {
      const isAnswerVisible = showAnswers[question.id];
      
      return (
        <div className="space-y-3">
          <p className="text-sf-text-subtle leading-relaxed">
            {question.question}
          </p>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAnswer(question.id)}
              className="text-xs"
            >
              {isAnswerVisible ? (
                <>
                  <EyeOff className="h-3 w-3 mr-1" />
                  Hide Answer
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3 mr-1" />
                  Show Answer
                </>
              )}
            </Button>
          </div>
          
          {isAnswerVisible && (
            <div className="bg-success-500/10 border-l-4 border-success-500 p-3 rounded-r-lg hover:bg-success-500/15 hover:border-success-600 transition-all duration-200">
              <p className="text-xs font-medium text-success-600 mb-1">Answer:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {question.answer}
              </p>
              {question.explanation && (
                <div className="mt-2 pt-2 border-t border-success-500/20">
                  <p className="text-xs font-medium text-success-600 mb-1">Explanation:</p>
                  <p className="text-sf-text-subtle text-xs leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // Default simple question format
    return (
      <div className="prose prose-invert max-w-none">
        <p className="text-sf-text-subtle leading-relaxed">
          {question.question}
        </p>
      </div>
    );
  }, [showAnswers, toggleAnswer]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sf-text-bold">{topic}</h1>
          <p className="text-sf-text-muted">
            {rules.length} rules • {questions.length} questions • {level} Level
          </p>
        </div>
        <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
          Universal UI
        </Badge>
      </div>

      {/* Top Filter Bar */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-sf-button" />
            <h4 className="text-md font-semibold text-sf-text-bold">Filter Questions</h4>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sf-text-muted hover:text-sf-button"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-sf-text-muted" />
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              placeholder="Search..."
              className="w-full pl-6 pr-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            />
          </div>
          
          <select
            value={filters.selectedBoard}
            onChange={(e) => updateFilter('selectedBoard', e.target.value)}
            className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          >
            {BOARDS.map(board => (
              <option key={board} value={board}>{board}</option>
            ))}
          </select>
          
          <select
            value={filters.selectedYear}
            onChange={(e) => updateFilter('selectedYear', e.target.value)}
            className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          >
            {YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={filters.selectedCategory}
            onChange={(e) => updateFilter('selectedCategory', e.target.value)}
            className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={filters.selectedRuleId || ''}
            onChange={(e) => {
              const value = e.target.value || null;
              updateFilter('selectedRuleId', value);
              setSelectedRuleId(value);
            }}
            className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          >
            <option value="">All Rules</option>
            {rules.map(rule => (
              <option key={rule.id} value={rule.id}>
                {rule.ruleNo || `Rule ${rule.id}`} - {rule.title.substring(0, 25)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content - 4 Column Layout */}
      <div className="grid grid-cols-4 gap-6">
        {/* Left Column (1/4) - Rules List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-sf-text-bold">Grammar Rules</h2>
            <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
              {rules.length}
            </Badge>
          </div>

          <div className="space-y-3 max-h-[80vh] overflow-y-auto">
            {rules.map((rule) => {
              const questionCount = getRuleQuestionCount[rule.id] || 0;
              const isExpanded = expandedRules[rule.id];
              
              return (
                <div
                  key={rule.id}
                  className={`border rounded-lg transition-all duration-300 ${
                    selectedRuleId === rule.id
                      ? 'border-sf-button bg-sf-button/10'
                      : 'border-sf-text-muted/20 hover:border-sf-button/50'
                  }`}
                >
                  <div
                    onClick={() => setSelectedRuleId(selectedRuleId === rule.id ? null : rule.id)}
                    className="cursor-pointer p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-sf-button border-sf-button/30 text-xs">
                        {rule.ruleNo || `Rule ${rule.id}`}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Target className="h-3 w-3 text-sf-button" />
                        <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold text-xs">
                          {questionCount}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-sf-text-bold mb-2 leading-tight">
                      {rule.title}
                    </h3>
                    
                    {rule.bengali && (
                      <p className="text-xs text-sf-text-muted mb-2">
                        {rule.bengali}
                      </p>
                    )}
                  </div>

                  {selectedRuleId === rule.id && (
                    <div className="border-t border-sf-button/20 p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRuleExpansion(rule.id)}
                        className="w-full text-xs"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" />
                            Show Details
                          </>
                        )}
                      </Button>
                      
                      {isExpanded && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-sf-text-subtle leading-relaxed">
                            {rule.description}
                          </p>
                          
                          {rule.structures && rule.structures.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-sf-text-bold mb-1">Structures:</p>
                              <div className="space-y-1">
                                {rule.structures.slice(0, 2).map((structure, index) => (
                                  <p key={index} className="text-xs text-sf-text-muted font-mono">
                                    {structure}
                                  </p>
                                ))}
                                {rule.structures.length > 2 && (
                                  <p className="text-xs text-sf-text-muted">
                                    +{rule.structures.length - 2} more...
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 3 Columns (3/4) - Rule Details and Questions */}
        <div className="col-span-3 space-y-6">
          {/* Rule Details */}
          {selectedRule ? (
            <div className="bg-sf-bg border border-sf-button/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="outline" className="text-sf-button border-sf-button/30">
                  {selectedRule.ruleNo || `Rule ${selectedRule.id}`}
                </Badge>
                <h3 className="text-xl font-bold text-sf-text-bold">Rule Details</h3>
              </div>
              
              <h4 className="text-lg font-semibold text-sf-text-bold mb-3 leading-relaxed">
                {selectedRule.title}
              </h4>
              
              {selectedRule.bengali && (
                <p className="text-sf-text-muted mb-2 text-sm">
                  <span className="font-medium">Bengali:</span> {selectedRule.bengali}
                </p>
              )}
              
              <p className="text-sf-text-subtle mb-4 leading-relaxed">
                <span className="font-medium">Usage:</span> {selectedRule.description}
              </p>

              {selectedRule.structures && selectedRule.structures.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-md font-semibold text-sf-text-bold mb-2">Structures:</h5>
                  <div className="space-y-2">
                    {selectedRule.structures.map((structure, index) => (
                      <div
                        key={index}
                        className="bg-sf-highlight/10 border-l-4 border-sf-button p-3 rounded-r-lg"
                      >
                        <p className="text-sf-text-subtle text-sm font-mono leading-relaxed">
                          {structure}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h5 className="text-md font-semibold text-sf-text-bold mb-3">Examples:</h5>
                <div className="space-y-2">
                  {selectedRule.examples.map((example, index) => (
                    <div
                      key={index}
                      className="bg-sf-highlight/10 border-l-4 border-sf-button p-3 rounded-r-lg"
                    >
                      <p className="text-sf-text-subtle text-sm leading-relaxed">
                        {example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 text-center">
              <BookOpen className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
                Select a Rule
              </h3>
              <p className="text-sf-text-subtle">
                Click on any rule from the left to see its details and related questions.
              </p>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-sf-text-bold">
                Practice Questions ({filteredQuestions.length})
              </h4>
              <div className="flex items-center space-x-2">
                {selectedRuleId && (
                  <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
                    Rule {selectedRuleId} Questions
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAnswers({})}
                  className="text-sf-text-muted hover:text-sf-button"
                >
                  <EyeOff className="h-3 w-3 mr-1" />
                  Hide All Answers
                </Button>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto space-y-3">
              {filteredQuestions.length === 0 ? (
                <Card className="border-sf-text-muted/20">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 text-sf-text-muted mx-auto mb-2" />
                    <h5 className="text-md font-semibold text-sf-text-bold mb-1">No Questions Found</h5>
                    <p className="text-sf-text-subtle text-sm">
                      {selectedRuleId 
                        ? `No questions available for Rule ${selectedRuleId} with current filters.`
                        : "Select a rule or adjust filters to see questions."
                      }
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredQuestions.map((question, index) => {
                  const metadata = getQuestionMetadata(question.id);
                  
                  return (
                    <Card 
                      key={question.id} 
                      className="border-sf-text-muted/20 hover:border-sf-button/50 transition-all duration-300"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-sf-button border-sf-button/30 text-xs">
                              Q{index + 1}
                            </Badge>
                            {question.ruleId && (
                              <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold text-xs">
                                Rule {question.ruleId}
                              </Badge>
                            )}
                            {question.difficulty && (
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${
                                  question.difficulty === 'EASY' ? 'bg-success-500/20 text-success-600 hover:bg-success-500/30 hover:text-success-700' :
                                  question.difficulty === 'MEDIUM' ? 'bg-sf-button/20 text-sf-button hover:bg-sf-button/30' :
                                  'bg-error-500/20 text-error-600 hover:bg-error-500/30 hover:text-error-700'
                                } transition-all duration-200`}
                              >
                                {question.difficulty}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-sf-text-muted">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{question.board || metadata.board}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{question.year || metadata.year}</span>
                            </div>
                          </div>
                        </div>
                        
                        {renderQuestionContent(question)}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}