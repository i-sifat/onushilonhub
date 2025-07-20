'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw, Target, Eye, EyeOff } from 'lucide-react';

interface Rule {
  id: number | string;
  ruleNo?: string;
  title: string;
  bengali?: string;
  description: string;
  structures?: string[];
  examples: string[];
  structure?: string;
}

interface Question {
  id: string;
  year?: number;
  board?: string;
  question: string;
  ruleId?: number;
  passage?: string;
  blanks?: any[];
  [key: string]: any;
}

interface CentralizedGrammarPageProps {
  topic: string;
  rules: Rule[];
  questions: Question[];
}

const boards = ['All Boards', 'Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet', 'Barisal', 'Cumilla', 'Mymensingh', 'Jashore', 'Dinajpur', 'Rangpur'];
const years = ['All Years', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export default function CentralizedGrammarPage({ topic, rules, questions }: CentralizedGrammarPageProps) {
  const [selectedRuleId, setSelectedRuleId] = useState<number | string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [showAnswers, setShowAnswers] = useState<{[key: string]: boolean}>({});

  // Get question count for each rule
  const getRuleQuestionCount = useMemo(() => {
    return (ruleId: number | string) => {
      return questions.filter(q => q.ruleId === ruleId).length;
    };
  }, [questions]);

  // Filter questions based on selected rule and other filters
  const filteredQuestions = questions.filter(question => {
    const matchesRule = selectedRuleId === null || question.ruleId === selectedRuleId;
    const matchesSearch = !searchTerm || 
      (question.question?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       question.passage?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       question.directSpeech?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       question.indirectSpeech?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesBoard = selectedBoard === 'All Boards' || question.id?.toLowerCase().includes(selectedBoard.toLowerCase()) || false;
    const matchesYear = selectedYear === 'All Years' || question.id?.includes(selectedYear) || false;
    
    return matchesRule && matchesSearch && matchesBoard && matchesYear;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
    setSelectedRuleId(null);
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years' || selectedRuleId !== null;

  const getQuestionMetadata = (questionId: string) => {
    const parts = questionId.split('-');
    return {
      board: parts[0]?.charAt(0).toUpperCase() + parts[0]?.slice(1) || 'Unknown',
      year: parts[1] || 'Unknown',
      questionNumber: parts[2] || ''
    };
  };

  const selectedRule = selectedRuleId ? rules.find(rule => rule.id === selectedRuleId) : null;

  const toggleAnswer = (questionId: string, blankId: string) => {
    const key = `${questionId}-${blankId}`;
    setShowAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderQuestionContent = (question: Question, index: number) => {
    const metadata = getQuestionMetadata(question.id);
    
    // Handle different question types
    if (question.passage && question.blanks) {
      // Modifier type questions with passage and blanks
      let passageWithBlanks = question.passage;
      
      // Replace blanks with clickable elements
      question.blanks.forEach((blank: any) => {
        const key = `${question.id}-${blank.id}`;
        const isAnswerVisible = showAnswers[key];
        const blankPattern = new RegExp(`\\[${blank.id}\\]`, 'g');
        
        const blankElement = isAnswerVisible 
          ? `<span class="inline-flex items-center bg-green-500/20 text-green-400 border border-green-400/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-green-500/30 transition-colors" onclick="toggleAnswer('${question.id}', '${blank.id}')">${blank.ans || blank.answer}</span>`
          : `<span class="inline-flex items-center bg-sf-button/20 text-sf-button border border-sf-button/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-sf-button/30 transition-colors" onclick="toggleAnswer('${question.id}', '${blank.id}')">[${blank.id}]</span>`;
        
        passageWithBlanks = passageWithBlanks.replace(blankPattern, blankElement);
      });

      return (
        <div className="space-y-4">
          <div>
            <h4 className="text-md font-semibold text-sf-text-bold mb-3">Passage:</h4>
            <div 
              className="text-sf-text-subtle leading-relaxed"
              dangerouslySetInnerHTML={{ __html: passageWithBlanks }}
            />
          </div>
          
          <div className="text-xs text-sf-text-muted">
            <p>💡 Click on any blank to reveal the answer</p>
          </div>
        </div>
      );
    } else if (question.directSpeech && question.indirectSpeech) {
      // Narration type questions
      return (
        <div className="space-y-3">
          <p className="text-sf-text-subtle text-sm leading-relaxed">
            <span className="font-medium">Question:</span> {question.question}
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-2 rounded-r-lg">
              <p className="text-xs font-medium text-blue-400 mb-1">Direct Speech:</p>
              <p className="text-sf-text-subtle text-xs leading-relaxed">
                {question.directSpeech}
              </p>
            </div>
            
            <div className="bg-green-500/10 border-l-4 border-green-500 p-2 rounded-r-lg">
              <p className="text-xs font-medium text-green-400 mb-1">Indirect Speech:</p>
              <p className="text-sf-text-subtle text-xs leading-relaxed">
                {question.indirectSpeech}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      // Simple question format (completing sentence, etc.)
      return (
        <div className="prose prose-invert max-w-none">
          <p className="text-sf-text-subtle leading-relaxed">
            {question.question}
          </p>
        </div>
      );
    }
  };

  // Add global function for toggling answers
  if (typeof window !== 'undefined') {
    (window as any).toggleAnswer = toggleAnswer;
  }

  return (
    <div className="space-y-6">
      {/* Top Filter Bar - 4 horizontal filters */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-sf-button" />
            <h4 className="text-md font-semibold text-sf-text-bold">Filter Questions</h4>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-xs"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-sf-text-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-6 pr-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            />
          </div>
          
          <select
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
            className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          >
            {boards.map(board => (
              <option key={board} value={board}>{board}</option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={selectedRuleId || ''}
            onChange={(e) => setSelectedRuleId(e.target.value || null)}
            className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          >
            <option value="">All Rules</option>
            {rules.map(rule => (
              <option key={rule.id} value={rule.id}>
                {rule.ruleNo || `Rule ${rule.id}`} - {rule.title.substring(0, 30)}...
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
            <h2 className="text-lg font-bold text-sf-text-bold">Rules</h2>
            <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
              {rules.length}
            </Badge>
          </div>

          <div className="space-y-3 max-h-[80vh] overflow-y-auto">
            {rules.map((rule) => {
              const questionCount = getRuleQuestionCount(rule.id);
              
              return (
                <div
                  key={rule.id}
                  onClick={() => setSelectedRuleId(selectedRuleId === rule.id ? null : rule.id)}
                  className={`cursor-pointer border rounded-lg p-3 transition-all duration-300 ${
                    selectedRuleId === rule.id
                      ? 'border-sf-button bg-sf-button/10'
                      : 'border-sf-text-muted/20 hover:border-sf-button/50'
                  }`}
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
                  
                  <h3 className="text-sm font-semibold text-sf-text-bold mb-1 leading-tight">
                    {rule.title}
                  </h3>
                  
                  <p className="text-sf-text-subtle text-xs leading-relaxed line-clamp-2">
                    {rule.description}
                  </p>
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

              {(selectedRule.structures || selectedRule.structure) && (
                <div className="mb-4">
                  <h5 className="text-md font-semibold text-sf-text-bold mb-2">Structures:</h5>
                  <div className="space-y-2">
                    {selectedRule.structures ? (
                      selectedRule.structures.map((structure, index) => (
                        <div
                          key={index}
                          className="bg-sf-highlight/10 border-l-4 border-sf-button p-3 rounded-r-lg"
                        >
                          <p className="text-sf-text-subtle text-sm font-mono leading-relaxed">
                            {structure}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-sf-highlight/10 border-l-4 border-sf-button p-3 rounded-r-lg">
                        <p className="text-sf-text-subtle text-sm font-mono leading-relaxed">
                          {selectedRule.structure}
                        </p>
                      </div>
                    )}
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
                <button
                  onClick={() => setShowAnswers({})}
                  className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-xs"
                >
                  <EyeOff className="h-3 w-3" />
                  <span>Hide All Answers</span>
                </button>
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
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-sf-text-muted">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{metadata.board}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{metadata.year}</span>
                            </div>
                          </div>
                        </div>
                        
                        {renderQuestionContent(question, index)}
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