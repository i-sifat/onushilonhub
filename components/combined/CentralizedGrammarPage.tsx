'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw, Target } from 'lucide-react';

interface GrammarRule {
  id: number;
  ruleNo: string;
  title: string;
  description: string;
  structure: string;
  examples: string[];
}

interface GrammarQuestion {
  id: string;
  board: string;
  year: number;
  passage: string;
  blanks: { id: string; rule: number; ans: string }[];
}

interface CentralizedGrammarPageProps {
  topic: string;
  rules: GrammarRule[];
  questions: GrammarQuestion[];
  questionTypes?: string[];
}

const boards = ['All Boards', 'Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet', 'Barisal', 'Cumilla', 'Mymensingh', 'Jashore', 'Dinajpur', 'Rangpur'];
const years = ['All Years', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export default function CentralizedGrammarPage({ 
  topic, 
  rules, 
  questions, 
  questionTypes = ['All Types'] 
}: CentralizedGrammarPageProps) {
  const [selectedRuleId, setSelectedRuleId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedQuestionType, setSelectedQuestionType] = useState('All Types');

  // Get question count for each rule
  const getRuleQuestionCount = useMemo(() => {
    return (ruleId: number) => {
      return questions.filter(q => 
        q.blanks.some(blank => blank.rule === ruleId)
      ).length;
    };
  }, [questions]);

  // Filter questions based on selected rule and other filters
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesRule = selectedRuleId === null || 
        question.blanks.some(blank => blank.rule === selectedRuleId);
      
      const matchesSearch = !searchTerm || 
        question.passage?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBoard = selectedBoard === 'All Boards' || 
        question.board?.toLowerCase() === selectedBoard.toLowerCase();
      
      const matchesYear = selectedYear === 'All Years' || 
        question.year?.toString() === selectedYear;
      
      return matchesRule && matchesSearch && matchesBoard && matchesYear;
    });
  }, [questions, selectedRuleId, searchTerm, selectedBoard, selectedYear]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
    setSelectedQuestionType('All Types');
    setSelectedRuleId(null);
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || 
    selectedYear !== 'All Years' || selectedQuestionType !== 'All Types' || selectedRuleId !== null;

  const selectedRule = selectedRuleId ? rules.find(rule => rule.id === selectedRuleId) : null;

  // Render passage with highlighted blanks
  const renderPassageWithBlanks = (passage: string, blanks: { id: string; rule: number; ans: string }[]) => {
    let renderedPassage = passage;
    
    blanks.forEach(blank => {
      const placeholder = `[${blank.id}]`;
      const rule = rules.find(r => r.id === blank.rule);
      const ruleTitle = rule ? rule.title : `Rule ${blank.rule}`;
      
      renderedPassage = renderedPassage.replace(
        placeholder,
        `<span class="inline-flex items-center bg-sf-button/20 text-sf-button px-2 py-1 rounded text-sm font-medium mx-1" title="${ruleTitle}: ${blank.ans}">
          ${blank.id}
        </span>`
      );
    });
    
    return renderedPassage;
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Area */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-sf-button" />
            <h4 className="text-md font-semibold text-sf-text-bold">Filter {topic} Questions</h4>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-xs"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {/* Board Filter */}
          <div>
            <label className="block text-xs font-medium text-sf-text-subtle mb-1">Board</label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            >
              {boards.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-xs font-medium text-sf-text-subtle mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Rule Filter */}
          <div>
            <label className="block text-xs font-medium text-sf-text-subtle mb-1">Rule</label>
            <select
              value={selectedRuleId || ''}
              onChange={(e) => setSelectedRuleId(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-2 py-1 text-xs border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            >
              <option value="">All Rules</option>
              {rules.map(rule => (
                <option key={rule.id} value={rule.id}>
                  Rule {rule.id}: {rule.title.substring(0, 30)}...
                </option>
              ))}
            </select>
          </div>

          {/* Question Type Filter */}
          <div>
            <label className="block text-xs font-medium text-sf-text-subtle mb-1">Type</label>
            <select
              value={selectedQuestionType}
              onChange={(e) => setSelectedQuestionType(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            >
              {questionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Side - Rules List (25%) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-sf-text-bold">Grammar Rules</h3>
            <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
              {rules.length} Rules
            </Badge>
          </div>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
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
                      {rule.ruleNo}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3 text-sf-button" />
                      <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold text-xs">
                        {questionCount}
                      </Badge>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-sf-text-bold mb-1 leading-tight">
                    {rule.title}
                  </h4>
                  
                  <p className="text-sf-text-subtle text-xs leading-relaxed line-clamp-2">
                    {rule.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Rule Details and Questions (75%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Rule Details */}
          {selectedRule ? (
            <div className="bg-sf-bg border border-sf-button/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="outline" className="text-sf-button border-sf-button/30">
                  {selectedRule.ruleNo}
                </Badge>
                <h3 className="text-xl font-bold text-sf-text-bold">Rule Details</h3>
              </div>
              
              <h4 className="text-lg font-semibold text-sf-text-bold mb-3 leading-relaxed">
                {selectedRule.title}
              </h4>
              
              <p className="text-sf-text-subtle mb-4 leading-relaxed">
                <span className="font-medium">Usage:</span> {selectedRule.description}
              </p>

              <div className="mb-4">
                <h5 className="text-md font-semibold text-sf-text-bold mb-2">Structure:</h5>
                <div className="bg-sf-highlight/10 border-l-4 border-sf-button p-3 rounded-r-lg">
                  <p className="text-sf-text-subtle text-sm font-mono leading-relaxed">
                    {selectedRule.structure}
                  </p>
                </div>
              </div>

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
              {selectedRuleId && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
                  Rule {selectedRuleId} Questions
                </Badge>
              )}
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
                filteredQuestions.map((question, index) => (
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
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-sf-text-muted">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{question.board}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{question.year}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sf-text-subtle leading-relaxed text-sm">
                        <p className="mb-2 font-medium">Passage:</p>
                        <div 
                          className="text-xs leading-relaxed"
                          dangerouslySetInnerHTML={{ 
                            __html: renderPassageWithBlanks(question.passage, question.blanks) 
                          }}
                        />
                        
                        <div className="mt-3">
                          <p className="font-medium mb-2">Answers:</p>
                          <div className="grid grid-cols-2 gap-1">
                            {question.blanks.slice(0, 6).map((blank) => (
                              <div key={blank.id} className="text-xs">
                                <span className="font-medium">({blank.id})</span> {blank.ans}
                              </div>
                            ))}
                            {question.blanks.length > 6 && (
                              <div className="text-xs text-sf-text-muted col-span-2">
                                ... and {question.blanks.length - 6} more
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
