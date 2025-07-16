'use client';

import { Question } from '@/types';
import { FileText, Calendar, MapPin, Tag } from 'lucide-react';
import { formatTopicName, formatBoardName } from '@/lib/utils';

interface QuestionListProps {
  questions: Question[];
  metadata: { board: string; year: number }[];
  level: 'hsc' | 'ssc';
}

export default function QuestionList({ questions, metadata, level }: QuestionListProps) {

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-sf-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Questions Found</h3>
        <p className="text-sf-text-subtle mb-4">
          No questions match your current filters. Try adjusting your search criteria.
        </p>
        <div className="text-sm text-sf-text-muted">
          <p>To add questions:</p>
          <p>Upload your question files to <code className="bg-sf-text-muted/20 px-2 py-1 rounded">/content/questions/{level}/</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-sf-text-bold">
          {questions.length} Question{questions.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="text-sm text-sf-text-muted">
          {level.toUpperCase()} Level
        </div>
      </div>

      {questions.map((question, index) => {
        // Find corresponding metadata for this question
        const questionMetadata = metadata[Math.floor(index / (questions.length / metadata.length))] || metadata[0];
        
        return (
          <div
            key={`${question.id}-${index}`}
            className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 hover:border-sf-button/50 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="h-4 w-4 text-sf-button" />
                  <span className="text-sm font-medium text-sf-button">
                    {formatTopicName(question.topic)}
                  </span>
                  {question.difficulty && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  )}
                  {question.marks && (
                    <span className="text-xs text-sf-text-muted">
                      {question.marks} mark{question.marks !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-sf-text-subtle leading-relaxed mb-4">
                    {question.question}
                  </p>
                </div>

                {question.answer && (
                  <div className="mt-4 p-4 bg-sf-highlight/10 rounded-lg border-l-4 border-sf-button">
                    <h4 className="text-sm font-semibold text-sf-text-bold mb-2">Answer:</h4>
                    <p className="text-sf-text-subtle text-sm">
                      {question.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-sf-text-muted pt-4 border-t border-sf-text-muted/20">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{formatBoardName(questionMetadata.board)} Board</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{questionMetadata.year}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}