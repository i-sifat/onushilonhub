'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Question {
  id: string;
  question: string;
  ruleId?: number;
}

const allQuestions: Question[] = [
  { "id": "barisal-2022-a", "question": "I can't recall his name. It is long since...", "ruleId": 15 },
  { "id": "barisal-2022-b", "question": "A village doctor is a person who treats...", "ruleId": 31 },
  { "id": "barisal-2022-c", "question": "Our country is beset with many problems. We all should come forward in order to...", "ruleId": 1 },
  { "id": "barisal-2022-d", "question": "Whenever he speaks in English, he makes..." },
  { "id": "barisal-2022-e", "question": "A student has to be punctual. He/She has to study regularly lest...", "ruleId": 3 },
  { "id": "chattogram-2022-a", "question": "Time once lost is lost forever. So we should..." },
  { "id": "chattogram-2022-b", "question": "All around us are not friends. In fact, friends who stand by us in our danger are...", "ruleId": 31 },
  { "id": "chattogram-2022-c", "question": "For higher education, we should learn English. So, it is high time...", "ruleId": 13 },
  { "id": "chattogram-2022-d", "question": "Neighbors are those persons who live adjacent to us. As man cannot live alone, he...", "ruleId": 31 },
  { "id": "chattogram-2022-e", "question": "Birds fly in the sky. I wish I had..." },
  { "id": "cumilla-2022-a", "question": "Had he been a poet, he would have...", "ruleId": 141 },
  { "id": "cumilla-2022-b", "question": "Honesty is a great virtue. We should not..." },
  { "id": "cumilla-2022-c", "question": "A rainy day is the day when...", "ruleId": 31 },
  { "id": "cumilla-2022-d", "question": "All of us should try our best to do something for..." },
  { "id": "cumilla-2022-e", "question": "It is very cold. They have to put on warm clothes so that...", "ruleId": 1 },
  { "id": "dhaka-2022-a", "question": "I could not recognize you at first. It was many years since...", "ruleId": 15 },
  { "id": "dhaka-2022-b", "question": "Water is polluted in different ways. It is high time...", "ruleId": 13 },
  { "id": "dhaka-2022-c", "question": "I think you are not regular in studies. Be attentive lest...", "ruleId": 3 },
  { "id": "dhaka-2022-d", "question": "Birds fly in the sky freely. Had I the wings of a bird...", "ruleId": 141 },
  { "id": "dhaka-2022-e", "question": "There are many obstacles in our way to success. We must work hard so that...", "ruleId": 1 },
  { "id": "dinajpur-2022-a", "question": "I am waiting for the chairman. Can you tell me when...", "ruleId": 31 },
  { "id": "dinajpur-2022-b", "question": "Development of a country depends on the active participation of every citizen. Bangladesh expects that every citizen..." },
  { "id": "dinajpur-2022-c", "question": "Give me your address. I will..." },
  { "id": "dinajpur-2022-d", "question": "Her son died in an accident. She was so grief-stricken that...", "ruleId": 16 },
  { "id": "dinajpur-2022-e", "question": "There is a job vacancy announced on BD.job.com. Anyone who wants to apply...", "ruleId": 31 },
  { "id": "jashore-2022-a", "question": "Sabbir Khan is a quack. He behaves as though...", "ruleId": 2 },
  { "id": "jashore-2022-b", "question": "A proverb goes that..." },
  { "id": "jashore-2022-c", "question": "I found a box in the room. The box was too heavy for me...", "ruleId": 24 },
  { "id": "jashore-2022-d", "question": "Corruption is an obstacle to our national development. It is high time...", "ruleId": 13 },
  { "id": "jashore-2022-e", "question": "It is love that means..." },
  { "id": "mymensingh-2022-a", "question": "Florence Nightingale wanted to be a nurse with a view to...", "ruleId": 1 },
  { "id": "mymensingh-2022-b", "question": "We are a free nation now. 1971 is the year when...", "ruleId": 31 },
  { "id": "mymensingh-2022-c", "question": "I don't have enough money. Had I been a rich man, I would...", "ruleId": 141 },
  { "id": "mymensingh-2022-d", "question": "My final examination is going on. I studied hard lest...", "ruleId": 3 },
  { "id": "mymensingh-2022-e", "question": "Man proposes, God..." },
  { "id": "rajshahi-2022-a", "question": "If I had a camera, I would take some photographs. I like...", "ruleId": 141 },
  { "id": "rajshahi-2022-b", "question": "Though he was brilliant, he did not score well in the examination because...", "ruleId": 4 },
  { "id": "rajshahi-2022-c", "question": "Jamil had an accident yesterday while..." },
  { "id": "rajshahi-2022-d", "question": "I am not a rich man. The car is too expensive for me...", "ruleId": 24 },
  { "id": "rajshahi-2022-e", "question": "There goes a proverb that a man is known by the company..." },
  { "id": "sylhet-2022-a", "question": "A good student must possess..." },
  { "id": "sylhet-2022-b", "question": "The student who learns by trial and error is...", "ruleId": 31 },
  { "id": "sylhet-2022-c", "question": "He must be honest in thought, active in habit and obedient to..." },
  { "id": "sylhet-2022-d", "question": "To observe the rules of health is another..." },
  { "id": "sylhet-2022-e", "question": "He who is always sincere in his studies makes...", "ruleId": 31 }
];

const boards = ['All Boards', 'Barisal', 'Chattogram', 'Cumilla', 'Dhaka', 'Dinajpur', 'Jashore', 'Mymensingh', 'Rajshahi', 'Sylhet'];
const years = ['All Years', '2022', '2023', '2024'];

export default function CompletingSentenceQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(question => {
      const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBoard = selectedBoard === 'All Boards' || question.id.toLowerCase().includes(selectedBoard.toLowerCase());
      const matchesYear = selectedYear === 'All Years' || question.id.includes(selectedYear);
      
      return matchesSearch && matchesBoard && matchesYear;
    });
  }, [searchTerm, selectedBoard, selectedYear]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years';

  const getQuestionMetadata = (questionId: string) => {
    const parts = questionId.split('-');
    return {
      board: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
      year: parts[1],
      questionNumber: parts[2]
    };
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
                placeholder="Search in questions..."
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
          HSC Completing Sentence
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
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => {
            const metadata = getQuestionMetadata(question.id);
            
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
                      {question.ruleId && (
                        <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold">
                          Rule {question.ruleId}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-sf-text-muted">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{metadata.board}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{metadata.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-sf-text-subtle leading-relaxed text-lg">
                      {question.question}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}