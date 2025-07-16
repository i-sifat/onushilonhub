'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock } from 'lucide-react';

interface TopicCardProps {
  id: string;
  name: string;
  description: string;
  available: boolean;
  level: 'hsc' | 'ssc';
  isGrammarItems?: boolean;
  questionCount?: number;
}

const CardWrapper = ({ 
  available, 
  level, 
  id, 
  isGrammarItems = false, 
  children 
}: {
  available: boolean;
  level: 'hsc' | 'ssc';
  id: string;
  isGrammarItems?: boolean;
  children: React.ReactNode;
}) => {
  if (available) {
    const href = isGrammarItems 
      ? `/grammar-items/${level}/${id}` 
      : `/board-questions/${level}/${id}`;
    return <Link href={href}>{children}</Link>;
  }
  return <div>{children}</div>;
};

export default function TopicCard({ 
  id, 
  name, 
  description, 
  available, 
  level,
  isGrammarItems = false,
  questionCount 
}: TopicCardProps) {
  return (
    <CardWrapper available={available} level={level} id={id} isGrammarItems={isGrammarItems}>
      <Card className={`h-full transition-all duration-300 ${
        available 
          ? 'hover:shadow-lg hover:shadow-sf-button/10 hover:border-sf-button/50 cursor-pointer' 
          : 'opacity-75 cursor-not-allowed'
      } border-sf-text-muted/20`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {available ? (
                <BookOpen className="h-5 w-5 text-sf-button" />
              ) : (
                <Clock className="h-5 w-5 text-sf-text-muted" />
              )}
              <CardTitle className={`text-lg ${
                available ? 'text-sf-text-bold' : 'text-sf-text-muted'
              }`}>
                {name}
              </CardTitle>
            </div>
            {available && (
              <Badge variant="secondary" className="bg-sf-button/20 text-sf-button border-sf-button/30">
                Available
              </Badge>
            )}
            {!available && (
              <Badge variant="outline" className="border-sf-text-muted/30 text-sf-text-muted">
                Coming Soon
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className={`text-sm mb-4 ${
            available ? 'text-sf-text-subtle' : 'text-sf-text-muted'
          }`}>
            {description}
          </p>
          
          {available && questionCount && (
            <div className="flex items-center justify-between text-xs text-sf-text-muted">
              <span>{questionCount} questions available</span>
              <span className="text-sf-button">
                {isGrammarItems ? 'Click to learn rules →' : 'Click to explore →'}
              </span>
            </div>
          )}
          
          {available && !questionCount && (
            <div className="flex items-center justify-between text-xs text-sf-text-muted">
              <span>{isGrammarItems ? 'Grammar rules available' : 'Practice questions available'}</span>
              <span className="text-sf-button">
                {isGrammarItems ? 'Click to learn rules →' : 'Click to explore →'}
              </span>
            </div>
          )}
          
          {!available && (
            <div className="flex items-center text-xs text-sf-text-muted">
              <Clock className="h-3 w-3 mr-1" />
              <span>Coming soon</span>
            </div>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  );
}