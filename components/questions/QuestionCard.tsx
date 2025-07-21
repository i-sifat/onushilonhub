'use client';

import { Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface QuestionCardProps {
  question: {
    id: string;
    question?: string;
    passage?: string;
    blanks?: Array<{ id: string; answer: string }>;
    ruleId?: string;
  };
  index: number;
  className?: string;
}

export default function QuestionCard({ question, index, className = '' }: QuestionCardProps) {
  const getQuestionMetadata = (questionId: string) => {
    const parts = questionId.split('-');
    return {
      board: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
      year: parts[1],
      questionNumber: parts[2]
    };
  };

  const metadata = getQuestionMetadata(question.id);

  return (
    <Card 
      className={`border-sf-text-muted/20 hover:border-sf-button/50 transition-all duration-300 ${className}`}
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
        
        <div className="space-y-4">
          {question.passage ? (
            <div>
              <h4 className="text-md font-semibold text-sf-text-bold mb-2">Passage:</h4>
              <p className="text-sf-text-subtle leading-relaxed">
                {question.passage}
              </p>
              
              {question.blanks && question.blanks.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-sf-text-bold mb-2">Sample Answers:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {question.blanks.slice(0, 6).map((blank) => (
                      <div key={blank.id} className="text-sm text-sf-text-subtle">
                        <span className="font-medium">({blank.id})</span> {blank.answer}
                      </div>
                    ))}
                    {question.blanks.length > 6 && (
                      <div className="text-sm text-sf-text-muted col-span-2">
                        ... and {question.blanks.length - 6} more answers
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <p className="text-sf-text-subtle leading-relaxed text-lg">
                {question.question}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}