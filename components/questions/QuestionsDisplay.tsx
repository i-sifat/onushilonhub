'use client';

import { FileText, Calendar, MapPin, Tag } from 'lucide-react';
import { Question } from '@/types';
import { formatTopicName, formatBoardName } from '@/lib/utils';

interface QuestionsDisplayProps {
  questions: Question[];
  level: 'hsc' | 'ssc';
  topic: string;
  searchTerm: string;
  filters: {
    year?: number;
    board?: string;
  };
}

export default function QuestionsDisplay({ 
  questions, 
  level, 
  topic, 
  search Term,
  filters 
}: QuestionsDisplayProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-sf-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Questions Found</h3>
        <p className="text-sf-text-subtle mb-4">
          {searchTerm ? 
            `No questions match your search "${searchTerm}".` :
            'No questions match your current filters.'
          }
        </p>
        <div className="text-sm text-sf-text-muted">
          <p>To add questions:</p>
          
          <p>Upload your question files to <code className="bg-sf-text-muted/20 px-2 py-1 rounded">/content/questions/{level}/{topic}/</code></p>
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
          {level.toUpperCase()} Level • {formatTopicName(topic)}
        </div>
      </div>

      {questions.map((question, index) => (
        <div
          key={question.id || index}
          className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 hover:border-sf-button/50 transition-all duration-300"
        >
          {/* Question Header */}
          <div className="flex flex-col md:flex-row m d:items-start md:justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="h-4 w-4 text-sf-button" />
                <span className="text-sm font-medium text-sf-button">
                  {formatTopicName(topic)}
                </span>
                {question.year && question.board && (
                  <>
                    <span className="text-sf-text-muted">•</span>
                    <span className="text-xs text-sf-text-muted">
                      {question.year} - {formatBoardName(question.board)}
                    </span>
                  </>
                )}
              </div>
            </div>
          
          </div>
          
          {/* Question Content */}
          <div className="prose prose-invert max-w-none">
            {question.passage && (
              <div className="mb-4 p-4 bg-sf-highlight/10 rounded-lg border-l-4 border-sf-button">
                <h4 className="text-sm font-semibold text-sf-text-bol d mb-2">Passage:</h4>
                <p className="text-sf-text-subtle text-sm whitespace-pre-wrap">
                  {question.passage}
                </p>
              </div>
            )}

            {question.question && (
              <p className="text-sf-text-subtle leading-relaxed mb-4">
                {question.question}
              </p>
            )}

            {/* Blanks for fill-in-the-blank questions */}
            {question.blanks && question.blanks.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-semibold text-sf-text-bold mb-2">Answers:</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {question.blanks.map((blank, blankIndex) => (
                    <div key={blank.id || blankIndex} className="flex items-center space-x-2 text-sm">
                      <span className="font-mono text-sf-button">({blank.id}):</span>
                      <span className="text-sf-text-subtle">{blank.answer ||'[Answer not provided]'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Question Metadata */}
          {(question.year || question.board) && (
            <div className="flex items-center space-x-4 text-sm text-sf-text-muted pt-4 border-t border-sf-text-muted/20 mt-4">
              {question.board && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{formatBoardName(question.board)} Board</span>
                </div>
              )}
              {question.year && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{question.year}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}