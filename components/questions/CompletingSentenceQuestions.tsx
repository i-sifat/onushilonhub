'use client';

import { useState, useEffect } from 'react';
import { getAllCompletingSentenceQuestions, searchCompletingSentenceQuestions, YearQuestions, Question } from '@/lib/content-loader';
import SearchInput from '@/components/common/SearchInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar, Search, BookOpen, FileText } from 'lucide-react';

interface CompletingSentenceQuestionsProps {
  level: 'hsc' | 'ssc';
}

export default function CompletingSentenceQuestions({ level }: CompletingSentenceQuestionsProps) {
  const [yearQuestions, setYearQuestions] = useState<YearQuestions[]>([]);
  const [searchResults, setSearchResults] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = () => {
      setLoading(true);
      try {
        const questions = getAllCompletingSentenceQuestions(level);
        setYearQuestions(questions);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [level]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      const results = searchCompletingSentenceQuestions(level, term);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const totalQuestions = yearQuestions.reduce((total, yearData) => total + yearData.questions.length, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sf-button"></div>
        <span className="ml-2 text-sf-text-subtle">Loading questions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="max-w-md mx-auto">
        <SearchInput
          placeholder="Search completing sentence questions..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="border-sf-text-muted/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sf-button">{totalQuestions}</div>
            <div className="text-sm text-sf-text-muted">Total Questions</div>
          </CardContent>
        </Card>
        <Card className="border-sf-text-muted/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sf-button">{yearQuestions.length}</div>
            <div className="text-sm text-sf-text-muted">Years Available</div>
          </CardContent>
        </Card>
        <Card className="border-sf-text-muted/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sf-button">
              {yearQuestions.length > 0 ? `${yearQuestions[yearQuestions.length - 1]?.year}-${yearQuestions[0]?.year}` : 'N/A'}
            </div>
            <div className="text-sm text-sf-text-muted">Year Range</div>
          </CardContent>
        </Card>
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-4 flex items-center">
            <Search className="h-6 w-6 mr-2 text-sf-button" />
            Search Results ({searchResults.length})
          </h2>
          {searchResults.length === 0 ? (
            <Card className="border-sf-text-muted/20">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
                <p className="text-sf-text-subtle">No questions found matching "{searchTerm}"</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {searchResults.map((question, index) => (
                <Card key={question.id} className="border-sf-text-muted/20 hover:border-sf-button/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-sf-button border-sf-button/30">
                        {question.year}
                      </Badge>
                      {question.ruleId && (
                        <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold">
                          Rule {question.ruleId}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sf-text-subtle leading-relaxed">{question.question}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Year-wise Questions */}
      {!searchTerm && (
        <div>
          <h2 className="text-2xl font-bold text-sf-text-bold mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-sf-button" />
            Questions by Year
          </h2>
          
          {yearQuestions.length === 0 ? (
            <Card className="border-sf-text-muted/20">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Questions Available</h3>
                <p className="text-sf-text-subtle">
                  Questions for {level.toUpperCase()} completing sentence are not available yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {yearQuestions.map((yearData) => (
                <AccordionItem 
                  key={yearData.year} 
                  value={yearData.year.toString()}
                  className="border border-sf-text-muted/20 rounded-lg px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-sf-button" />
                        <span className="text-lg font-semibold text-sf-text-bold">
                          {yearData.year}
                        </span>
                      </div>
                      <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                        {yearData.questions.length} questions
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-4 mt-4">
                      {yearData.questions.map((question, index) => (
                        <Card key={question.id} className="border-sf-text-muted/10">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-sm font-medium text-sf-button">
                                Question {index + 1}
                              </span>
                              {question.ruleId && (
                                <Badge variant="outline" className="text-xs">
                                  Rule {question.ruleId}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sf-text-subtle leading-relaxed">
                              {question.question}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      )}
    </div>
  );
}