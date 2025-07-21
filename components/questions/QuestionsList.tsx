'use client';

import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import QuestionCard from '@/components/questions/QuestionCard';

interface Question {
  id: string;
  question?: string;
  passage?: string;
  blanks?: Array<{ id: string; answer: string }>;
  ruleId?: string;
}

interface QuestionsListProps {
  questions: Question[];
  topic: string;
  level: 'hsc' | 'ssc';
  hasActiveFilters: boolean;
  className?: string;
}

export default function QuestionsList({
  questions,
  topic,
  level,
  hasActiveFilters,
  className = ''
}: QuestionsListProps) {
  const topicName = topic.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-sf-text-bold">
          {questions.length} Question{questions.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="text-sm text-sf-text-muted">
          {level.toUpperCase()} {topicName}
        </div>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
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
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}