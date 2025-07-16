'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Blank {
  id: string;
  instruction: string;
  ruleId?: number;
  answer: string;
}

interface Question {
  id: string;
  year: number;
  board: string;
  passage: string;
  blanks: Blank[];
}

const allQuestions: Question[] = [
  {
    id: "dhaka-2016-modifier",
    year: 2016,
    board: "Dhaka Board",
    passage: "Rabindranath Tagore was a ___ poet of Bengali literature. He was born in a ___ family at Jarasanko, Kolkata. He went to school ___. He wrote his ___ verse at the age of eight. At the age of seventeen, he went to London ___ school there. He was put up in a lodging house under the care of a ___ coach, Mr Scott. He was lucky ___ an English family of Mr Scott. He also visited the House of Parliament ___ Gladstone and John Bright's debates on Irish rule. He wrote letters to Kolkata ___ English society. At this, his family thought that they might lose their son ___. So, he was called back to Kolkata.",
    blanks: [
      {
        id: "a",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "famous/great/renowned"
      },
      {
        id: "b",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "rich/solvent"
      },
      {
        id: "c",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "early"
      },
      {
        id: "d",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "first"
      },
      {
        id: "e",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to attend"
      },
      {
        id: "f",
        instruction: "pre-modify the noun",
        ruleId: 1,
        answer: "professional"
      },
      {
        id: "g",
        instruction: "post-modify the adjective with an infinitive",
        ruleId: 12,
        answer: "enough to get/to have/to find"
      },
      {
        id: "h",
        instruction: "post-modify the verb with an infinitive",
        ruleId: 12,
        answer: "to listen to"
      },
      {
        id: "i",
        instruction: "post-modify the verb with a present participle",
        ruleId: 14,
        answer: "praising/admiring"
      },
      {
        id: "j",
        instruction: "post-modify the verb",
        ruleId: 16,
        answer: "ultimately/forever"
      }
    ]
  }
];

const boards = ['All Boards', 'Dhaka Board', 'Chattogram Board', 'Cumilla Board', 'Rajshahi Board', 'Sylhet Board', 'Barisal Board', 'Jashore Board', 'Mymensingh Board', 'Dinajpur Board'];
const years = ['All Years', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export default function ModifierQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(question => {
      const matchesSearch = question.passage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.blanks.some(blank => blank.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blank.instruction.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesBoard = selectedBoard === 'All Boards' || question.board === selectedBoard;
      const matchesYear = selectedYear === 'All Years' || question.year.toString() === selectedYear;
      
      return matchesSearch && matchesBoard && matchesYear;
    });
  }, [searchTerm, selectedBoard, selectedYear]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
  };

  const toggleQuestionExpansion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years';

  const renderPassageWithBlanks = (passage: string, blanks: Blank[], showAnswers: boolean) => {
    let formattedPassage = passage;
    let blankIndex = 0;
    
    // Replace each ___ with the appropriate blank
    formattedPassage = formattedPassage.replace(/___/g, () => {
      const blank = blanks[blankIndex];
      if (!blank) return '___';
      
      const replacement = showAnswers 
        ? `<span class="inline-flex items-center bg-sf-button/20 text-sf-button px-2 py-1 rounded font-semibold">${blank.answer}</span>`
        : `<span class="inline-block w-20 h-6 bg-sf-text-muted/20 border-b-2 border-sf-button rounded-sm"></span>`;
      
      blankIndex++;
      return replacement;
    });
    
    return formattedPassage;
  };

  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-sf-button" />
            <h3 className="text-lg font-semibold text-sf-text-bold">Filter Questions</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Search Questions
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sf-text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in passages, answers, or instructions..."
                className="w-full pl-10 pr-4 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
              />
            </div>
          </div>

          {/* Board Filter */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Board
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
            >
              {boards.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-sf-text-muted/20">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-sf-text-muted">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedBoard !== 'All Boards' && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Board: {selectedBoard}
                </Badge>
              )}
              {selectedYear !== 'All Years' && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Year: {selectedYear}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-sf-text-bold">
          {filteredQuestions.length} Question{filteredQuestions.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="text-sm text-sf-text-muted">
          HSC Modifier
        </div>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <Card className="border-sf-text-muted/20">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Questions Found</h3>
            <p className="text-sf-text-subtle">
              {hasActiveFilters 
                ? "No questions match your current filters. Try adjusting your search criteria."
                : "No questions available at the moment."
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((question, index) => {
            const isExpanded = expandedQuestions.has(question.id);
            
            return (
              <Card 
                key={question.id} 
                className="border-sf-text-muted/20 hover:border-sf-button/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-sf-button border-sf-button/30">
                        Question {index + 1}
                      </Badge>
                      <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold">
                        {question.blanks.length} blanks
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-sf-text-muted">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{question.board}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{question.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Passage */}
                  <div className="prose prose-invert max-w-none mb-4">
                    <div 
                      className="text-sf-text-subtle leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: renderPassageWithBlanks(question.passage, question.blanks, isExpanded)
                      }}
                    />
                  </div>

                  {/* Toggle Button */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleQuestionExpansion(question.id)}
                      className="flex items-center space-x-2 text-sf-button hover:text-sf-button/80 transition-colors font-medium"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          <span>Hide Answers & Instructions</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span>Show Answers & Instructions</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Answers and Instructions */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-sf-text-muted/20">
                      <h4 className="text-lg font-semibold text-sf-text-bold mb-4">Answers & Instructions</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {question.blanks.map((blank, blankIndex) => (
                          <div
                            key={blank.id}
                            className="bg-sf-highlight/10 border border-sf-button/20 rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-sf-button border-sf-button/30">
                                ({String.fromCharCode(97 + blankIndex)})
                              </Badge>
                              <span className="font-semibold text-sf-text-bold">{blank.answer}</span>
                              {blank.ruleId && (
                                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                                  Rule {blank.ruleId}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-sf-text-subtle leading-relaxed mb-2">
                              <strong>Instruction:</strong> {blank.instruction}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}